---
layout: post
title: Puma and Unicorn - Fiddling with both servers
---

After seeing [Heroku announce their change on recommending Puma over Unicorn](https://devcenter.heroku.com/changelog-items/594), I decided to write about my past experiences with both servers, their configuration and maintenance process.

In this post I'll talk about my experiences (and hard times) configuring Unicorn, and how was easy to setup Puma server instead of using my old Unicorn configurations.

## Unicorn (and Rainbows)

Unicorn denominates itself as a "server for fast clients". If you don't know what are the differences between slow/fast clients, read this small [StackOverflow answer](http://stackoverflow.com/questions/7487868/what-does-unicorn-consider-to-be-fast-and-slow-requests#answer-7490035). This answer is old, but it remains updated with the Unicorn reality, and the differences about the Rainbows implementation.

### Configuration

So, Unicorn is great, [Github use this since 2009](https://github.com/blog/517-unicorn), and if I have many long pooling requests on my application I'll use Rainbows. Ok, so let's get this server to work.

There were times where configuring Unicorn was hard, and there was no Capistrano recipes for you to fiddle. That scenario changed and now we have the [capistrano-unicorn-nginx](https://github.com/capistrano-plugins/capistrano-unicorn-nginx), a gem that use Capistrano to configure Nginx and Unicorn on your server, and *voilà*! You have a working configuration on your remote server. This project provides you some templates that ease up the "search and experiment" process for configuring your server.

> This gem is rather new (first commit on 29 Mar 2014), so before that, you would need to search the internet and the [not so great on UI Unicorn docs](http://unicorn.bogomips.org/) to understand what was happening. The Unicorn docs are ugly, but it is very resourceful!

If you don't like the default templates given by the `capistrano-unicorn-nginx` gem, the folks that develop GitLab have a [great commented Unicorn configuration file named `unicorn.rb.example`](https://github.com/gitlabhq/gitlabhq/blob/c47328948b5fff218c68279260a57ab6b03e7423/config/unicorn.rb.example). Its source code is very well documented, you'll understand which configurations you should customize to better tune your server.

> Note: Rainbows uses exactly the same configurations and signals as the Unicorn server, so you should not worry about configuration rewriting.

#### Upstart

One challenge I had on a server, was that Unicorn was eating too much memory and shutting itself down. When I searched about the problem, I was amazed to see that it is a [very common problem with Unicorn](https://www.digitalocean.com/community/tutorials/how-to-optimize-unicorn-workers-in-a-ruby-on-rails-app), and there is even a gem to [handle its workers memory hunger. Enter `unicorn-worker-killer`!](https://github.com/kzk/unicorn-worker-killer)

To solve my problems, I searched an Upstart script to keep my Unicorn server alive, even if the `unicorn-worker-killer` strategy didn't work out. I now had (yet!) another problem: finding a reliable Upstart script for unicorn. There are several out there, and I experimented with all of them. In the end, if you try them out, you'll get one that work out for you:

* [https://gist.github.com/nebirhos/bc6c374cdee98b84bc65](https://gist.github.com/nebirhos/bc6c374cdee98b84bc65)
* [https://gist.github.com/errordeveloper/4329034](https://gist.github.com/errordeveloper/4329034)

## Puma (enter the speed)

Puma is a server for Rack apps that is "Built for Speed & Concurrency". They handle [concurrency](https://github.com/puma/puma#built-for-speed--concurrency), [slow clients](https://devcenter.heroku.com/articles/deploying-rails-applications-with-the-puma-web-server#slow-clients) and is way less memory hungry than Unicorn/Rainbows.

### Configuration

Puma configuration is rather easier than the Unicorn. There are resources on the [official repository](https://github.com/puma/puma#configuration) and also a complete [Capistrano + Unicorn solution (`capistrano-puma`)](https://github.com/seuros/capistrano-puma).

The `capistrano-puma` gem offers the same solutions as the `capistrano-unicorn-nginx` project, so you can manage to quickly serve a running configuration with a few `cap` commands.

#### Upstart

Puma have its own solution for `init.d` and Upstart solution. They call it [Jungle](https://github.com/puma/puma/tree/master/tools/jungle) and they are maintained by the Puma developers.

# Conclusions

If you are starting a new project and want to ease up the server configuration process, go with Puma. With my past experience (and traumas), having a modern server that is easy to configure is really the way to go if you don't want headaches.

> PS: I'm trying to get time to replace Unicorn for Puma in some of my work projects. When (or if) I do that, I'll post the results here.

## Update - Results (13/02/2015)

I've replaced successfully one of the projects from my work, using the Puma related gems described in this post. The transition was made following these steps:

1. Changing Capistrano recipes (using the `capistrano-puma` gem)
2. Updating upstart scripts
3. Choosing Puma strategy (workers or multi-threaded. I chose multi-workers with phased-restart strategy, for real zero downtime and no request hangs)

With these three simple steps, I was able to replace a buggy Unicorn upstart script and an unfriendly configuration environment for the production machines, easing up my future job on scaling horizontally this project.

I've only found a caveat on the default puma configuration: configuring a zero minimum threads for the Puma workers was causing Puma threads to open many connections to my database and not closing them. The solution was setting the min threads and max threads to the same value, as describe on the [Puma configuration file example](https://github.com/codetriage/codetriage/blob/ebd5c8f3667626e91cf2594a0e840e12507bf109/config/puma.rb) [referenced on the Heroku article](https://devcenter.heroku.com/articles/deploying-rails-applications-with-the-puma-web-server#sample-code)

Currently, my puma configuration is like this:

```ruby
directory '/sample_folder/current'
rackup "/sample_folder/current/config.ru"
environment 'production'

pidfile "/sample_folder/shared/tmp/pids/puma.pid"
state_path "/sample_folder/shared/tmp/pids/puma.state"
stdout_redirect '/sample_folder/shared/log/puma_access.log', '/sample_folder/shared/log/puma_error.log', true

threads 5,5 # Min-max threads set to the same value

bind 'unix:///sample_folder/shared/tmp/sockets/puma.sock'
workers 2 # Workers strategy

preload_app!

on_worker_boot do
  ActiveRecord::Base.establish_connection
end
```
