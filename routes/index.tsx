// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { RouteContext } from "fresh/server.ts";
import { Head } from "fresh/runtime.ts";
import {
  defaultPost,
  getNextFileName,
  getPostsForMonths,
  getThisMonthId,
  getThisMonthPosts,
} from "util/post.ts";
import { formatMonthId } from "util/date.ts";
import Post from "components/post.tsx";
import Footer from "components/footer.tsx";
import { SITE_NAME } from "util/const.ts";
import { Temporal } from "esm/@js-temporal/polyfill@0.4.4";

export default async function Home(_req: Request, _ctx: RouteContext) {
  const thisMonthId = getThisMonthId();
  const thisMonthPosts = await getThisMonthPosts();
  const nextFileName = await getNextFileName(thisMonthPosts.length);
  const months = [];
  for await (const item of Deno.readDir("tl")) {
    months.push(item.name);
  }
  const posts = await getPostsForMonths(months);
  const ogImage = `https://times.kt3k.org/og-image.png`;
  const description = `HOME / ${SITE_NAME}`;
  return (
    <>
      <Head>
        <title>{SITE_NAME}</title>
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
      <div class="pt-3 px-7">
        #times-
        <a class="hover:underline" href="https://kt3k.org">kt3k</a>
      </div>
      <hr class="mt-3 border-gray-700" />
      {posts.map(([month, posts]) => (
        <>
          <div class="pt-3 px-4 text-sm text-gray-400">
            <a class="hover:underline" href={`/${month}`}>
              {formatMonthId(month)}
            </a>
          </div>
          {posts.map((post) => (
            <div class="mt-4">
              <Post post={post} />
              <hr class="mt-3 border-gray-700" />
            </div>
          ))}
        </>
      ))}
      <div class="fixed bottom-0 w-screen md:max-w-xl mx-auto h-[100svh]">
        <a
          class="absolute w-[50px] h-[50px] bg-blue-600 flex items-center justify-center rounded-full bottom-5 right-5 shadow-xl shadow-white text-xs font-bold"
          target="_blank"
          href={`https://github.com/kt3k/times-kt3k/new/main/tl/${thisMonthId}?filename=${nextFileName}&value=${
            defaultPost(Temporal.Now.zonedDateTimeISO(), "kt3k").replaceAll(
              "\n",
              "%0A",
            )
          }`}
        >
          + Post
        </a>
      </div>
      <Footer />
    </>
  );
}
