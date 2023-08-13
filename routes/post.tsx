// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { RouteConfig, RouteContext } from "fresh/server.ts";
import { Head } from "fresh/runtime.ts";
import { getPostById } from "util/post.ts";
import { formatMonthId } from "util/date.ts";
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
      <div class="pt-3 px-4 text-sm text-gray-500">
        <a class="text-blue-500 hover:underline" href={`/`}>TOP</a> &gt;{" "}
        <a
          class="text-blue-500 hover:underline"
          href={`/post/${ctx.params[0]}`}
        >
          {formatMonthId(ctx.params[0])}
        </a>
      </div>
      <hr class="mt-3 border-gray-700" />
      <div class="pt-4">
        <Post post={post} permalink />
        <hr class="mt-3 border-gray-700" />
      </div>
    </>
  );
}

export const config: RouteConfig = {
  routeOverride: "/post/(\\d{6})([a-z]+)",
};
