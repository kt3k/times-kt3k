// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { RouteConfig, RouteContext } from "fresh/server.ts";
import { Head } from "fresh/runtime.ts";
import { getPostById } from "util/post.ts";
import Post from "components/post.tsx";

export default async function PostPage(_req: Request, ctx: RouteContext) {
  const id = ctx.params[0] + ctx.params[1];
  const post = await getPostById(id);
  if (!post) {
    return <div>404 ({id})</div>;
  }
  return (
    <>
      <Head>
        <title>Timeline</title>
      </Head>
      <div class="pt-5">
        <Post post={post} permalink />
      </div>
    </>
  );
}

export const config: RouteConfig = {
  routeOverride: "/post/(\\d{6})([a-z]+)",
};
