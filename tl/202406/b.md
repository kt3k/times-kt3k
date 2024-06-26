---
date: 2024-06-26T15:59:03.125542811+00:00[UTC]
author: kt3k
---
[capsid](https://github.com/capsidjs/capsid) と [capsule](https://github.com/capsidjs/capsule) の後継プロジェクトとして [cell](https://github.com/kt3k/cell) を作った。

capsule の interface を組み替えてより自然な形に組み立て直したもの。関数1個を1つのコンポーネントにするというアイデアは、最近の React から拝借した。

React に限らず Solid や Qwik なんかも、1コンポーネント = 1関数というデザインを踏襲するようになってきていて、フレームワークを超えて共通のパターン言語のようになって来ている気がしたので、このデザインにしたかった。

一番実装が難しい `on` helper とか初回登録時のロジック部分はほぼそのまま capsule から拝借して来ているので、フレームワーク自体はほぼ1日ぐらいで完成。テストケースを追従するのにさらに1日。TodoMVC を移植するのにさらに1日ぐらいの作業量でほぼ完成できた。

[TodoMVC](https://github.com/kt3k/cell-todomvc) を cell で実装してみたところ、全体のバンドルサイズが 2.38 kB になって、capsule の時よりさらに 1kB 程度小さくなった。自分が知る限り飛び抜けて最小サイズで TodoMVC が実装できていてとても気持ちが良い。
