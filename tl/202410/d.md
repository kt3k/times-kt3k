---
date: 2024-10-24T15:24:57.774497737+00:00[UTC]
author: kt3k
---
Try fixing race condition in node compat in Deno, which happens only when initiating http request with some special http agent (`HttpAgent` in `@npmcli/agent`), which swaps the timing of the critical events like `connect` and `socket`. This fix has required really abstract understanding of the internal of node.js stream, Deno's op, and relationship/jaggling between these two.

https://github.com/denoland/deno/pull/25470/commits/c47898e2b1660f5bb6fe0e522b0f02e87cfaae4d
