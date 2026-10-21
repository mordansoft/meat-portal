// Builds the knowledge base (/learn/ and /<lang>/learn/) from i18n/learn/<lang>.mjs.
// Called by tools/gen-pages.mjs, which also writes the sitemap; not run on its own.
// A language must mirror i18n/learn/en.mjs: same articles, same number of questions and sources.
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { DS, MARK } from './gen-brine.mjs';

const BASE = 'https://meat.mordansoft.com';

export async function buildLearn({ ROOT, LIVE, LOC, brineLangs, SHELL }) {
  const langs = LIVE.filter((c) => existsSync(`${ROOT}i18n/learn/${c}.mjs`));
  const K = Object.fromEntries(await Promise.all(langs.map(async (c) => [c, (await import(`../i18n/learn/${c}.mjs`)).default])));
  const shape = (d) => d.articles.map((a) => `${a.slug}:${a.qa.length}:${a.sources.length}`).join(',');
  for (const c of langs) if (shape(K[c]) !== shape(K.en)) throw new Error(`learn/${c}: structure differs from en (${shape(K[c])} vs ${shape(K.en)})`);

  const prefix = (c) => (LOC[c].dir ? `/${LOC[c].dir}` : '');
  const pathOf = (c, slug) => `${prefix(c)}/learn/${slug ? slug + '/' : ''}`;
  const urlOf = (c, slug) => `${BASE}${pathOf(c, slug)}`;
  // Links inside the texts are written to English pages; send each language to its own copy.
  const localLinks = (c, html) => html.replace(/href="\/(brine-calculator|dry-brine-calculator|curing-salt-calculator)\/"/g,
    (m, slug) => (slug === 'curing-salt-calculator' || brineLangs.includes(c) ? `href="${prefix(c)}/${slug}/"` : m));
  const esc = (s) => s.replace(/&(?!amp;|nbsp;)/g, '&amp;').replace(/"/g, '&quot;');
  const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
  const out = [];

  const page = (c, slug, { title, desc, body, jsonld }) => {
    const L = LOC[c];
    const url = urlOf(c, slug);
    const alternates = [...langs.map((x) => `  <link rel="alternate" hreflang="${x}" href="${urlOf(x, slug)}">`),
      `  <link rel="alternate" hreflang="x-default" href="${urlOf('en', slug)}">`].join('\n');
    const langMenu = SHELL.langMenu(c, langs, (x) => pathOf(x, slug));
    const nav = (s) => (brineLangs.includes(c) ? `${prefix(c)}/${s}/` : `/${s}/`);
    return `<!DOCTYPE html>
<html lang="${c}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/svg+xml" href="/assets/img/brand/logo-tile.svg">
  <meta name="apple-itunes-app" content="app-id=6812973901">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <link rel="canonical" href="${url}">
${alternates}
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="MordanSoft">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${url}">
  <meta property="og:locale" content="${L.locale.replace('-', '_')}">
  <meta name="twitter:card" content="summary">
  <link rel="stylesheet" href="${DS}/tokens/fonts.css">
  <link rel="stylesheet" href="${DS}/tokens/colors.css">
  <link rel="stylesheet" href="${DS}/tokens/typography.css">
  <link rel="stylesheet" href="${DS}/tokens/spacing.css">
  <link rel="stylesheet" href="${DS}/tokens/elevation.css">
  <link rel="stylesheet" href="${DS}/tokens/base.css">
  <link rel="stylesheet" href="${DS}/components/core/core.css">
  <link rel="stylesheet" href="/assets/css/brine-calc.css">
  <link rel="stylesheet" href="/assets/css/site.css">
  <script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, '\\u003c')}</script>
</head>
<body>
  ${SHELL.topbar(c, { active: 'learn', langMenu })}

  <main>
    <section class="section">
      <div class="ms-container">
${body}
        ${SHELL.appStrip(c)}
      </div>
    </section>
  </main>

  ${SHELL.footer(c)}
  ${SHELL.browserData(c)}
<!-- web analytics -->
<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "5a3f2bc95732486688415649c2f82eee"}'></script>
<!-- /web analytics -->
</body>
</html>
`;
  };

  const write = (c, slug, html) => {
    const dir = `${ROOT}${LOC[c].dir ? LOC[c].dir + '/' : ''}learn${slug ? '/' + slug : ''}`;
    mkdirSync(dir, { recursive: true });
    writeFileSync(`${dir}/index.html`, html);
    out.push(pathOf(c, slug));
  };

  for (const c of langs) {
    const D = K[c], I = D.index;
    const list = D.articles.map((a, i) => `          <a class="sc-card" href="${pathOf(c, a.slug)}"><span class="sc-eb">0${i + 1}</span><b>${a.h1}</b><span>${a.lead}</span></a>`).join('\n');
    write(c, '', page(c, '', {
      title: I.title, desc: I.desc,
      jsonld: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: I.h1, url: urlOf(c, ''), inLanguage: c },
      body: `        <div class="section__head">
          <h1 class="section__title">${I.h1}</h1>
          <p class="detail__blurb">${I.lead}</p>
        </div>
        <div class="sc-learn">
${list}
        </div>
        <p class="calc-disclaimer" style="margin-top: var(--space-8); max-width: 72ch">${I.disclaimer}</p>
`,
    }));

    for (const a of D.articles) {
      const qa = a.qa.map((x, i) => `        <h2 id="q${i + 1}">${x.q}</h2>\n        ${localLinks(c, x.a)}`).join('\n');
      const toc = a.qa.map((x, i) => `<a href="#q${i + 1}">${x.q}</a>`).join('') + `<a href="#sources">${I.sources}</a>`;
      const ai = D.articles.indexOf(a), next = D.articles[(ai + 1) % D.articles.length];
      const calc = LOC[c].pages['curing-salt-calculator'];
      const ARROW = '<svg class="sc-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
      write(c, a.slug, page(c, a.slug, {
        title: a.title, desc: a.desc,
        jsonld: { '@context': 'https://schema.org', '@type': 'FAQPage', inLanguage: c, url: urlOf(c, a.slug),
          mainEntity: a.qa.map((x) => ({ '@type': 'Question', name: strip(x.q), acceptedAnswer: { '@type': 'Answer', text: strip(x.a) } })) },
        body: `        <div class="section__head">
          <nav class="sc-crumbs" aria-label="Breadcrumb"><a href="${pathOf(c, '')}">${I.back}</a><span aria-hidden="true">/</span><span>0${ai + 1}</span></nav>
          <h1 class="section__title">${a.h1}</h1>
          <p class="detail__blurb">${a.lead}</p>
        </div>
        <div class="sc-article">
        <nav class="sc-toc" aria-label="${I.back}">${toc}</nav>
        <div class="prose">
${qa}
        <a class="sc-card sc-trycalc" href="${prefix(c)}/curing-salt-calculator/"><span><span class="sc-eb">${SHELL.SH[c] ? SHELL.SH[c].nav.calculators : ''}</span><b>${calc.link}</b></span>${ARROW}</a>
        <h2 id="sources">${I.sources}</h2>
        <ul>
${a.sources.map((s) => `          <li>${s}</li>`).join('\n')}
        </ul>
        <p class="calc-disclaimer">${I.disclaimer}</p>
        <a class="sc-card sc-next" href="${pathOf(c, next.slug)}"><span>0${D.articles.indexOf(next) + 1} · ${next.h1}</span>${ARROW}</a>
        </div>
        </div>
`,
      }));
    }
  }
  return { built: out, langs, slugs: ['', ...K.en.articles.map((a) => a.slug)], urlOf };
}
