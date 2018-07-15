---
title: Rails url_for and strong parameters aren't fast
layout: post
---

In this article I'll describe a Rails performance caveat that I've recently faced on a project: Rails strong parameters and its routing are not performant and should be avoided if you are generating many URLs.

## Scenario

The project needed a faceted filter which would generated thousands of URLs. Within a single faceted filter object, I had to generate an URL with the current URL merged with a given object's set of options.

A common approach to this issue would be using Rails' `url_for` and strong parameters. I ended up writing the following method for my view object:

```ruby
def current_path(options = {})
  permitted_params = params.permit(DEFAULT_PERMITTED_PARAMS).merge(options)
  url_for(permitted_params)
end
```

Cool! That's concise, secure and it'll give me the current URL with all extra options I want to merge with it.

As you can imagine, there's was a caveat: this was slow.

## Benchmarks

How slow? Pages were taking 500 milliseconds to 800 milliseconds to load, with a single user request and a heavy CPU load. I knew there was something wrong on that view.

After profiling that the `current_path` method was the one to blame, I ran a couple of benchmarks to test how the Rails way would compare to a pure Ruby stdlib approach. Using Ruby's stdlib `URI`, the method could be written as:

```ruby
def current_path(options = {})
  permitted_params = request.parameters.slice(*DEFAULT_PERMITTED_PARAMS) # Avoid strong parameters 
  uri = URI(request.original_url) # Get the current URL through the request
  uri.query = permitted_params.merge(options).to_param
  uri.to_s
end
```

Here's the benchmark code:

```ruby
# Inside the `app/controllers/benchmark_controller.rb` file

def show
  uri = URI(request.original_url)

  Benchmark.ips do |x|
    x.report("ActionDispatch::Routing::UrlFor#url_for with query string") do
      params.permit(:id)
      url_for(params.permit(:id)) # => http://localhost:3000/?id=42
    end

    x.report("Ruby stdlib URI") do
      uri.query = request.params.slice(:id).to_param
      uri.to_s # => http://localhost:3000/?id=42
    end

    x.compare!
  end
end
```

The results were quite interesting, given two different scenarios I often observed:

1. Users requests fit strong parameters, it didn't need to cleanup user input
2. Users requests didn't fit strong parameters, it needed to cleanup user input

### Results with parameters that were permitted

Example request to URL `http://lvh.me:3000/?id=42`

```text
Warming up --------------------------------------
ActionDispatch::Routing::UrlFor#url_for with query string
                       735.000  i/100ms
     Ruby stdlib URI     9.807k i/100ms
Calculating -------------------------------------
ActionDispatch::Routing::UrlFor#url_for with query string
                          7.449k (± 4.8%) i/s -     37.485k in   5.044535s
     Ruby stdlib URI    103.079k (± 4.9%) i/s -    519.771k in   5.054106s

Comparison:
     Ruby stdlib URI:   103079.2 i/s
ActionDispatch::Routing::UrlFor#url_for with query string:     7448.5 i/s - 13.84x  slower
```

### Results with parameters that were not permitted

Example request to URL `http://lvh.me:3000/?id=42&count=123`

```text
Warming up --------------------------------------
ActionDispatch::Routing::UrlFor#url_for with query string
                       309.000  i/100ms
     Ruby stdlib URI     9.325k i/100ms
Calculating -------------------------------------
ActionDispatch::Routing::UrlFor#url_for with query string
                          3.051k (± 8.4%) i/s -     15.450k in   5.101804s
     Ruby stdlib URI     81.424k (± 3.8%) i/s -    410.300k in   5.046415s

Comparison:
     Ruby stdlib URI:    81423.9 i/s
ActionDispatch::Routing::UrlFor#url_for with query string:     3050.7 i/s - 26.69x  slower
```

## Analyzing results and conclusion

Given that `url_for` + strong parameters had a 3k iteration per second (on its worst case scenario) and that some rendered pages had more than 1500 anchor tags, that easily could consume 500 milliseconds of processing time, only to render faceted filtering!

Rails ease and magic comes with a performance cost. Its router methods are easy to use, but keep in mind you will need to move away from the Rails way if you want faster responses.
