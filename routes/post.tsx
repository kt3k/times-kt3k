// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { RouteConfig, RouteContext } from "fresh/server.ts";
import { Head } from "fresh/runtime.ts";
import { getPostById } from "util/post.ts";

export default async function Post(req: Request, ctx: RouteContext) {
  const month = ctx.params[0];
  const id = ctx.params[0] + ctx.params[1];
  const post = await getPostById(id);
  if (!post) {
    return <div>404 ({id})</div>;
  }
  const { date, body } = post;
  return (
    <>
      <Head>
        <title>Timeline</title>
      </Head>
      <div class="">
        {date}
        <br />
        {body}
      </div>
    </>
  );
}

export const config: RouteConfig = {
  routeOverride: "/post/(\\d{6})([a-z]+)",
};
