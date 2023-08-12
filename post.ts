// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { ensureDir } from "std/fs/ensure_dir.ts";
import { join } from "std/path/mod.ts";
import "std/dotenv/load.ts";
import { Temporal } from "esm/@js-temporal/polyfill@0.4.4";
import { encode } from "x/bijective_base_n@v0.1.0/mod.ts";

const n = Temporal.Now.zonedDateTimeISO();
const dir = `tl/${n.year}${n.month.toString().padStart(2, "0")}`;
await ensureDir(dir);
const file = join(dir, `${encode([...Deno.readDirSync(dir)].length + 1)}.md`);
Deno.writeTextFileSync(
  file,
  `---
date: ${n}
author: ${Deno.env.get("AUTHOR")}
---
...
`,
);
new Deno.Command("code", { args: [file] }).outputSync();
