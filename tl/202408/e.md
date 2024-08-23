---
date: 2024-08-23T03:15:11.073911042+00:00[UTC]
author: kt3k
---
[cell](https://github.com/kt3k/cell) の `on` ヘルパーのインターフェースを

```ts
on.click = (e: Event) => {}
```

から

```ts
on("click", (e: Event) => {})
```

に変えた。こちらの方が、素直で分かりやすい気がするのと、まだやっていないけど、この signature だとイベント名からイベントオブジェクトの型を推論させられる (`touchmove` イベントだったら `e` が `TouchEvent` に出来る、等) ので、より便利に出来そうというのが主なモチベーション。
