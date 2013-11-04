---
layout: post
title: How To - Compiling assets locally with Capistrano
---

Check the gist at the end of the post for the Capistrano task that compile Rails assets locally and upload them to your server.

**TL;DR**

I love Capistrano. Everybody who do not know about it, should know: It is an awesome automation utility for deploying your code to remote servers.

*For those who do not know Capistrano, please [check their website](http://www.capistranorb.com/) and learn it (quick!).*

With Capistrano, you can turn tedious deployment tasks that took hours to do, to an bunch of automated recipes that run in front of your eyes. Simple as this.

Capistrano is written in <span class="ruby">Ruby</span>, but you can setup it with any language of your preference. Its really easy to install it: with a `gem install capistrano` and a `cap deploy`, you can set a entire new server. For further details on how to setup and install the gem, check their README session and [follow up the instructions](https://github.com/capistrano/capistrano/blob/master/README.md#installation).

There are some points that I recommended before you use Capistrano in your deployment workflow:

1. Check if you have passwordless SSH access to your remote machine. If you use default Ubuntu SSH settings, just add your `id_rsa.pub` content to the `~/.ssh/authorized_keys` of your logging user
2. Before anything, run `cap deploy:check` to verify if your remote machine have the necessary folders to run the Capistrano tasks
3. If your machine does not have the necessary folders, run `cap deploy:setup`, and Capistrano will take care of creating its necessary folder structure
4. You can always check all Capistrano tasks available to you running the `Cap -T` command (and `Cap -vT` for tasks without documentation)

## Capistrano and Rails assets

After a couple of minutes playing with Capistrano on Rails production environment, you'll notice that you do not get assets precompiling or `bundle install` by default on `cap deploy` task. To activate them, you should add `require 'bundler/capistrano'` to your `deploy.rb` file and uncomment the line `load 'deploy/assets'` on your `Capfile`.

In my case, compiling assets on production environment was a very bad experience. It was a VPS running with just 512MB RAM, and only one processor. So, what if we could compile these assets locally (generally 8GB+ RAM and quad core processors), and then upload? It's easy!

After a little research and some gists later, I found [this blog post](http://fernando.blat.es/post/12563486374/optimize-deploy-time-compiling-your-assets-locally) that had the answer to my question. This gist is based on Fernando Blat's post, with some little adjustments. Enjoy :)

{% gist 6303123 %}