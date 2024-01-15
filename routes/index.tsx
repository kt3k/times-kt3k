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
  const monthsSorted = months.toSorted().toReversed();
  const monthsToDisplay = monthsSorted.slice(0, 3);
  const monthsArchived = monthsSorted.slice(3);
  const posts = await getPostsForMonths(monthsToDisplay);
  const ogImage = `https://times.kt3k.org/og-image.png`;
  const description = `HOME / ${SITE_NAME}`;
  return (
    <>
      <Head>
        <title>{description}</title>
        <meta property="og:title" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="418" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={ogImage} />
        <meta property="twitter:title" content={description} />
      </Head>
      <div class="pt-3 px-7 flex justify-between">
        <a href="/">#times-kt3k</a>
        <a class="text-gray-400 text-sm" href="/archive">archive</a>
      </div>
      <hr class="mt-3 border-gray-700" />
      {posts.map(([month, posts]) => (
        <>
          <img src={`/${month}.png`} />
          <hr class="border-gray-700" />
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
      <div class="text-center py-4 text-sm text-gray-400">
        ・<br />
        Archives<br />
        ・<br />
      </div>
      <hr class="border-gray-700" />
      {monthsArchived.map((month) => (
        <>
          <div class="text-sm text-gray-400 flex gap-6 items-center">
            <img
              class="w-1/2 border-r-1 border-gray-700"
              src={`/${month}.png`}
            />
            <div class="text-center w-1/2">
              <a class="hover:underline" href={`/${month}`}>
                {formatMonthId(month)}
              </a>
            </div>
          </div>
          <hr class="border-gray-700" />
        </>
      ))}
      <div class="fixed bottom-0 w-screen md:max-w-xl mx-auto h-[100svh] pointer-events-none">
        <a
          class="absolute pointer-events-auto w-[50px] h-[50px] bg-blue-600 flex items-center justify-center rounded-full bottom-12 right-5 shadow-xl shadow-white font-light"
          target="_blank"
          href={`https://github.com/kt3k/times-kt3k/new/main/tl/${thisMonthId}?filename=${nextFileName}&value=${
            encodeURIComponent(
              defaultPost(Temporal.Now.zonedDateTimeISO(), "kt3k"),
            )
          }`}
        >
          + ✍️
        </a>
      </div>
      <Footer />
    </>
  );
}
