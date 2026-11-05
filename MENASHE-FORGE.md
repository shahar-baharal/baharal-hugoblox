# baharal-hugoblox

A fork of [HugoBlox/kit](https://github.com/HugoBlox/kit) used by the Menashe Forge sites. Only `modules/blox` is changed; its module path is `github.com/shahar-baharal/baharal-hugoblox/modules/blox`. Why it exists and how to go back to upstream: `menashe-forge/docs/business/decisions.md` → "HugoBlox: fork it".

## Rules (they keep the fork mergeable with upstream)

1. A patched copy, not a new theme: no restyling, refactors, renames or reformatting of upstream files.
2. One fix per commit: `fix(<area>): …` for a generic fix, `feat(<area>): …` for an opt-in option, with the reason in the body.
3. Don't delete unused upstream features.
4. Options are opt-in: defaults match upstream unless the change is a pure fix.

What changed: `git log upstream/main..main -- modules/blox`.

## Options added

| Param (`params.hugoblox.…`) | Effect |
|---|---|
| `hooks.<hook>` (list of partial names; `body_end` for `body-end`) | Renders those partials at that hook, so a module's partials can hook in. Upstream only reads the site's own `layouts/_partials/hooks/<hook>/` |
| `smooth_scroll = true` | Smooth scrolling for in-page links (`motion-safe`) |

## Merging upstream

```sh
git fetch upstream && git merge upstream/main
```

Then bump a site to the new commit (`hugo mod get github.com/shahar-baharal/baharal-hugoblox/modules/blox@main && hugo mod vendor`) and check its preview before the others.

## Upstream PRs

None sent. Upstream hasn't merged a PR since 2026-03-30; sending fixes waits until it does.
