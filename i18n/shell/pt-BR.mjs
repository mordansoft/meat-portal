// Moldura do site — cabeçalho, rodapé, salvar um cálculo e a página “Minhas curas”.
// Espelha i18n/shell/en.mjs. Tradução: Iya, 20.10.2026. Com “você”, como as calculadoras de i18n/pt-BR.mjs.
// Nada aqui é texto de segurança: os avisos sobre nitrito ficam em i18n/pt-BR.mjs (arb.*).
export default {
  tag: 'calculadoras',
  nav: { calculators: 'Calculadoras', learn: 'Aprenda', cures: 'Minhas curas', app: 'O app', menu: 'Menu' },
  foot: {
    calculators: 'Calculadoras', learn: 'Aprenda', allQuestions: 'Todas as perguntas', sources: 'Fontes',
    app: 'App SaltCure', legal: 'Jurídico', support: 'Suporte', privacy: 'Privacidade', terms: 'Termos',
    note: 'Os números de cura vêm do 9 CFR part 424; manuseio e temperaturas, das orientações do USDA e do FDA Food Code. Essas regras foram escritas para indústrias inspecionadas e não regulam a cozinha de casa — nós nos apoiamos nelas porque, num cálculo que pode fazer alguém adoecer, um número publicado vale mais que um post de fórum. Nada aqui certifica o que você prepara.',
  },
  app: {
    h: 'Uma cura de semanas?',
    p: 'O SaltCure faz as mesmas contas no seu celular e mantém o registro: lembretes para virar, pesagens, perda de peso em relação à faixa daquele produto. Grátis, offline, sem conta.',
    cta: 'Baixar o app',
  },
  crumbs: { home: 'Calculadoras' },
  cures: {
    save: 'Salvar em “Minhas curas”',
    saved: 'Salvo em “Minhas curas”',
    open: 'Abrir “Minhas curas”',
    print: 'Imprimir',
    local: 'Salvo só neste navegador. Sem conta.',
    cantSave: 'Só dá para salvar quando a dose estiver dentro do limite.',
    title: 'Minhas curas — cálculos de cura salvos | SaltCure',
    desc: 'Os cálculos de cura salvos neste aparelho: os gramas a pesar, o nitrito em ppm e a data em que foram salvos.',
    h1: 'Minhas curas',
    lead: 'Os cálculos salvos ficam só neste navegador. Limpou os dados do navegador, eles somem; o app SaltCure guarda tudo para sempre.',
    empty: 'Nada salvo ainda. Calcule uma cura na calculadora de sal de cura e aperte “Salvar em ‘Minhas curas’”.',
    emptyCta: 'Abrir a calculadora de sal de cura',
    savedOn: 'Salvo em {date}',
    meat: 'Carne', water: 'Água', curing: 'Sal de cura', salt: 'Sal', sugar: 'Açúcar', nitrite: 'Nitrito',
    warned: 'A calculadora mostrou um alerta para esta dose',
    remove: 'Excluir',
    removeAsk: 'Excluir este cálculo?',
    recalc: 'Abrir a calculadora',
    stripTitle: 'Salvo neste aparelho',
    stripAll: 'Todos os salvos',
  },
};
