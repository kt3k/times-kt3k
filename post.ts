// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { ensureDir } from "std/fs/ensure_dir.ts";
import { join } from "std/path/mod.ts";
import "std/dotenv/load.ts";
import { Temporal } from "esm/@js-temporal/polyfill@0.4.4";
import { defaultPost, getNextFileName, getThisMonthId } from "./util/post.ts";

const n = Temporal.Now.zonedDateTimeISO();
const id = getThisMonthId();
const dir = join("tl", id);
await ensureDir(dir);
const file = join(dir, getNextFileName([...Deno.readDirSync(dir)].length));
Deno.writeTextFileSync(file, defaultPost(n, Deno.env.get("AUTHOR")!));
new Deno.Command("code", { args: [file] }).outputSync();
