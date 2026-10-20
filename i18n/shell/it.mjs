// Cornice del sito — intestazione, piè di pagina, salvataggio di un calcolo e la pagina «Le mie salagioni».
// Rispecchia i18n/shell/en.mjs. Traduzione: Iya, 20.10.2026. Con il tu, come i calcolatori in i18n/it.mjs.
// Niente qui è un testo di sicurezza: gli avvisi sul nitrito restano in i18n/it.mjs (arb.*).
export default {
  tag: 'calcolatori',
  nav: { calculators: 'Calcolatori', learn: 'Guide', cures: 'Le mie salagioni', app: 'L’app', menu: 'Menu' },
  foot: {
    calculators: 'Calcolatori', learn: 'Guide', allQuestions: 'Tutte le domande', sources: 'Fonti',
    app: 'App SaltCure', legal: 'Note legali', support: 'Assistenza', privacy: 'Privacy', terms: 'Termini',
    note: 'I numeri della salagione vengono da 9 CFR part 424; manipolazione e temperature dalle indicazioni USDA e dal FDA Food Code. Quelle norme sono scritte per stabilimenti ispezionati e non regolano la cucina di casa: le usiamo perché, in un calcolo che può far star male qualcuno, un numero pubblicato vale più di un post su un forum. Niente di quanto c’è qui certifica ciò che prepari.',
  },
  app: {
    h: 'Una salagione di settimane?',
    p: 'SaltCure fa gli stessi conti sul telefono e tiene il registro: promemoria per girarla, pesate, calo peso rispetto all’intervallo di quel prodotto. Gratis, offline, senza account.',
    cta: 'Scarica l’app',
  },
  crumbs: { home: 'Calcolatori' },
  cures: {
    save: 'Salva in «Le mie salagioni»',
    saved: 'Salvato in «Le mie salagioni»',
    open: 'Apri «Le mie salagioni»',
    print: 'Stampa',
    local: 'Salvato solo in questo browser. Senza account.',
    cantSave: 'Puoi salvare solo quando la dose è entro il limite.',
    title: 'Le mie salagioni — calcoli di salagione salvati | SaltCure',
    desc: 'I calcoli di salagione salvati su questo dispositivo: i grammi da pesare, il nitrito in ppm e la data del salvataggio.',
    h1: 'Le mie salagioni',
    lead: 'I calcoli salvati restano solo in questo browser. Se cancelli i dati del browser spariscono; l’app SaltCure li conserva per sempre.',
    empty: 'Non c’è ancora niente di salvato. Calcola una salagione nel calcolatore del sale nitritato e premi «Salva in “Le mie salagioni”».',
    emptyCta: 'Apri il calcolatore del sale nitritato',
    savedOn: 'Salvato il {date}',
    meat: 'Carne', water: 'Acqua', curing: 'Sale nitritato', salt: 'Sale', sugar: 'Zucchero', nitrite: 'Nitrito',
    warned: 'Per questa dose il calcolatore ha mostrato un avviso',
    remove: 'Elimina',
    removeAsk: 'Eliminare questo calcolo?',
    recalc: 'Apri il calcolatore',
    stripTitle: 'Salvato su questo dispositivo',
    stripAll: 'Tutti i salvati',
  },
};
