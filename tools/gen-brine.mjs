// Builds the brine and dry-brine pages in every live language from i18n/brine/<lang>.mjs.
// Called by tools/gen-pages.mjs (which also writes the sitemap); not run on its own.
// i18n/brine/en.mjs is the master; a language with a missing or extra key is refused.
import { writeFileSync, mkdirSync } from 'node:fs';

const BASE = 'https://meat.mordansoft.com';
const DS = '/_ds/mordansoft-design-system-7351f888-c996-4acc-8aa6-e3cd4b4e66b4';
const SALTCURE = 'https://mordansoft.com/saltcure/';
export const BRINE_PAGES = [{ slug: 'brine-calculator', key: 'brine' }, { slug: 'dry-brine-calculator', key: 'dry' }];

const MARK = '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="6" y="10" width="26" height="26" rx="7" fill="currentColor" opacity="0.22"></rect><rect x="12" y="14" width="26" height="26" rx="7" fill="currentColor" opacity="0.45"></rect><rect x="18" y="18" width="24" height="24" rx="7" fill="#E0632C"></rect><rect x="24" y="24" width="12" height="12" rx="3.5" fill="#000000" opacity="0.16"></rect></svg>';

const keysOf = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? keysOf(v, `${p}${k}.`) : [`${p}${k}`]));

export async function buildBrine({ ROOT, LIVE, LOC }) {
  const B = Object.fromEntries(await Promise.all(LIVE.map(async (c) => [c, (await import(`../i18n/brine/${c}.mjs`)).default])));
  const enKeys = new Set(keysOf(B.en));
  for (const c of LIVE) {
    const ks = new Set(keysOf(B[c]));
    const missing = [...enKeys].filter((k) => !ks.has(k));
    const extra = [...ks].filter((k) => !enKeys.has(k));
    if (missing.length || extra.length) throw new Error(`brine/${c}: missing ${missing.join(', ') || '—'}; extra ${extra.join(', ') || '—'}`);
  }

  const prefix = (c) => (LOC[c].dir ? `/${LOC[c].dir}` : '');
  const pathOf = (c, slug) => `${prefix(c)}/${slug}/`;
  const urlOf = (c, slug) => `${BASE}${pathOf(c, slug)}`;
  const esc = (s) => s.replace(/&(?!amp;|nbsp;)/g, '&amp;').replace(/"/g, '&quot;');
  const out = [];

  for (const c of LIVE) for (const page of BRINE_PAGES) {
    const L = LOC[c], C = B[c].common, P = B[c][page.key], WET = page.key === 'brine';
    const links = { curing: pathOf(c, 'curing-salt-calculator'), wet: pathOf(c, 'brine-calculator'), dry: pathOf(c, 'dry-brine-calculator'), saltcure: SALTCURE };
    const f = (s) => s.replace(/\{(curing|wet|dry|saltcure)\}/g, (_, k) => links[k]);
    const U = C.units, S = C.salts;
    const opt = (v, label, sel) => `<option value="${v}"${sel ? ' selected' : ''}>${label}</option>`;
    const weightSel = `<select class="ms-input" id="meatUnit">${opt('g', U.g, 1)}${opt('kg', U.kg)}${opt('lb', U.lb)}${opt('oz', U.oz)}</select>`;
    const saltSel = `<select class="ms-input" id="saltType">${opt('fine', S.fine, 1)}${opt('mortonK', S.mortonK)}${opt('diamondK', S.diamondK)}${opt('coarse', S.coarse)}</select>`;
    const thick = (v) => `<label class="fld"><span class="lbl">${C.thick}</span>
                <span class="pair"><input class="ms-input" type="number" id="thick" value="${v}" min="0" step="any" inputmode="decimal"><select class="ms-input" id="thickUnit">${opt('mm', U.mm, 1)}${opt('in', U.in)}</select></span>
              </label>`;
    const row = (cells) => `<tr>${cells.map((x, i) => (i ? `<td class="num">${x}</td>` : `<td>${x}</td>`)).join('')}</tr>`;
    const tbl = (head, rows) => `<div class="tbl-scroll"><table class="tbl">
          <thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
          <tbody>
            ${rows.map(row).join('\n            ')}
          </tbody>
        </table></div>`;
    const R = C.reg;
    const regBlock = `<h2>${R.h}</h2>
        <p>${R.p}</p>
        <div class="tbl-scroll"><table class="tbl">
          <thead><tr><th>${R.rule}</th><th>${R.figure}</th><th>${R.source}</th></tr></thead>
          <tbody>
            <tr><td>${R.r1}</td><td class="num">${R.f1}</td><td>${R.s1}</td></tr>
            <tr><td>${R.r2}</td><td class="num">${R.f2}</td><td>${R.s2}</td></tr>
            <tr><td>${R.r3}</td><td class="num">${R.f3}</td><td>${R.s3}</td></tr>
          </tbody>
        </table></div>
        <div class="calc-alert calc-alert--warn">
          <b>${R.moreH}</b>
          <p>${R.moreP}</p>
        </div>`;
    const A = C.alone;
    const aloneBlock = `<h2>${A.h}</h2>
        <p>${A.p}</p>
        <div class="calc-alert calc-alert--bad">
          <b>${A.badH}</b>
          <p>${f(A.badP)}</p>
        </div>`;
    const Sr = C.src;
    const srcBlock = `<h2>${Sr.h}</h2>
        <ul>
          <li>${Sr.s1}</li>
          <li>${Sr.s2}</li>
          <li>${Sr.s3}</li>
          <li>${f(Sr.s4)}</li>
        </ul>
        <p class="calc-disclaimer">${Sr.disclaimer}</p>`;

    const form = WET ? `<div class="cc">
              <span class="eyebrow">${P.eyebrow}</span>
              <label class="fld"><span class="lbl">${C.meatWeight}</span>
                <span class="pair"><input class="ms-input" type="number" id="meat" value="2000" min="0" step="any" inputmode="decimal">${weightSel}</span>
              </label>
              <label class="fld"><span class="lbl">${P.water}</span>
                <span class="pair"><input class="ms-input" type="number" id="water" value="2000" min="0" step="any" inputmode="decimal"><select class="ms-input" id="waterUnit">${opt('ml', U.ml, 1)}${opt('l', U.l)}${opt('qt', U.qt)}${opt('gal', U.gal)}${opt('cup', U.cup)}</select></span>
                <span class="hint">${P.waterHint}</span>
              </label>
              <label class="fld"><span class="lbl">${P.target}</span>
                <input class="ms-input" type="number" id="target" value="1.2" min="0" max="6" step="0.1" inputmode="decimal">
                <span class="hint">${P.targetHint}</span>
              </label>
              <span class="cols">
                <label class="fld"><span class="lbl">${C.sugarShare}</span>
                  <input class="ms-input" type="number" id="sugar" value="33" min="0" max="100" step="1" inputmode="decimal">
                  <span class="hint">${P.sugarHint}</span>
                </label>
                <label class="fld"><span class="lbl">${C.yourSalt}</span>${saltSel}
                  <span class="hint">${P.saltHint}</span>
                </label>
              </span>
              ${thick(60)}
            </div>

            <div class="cc">
              <span class="eyebrow">${P.checkH}</span>
              <p class="calc-hint" style="margin-top:6px">${P.checkP}</p>
              <span class="cols">
                <label class="fld"><span class="lbl">${P.rSalt}</span>
                  <span class="pair"><input class="ms-input" type="number" id="rSalt" value="1" min="0" step="any" inputmode="decimal"><select class="ms-input" id="rSaltUnit">${opt('cup', U.cup, 1)}${opt('tbsp', U.tbsp)}${opt('g', U.g)}${opt('oz', U.oz)}</select></span>
                </label>
                <label class="fld"><span class="lbl">${P.rWater}</span>
                  <span class="pair"><input class="ms-input" type="number" id="rWater" value="1" min="0" step="any" inputmode="decimal"><select class="ms-input" id="rWaterUnit">${opt('gal', U.gal, 1)}${opt('qt', U.qt)}${opt('l', U.l)}${opt('ml', U.ml)}</select></span>
                </label>
              </span>
              <label class="fld"><span class="lbl">${P.rMeat}</span>
                <input class="ms-input" type="number" id="rMeat" value="" min="0" step="any" inputmode="decimal" placeholder="${esc(P.rMeatPh)}">
              </label>
              <p class="calc-banner jsonly" id="rOut">—</p>
            </div>` : `<div class="cc">
              <span class="eyebrow">${P.eyebrow}</span>
              <label class="fld"><span class="lbl">${C.meatWeight}</span>
                <span class="pair"><input class="ms-input" type="number" id="meat" value="5000" min="0" step="any" inputmode="decimal">${weightSel}</span>
              </label>
              <label class="fld"><span class="lbl">${P.target}</span>
                <input class="ms-input" type="number" id="target" value="1.2" min="0" max="6" step="0.1" inputmode="decimal">
                <span class="hint">${P.targetHint}</span>
              </label>
              <span class="cols">
                <label class="fld"><span class="lbl">${C.sugarShare}</span>
                  <input class="ms-input" type="number" id="sugar" value="33" min="0" max="100" step="1" inputmode="decimal">
                </label>
                <label class="fld"><span class="lbl">${C.yourSalt}</span>${saltSel}
                  <span class="hint">${P.saltHint}</span>
                </label>
              </span>
              ${thick(80)}
            </div>`;

    const cells = WET
      ? `<div class="cell"><span class="eyebrow">${C.sugar}</span><b id="sugarOut">—</b></div>
                <div class="cell"><span class="eyebrow">${P.time}</span><b id="timeOut" style="font-size:16px">—</b></div>
                <div class="cell"><span class="eyebrow">${P.pctWater}</span><b id="pctWater">—</b></div>
                <div class="cell"><span class="eyebrow">${P.pctMeat}</span><b id="pctMeat">—</b></div>`
      : `<div class="cell"><span class="eyebrow">${C.sugar}</span><b id="sugarOut">—</b></div>
                <div class="cell"><span class="eyebrow">${P.fridge}</span><b id="timeOut" style="font-size:16px">—</b></div>`;

    const prose = WET ? `<h2>${P.whyH}</h2>
        <p>${P.whyP}</p>

        <h2>${P.overH}</h2>
        <p>${P.overP}</p>
        <p>${P.overP2}</p>

        <h2>${P.cutsH}</h2>
        <p>${P.cutsP}</p>
        ${tbl([C.cut, C.range, C.working], [[P.c1, '1.0–1.5%', '1.2%'], [P.c2, '1.0–1.5%', '1.2%'], [P.c3, '1.2–1.8%', '1.5%'], [P.c4, '1.2–1.8%', '1.5%'], [P.c5, '1.5–2.5%', '2.0%']].map((r) => [r[0], pct(r[1], c, LOC), pct(r[2], c, LOC)]))}
        <p class="calc-disclaimer">${P.cutsNote}</p>

        <h2>${P.timeH}</h2>
        <p>${P.timeP}</p>
        ${tbl([C.thickCol, P.inBrine], [[P.t1, '4–8'], [P.t2, '8–18'], [P.t3, '12–24'], [P.t4, '18–36']].map((r) => [r[0], fill(B[c].common.js.hours, r[1])]))}
        <p class="calc-disclaimer">${P.timeNote}</p>

        ${regBlock}
        ${aloneBlock}
        <p>${P.fishP}</p>

        <h2>${P.throwH}</h2>
        <p>${P.throwP}</p>

        ${srcBlock}` : `<h2>${P.basisH}</h2>
        <p>${P.basisP}</p>
        <h2>${P.vsH}</h2>
        <p>${P.vsP}</p>
        <p>${f(P.vsP2)}</p>
        <h2>${P.cutsH}</h2>
        <p>${P.cutsP}</p>
        ${tbl([C.cut, C.range, C.working], [[P.c1, '1.0–1.5%', '1.2%'], [P.c2, '1.0–1.5%', '1.2%'], [P.c3, '0.8–1.2%', '1.0%'], [P.c4, '1.5–2.0%', '1.75%']].map((r) => [r[0], pct(r[1], c, LOC), pct(r[2], c, LOC)]))}
        <p class="calc-disclaimer">${P.cutsNote}</p>
        <h2>${P.timeH}</h2>
        ${tbl([C.thickCol, P.dryCol], [[P.t1, '8–12'], [P.t2, '12–24'], [P.t3, '24–48']].map((r) => [r[0], fill(B[c].common.js.hours, r[1])]))}
        <p>${P.timeP}</p>
        ${regBlock}
        <div class="calc-alert calc-alert--warn">
          <b>${P.washH}</b>
          <p>${P.washP}</p>
        </div>
        ${aloneBlock}
        ${srcBlock}`;

    const url = urlOf(c, page.slug);
    const alternates = [...LIVE.map((x) => `  <link rel="alternate" hreflang="${x}" href="${urlOf(x, page.slug)}">`),
      `  <link rel="alternate" hreflang="x-default" href="${urlOf('en', page.slug)}">`].join('\n');
    const langMenu = `<select class="lang-select" aria-label="${L.site.language}" onchange="location.href=this.value">${LIVE.map((x) =>
      `<option value="${pathOf(x, page.slug)}"${x === c ? ' selected' : ''}>${LOC[x].name}</option>`).join('')}</select>`;
    const cur = (slug) => (slug === page.slug ? ' aria-current="page"' : '');
    const i18n = JSON.stringify({ lang: c, locale: L.locale, mode: WET ? 'wet' : 'dry', salts: S, t: { ...C.js, ...P.js } }).replace(/</g, '\\u003c');

    const html = `<!DOCTYPE html>
<html lang="${c}" class="nojs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/svg+xml" href="/assets/img/brand/logo-tile.svg">
  <meta name="apple-itunes-app" content="app-id=6812973901">
  <title>${esc(P.title)}</title>
  <meta name="description" content="${esc(P.desc)}">
  <link rel="canonical" href="${url}">
${alternates}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="MordanSoft">
  <meta property="og:title" content="${esc(P.title)}">
  <meta property="og:description" content="${esc(P.desc)}">
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
  <script src="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js"></script>
  <script>document.documentElement.classList.remove('nojs');</script>
</head>
<body>
  <div class="topbar">
    <div class="ms-container topbar__inner">
      <a class="brand" href="/"><span class="brand__mark">${MARK}</span><span class="brand__name">meat<b>.</b></span></a>
      <span class="topbar__right"><span class="topbar__links">
          <a href="${links.wet}"${cur('brine-calculator')}>${L.site.nav.brine}</a>
          <a href="${links.dry}"${cur('dry-brine-calculator')}>${L.site.nav.dryBrine}</a>
          <a href="${links.curing}">${L.site.nav.curing}</a>
      </span>${langMenu}</span>
    </div>
  </div>

  <main>
    <section class="section">
      <div class="ms-container">
        <div class="section__head">
          <h1 class="section__title">${P.h1}</h1>
          <p class="detail__blurb">${P.lead}</p>
        </div>

        <div class="calc-wrap">
          <div class="calc-col">
            ${form}
          </div>

          <div class="calc-out">
            <div class="cc cc--strong jsonly" aria-live="polite">
              <span class="eyebrow">${C.weighOut}</span>
              <div class="headline" id="saltOut">—</div>
              <p class="calc-hint" id="saltAlt"></p>
              <div class="cells">
                ${cells}
              </div>
              <div class="calc-alert calc-alert--bad" id="capWarn" hidden>
                <b>${P.capH}</b>
                <p>${f(P.capP)}</p>
              </div>
            </div>
            <div class="calc-banner nojsonly">
              ${P.nojs}
            </div>
          </div>
        </div>

        <div class="prose">
        ${prose}
        </div>

        <div class="ms-card ms-card--pad calc-cta">
          <h2 style="font-size: var(--text-h4); font-weight:600; color:var(--text-primary); margin:0">${C.cta.h}</h2>
          <p style="font-size: var(--text-base); color:var(--text-secondary); line-height:var(--leading-normal); margin: var(--space-3) 0 var(--space-5); max-width:60ch">
            ${C.cta.p}</p>
          <p style="font-size: var(--text-sm); color:var(--text-muted); margin: 0 0 var(--space-4)">${f(C.cta.see)}</p>
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
  <script>if (window.lucide) lucide.createIcons();</script>
  <script type="application/json" id="brine-i18n">${i18n}</script>
  <script type="module" src="/assets/js/brine-page.mjs"></script>
<!-- web analytics -->
<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "5a3f2bc95732486688415649c2f82eee"}'></script>
<!-- /web analytics -->
</body>
</html>
`;
    const dir = `${ROOT}${L.dir ? L.dir + '/' : ''}${page.slug}`;
    mkdirSync(dir, { recursive: true });
    writeFileSync(`${dir}/index.html`, html);
    out.push(pathOf(c, page.slug));
  }
  return out;
}

const fill = (tpl, range) => { const [lo, hi] = range.split('–'); return tpl.replace('{lo}', lo).replace('{hi}', hi); };
// Table figures are written in English notation in the code; each language gets its own decimal mark.
const pct = (s, c, LOC) => (c === 'en' ? s : s.replace(/(\d)\.(\d)/g, '$1,$2'));
