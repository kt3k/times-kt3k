---
date: 2026-03-20T13:37:34.605854529+00:00[UTC]
author: kt3k
---
https://github.com/qwibitai/nanoclaw
openclaw clone の nanoclaw、skills over features なんていうポリシーを掲げている。例えば、telegram と通信するコードを feature として実装するのではなくて、telegram と通信する feature を作ってくれる claude skill を contribute せよ、ということらしい。

claude code は十分に賢いという前提に立てば、それで良いのかもしれない。ただし、各スキルの正しさは CI でチェックされていないので、理論上は「いつの間にか壊れていた」があっても何もおかしくない状態。
