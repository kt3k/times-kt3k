// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { Post } from "util/post.ts";
export default function Post(opts: { post: Post }) {
  const { post } = opts;
  return (
    <article>
      <header class="flex gap-2 text-sm">
        <span class="font-semibold">Yoshiya Hinosawa</span>
        <span class="text-gray-400">
          @kt3k・
          <a class="hover:underline" href={`/post/${post.id}`}>
            {post.date}
          </a>
        </span>
      </header>
      <main>{post.body}</main>
    </article>
  );
}
