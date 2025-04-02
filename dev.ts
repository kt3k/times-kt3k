// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.
import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

await dev(import.meta.url, "./main.ts", config);
