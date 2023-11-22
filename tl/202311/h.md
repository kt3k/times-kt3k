---
date: 2023-11-22T15:31:14.685068901+00:00[UTC]
author: kt3k
---
今年1の渾身の fix https://github.com/denoland/deno/pull/21297

[node-fetch](https://www.npmjs.com/package/node-fetch) と [gunzip stream](https://nodejs.org/api/zlib.html#zlibcreategunzipoptions) と [fs.createWriteStream](https://nodejs.org/api/fs.html#filehandlecreatewritestreamoptions) を組み合わせたら、ダウンロードした [prisma](https://www.prisma.io/) の schema-engine.exe が壊れていたよ、というところから始まって、蓋を開けてみたら vendor して使ってた [readable-stream](https://www.npmjs.com/package/readable-stream) がそもそもバグっていたという話だった。

readable-stream は (具体的な方法はよく分からないけど) 基本的には Node.js 本体の stream 実装をミラーしているので、要は Node.js 本体の Writable に普通に根本的なバグがあった。https://github.com/nodejs/node/issues/46765

そのバグ自体は発見3日後には直されている https://github.com/nodejs/node/pull/46818

これだけ長く使われていてテストも大量に書かれている Node.js の stream に今更バグがあるとは思わなかったので、ここに辿り着く前にあらゆる別の箇所を調査しまくって、可能性をどんどん消していった。犯人の候補が狭くなるに従って、だんだんかなり小さな repro を作れるようになっていって「この repro が出来るということは、これでも再現できるのでは?」という分析のループが回って、気づいたら解決出来ていた。

最終的にこれで repro するということは readable-stream 自体がバグっていたのではないか? -> readable-stream のいろんなバージョンで試す -> 4.3.0 -> 4.4.0 の間で直っている事が分かる。4.3.0 と 4.4.0 の間のコミットを追うと2コミットしかない。

2コミットのうち意味がありそうなのはこっち https://github.com/nodejs/readable-stream/pull/515

Node.js のバージョンを 18.9 から 18.16 に追従したという内容のコミット。これで直るということは Node の 18.9 から 18.16 の間で同じバグ修正がされていたりするのか・・・? -> Node の lib/internal/streams の [history](https://github.com/nodejs/node/commits/main/lib/internal/streams) を追う。

かなり似てる [issue](https://github.com/nodejs/node/issues/46765) とそれの [fix](https://github.com/nodejs/node/pull/46818) が見つかる。-> fix を試しに Deno に入れてみる -> 現象が直った 🎉

とりあえず、直し方は分かったものの、なぜこれで直るのかはいまいち分かってない。Node.js 側の [issue](https://github.com/nodejs/node/issues/46765) でも、こうやったら直った/上手くいったみたいな trial and error の繰り返しで手探りで解を探しているように見える (実装の中身に対する分析がされていない) ので、おそらく誰も理解していないのではないかという気がしている。(よくみると [Ben](https://github.com/bnoordhuis) が、construct 周りで 3回も nextTick してるけど、それは意図的か? という[疑問](https://github.com/nodejs/node/pull/46818#issuecomment-1444775786)を呈している。
