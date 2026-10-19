// Builds every curing page in every live language from one template + i18n/<lang>.mjs.
//   node tools/gen-pages.mjs
// Pages: /<lang>/curing-salt-calculator/ and the four search landing pages (English has no prefix).
// Every number in the tables is computed by curing-salt-calculator/curing.mjs — the port of the
// app core. Texts: i18n/en.mjs is the master; a language with a missing or extra key is refused.
// A language goes into LIVE only after Povar read its safety lines in the original and tools/check-numbers.mjs passed.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { cureGramsForPpm, calcDryCure, limitsOf, G_PER_LB } from '../curing-salt-calculator/curing.mjs';

const LIVE = ['en', 'uk', 'ru', 'pl', 'cs', 'sk', 'be', 'bg', 'hr', 'sr', 'sl', 'es', 'it', 'kk', 'fr', 'pt-BR', 'tr', 'de', 'id'];

const ROOT = new URL('..', import.meta.url).pathname;
const BASE = 'https://meat.mordansoft.com';
const CFR = 'https://www.law.cornell.edu/cfr/text/9';
const tpl = readFileSync(`${ROOT}tools/template.html`, 'utf8');
const LOC = Object.fromEntries(await Promise.all(LIVE.map(async (c) => [c, (await import(`../i18n/${c}.mjs`)).default])));
const EN = LOC.en;

// ── key parity with the English master ─────────────────────────────────────
const keysOf = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? keysOf(v, `${p}${k}.`) : [`${p}${k}`]));
const enKeys = new Set(keysOf(EN));
for (const c of LIVE) {
  const ks = new Set(keysOf(LOC[c]));
  const missing = [...enKeys].filter((k) => !ks.has(k));
  const extra = [...ks].filter((k) => !enKeys.has(k));
  if (missing.length || extra.length) throw new Error(`${c}: missing ${missing.join(', ') || '—'}; extra ${extra.join(', ') || '—'}`);
}

const PAGES = [
  { slug: 'curing-salt-calculator', preset: {} },
  { slug: 'bacon-cure-calculator', preset: { meat: 'bacon', method: 'dry', cure: 'cure1' } },
  { slug: 'pink-salt-calculator', preset: { meat: 'bacon', method: 'dry', cure: 'cure1' } },
  { slug: 'dry-cure-calculator', preset: { meat: 'bacon', method: 'dry' } },
  { slug: 'cure-1-per-kg', preset: { meat: 'bacon', method: 'dry', cure: 'cure1' } },
];
const urlOf = (c, slug) => `${BASE}/${LOC[c].dir ? LOC[c].dir + '/' : ''}${slug}/`;
const pathOf = (c, slug) => `/${LOC[c].dir ? LOC[c].dir + '/' : ''}${slug}/`;

const lb = (n) => n * G_PER_LB;
const WEIGHTS = [['500', 'g', 500], ['1', 'kg', 1000], ['2', 'kg', 2000], ['1', 'lb', lb(1)], ['3', 'lb', lb(3)], ['5', 'lb', lb(5)]];

function build(c, page) {
  const L = LOC[c], u = L.ui, P = L.pages[page.slug], S = L.site;
  const nf = new Intl.NumberFormat(L.locale, { maximumFractionDigits: 1 });
  const g = (x) => nf.format(x >= 10 ? Math.round(x) : Math.round(x * 10) / 10);
  const grams = (w, ppm, pct = 6.25) => g(cureGramsForPpm({ basisGrams: w, ppm, nitritePct: pct }));
  const wLabel = ([n, unit]) => `${n} ${unit === 'lb' ? 'lb' : u[unit]}`;
  const fillText = (s) => s
    .replace(/\{cure:(\d+):(\d+)(?::([\d.]+))?\}/g, (_, w, ppm, pct) => grams(+w, +ppm, pct ? +pct : 6.25))
    .replace(/\{cfr22\}/g, `<a href="${CFR}/424.22">9 CFR 424.22</a>`)
    .replace(/\{cfr21\}/g, `<a href="${CFR}/424.21">9 CFR 424.21</a>`)
    .replace(/\{(g|kg|lb)\}/g, (_, k) => u[k]);
  const table = (head, rows) =>
    `<div class="seo-table"><table><thead><tr>${head.map((h) => `<th>${fillText(h)}</th>`).join('')}</tr></thead><tbody>` +
    rows.map((r) => `<tr>${r.map((x, i) => (i ? `<td>${x}</td>` : `<th scope="row">${x}</th>`)).join('')}</tr>`).join('') +
    '</tbody></table></div>';
  const rounding = `<p class="seo-note">${S.rounding}</p>`;
  const h2 = (k) => `<h2>${fillText(P[k])}</h2>`;
  const p = (k, cls = '') => `<p${cls ? ` class="${cls}"` : ''}>${fillText(P[k])}</p>`;

  const PROSE = {
    'curing-salt-calculator': () => '',
    'bacon-cure-calculator': () => [h2('h_dose'), p('p_dose'),
      table([P.t_weight, P.t_156, P.t_200], WEIGHTS.map((w) => [wLabel(w), `${grams(w[2], 156)} ${u.g}`, `${grams(w[2], 200)} ${u.g}`])), rounding,
      h2('h_brine'), p('p_brine'), h2('h_cure2'), p('p_cure2'), h2('h_eu'), p('p_eu')].join('\n      '),
    'pink-salt-calculator': () => [h2('h_what'), p('p_what'), h2('h_dose'), p('p_dose'),
      table([P.t_weight, P.t_156], WEIGHTS.map((w) => [wLabel(w), `${grams(w[2], 156)} ${u.g}`])), rounding,
      h2('h_weigh'), p('p_weigh'), h2('h_limits'), p('p_limits')].join('\n      '),
    'dry-cure-calculator': () => [h2('h_how'), p('p_how'), h2('h_salt'), p('p_salt'),
      table([P.t_weight, P.t_cure, P.t_salt, P.t_sugar, P.t_nitrite], [['1', 'kg', 1000], ['2', 'kg', 2000], ['3', 'lb', lb(3)], ['5', 'lb', lb(5)]].map((w) => {
        const r = calcDryCure({ meatWeightGrams: w[2], saltPct: 2.5, sugarPct: 1, cureType: 'cure1', limits: limitsOf('bacon', 'dry'), targetPpm: 156 });
        return [wLabel(w), `${g(r.cureGrams)} ${u.g}`, `${r.saltGrams} ${u.g}`, `${r.sugarGrams} ${u.g}`, `${r.nitritePpm} ppm`];
      })), p('note', 'seo-note'), h2('h_limit'), p('p_limit')].join('\n      '),
    'cure-1-per-kg': () => [h2('h_c1'),
      table([P.t_ppm, P.t_kg, P.t_lb, P.t_5lb, P.t_what], [[100, 'n100'], [120, 'n120'], [156, 'n156'], [200, 'n200']]
        .map(([ppm, n]) => [`${ppm} ppm`, `${grams(1000, ppm)} ${u.g}`, `${grams(lb(1), ppm)} ${u.g}`, `${grams(lb(5), ppm)} ${u.g}`, P[n]])), rounding,
      h2('h_eu'), p('p_eu'),
      table([P.t_ppm, P.t_06kg, P.t_05kg, P.t_06lb], [100, 120, 156].map((ppm) => [`${ppm} ppm`, `${grams(1000, ppm, 0.6)} ${u.g}`, `${grams(1000, ppm, 0.5)} ${u.g}`, `${grams(lb(1), ppm, 0.6)} ${u.g}`])),
      h2('h_src'), p('p_src'), `<p>${S.cfrIntro}</p>`].join('\n      '),
  };

  const related = `<h2>${S.related}</h2>\n      <p>${PAGES.filter((x) => x.slug !== page.slug).map((x) => `<a href="${pathOf(c, x.slug)}">${L.pages[x.slug].link}</a>`).join(' · ')}</p>`;
  const prose = PROSE[page.slug]();
  const article = `        <article class="seo-prose">\n      ${prose ? prose + '\n      ' : ''}${related}\n        </article>\n`;

  const esc = (s) => s.replace(/&(?!amp;)/g, '&amp;').replace(/"/g, '&quot;');
  const url = urlOf(c, page.slug);
  const alternates = [...LIVE.map((x) => `  <link rel="alternate" hreflang="${x}" href="${urlOf(x, page.slug)}">`),
    `  <link rel="alternate" hreflang="x-default" href="${urlOf('en', page.slug)}">`].join('\n');
  const langMenu = `<select class="lang-select" aria-label="${S.language}" onchange="location.href=this.value">${LIVE.map((x) =>
    `<option value="${pathOf(x, page.slug)}"${x === c ? ' selected' : ''}>${LOC[x].name}</option>`).join('')}</select>`;
  const nav = `<span class="xnav"><a href="/brine-calculator/">${S.nav.brine}</a><a href="/dry-brine-calculator/">${S.nav.dryBrine}</a><a href="${pathOf(c, 'curing-salt-calculator')}"${page.slug === 'curing-salt-calculator' ? ' aria-current="page"' : ''}>${S.nav.curing}</a></span>`;
  const attrs = Object.entries(page.preset).map(([k, v]) => ` data-${k}="${v}"`).join('');

  let h = tpl;
  const must = (re, to) => { if (!re.test(h)) throw new Error(`template drifted: ${re}`); h = h.replace(re, to); };
  must(/<html lang="[^"]*">/, `<html lang="${c}">`);
  must(/<title>.*?<\/title>/s, () => `<title>${esc(P.title)}</title>`);
  must(/(<meta name="description" content=")[^"]*(">)/, (_, a, b) => a + esc(P.desc) + b);
  must(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`);
  must(/(\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*">)+/, `\n${alternates}`);
  must(/(<meta property="og:title" content=")[^"]*(">)/, (_, a, b) => a + esc(P.title) + b);
  must(/(<meta property="og:description" content=")[^"]*(">)/, (_, a, b) => a + esc(P.desc) + b);
  must(/(<meta property="og:url" content=")[^"]*(">)/, `$1${url}$2`);
  must(/(<meta property="og:locale" content=")[^"]*(">)/, `$1${L.locale.replace('-', '_')}$2`);
  must(/("name":")[^"]*(","url":")[^"]*(")/, `$1${esc(L.pages['curing-salt-calculator'].h1)} — SaltCure$2${url}$3,"inLanguage":"${c}"`);
  must(/<span class="xnav">.*?<\/span><a class="lang-switch"[^>]*>[^<]*<\/a>/, nav + langMenu);
  must(/<h1 class="section__title">.*?<\/h1>/, `<h1 class="section__title">${P.h1}</h1>`);
  must(/(<h1 class="section__title">.*?<\/h1>\s*<p class="detail__blurb">).*?(<\/p>)/s, (_, a, b) => a + P.lead + b + (S.usNote ? `\n          <p class="us-note">${S.usNote}</p>` : ''));
  must(/<div class="calc-col" id="calc-app"><\/div>/, `<div class="calc-col" id="calc-app"${attrs}></div>`);
  must(/        <div class="ms-card ms-card--pad calc-cta">/, `${article}        <div class="ms-card ms-card--pad calc-cta">`);
  must(/  <\/style>/, `${CSS}  </style>`);

  const out = `${ROOT}${L.dir ? L.dir + '/' : ''}${page.slug}`;
  mkdirSync(out, { recursive: true });
  writeFileSync(`${out}/index.html`, h);
  return pathOf(c, page.slug);
}

const CSS = `
    /* ── landing prose + languages ── */
    .seo-prose { max-width: 72ch; margin-top: var(--space-12); }
    .seo-prose h2 { font-size: var(--text-h4); font-weight: 600; color: var(--text-primary); margin: var(--space-8) 0 var(--space-3); }
    .seo-prose p { color: var(--text-secondary); line-height: var(--leading-normal); margin: 0 0 var(--space-3); }
    .seo-table { overflow-x: auto; margin: var(--space-3) 0; }
    .seo-table table { border-collapse: collapse; width: 100%; font-size: var(--text-sm); }
    .seo-table th, .seo-table td { text-align: left; padding: 8px 10px; border-bottom: 1px solid var(--border); vertical-align: top; }
    .seo-table thead th { font-family: var(--font-mono); font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-muted); font-weight: 500; }
    .seo-table td { font-variant-numeric: tabular-nums; color: var(--text-primary); }
    .seo-note { font-size: var(--text-xs) !important; color: var(--text-muted) !important; }
    .us-note { font-size: var(--text-sm); color: var(--text-muted); border-left: 3px solid var(--accent); padding-left: var(--space-3); margin: var(--space-3) 0 0; max-width: 60ch; }
    .lang-select { font: 500 12px var(--font-mono); color: var(--text-secondary); background: transparent; border: 1px solid var(--border); border-radius: 6px; padding: 2px 6px; margin-left: var(--space-2); max-width: 9.5rem; }
`;

const built = [];
for (const c of LIVE) for (const page of PAGES) built.push(build(c, page));

// sitemap: the EN-only brine pages + every generated page with its language alternates
const alt = (slug) => LIVE.map((x) => `    <xhtml:link rel="alternate" hreflang="${x}" href="${urlOf(x, slug)}"/>`).join('\n');
const sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...['', 'brine-calculator/', 'dry-brine-calculator/'].map((x) => `  <url><loc>${BASE}/${x}</loc></url>`),
  ...LIVE.flatMap((c) => PAGES.map((pg) => `  <url>\n    <loc>${urlOf(c, pg.slug)}</loc>\n${alt(pg.slug)}\n  </url>`)),
  '</urlset>', ''].join('\n');
writeFileSync(`${ROOT}sitemap.xml`, sm);
console.log(`built ${built.length} pages in ${LIVE.length} languages; sitemap updated`);
