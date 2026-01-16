// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import type { RouteConfig, RouteContext } from "$fresh/server.ts";
import { encodeBase64 } from "@std/encoding/base64";
import { monthPng } from "util/header_image.ts";

const sharedEtag = `"${
  encodeBase64(
    new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(Deno.env.get("DENO_DEPLOYMENT_ID") ?? ""),
      ),
    ),
  )
}"`;

const imageHeader = { "Content-Type": "image/png", "Etag": sharedEtag };

export function handler(req: Request, ctx: RouteContext) {
  if (req.headers.get("if-none-match")?.includes(sharedEtag)) {
    return new Response(null, { status: 304 });
  }
  return new Response(monthPng(ctx.params[0]), { headers: imageHeader });
}
export const config: RouteConfig = {
  routeOverride: "/(\\d{6}).png",
};
