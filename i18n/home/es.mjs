// Página de inicio — español (España). Refleja i18n/home/en.mjs. Traducción: Iya, 20.10.2026. De tú.
// El bloque «Dónde se queda corta la sal común» es de seguridad: cualquier cambio lo revisa Povar.
export default {
  title: 'Calculadoras SaltCure: salmuera, salmuera seca y sal de curado, con las fuentes citadas',
  desc: 'Calculadoras gratuitas para salar carne en casa: salmuera, salmuera seca y sal de curado. Gramos en lugar de suposiciones, tiempos según el grosor y cada cifra de seguridad citada a USDA, FDA o 9 CFR.',
  eyebrow: 'Gratis · sin cuenta · cada cifra de seguridad, con su fuente',
  h1: 'Calcula la sal. Y luego, a cocinar.',
  lead: 'Gramos para tu pieza de carne, el porcentaje indicando sobre qué se mide y cada cifra de seguridad ligada a la norma de la que sale.',
  ask: '¿Qué vas a preparar?',
  open: 'Abrir calculadora',
  tiles: {
    brine: { eb: 'Húmeda', when: 'Se cocina en 2 días como máximo', p: 'Carne en agua con sal. Pavo, pollo, cerdo, brisket, salmón. Sal, azúcar y cuánto tiempo, según el grosor de la pieza.' },
    dry: { eb: 'Seca', when: 'Se cocina en 2 días como máximo', p: 'Sin agua ni cubo, y mejor piel. Sal como proporción del peso de la propia carne.' },
    curing: { eb: 'Nitrito', when: 'Ahumado en frío, secado, más de 2 días', p: 'Cure #1 y #2, nitrito en ppm, límites por producto según 9 CFR y un bloqueo en cuanto la dosis supera el límite.' },
  },
  jobs: {
    h: 'Lo más buscado',
    p: 'Cada uno abre la calculadora ya configurada.',
    sub: { 'bacon-cure-calculator': 'En seco o en salmuera, Cure #1', 'pink-salt-calculator': 'Cuánta para tu carne', 'dry-cure-calculator': 'Sal de curado, sal y azúcar por peso', 'cure-1-per-kg': 'Y por libra, en tabla' },
  },
  split: {
    eb: 'Qué calculadora',
    h: 'Dónde se queda corta la sal común',
    p: 'Lo salado que quede es cuestión de gusto. Lo frío, el tiempo y cuándo la sal común deja de bastar, no: eso tiene fuentes publicadas, y las citamos.',
    plainEb: 'Basta con sal común',
    plain: 'Salas la carne y la cocinas en dos días como máximo, y todo ese tiempo está en frío.',
    cureEb: 'Necesitas sal de curado',
    cure: ['Ahumado en frío', 'Curar al aire una pieza entera durante semanas', 'Fermentar un embutido', 'Cualquier curado de más de dos días'],
    fine: 'Preferimos decir «aquí no damos cifra» antes que adivinar. El pescado ahumado en frío es uno de esos casos, y está marcado como tal en la página donde aparece.',
  },
  learn: { eb: 'Aprende', h: 'Sal de curado y nitrito, sin rodeos', all: 'Todas las preguntas' },
  band: {
    eb: 'SaltCure para Android y iPhone',
    h: 'Una salmuera termina en una noche. Un curado, no.',
    p: 'Las mismas cuentas en tu móvil y, además, el registro de los lotes que duran semanas: avisos para darles la vuelta, pesajes y merma frente al rango de ese producto.',
    meta: 'Gratis · sin conexión · sin cuenta',
  },
};
