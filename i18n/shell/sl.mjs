// Okvir strani — glava, noga, shranjevanje izračuna in stran „Moja soljenja“.
// Zrcalo i18n/shell/en.mjs. Prevod: Ija, 20.10.2026. Na „ti“, kot kalkulatorji v i18n/sl.mjs.
// Nič tukaj ni varnostno besedilo: opozorila o nitritu ostanejo v i18n/sl.mjs (arb.*).
export default {
  tag: 'kalkulatorji',
  nav: { calculators: 'Kalkulatorji', learn: 'Znanje', cures: 'Moja soljenja', app: 'Aplikacija', menu: 'Meni' },
  foot: {
    calculators: 'Kalkulatorji', learn: 'Znanje', allQuestions: 'Vsa vprašanja', sources: 'Viri',
    app: 'Aplikacija SaltCure', legal: 'Dokumenti', support: 'Podpora', privacy: 'Zasebnost', terms: 'Pogoji',
    note: 'Številke za soljenje z nitritom so iz 9 CFR part 424, ravnanje z mesom in temperature pa iz smernic USDA in FDA Food Code. Ta pravila so pisana za obrate pod inšpekcijo in ne urejajo domače kuhinje — nanje se opiramo, ker je v izračunu, zaradi katerega lahko kdo zboli, objavljena številka boljša od objave na forumu. Nič tukaj ne potrjuje tega, kar pripraviš.',
  },
  app: {
    h: 'Soljenje za več tednov?',
    p: 'SaltCure izračuna isto na telefonu in vodi dnevnik: opomni na obračanje, beleži tehtanja, primerja izgubo teže z normo za izdelek. Brezplačno, brez povezave, brez računa.',
    cta: 'Prenesi aplikacijo',
  },
  crumbs: { home: 'Kalkulatorji' },
  cures: {
    save: 'Shrani v „Moja soljenja“',
    saved: 'Shranjeno v „Moja soljenja“',
    open: 'Odpri „Moja soljenja“',
    print: 'Natisni',
    local: 'Shranjeno samo v tem brskalniku. Brez računa.',
    cantSave: 'Shraniti lahko šele, ko je odmerek znotraj meje.',
    title: 'Moja soljenja — shranjeni izračuni soljenja | SaltCure',
    desc: 'Izračuni soljenja, shranjeni v tej napravi: koliko gramov odtehtati, nitrit v ppm in datum shranjevanja.',
    h1: 'Moja soljenja',
    lead: 'Shranjeni izračuni so samo v tem brskalniku. Ko izbrišeš podatke brskalnika, jih ni več; aplikacija SaltCure jih hrani trajno.',
    empty: 'Nič še ni shranjeno. Izračunaj soljenje v kalkulatorju nitritne soli in pritisni „Shrani v ‚Moja soljenja‘“.',
    emptyCta: 'Odpri kalkulator nitritne soli',
    savedOn: 'Shranjeno {date}',
    meat: 'Meso', water: 'Voda', curing: 'Nitritna sol', salt: 'Sol', sugar: 'Sladkor', nitrite: 'Nitrit',
    warned: 'Za ta odmerek je kalkulator prikazal opozorilo',
    remove: 'Izbriši',
    removeAsk: 'Izbrišem ta izračun?',
    recalc: 'Odpri kalkulator',
    stripTitle: 'Shranjeno v tej napravi',
    stripAll: 'Vse shranjeno',
  },
};
