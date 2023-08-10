#!/usr/bin/env -S deno run -A --watch=static/,routes/
// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import dev from "fresh/dev.ts";

await dev(import.meta.url, "./main.ts");
