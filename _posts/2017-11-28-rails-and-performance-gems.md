---
title: Rails Performance Gems and Tricks
layout: post
---

A small collection of gems and tricks I use for measuring and enhancing a Rails app performance. I'll keep this post updated with new gems and tricks :)

# Gems

- (Benchmark) [rack-mini-profiler](https://github.com/MiniProfiler/rack-mini-profiler). Profiler for your development and production Ruby rack apps
- (Benchmark) [ruby-prof](https://github.com/ruby-prof/ruby-prof). A code profiler for MRI rubies (Thanks [Ana María](https://twitter.com/anamma_06)!)
- (Benchmark) [derailed_benchmarks](https://github.com/schneems/derailed_benchmarks). Benchmarks for your whole Rails app
- (Cache) [bootsnap](https://github.com/Shopify/bootsnap). Boot large Ruby/Rails apps faster
- (Database/Queries) [bullet](https://github.com/flyerhzm/bullet). Easy detecting N+1 queries
- (Database/Queries) [ankane/dexter](https://github.com/ankane/dexter). The automatic indexer for Postgres
- (Heroku only) [heroku-deflater](https://github.com/romanbsd/heroku-deflater). Add the gem on the production group and enjoy gziped served assets

# Tips

- Use `Rack::Deflater` ([Original post. Thanks Schneeman!](https://schneems.com/2017/11/08/80-smaller-rails-footprint-with-rack-deflate/))

This tip is incredible! It just uses a Rack stdlib to compress your HTML.

Add the `config.middleware.insert_after ActionDispatch::Static, Rack::Deflater` line on your `config/application.rb`, and voilà!

- Set a reasonable `MALLOC_ARENA_MAX` if you have memory bloat ([Original post. Thanks Nate!](https://www.speedshop.co/2017/12/04/malloc-doubles-ruby-memory.html))

Ruby memory allocation can be tricky, as this post is a very deep analysis on what's going on behind the curtains.
