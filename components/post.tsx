// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { authors, Post } from "util/post.ts";
import { render } from "x/gfm@0.2.5/mod.ts";

export default function Post(opts: { post: Post }) {
  const { post } = opts;
  const html = render(post.body);
  const img = `/${post.author}.jpg`;
  const name = authors[post.author] ?? post.author;
  return (
    <article>
      <div class="flex gap-5 px-5">
        <div class="flex-shrink-0">
          <img class="w-10 h-10 rounded-full" src={img} />
        </div>
        <section>
          <header class="flex gap-2 text-sm">
            <span class="font-semibold">
              {name}
            </span>
            <span class="text-gray-400">
              @{post.author}・
              <a class="hover:underline" href={`/post/${post.id}`}>
                {post.date.toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </a>
            </span>
          </header>
          <main
            style="--color-accent-fg: #3b82f6"
            data-color-mode="dark"
            data-dark-theme="dark"
            class="break-all markdown-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </section>
      </div>
      <hr class="mt-3 border-gray-700" />
    </article>
  );
}
