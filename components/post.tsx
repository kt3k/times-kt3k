// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { Post } from "util/post.ts";
export default function Post(opts: { post: Post }) {
  const { post } = opts;
  return (
    <article>
      <div class="flex gap-5">
        <div class="flex-shrink-0">
          <img class="w-10 h-10 rounded-full" src="https://kt3k.org/kt3k.jpg" />
        </div>
        <section>
          <header class="flex gap-2 text-sm">
            <span class="font-semibold">Yoshiya Hinosawa</span>
            <span class="text-gray-400">
              @kt3k・
              <a class="hover:underline" href={`/post/${post.id}`}>
                {post.date.toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </a>
            </span>
          </header>
          <main>{post.body}</main>
        </section>
      </div>
      <hr class="mt-3 border-gray-700" />
    </article>
  );
}
