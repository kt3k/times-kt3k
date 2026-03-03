---
date: 2026-03-03T03:40:13.720213678+00:00[UTC]
author: kt3k
---
こういう `defer` util 書けるな・・。もう、これだったら defer キーワードが欲しくなってくるけど

```ts
await using _ = defer(async () => { ... })
```
