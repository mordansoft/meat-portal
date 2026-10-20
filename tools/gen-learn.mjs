// Builds the knowledge base (/learn/ and /<lang>/learn/) from i18n/learn/<lang>.mjs.
// Called by tools/gen-pages.mjs, which also writes the sitemap; not run on its own.
// A language must mirror i18n/learn/en.mjs: same articles, same number of questions and sources.
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { DS, MARK } from './gen-brine.mjs';

const BASE = 'https://meat.mordansoft.com';

export async function buildLearn({ ROOT, LIVE, LOC, brineLangs }) {
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
    const langMenu = langs.length > 1 ? `<select class="lang-select" aria-label="${L.site.language}" onchange="location.href=this.value">${langs.map((x) =>
      `<option value="${pathOf(x, slug)}"${x === c ? ' selected' : ''}>${LOC[x].name}</option>`).join('')}</select>` : '';
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
  <script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, '\\u003c')}</script>
</head>
<body>
  <div class="topbar">
    <div class="ms-container topbar__inner">
      <a class="brand" href="/"><span class="brand__mark">${MARK}</span><span class="brand__name">meat<b>.</b></span></a>
      <span class="topbar__right"><span class="topbar__links">
          <a href="${nav('brine-calculator')}">${L.site.nav.brine}</a>
          <a href="${nav('dry-brine-calculator')}">${L.site.nav.dryBrine}</a>
          <a href="${prefix(c)}/curing-salt-calculator/">${L.site.nav.curing}</a>
      </span>${langMenu}</span>
    </div>
  </div>

  <main>
    <section class="section">
      <div class="ms-container">
${body}
        <div class="ms-card ms-card--pad calc-cta">
          <div class="store-badges">
            <a class="store-badge" href="https://mordansoft.com/saltcure/go/play/" target="_blank" rel="noopener"><img src="/assets/badges/google-play.svg" alt="Google Play"></a>
            <a class="store-badge" href="https://mordansoft.com/saltcure/go/app-store/" target="_blank" rel="noopener"><img src="/assets/badges/app-store.svg" alt="App Store"></a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="ms-container footer-inner">
      <div class="footer-brand">
        <span class="footer-brand__mark" aria-hidden="true">${MARK}</span>
        <div>
          <div class="footer-brand__name">Mordan<b>Soft</b></div>
          <div class="footer-copy">© 2026 MordanSoft</div>
        </div>
      </div>
      <div class="footer-legal">
        <h4>Legal</h4>
        <a href="https://mordansoft.com/saltcure/support.html">SaltCure — Support</a>
        <a href="https://mordansoft.com/legal/saltcure/privacy.html">SaltCure — Privacy</a>
        <a href="https://mordansoft.com/legal/saltcure/terms.html">SaltCure — Terms</a>
      </div>
    </div>
  </footer>
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
    const list = D.articles.map((a) => `          <li><a href="${pathOf(c, a.slug)}"><strong>${a.h1}</strong></a><br>${a.lead}</li>`).join('\n');
    write(c, '', page(c, '', {
      title: I.title, desc: I.desc,
      jsonld: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: I.h1, url: urlOf(c, ''), inLanguage: c },
      body: `        <div class="section__head">
          <h1 class="section__title">${I.h1}</h1>
          <p class="detail__blurb">${I.lead}</p>
        </div>
        <div class="prose">
        <ul class="learn-list">
${list}
        </ul>
        <p class="calc-disclaimer">${I.disclaimer}</p>
        </div>
`,
    }));

    for (const a of D.articles) {
      const qa = a.qa.map((x) => `        <h2>${x.q}</h2>\n        ${localLinks(c, x.a)}`).join('\n');
      const others = D.articles.filter((o) => o.slug !== a.slug).map((o) => `<a href="${pathOf(c, o.slug)}">${o.h1}</a>`).join(' · ');
      write(c, a.slug, page(c, a.slug, {
        title: a.title, desc: a.desc,
        jsonld: { '@context': 'https://schema.org', '@type': 'FAQPage', inLanguage: c, url: urlOf(c, a.slug),
          mainEntity: a.qa.map((x) => ({ '@type': 'Question', name: strip(x.q), acceptedAnswer: { '@type': 'Answer', text: strip(x.a) } })) },
        body: `        <div class="section__head">
          <p class="eyebrow"><a href="${pathOf(c, '')}">← ${I.back}</a></p>
          <h1 class="section__title">${a.h1}</h1>
          <p class="detail__blurb">${a.lead}</p>
        </div>
        <div class="prose">
${qa}
        <h2>${I.sources}</h2>
        <ul>
${a.sources.map((s) => `          <li>${s}</li>`).join('\n')}
        </ul>
        <p class="calc-disclaimer">${I.disclaimer}</p>
        <p>${others}</p>
        </div>
`,
      }));
    }
  }
  return { built: out, langs, slugs: ['', ...K.en.articles.map((a) => a.slug)], urlOf };
}
