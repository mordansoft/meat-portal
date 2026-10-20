// Úvodná stránka — slovenčina. Zrkadlo i18n/home/en.mjs. Preklad Iji, 20.10.2026. Tykanie, ako kalkulačky.
// Blok „Kde obyčajná soľ končí“ sa týka bezpečnosti: každú zmenu kontroluje Povar.
export default {
  title: 'Kalkulačky SaltCure — lák, solenie nasucho a soliaca zmes, s uvedenými zdrojmi',
  desc: 'Bezplatné kalkulačky na domáce solenie mäsa: lák, solenie nasucho a soliaca zmes. Gramy namiesto odhadov, čas podľa hrúbky kusa a každé bezpečnostné číslo s odkazom na USDA, FDA alebo 9 CFR.',
  eyebrow: 'Zadarmo · bez účtu · každé bezpečnostné číslo má zdroj',
  h1: 'Vypočítaj soľ. Potom choď variť.',
  lead: 'Gramy pre tvoj kus mäsa, percento s vysvetlením, z čoho sa počíta, a každé bezpečnostné číslo s predpisom, z ktorého pochádza.',
  ask: 'Čo pripravuješ?',
  open: 'Otvoriť kalkulačku',
  tiles: {
    brine: { eb: 'V láku', when: 'Tepelne upravíš do 2 dní', p: 'Mäso v slanej vode. Morka, kurča, bravčové, brisket, losos. Soľ, cukor a ako dlho — podľa hrúbky kusa.' },
    dry: { eb: 'Nasucho', when: 'Tepelne upravíš do 2 dní', p: 'Bez vody, bez vedra, lepšia koža. Soľ ako podiel z hmotnosti samotného mäsa.' },
    curing: { eb: 'Dusitan', when: 'Studené údenie, sušenie, dlhšie ako 2 dni', p: 'Cure #1 a #2, dusitan v ppm, limity pre každý výrobok z 9 CFR a pevná zarážka, keď dávka prekročí limit.' },
  },
  jobs: {
    h: 'Obľúbené úlohy',
    p: 'Každá otvorí už nastavenú kalkulačku.',
    sub: { 'bacon-cure-calculator': 'Nasucho alebo v láku, Cure #1', 'pink-salt-calculator': 'Koľko na tvoje mäso', 'dry-cure-calculator': 'Soliaca zmes, soľ a cukor podľa hmotnosti', 'cure-1-per-kg': 'A na libru, v tabuľke' },
  },
  split: {
    eb: 'Ktorá kalkulačka',
    h: 'Kde obyčajná soľ končí',
    p: 'Aké slané — to je vec chuti. Ako chladno, ako dlho a kedy obyčajná soľ prestáva stačiť — to nie: na to existujú zverejnené zdroje a my ich uvádzame.',
    plainEb: 'Stačí obyčajná soľ',
    plain: 'Mäso osolíš a do dvoch dní ho tepelne upravíš, a celý ten čas je v chlade.',
    cureEb: 'Potrebuješ soliacu zmes',
    cure: ['Studené údenie', 'Sušenie celého kusa mäsa celé týždne', 'Fermentovaná saláma', 'Akékoľvek solenie dlhšie ako dva dni'],
    fine: 'Radšej povieme „na toto číslo nedávame“, než aby sme hádali. Studeno údená ryba je presne taký prípad a na stránke, kde sa objavuje, je to vyznačené.',
  },
  learn: { eb: 'Poradňa', h: 'Soliaca zmes a dusitan — zrozumiteľne', all: 'Všetky otázky' },
  band: {
    eb: 'SaltCure pre Android a iPhone',
    h: 'Lák je hotový cez noc. Nakladanie nie.',
    p: 'Rovnaké výpočty v telefóne a k tomu denník šarží, ktoré trvajú týždne: pripomienky na obracanie, váženia, úbytok hmotnosti oproti norme pre daný výrobok.',
    meta: 'Zadarmo · offline · bez účtu',
  },
};
