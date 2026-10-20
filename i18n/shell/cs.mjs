// Rámec webu — záhlaví, patička, uložení výpočtu a stránka „Moje nakládání“.
// Zrcadlo i18n/shell/en.mjs. Překlad Iji, 20.10.2026. Tykání, jako kalkulačky v i18n/cs.mjs.
// Název sekce se neskloňuje, proto „do sekce „Moje nakládání““ místo tvaru v 2. pádě.
// Nic tady se netýká bezpečnosti: varování o dusitanu zůstávají v i18n/cs.mjs (arb.*).
export default {
  tag: 'kalkulačky',
  nav: { calculators: 'Kalkulačky', learn: 'Poradna', cures: 'Moje nakládání', app: 'Aplikace', menu: 'Menu' },
  foot: {
    calculators: 'Kalkulačky', learn: 'Poradna', allQuestions: 'Všechny otázky', sources: 'Zdroje',
    app: 'Aplikace SaltCure', legal: 'Dokumenty', support: 'Podpora', privacy: 'Soukromí', terms: 'Podmínky',
    note: 'Čísla pro nakládání pocházejí z 9 CFR part 424, zacházení s masem a teploty z doporučení USDA a z FDA Food Code. Tyto předpisy jsou psané pro provozy pod inspekcí a domácí kuchyni neupravují — opíráme se o ně, protože ve výpočtu, kvůli kterému může někdo onemocnět, je zveřejněné číslo lepší než příspěvek na fóru. Nic tady neosvědčuje to, co připravuješ.',
  },
  app: {
    h: 'Nakládáš na týdny?',
    p: 'SaltCure počítá totéž v telefonu a vede deník: připomene obracení, zapíše vážení, porovná úbytek hmotnosti s normou pro daný výrobek. Zdarma, offline, bez účtu.',
    cta: 'Stáhnout aplikaci',
  },
  crumbs: { home: 'Kalkulačky' },
  cures: {
    save: 'Uložit do sekce „Moje nakládání“',
    saved: 'Uloženo do sekce „Moje nakládání“',
    open: 'Otevřít „Moje nakládání“',
    print: 'Tisk',
    local: 'Uloženo jen v tomto prohlížeči. Bez účtu.',
    cantSave: 'Uložit lze, až když je dávka v limitu.',
    title: 'Moje nakládání — uložené výpočty nakládání | SaltCure',
    desc: 'Výpočty nakládání uložené v tomto zařízení: kolik gramů navážit, dusitan v ppm a datum uložení.',
    h1: 'Moje nakládání',
    lead: 'Uložené výpočty jsou jen v tomto prohlížeči. Smažeš data prohlížeče — a jsou pryč; aplikace SaltCure je uchová natrvalo.',
    empty: 'Zatím tu nic není. Spočítej nakládání v kalkulačce solicí směsi a stiskni „Uložit do sekce ‚Moje nakládání‘“.',
    emptyCta: 'Otevřít kalkulačku solicí směsi',
    savedOn: 'Uloženo {date}',
    meat: 'Maso', water: 'Voda', curing: 'Solicí směs', salt: 'Sůl', sugar: 'Cukr', nitrite: 'Dusitan',
    warned: 'U této dávky kalkulačka zobrazila varování',
    remove: 'Smazat',
    removeAsk: 'Smazat tento výpočet?',
    recalc: 'Otevřít kalkulačku',
    stripTitle: 'Uloženo v tomto zařízení',
    stripAll: 'Vše uložené',
  },
};
