---
layout: post
title: RVM - Install bundler after any use command
---

If you use RVM, it's possible that you noticed that [RVM no longer ships with bundler](https://github.com/rvm/rvm/issues/3366). It's quite boring to repeatedly type `gem install bundler` every time that you installed a new Ruby or created a gemset (even if you just install `bundler` in a `@global` gemset).

I was a bit tired on running this every time I installed a new ruby or created a new gemset, and decided to write a [RVM hook](https://rvm.io/workflow/hooks) that reminds be that I don't have bundler installed, and will do this for me automatically :)


Here's the bash script:

```bash
BUNDLER_IN_GEM_LIST=`gem list | grep '^bundler\s' | wc -l`

if [ $BUNDLER_IN_GEM_LIST -eq "0" ]
then
    echo "No bundler detected, executing \"gem install bundler\""
    gem install bundler
fi
```

Just pick this script and save on the `~/.rvm/hooks` folder with the `after_use_[any name you like]` pattern, and make it executable.

Example:

```bash
cd ~/.rvm/hooks # Go to RVM hook's folder
vim after_use_install_bundler_if_necessary # Copy and paste the script content and save it
chmod +x after_use_install_bundler_if_necessary # Make it executable
```

After this, every time RVM execute a "use" command (cd to a project folder with `.ruby-version`/`.ruby-gemset` files or explicitly running `rvm use`), it'll install bundler if that's not detected.
