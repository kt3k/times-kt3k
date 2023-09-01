---
date: 2023-09-01T16:44:39.988279944+09:00[Asia/Tokyo]
author: kt3k
---
誕生日を入れると、年齢を number で返してくれる関数 (誕生日は Date でパーズできる形式)

```js
const age = (s) => (Date.now() - new Date(s)) / (365 * 24 * 3600 * 1000)
```
