---
date: 2025-03-26T02:29:27.848167142+00:00[UTC]
author: kt3k
---
```
a0. some a { all b { S b != a } }
d0. let 0 { all a { S a != 0 } }
a1. all a b { a = b -> b = a }
a2. all a b c { a = b & b = c -> a = c }
a3. all a b { a = b & b is Nat -> a is Nat }
a4. all a { a is Nat -> S a is Nat }
a5. all a b { S a = S b -> a = b }
a6. all a { S a != 0 }
a7. all pred K { K 0 & all a { K a -> K S a } -> all a { K a } }
```
