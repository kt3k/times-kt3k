// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { RouteContext } from "fresh/server.ts";
import { Head } from "fresh/runtime.ts";
import { getPostsForMonths } from "util/post.ts";
import Post from "components/post.tsx";

export default async function Home(req: Request, ctx: RouteContext) {
  const months = [];
  for await (const item of Deno.readDir("tl")) {
    months.push(item.name);
  }
  const posts = await getPostsForMonths(months);
  return (
    <>
      <Head>
        <title>Timeline</title>
      </Head>
      <div class="">
        {posts.map(([month, posts]) => (
          <div>
            <div class="pt-3 px-4 text-sm text-gray-500">
              <a class="hover:underline" href={`/post/${month}`}>
                {month}
              </a>
            </div>
            <hr class="mt-3 border-gray-700" />
            {posts.map((post) => (
              <div class="mt-4">
                <Post post={post} />
                <hr class="mt-3 border-gray-700" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function Month({ month }: { month: string }) {
  return;
}
