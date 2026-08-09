# Project notes

## Tailwind CSS migration

Migrating this site's CSS to Tailwind v4 only. See global preference: vanilla
Tailwind v4 default scale values only — no arbitrary values (`w-[123px]`), no
theme extensions, unless explicitly approved.

## Do not touch: third-party / vendored CSS

`_scss/mastodon-timeline.scss` styles the Mastodon embed feed timeline widget
(<https://gitlab.com/idotj/mastodon-embed-feed-timeline>). Its classnames
(`mt-timeline`, `mt-body`, `mt-toot`, `loading-spinner`, etc.) are injected
dynamically by `public/js/mastodon_timeline.js`, also vendored third-party
code. Do not convert this file to Tailwind or otherwise touch it during the
migration — it's external, not site-authored CSS.
