// Oprawa strony — nagłówek, stopka, zapisywanie obliczenia i strona „Moje peklowania”.
// Lustro i18n/shell/en.mjs. Tłumaczenie Ii, 20.10.2026. Na „ty”, jak kalkulatory w i18n/pl.mjs.
// Żaden tekst tutaj nie dotyczy bezpieczeństwa: ostrzeżenia o azotynie zostają w i18n/pl.mjs (arb.*).
export default {
  tag: 'kalkulatory',
  nav: { calculators: 'Kalkulatory', learn: 'Wiedza', cures: 'Moje peklowania', app: 'Aplikacja', menu: 'Menu' },
  foot: {
    calculators: 'Kalkulatory', learn: 'Wiedza', allQuestions: 'Wszystkie pytania', sources: 'Źródła',
    app: 'Aplikacja SaltCure', legal: 'Dokumenty', support: 'Pomoc', privacy: 'Prywatność', terms: 'Regulamin',
    note: 'Liczby do peklowania pochodzą z 9 CFR part 424, a postępowanie z mięsem i temperatury — z zaleceń USDA i FDA Food Code. Te przepisy powstały dla zakładów objętych inspekcją i nie regulują domowej kuchni — opieramy się na nich, bo w obliczeniu, przez które ktoś może zachorować, opublikowana liczba jest lepsza niż wpis na forum. Nic tutaj nie poświadcza tego, co przygotowujesz.',
  },
  app: {
    h: 'Peklujesz tygodniami?',
    p: 'SaltCure liczy to samo w telefonie i prowadzi dziennik: przypomina o przewracaniu, zapisuje ważenia, porównuje ubytek wagi z normą dla danego wyrobu. Za darmo, offline, bez konta.',
    cta: 'Pobierz aplikację',
  },
  crumbs: { home: 'Kalkulatory' },
  cures: {
    save: 'Zapisz w „Moich peklowaniach”',
    saved: 'Zapisano w „Moich peklowaniach”',
    open: 'Otwórz „Moje peklowania”',
    print: 'Drukuj',
    local: 'Zapisane tylko w tej przeglądarce. Bez konta.',
    cantSave: 'Zapisać można dopiero wtedy, gdy dawka mieści się w limicie.',
    title: 'Moje peklowania — zapisane obliczenia peklowania | SaltCure',
    desc: 'Obliczenia peklowania zapisane na tym urządzeniu: ile gramów odważyć, azotyn w ppm i data zapisu.',
    h1: 'Moje peklowania',
    lead: 'Zapisane obliczenia są tylko w tej przeglądarce. Wyczyścisz dane przeglądarki — i znikną; aplikacja SaltCure przechowuje je na stałe.',
    empty: 'Nic jeszcze nie zapisano. Policz peklowanie w kalkulatorze peklowania i naciśnij „Zapisz w «Moich peklowaniach»”.',
    emptyCta: 'Otwórz kalkulator peklowania',
    savedOn: 'Zapisano {date}',
    meat: 'Mięso', water: 'Woda', curing: 'Sól peklująca', salt: 'Sól', sugar: 'Cukier', nitrite: 'Azotyn',
    warned: 'Dla tej dawki kalkulator pokazał ostrzeżenie',
    remove: 'Usuń',
    removeAsk: 'Usunąć to obliczenie?',
    recalc: 'Otwórz kalkulator',
    stripTitle: 'Zapisane na tym urządzeniu',
    stripAll: 'Wszystkie zapisane',
  },
};
