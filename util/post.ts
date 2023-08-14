// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { extract } from "std/front_matter/yaml.ts";
import { join } from "std/path/mod.ts";
import { Temporal } from "esm/@js-temporal/polyfill@0.4.4";
import authors_ from "../authors.json" assert { type: "json" };
import { render } from "x/gfm@0.2.5/mod.ts";

type Author = {
  name: string;
  url?: string;
};
export const authors = authors_ as Record<string, Author>;

export type Post = {
  date: Temporal.ZonedDateTime;
  body: string;
  html: string;
  id: string;
  author: string;
};

export async function getPostById(id: string): Promise<Post | null> {
  const match = id.match(/(\d{6})([a-z]+)/);
  if (!match) return null;
  const [_, month, file] = match;
  const post = await getPost(month, file);
  return post;
}

export async function getPost(
  month: string,
  file: string,
): Promise<Post | null> {
  if (file.endsWith(".md")) {
    file = file.slice(0, -3);
  }
  try {
    const text = await Deno.readTextFile(`tl/${month}/${file}.md`);
    const { attrs, body } = extract<{ date: string; author: string }>(text);
    const html = render(body);

    return {
      date: Temporal.ZonedDateTime.from(attrs.date),
      body,
      html,
      id: `${month}${file}`,
      author: attrs.author,
    };
  } catch {
    return null;
  }
}

export async function getPostsForMonth(month: string): Promise<Post[]> {
  const promises = [];
  for await (const entry of Deno.readDir(join("tl", month))) {
    promises.push(getPost(month, entry.name));
  }
  const posts_ = await Promise.all(promises);
  const posts = posts_.filter((post) => post !== null) as Post[];
  posts.sort((a, b) => a.date.epochSeconds > b.date.epochSeconds ? -1 : 1);
  return posts;
}

export function getPostsForMonths(
  months: string[],
): Promise<[string, Post[]][]> {
  const posts: Promise<[string, Post[]]>[] = [];
  for (const month of months.sort().reverse()) {
    posts.push(getPostsForMonth(month).then((posts) => [month, posts]));
  }
  return Promise.all(posts);
}
