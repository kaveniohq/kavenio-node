import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname } from "node:path";

const language = process.env.SDK_LANGUAGE;
const sdkVersion = process.env.SDK_VERSION ?? "0.0.0";
const configPath = language ? `generator/configs/${language}.yaml` : "";

if (!language) {
  throw new Error("SDK_LANGUAGE must be set.");
}

if (!existsSync(configPath)) {
  throw new Error(`No generator config found for SDK_LANGUAGE=${language}.`);
}

if (!existsSync("openapi/openapi.json")) {
  throw new Error("openapi/openapi.json is missing.");
}

rmSync("generated", { recursive: true, force: true });

const result = spawnSync(
  "node_modules/.bin/openapi-generator-cli",
  [
    "generate",
    "-c",
    configPath,
    "--additional-properties",
    [
      `packageVersion=${sdkVersion}`,
      `artifactVersion=${sdkVersion}`,
      `gemVersion=${sdkVersion}`,
      `projectVersion=${sdkVersion}`,
    ].join(","),
  ],
  { stdio: "inherit" },
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

if (language === "node") {
  copyNodeOverlay();
}

function copyNodeOverlay() {
  rmSync("generated/node/docs", { recursive: true, force: true });

  const readmeSource = existsSync("templates/README.node.md")
    ? "templates/README.node.md"
    : "README.md";
  const files = [
    [readmeSource, "generated/node/README.md"],
    ["templates/node/src/kavenio.ts", "generated/node/src/kavenio.ts"],
    [
      "templates/node/examples/quickstart.ts",
      "generated/node/examples/quickstart.ts",
    ],
    [
      "templates/node/tests/quickstart-compile.ts",
      "generated/node/tests/quickstart-compile.ts",
    ],
    [
      "templates/node/tsconfig.examples.json",
      "generated/node/tsconfig.examples.json",
    ],
  ];

  for (const [source, target] of files) {
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(source, target);
  }

  const indexPath = "generated/node/src/index.ts";
  const exportLine = "export * from './kavenio';\n";
  const currentIndex = readFileSync(indexPath, "utf8");

  if (!currentIndex.includes(exportLine.trim())) {
    writeFileSync(indexPath, `${currentIndex}${exportLine}`, "utf8");
  }

  const packagePath = "generated/node/package.json";
  const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
  packageJson.description =
    "Official Node.js and TypeScript SDK for Kavenio social posting and scheduling.";
  packageJson.author = "Kavenio";
  packageJson.repository = {
    type: "git",
    url: "https://github.com/kaveniohq/kavenio-node.git",
  };
  packageJson.homepage = "https://kavenio.com/docs/sdk/node";
  packageJson.bugs = {
    url: "https://github.com/kaveniohq/kavenio-node/issues",
  };
  writeFileSync(
    packagePath,
    `${JSON.stringify(packageJson, null, 2)}\n`,
    "utf8",
  );
}
