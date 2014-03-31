---
layout: post
title: Sublime Text - My Personal Choices of Packages
---

<small>This post is based on the [TutsPlus Article: Simple Visual Enhancements for Better Coding in Sublime Text](http://webdesign.tutsplus.com/articles/simple-visual-enhancements-for-better-coding-in-sublime-text--webdesign-18052), but in this article I'm going to narrow the subject to Sublime Text Packages.
</small>

In this post I'm going to list some packages that I use on my everyday job, explaining in what scenarios they are most useful to me.

I've also created a Gist where I always keep my Sublime Text options updated (shortcuts and packages). You can check the [Gist here](https://gist.github.com/tiagoamaro/5268237) if you want.

Note that all packages listed here are available using [Package Control](https://sublime.wbond.net/installation). Package Control is a "must" in Sublime, and if you didn't know about it, install it NOW and stop git cloning your extensions.

So, here is my list:

* [All Autocomplete](https://sublime.wbond.net/packages/All%20Autocomplete)

Sublime auto-complete words using your current opened file as base. This package extends this feature, and use all opened files to enhance its auto complete feature.

*Example*: I have a `user.rb` file where there is a variable named `posts`. I create a new file to write a model for the comments that users can make. In this new opened file I have all `user.rb` words in Sublime auto-complete, helping me to fast type and not making any typos.

* [BracketHighlighter](https://sublime.wbond.net/packages/BracketHighlighter)

As the extensions describes itself: "Bracket Highlighter matches a variety of brackets such as: `[]`, `()`, `{}`, `""`, `''`, `<div></div>`, and even custom brackets."

*Example*: This is very helpful to find lost unmatched brackets or working with deep nesting brackets, like a complex Active Record Join association: `Category.joins(posts: [{comments: :guest}, :tags])`.

* [ColorPicker](https://sublime.wbond.net/packages/ColorPicker)

A universal color picker, working on any platform (OSX, Linux or Windows).

*Example*: An useful feature of this package, it's the selector color picker. You can highlight an hex value that you want to find out what color is and type the package shortcut. It will open with the color selected.

* [Emmet](https://sublime.wbond.net/packages/Emmet)

This extension was called zen-coding, and there was a strong motive for that. It is a wonderful tool to write quick HTML and CSS code (Lorem Ipsum generator included).

*Example*: The snippet `#container>ul.dottet>li*3` will create the following HTML:

```
<div id="container">
  <ul class="dottet">
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
```

* [HTML-CSS-JS Prettify](https://sublime.wbond.net/packages/HTML-CSS-JS%20Prettify)

Turns an ugly HTML, CSS or JS file into something human readable.

* [Markdown Preview](https://sublime.wbond.net/packages/Markdown%20Preview)

The name says for itself. With a simple command you can preview your markdown in your browser with a Github or Python flavored style.

* [Modific](https://sublime.wbond.net/packages/Modific)

A great substitute for GitGutter. This extension allows you to revert modified changes, view old code and it still do the same as GitGutter, showing the modified lines in Sublime gutter.

* [Text Pastry](https://sublime.wbond.net/packages/Text%20Pastry)

Useful tool to quickly insert a sequence. This extension make use of Sublime's powerful multi selectors, easily creating sequences where you want and how you want, also allowing Regex rules and custom sequences.

* [Trailing Spaces](https://sublime.wbond.net/packages/TrailingSpaces)

This handy extension highlights (unpleasant) white spaces. It also comes with a useful [Key Binding](https://github.com/SublimeText/TrailingSpaces#deletion) for erasing all useless white spaces of a file at once!
