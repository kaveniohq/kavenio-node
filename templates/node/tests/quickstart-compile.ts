import { Kavenio, type CreatePostRequest } from "../src";

const kavenio = new Kavenio({
  apiKey: "example-api-key",
});

const input = {
  profileId: "proflinkedinlive",
  content: "Launching today",
  platforms: [
    {
      platform: "linkedin",
      accountId: "acctlinkedinpage",
    },
  ],
} satisfies CreatePostRequest;

async function main() {
  await kavenio.posts.create(input);
}

void main();
