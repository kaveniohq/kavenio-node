const rawVersion = process.argv[2] ?? process.env.SDK_VERSION;

if (!rawVersion) {
  throw new Error("Provide a version argument or SDK_VERSION.");
}

const version = rawVersion.replace(/^v/, "");

if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) {
  throw new Error(`Invalid semver version: ${rawVersion}`);
}

console.log(version);
