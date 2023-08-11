// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { AppProps } from "fresh/server.ts";

export default function App({ Component }: AppProps) {
  return (
    <div class="min-h-screen bg-black text-gray-100">
      <Component />
    </div>
  );
}
