// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { type RouteContext } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { formatMonthId } from "util/date.ts";
import Footer from "components/footer.tsx";
import { SITE_NAME } from "util/const.ts";

export default async function Home(_req: Request, _ctx: RouteContext) {
  const months = [];
  for await (const item of Deno.readDir("tl")) {
    months.push(item.name);
  }
  const monthsToDisplay = months.toSorted().toReversed();
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
      <div class="pt-3 px-7">
        <a href="/">#times-kt3k</a>
      </div>
      <hr class="mt-3 border-gray-700" />
      {monthsToDisplay.map((month) => (
        <>
          <div class="text-sm text-gray-400 flex gap-6 items-center">
            <img
              class="w-1/2 border-r border-gray-700"
              src={`/${month}.svg`}
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
      <Footer />
    </>
  );
}
