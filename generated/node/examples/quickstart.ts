import { Kavenio } from "../src";

const kavenio = new Kavenio({
  apiKey: "kvn_live_example",
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
