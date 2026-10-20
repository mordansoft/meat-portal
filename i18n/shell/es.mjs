// Marco del sitio — cabecera, pie, guardar un cálculo y la página «Mis curados».
// Refleja i18n/shell/en.mjs. Traducción: Iya, 20.10.2026. De tú, como las calculadoras de i18n/es.mjs.
// Nada de esto es un texto de seguridad: los avisos sobre el nitrito siguen en i18n/es.mjs (arb.*).
export default {
  tag: 'calculadoras',
  nav: { calculators: 'Calculadoras', learn: 'Aprende', cures: 'Mis curados', app: 'La app', menu: 'Menú' },
  foot: {
    calculators: 'Calculadoras', learn: 'Aprende', allQuestions: 'Todas las preguntas', sources: 'Fuentes',
    app: 'App SaltCure', legal: 'Legal', support: 'Ayuda', privacy: 'Privacidad', terms: 'Condiciones',
    note: 'Las cifras de curado salen de 9 CFR part 424; la manipulación y las temperaturas, de las guías de USDA y del FDA Food Code. Esas normas están escritas para plantas inspeccionadas y no regulan una cocina doméstica: las usamos porque, en un cálculo que puede hacer enfermar a alguien, una cifra publicada vale más que un mensaje en un foro. Nada de lo que hay aquí certifica lo que prepares.',
  },
  app: {
    h: '¿Un curado de semanas?',
    p: 'SaltCure hace las mismas cuentas en tu móvil y lleva el registro: avisos para darle la vuelta, pesajes y merma frente al rango de ese producto. Gratis, sin conexión y sin cuenta.',
    cta: 'Descarga la app',
  },
  crumbs: { home: 'Calculadoras' },
  cures: {
    save: 'Guardar en «Mis curados»',
    saved: 'Guardado en «Mis curados»',
    open: 'Abrir «Mis curados»',
    print: 'Imprimir',
    local: 'Solo se guarda en este navegador. Sin cuenta.',
    cantSave: 'No se puede guardar hasta que la dosis esté dentro del límite.',
    title: 'Mis curados — cálculos de curado guardados | SaltCure',
    desc: 'Los cálculos de curado guardados en este dispositivo: los gramos que hay que pesar, el nitrito en ppm y la fecha en que se guardaron.',
    h1: 'Mis curados',
    lead: 'Los cálculos guardados, solo en este navegador. Si borras los datos del navegador, desaparecen; la app SaltCure los conserva para siempre.',
    empty: 'Aún no hay nada guardado. Calcula un curado en la calculadora de sal de curado y pulsa «Guardar en “Mis curados”».',
    emptyCta: 'Abrir la calculadora de sal de curado',
    savedOn: 'Guardado el {date}',
    meat: 'Carne', water: 'Agua', curing: 'Sal de curado', salt: 'Sal', sugar: 'Azúcar', nitrite: 'Nitrito',
    warned: 'La calculadora mostró un aviso para esta dosis',
    remove: 'Eliminar',
    removeAsk: '¿Eliminar este cálculo?',
    recalc: 'Abrir la calculadora',
    stripTitle: 'Guardado en este dispositivo',
    stripAll: 'Todos los guardados',
  },
};
