// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { Head } from "fresh/runtime.ts";
import { AppProps } from "fresh/server.ts";
import { CSS } from "x/gfm@0.2.5/mod.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <body class="bg-black">
        <div class="min-h-[100svh] bg-black text-gray-100">
          <div class="min-h-[100svh] md:max-w-xl md:border-r-1 md:border-l-1 border-gray-700 mx-auto">
            <Component />
          </div>
        </div>
      </body>
    </>
  );
}
