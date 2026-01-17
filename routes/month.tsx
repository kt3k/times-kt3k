// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { RouteConfig, RouteContext } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getPostsForMonth } from "util/post.ts";
import { formatMonthId } from "util/date.ts";
import Post from "components/post.tsx";
import Footer from "components/footer.tsx";
import { SITE_NAME } from "util/const.ts";

export default async function Month(_req: Request, ctx: RouteContext) {
  const monthId = ctx.params[0];
  const posts = await getPostsForMonth(monthId);
  const month = formatMonthId(monthId);
  const description = `${month} / ${SITE_NAME}`;
  const ogImage = `https://times.kt3k.org/${monthId}.png`;
  return (
    <>
      <Head>
        <title>{description}</title>
        <meta property="og:title" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1600" />
        <meta property="og:image:height" content="847" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={ogImage} />
        <meta property="twitter:title" content={description} />
      </Head>
      <div class="pt-3 px-4 text-sm text-gray-400">
        <a class="hover:underline" href={`/`}>Home</a> / {month}
      </div>
      <hr class="mt-3 border-gray-700" />
      <img src={`/${monthId}.svg`} />
      <hr class="border-gray-700" />
      <div class="">
        {posts.map((post) => (
          <div class="mt-4">
            <Post post={post} />
            <hr class="mt-3 border-gray-700" />
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export const config: RouteConfig = {
  routeOverride: "/(\\d{6})",
};
