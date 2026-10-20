// Home page — English master. i18n/home/<lang>.mjs mirrors the keys; a language without the file
// has no home page of its own and its logo links to the English one.
// Calculator names come from i18n/<lang>.mjs (site.nav, pages.*.link) — not repeated here.
// "Where plain salt stops" is a safety block: same wording as before the redesign, Povar checks any change.
export default {
  title: 'SaltCure Calculators — Brine, Dry Brine and Curing Salt, with the Sources Named',
  desc: 'Free calculators for salting meat at home: brine, dry brine and curing salt. Grams instead of guesses, timing from thickness, and every safety figure cited to USDA, FDA or 9 CFR.',
  eyebrow: 'Free · no account · every safety figure sourced',
  h1: 'Work out the salt. Then go and cook.',
  lead: 'Grams for your piece of meat, the percentage stated against what it is measured on, and every safety number tied to the rule it came from.',
  ask: 'What are you making?',
  open: 'Open calculator',
  tiles: {
    brine: { eb: 'Wet', when: 'Cooked within 2 days', p: 'Meat in salted water. Turkey, chicken, pork, brisket, salmon. Salt, sugar and how long, from the thickness of the piece.' },
    dry: { eb: 'Dry', when: 'Cooked within 2 days', p: 'No water, no bucket, better skin. Salt as a share of the meat’s own weight.' },
    curing: { eb: 'Nitrite', when: 'Cold smoking, drying, over 2 days', p: 'Cure #1 and #2, nitrite in ppm, limits per cut from 9 CFR, and a hard stop when a dose goes over.' },
  },
  jobs: {
    h: 'Popular jobs',
    p: 'Each one opens the calculator already set up.',
    sub: { 'bacon-cure-calculator': 'Dry cure or brine, Cure #1', 'pink-salt-calculator': 'How much for your meat', 'dry-cure-calculator': 'Cure, salt and sugar by weight', 'cure-1-per-kg': 'And per pound, as a table' },
  },
  split: {
    eb: 'Which calculator',
    h: 'Where plain salt stops',
    p: 'How salty is a matter of taste. How cold, how long, and when plain salt stops being enough is not — those have published sources, and we name them.',
    plainEb: 'Plain salt is enough',
    plain: 'You salt the meat and cook it within two days, and it stays cold throughout.',
    cureEb: 'You need curing salt',
    cure: ['Cold smoking', 'Air-drying a whole muscle for weeks', 'Fermenting a sausage', 'Any cure longer than two days'],
    fine: 'We would rather say “we do not give a number for this” than guess. Cold-smoked fish is one such case, and it is marked as one on the page where it comes up.',
  },
  learn: { eb: 'Learn', h: 'Curing salt and nitrite, plainly', all: 'All questions' },
  band: {
    eb: 'SaltCure for Android and iPhone',
    h: 'A brine finishes overnight. A cure does not.',
    p: 'The same arithmetic on your phone, plus the log for batches that take weeks: reminders to turn it, weigh-ins, weight loss against the band for that product.',
    meta: 'Free · offline · no account',
  },
};
