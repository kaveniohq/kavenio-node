# Releasing

This repository publishes the official Node.js and TypeScript SDK package:

```txt
@kavenio/sdk
```

## npm Setup

The package should use npm trusted publishing from GitHub Actions.

Configure npm trusted publishing for:

```txt
Package: @kavenio/sdk
Repository: kaveniohq/kavenio-node
Workflow: .github/workflows/publish.yml
Environment: npm
```

Create the matching GitHub environment:

```txt
npm
```

Keep manual approval on the environment until the release flow has been proven
with a few releases.

If npm requires the package to exist before trusted publishing can be
configured, publish `@kavenio/sdk` once manually with `--access public`, then
configure trusted publishing before the next release.

## Local Release Check

Before publishing, verify the package locally:

```bash
npm ci
SDK_LANGUAGE=node SDK_VERSION=1.0.0 npm run generate
SDK_LANGUAGE=node npm run verify
npm run pack:dry-run
```

## Publish

Create a GitHub Release from a semver tag:

```txt
v1.0.0
```

The `Publish npm package` workflow regenerates the SDK from the pinned OpenAPI
artifact, verifies the package, runs `npm pack --dry-run`, and publishes
`generated/node` to npm.
