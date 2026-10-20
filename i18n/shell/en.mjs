// Site chrome — header, footer, the save-a-calculation feature and the "My cures" page.
// English master. i18n/shell/<lang>.mjs mirrors these keys exactly. A language without its own
// file gets the short header and footer (its own calculator names only) and no "My cures" —
// no English words on a page in another language.
// None of these strings is a safety line: the nitrite warnings stay in i18n/<lang>.mjs (arb.*).
export default {
  tag: 'calculators',
  nav: { calculators: 'Calculators', learn: 'Learn', cures: 'My cures', app: 'The app', menu: 'Menu' },
  foot: {
    calculators: 'Calculators', learn: 'Learn', allQuestions: 'All questions', sources: 'Sources',
    app: 'SaltCure app', legal: 'Legal', support: 'Support', privacy: 'Privacy', terms: 'Terms',
    note: 'The curing numbers come from 9 CFR part 424; handling and temperature from USDA guidance and the FDA Food Code. Those rules are written for inspected plants and do not govern a home kitchen — we use them because in a calculation that can make somebody ill, a published number beats a forum post. Nothing here certifies anything you make.',
  },
  app: {
    h: 'Curing for weeks?',
    p: 'SaltCure runs the same arithmetic on your phone and keeps the log: reminders to turn it, weigh-ins, weight loss against the band for that product. Free, offline, no account.',
    cta: 'Get the app',
  },
  crumbs: { home: 'Calculators' },
  cures: {
    save: 'Save to My cures',
    saved: 'Saved to My cures',
    open: 'Open My cures',
    print: 'Print',
    local: 'Saved in this browser only. No account.',
    cantSave: 'Nothing to save until the dose is within the limit.',
    title: 'My cures — Saved Curing Calculations | SaltCure',
    desc: 'The curing calculations you saved on this device: the grams to weigh, the nitrite in ppm, and the date you saved them.',
    h1: 'My cures',
    lead: 'The calculations you saved, kept in this browser only. Clear the browser data and they are gone — the SaltCure app keeps them for good.',
    empty: 'Nothing saved yet. Work out a cure in the curing calculator and press “Save to My cures”.',
    emptyCta: 'Open the curing calculator',
    savedOn: 'Saved {date}',
    meat: 'Meat', water: 'Water', curing: 'Curing salt', salt: 'Salt', sugar: 'Sugar', nitrite: 'Nitrite',
    warned: 'The calculator showed a warning for this dose',
    remove: 'Delete',
    removeAsk: 'Delete this calculation?',
    recalc: 'Open the calculator',
    stripTitle: 'Saved on this device',
    stripAll: 'All saved',
  },
};
