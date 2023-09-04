// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { RouteConfig, RouteContext } from "fresh/server.ts";
import { encode } from "std/encoding/base64.ts";

const ogImageU8 = await Deno.readFile("static/og-image.png");

const sharedEtag = `"${
  encode(
    new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(Deno.env.get("DENO_DEPLOYMENT_ID") ?? ""),
      ),
    ),
  )
}"`;

const imageHeader = { "Content-Type": "image/png", "Etag": sharedEtag };

const defaultResponse = new Response(ogImageU8, { headers: imageHeader });

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
    return defaultResponse;
  }
}
export const config: RouteConfig = {
  routeOverride: "/(\\d{6}).png",
};
