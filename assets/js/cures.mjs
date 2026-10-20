// "My cures": curing calculations saved in this browser (localStorage), nothing sent anywhere.
// - On the curing calculator it listens for `saltcure:calc` (fired by curing-salt-calculator/app.mjs
//   after every render) and saves exactly what the result card showed. Past the limit there is no
//   result, so there is nothing to save.
// - On the home page it fills the "saved on this device" strip; on /my-cures/ it lists the cards.
// - Everywhere it puts the count next to "My cures" in the header.
// Strings come from <script id="shell-i18n"> (tools/shell.mjs). Every value is written with
// textContent — stored data is never parsed as HTML.
const KEY = 'saltcure.cures.v1';
const D = JSON.parse(document.getElementById('shell-i18n')?.textContent || 'null');

function load() {
  try { const v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? v : []; } catch { return []; }
}
function store(list) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); return true; } catch { return false; }
}

const C = D ? D.cures : {};
const fmtDate = (iso) => new Date(iso).toLocaleDateString(D.locale, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
const fill = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => (k in v ? v[k] : `{${k}}`));
function el(tag, attrs = {}, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') e.className = v; else if (k === 'text') e.textContent = v; else if (k.startsWith('on')) e.addEventListener(k.slice(2), v); else e.setAttribute(k, v);
  }
  for (const k of kids) if (k) e.append(k);
  return e;
}

function updateCount() {
  const n = load().length;
  document.querySelectorAll('[data-cures-count]').forEach((e) => { e.textContent = String(n); e.hidden = n === 0; });
}

function init() {
  updateCount();
  window.addEventListener('storage', (e) => { if (e.key === KEY) { updateCount(); renderList(); renderStrip(); } });
  wireCalculator();
  renderStrip();
  renderList();
}

// ── calculator page ───────────────────────────────────────────────────────
function wireCalculator() {
  const box = document.getElementById('sc-save');
  if (!box) return;
  const save = el('button', { type: 'button', class: 'ms-btn ms-btn--primary', disabled: '' }, C.save);
  const print = el('button', { type: 'button', class: 'ms-btn ms-btn--secondary', onclick: () => window.print() }, C.print);
  const open = el('a', { class: 'ms-btn ms-btn--link', href: D.links.cures, hidden: '' }, C.open);
  const note = el('p', { class: 'sc-save__note', text: C.cantSave });
  box.append(save, print, open, note);
  let current = null;
  document.addEventListener('saltcure:calc', (e) => {
    current = e.detail;
    save.disabled = !current;
    save.textContent = C.save;
    open.hidden = true;
    note.textContent = current ? C.local : C.cantSave;
  });
  save.addEventListener('click', () => {
    if (!current) return;
    const list = load();
    list.unshift({ id: Date.now().toString(36), savedAt: new Date().toISOString(), lang: D.lang, ...current });
    if (!store(list.slice(0, 50))) return;
    save.disabled = true;
    save.textContent = C.saved;
    open.hidden = false;
    updateCount();
  });
}

// ── home strip ────────────────────────────────────────────────────────────
function renderStrip() {
  const box = document.getElementById('sc-strip');
  if (!box) return;
  const list = load();
  box.replaceChildren();
  box.hidden = list.length === 0;
  if (!list.length) return;
  const items = el('div', { class: 'sc-strip__items' });
  for (const r of list.slice(0, 2)) {
    items.append(el('a', { class: 'sc-card', href: D.links.cures },
      el('b', { text: `${r.dish} · ${r.meat}` }),
      el('small', { text: `${r.cureG} ${r.cure} · ${fill(C.savedOn, { date: fmtDate(r.savedAt) })}` })));
  }
  box.append(
    el('div', { class: 'sc-strip__h' }, el('span', { class: 'sc-eb', text: C.stripTitle }), el('b', { text: C.h1 })),
    items,
    el('a', { href: D.links.cures, text: `${C.stripAll} (${list.length})` }));
}

// ── /my-cures/ ────────────────────────────────────────────────────────────
function renderList() {
  const box = document.getElementById('sc-cures');
  if (!box) return;
  const list = load();
  box.replaceChildren();
  if (!list.length) {
    box.append(el('div', { class: 'sc-card sc-empty' },
      el('p', { text: C.empty }),
      el('a', { class: 'ms-btn ms-btn--primary', href: D.links.calc, text: C.emptyCta })));
    return;
  }
  for (const r of list) {
    const num = (label, value, sub) => el('div', {}, el('span', { class: 'sc-eb', text: label }), el('b', { text: value }), sub ? el('span', { class: 'mut', text: sub }) : null);
    const del = el('button', { type: 'button', text: C.remove, onclick: () => {
      if (!confirm(C.removeAsk)) return;
      store(load().filter((x) => x.id !== r.id)); updateCount(); renderList();
    } });
    box.append(el('article', { class: 'sc-card sc-cure' },
      el('div', { class: 'sc-cure__head' },
        el('div', {},
          el('span', { class: 'sc-eb', text: `${r.method} · ${r.cure}` }),
          el('h2', { text: `${r.dish}, ${r.meat}` }),
          el('p', { text: fill(C.savedOn, { date: fmtDate(r.savedAt) }) + (r.water ? ` · ${C.water} ${r.water}` : '') })),
        el('button', { type: 'button', class: 'ms-btn ms-btn--secondary', onclick: () => window.print(), text: C.print })),
      el('div', { class: 'sc-cure__nums' },
        num(C.curing, r.cureG, `${C.nitrite} ${r.ppm}`),
        num(C.salt, r.saltG),
        num(C.sugar, r.sugarG)),
      r.warnings && r.warnings.length ? el('div', { class: 'sc-cure__warn', role: 'note' }, el('b', { text: `${C.warned}: ` }), r.warnings.join(' · ')) : null,
      r.banner ? el('p', { class: 'calc-banner', text: r.banner }) : null,
      r.weighTip ? el('p', { class: 'calc-hint', text: r.weighTip }) : null,
      r.usNote ? el('p', { class: 'us-note', text: r.usNote }) : null,
      r.disclaimer ? el('p', { class: 'calc-disclaimer', text: r.disclaimer }) : null,
      el('div', { class: 'sc-cure__foot' },
        el('a', { href: r.url || D.links.calc, text: C.recalc }),
        del)));
  }
}

if (D) init();
