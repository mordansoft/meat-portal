// Builds the home page (/ and /<lang>/) from i18n/home/<lang>.mjs and the "My cures" page
// (/my-cures/, /<lang>/my-cures/) for every language that has i18n/shell/<lang>.mjs.
// Called by tools/gen-pages.mjs, which also writes the sitemap; not run on its own.
// Calculator names come from i18n/<lang>.mjs; the learn cards from i18n/learn/<lang>.mjs.
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { DS } from './gen-brine.mjs';
import { SITE_CSS } from './shell.mjs';

const BASE = 'https://meat.mordansoft.com';
const ARROW = '<svg class="sc-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const ICO = {
  brine: '<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>',
  dry: '<circle cx="7" cy="7" r="1.2"/><circle cx="13" cy="5" r="1.2"/><circle cx="17" cy="10" r="1.2"/><circle cx="10" cy="11" r="1.2"/><path d="M3 16h18v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  curing: '<path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
};
const LANDINGS = ['bacon-cure-calculator', 'pink-salt-calculator', 'dry-cure-calculator', 'cure-1-per-kg'];
const keysOf = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' && !Array.isArray(v) ? keysOf(v, `${p}${k}.`) : [`${p}${k}`]));

export async function buildHome({ ROOT, LIVE, LOC, SHELL }) {
  const homeLangs = SHELL.langs.filter((c) => existsSync(`${ROOT}i18n/home/${c}.mjs`));
  const H = Object.fromEntries(await Promise.all(homeLangs.map(async (c) => [c, (await import(`../i18n/home/${c}.mjs`)).default])));
  for (const c of homeLangs) if (keysOf(H[c]).join() !== keysOf(H.en).join()) throw new Error(`home/${c}: keys differ from en`);
  const esc = (s) => s.replace(/&(?!amp;|nbsp;)/g, '&amp;').replace(/"/g, '&quot;');
  const prefix = SHELL.prefix;
  const homePath = (c) => `${prefix(c)}/`;
  const curesPath = (c) => `${prefix(c)}/my-cures/`;
  const built = [];

  const head = (c, { title, desc, url, alternates, robots = '' }) => `<!DOCTYPE html>
<html lang="${c}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/svg+xml" href="/assets/img/brand/logo-tile.svg">
  <meta name="apple-itunes-app" content="app-id=6812973901">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">${robots}
  <link rel="canonical" href="${url}">
${alternates}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="MordanSoft">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${url}">
  <meta property="og:locale" content="${LOC[c].locale.replace('-', '_')}">
  <meta name="twitter:card" content="summary">
  <link rel="stylesheet" href="${DS}/tokens/fonts.css">
  <link rel="stylesheet" href="${DS}/tokens/colors.css">
  <link rel="stylesheet" href="${DS}/tokens/typography.css">
  <link rel="stylesheet" href="${DS}/tokens/spacing.css">
  <link rel="stylesheet" href="${DS}/tokens/elevation.css">
  <link rel="stylesheet" href="${DS}/tokens/base.css">
  <link rel="stylesheet" href="${DS}/components/core/core.css">
  <link rel="stylesheet" href="/assets/css/brine-calc.css">
  <link rel="stylesheet" href="${SITE_CSS}">
</head>
<body>
`;
  const tail = (c) => `
  ${SHELL.footer(c)}
  ${SHELL.browserData(c)}
<!-- web analytics -->
<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "5a3f2bc95732486688415649c2f82eee"}'></script>
<!-- /web analytics -->
</body>
</html>
`;
  const langMenu = (c, langs, pathOf) => SHELL.langMenu(c, langs, pathOf);
  const alts = (langs, pathOf) => [...langs.map((x) => `  <link rel="alternate" hreflang="${x}" href="${BASE}${pathOf(x)}">`),
    `  <link rel="alternate" hreflang="x-default" href="${BASE}${pathOf('en')}">`].join('\n');
  const write = (path, html) => { const dir = `${ROOT}${path.slice(1)}`; mkdirSync(dir, { recursive: true }); writeFileSync(`${dir}index.html`, html); built.push(path); };

  // ── home ──────────────────────────────────────────────────────────────────
  for (const c of homeLangs) {
    const T = H[c], L = LOC[c], link = SHELL.link;
    const K = existsSync(`${ROOT}i18n/learn/${c}.mjs`) ? (await import(`../i18n/learn/${c}.mjs`)).default : null;
    const tile = (key, slug, label, accent) => `<a class="sc-card sc-tile${accent ? ' sc-tile--accent' : ''}" href="${link.calc(c, slug)}">
            <span class="sc-tile__top"><span class="sc-eb">${T.tiles[key].eb}</span><span class="sc-when">${T.tiles[key].when}</span></span>
            <svg class="sc-ico" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICO[key]}</svg>
            <h2>${label}</h2>
            <p>${T.tiles[key].p}</p>
            <span class="sc-tile__go">${T.open} ${ARROW}</span>
          </a>`;
    const jobs = LANDINGS.map((slug) => `<a class="sc-card sc-job" href="${link.calc(c, slug)}"><span><b>${L.pages[slug].link}</b><small>${T.jobs.sub[slug]}</small></span>${ARROW}</a>`).join('\n          ');
    const learn = K ? `
    <section class="sc-sec">
      <div class="ms-container">
        <div class="sc-sec__head"><div><span class="sc-eb">// ${T.learn.eb}</span><h2>${T.learn.h}</h2></div><a href="${link.learn(c)}">${T.learn.all}</a></div>
        <div class="sc-learn">
          ${K.articles.map((a, i) => `<a class="sc-card" href="${link.learn(c)}${a.slug}/"><span class="sc-eb">0${i + 1}</span><b>${a.h1}</b><span>${a.lead}</span></a>`).join('\n          ')}
        </div>
      </div>
    </section>` : '';

    const html = head(c, { title: T.title, desc: T.desc, url: `${BASE}${homePath(c)}`, alternates: alts(homeLangs, homePath) }) +
`  ${SHELL.topbar(c, { active: 'home', langMenu: langMenu(c, homeLangs, homePath) })}

  <main>
    <section class="sc-hero">
      <div class="ms-container">
        <span class="sc-eb">// ${T.eyebrow}</span>
        <h1>${T.h1}</h1>
        <p class="sc-hero__lead">${T.lead}</p>
        <div class="sc-strip" id="sc-strip" hidden></div>
        <p class="sc-ask">${T.ask}</p>
        <div class="sc-tiles">
          ${tile('brine', 'brine-calculator', L.site.nav.brine)}
          ${tile('dry', 'dry-brine-calculator', L.site.nav.dryBrine)}
          ${tile('curing', 'curing-salt-calculator', L.site.nav.curing, true)}
        </div>
      </div>
    </section>

    <section class="sc-sec">
      <div class="ms-container">
        <div class="sc-sec__head"><h2>${T.jobs.h}</h2><p>${T.jobs.p}</p></div>
        <div class="sc-jobs">
          ${jobs}
        </div>
      </div>
    </section>

    <section class="sc-sec--band">
      <div class="ms-container">
        <span class="sc-eb">// ${T.split.eb}</span>
        <h2 style="font-size: var(--text-h2); letter-spacing: -0.02em; margin: var(--space-2) 0 var(--space-3)">${T.split.h}</h2>
        <p style="color: var(--text-secondary); max-width: 64ch; margin: 0">${T.split.p}</p>
        <div class="sc-split">
          <div class="sc-card">
            <span class="sc-eb">${T.split.plainEb}</span>
            <p class="sc-split__big">${T.split.plain}</p>
            <div class="sc-pills"><a href="${link.calc(c, 'brine-calculator')}">${L.site.nav.brine}</a><a href="${link.calc(c, 'dry-brine-calculator')}">${L.site.nav.dryBrine}</a></div>
          </div>
          <div class="sc-split__arrow" aria-hidden="true"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
          <div class="sc-card">
            <span class="sc-eb" style="color: var(--accent-text)">${T.split.cureEb}</span>
            <ul>${T.split.cure.map((x) => `<li>${x}</li>`).join('')}</ul>
            <div><a class="ms-btn ms-btn--primary" href="${link.calc(c, 'curing-salt-calculator')}">${L.pages['curing-salt-calculator'].link}</a></div>
          </div>
        </div>
        <p class="sc-fine">${T.split.fine}</p>
      </div>
    </section>
${learn}
    <section class="sc-sec" style="padding-top: 0">
      <div class="ms-container">
        <div class="sc-appband">
          <span class="sc-eb">// ${T.band.eb}</span>
          <h2>${T.band.h}</h2>
          <p>${T.band.p}</p>
          <p class="mono" style="font-size: 13px">${T.band.meta}</p>
          <span class="store-badges">
            <a class="store-badge" href="https://mordansoft.com/saltcure/go/play/" target="_blank" rel="noopener"><img src="/assets/badges/google-play.svg" alt="Google Play"></a>
            <a class="store-badge" href="https://mordansoft.com/saltcure/go/app-store/" target="_blank" rel="noopener"><img src="/assets/badges/app-store.svg" alt="App Store"></a>
          </span>
        </div>
      </div>
    </section>
  </main>
` + tail(c);
    write(homePath(c), html);
  }

  // ── My cures (one per shell language; kept out of the index, it has no content of its own) ──
  for (const c of SHELL.langs) {
    const C = SHELL.SH[c].cures;
    const html = head(c, { title: C.title, desc: C.desc, url: `${BASE}${curesPath(c)}`, alternates: alts(SHELL.langs, curesPath), robots: '\n  <meta name="robots" content="noindex">' }) +
`  ${SHELL.topbar(c, { active: 'cures', langMenu: langMenu(c, SHELL.langs, curesPath) })}

  <main>
    <section class="section">
      <div class="ms-container">
        <div class="section__head">
          <h1 class="section__title">${C.h1}</h1>
          <p class="detail__blurb">${C.lead}</p>
        </div>
        <div class="sc-cures" id="sc-cures" aria-live="polite"></div>
        ${SHELL.appStrip(c)}
      </div>
    </section>
  </main>
` + tail(c);
    write(curesPath(c), html);
  }

  return { built, sitemap: homeLangs.map((c) => `  <url>\n    <loc>${BASE}${homePath(c)}</loc>\n${homeLangs.map((x) => `    <xhtml:link rel="alternate" hreflang="${x}" href="${BASE}${homePath(x)}"/>`).join('\n')}\n  </url>`) };
}
