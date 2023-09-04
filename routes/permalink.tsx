// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { RouteConfig, RouteContext } from "fresh/server.ts";
import { Head } from "fresh/runtime.ts";
import { getPostById } from "util/post.ts";
import { formatMonthId } from "util/date.ts";
import Post from "components/post.tsx";
import Footer from "components/footer.tsx";
import { SITE_NAME } from "util/const.ts";

export default async function Permalink(_req: Request, ctx: RouteContext) {
  const monthId = ctx.params[0];
  const id = monthId + ctx.params[1];
  const post = await getPostById(id);
  if (!post) {
    return <div>404 ({id})</div>;
  }
  const text = post.html.replace(/<[^>]+>/g, "").trim();
  const description = `${post.author}: "${text}"`;
  const ogImage = `https://times.kt3k.org/${monthId}.png`;
  return (
    <>
      <Head>
        <title>{description} / {SITE_NAME}</title>
        <meta property="og:title" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="418" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={ogImage} />
        <meta property="twitter:title" content={description} />
      </Head>
      <div class="pt-3 px-4 text-sm text-gray-400">
        <a class="hover:underline" href={`/`}>Home</a> /{" "}
        <a
          class="hover:underline"
          href={`/${monthId}`}
        >
          {formatMonthId(monthId)}
        </a>
      </div>
      <hr class="mt-3 border-gray-700" />
      <img src={`/${monthId}.png`} />
      <hr class="border-gray-700" />
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
