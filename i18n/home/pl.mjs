// Strona główna — polski. Lustro i18n/home/en.mjs. Tłumaczenie Ii, 20.10.2026. Na „ty”, jak kalkulatory.
// Blok „Gdzie kończy się zwykła sól” dotyczy bezpieczeństwa: każdą zmianę sprawdza Povar.
export default {
  title: 'Kalkulatory SaltCure — solanka, solenie na sucho i sól peklująca, ze wskazanymi źródłami',
  desc: 'Darmowe kalkulatory do solenia mięsa w domu: solanka, solenie na sucho i sól peklująca. Gramy zamiast zgadywania, czas według grubości kawałka, a każda liczba dotycząca bezpieczeństwa z odnośnikiem do USDA, FDA lub 9 CFR.',
  eyebrow: 'Za darmo · bez konta · każda liczba bezpieczeństwa ma źródło',
  h1: 'Policz sól. A potem gotuj.',
  lead: 'Gramy dla twojego kawałka mięsa, procent z informacją, od czego jest liczony, i każda liczba dotycząca bezpieczeństwa powiązana z przepisem, z którego pochodzi.',
  ask: 'Co przygotowujesz?',
  open: 'Otwórz kalkulator',
  tiles: {
    brine: { eb: 'Na mokro', when: 'Gotujesz w ciągu 2 dni', p: 'Mięso w słonej wodzie. Indyk, kurczak, wieprzowina, brisket, łosoś. Sól, cukier i czas — według grubości kawałka.' },
    dry: { eb: 'Na sucho', when: 'Gotujesz w ciągu 2 dni', p: 'Bez wody, bez wiadra, lepsza skórka. Sól jako część wagi samego mięsa.' },
    curing: { eb: 'Azotyn', when: 'Wędzenie na zimno, suszenie, ponad 2 dni', p: 'Cure #1 i #2, azotyn w ppm, limity dla każdego wyrobu z 9 CFR i twarda blokada, gdy dawka przekracza limit.' },
  },
  jobs: {
    h: 'Popularne zadania',
    p: 'Każde otwiera już ustawiony kalkulator.',
    sub: { 'bacon-cure-calculator': 'Na sucho lub w solance, Cure #1', 'pink-salt-calculator': 'Ile na twoje mięso', 'dry-cure-calculator': 'Peklosól, sól i cukier według wagi', 'cure-1-per-kg': 'I na funt, w tabeli' },
  },
  split: {
    eb: 'Który kalkulator',
    h: 'Gdzie kończy się zwykła sól',
    p: 'Jak słono — to kwestia smaku. Jak zimno, jak długo i kiedy zwykła sól przestaje wystarczać — już nie: na to są opublikowane źródła i je podajemy.',
    plainEb: 'Wystarczy zwykła sól',
    plain: 'Solisz mięso i gotujesz je w ciągu dwóch dni, a przez cały ten czas jest w chłodzie.',
    cureEb: 'Potrzebna sól peklująca',
    cure: ['Wędzenie na zimno', 'Suszenie całego kawałka mięsa przez tygodnie', 'Fermentowana kiełbasa', 'Każde solenie dłuższe niż dwa dni'],
    fine: 'Wolimy powiedzieć „tu nie podajemy liczby”, niż zgadywać. Ryba wędzona na zimno to właśnie taki przypadek i na stronie, na której się pojawia, jest to zaznaczone.',
  },
  learn: { eb: 'Wiedza', h: 'Sól peklująca i azotyn — po ludzku', all: 'Wszystkie pytania' },
  band: {
    eb: 'SaltCure na Androida i iPhone’a',
    h: 'Solanka jest gotowa przez noc. Peklowanie — nie.',
    p: 'To samo liczenie w telefonie plus dziennik partii, które trwają tygodniami: przypomnienia o przewracaniu, ważenia, ubytek wagi na tle normy dla danego wyrobu.',
    meta: 'Za darmo · offline · bez konta',
  },
};
