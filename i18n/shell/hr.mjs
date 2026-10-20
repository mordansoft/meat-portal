// Okvir stranice — zaglavlje, podnožje, spremanje izračuna i stranica „Moja soljenja”.
// Zrcalo i18n/shell/en.mjs. Prijevod: Ija, 20.10.2026. Na „ti”, kao kalkulatori u i18n/hr.mjs.
// Ništa ovdje nije sigurnosni tekst: upozorenja o nitritu ostaju u i18n/hr.mjs (arb.*).
export default {
  tag: 'kalkulatori',
  nav: { calculators: 'Kalkulatori', learn: 'Znanje', cures: 'Moja soljenja', app: 'Aplikacija', menu: 'Izbornik' },
  foot: {
    calculators: 'Kalkulatori', learn: 'Znanje', allQuestions: 'Sva pitanja', sources: 'Izvori',
    app: 'Aplikacija SaltCure', legal: 'Dokumenti', support: 'Podrška', privacy: 'Privatnost', terms: 'Uvjeti',
    note: 'Brojke za soljenje mesa s nitritom potječu iz 9 CFR part 424, a postupanje s mesom i temperature iz smjernica USDA i iz FDA Food Code. Ta su pravila pisana za pogone pod inspekcijom i ne uređuju kućnu kuhinju — oslanjamo se na njih jer je u izračunu zbog kojeg se netko može razboljeti objavljena brojka bolja od objave na forumu. Ništa ovdje ne potvrđuje ono što pripremaš.',
  },
  app: {
    h: 'Soljenje na tjedne?',
    p: 'SaltCure računa isto na mobitelu i vodi dnevnik: podsjeća na okretanje, bilježi vaganja, uspoređuje gubitak težine s normom za taj proizvod. Besplatno, offline, bez računa.',
    cta: 'Preuzmi aplikaciju',
  },
  crumbs: { home: 'Kalkulatori' },
  cures: {
    save: 'Spremi u „Moja soljenja”',
    saved: 'Spremljeno u „Moja soljenja”',
    open: 'Otvori „Moja soljenja”',
    print: 'Ispiši',
    local: 'Sprema se samo u ovom pregledniku. Bez računa.',
    cantSave: 'Spremiti možeš tek kad je doza unutar limita.',
    title: 'Moja soljenja — spremljeni izračuni soljenja | SaltCure',
    desc: 'Izračuni soljenja spremljeni na ovom uređaju: koliko grama izvagati, nitrit u ppm i datum spremanja.',
    h1: 'Moja soljenja',
    lead: 'Spremljeni izračuni su samo u ovom pregledniku. Obrišeš li podatke preglednika, nestaju; aplikacija SaltCure čuva ih trajno.',
    empty: 'Još ništa nije spremljeno. Izračunaj soljenje u kalkulatoru nitritne soli i pritisni „Spremi u ‚Moja soljenja’”.',
    emptyCta: 'Otvori kalkulator nitritne soli',
    savedOn: 'Spremljeno {date}',
    meat: 'Meso', water: 'Voda', curing: 'Nitritna sol', salt: 'Sol', sugar: 'Šećer', nitrite: 'Nitrit',
    warned: 'Za ovu dozu kalkulator je prikazao upozorenje',
    remove: 'Izbriši',
    removeAsk: 'Izbrisati ovaj izračun?',
    recalc: 'Otvori kalkulator',
    stripTitle: 'Spremljeno na ovom uređaju',
    stripAll: 'Sve spremljeno',
  },
};
