// Habillage du site — en-tête, pied de page, enregistrement d’un calcul et la page « Mes salaisons ».
// Reflète i18n/shell/en.mjs. Traduction : Iya, 20.10.2026. Vouvoiement, comme les calculateurs de i18n/fr.mjs.
// Rien ici n’est un texte de sécurité : les avertissements sur le nitrite restent dans i18n/fr.mjs (arb.*).
export default {
  tag: 'calculateurs',
  nav: { calculators: 'Calculateurs', learn: 'Comprendre', cures: 'Mes salaisons', app: 'L’appli', menu: 'Menu' },
  foot: {
    calculators: 'Calculateurs', learn: 'Comprendre', allQuestions: 'Toutes les questions', sources: 'Sources',
    app: 'Appli SaltCure', legal: 'Mentions légales', support: 'Assistance', privacy: 'Confidentialité', terms: 'Conditions',
    note: 'Les chiffres de salaison viennent du 9 CFR part 424 ; la manipulation et les températures, des recommandations de l’USDA et du FDA Food Code. Ces règles sont écrites pour des établissements inspectés et ne régissent pas une cuisine familiale — nous nous appuyons dessus parce que, dans un calcul qui peut rendre quelqu’un malade, un chiffre publié vaut mieux qu’un message de forum. Rien ici ne certifie ce que vous préparez.',
  },
  app: {
    h: 'Une salaison de plusieurs semaines ?',
    p: 'SaltCure fait les mêmes calculs sur votre téléphone et tient le journal : rappels pour retourner la pièce, pesées, perte de poids par rapport à la plage de ce produit. Gratuit, hors ligne, sans compte.',
    cta: 'Télécharger l’appli',
  },
  crumbs: { home: 'Calculateurs' },
  cures: {
    save: 'Enregistrer dans « Mes salaisons »',
    saved: 'Enregistré dans « Mes salaisons »',
    open: 'Ouvrir « Mes salaisons »',
    print: 'Imprimer',
    local: 'Enregistré dans ce navigateur uniquement. Sans compte.',
    cantSave: 'Rien à enregistrer tant que la dose dépasse la limite.',
    title: 'Mes salaisons — calculs de salaison enregistrés | SaltCure',
    desc: 'Les calculs de salaison enregistrés sur cet appareil : les grammes à peser, le nitrite en ppm et la date d’enregistrement.',
    h1: 'Mes salaisons',
    lead: 'Les calculs enregistrés restent dans ce navigateur uniquement. Effacez les données du navigateur et ils disparaissent ; l’appli SaltCure les garde pour de bon.',
    empty: 'Rien d’enregistré pour l’instant. Calculez une salaison dans le calculateur de sel nitrité et appuyez sur « Enregistrer dans “Mes salaisons” ».',
    emptyCta: 'Ouvrir le calculateur de sel nitrité',
    savedOn: 'Enregistré le {date}',
    meat: 'Viande', water: 'Eau', curing: 'Sel nitrité', salt: 'Sel', sugar: 'Sucre', nitrite: 'Nitrite',
    warned: 'Le calculateur a affiché un avertissement pour cette dose',
    remove: 'Supprimer',
    removeAsk: 'Supprimer ce calcul ?',
    recalc: 'Ouvrir le calculateur',
    stripTitle: 'Enregistré sur cet appareil',
    stripAll: 'Tous les calculs',
  },
};
