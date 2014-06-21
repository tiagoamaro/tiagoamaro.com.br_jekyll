---
layout: post
title: Managing Assets Outside Frameworks (Introducing Comffee)
---

If you want to manage assets outside a framework, check out [Comffee](https://github.com/tiagoamaro/comffee): a GulpJS/GruntJS project that allows you to manage your assets using Sass, CoffeeScript and Bootstrap.

TL;DR

The frontend community developed some great tools in the last years. Projects like [GruntJS](http://gruntjs.com/) and [GulpJS](http://gulpjs.com/) are already used in the daily workflow of many frontend developers around the world, giving these tools a really impressive amount of plugins and functionality.

When I met GruntJS, I was impressed. Grunt automated some very annoying and repetitive tasks, and it could watch any file changes too! If I could not use [Rails asset pipeline](http://guides.rubyonrails.org/asset_pipeline.html), I could configure Grunt to do some dirty work done.

After some reading and configuration, I came up with [Comffee](https://github.com/tiagoamaro/comffee), a project that allows you to use Sass, CoffeeScript and Bootstrap outside Rails. Basically, Comffee is a project that reunites plugins written for Gulp and Grunt, so you can easily create a folder in your project, run `npm install` and get ready to rock.

Comffee has two implementations: [comffee-grunt](https://github.com/tiagoamaro/comffee-grunt) and [comffee-gulp](https://github.com/tiagoamaro/comffee-gulp). For more information about its installation and how it works, check each project description.

## Bonus: Sharing localhost with the world

When you are ready to show your project to other people, you could mix Comffee with [Fenix](http://fenixwebserver.com/). Fenix (only for OSX and Windows) is a project that manages localtunnels for you, making your `localhost:port` of choice easily visible to the outside world.
