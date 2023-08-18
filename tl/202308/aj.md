---
date: 2023-08-17T16:14:51.302491288+09:00[Asia/Tokyo]
author: kt3k
---
Deno KV、リモートの KV データベースに接続できるようになるらしい。最初からここまで見越していたのかな? すごい https://github.com/denoland/deno/pull/20178

なんか protocol が定義されているらしく、その protocol に従いさえすれば 3rd party が Deno KV のバックエンドを書くこともできるらしい。すごい
