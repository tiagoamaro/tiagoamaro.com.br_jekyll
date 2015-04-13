---
layout: post
title: RVM and Global Gemsets - Never Reinstall Nokogiri Again!
---

How many times did you wait to Nokogiri or any other gem that has C dependencies to compile when you create a new gemset?

So ok, you can install the gem in your global gemset of your current Ruby version, but if you must keep changing projects and has more than 5 Ruby versions in your machine, that's pretty lame.

This gist will help you install any gem you like within the global scopes of your rubies in your RVM environment.

{% gist 6f39c056f57c5b75e801 "globally_install_gems.sh" %}

## Example

If you want to install many versions of Nokogiri at once, use the following command:

{% gist 6f39c056f57c5b75e801 "example.sh" %}

**Warning!** This will surely cause a 100% CPU and a laggy machine!!!