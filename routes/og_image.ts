// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { RouteConfig, RouteContext } from "fresh/server.ts";

const ogImageU8 = await Deno.readFile("static/og-image.png");

const imageHeader = { "Content-Type": "image/png" };

const defaultResponse = new Response(ogImageU8, { headers: imageHeader });

export async function handler(_req: Request, ctx: RouteContext) {
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
