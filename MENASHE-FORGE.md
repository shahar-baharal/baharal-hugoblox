# baharal-hugoblox

A fork of [HugoBlox/kit](https://github.com/HugoBlox/kit) used by the Menashe Forge sites. Only `modules/blox` is changed; its module path is `github.com/shahar-baharal/baharal-hugoblox/modules/blox`. Why it exists and how to go back to upstream: `menashe-forge/docs/business/decisions.md` → "HugoBlox: fork it".

## Rules (they keep the fork mergeable with upstream)

1. A patched copy, not a new theme: no restyling, refactors, renames or reformatting of upstream files.
2. One fix per commit: `fix(<area>): …` for a generic fix, `feat(<area>): …` for an opt-in option, with the reason in the body.
3. Don't delete unused upstream features.
4. Options are opt-in: defaults match upstream unless the change is a pure fix.
5. One look for every site: spacing, padding and alignment come from the fork. A site that differs only in these is a leftover per-site patch: drop it when the site moves to the fork, don't turn it into an option. To change the look, change it here, for all sites.

What changed: `git log upstream/main..main -- modules/blox`.

## Options added

| Param (`params.hugoblox.…`) | Effect |
|---|---|
| `hooks.<hook>` (list of partial names; `body_end` for `body-end`) | Renders those partials at that hook, so a module's partials can hook in. Upstream only reads the site's own `layouts/_partials/hooks/<hook>/` |
| `smooth_scroll = true` | Smooth scrolling for in-page links (`motion-safe`) |
| `header.cta.icon` (a `get_icon` name, e.g. `hero/phone`, `brands/whatsapp`) | The header CTA becomes one icon link on every screen size, `header.cta.text` as its accessible name; the mobile menu drops its CTA copy |
| `header.cta.new_tab = true` | The header CTA opens in a new tab |
| `header.logo_dark` (an asset path, e.g. `media/logo-dark.png`) | With a PNG logo: that image replaces it in dark mode |

## Planned: a footer that stands apart from the last block

Shahar's intention (2026-11-05): on every site, the footer's background differs from the last block's, so a visitor sees two parts, not one. Each site used to get this by hand. The plan is to make it the fork's default behavior; it isn't built yet.

Follows it: baharal. Its sections alternate plain/alt (alt = `var(--hb-color-footer-bg)`), the footer is alt, so its last section is always plain (its `CLAUDE.md`).

Doesn't follow it yet: eztechrepair and alm-builders. Their last block (`#contact`) uses `var(--hb-color-footer-bg)` as its background (the "alt section" tint). That worked while upstream didn't apply the footer tokens, because the footer showed the page background. Since `fix(theme): apply the footer color tokens`, the footer and `#contact` share one color (eztechrepair: `#fff4ec` light, `#0c0c1f` dark).

## Merging upstream

```sh
git fetch --no-tags upstream && git merge upstream/main
```

Never push upstream's `modules/blox/v*` tags here: their `go.mod` has upstream's module path, so `@latest`/`@main` would resolve to them and fail. They were deleted on 2026-11-05, and the clone's `upstream` remote is set to `--no-tags`.

Then bump a site to the new commit (`hugo mod get github.com/shahar-baharal/baharal-hugoblox/modules/blox@main && hugo mod vendor`) and check its preview before the others.

## Upstream PRs

None sent. Upstream hasn't merged a PR since 2026-03-30; sending fixes waits until it does.
