// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import type { RouteConfig, RouteContext } from "$fresh/server.ts";
import { encodeBase64 } from "@std/encoding/base64";

const ogImageU8 = await Deno.readFile("static/og-image.png");

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

export async function handler(req: Request, ctx: RouteContext) {
  if (req.headers.get("if-none-match")?.includes(sharedEtag)) {
    return new Response(null, { status: 304 });
  }
  try {
    await Deno.lstat(`tl/${ctx.params[0]}/image.png`);
    return new Response(
      (await Deno.open(`tl/${ctx.params[0]}/image.png`)).readable,
      { headers: imageHeader },
    );
  } catch {
    // fallback to default og-image
    return new Response(ogImageU8, { headers: imageHeader });
  }
}
export const config: RouteConfig = {
  routeOverride: "/(\\d{6}).png",
};
