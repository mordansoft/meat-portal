// Página inicial — português (Brasil). Espelha i18n/home/en.mjs. Tradução: Iya, 20.10.2026. Com “você”.
// O bloco “Onde o sal comum deixa de bastar” é de segurança: qualquer mudança passa pelo Povar.
export default {
  title: 'Calculadoras SaltCure — salmoura, salmoura seca e sal de cura, com as fontes citadas',
  desc: 'Calculadoras grátis para salgar carne em casa: salmoura, salmoura seca e sal de cura. Gramas em vez de chute, tempo pela espessura e cada número de segurança com fonte no USDA, na FDA ou no 9 CFR.',
  eyebrow: 'Grátis · sem conta · cada número de segurança tem fonte',
  h1: 'Calcule o sal. Depois, é só cozinhar.',
  lead: 'Gramas para o seu pedaço de carne, a porcentagem dizendo sobre o que ela é medida e cada número de segurança ligado à regra de onde veio.',
  ask: 'O que você vai preparar?',
  open: 'Abrir a calculadora',
  tiles: {
    brine: { eb: 'Úmida', when: 'Para cozinhar em até 2 dias', p: 'Carne em água com sal. Peru, frango, porco, brisket, salmão. Sal, açúcar e quanto tempo, pela espessura do pedaço.' },
    dry: { eb: 'Seca', when: 'Para cozinhar em até 2 dias', p: 'Sem água, sem balde, pele melhor. Sal como fração do peso da própria carne.' },
    curing: { eb: 'Nitrito', when: 'Defumação a frio, secagem, mais de 2 dias', p: 'Cure #1 e #2, nitrito em ppm, limites por produto do 9 CFR e um bloqueio firme quando a dose passa do limite.' },
  },
  jobs: {
    h: 'Usos mais comuns',
    p: 'Cada um abre a calculadora já configurada.',
    sub: { 'bacon-cure-calculator': 'A seco ou em salmoura, Cure #1', 'pink-salt-calculator': 'Quanto para a sua carne', 'dry-cure-calculator': 'Sal de cura, sal e açúcar por peso', 'cure-1-per-kg': 'E por libra, em tabela' },
  },
  split: {
    eb: 'Qual calculadora',
    h: 'Onde o sal comum deixa de bastar',
    p: 'O quanto fica salgado é questão de gosto. Quanto frio, por quanto tempo e quando o sal comum deixa de bastar, não: isso tem fontes publicadas, e nós as citamos.',
    plainEb: 'Sal comum basta',
    plain: 'Você salga a carne e a cozinha em até dois dias, e ela fica no frio o tempo todo.',
    cureEb: 'Precisa de sal de cura',
    cure: ['Defumação a frio', 'Secar ao ar uma peça inteira por semanas', 'Fermentar um embutido', 'Qualquer cura com mais de dois dias'],
    fine: 'Preferimos dizer “para isso não damos número” a chutar. Peixe defumado a frio é um desses casos, e isso está marcado na página onde ele aparece.',
  },
  learn: { eb: 'Aprenda', h: 'Sal de cura e nitrito, sem complicação', all: 'Todas as perguntas' },
  band: {
    eb: 'SaltCure para Android e iPhone',
    h: 'Uma salmoura fica pronta em uma noite. Uma cura, não.',
    p: 'As mesmas contas no celular, mais o registro dos lotes que levam semanas: lembretes para virar, pesagens, perda de peso em relação à faixa daquele produto.',
    meta: 'Grátis · offline · sem conta',
  },
};
