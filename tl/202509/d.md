---
date: 2025-09-04T05:23:10.004389959+00:00[UTC]
author: kt3k
---
frontend の signal, js の reference 経由で渡すんじゃなくて、string を key とした独自 namespace 経由で渡す方が嬉しいかも知れない。

js の reference 経由渡しだと、そこの依存性が強すぎてテストがしづらい
