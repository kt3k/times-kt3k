// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.
// deno-lint-ignore-file react-no-danger

import { Temporal } from "@js-temporal/polyfill";
import { authors, type Post } from "util/post.ts";

export default function Post(opts: { post: Post; permalink?: boolean }) {
  const { post, permalink } = opts;
  const img = `/${post.author}.jpg`;
  const author = authors[post.author] ?? post.author;
  const date = permalink ? formatDate(post.date) : smart(post.date);
  return (
    <article>
      <div class="flex gap-5 px-4">
        <div class="flex-shrink-0">
          <img class="w-10 h-10 rounded-full" src={img} />
        </div>
        <section class="min-w-0">
          <header class="flex gap-2 text-sm">
            <span class="font-semibold">
              {author.name}
            </span>
            <span class="text-gray-400">
              {author.url
                ? (
                  <a class="hover:underline" href={author.url}>
                    @{post.author}
                  </a>
                )
                : `@${post.author}`}・
              {permalink
                ? date
                : (
                  <a class="hover:underline" href={`/${post.id}`}>
                    {date}
                  </a>
                )}
            </span>
          </header>
          <main
            style="--color-accent-fg: #60a5fa; --color-canvas-default: xx"
            data-color-mode="dark"
            data-dark-theme="dark"
            class="break-words markdown-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </section>
      </div>
    </article>
  );
}

function smart(date: Temporal.ZonedDateTime): string {
  const d = date.until(Temporal.Now.zonedDateTimeISO());
  if (d.total("day") > 2) {
    return date.toLocaleString("en-US", {
      dateStyle: "medium",
    });
  }
  if (d.total("day") > 1) {
    return d.round({ smallestUnit: "day" }).days + "d";
  }
  if (d.total("hour") > 1) {
    return d.round({ smallestUnit: "hour" }).hours + "h";
  }
  if (d.total("minute") > 1) {
    return d.round({ smallestUnit: "minute" }).minutes + "m";
  }
  if (d.total("second") > 1) {
    return d.round({ smallestUnit: "second" }).seconds + "s";
  }
  return "now";
}

function formatDate(date: Temporal.ZonedDateTime) {
  return date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
