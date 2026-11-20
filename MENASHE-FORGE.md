# baharal-hugoblox

The Menashe Forge sites' own theme, started as a fork of [HugoBlox/kit](https://github.com/HugoBlox/kit) at `68cbf335` (2026-05-27). Only `modules/blox` is used; its module path is `github.com/shahar-baharal/baharal-hugoblox/modules/blox`. Since 2026-11-12 it no longer follows upstream: no merges, no upstream remote. Why: `menashe-forge/docs/business/decisions.md` → "HugoBlox: fork it".

## Rules

1. Our own code: refactor, rename or delete whatever makes the theme easier to maintain. Upstream's layout is no constraint.
2. One change per commit: `fix(<area>): …`, `feat(<area>): …` (an option) or `refactor(<area>): …`, with the reason in the body.
3. Options are opt-in: a new option leaves every site's current look unchanged until it sets it.
4. One look for every site: spacing, padding and alignment come from the theme. A site that differs only in these is a leftover per-site patch: drop it, don't turn it into an option. To change the look, change it here, for all sites.
5. Layout belongs to the section, not the block: the section wrapper (`layouts/_partials/functions/parse_block_v3.html`, `.hbb-section`) owns the space around a block, top, bottom and sides (`--hb-gutter`). A block styles only its inside: no outer side padding or margin. To run to the screen edges, a block's strip uses `hbb-bleed`, or a section sets `design.full_bleed: true`.
6. One code path for both reading directions: horizontal layout uses start/end, never left/right, in option names too (hero `split-start`, `alignment: start`). Start is where reading begins: left in English, right in Hebrew. Code uses (Tailwind `ps-`, `ms-`, `start-`, `text-start`, `border-s`; CSS `padding-inline-start`, `inset-inline-end`). No `dir === "rtl"` checks where the browser can do it (e.g. `scrollIntoView`). Arrow and chevron icons mirror via `get_icon_svg`. Phone numbers and other left-to-right text get `dir="ltr"`. A deliberate exception carries `rtl-lint: ok` and why. `menashe-forge/docs/themes/hugoblox/scripts/rtl-lint.sh <fork-dir>` checks it.
7. Interface text (button labels, headings the block adds, screen-reader labels) goes through a translation key, never written into the block: in `block.html`, `i18n "block_<id>_<what>"`; in a Preact block, list the keys under `"i18n"` in its `manifest.json` and read them with `useT()` (`blox/shared/js/i18n.js`). English goes in `i18n/en.yaml`, Hebrew in `i18n/he.yaml`. A site changes any of them in its own `i18n/<lang>.yaml` (same `id`), and Hugo uses the site's version.

8. Few colors in, the rest derived: a theme pack sets the brand colors (`primary`, `secondary`, `neutral`) and each mode's page `background`/`foreground`. Every other color is computed from those in `layouts/_partials/functions/theme_variables.html` (header, alternate section, footer, form borders, placeholder text), mixed so it meets WCAG contrast (3:1 for controls, 4.5:1 for text) on every pack. A block uses those variables, never a fixed gray (`border-slate-500`, `placeholder-gray-400`). A pack overrides a computed color only for a brand reason. To change a look, change the formula here, for all sites.

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
| `design.full_bleed: true` (any block) | The block runs to the screen edges: the section drops its side gap (`--hb-gutter`). Its background always does; this is for content. `design.spacing.padding` with a side value also replaces the gap |
| `design.size: viewport` (hero) | The whole section, padding included, is exactly the screen below the header (`.hbb-viewport`, `100dvh - --header-h`), content centered. The site must load hugo-shared's `set-header-height`, or the header's height overflows the screen |
| `design.compact: true` (features, `grid` layout) | Icons and names only, no descriptions, two columns on phones and three from `lg`: a short list on the homepage while a subpage shows the same items in full |
| `design.media_frame: false` (hero) | The hero image drops its shadow and ring, e.g. for a transparent PNG |
| `surfaces.section_alt` (`background`, `foreground`) in a theme pack's `light`/`dark` table | Background of every second landing-page block (class `hbb-section-alt`, counted from the first block shown); a block's own `design.background` paints over it. Default: the page background with 5% of the text color. The footer's default is a third color neither block color can match (light: the brand's darkest shade, `primary-900`, with white text; dark: the page background toward black); `surfaces.footer` overrides it |
| `colors.on_primary` in a theme pack's `light`/`dark` table (a color) | Text color on primary-filled buttons (hero `solid`, `contact-info`), default white. For a light dark-mode primary, set the dark one to the dark background |
| `data/contact.yaml` (`email`, `phone`, `whatsapp`) | `contact-info` falls back to it after the block's `content`, before the author profile: one source for every language |
| `params.icon` on a `footer` menu entry (a `get_icon` name) | That icon before the entry's name |
| `params.root_absolute: true` on a `footer` menu entry | Links to the site-root path, not the language's (e.g. `/admin/` from `/he/`), in a new tab |
| `whatsapp` in `contact-info`'s `content` (or `data/contact.yaml`, or the author profile): digits after `wa.me/`, country code first, no `+` | A WhatsApp row after the phone, opening a chat in a new tab |

## Link previews

A site's `assets/media/sharing.*` (or a page's featured image) can be any size: `og:image` and the JSON-LD `image` send a light copy, an 800px-wide JPG (`layouts/_partials/functions/get_share_image.html`), because chat apps build previews on the sender's phone. A JPG already 800px or less is sent as is.

## Blocks added

| Block | What |
|---|---|
| `inquiry-form` | A request form from the block's `content` fields; posts JSON to the site's `/api/inquiry` Worker (hugo-shared), which emails the owner. `blox/inquiry-form/README.md` |

## Analytics

`layouts/_partials/blox-analytics/` (from upstream's `modules/analytics`, no longer imported): search-engine verification tags (`hugoblox.verification.*`), Google Analytics (`hugoblox.analytics.google.measurement_id`, IP anonymized unless `hugoblox.privacy.anonymize_analytics = false`) and Google Tag Manager (`hugoblox.analytics.google_tag_manager.container_id`), production builds only. Cloudflare Web Analytics is hugo-shared's.

## Removed, restorable

Removed on 2026-11-19 because no site used them and they don't fit a local-business site. Each is restorable from upstream's base commit, e.g. `git checkout 68cbf335 -- modules/blox/blox/portfolio`. It then needs the rules above applied (start/end layout, i18n keys, derived colors), and a check in Hebrew.

| What | For | Path(s) at `68cbf335` |
|---|---|---|
| `resume-awards`, `resume-biography`, `resume-biography-3`, `resume-experience`, `resume-languages`, `resume-skills` | A personal CV | `modules/blox/blox/resume-*`, `blox/shared/css/biography-shared.css` |
| `dev-hero`, `tech-stack` | A developer portfolio | `modules/blox/blox/{dev-hero,tech-stack}` |
| Math (KaTeX) | Equations: `math` shortcode, `$…$` in Markdown (goldmark `passthrough` in `hugo.yaml`) | `layouts/_shortcodes/math.html`, `assets/js/katex-config.js`, `assets/dist/lib/katex` |
| Diagrams (Mermaid), mind maps (Markmap) | ` ```mermaid ` / ` ```markmap ` code blocks | `layouts/_markup/render-codeblock-{mermaid,markmap}.html`, `assets/js/hb-mermaid-config.js`, `assets/dist/lib/{mermaid,markmap}` |
| Charts (Plotly) | `chart` shortcode | `layouts/_shortcodes/chart.html`, `assets/dist/lib/plotly` |
| Icon packs `devicon/`, `academicons/` | Programming-language and academic logos | `modules/blox/data/icons/{devicon,academicons}.json` |
| Analytics: Fathom, Plausible, Pirsch, Microsoft Clarity, Baidu | Other analytics services | upstream `HugoBlox/kit` `modules/analytics` v0.3.1 |
| Upstream starters, test site, slides and Netlify modules, tooling, CI | Upstream's own development | `templates/`, `test/`, `scripts/`, `modules/{slides,integrations}`, `.github/` |

The library loaders for math, diagrams and charts lived in `layouts/_partials/libraries.html`; the libraries' entries in the root `package.json` and `vite.config.js`.

## Shipping a change

Push to `main`, then bump the sites: `menashe-forge/workflows/scripts/bump.sh` (one site first, by name, if the change is risky).

Never create `modules/blox/v*` tags: `@latest`/`@main` would resolve to them. Upstream's were deleted on 2026-11-05.
