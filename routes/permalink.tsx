// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { RouteConfig, RouteContext } from "fresh/server.ts";
import { Head } from "fresh/runtime.ts";
import { getPostById } from "util/post.ts";
import { formatMonthId } from "util/date.ts";
import Post from "components/post.tsx";
import Footer from "components/footer.tsx";
import { SITE_NAME } from "util/const.ts";

export default async function Permalink(_req: Request, ctx: RouteContext) {
  const id = ctx.params[0] + ctx.params[1];
  const post = await getPostById(id);
  if (!post) {
    return <div>404 ({id})</div>;
  }
  const text = post.html.replace(/<[^>]+>/g, "").trim();
  const description = `${post.author}: "${text}"`;
  const ogImage = `https://times.kt3k.org/og-image.png`;
  return (
    <>
      <Head>
        <title>{description} / {SITE_NAME}</title>
        <meta property="og:title" content={SITE_NAME} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="418" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={ogImage} />
        <meta property="twitter:title" content={SITE_NAME} />
        <meta property="twitter:description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="description" content={description} />
      </Head>
      <div class="pt-3 px-4 text-sm text-gray-400">
        <a class="hover:underline" href={`/`}>Home</a> /{" "}
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
