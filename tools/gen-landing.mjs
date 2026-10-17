// Builds the search landing pages from the curing-salt calculator page.
//   node tools/gen-landing.mjs
// Every number in the tables is computed by curing-salt-calculator/curing.mjs — the port of
// the app core — so a change to the engine is a re-run of this script, not a hand edit.
// Texts: facts and limits only from formulas_fsis.md (§1–§5), checked with Povar.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { cureGramsForPpm, calcDryCure, limitsOf, G_PER_LB } from '../curing-salt-calculator/curing.mjs';

const ROOT = new URL('..', import.meta.url).pathname;
const BASE = 'https://meat.mordansoft.com';
const CFR = 'https://www.law.cornell.edu/cfr/text/9';
const tpl = readFileSync(`${ROOT}curing-salt-calculator/index.html`, 'utf8');

const g = (x) => (x >= 10 ? String(Math.round(x)) : x.toFixed(1));
const cure = (basisGrams, ppm, nitritePct = 6.25) => g(cureGramsForPpm({ basisGrams, ppm, nitritePct }));
const lb = (n) => n * G_PER_LB;
const table = (head, rows) =>
  `<div class="seo-table"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>` +
  rows.map((r) => `<tr>${r.map((c, i) => (i ? `<td>${c}</td>` : `<th scope="row">${c}</th>`)).join('')}</tr>`).join('') +
  '</tbody></table></div>';

const WEIGHTS = [['500 g', 500], ['1 kg', 1000], ['2 kg', 2000], ['1 lb', lb(1)], ['3 lb', lb(3)], ['5 lb', lb(5)]];
const ROUNDING = '<p class="seo-note">Rounded down to 0.1 g (to 1 g once the dose is 10 g or more), never up — the same rule the SaltCure app uses.</p>';

const dryRow = (label, w) => {
  const r = calcDryCure({ meatWeightGrams: w, saltPct: 2.5, sugarPct: 1, cureType: 'cure1', limits: limitsOf('bacon', 'dry'), targetPpm: 156 });
  return [label, `${g(r.cureGrams)} g`, `${r.saltGrams} g`, `${r.sugarGrams} g`, `${r.nitritePpm} ppm`];
};

const PAGES = [
  {
    slug: 'bacon-cure-calculator',
    preset: { meat: 'bacon', method: 'dry', cure: 'cure1' },
    title: 'Bacon Cure Calculator — How Much Cure #1 for Bacon | SaltCure',
    desc: 'How much Cure #1 to weigh for home bacon, by the weight of the belly. Dry cure or brine, nitrite checked against the USDA/FSIS bacon limits of 200 and 120 ppm.',
    h1: 'Bacon cure calculator',
    lead: 'How much Cure #1 to weigh for home bacon, by the weight of the belly. Dry cure or a brine, with the nitrite checked against the USDA/FSIS limits for bacon.',
    prose: () => `
      <h2>How much Cure #1 for bacon</h2>
      <p>For a dry-cured belly the usual dose is 156 ppm of nitrite — 0.25% of the meat's weight in Cure #1. The rule for bacon allows up to 200 ppm with a dry cure (<a href="${CFR}/424.22">9 CFR 424.22(b)(3)</a>) and up to 120 ppm in a brine (424.22(b)(2)). The calculator starts at 156 ppm and does not give a dose above the limit.</p>
      ${table(['Belly weight', 'Cure #1 at 156 ppm', 'Cure #1 at 200 ppm (limit)'], WEIGHTS.map(([l, w]) => [l, `${cure(w, 156)} g`, `${cure(w, 200)} g`]))}
      ${ROUNDING}
      <h2>Dry cure or brine</h2>
      <p>In a dry cure all of the weighed mix goes onto the meat and stays there. In a brine the nitrite is dosed on the water: with plain soaking (no injection) the meat evens out toward the strength of the brine and cannot go above it, so for bacon the brine itself is held at 120 ppm.</p>
      <h2>Cure #2 is not for bacon</h2>
      <p>Cure #2 adds sodium nitrate. USDA rules do not allow added nitrate in bacon, so the calculator does not offer Cure #2 for it.</p>
      <h2>European curing salt</h2>
      <p>Pökelsalz and peklosól usually hold 0.4–0.6% nitrite — roughly ten times less than Cure #1 — so the dose in grams is roughly ten times bigger: ${cure(1000, 156, 0.6)} g of a 0.6% salt for 1 kg at 156 ppm. Pick the salt you actually have before you read the numbers.</p>`,
  },
  {
    slug: 'pink-salt-calculator',
    preset: { meat: 'bacon', method: 'dry', cure: 'cure1' },
    title: 'Pink Curing Salt Calculator — Cure #1 / Prague Powder #1 | SaltCure',
    desc: 'Pink curing salt is Cure #1: 6.25% sodium nitrite. How many grams per kg and per pound of meat, with the nitrite checked against USDA/FSIS limits.',
    h1: 'Pink curing salt calculator',
    lead: 'Pink curing salt is Cure #1 — 6.25% sodium nitrite, the rest salt. Enter the weight of the meat and get the grams to weigh.',
    prose: () => `
      <h2>What pink curing salt is</h2>
      <p>Pink curing salt, Prague Powder #1 and Insta Cure #1 are names for the same mix: 6.25% sodium nitrite and 93.75% salt. It is not Himalayan pink salt — that is ordinary salt with no nitrite: it salts meat like any other salt, but it cannot replace Cure #1.</p>
      <h2>How much pink salt per kg and per pound</h2>
      <p>The usual dose is 156 ppm of nitrite, which is 0.25% of the meat's weight in Cure #1.</p>
      ${table(['Meat weight', 'Pink curing salt (Cure #1) at 156 ppm'], WEIGHTS.map(([l, w]) => [l, `${cure(w, 156)} g`]))}
      ${ROUNDING}
      <h2>Weigh it, don't spoon it</h2>
      <p>For a kilo of meat the dose is under 3 g. Weigh it on a scale that reads 0.1 g, keep the pack labelled and away from table salt, and cure in the fridge at 4 °C or below.</p>
      <h2>Limits by product</h2>
      <p>Bacon: up to 200 ppm with a dry cure, 120 ppm in a brine (<a href="${CFR}/424.22">9 CFR 424.22(b)</a>). Ground meat: 156 ppm, and the calculator applies the same 156 ppm to jerky. A dry-cured whole cut such as pancetta: up to 625 ppm ingoing, and no more than 200 ppm left in the finished product (<a href="${CFR}/424.21">9 CFR 424.21(c)</a>) — far more than any home recipe needs.</p>`,
  },
  {
    slug: 'dry-cure-calculator',
    preset: { meat: 'bacon', method: 'dry' },
    title: 'Dry Cure Calculator — Salt, Sugar and Curing Salt by Weight | SaltCure',
    desc: 'Equilibrium dry cure calculator: salt, sugar and Cure #1 as a percentage of the meat weight, nitrite checked against USDA/FSIS limits. Bacon, pancetta, jerky.',
    h1: 'Dry cure calculator',
    lead: 'Equilibrium dry cure: salt, sugar and curing salt as a share of the meat’s weight — all of it rubbed on, nothing rinsed off.',
    prose: () => `
      <h2>How an equilibrium dry cure works</h2>
      <p>Weigh the meat, weigh the cure as a percentage of that weight, rub all of it on and keep the meat in the fridge at 4 °C or below. Because nothing is washed off, the meat ends up with exactly the salt you weighed. For a whole muscle the salt is typically 2.0–3.0% of the weight.</p>
      <h2>The curing salt already brings salt</h2>
      <p>Cure #1 is 93.75% salt, so the calculator subtracts it from the table salt you add. Forgetting that over-salts by about a quarter of a percent every time.</p>
      ${table(['Meat weight', 'Cure #1', 'Table salt', 'Sugar', 'Nitrite'], [['1 kg', 1000], ['2 kg', 2000], ['3 lb', lb(3)], ['5 lb', lb(5)]].map(([l, w]) => dryRow(l, w)))}
      <p class="seo-note">At 2.5% salt, 1% sugar and 156 ppm nitrite. Nitrite is rounded down, never up.</p>
      <h2>Each dish has its own limit</h2>
      <p>Pick the dish in the calculator: bacon stops at 200 ppm, jerky and salami at 156 ppm, a dry-cured whole cut such as pancetta at 625 ppm ingoing, with no more than 200 ppm left in the finished product (<a href="${CFR}/424.21">9 CFR 424.21(c)</a>). Cure #2 is offered only where nitrate is allowed.</p>`,
  },
  {
    slug: 'cure-1-per-kg',
    preset: { meat: 'bacon', method: 'dry', cure: 'cure1' },
    title: 'How Much Cure #1 per kg and per Pound — Curing Salt Chart | SaltCure',
    desc: 'Chart: grams of Cure #1 and European curing salt per kg and per pound of meat for 100, 120, 156 and 200 ppm nitrite. Rounded down, as in the SaltCure app.',
    h1: 'How much Cure #1 per kg and per pound',
    lead: 'Grams of Cure #1 and of European curing salt for a target nitrite level, per kilogram and per pound of meat. For a dry cure; a brine is dosed on the water — use the calculator below.',
    prose: () => `
      <h2>Cure #1 (6.25% nitrite)</h2>
      ${table(['Nitrite', 'Per 1 kg', 'Per 1 lb', 'Per 5 lb', 'What this level is'], [
        [100, 'A practical floor, not a USDA number: below it the calculator warns that the margin against <i>C. botulinum</i> gets thin'],
        [120, 'Limit for bacon in a brine — there the dose is weighed on the water, not on the meat'],
        [156, 'The usual dose (0.25% of the weight); limit for ground meat, jerky and salami'],
        [200, 'Limit for dry-cured bacon'],
      ].map(([ppm, note]) => [`${ppm} ppm`, `${cure(1000, ppm)} g`, `${cure(lb(1), ppm)} g`, `${cure(lb(5), ppm)} g`, note]))}
      ${ROUNDING}
      <h2>European curing salt (Pökelsalz, peklosól)</h2>
      <p>Usually 0.4–0.6% nitrite, so the grams are roughly ten times bigger. Check the percentage on your own pack.</p>
      ${table(['Nitrite', '0.6% salt, per 1 kg', '0.5% salt, per 1 kg', '0.6% salt, per 1 lb'], [100, 120, 156].map((ppm) => [`${ppm} ppm`, `${cure(1000, ppm, 0.6)} g`, `${cure(1000, ppm, 0.5)} g`, `${cure(lb(1), ppm, 0.6)} g`]))}
      <h2>Where the limits come from</h2>
      <p>Bacon: <a href="${CFR}/424.22">9 CFR 424.22(b)</a>. Other cured meat: <a href="${CFR}/424.21">9 CFR 424.21(c)</a>. These rules were written for commercial plants, not home kitchens; we use them as the best public numeric reference, and the result is not a guarantee.</p>`,
  },
];

const CSS = `
    /* ── landing prose ── */
    .seo-prose { max-width: 72ch; margin-top: var(--space-12); }
    .seo-prose h2 { font-size: var(--text-h4); font-weight: 600; color: var(--text-primary); margin: var(--space-8) 0 var(--space-3); }
    .seo-prose p { color: var(--text-secondary); line-height: var(--leading-normal); margin: 0 0 var(--space-3); }
    .seo-table { overflow-x: auto; margin: var(--space-3) 0; }
    .seo-table table { border-collapse: collapse; width: 100%; font-size: var(--text-sm); }
    .seo-table th, .seo-table td { text-align: left; padding: 8px 10px; border-bottom: 1px solid var(--border); vertical-align: top; }
    .seo-table thead th { font-family: var(--font-mono); font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-muted); font-weight: 500; }
    .seo-table td { font-variant-numeric: tabular-nums; color: var(--text-primary); }
    .seo-note { font-size: var(--text-xs) !important; color: var(--text-muted) !important; }
`;

const NAMES = { 'bacon-cure-calculator': 'Bacon cure calculator', 'pink-salt-calculator': 'Pink curing salt calculator', 'dry-cure-calculator': 'Dry cure calculator', 'cure-1-per-kg': 'Cure #1 per kg and per pound', 'curing-salt-calculator': 'Curing salt calculator' };
const related = (slug) => `\n      <h2>Related</h2>\n      <p>${Object.entries(NAMES).filter(([k]) => k !== slug).map(([k, v]) => `<a href="/${k}/">${v}</a>`).join(' · ')}</p>`;

const esc = (s) => s.replace(/&(?!amp;)/g, '&amp;').replace(/"/g, '&quot;');

for (const p of PAGES) {
  const url = `${BASE}/${p.slug}/`;
  let h = tpl;
  h = h.replace(/<title>.*?<\/title>/s, `<title>${esc(p.title)}</title>`);
  h = h.replace(/(<meta name="description" content=")[^"]*(">)/, `$1${esc(p.desc)}$2`);
  h = h.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`);
  h = h.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*">/g, '');
  h = h.replace(/(<meta property="og:title" content=")[^"]*(">)/, `$1${esc(p.title)}$2`);
  h = h.replace(/(<meta property="og:description" content=")[^"]*(">)/, `$1${esc(p.desc)}$2`);
  h = h.replace(/(<meta property="og:url" content=")[^"]*(">)/, `$1${url}$2`);
  h = h.replace(/("url":")[^"]*(")/, `$1${url}$2`);
  h = h.replace(' aria-current="page"', '');
  h = h.replace(/<a class="lang-switch"[^>]*>[^<]*<\/a>/, '');
  h = h.replace(/<h1 class="section__title">.*?<\/h1>/, `<h1 class="section__title">${p.h1}</h1>`);
  h = h.replace(/(<h1 class="section__title">.*?<\/h1>\s*<p class="detail__blurb">).*?(<\/p>)/s, `$1${p.lead}$2`);
  const attrs = Object.entries(p.preset).map(([k, v]) => ` data-${k}="${v}"`).join('');
  h = h.replace('<div class="calc-col" id="calc-app"></div>', `<div class="calc-col" id="calc-app"${attrs}></div>`);
  h = h.replace('        <div class="ms-card ms-card--pad calc-cta">', `        <article class="seo-prose">${p.prose()}${related(p.slug)}\n        </article>\n        <div class="ms-card ms-card--pad calc-cta">`);
  h = h.replace('  </style>', CSS + '  </style>');
  if (!h.includes('class="seo-prose"') || !h.includes(`data-meat="${p.preset.meat}"`)) throw new Error(`template drifted: ${p.slug}`);
  mkdirSync(`${ROOT}${p.slug}`, { recursive: true });
  writeFileSync(`${ROOT}${p.slug}/index.html`, h);
  console.log('wrote', p.slug);
}
