---
date: 2026-05-25T02:03:01.144581071+00:00[UTC]
author: kt3k
---
https://deno.com/blog/v2.8#settimeout-and-setinterval

Deno 2.8、setTimeout と setInterval が Node の Timeout オブジェクトを返すようになってしまった。実害がありそうな breaking change で、とても微妙な気がする。

release note のコメント「breaking change だけど実質影響はない」みたいに書かれているけど、あまり調べた形跡がない。というかちゃんと調べたら大きい実害が発見されるはず (`Record<string, number>` に setTimeout の返り値入れてるとかあるはず)。だいたい WPT が落ちるようになる変更が実害じゃないという考え方がちょっとおかしい。
