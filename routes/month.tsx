// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { RouteConfig, RouteContext } from "fresh/server.ts";
import { Head } from "fresh/runtime.ts";
import { getPostsForMonth } from "util/post.ts";
import Post from "components/post.tsx";

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
            <Post post={post} />
          </div>
        ))}
      </div>
    </>
  );
}

export const config: RouteConfig = {
  routeOverride: "/post/(\\d{6})",
};
