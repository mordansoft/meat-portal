// Početna — hrvatski. Zrcalo i18n/home/en.mjs. Prijevod: Ija, 20.10.2026. Na „ti”, kao kalkulatori.
// Blok „Gdje obična sol prestaje” odnosi se na sigurnost: svaku izmjenu provjerava Povar.
export default {
  title: 'SaltCure kalkulatori — salamura, suha salamura i nitritna sol, s navedenim izvorima',
  desc: 'Besplatni kalkulatori za soljenje mesa kod kuće: salamura, suha salamura i nitritna sol. Grami umjesto nagađanja, vrijeme prema debljini komada i svaka sigurnosna brojka s izvorom u USDA, FDA ili 9 CFR.',
  eyebrow: 'Besplatno · bez računa · svaka sigurnosna brojka ima izvor',
  h1: 'Izračunaj sol. Onda kuhaj.',
  lead: 'Grami za tvoj komad mesa, postotak s naznakom na što se računa i svaka sigurnosna brojka s pravilom iz kojeg potječe.',
  ask: 'Što pripremaš?',
  open: 'Otvori kalkulator',
  tiles: {
    brine: { eb: 'Mokro', when: 'Kuhaš u roku od 2 dana', p: 'Meso u slanoj vodi. Puretina, piletina, svinjetina, brisket, losos. Sol, šećer i koliko dugo — prema debljini komada.' },
    dry: { eb: 'Suho', when: 'Kuhaš u roku od 2 dana', p: 'Bez vode, bez kante, bolja koža. Sol kao udio težine samog mesa.' },
    curing: { eb: 'Nitrit', when: 'Hladno dimljenje, sušenje, dulje od 2 dana', p: 'Cure #1 i #2, nitrit u ppm, limiti za svaki proizvod iz 9 CFR i čvrsto zaustavljanje kad doza prijeđe limit.' },
  },
  jobs: {
    h: 'Popularni zadaci',
    p: 'Svaki otvara već podešen kalkulator.',
    sub: { 'bacon-cure-calculator': 'Suho soljenje ili salamura, Cure #1', 'pink-salt-calculator': 'Koliko za tvoje meso', 'dry-cure-calculator': 'Nitritna sol, sol i šećer po težini', 'cure-1-per-kg': 'I po funti, u tablici' },
  },
  split: {
    eb: 'Koji kalkulator',
    h: 'Gdje obična sol prestaje',
    p: 'Koliko slano — stvar je ukusa. Koliko hladno, koliko dugo i kad obična sol više nije dovoljna — nije: za to postoje objavljeni izvori i mi ih navodimo.',
    plainEb: 'Obična sol je dovoljna',
    plain: 'Posoliš meso i skuhaš ga u roku od dva dana, a cijelo to vrijeme ono je na hladnom.',
    cureEb: 'Treba ti nitritna sol',
    cure: ['Hladno dimljenje', 'Sušenje cijelog komada mesa tjednima', 'Fermentirana kobasica', 'Svako soljenje dulje od dva dana'],
    fine: 'Radije ćemo reći „za ovo ne dajemo brojku” nego nagađati. Hladno dimljena riba upravo je takav slučaj i na stranici na kojoj se spominje to je označeno.',
  },
  learn: { eb: 'Znanje', h: 'Nitritna sol i nitrit — jednostavno', all: 'Sva pitanja' },
  band: {
    eb: 'SaltCure za Android i iPhone',
    h: 'Salamura je gotova preko noći. Soljenje mesa nije.',
    p: 'Isti izračuni na mobitelu i k tome dnevnik serija koje traju tjednima: podsjetnici za okretanje, vaganja, gubitak težine prema normi za taj proizvod.',
    meta: 'Besplatno · offline · bez računa',
  },
};
