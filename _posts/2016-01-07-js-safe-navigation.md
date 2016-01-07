---
layout: post
title: JS Safe Navigation - Benchmark
---

I started this year thinking on Ruby's 2.3.0 safe navigation operator and how interesting it is to finally get the Elvis operator on Ruby.

I've bumped into a large JSON from a API that needed to be parsed on the JS for a React component. Thinking about that safe navigation behavior, I looked after a JS implementation of the Elvis operator.

Since JS has gained some really good attention these past years, there should be a good answer to this question, right? Yeah, there isn't.

I searched around the internet and found a couple of good answers to my question, but I didn't trust their efficiency over the most simplified version: just using the boolean `&&` as a short circuit.

I've studied the benchmark behind those functions and here are my results:

{% gist 566fe6f217832132fddf %}

Conclusion: as expected, the simplest approach (Boolean + short circuit) is the fastest one, but it's just impossible to repeat your object + properties over and over.

I would suggest to use Joe Gornick's implementation, as it's quite fast and it has a nice API as well.
