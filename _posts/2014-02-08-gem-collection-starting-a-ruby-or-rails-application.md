---
layout: post
title: Gem Collection - Starting a Ruby or Rails Application
---

Creating a project from scratch always require remembering about which Gems and what usefulness they had on your past projects. If you need to use some library for a specific problem that fits in a category, use [Ruby-Toolbox categories](https://www.ruby-toolbox.com/categories/by_name).

My current problem was remembering which Gems I used for keeping my code clean and add some performance to my projects. Those Gems are listed on very specific categories on Ruby Toolbox, so I have created a list of my favorite ones:

## Environment Independent:

* localtunnel.me (npm)

When I need to show my localhost to the world, I use the [defunctzombie/localtunnel](https://github.com/defunctzombie/localtunnel). This npm library is very performatic and creates a tunnel for you using HTTPS, so it is a double win.

* pry

"I want a debugging console where I can see all my variables, check my source code and modify my dev environment. Oh, and it needs to make coffee too."

If you always wanted that, you were asking for [pry](https://github.com/pry/pry). Every Ruby dev knows about it, and should know about it. It is a powerful shell for Ruby that can be binded anywhere in your code.

Tip: Remember to check the [pry wiki](https://github.com/pry/pry/wiki/Source-browsing#wiki-Show_method) for the `show-source` and `show-method`. This was a great tip from [grillorafael](https://github.com/grillorafael).

* reek

[troessner/reek](https://github.com/troessner/reek) detects code smells. Very good tip for beginners rubyists or experts with sleep privation.

* rubocop

[bbatsov/rubocop](https://github.com/bbatsov/rubocop) is an excelent Gem to keep a project within a style guide. [This blog post](http://www.joeloliveira.com/2014/02/06/maintain-style-with-rubocop.html) gives a basic explanation about its use and how it can maintain your code with the same style among developers.

## Rack Applications:

* better_errors

It is true that Rails 4 introduced a new and friendlier error interface for our development environments, but it can't be compared to [charliesome/better_errors](https://github.com/charliesome/better_errors).

This Gem introduces a great error interface. It allows you to debug your errors and interact within the error context (if you add the `binding_of_caller` Gem, as described in the [better_errors installation guide](https://github.com/charliesome/better_errors#installation))

* rack-mini-profiler

[miniprofiler/rack-mini-profiler](https://github.com/miniprofiler/rack-mini-profiler) adds a simple speed badge in your development environment. Don't misjudge this little badge. Click on it and see its real power! It shows your total page load time per view and the amount of time spent on your database. This Gem is wonderful when you are trying to speed up things on your application.

## Rails:

* bullet

Trying to avoid dumb and slow ActiveRecord queries? Try [flyerhzm/bullet](https://github.com/flyerhzm/bullet). This gem helps you finding N+1 situations and when you should eager load instead of lazily use lazy loading.

* rails_best_practices

[railsbp/rails_best_practices](https://github.com/railsbp/rails_best_practices) can be compared to the *reek* Gem, but it is Rails specific. It uses various metrics to help you write a better and cleaner Rails application.

* spring

[rails/spring](https://github.com/rails/spring) is a Rails preloader, that speed up things in development so you can run `rails s` and your test environment (almost) without any delay.

spring will be [enabled by default on Rails 4.1](http://edgeguides.rubyonrails.org/4_1_release_notes.html#spring-application-preloader), but in the meanwhile, you can just install it and run your specs in the speed of light.

* zeus

[burke/zeus](https://github.com/burke/zeus) is like the *spring* Gem, but it can preload other Rails commands like `rails g`.

## Bonus Gem:

* table_print

This guy caught my attention after I checked his comment on two blog posts. The [arches/table_print](https://github.com/arches/table_print) Gem helps you debugging your objects in a table format. Pretty neat. It reminds me of the JavaScript [`console.table` command](http://blog.mariusschulz.com/2013/11/13/advanced-javascript-debugging-with-consoletable).
