import { Kavenio } from "../src";

const kavenio = new Kavenio({
  apiKey: "example-api-key",
});

async function main() {
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
}

void main();
