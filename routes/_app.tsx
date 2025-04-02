// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.
// deno-lint-ignore-file react-no-danger

import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import { CSS } from "@deno/gfm";

export default function App({ Component }: PageProps) {
  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <body class="bg-black">
        <div class="min-h-[100svh] bg-black text-gray-100">
          <div class="min-h-[100svh] md:max-w-xl md:border-r md:border-l border-gray-700 mx-auto">
            <Component />
          </div>
        </div>
      </body>
    </>
  );
}
