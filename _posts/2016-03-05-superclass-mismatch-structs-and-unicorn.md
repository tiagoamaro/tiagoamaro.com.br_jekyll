---
layout: post
title: Ruby Superclass Mismatch, Structs and Unicorn
---


Recently, I have found an Unicorn deployment bug that raised my attention on how Ruby's native `Struct` object is implemented and how different is using its declaration APIs.

Usually, when we are declaring Structs on our algorithms, we (naively) write this:

{% highlight ruby %}
class Thing < Struct.new(:excerpt)
  # ...
end
{% endhighlight %}

The interesting aspect of this kind of declaration is that `Struct.new` inheritance will always instantiate a new class!

{% highlight ruby %}
> Struct.new(:excerpt)
=> #<Class:0x007fe4511d3778>
> Struct.new(:excerpt)
=> #<Class:0x007fe4511d3778>
{% endhighlight %}


In other words, if your application server is using the hot reload feature (`preload_app` flag turned to true), you'll be seeing the following error on your next deploy:

{% highlight text %}
TypeError: superclass mismatch for class Thing
{% endhighlight %}

This error is not so explicit about what's going on behind the scenes. The fact that `Struct.new` is actually creating a new class every time it's running, and different parts of your code are trying to redundantly declare a class with a different parent, isn't so clear when the `superclass mismatch` error is raised upon the `Struct.new` inheritance!

Example:

{% highlight ruby %}
# $ irb
> class Thing < Struct.new(:excerpt); end
=> nil
> class Thing < Struct.new(:excerpt); end
=> TypeError: superclass mismatch for class Thing
{% endhighlight %}

> Doesn't look like a superclass mismatch, does it?

## Solution

Instead of using the inheritance syntax, use the constant attribution syntax:

{% highlight ruby %}
Thing = Struct.new(:excerpt) do
  # ...
end
{% endhighlight %}

This way, you won't have any issues with super classes, and your constant will behave exactly like you first intended, without raising any errors!

> If you are curious to see how this is actually implemented on Ruby core, I recommend you to read the source code on the [`Struct::new` docs](http://ruby-doc.org/core-2.3.0/Struct.html#method-c-new). You'll see that the block version instantiates an anonymous struct to any variable you like.
