// Сверка чисел и плейсхолдеров в i18n/<lang>.mjs против en.mjs. Запуск: node tools/check-numbers.mjs ru pl
const dir = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const langs = process.argv.slice(2);
const en = (await import(`${dir}/i18n/en.mjs`)).default;

function flat(o, p = '', out = {}) {
  for (const [k, v] of Object.entries(o)) {
    const key = p ? `${p}.${k}` : k;
    if (v && typeof v === 'object') flat(v, key, out);
    else if (typeof v === 'string') out[key] = v;
  }
  return out;
}
const nums = (s) => (s.replace(/\{[^}]*\}/g, ' ').replace(/(\d)[\s  ](\d{3})/g, '$1$2').match(/\d+(?:[.,]\d+)?/g) || [])
  .map((n) => n.replace(',', '.')).sort();
const phs = (s) => (s.match(/\{[^}]*\}/g) || []).sort();

const E = flat(en);
let bad = 0;
for (const lang of langs) {
  const L = flat((await import(`${dir}/i18n/${lang}.mjs`)).default);
  for (const [k, v] of Object.entries(E)) {
    if (['lang', 'locale', 'name', 'dir'].includes(k) || k.startsWith('site.usNote')) continue;
    const t = L[k];
    if (t === undefined) { console.log(`${lang} ${k}: MISSING`); bad++; continue; }
    const a = nums(v).join(' '), b = nums(t).join(' ');
    const pa = phs(v).join(' '), pb = phs(t).join(' ');
    if (a !== b) { console.log(`${lang} ${k}: nums en[${a}] ≠ [${b}]`); bad++; }
    if (pa !== pb) { console.log(`${lang} ${k}: ph en[${pa}] ≠ [${pb}]`); bad++; }
  }
}
console.log(bad ? `${bad} расхождений` : 'OK');
