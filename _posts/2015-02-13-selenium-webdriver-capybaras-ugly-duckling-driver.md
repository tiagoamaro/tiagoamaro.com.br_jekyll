---
layout: post
title: Selenium WebDriver - The Capybara Ugly Duckling Driver
---

If you use Capybara as your acceptance test framework (`Test::Unit`, RSpec or Cucumber), you surely know that Capybara has some drivers that give you the capability to run test pages with JS functionality. Some drivers with this ability that you might know are: [`selenium-webdriver`](https://rubygems.org/gems/selenium-webdriver), [`capybara-webkit`](https://rubygems.org/gems/capybara-webkit) and [`poltergeist`](https://rubygems.org/gems/poltergeist).

Each driver has its benefits and disadvantages, but in this article I'll focus on Selenium.

## Why?

There are many comparative articles on the web showing that some headless Capybara drivers can be twice as fast as Selenium ([#1](http://mrlab.sk/selenium-vs-poltergeist-vs-cabybara-webkit.html), [#2](http://blog.lucascaton.com.br/index.php/2012/06/14/replacing-selenium-by-poltergeist/)). So why should we choose it to test our application?

Simple: headless drivers are headless. Here are some facts based on my past experiences:

* They don't show what is happening on their interfaces
* They don't use UIs that real users use
* You only can debug using `pry`, `byebug`, running `save_and_open_screenshot` or `save_and_open_page` (which will give an unrealistic pure HTML page)
* You can't interact with your application
* Sometimes you will have to write a workaround to make your application work.

> If you are familiar to the poltergeist gem, it is possible that you wrote some hacky JS code to send custom events on a certain element of the page. A quick example is described on this [github issue](https://github.com/teampoltergeist/poltergeist/issues/488) where the developer tries to simulate the blur event. The poltergeist team is very efficient and they really do a good work on keeping the gem updated and stable, but the true problem lies on using PhantomJS to simulate an user input.

Selenium will reliably simulate how your user interact with your application, opening (by default) a Firefox instance, and executing what you have written in your acceptance tests.

## Firefox or Chrome?

The default Capybara JavaScript driver is Selenium. It will open a Firefox instance on your machine when executing acceptance tests that are defined to use JS on your test framework (in RSpec for example, you can put the metadata `:js` to make a feature spec use the JS driver).

If you want to change this value, you should set the `Capybara.javascript_driver` variable with a registered driver, and according to the [Capybara docs](https://github.com/jnicklas/capybara#configuring-and-adding-drivers), you should be able to register Chrome as Selenium's browser.

To do that, you could overwrite the default `:selenium` driver, but here, I'll be creating a new Capybara driver just for chrome:

```ruby
Capybara.register_driver :chrome do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end
```

After that, just set the `javascript_driver` to use your newly created `:chrome` driver:

```ruby
Capybara.javascript_driver = :chrome
```

> If you are willing to use Chrome as your webdriver, remember to install [`ChromeDriver`](https://code.google.com/p/selenium/wiki/ChromeDriver) on your machine, otherwise, Selenium will not be able to communicate with your Chrome installation. On OSX, just run `brew install chromedriver` and you are ready to go.

## Nice! But my specs are slow...

Not a problem! Knowing that you can register many drivers as you want, you should be able to choose which driver will run on which spec.

On RSpec, Capybara allows you to choose which driver you want to run using the example metadata ([since Capybara's version 0.4.1!](https://github.com/jnicklas/capybara/blob/0.4.1/lib/capybara/rspec.rb#L15)).

This is very useful if you are debugging a mysterious failing spec. On that spec, you could do this:

```ruby
scenario 'my mysterious spec', :js, :driver => :chrome do
  # ...
end
```