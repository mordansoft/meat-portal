// Úvodní stránka — čeština. Zrcadlo i18n/home/en.mjs. Překlad Iji, 20.10.2026. Tykání, jako kalkulačky.
// Blok „Kde obyčejná sůl končí“ se týká bezpečnosti: každou změnu kontroluje Povar.
export default {
  title: 'Kalkulačky SaltCure — lák, solení nasucho a solicí směs, s uvedenými zdroji',
  desc: 'Bezplatné kalkulačky pro domácí solení masa: lák, solení nasucho a solicí směs. Gramy místo odhadů, čas podle tloušťky kusu a každé bezpečnostní číslo s odkazem na USDA, FDA nebo 9 CFR.',
  eyebrow: 'Zdarma · bez účtu · každé bezpečnostní číslo má zdroj',
  h1: 'Spočítej sůl. Pak jdi vařit.',
  lead: 'Gramy pro tvůj kus masa, procento s vysvětlením, z čeho se počítá, a každé bezpečnostní číslo s předpisem, ze kterého pochází.',
  ask: 'Co připravuješ?',
  open: 'Otevřít kalkulačku',
  tiles: {
    brine: { eb: 'V láku', when: 'Tepelně upravíš do 2 dnů', p: 'Maso ve slané vodě. Krůta, kuře, vepřové, brisket, losos. Sůl, cukr a jak dlouho — podle tloušťky kusu.' },
    dry: { eb: 'Nasucho', when: 'Tepelně upravíš do 2 dnů', p: 'Bez vody, bez kbelíku, lepší kůrčička. Sůl jako podíl z hmotnosti samotného masa.' },
    curing: { eb: 'Dusitan', when: 'Studené uzení, sušení, déle než 2 dny', p: 'Cure #1 a #2, dusitan v ppm, limity pro každý výrobek z 9 CFR a pevná zarážka, když dávka limit překročí.' },
  },
  jobs: {
    h: 'Oblíbené úlohy',
    p: 'Každá otevře už nastavenou kalkulačku.',
    sub: { 'bacon-cure-calculator': 'Nasucho nebo v láku, Cure #1', 'pink-salt-calculator': 'Kolik na tvoje maso', 'dry-cure-calculator': 'Solicí směs, sůl a cukr podle hmotnosti', 'cure-1-per-kg': 'A na libru, v tabulce' },
  },
  split: {
    eb: 'Která kalkulačka',
    h: 'Kde obyčejná sůl končí',
    p: 'Jak moc slané — to je věc chuti. Jak chladno, jak dlouho a kdy obyčejná sůl přestává stačit — to ne: pro to existují zveřejněné zdroje a my je uvádíme.',
    plainEb: 'Stačí obyčejná sůl',
    plain: 'Maso osolíš a do dvou dnů ho tepelně upravíš, a celou tu dobu je v chladu.',
    cureEb: 'Potřebuješ solicí směs',
    cure: ['Studené uzení', 'Sušení celého kusu masa po celé týdny', 'Fermentovaný salám', 'Jakékoli solení delší než dva dny'],
    fine: 'Raději řekneme „pro tohle číslo nedáváme“, než abychom hádali. Studeně uzená ryba je přesně takový případ a na stránce, kde se objevuje, je to vyznačené.',
  },
  learn: { eb: 'Poradna', h: 'Solicí směs a dusitan — srozumitelně', all: 'Všechny otázky' },
  band: {
    eb: 'SaltCure pro Android a iPhone',
    h: 'Lák je hotový přes noc. Nakládání ne.',
    p: 'Stejné počty v telefonu a k tomu deník šarží, které trvají týdny: připomínky k obracení, vážení, úbytek hmotnosti proti normě pro daný výrobek.',
    meta: 'Zdarma · offline · bez účtu',
  },
};
