---
date: 2023-08-14T11:11:36.246096232+09:00[Asia/Tokyo]
author: kt3k
---
semver の prerelease の中で dot 区切りの中の識別子が 04 みたいな leading 0 を持った数値になってしまうと semver 全体として invalid になってしまう問題がある。これは誰が悪いんだろう?

例えば、[この issue](https://github.com/dependabot/dependabot-core/issues/5708) の中で上がっているバージョンの中で、無邪気に `v2.285.1-ubuntu-20.04` というのが出てくるのだけど、この prerelease `ubuntu-20.04` の中の `04` が leading 0 な numeric になってバージョン全体が invalid になる。その次の `v2.285.1-ubuntu-20.04-2bd6d63` は `04-2bd6d63` となって、ここは alphanumeric と解釈されるので invalid にならない。このタグ付けをしている人は明らかに semver のこのルールの事を知識として持っていない。
