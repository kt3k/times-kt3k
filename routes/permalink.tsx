// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { RouteConfig, RouteContext } from "fresh/server.ts";
import { Head } from "fresh/runtime.ts";
import { getPostById } from "util/post.ts";
import { formatMonthId } from "util/date.ts";
import Post from "components/post.tsx";
import Footer from "components/footer.tsx";

export default async function Permalink(_req: Request, ctx: RouteContext) {
  const id = ctx.params[0] + ctx.params[1];
  const post = await getPostById(id);
  if (!post) {
    return <div>404 ({id})</div>;
  }
  const text = post.html.replace(/<[^>]+>/g, "");
  return (
    <>
      <Head>
        <title>{post.author}: "{text}" / Timeline of @kt3k</title>
        <meta name="description" content={text} />
      </Head>
      <div class="pt-3 px-4 text-sm text-gray-400">
        <a class="hover:underline" href={`/`}>TOP</a> /{" "}
        <a
          class="hover:underline"
          href={`/${ctx.params[0]}`}
        >
          {formatMonthId(ctx.params[0])}
        </a>
      </div>
      <hr class="mt-3 border-gray-700" />
      <div class="pt-4">
        <Post post={post} permalink />
        <hr class="mt-3 border-gray-700" />
      </div>
      <Footer />
    </>
  );
}

export const config: RouteConfig = {
  routeOverride: "/(\\d{6})([a-z]+)",
};
