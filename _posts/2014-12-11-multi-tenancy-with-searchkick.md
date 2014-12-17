---
layout: post
title: Multi-tenancy with Searchkick
---

In this post I'm covering how I used [searchkick](https://github.com/ankane/searchkick) and the [apartment](https://github.com/influitive/apartment) gems to get a powerful search feature for all the tenants in my Rails 4 app.

For those who are familiar with both gems, you can skip to the ["implementation"](#implementation-searchkick-and-apartment) part.

## Apartment and Searchkick

* searchkick

This gem adds some super powers to Elasticsearch in your Rails application, adding some stemming, special characters and misspelling features out of the box. It has some interesting [analyzers and indexes](https://github.com/ankane/searchkick/blob/b31cc20f0062a91378dca5506985cd2f610d5ad8/lib/searchkick/index.rb#L207-L323) that should be carefully analyzed if you want to fully understand what this gem is capable of.

* apartment

This gem easily adds multi-tenancy to your Rails app, adapting its strategy to your needs. You can any RDB you want, but this gem really shines with PostgreSQL, where it uses the full capabilities of its [schemas feature](http://www.postgresql.org/docs/9.1/static/ddl-schemas.html).

In this [gem readme](https://github.com/influitive/apartment/blob/142924205ee09f54fea9c9f498a43eb5d15545c4/README.md#switching-tenants), you can see which is the best strategy for changing database. These strategies are called "elevators", and they help you to switch databases whenever you want inside your app. I chose the [subdomain strategy](https://github.com/influitive/apartment/blob/142924205ee09f54fea9c9f498a43eb5d15545c4/lib/apartment/elevators/subdomain.rb) for the app I was working on, where it made the most sense making many subdomains for each unique username on the app.

The source code of this gem is really great, so writing a custom "elevator" (written as a Rack Middleware) is not hard at all.

## Implementation: Searchkick and Apartment

After installing Searchkick in your Gemfile, and following the instructions [written in the project README](https://github.com/ankane/searchkick/blob/b31cc20f0062a91378dca5506985cd2f610d5ad8/README.md#get-started), you should notice that your model now have some new class methods, including the most important one: the `searchkick_index` method.

The [`searchkick_index`](https://github.com/ankane/searchkick/blob/b31cc20f0062a91378dca5506985cd2f610d5ad8/lib/searchkick/model.rb#L28-L32) method is used all along searchkick, so it can know which Elasticsearch index it should be querying. The `searchkick_index` method source code show us that we can pass a `Proc` to the `:index_name` option, and it will call the block that we passed, allowing us to customize our index name.

So, with those knowledge at hands, we could do something like this:

{% gist aa8f776b3217f2974f69 post.rb %}

And that's it! Every time you change tenants, you'll have Elasticsearch using a different index with a proper name.

You can create a concern for keeping thins DRY, like this:

{% gist aa8f776b3217f2974f69 schema_searchable.rb %}

Your classes should look like this:

{% gist aa8f776b3217f2974f69 post_with_searchable.rb %}


### *How about reindexing all tenants? And the `searchkick:reindex:all` task?*

In a project, just giving different index names for your models will not be enough. Like the searchkick README tell us, you should reindex all models in some situations, and now we have indexes for each model/tenant pair! How we'll do that?

Simple: based on the [`searchkick:reindex:all`](https://github.com/ankane/searchkick/blob/b60462c98ee177ced2e45a566e23373f2e96bcd1/lib/searchkick/tasks.rb) source, You can write a task like this one:

{% gist aa8f776b3217f2974f69 searchkick_index.rake %}


## Final thoughts

Since I've got this problem, I was trying to find an elegant way to work with searchkick and apartment. I've commented on this [searchkick issue](https://github.com/ankane/searchkick/issues/268), but at the time I ended monkey patching the whole `searchkick_index` method. Monkey patching this method works fine, but it will completely overwrite this method! We don't want to mess up with that!

## Sample Rails Project

I've created a sample project that have a `SchemaSearchable` concern and a rake task that helps to reindex all tenants using searchkick. This project can [be found here](https://github.com/tiagoamaro/searchkick-apartment-example)