// Startseite — Deutsch. Spiegelt i18n/home/en.mjs. Übersetzung: Ija, 20.10.2026. Per Du.
// Der Block „Wo normales Salz nicht mehr reicht“ betrifft die Sicherheit: jede Änderung prüft Povar.
export default {
  title: 'SaltCure-Rechner — Lake, Trockenlake und Pökelsalz, mit genannten Quellen',
  desc: 'Kostenlose Rechner zum Salzen von Fleisch zu Hause: Lake, Trockenlake und Pökelsalz. Gramm statt Schätzung, Zeiten nach Dicke und jede Sicherheitszahl mit Beleg bei USDA, FDA oder 9 CFR.',
  eyebrow: 'Kostenlos · ohne Konto · jede Sicherheitszahl mit Quelle',
  h1: 'Salz ausrechnen. Dann ab in die Küche.',
  lead: 'Gramm für dein Stück Fleisch, der Prozentsatz mit der Angabe, worauf er sich bezieht, und jede Sicherheitszahl mit der Regel, aus der sie stammt.',
  ask: 'Was machst du?',
  open: 'Rechner öffnen',
  tiles: {
    brine: { eb: 'Nass', when: 'Innerhalb von 2 Tagen gegart', p: 'Fleisch in Salzwasser. Pute, Hähnchen, Schwein, Brisket, Lachs. Salz, Zucker und wie lange — nach der Dicke des Stücks.' },
    dry: { eb: 'Trocken', when: 'Innerhalb von 2 Tagen gegart', p: 'Kein Wasser, kein Eimer, bessere Haut. Salz als Anteil am Gewicht des Fleischs selbst.' },
    curing: { eb: 'Nitrit', when: 'Kalträuchern, Trocknen, über 2 Tage', p: 'Cure #1 und #2, Nitrit in ppm, Grenzwerte je Produkt aus 9 CFR und ein harter Stopp, sobald eine Dosis darüber liegt.' },
  },
  jobs: {
    h: 'Häufige Aufgaben',
    p: 'Jede öffnet den Rechner schon passend eingestellt.',
    sub: { 'bacon-cure-calculator': 'Trocken oder in Lake, Cure #1', 'pink-salt-calculator': 'Wie viel für dein Fleisch', 'dry-cure-calculator': 'Pökelsalz, Salz und Zucker nach Gewicht', 'cure-1-per-kg': 'Und pro lb, als Tabelle' },
  },
  split: {
    eb: 'Welcher Rechner',
    h: 'Wo normales Salz nicht mehr reicht',
    p: 'Wie salzig, ist Geschmackssache. Wie kalt, wie lange und ab wann normales Salz nicht mehr reicht, dagegen nicht — dafür gibt es veröffentlichte Quellen, und wir nennen sie.',
    plainEb: 'Normales Salz reicht',
    plain: 'Du salzt das Fleisch und garst es innerhalb von zwei Tagen, und die ganze Zeit bleibt es kalt.',
    cureEb: 'Du brauchst Pökelsalz',
    cure: ['Kalträuchern', 'Ein ganzes Stück wochenlang an der Luft trocknen', 'Eine Wurst fermentieren', 'Jedes Salzen, das länger als zwei Tage dauert'],
    fine: 'Wir sagen lieber „dafür geben wir keine Zahl an“, als zu raten. Kaltgeräucherter Fisch ist so ein Fall, und auf der Seite, auf der er vorkommt, ist das auch so gekennzeichnet.',
  },
  learn: { eb: 'Wissen', h: 'Pökelsalz und Nitrit, verständlich erklärt', all: 'Alle Fragen' },
  band: {
    eb: 'SaltCure für Android und iPhone',
    h: 'Eine Lake ist über Nacht fertig. Eine Pökelung nicht.',
    p: 'Dieselbe Rechnung auf dem Handy, dazu das Protokoll für Chargen, die Wochen dauern: Erinnerungen zum Wenden, Wiegen, Gewichtsverlust gegenüber dem Bereich für dieses Produkt.',
    meta: 'Kostenlos · offline · ohne Konto',
  },
};
