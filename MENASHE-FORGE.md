# baharal-hugoblox

The Menashe Forge sites' own theme, started as a fork of [HugoBlox/kit](https://github.com/HugoBlox/kit) at `68cbf335` (2026-05-27). Only `modules/blox` is used; its module path is `github.com/shahar-baharal/baharal-hugoblox/modules/blox`. Since 2026-11-12 it no longer follows upstream: no merges, no upstream remote. Why: `menashe-forge/docs/business/decisions.md` → "HugoBlox: fork it".

## Rules

1. Our own code: refactor, rename or delete whatever makes the theme easier to maintain. Upstream's layout is no constraint.
2. One change per commit: `fix(<area>): …`, `feat(<area>): …` (an option) or `refactor(<area>): …`, with the reason in the body.
3. Options are opt-in: a new option leaves every site's current look unchanged until it sets it.
4. One look for every site: spacing, padding and alignment come from the theme. A site that differs only in these is a leftover per-site patch: drop it, don't turn it into an option. To change the look, change it here, for all sites.
5. Layout belongs to the section, not the block: the section wrapper (`layouts/_partials/functions/parse_block_v3.html`, `.hbb-section`) owns the space around a block, top, bottom and sides (`--hb-gutter`). A block styles only its inside: no outer side padding or margin. To run to the screen edges, a block's strip uses `hbb-bleed`, or a section sets `design.full_bleed: true`.

What changed since the fork: `git log 68cbf335..main -- modules/blox`.

## Options added

| Param (`params.hugoblox.…`) | Effect |
|---|---|
| `hooks.<hook>` (list of partial names; `body_end` for `body-end`) | Renders those partials at that hook, so a module's partials can hook in. Upstream only reads the site's own `layouts/_partials/hooks/<hook>/`. The fork ships `set-header-height` (sets `--header-h` to the sticky header's height, for a hero that fills the screen below it) |
| `smooth_scroll = true` | Smooth scrolling for in-page links (`motion-safe`) |
| `header.cta.icon` (a `get_icon` name, e.g. `hero/phone`, `brands/whatsapp`) | The header CTA becomes one icon link on every screen size, `header.cta.text` as its accessible name; the mobile menu drops its CTA copy |
| `header.cta.new_tab = true` | The header CTA opens in a new tab |
| `header.logo_dark` (an asset path, e.g. `media/logo-dark.png`) | With a PNG logo: that image replaces it in dark mode |

| Block or data option | Effect |
|---|---|
| `design.media_mobile: small` (hero, split layouts) | Below `lg`, a small decorative copy of the image above the text replaces the full image stacked under it, so the call to action stays on the first screen |
| `design.compact: true` (features, `grid` layout) | Icons and names only, no descriptions, two columns on phones and three from `lg`: a short list on the homepage while a subpage shows the same items in full |
| `design.media_frame: false` (hero) | The hero image drops its shadow and ring, e.g. for a transparent PNG |
| `surfaces.section_alt` (`background`, `foreground`) in a theme pack's `light`/`dark` table | Background of every second landing-page block (class `hbb-section-alt`, counted from the first block shown); a block's own `design.background` paints over it. Default: the page background with 5% of the text color. The footer's default is a third color neither block color can match (light: the brand's darkest shade, `primary-900`, with white text; dark: the page background toward black); `surfaces.footer` overrides it |
| `colors.on_primary` in a theme pack's `light`/`dark` table (a color) | Text color on primary-filled buttons (hero `solid`, `contact-info`), default white. For a light dark-mode primary, set the dark one to the dark background |
| `data/contact.yaml` (`email`, `phone`, `whatsapp`) | `contact-info` falls back to it after the block's `content`, before the author profile: one source for every language |
| `params.icon` on a `footer` menu entry (a `get_icon` name) | That icon before the entry's name |
| `params.root_absolute: true` on a `footer` menu entry | Links to the site-root path, not the language's (e.g. `/admin/` from `/he/`), in a new tab |
| `whatsapp` in `contact-info`'s `content` (or `data/contact.yaml`, or the author profile): digits after `wa.me/`, country code first, no `+` | A WhatsApp row after the phone, opening a chat in a new tab |

## Planned: a footer that stands apart from the last block

Shahar's intention (2026-11-05): on every site, the footer's background differs from the last block's, so a visitor sees two parts, not one. Each site used to get this by hand. The plan is to make it the fork's default behavior; it isn't built yet.

Follows it: baharal. Its sections alternate plain/alt (alt = `var(--hb-color-footer-bg)`), the footer is alt, so its last section is always plain (its `CLAUDE.md`).

Doesn't follow it yet: eztechrepair, alm-builders and atlas-kosher-tours. Their last block (`#contact`) uses `var(--hb-color-footer-bg)` as its background (the "alt section" tint). That worked while upstream didn't apply the footer tokens, because the footer showed the page background. Since `fix(theme): apply the footer color tokens`, the footer and `#contact` share one color (eztechrepair: `#fff4ec` light, `#0c0c1f` dark).

## Shipping a change

Push to `main`, then bump the sites: `menashe-forge/workflows/scripts/bump.sh` (one site first, by name, if the change is risky).

Never create `modules/blox/v*` tags: `@latest`/`@main` would resolve to them. Upstream's were deleted on 2026-11-05.
