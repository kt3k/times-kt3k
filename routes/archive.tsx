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
  const ogImage = `https://times.kt3k.org/${monthsToDisplay[0]}.png`;
  const description = `HOME / ${SITE_NAME}`;
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
      <div class="pt-3 px-7">
        <a href="/">#times-kt3k</a>
      </div>
      <hr class="mt-3 border-gray-700" />
      {monthsToDisplay.map((month) => (
        <div class="mt-3 text-sm text-gray-400 flex gap-6 justify-center items-center">
          <a href={`/${month}`}>
            <img
              class="w-[180px]"
              src={`/${month}.svg`}
            />
          </a>
          <div class="text-center">
            <a class="hover:underline" href={`/${month}`}>
              {formatMonthId(month)}
            </a>
          </div>
        </div>
      ))}
      <hr class="mt-6 border-gray-700" />
      <Footer />
    </>
  );
}
