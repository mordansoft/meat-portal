// UI of the brine and dry-brine pages, in every language. The maths lives in brine.mjs;
// the strings come from the page itself (<script id="brine-i18n">, written by tools/gen-brine.mjs).
import { wetBrine, dryBrine, timeByThickness, strengthOf, spoonsOf, SALTS,
         LB, OZ, GAL, QT, CUP, INCH } from './brine.mjs';

const I = JSON.parse(document.getElementById('brine-i18n').textContent);
const T = I.t;
const WET = I.mode === 'wet';

// Every language but English writes a decimal comma. Some browsers claim a locale yet format it
// as English "2.4" (Chromium does for kk-KZ); borrow ru-RU then — same comma, same space grouping.
const NUM = I.lang === 'en' || new Intl.NumberFormat(I.locale).format(1.5).includes(',') ? I.locale : 'ru-RU';
const nf = (d) => new Intl.NumberFormat(NUM, { maximumFractionDigits: d });
const fill = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => (k in v ? v[k] : `{${k}}`));

const $ = (id) => document.getElementById(id);
const n = (id) => { const v = parseFloat(String($(id).value).replace(',', '.')); return isFinite(v) ? v : NaN; };
const set = (id, t) => { $(id).textContent = t; };
const g = (x) => !isFinite(x) ? '—' : `${nf(x >= 100 ? 0 : x >= 10 ? 1 : 2).format(x)} ${T.g}`;
const pc = (x) => isFinite(x) ? `${nf(2).format(x)}%` : '—';
const wUnits = { g: 1, kg: 1000, lb: LB, oz: OZ };
const vUnits = { ml: 1, l: 1000, qt: QT, gal: GAL, cup: CUP };

function hoursText(h) {
  if (!h) return '—';
  const d1 = nf(1);
  const days = h.lo >= 24 ? ' ' + fill(T.days, { lo: d1.format(h.lo / 24), hi: d1.format(h.hi / 24) }) : '';
  return fill(T.hours, { lo: h.lo, hi: h.hi }) + days;
}

function spoons(grams, saltKey) {
  const s = spoonsOf(grams, saltKey);
  const unit = s.unit === 'cup' ? (s.n >= 1.9 ? T.cups : T.cup) : T[s.unit];
  return fill(T.spoons, { spoons: `${nf(3).format(s.n)} ${unit}`, salt: I.salts[saltKey].toLowerCase(), oz: nf(2).format(grams / OZ) });
}

function recalc() {
  const meat = n('meat') * (wUnits[$('meatUnit').value] || 1);
  const r = WET
    ? wetBrine({ meatGrams: meat, waterGrams: n('water') * (vUnits[$('waterUnit').value] || 1), targetPct: n('target'), sugarShareOfSaltPct: n('sugar') || 0 })
    : dryBrine({ meatGrams: meat, targetPct: n('target'), sugarShareOfSaltPct: n('sugar') || 0 });
  if (!r) {
    set('saltOut', '—'); set('saltAlt', T.fill);
    set('sugarOut', '—'); set('timeOut', '—');
    if (WET) { set('pctWater', '—'); set('pctMeat', '—'); }
    $('capWarn').hidden = true;
    return;
  }
  const saltKey = $('saltType').value;
  set('saltOut', fill(T.ofSalt, { g: g(r.saltGrams) }));
  set('saltAlt', `${spoons(r.saltGrams, saltKey)} ${WET ? T.weigh : T.spread}`);
  set('sugarOut', r.sugarGrams > 0 ? g(r.sugarGrams) : T.none);
  if (WET) { set('pctWater', pc(r.pctOfWater)); set('pctMeat', pc(r.pctOfMeat)); }
  const mm = n('thick') * ($('thickUnit').value === 'in' ? INCH : 1);
  const h = timeByThickness(mm, { dry: !WET });
  set('timeOut', h ? (WET ? hoursText(h) : fill(T.rack, { t: hoursText(h) })) : T.enterThick);
  $('capWarn').hidden = !(h && h.overCap);
}

function recheck() {
  const s = SALTS[$('saltType').value];
  const u = $('rSaltUnit').value, v = n('rSalt');
  const saltG = u === 'cup' ? v * s.gPerCup : u === 'tbsp' ? v * s.gPerTsp * 3 : u === 'oz' ? v * OZ : v;
  const waterG = n('rWater') * (vUnits[$('rWaterUnit').value] || 1);
  const meatG = n('rMeat');
  const r = strengthOf({ saltGrams: saltG, waterGrams: waterG, meatGrams: meatG > 0 ? meatG : 0 });
  if (!r) { set('rOut', T.needBoth); return; }
  let t = fill(T.isOfWater, { pct: pc(r.pctOfWater), salt: g(saltG), water: g(waterG) });
  if (r.pctOfTotal != null) {
    t += ' ' + fill(T.withMeat, { pct: pc(r.pctOfTotal) });
    if (r.pctOfTotal > 3) t += ' ' + T.strong;
  } else {
    t += ' ' + T.addMeat;
  }
  set('rOut', t);
}

const all = () => { recalc(); if (WET) recheck(); };
const ids = WET
  ? ['meat', 'meatUnit', 'water', 'waterUnit', 'target', 'sugar', 'saltType', 'thick', 'thickUnit', 'rSalt', 'rSaltUnit', 'rWater', 'rWaterUnit', 'rMeat']
  : ['meat', 'meatUnit', 'target', 'sugar', 'saltType', 'thick', 'thickUnit'];
ids.forEach((id) => { $(id).addEventListener('input', all); $(id).addEventListener('change', all); });
all();
