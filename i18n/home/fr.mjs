// Page d’accueil — français. Reflète i18n/home/en.mjs. Traduction : Iya, 20.10.2026. Vouvoiement.
// Le bloc « Là où le sel seul ne suffit plus » touche à la sécurité : toute modification passe par Povar.
export default {
  title: 'Calculateurs SaltCure — saumure, saumure sèche et sel nitrité, sources à l’appui',
  desc: 'Calculateurs gratuits pour saler la viande à la maison : saumure, saumure sèche et sel nitrité. Des grammes plutôt que des estimations, des durées selon l’épaisseur, et chaque chiffre de sécurité rattaché à l’USDA, à la FDA ou au 9 CFR.',
  eyebrow: 'Gratuit · sans compte · chaque chiffre de sécurité est sourcé',
  h1: 'Calculez le sel. Puis passez en cuisine.',
  lead: 'Des grammes pour votre morceau de viande, le pourcentage avec ce sur quoi il est calculé, et chaque chiffre de sécurité relié à la règle d’où il vient.',
  ask: 'Que préparez-vous ?',
  open: 'Ouvrir le calculateur',
  tiles: {
    brine: { eb: 'Humide', when: 'À cuire sous 2 jours', p: 'La viande dans de l’eau salée. Dinde, poulet, porc, brisket, saumon. Sel, sucre et durée, selon l’épaisseur du morceau.' },
    dry: { eb: 'À sec', when: 'À cuire sous 2 jours', p: 'Pas d’eau, pas de seau, une peau plus réussie. Le sel en proportion du poids de la viande elle-même.' },
    curing: { eb: 'Nitrite', when: 'Fumage à froid, séchage, plus de 2 jours', p: 'Cure #1 et #2, nitrite en ppm, limites par produit tirées du 9 CFR, et un blocage net dès qu’une dose dépasse la limite.' },
  },
  jobs: {
    h: 'Les usages courants',
    p: 'Chacun ouvre le calculateur déjà réglé.',
    sub: { 'bacon-cure-calculator': 'À sec ou en saumure, Cure #1', 'pink-salt-calculator': 'Combien pour votre viande', 'dry-cure-calculator': 'Sel nitrité, sel et sucre au poids', 'cure-1-per-kg': 'Et par lb, en tableau' },
  },
  split: {
    eb: 'Quel calculateur',
    h: 'Là où le sel seul ne suffit plus',
    p: 'Le degré de sel est une affaire de goût. Le froid, la durée et le moment où le sel ordinaire ne suffit plus, non : cela a des sources publiées, et nous les citons.',
    plainEb: 'Le sel ordinaire suffit',
    plain: 'Vous salez la viande et la cuisez dans les deux jours, et elle reste au froid tout du long.',
    cureEb: 'Il faut du sel nitrité',
    cure: ['Fumage à froid', 'Séchage à l’air d’une pièce entière pendant des semaines', 'Fermentation d’un saucisson', 'Toute salaison de plus de deux jours'],
    fine: 'Nous préférons dire « nous ne donnons pas de chiffre pour cela » plutôt que deviner. Le poisson fumé à froid en fait partie, et c’est signalé sur la page où il apparaît.',
  },
  learn: { eb: 'Comprendre', h: 'Le sel nitrité et le nitrite, simplement', all: 'Toutes les questions' },
  band: {
    eb: 'SaltCure pour Android et iPhone',
    h: 'Une saumure se fait en une nuit. Une salaison, non.',
    p: 'Les mêmes calculs sur votre téléphone, plus le journal des lots qui durent des semaines : rappels pour les retourner, pesées, perte de poids par rapport à la plage de ce produit.',
    meta: 'Gratuit · hors ligne · sans compte',
  },
};
