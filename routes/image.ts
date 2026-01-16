// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import type { RouteConfig, RouteContext } from "$fresh/server.ts";
import { encodeBase64 } from "@std/encoding/base64";
import { generateSvg } from "util/header_image.ts";
import { randomSeeded } from "@std/random";

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

function fnv1a64(str: string): bigint {
  let hash = 0xcbf29ce484222325n;
  const prime = 0x100000001b3n;

  for (let i = 0; i < str.length; i++) {
    hash ^= BigInt(str.charCodeAt(i));
    hash = (hash * prime) & 0xffffffffffffffffn;
  }
  return hash;
}

const imageHeader = { "Content-Type": "image/svg+xml", "Etag": sharedEtag };

export function handler(req: Request, ctx: RouteContext) {
  /*
  if (req.headers.get("if-none-match")?.includes(sharedEtag)) {
    return new Response(null, { status: 304 });
  }
    */
  const rng = randomSeeded(fnv1a64(ctx.params[0]));
  return new Response(generateSvg(rng), { headers: imageHeader });
}
export const config: RouteConfig = {
  routeOverride: "/(\\d{6}).svg",
};
