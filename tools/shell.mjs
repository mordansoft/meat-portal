// The site chrome every generator shares: header, footer, the app strip and the bits of
// i18n the browser needs for "My cures". One place, so every page in every language looks
// and navigates the same. Strings: i18n/shell/<lang>.mjs (English master).
// A language without a shell file gets a short header and footer built only from strings it
// already has (its own calculator names), and no "My cures".
import { existsSync } from 'node:fs';
import { MARK } from './gen-brine.mjs';

export const SITE_CSS = '/assets/css/site.css';
const STORE = { play: 'https://mordansoft.com/saltcure/go/play/', ios: 'https://mordansoft.com/saltcure/go/app-store/' };
const LANDINGS = ['bacon-cure-calculator', 'pink-salt-calculator', 'dry-cure-calculator', 'cure-1-per-kg'];
const CHEVRON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
export const FLAGS = {
  en: '🇬🇧', uk: '🇺🇦', ru: '🇷🇺', pl: '🇵🇱', cs: '🇨🇿', sk: '🇸🇰', be: '🇧🇾', bg: '🇧🇬',
  hr: '🇭🇷', sr: '🇷🇸', sl: '🇸🇮', es: '🇪🇸', it: '🇮🇹', kk: '🇰🇿', fr: '🇫🇷', 'pt-BR': '🇧🇷',
  tr: '🇹🇷', de: '🇩🇪', id: '🇮🇩',
};
export function langMenuHTML(cur, langs, LOC, pathFor, label = 'Language') {
  const curName = LOC[cur]?.name || cur;
  const curFlag = FLAGS[cur] || '';
  const items = langs.map((x) => {
    const nm = LOC[x]?.name || x;
    const fl = FLAGS[x] || '';
    const sel = x === cur ? ' aria-current="page"' : '';
    return `<a href="${pathFor(x)}" lang="${x}"${sel}><span class="sc-lang__flag" aria-hidden="true">${fl}</span><span>${nm}</span></a>`;
  }).join('');
  return `<details class="sc-lang"><summary class="sc-nav__l" aria-label="${label}"><span class="sc-lang__flag" aria-hidden="true">${curFlag}</span><span class="sc-hide-s">${curName}</span> ${CHEVRON}</summary><div class="sc-lang__pop">${items}</div></details>`;
}
const BOOKMARK = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';

const keysOf = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? keysOf(v, `${p}${k}.`) : [`${p}${k}`]));

export async function makeShell({ ROOT, LIVE, LOC }) {
  const langs = LIVE.filter((c) => existsSync(`${ROOT}i18n/shell/${c}.mjs`));
  const SH = Object.fromEntries(await Promise.all(langs.map(async (c) => [c, (await import(`../i18n/shell/${c}.mjs`)).default])));
  const enKeys = keysOf(SH.en).join();
  for (const c of langs) if (keysOf(SH[c]).join() !== enKeys) throw new Error(`shell/${c}: keys differ from en`);
  const brineLangs = LIVE.filter((c) => existsSync(`${ROOT}i18n/brine/${c}.mjs`));
  const learnLangs = LIVE.filter((c) => existsSync(`${ROOT}i18n/learn/${c}.mjs`));

  const prefix = (c) => (LOC[c].dir ? `/${LOC[c].dir}` : '');
  const link = {
    home: (c) => (SH[c] && c !== 'en' && existsSync(`${ROOT}i18n/home/${c}.mjs`) ? `${prefix(c)}/` : '/'),
    calc: (c, slug) => (slug.includes('brine') && !brineLangs.includes(c) ? `/${slug}/` : `${prefix(c)}/${slug}/`),
    learn: (c) => (learnLangs.includes(c) ? `${prefix(c)}/learn/` : null),
    cures: (c) => (SH[c] ? `${prefix(c)}/my-cures/` : null),
    app: (c) => (c === 'uk' ? 'https://mordansoft.com/uk/saltcure/' : 'https://mordansoft.com/saltcure/'),
  };

  // every calculator a language has, in the order of the header menu
  const calcs = (c) => {
    const L = LOC[c];
    return [
      ['brine-calculator', L.site.nav.brine], ['dry-brine-calculator', L.site.nav.dryBrine], ['curing-salt-calculator', L.site.nav.curing],
      ...LANDINGS.map((slug) => [slug, L.pages[slug].link]),
    ];
  };

  function topbar(c, { active = '', langMenu = '' } = {}) {
    const S = SH[c], L = LOC[c];
    const cur = (k) => (k === active ? ' aria-current="page"' : '');
    const items = calcs(c).map(([slug, label], i) =>
      `${i === 3 ? '<hr>' : ''}<a href="${link.calc(c, slug)}"${cur(slug)}>${label}</a>`).join('');
    const menuLabel = S ? S.nav.calculators : L.site.nav.curing;
    const learn = S && link.learn(c) ? `<a class="sc-nav__l sc-hide-s" href="${link.learn(c)}"${cur('learn')}>${S.nav.learn}</a>` : '';
    const cures = S ? `<a class="sc-nav__l sc-nav__cures" href="${link.cures(c)}"${cur('cures')} aria-label="${S.nav.cures}">${BOOKMARK}<span class="sc-hide-s">${S.nav.cures}</span><span class="sc-count" data-cures-count hidden></span></a>` : '';
    const app = S ? `<a class="sc-nav__l sc-hide-s" href="${link.app(c)}">${S.nav.app}</a>` : '';
    return `<header class="sc-top">
    <div class="ms-container sc-top__in">
      <a class="sc-brand" href="${link.home(c)}"><span class="sc-brand__mark">${MARK}</span><span class="sc-brand__name">SaltCure</span>${S ? `<span class="sc-brand__tag">/ ${S.tag}</span>` : ''}</a>
      <nav class="sc-nav" aria-label="${S ? S.nav.menu : L.site.language}">
        <details class="sc-menu"><summary class="sc-nav__l">${menuLabel} ${CHEVRON}</summary><div class="sc-menu__pop">${items}</div></details>
        ${learn}${cures}${app}${langMenu}
      </nav>
    </div>
  </header>`;
  }

  // a compact "the app keeps the log" strip, placed once per page after the result
  function appStrip(c) {
    const S = SH[c];
    if (!S) return '';
    return `<div class="sc-appstrip">
          <span class="sc-appstrip__ico" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 18h4"/></svg></span>
          <span class="sc-appstrip__t"><b>${S.app.h}</b><span>${S.app.p}</span></span>
          <span class="store-badges">
            <a class="store-badge" href="${STORE.play}" target="_blank" rel="noopener"><img src="/assets/badges/google-play.svg" alt="Google Play"></a>
            <a class="store-badge" href="${STORE.ios}" target="_blank" rel="noopener"><img src="/assets/badges/app-store.svg" alt="App Store"></a>
          </span>
        </div>`;
  }

  function footer(c) {
    const S = SH[c];
    const list = calcs(c).map(([slug, label]) => `<a href="${link.calc(c, slug)}">${label}</a>`).join('');
    const legal = S
      ? `<a href="https://mordansoft.com/saltcure/support.html">${S.foot.support}</a><a href="https://mordansoft.com/legal/saltcure/privacy.html">${S.foot.privacy}</a><a href="https://mordansoft.com/legal/saltcure/terms.html">${S.foot.terms}</a>`
      : '<a href="https://mordansoft.com/saltcure/support.html">Support</a><a href="https://mordansoft.com/legal/saltcure/privacy.html">Privacy</a><a href="https://mordansoft.com/legal/saltcure/terms.html">Terms</a>';
    const col = (h, body) => `<div class="sc-foot__col">${h ? `<span class="sc-eb">${h}</span>` : ''}${body}</div>`;
    return `<footer class="sc-foot">
    <div class="ms-container">
      <div class="sc-foot__grid">
        ${col(S && S.foot.calculators, list)}
        ${S && link.learn(c) ? col(S.foot.learn, `<a href="${link.learn(c)}">${S.foot.allQuestions}</a>`) : ''}
        ${col(S && S.foot.sources, '<a href="https://www.law.cornell.edu/cfr/text/9/part-424">9 CFR part 424</a><a href="https://www.fsis.usda.gov/">USDA FSIS</a><a href="https://www.fda.gov/food/retail-food-protection/fda-food-code">FDA Food Code</a>')}
        ${col(S && S.foot.app, `<span class="store-badges"><a class="store-badge" href="${STORE.play}" target="_blank" rel="noopener"><img src="/assets/badges/google-play.svg" alt="Google Play"></a><a class="store-badge" href="${STORE.ios}" target="_blank" rel="noopener"><img src="/assets/badges/app-store.svg" alt="App Store"></a></span>${legal}`)}
      </div>
      <div class="sc-foot__base">
        ${S ? `<p>${S.foot.note}</p>` : ''}
        <span>© 2026 MordanSoft</span>
      </div>
    </div>
  </footer>`;
  }

  // what /assets/js/cures.mjs needs in the browser; absent where the language has no shell file
  function browserData(c, extra = {}) {
    const S = SH[c];
    if (!S) return '';
    const data = { lang: c, locale: LOC[c].locale, cures: S.cures, links: { cures: link.cures(c), calc: link.calc(c, 'curing-salt-calculator') }, ...extra };
    return `<script type="application/json" id="shell-i18n">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>
  <script type="module" src="/assets/js/cures.mjs"></script>`;
  }

  // Language dropdown for the topbar. `langs` is the subset to list; `pathFor(x)` returns the URL
  // for that language. Omit when `langs` has one or zero entries.
  function langMenu(c, langsOf, pathFor) {
    if (!langsOf || langsOf.length < 2) return '';
    return langMenuHTML(c, langsOf, LOC, pathFor, LOC[c]?.site?.language || 'Language');
  }

  return { SH, langs, brineLangs, learnLangs, link, topbar, footer, appStrip, browserData, prefix, langMenu };
}
