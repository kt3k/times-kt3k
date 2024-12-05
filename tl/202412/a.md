---
date: 2024-12-05T12:47:05.001824801+00:00[UTC]
author: kt3k
---
Found a bug of esbuild_deno_loader for the first time! https://github.com/lucacasonato/esbuild_deno_loader/pull/157

This was necessary for bundling vscode extension code. The specifier "vscode" can't be bundled and needs to be "external", but it can't be externalized by esbuild_deno_loader because of the above bug.
