// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { RouteConfig, RouteContext } from "fresh/server.ts";
import { Head } from "fresh/runtime.ts";
import { getPostsForMonth } from "util/post.ts";

export default async function Month(req: Request, ctx: RouteContext) {
  const posts = await getPostsForMonth(ctx.params[0]);
  return (
    <>
      <Head>
        <title>Timeline</title>
      </Head>
      <div>
        <a class="text-blue-500" href={`/`}>Back</a>
      </div>
      <div class="">
        {posts.map((post) => (
          <div class="mt-4">
            <a class="text-blue-500 text-xs" href={`/post/${post.id}`}>
              {post.date}
            </a>
            <br />
            {post.body}
          </div>
        ))}
      </div>
    </>
  );
}

export const config: RouteConfig = {
  routeOverride: "/post/(\\d{6})",
};
