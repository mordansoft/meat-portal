// Domača stran — slovenščina. Zrcalo i18n/home/en.mjs. Prevod: Ija, 20.10.2026. Na „ti“, kot kalkulatorji.
// Blok „Kje navadna sol ne zadošča več“ zadeva varnost: vsako spremembo preveri Povar.
export default {
  title: 'Kalkulatorji SaltCure — razsol, suhi razsol in nitritna sol, z navedenimi viri',
  desc: 'Brezplačni kalkulatorji za domače soljenje mesa: razsol, suhi razsol in nitritna sol. Grami namesto ugibanja, čas glede na debelino kosa in vsaka varnostna številka z virom pri USDA, FDA ali 9 CFR.',
  eyebrow: 'Brezplačno · brez računa · vsaka varnostna številka ima vir',
  h1: 'Izračunaj sol. Potem kuhaj.',
  lead: 'Grami za tvoj kos mesa, odstotek z navedbo, od česa se računa, in vsaka varnostna številka s pravilom, iz katerega izhaja.',
  ask: 'Kaj pripravljaš?',
  open: 'Odpri kalkulator',
  tiles: {
    brine: { eb: 'Mokro', when: 'Skuhaš v 2 dneh', p: 'Meso v slani vodi. Puran, piščanec, svinjina, brisket, losos. Sol, sladkor in koliko časa — glede na debelino kosa.' },
    dry: { eb: 'Suho', when: 'Skuhaš v 2 dneh', p: 'Brez vode, brez vedra, boljša koža. Sol kot delež teže samega mesa.' },
    curing: { eb: 'Nitrit', when: 'Hladno dimljenje, sušenje, več kot 2 dni', p: 'Cure #1 in #2, nitrit v ppm, meje za vsak izdelek iz 9 CFR in trda zaustavitev, ko odmerek preseže mejo.' },
  },
  jobs: {
    h: 'Priljubljena opravila',
    p: 'Vsako odpre že nastavljen kalkulator.',
    sub: { 'bacon-cure-calculator': 'Suho soljenje ali razsol, Cure #1', 'pink-salt-calculator': 'Koliko za tvoje meso', 'dry-cure-calculator': 'Nitritna sol, sol in sladkor po teži', 'cure-1-per-kg': 'In na funt, v tabeli' },
  },
  split: {
    eb: 'Kateri kalkulator',
    h: 'Kje navadna sol ne zadošča več',
    p: 'Kako slano — to je stvar okusa. Kako hladno, kako dolgo in kdaj navadna sol ni več dovolj — ni: za to obstajajo objavljeni viri in mi jih navajamo.',
    plainEb: 'Navadna sol je dovolj',
    plain: 'Meso nasoliš in ga skuhaš v dveh dneh, ves ta čas pa je na hladnem.',
    cureEb: 'Potrebuješ nitritno sol',
    cure: ['Hladno dimljenje', 'Sušenje celega kosa mesa več tednov', 'Fermentirana klobasa', 'Vsako soljenje, daljše od dveh dni'],
    fine: 'Raje rečemo „za to ne dajemo številke“, kot da bi ugibali. Hladno dimljena riba je prav tak primer in na strani, kjer je govor o njej, je to označeno.',
  },
  learn: { eb: 'Znanje', h: 'Nitritna sol in nitrit — preprosto', all: 'Vsa vprašanja' },
  band: {
    eb: 'SaltCure za Android in iPhone',
    h: 'Razsol je gotov čez noč. Soljenje mesa ni.',
    p: 'Isti izračuni na telefonu in še dnevnik serij, ki trajajo tedne: opomniki za obračanje, tehtanja, izguba teže glede na normo za izdelek.',
    meta: 'Brezplačno · brez povezave · brez računa',
  },
};
