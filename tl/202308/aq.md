---
date: 2023-08-19T17:27:38.65165864+09:00[Asia/Tokyo]
author: kt3k
---
Deno の fs 周りの API って一時期 Web の [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API) ベースでデザインし直そうと言う議論があって、デザインに関する議論が全体的にペンディングになっていたと思うけど、その後 File System Access API が サーバーランタイムには不向きすぎる (任意 path アクセスなんかが無い) 事が分かって、議論が有耶無耶になったままのような気がするんだけど、このままで最終デザインになってしまって良いのかな・・・?

[`Deno.FsFile`](https://deno.land/api?s=Deno.FsFile) が出来たことである程度、[`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) ベースの処理がやりやすくなったとは思うけど、`ReadableStream` を指定するために、わざわざ `.readable` でアクセスしないといけなかったり、微妙に最適化されたデザインになっていないような感じもする。
