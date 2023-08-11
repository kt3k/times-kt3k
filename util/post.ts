// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { extract } from "std/front_matter/yaml.ts";
import { join } from "std/path/mod.ts";

export type Post = {
  date: string;
  body: string;
  id: string;
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
    const { attrs, body } = extract<{ date: string }>(text);
    return {
      date: attrs.date,
      body,
      id: `${month}${file}`,
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
  posts.sort((a, b) => a.date > b.date ? -1 : 1);
  return posts;
}
