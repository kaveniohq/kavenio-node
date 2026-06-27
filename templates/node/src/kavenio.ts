import {
  Configuration,
  type ConfigurationParameters,
  type InitOverrideFunction,
  type RequestContext,
} from "./runtime";
import { PostsApi } from "./apis/PostsApi";
import type { CreatePost201Response, CreatePostRequest } from "./models";

export type KavenioOptions = ConfigurationParameters & {
  apiKey?: string;
};

export class Kavenio {
  readonly posts: KavenioPosts;
  readonly raw: {
    posts: PostsApi;
  };

  constructor(options: KavenioOptions = {}) {
    const configuration = new Configuration({
      ...options,
      accessToken: options.accessToken ?? options.apiKey,
    });

    this.raw = {
      posts: new PostsApi(configuration),
    };
    this.posts = new KavenioPosts(this.raw.posts);
  }
}

export class KavenioPosts {
  constructor(private readonly api: PostsApi) {}

  create(
    input: CreatePostRequest,
    initOverrides?: RequestInit | InitOverrideFunction,
  ): Promise<CreatePost201Response> {
    return this.api.createPost(input, initOverrides);
  }
}

export type KavenioRequestContext = RequestContext;
