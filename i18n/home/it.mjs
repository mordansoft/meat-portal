// Pagina iniziale — italiano. Rispecchia i18n/home/en.mjs. Traduzione: Iya, 20.10.2026. Con il tu.
// Il blocco «Dove il sale da solo non basta più» riguarda la sicurezza: ogni modifica la controlla Povar.
export default {
  title: 'Calcolatori SaltCure — salamoia, salamoia a secco e sale nitritato, con le fonti citate',
  desc: 'Calcolatori gratuiti per salare la carne in casa: salamoia, salamoia a secco e sale nitritato. Grammi invece di stime a occhio, tempi in base allo spessore e ogni dato di sicurezza citato da USDA, FDA o 9 CFR.',
  eyebrow: 'Gratis · senza account · ogni dato di sicurezza ha la sua fonte',
  h1: 'Calcola il sale. Poi vai a cucinare.',
  lead: 'I grammi per il tuo pezzo di carne, la percentuale con indicato su cosa si misura e ogni dato di sicurezza legato alla norma da cui viene.',
  ask: 'Che cosa prepari?',
  open: 'Apri il calcolatore',
  tiles: {
    brine: { eb: 'Umida', when: 'Da cuocere entro 2 giorni', p: 'Carne in acqua salata. Tacchino, pollo, maiale, brisket, salmone. Sale, zucchero e quanto tempo, in base allo spessore del pezzo.' },
    dry: { eb: 'A secco', when: 'Da cuocere entro 2 giorni', p: 'Niente acqua, niente secchio, pelle migliore. Sale come quota del peso della carne stessa.' },
    curing: { eb: 'Nitrito', when: 'Affumicatura a freddo, stagionatura, oltre 2 giorni', p: 'Cure #1 e #2, nitrito in ppm, limiti per prodotto da 9 CFR e un blocco netto quando la dose supera il limite.' },
  },
  jobs: {
    h: 'Gli usi più comuni',
    p: 'Ognuno apre il calcolatore già impostato.',
    sub: { 'bacon-cure-calculator': 'A secco o in salamoia, Cure #1', 'pink-salt-calculator': 'Quanto per la tua carne', 'dry-cure-calculator': 'Sale nitritato, sale e zucchero a peso', 'cure-1-per-kg': 'E per libbra, in tabella' },
  },
  split: {
    eb: 'Quale calcolatore',
    h: 'Dove il sale da solo non basta più',
    p: 'Quanto salato è una questione di gusto. Quanto freddo, per quanto tempo e quando il sale comune smette di bastare, no: per questo ci sono fonti pubblicate, e le citiamo.',
    plainEb: 'Basta il sale comune',
    plain: 'Sali la carne e la cuoci entro due giorni, e per tutto il tempo resta al freddo.',
    cureEb: 'Serve il sale nitritato',
    cure: ['Affumicatura a freddo', 'Stagionare all’aria un pezzo intero per settimane', 'Fermentare un salume', 'Qualsiasi salagione oltre i due giorni'],
    fine: 'Preferiamo dire «qui non diamo un numero» piuttosto che tirare a indovinare. Il pesce affumicato a freddo è uno di questi casi, ed è segnalato come tale nella pagina in cui compare.',
  },
  learn: { eb: 'Guide', h: 'Sale nitritato e nitrito, in parole semplici', all: 'Tutte le domande' },
  band: {
    eb: 'SaltCure per Android e iPhone',
    h: 'Una salamoia finisce in una notte. Una salagione no.',
    p: 'Gli stessi conti sul telefono, più il registro per i lotti che durano settimane: promemoria per girarli, pesate, calo peso rispetto all’intervallo di quel prodotto.',
    meta: 'Gratis · offline · senza account',
  },
};
