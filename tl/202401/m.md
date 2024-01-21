---
date: 2024-01-21T12:45:17.522117403+00:00[UTC]
author: kt3k
---
とりあえず、vscode-pixeledit のエクステンション側の[テストのセットアップ](https://github.com/kt3k/vscode-pixeledit/commit/0e61cc1f12c8a6aa999fb23da249fa8856df62c9)成功。かなり VSCode にロックインされたテスト環境になっている点が若干怖い。

フロントエンドのテストなんかは JSDOM さえ引っ張ってくれば、Node でも Deno でもテストが書けるけど、VSCode Extension のテスト環境はそういう作りになっていないので、electron 自体立ち上げてみたいな感じになっている。フロントエンドで廃れた [karma](https://github.com/karma-runner/karma) とか [testem](https://github.com/testem/testem) みたいなテスト環境になっている。

個人的には karma / testem は嫌いでは無かったけど、世の中的には受け入れられずに廃れたという経緯があるので、今後 [@vscode/test-electron](https://www.npmjs.com/package/@vscode/test-electron) パッケージがきちんとメンテされ続けるのかというところに不安を感じる (けど、他に選択肢がないので使うしかない)。
