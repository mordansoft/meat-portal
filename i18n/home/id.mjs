// Halaman utama — Bahasa Indonesia. Mengikuti i18n/home/en.mjs. Terjemahan: Iya, 20.10.2026. Memakai “kamu”.
// Blok “Kapan garam biasa tidak cukup lagi” menyangkut keamanan: setiap perubahan diperiksa Povar.
export default {
  title: 'Kalkulator SaltCure — air garam, garam kering, dan garam curing, lengkap dengan sumbernya',
  desc: 'Kalkulator gratis untuk menggarami daging di rumah: air garam, garam kering, dan garam curing. Gram, bukan tebakan; waktu dari ketebalan; dan setiap angka keamanan merujuk ke USDA, FDA, atau 9 CFR.',
  eyebrow: 'Gratis · tanpa akun · setiap angka keamanan ada sumbernya',
  h1: 'Hitung garamnya. Lalu masak.',
  lead: 'Gram untuk potongan dagingmu, persentase beserta dasar perhitungannya, dan setiap angka keamanan terkait dengan aturan asalnya.',
  ask: 'Mau bikin apa?',
  open: 'Buka kalkulator',
  tiles: {
    brine: { eb: 'Basah', when: 'Dimasak dalam 2 hari', p: 'Daging dalam air garam. Kalkun, ayam, babi, brisket, salmon. Garam, gula, dan berapa lama — dari ketebalan potongan.' },
    dry: { eb: 'Kering', when: 'Dimasak dalam 2 hari', p: 'Tanpa air, tanpa ember, kulit lebih baik. Garam sebagai bagian dari berat daging itu sendiri.' },
    curing: { eb: 'Nitrit', when: 'Pengasapan dingin, pengeringan, lebih dari 2 hari', p: 'Cure #1 dan #2, nitrit dalam ppm, batas per produk dari 9 CFR, dan penghentian tegas saat dosis melewati batas.' },
  },
  jobs: {
    h: 'Yang sering dicari',
    p: 'Masing-masing membuka kalkulator yang sudah diatur.',
    sub: { 'bacon-cure-calculator': 'Curing kering atau air garam, Cure #1', 'pink-salt-calculator': 'Berapa untuk dagingmu', 'dry-cure-calculator': 'Garam curing, garam, dan gula menurut berat', 'cure-1-per-kg': 'Dan per pon, dalam tabel' },
  },
  split: {
    eb: 'Kalkulator yang mana',
    h: 'Kapan garam biasa tidak cukup lagi',
    p: 'Seberapa asin itu soal selera. Seberapa dingin, berapa lama, dan kapan garam biasa tidak cukup lagi — bukan: untuk itu ada sumber yang diterbitkan, dan kami menyebutkannya.',
    plainEb: 'Garam biasa sudah cukup',
    plain: 'Kamu menggarami daging dan memasaknya dalam dua hari, dan selama itu daging tetap dingin.',
    cureEb: 'Perlu garam curing',
    cure: ['Pengasapan dingin', 'Mengeringkan potongan utuh di udara selama berminggu-minggu', 'Memfermentasi sosis', 'Curing apa pun yang lebih dari dua hari'],
    fine: 'Kami lebih suka bilang “untuk ini kami tidak memberi angka” daripada menebak. Ikan asap dingin adalah salah satu kasusnya, dan itu ditandai di halaman tempat ia muncul.',
  },
  learn: { eb: 'Pelajari', h: 'Garam curing dan nitrit, dengan bahasa sederhana', all: 'Semua pertanyaan' },
  band: {
    eb: 'SaltCure untuk Android dan iPhone',
    h: 'Air garam selesai semalam. Curing tidak.',
    p: 'Perhitungan yang sama di ponselmu, plus catatan untuk batch yang berlangsung berminggu-minggu: pengingat untuk membalik, penimbangan, susut berat dibanding rentang produk itu.',
    meta: 'Gratis · offline · tanpa akun',
  },
};
