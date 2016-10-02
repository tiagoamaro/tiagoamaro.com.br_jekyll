---
title: Introducing Pickpocket - Randomly pick an article from your Pocket
layout: post
---

I've just published a gem called [`pick-pocket`](https://rubygems.org/gems/pick-pocket), which helps you empty your [Pocket](https://getpocket.com) library by selecting a random article from your library.

The project is open-source with a MIT license, and it can be found here: [https://github.com/tiagoamaro/pickpocket](https://github.com/tiagoamaro/pickpocket)

## Motivation

For anyone who uses Pocket to store articles to read it later: you know how easy it is to add a bunch of articles on your Pocket library, pilling them up as a huge backlog you want to read but don't have time for it.

Based on my personal non-archived articles, I started checking out how old and how big was my Pocket's library. I was not surprised to get some absurd numbers as:

- More than 500 unread articles
- Oldest unread article is from January 2015
- IFTTT is configured to Pocket favorite tweets, some Feeds, Top Hacker News which leads to an average of 10 extra articles everyday!

Wow!

In other words: if you're facing a large set of articles on your Pocket library, you know you won't be reading that article from 1 year ago so soon.

> I now understand why Pocket rebranded from "Read It Later" to Pocket. They knew people wouldn't be able to read it later.

## Unbiased Choices

Taking decisions is already hard enough on our daily basis, and our tools should be helping us out. Pocket is incredible on storing our links, but it doesn't help a single bit when we're looking at our list trying to figure out what we're going to read next.

Since it's showing our articles sorted by date, our old articles will become older and older, ending up suffering from [starvation](https://en.wikipedia.org/wiki/Starvation_(computer_science)).

What's the best way to choose which articles to read next? Not choosing anything! Let our tools do it for us.

## Enter Pickpocket

Based on those premises, I've created the `pick-pocket` gem. A simple CLI which randomly picks articles from your Pocket. You just need to follow the [repository instructions](https://github.com/tiagoamaro/pickpocket) and the gem should be ready to go.

The goal is: ease of use. Sync your local library, read as many articles as you want, sync again, ad infinitum.

I've been using it for a couple of days now, and I found myself using the following workflow:

- Run 10 times the `pickpocket pick` (with a simple bash repetition)
- Read article
  - I like the article? Then I save it, tag it and archive
  - I don't like the article? Just close my tab and move on
- When I'm done, I run `pickpocket renew` to pick my new articles from my remote list
  - This command also makes sure my unwanted articles are deleted from my Pocket list

## Conclusion

I hope Pickpocket will help you with your Pocket's queue :)
It's already helping me out, digging up articles I didn't even remember I saved from more than a year ago!
