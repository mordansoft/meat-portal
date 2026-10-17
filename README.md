# meat.mordansoft.com

The calculators, on their own subdomain. Static HTML, no build step, GitHub Pages.

| Path | What |
|---|---|
| `/` | home, three cards |
| `/brine-calculator/` | wet equilibrium brine, no nitrite |
| `/dry-brine-calculator/` | dry brine, no nitrite |
| `/curing-salt-calculator/` | nitrite and ppm — **moved here from mordansoft.com/saltcure/calculator/** |
| `/uk/curing-salt-calculator/` | the Ukrainian copy of the same |
| `/bacon-cure-calculator/`, `/pink-salt-calculator/`, `/dry-cure-calculator/`, `/cure-1-per-kg/` | search landing pages: the same calculator on a preset + prose and tables. **Generated** by `node tools/gen-landing.mjs` — edit the script, not the HTML; numbers come from the engine |

## Rules this site is built under

1. **The page must read as text to a search engine.** That is the only reason it exists.
   No canvas rendering, no framework. The brine pages keep their prose, tables and the
   formula in the markup and still answer the question with JavaScript off.
2. **The curing arithmetic must not diverge from the app.** `curing-salt-calculator/curing.mjs`
   is the port of `lib/domain/curing/` in the SaltCure repo, and `curing.test.mjs` holds the
   same vectors as the Dart tests. Change one, change both.
3. **Every safety number names its source.** Taste figures are marked as taste figures.

## Tests

```
node assets/js/brine.mjs            # nothing to run, it is a module
node assets/js/brine.test.mjs       # brine + dry brine: 26 checks
node curing-salt-calculator/curing.test.mjs
```

Both must pass before a push.

Pages serves this repository straight from `main` — no workflow, because the token
the team pushes with has no `workflow` scope. `.nojekyll` is load-bearing: without it
Jekyll would silently drop `_ds/`, the design system, and every page would lose its
styling.

## Sources of truth

- Nitrite limits and formulas — `~/work-hub/boris/saltcure/formulas_fsis.md`
- Brine and dry-brine norms without nitrite — `~/work-hub/cook/brine-norms-no-nitrite.md`
- Why these pages and not others — `~/work-hub/boris/saltcure/aso/keyword_harvest_brines_2026-10-10.md`
- Portal brief — `~/work-hub/shared/briefs/meat_portal_2026-10-10.md`

## DNS

`meat` is a CNAME to `mordansoft.github.io` in Cloudflare. SSL mode must be **Full** —
with Flexible, GitHub Pages redirect-loops.
