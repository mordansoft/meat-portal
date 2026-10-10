// Vectors for brine.mjs. Run: node assets/js/brine.test.mjs
import { wetBrine, dryBrine, timeByThickness, strengthOf, inSpoons,
         SALTS, LB, GAL, MAX_HOURS } from './brine.mjs';

let failed = 0, ran = 0;
const eq = (label, got, want) => {
  ran++;
  const ok = Object.is(got, want) || (typeof got === 'number' && Math.abs(got - want) < 1e-9);
  if (!ok) { failed++; console.log(`  FAIL  ${label}: got ${got}, want ${want}`); }
  else console.log(`  ok    ${label} = ${got}`);
};
const near = (label, got, want, tol = 0.05) => {
  ran++;
  if (Math.abs(got - want) > tol) { failed++; console.log(`  FAIL  ${label}: got ${got}, want ~${want}`); }
  else console.log(`  ok    ${label} ≈ ${Math.round(got * 100) / 100}`);
};

console.log('\nwet brine is a percentage of meat AND water');
{
  const r = wetBrine({ meatGrams: 2000, waterGrams: 2000, targetPct: 1.2, sugarShareOfSaltPct: 33 });
  eq('salt g', r.saltGrams, 48);
  near('sugar g', r.sugarGrams, 15.84);
  eq('% of water', r.pctOfWater, 2.4);
  eq('% of meat', r.pctOfMeat, 2.4);
}
{
  // Not 1:1: the three bases diverge, which is the whole point of saying which.
  const r = wetBrine({ meatGrams: 1000, waterGrams: 3000, targetPct: 1.5 });
  eq('salt g', r.saltGrams, 60);
  eq('% of water', r.pctOfWater, 2);
  eq('% of meat', r.pctOfMeat, 6);
}

console.log('\ndry brine is a percentage of the meat alone');
eq('5 kg turkey at 1.2%', dryBrine({ meatGrams: 5000, targetPct: 1.2 }).saltGrams, 60);
near('12 lb turkey at 1.2%', dryBrine({ meatGrams: 12 * LB, targetPct: 1.2 }).saltGrams, 65.32);

console.log('\ntime comes from thickness, and stops at the two-day ceiling');
eq('25 mm, wet, low', timeByThickness(25).lo, 4);
eq('60 mm, wet, high', timeByThickness(60).hi, 24);
eq('60 mm, wet, within cap', timeByThickness(60).overCap, false);
eq('200 mm, wet, over cap', timeByThickness(200).overCap, true);
eq('80 mm, dry, low', timeByThickness(80, { dry: true }).lo, 24);
eq('200 mm, dry, over cap', timeByThickness(200, { dry: true }).overCap, true);
eq('the ceiling itself', MAX_HOURS, 48);
eq('no thickness → null', timeByThickness(0), null);

console.log('\nreading back somebody else\'s recipe');
{
  // "A cup of salt per gallon" — the figure everyone quotes and nobody qualifies.
  const r = strengthOf({ saltGrams: SALTS.fine.gPerCup, waterGrams: GAL, meatGrams: 5000 });
  near('% of the water', r.pctOfWater, 7.71);
  near('% of meat and water together', r.pctOfTotal, 3.33);
}
eq('no water → null', strengthOf({ saltGrams: 50, waterGrams: 0 }), null);

console.log('\nspoons differ by salt, grams do not');
// Same 60 g: a quarter-cup-ish of fine salt is three and a bit tablespoons,
// while the same weight of Diamond Crystal fills well over a third of a cup.
eq('60 g of fine salt', inSpoons(60, 'fine'), '3.25 tbsp');
eq('60 g of Diamond Crystal', inSpoons(60, 'diamondK'), '0.375 cup');
eq('6 g of fine salt', inSpoons(6, 'fine'), '1 tsp');

console.log('\ngarbage in');
eq('no meat → null', wetBrine({ meatGrams: 0, waterGrams: 1000, targetPct: 1 }), null);
eq('no water → null', wetBrine({ meatGrams: 1000, waterGrams: 0, targetPct: 1 }), null);
eq('no meat, dry → null', dryBrine({ meatGrams: 0, targetPct: 1 }), null);

console.log('\n' + (failed === 0 ? `OK — ${ran} checks.` : `${failed} of ${ran} FAILED.`));
process.exit(failed === 0 ? 0 : 1);
