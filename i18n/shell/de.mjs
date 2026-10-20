// Seitenrahmen — Kopfleiste, Fußzeile, Speichern einer Berechnung und die Seite „Meine Pökelungen“.
// Spiegelt i18n/shell/en.mjs. Übersetzung: Ija, 20.10.2026. Per Du, wie die Rechner in i18n/de.mjs.
// tag bleibt bewusst kleingeschrieben („/ rechner“) — Markenzusatz wie im Englischen, kein Fließtext.
// Nichts hier ist ein Sicherheitstext: die Nitrit-Warnungen bleiben in i18n/de.mjs (arb.*).
export default {
  tag: 'rechner',
  nav: { calculators: 'Rechner', learn: 'Wissen', cures: 'Meine Pökelungen', app: 'Die App', menu: 'Menü' },
  foot: {
    calculators: 'Rechner', learn: 'Wissen', allQuestions: 'Alle Fragen', sources: 'Quellen',
    app: 'SaltCure-App', legal: 'Rechtliches', support: 'Support', privacy: 'Datenschutz', terms: 'Nutzungsbedingungen',
    note: 'Die Pökelwerte stammen aus 9 CFR part 424, Umgang und Temperaturen aus den Hinweisen des USDA und dem FDA Food Code. Diese Regeln sind für überwachte Betriebe geschrieben und gelten nicht für die Küche zu Hause — wir stützen uns auf sie, weil bei einer Rechnung, die jemanden krank machen kann, eine veröffentlichte Zahl besser ist als ein Forumsbeitrag. Nichts hier bescheinigt etwas, was du herstellst.',
  },
  app: {
    h: 'Pökelst du über Wochen?',
    p: 'SaltCure rechnet dasselbe auf dem Handy und führt das Protokoll: Erinnerungen zum Wenden, Wiegen, Gewichtsverlust gegenüber dem Bereich für dieses Produkt. Kostenlos, offline, ohne Konto.',
    cta: 'App holen',
  },
  crumbs: { home: 'Rechner' },
  cures: {
    save: 'In „Meine Pökelungen“ speichern',
    saved: 'In „Meine Pökelungen“ gespeichert',
    open: '„Meine Pökelungen“ öffnen',
    print: 'Drucken',
    local: 'Nur in diesem Browser gespeichert. Ohne Konto.',
    cantSave: 'Speichern geht erst, wenn die Dosis innerhalb des Grenzwerts liegt.',
    title: 'Meine Pökelungen — gespeicherte Pökelberechnungen | SaltCure',
    desc: 'Die Pökelberechnungen, die auf diesem Gerät gespeichert sind: die Gramm zum Abwiegen, das Nitrit in ppm und das Speicherdatum.',
    h1: 'Meine Pökelungen',
    lead: 'Gespeicherte Berechnungen liegen nur in diesem Browser. Löschst du die Browserdaten, sind sie weg — die SaltCure-App behält sie dauerhaft.',
    empty: 'Noch nichts gespeichert. Rechne eine Pökelung im Pökelsalz-Rechner durch und tippe auf „In ‚Meine Pökelungen‘ speichern“.',
    emptyCta: 'Pökelsalz-Rechner öffnen',
    savedOn: 'Gespeichert am {date}',
    meat: 'Fleisch', water: 'Wasser', curing: 'Pökelsalz', salt: 'Salz', sugar: 'Zucker', nitrite: 'Nitrit',
    warned: 'Für diese Dosis hat der Rechner eine Warnung gezeigt',
    remove: 'Löschen',
    removeAsk: 'Diese Berechnung löschen?',
    recalc: 'Rechner öffnen',
    stripTitle: 'Auf diesem Gerät gespeichert',
    stripAll: 'Alle gespeicherten',
  },
};
