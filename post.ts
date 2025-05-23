// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { ensureDir } from "@std/fs/ensure-dir";
import { join } from "@std/path";
import "@std/dotenv/load";
import { Temporal } from "@js-temporal/polyfill";
import {
  defaultPost,
  getNextFileName,
  getThisMonthId,
  getThisMonthPosts,
} from "./util/post.ts";

const n = Temporal.Now.zonedDateTimeISO();
const id = getThisMonthId();
const dir = join("tl", id);
await ensureDir(dir);
const file = join(dir, getNextFileName((await getThisMonthPosts()).length));
Deno.writeTextFileSync(file, defaultPost(n, Deno.env.get("AUTHOR")!));
new Deno.Command("code", { args: [file] }).outputSync();
