import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

const language = process.env.SDK_LANGUAGE;

if (!language) {
  throw new Error("SDK_LANGUAGE must be set.");
}

const checks = {
  node: [
    [
      "bash",
      [
        "-lc",
        "cd generated/node && npm install --silent && npm run build --if-present && npx tsc -p tsconfig.examples.json",
      ],
    ],
  ],
  python: [["python3", ["-m", "compileall", "-q", "generated/python"]]],
  ruby: [
    [
      "bash",
      [
        "-lc",
        "find generated/ruby/lib -name '*.rb' -print0 | xargs -0 -n1 ruby -c",
      ],
    ],
  ],
  java: [
    ["bash", ["generated/java/gradlew", "-p", "generated/java", "compileJava"]],
  ],
  rust: [["cargo", ["check", "--manifest-path", "generated/rust/Cargo.toml"]]],
  php: [
    [
      "bash",
      [
        "-lc",
        "find generated/php/lib -name '*.php' -print0 | xargs -0 -n1 php -l",
      ],
    ],
  ],
  go: [["bash", ["-lc", "cd generated/go && go test ./..."]]],
  dotnet: [["dotnet", ["build", "generated/dotnet/src/Kavenio.Sdk"]]],
};

const languageChecks = checks[language];

if (!languageChecks) {
  throw new Error(`Unsupported SDK_LANGUAGE=${language}.`);
}

for (const [command, args] of languageChecks) {
  const commandAvailable = spawnSync("bash", ["-lc", `command -v ${command}`], {
    stdio: "ignore",
  });

  if (commandAvailable.status !== 0) {
    throw new Error(`${command} is required to verify the ${language} SDK.`);
  }

  const result = spawnSync(command, args, { stdio: "inherit" });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (!existsSync(`generated/${language}`)) {
  throw new Error(`generated/${language} was not created.`);
}
