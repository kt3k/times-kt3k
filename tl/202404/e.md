---
date: 2024-04-10T01:51:45.244904852+00:00[UTC]
author: kt3k
---
Val town [raised](https://blog.val.town/blog/seed/) 5.5m. It (probably) uses Deno internally. The root concept, learnable programming or end user programming, is very interesting and the product itself looks interesting. However I think it has many problems in design:


(1) The language itself is too complex. I don't think end user consider this as learnable.
  - JavaScript itself is too advanced language to the learners, and Val Town environment is not a good starting point for learning JavaScript (Browsers or local runtimes are better because of the availability of huge documentations, tutorials, blog posts, books, etc).
  - Dependency to npm ecosystem, or Deno ecosystem is further complex to the learners, and it's nearly innaccessbile to them in my view.

(2) Deployment concept in val town looks too abstract and too complex.
  - A deployment can have any interface. This makes the orchestration of deployments very difficult. If you want to connect 2 deployments, you probably needs glue code for it. If you connect 3 deployment, you'll need 3 glue codes. For 4 deployment, 6 glue codes. For N deployment, N(N-1)/2 glue codes. This doesn't scale well.
  - The system should provide some standard interfaces for communication between deployments.

(3) Deployment can't be tested in isolated way.
  - This might be improved in the future, but currently there's no way to unit test them. This prevent the users to develop complex thing.

The 3rd point is currently the blocker for me to use it in a serious way.
