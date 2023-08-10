// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { RouteContext } from "fresh/server.ts";
import { Head } from "fresh/runtime.ts";

export default async function Home(req: Request, ctx: RouteContext) {
  const months = [];
  for await (const item of Deno.readDir("tl")) {
    months.push(item.name);
  }
  return (
    <>
      <Head>
        <title>Timeline</title>
      </Head>
      <div class="">
        {months.map((month) => (
          <p>
            <a class="text-blue-500" href={`/post/${month}`}>{month}</a>
          </p>
        ))}
      </div>
    </>
  );
}
