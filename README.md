# Kavenio Node SDK

Official Node.js and TypeScript SDK for Kavenio social posting and scheduling.

## Installation

```bash
npm install @kavenio/sdk
```

## Get an API key

Create a Kavenio account from the [dashboard](https://app.kavenio.com), then
create an API key from [API Keys](https://app.kavenio.com/api-keys).

```bash
export KAVENIO_API_KEY="<your-api-key>"
```

## Quickstart

```ts
import { Kavenio } from "@kavenio/sdk";

const kavenio = new Kavenio({
  apiKey: process.env.KAVENIO_API_KEY,
});

await kavenio.posts.create({
  profileId: "proflinkedinlive",
  content: "Launching today",
  platforms: [
    {
      platform: "linkedin",
      accountId: "acctlinkedinpage",
    },
  ],
});
```

## Supported API Surface

This SDK currently supports Kavenio social posting and scheduling workflows:

- profiles
- connected accounts
- connect/OAuth flows
- media upload and validation
- posts
- queue scheduling
- post validation

For the complete REST API reference, use the Kavenio API docs.

## Documentation

Canonical docs live on the Kavenio docs site:

- [SDK docs](https://kavenio.com/docs/sdk/node)
- [API reference](https://kavenio.com/docs/api)

## Support

For help, contact Kavenio support or open an issue in this repository.
