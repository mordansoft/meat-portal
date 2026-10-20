// Salting without nitrite: wet brine and dry brine.
//
// Companion to saltcure/calculator/curing.mjs, which owns everything with
// nitrite in it. Nothing here is duplicated from there — a plain brine has no
// ppm, no limit table and no hard stop; what it has is a two-day ceiling, and
// past that ceiling the answer is "use the curing calculator".
//
// Numbers trace to ~/work-hub/cook/brine-norms-no-nitrite.md. Figures marked
// [NORM] there have a published source (USDA, FDA Food Code); the salt
// percentages and the timing bands are the cook's practice, and the pages say
// so out loud. brine.test.mjs holds the vectors.

/** Longest a brine or dry cure may run without curing salt. USDA: a brine does
 *  not extend the 1–2 day life of fresh poultry. [NORM] */
export const MAX_HOURS = 48;

/** Keep the meat and the liquid at or below this throughout. USDA. [NORM] */
export const MAX_C = 4.4;

/** Published cup weights. A teaspoon of fine salt weighs roughly twice a
 *  teaspoon of Diamond Crystal, which is why a recipe in spoons does not
 *  travel and this site answers in grams. */
export const SALTS = {
  fine:     { label: 'Table / fine sea salt',  gPerCup: 292, gPerTsp: 6.1 },
  mortonK:  { label: 'Morton kosher',          gPerCup: 241, gPerTsp: 5.0 },
  diamondK: { label: 'Diamond Crystal kosher', gPerCup: 142, gPerTsp: 2.9 },
  coarse:   { label: 'Coarse sea salt',        gPerCup: 220, gPerTsp: 4.6 },
};

export const LB = 453.592, OZ = 28.3495, GAL = 3785.41, QT = 946.353,
             CUP = 236.588, INCH = 25.4;

/**
 * Wet equilibrium brine. The percentage is of the WHOLE system — meat plus
 * water — because that is the strength both settle at. The meat approaches the
 * brine and cannot pass it, so an extra few hours cannot oversalt it.
 */
export function wetBrine({ meatGrams, waterGrams, targetPct, sugarShareOfSaltPct = 0 }) {
  if (!(meatGrams > 0) || !(waterGrams > 0) || !(targetPct >= 0)) return null;
  const total = meatGrams + waterGrams;
  const salt = total * targetPct / 100;
  return {
    saltGrams: salt,
    sugarGrams: salt * sugarShareOfSaltPct / 100,
    totalGrams: total,
    pctOfWater: salt / waterGrams * 100,
    pctOfMeat: salt / meatGrams * 100,
  };
}

/** Dry brine. The percentage is of the meat alone — there is no water in it. */
export function dryBrine({ meatGrams, targetPct, sugarShareOfSaltPct = 0 }) {
  if (!(meatGrams > 0) || !(targetPct >= 0)) return null;
  const salt = meatGrams * targetPct / 100;
  return { saltGrams: salt, sugarGrams: salt * sugarShareOfSaltPct / 100 };
}

/**
 * Time from thickness, not from weight: salt travels in from every wetted
 * face, so a flat slab is quick and a roast is slow at the same weight.
 * `overCap` means the piece needs longer than the two days a plain cure may
 * run — at which point the page sends the reader to the curing calculator
 * rather than printing an unsafe number.
 */
export function timeByThickness(mm, { dry = false } = {}) {
  if (!(mm > 0)) return null;
  const bands = dry
    ? [[25, 8, 12], [50, 12, 24], [100, 24, 36], [150, 36, 48], [Infinity, 48, 72]]
    : [[25, 4, 8], [50, 8, 18], [100, 12, 24], [180, 18, 36], [Infinity, 48, 72]];
  const [, lo, hi] = bands.find(([upTo]) => mm <= upTo);
  return { lo, hi, overCap: hi > MAX_HOURS };
}

/** Read back somebody else's recipe: "a cup of salt per gallon" → a percentage. */
export function strengthOf({ saltGrams, waterGrams, meatGrams = 0 }) {
  if (!(saltGrams > 0) || !(waterGrams > 0)) return null;
  return {
    pctOfWater: saltGrams / waterGrams * 100,
    pctOfTotal: meatGrams > 0 ? saltGrams / (waterGrams + meatGrams) * 100 : null,
  };
}

/** Grams to the nearest spoon or cup of a named salt — alongside grams, never
 *  instead of them. */
// The same as inSpoons, as a number and a unit key (cup / tbsp / tsp) for pages in other languages.
export function spoonsOf(grams, saltKey = 'fine') {
  const s = SALTS[saltKey] || SALTS.fine;
  const cups = grams / s.gPerCup;
  if (cups >= 0.25) return { n: Math.round(cups * 8) / 8, unit: 'cup' };
  const tsp = grams / s.gPerTsp;
  if (tsp >= 3) return { n: Math.round(tsp / 3 * 4) / 4, unit: 'tbsp' };
  return { n: Math.round(tsp * 4) / 4, unit: 'tsp' };
}

export function inSpoons(grams, saltKey = 'fine') {
  const s = SALTS[saltKey] || SALTS.fine;
  const cups = grams / s.gPerCup;
  if (cups >= 0.25) return `${Math.round(cups * 8) / 8} cup${cups >= 1.9 ? 's' : ''}`;
  const tsp = grams / s.gPerTsp;
  if (tsp >= 3) return `${Math.round(tsp / 3 * 4) / 4} tbsp`;
  return `${Math.round(tsp * 4) / 4} tsp`;
}
