# Project notes

## Tailwind CSS migration

Migrating this site's CSS to Tailwind v4 only. See global preference: vanilla
Tailwind v4 default scale values only — no arbitrary values (`w-[123px]`), no
theme extensions, unless explicitly approved.

## Do not touch: third-party / vendored CSS

`public/js/emfed/toots.css` styles the Mastodon feed embed
(<https://github.com/sampsyo/emfed>, replaced the old
`idotj/mastodon-embed-feed-timeline` widget on 2026-08-09 — same client-side,
live-fetch approach, more stars, DOMPurify-sanitized toot HTML). Its
classnames (`.toots`, `.toot`, `.user`, `.avatar`, etc.) are injected
dynamically by `public/js/emfed/emfed.js` + `core.js` + `client.js`, also
vendored third-party code, plus vendored dependency
`public/js/emfed/dompurify.mjs` (resolved via an import map in
`_includes/javascript.html`). Do not convert `toots.css` to Tailwind or
otherwise touch these files during the migration — they're external, not
site-authored code.

## Migration steps taken so far

1. **Tailwind setup**: `npm install` (exact-pinned `tailwindcss`/`@tailwindcss/cli`
   4.x), `_tailwind/input.css` → `public/css/tailwind.css` via `npm run
   build:css` (or `make build`), linked in `_includes/head.html`.

2. **Cascade layer ordering (`_includes/head.html`)**: the site still compiles
   legacy Sass (`_includes/style.scss` → inline `<style>` via `scssify`) for
   `syntax.scss` (Rouge code highlighting) and `mastodon-timeline.scss`
   (vendored, off-limits above). Per the CSS spec, unlayered CSS always beats
   layered CSS regardless of specificity, and Tailwind wraps its utilities in
   `@layer`. Without intervention, ANY plain legacy selector — including
   Tailwind's own Preflight reset — would win or lose unpredictably. Fixed by:
   - Declaring `@layer theme, base, legacy, components, utilities;` early in
     `<head>`, before Tailwind's stylesheet loads, to lock in layer order.
   - Wrapping the compiled legacy CSS output in `@layer legacy { ... }`.
   - Result: legacy loses to Tailwind utility classes (specificity no longer
     matters), but still beats Tailwind's Preflight reset — so pages/partials
     not yet migrated keep working. **If you add more legacy-CSS-consuming
     partials or delete this layer plumbing, re-verify both directions**: a
     Tailwind utility class must still win against a same-specificity legacy
     selector, and un-migrated raw tags (e.g. `blockquote`, `table`) must
     still get their legacy styling rather than going bare under Preflight.

3. **Migrated to Tailwind utility classes** (one partial/layout at a time,
   smallest-surface-first): `_includes/read_time.html`, `posts.html`,
   `quotes.html` (also dropped its dead `.quote` wrapper divs),
   `_layouts/page.html`, `_layouts/default.html` (content wrapper — kept the
   `content` classname as a hook, see below), `_layouts/post.html` (also
   dropped the dead `.disqus` wrapper div), `_includes/sidebar.html` (the
   big one — bg/text color, responsive fixed/absolute positioning, mobile
   menu arrow, easter egg). `public/js/mobile_menu.js` updated to toggle
   `hidden`/`rotate-45`/`-rotate-45` instead of the old custom classes.

4. **Markdown content typography**: kramdown renders raw tags (`h1`-`h6`,
   `p`, `blockquote`, `table`, `code`/`pre`, etc.) with no class attributes,
   so utility classes in markup can't reach them. Styled instead via a
   `@layer base { ... }` block in `_tailwind/input.css` using `@apply` with
   Tailwind's default scale, mapped to the nearest vanilla value where the
   original legacy value had no exact match. This is what replaced
   `poole.scss`/`hyde.scss`/`custom.scss`, which were deleted entirely along
   with their dead-code cruft (`.message`, `.masthead`, `.related-posts`,
   `.pagination`, unused `theme-base-*` variants — only `theme-base-10` was
   ever applied to `<body>`, and that's gone too now that its rules are
   inlined directly).

5. **Color/font mapping policy**: vanilla Tailwind v4 default scale only, no
   arbitrary values. Where the legacy design used an exact hex/font not on
   Tailwind's default scale:
   - **Decorative/incidental colors** (e.g. muted grays) → nearest default
     palette value by eye/distance, no config change.
   - **Brand-identity values** (sidebar bg/text teal & cream, the
     `Berkshire Swash` wordmark font) → added as named tokens via Tailwind's
     `@theme` block in `_tailwind/input.css` (`--color-teal-800` is already
     default-palette so no token was needed there; `--font-brand` was added
     since Berkshire Swash has no default-palette equivalent). This keeps
     the actual brand asset instead of a lookalike, while still being a
     "vanilla Tailwind mechanism" (`@theme` extension, not an arbitrary
     value in markup).

## Not yet migrated

- `_scss/syntax.scss` — Rouge syntax-highlighting theme (~40 small
  token-color rules, auto-generated shape). Still compiled via the legacy
  pipeline described above. Not started; ask before touching, it's a lot of
  small single-purpose rules and low visual risk/reward to convert.
- `404.html` — standalone page, no `layout:` front matter, never pulled in
  site CSS at all (pre-existing, not a migration gap).
