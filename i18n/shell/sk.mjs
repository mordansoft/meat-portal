// Rámec webu — hlavička, päta, uloženie výpočtu a stránka „Moje nakladanie“.
// Zrkadlo i18n/shell/en.mjs. Preklad Iji, 20.10.2026. Tykanie, ako kalkulačky v i18n/sk.mjs.
// Názov sekcie sa neskloňuje, preto „do sekcie „Moje nakladanie““.
// Nič tu sa netýka bezpečnosti: varovania o dusitane zostávajú v i18n/sk.mjs (arb.*).
export default {
  tag: 'kalkulačky',
  nav: { calculators: 'Kalkulačky', learn: 'Poradňa', cures: 'Moje nakladanie', app: 'Aplikácia', menu: 'Menu' },
  foot: {
    calculators: 'Kalkulačky', learn: 'Poradňa', allQuestions: 'Všetky otázky', sources: 'Zdroje',
    app: 'Aplikácia SaltCure', legal: 'Dokumenty', support: 'Podpora', privacy: 'Súkromie', terms: 'Podmienky',
    note: 'Čísla na nakladanie pochádzajú z 9 CFR part 424, zaobchádzanie s mäsom a teploty z odporúčaní USDA a z FDA Food Code. Tieto predpisy sú písané pre prevádzky pod inšpekciou a domácu kuchyňu neupravujú — opierame sa o ne, pretože vo výpočte, kvôli ktorému môže niekto ochorieť, je zverejnené číslo lepšie ako príspevok na fóre. Nič tu neosvedčuje to, čo pripravuješ.',
  },
  app: {
    h: 'Nakladáš na týždne?',
    p: 'SaltCure počíta to isté v telefóne a vedie denník: pripomenie obracanie, zapíše váženia, porovná úbytok hmotnosti s normou pre daný výrobok. Zadarmo, offline, bez účtu.',
    cta: 'Stiahnuť aplikáciu',
  },
  crumbs: { home: 'Kalkulačky' },
  cures: {
    save: 'Uložiť do sekcie „Moje nakladanie“',
    saved: 'Uložené v sekcii „Moje nakladanie“',
    open: 'Otvoriť „Moje nakladanie“',
    print: 'Tlačiť',
    local: 'Uložené len v tomto prehliadači. Bez účtu.',
    cantSave: 'Uložiť sa dá, až keď je dávka v limite.',
    title: 'Moje nakladanie — uložené výpočty nakladania | SaltCure',
    desc: 'Výpočty nakladania uložené v tomto zariadení: koľko gramov navážiť, dusitan v ppm a dátum uloženia.',
    h1: 'Moje nakladanie',
    lead: 'Uložené výpočty sú len v tomto prehliadači. Vymažeš údaje prehliadača — a sú preč; aplikácia SaltCure ich uchová natrvalo.',
    empty: 'Zatiaľ tu nič nie je. Vypočítaj nakladanie v kalkulačke soliacej zmesi a stlač „Uložiť do sekcie ‚Moje nakladanie‘“.',
    emptyCta: 'Otvoriť kalkulačku soliacej zmesi',
    savedOn: 'Uložené {date}',
    meat: 'Mäso', water: 'Voda', curing: 'Soliaca zmes', salt: 'Soľ', sugar: 'Cukor', nitrite: 'Dusitan',
    warned: 'Pri tejto dávke kalkulačka zobrazila varovanie',
    remove: 'Vymazať',
    removeAsk: 'Vymazať tento výpočet?',
    recalc: 'Otvoriť kalkulačku',
    stripTitle: 'Uložené v tomto zariadení',
    stripAll: 'Všetky uložené',
  },
};
