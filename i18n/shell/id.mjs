// Kerangka situs — header, footer, menyimpan perhitungan, dan halaman “Curing saya”.
// Mengikuti i18n/shell/en.mjs. Terjemahan: Iya, 20.10.2026. Memakai “kamu”, seperti kalkulator di i18n/id.mjs.
// Tidak ada teks keamanan di sini: peringatan soal nitrit tetap di i18n/id.mjs (arb.*).
export default {
  tag: 'kalkulator',
  nav: { calculators: 'Kalkulator', learn: 'Pelajari', cures: 'Curing saya', app: 'Aplikasi', menu: 'Menu' },
  foot: {
    calculators: 'Kalkulator', learn: 'Pelajari', allQuestions: 'Semua pertanyaan', sources: 'Sumber',
    app: 'Aplikasi SaltCure', legal: 'Legal', support: 'Dukungan', privacy: 'Privasi', terms: 'Ketentuan',
    note: 'Angka curing berasal dari 9 CFR part 424; penanganan dan suhu dari panduan USDA dan FDA Food Code. Aturan itu ditulis untuk pabrik yang diawasi dan tidak mengatur dapur rumah — kami berpegang padanya karena, dalam perhitungan yang bisa membuat orang sakit, angka yang diterbitkan lebih baik daripada postingan forum. Tidak ada apa pun di sini yang mengesahkan apa yang kamu buat.',
  },
  app: {
    h: 'Curing berminggu-minggu?',
    p: 'SaltCure menghitung hal yang sama di ponselmu dan mencatat semuanya: pengingat untuk membalik, penimbangan, susut berat dibanding rentang produk itu. Gratis, offline, tanpa akun.',
    cta: 'Unduh aplikasinya',
  },
  crumbs: { home: 'Kalkulator' },
  cures: {
    save: 'Simpan ke “Curing saya”',
    saved: 'Tersimpan di “Curing saya”',
    open: 'Buka “Curing saya”',
    print: 'Cetak',
    local: 'Hanya tersimpan di browser ini. Tanpa akun.',
    cantSave: 'Belum bisa disimpan sampai dosisnya masuk batas.',
    title: 'Curing saya — perhitungan curing yang tersimpan | SaltCure',
    desc: 'Perhitungan curing yang kamu simpan di perangkat ini: berapa gram yang ditimbang, nitrit dalam ppm, dan tanggal penyimpanan.',
    h1: 'Curing saya',
    lead: 'Perhitungan yang kamu simpan hanya ada di browser ini. Hapus data browser, dan semuanya hilang; aplikasi SaltCure menyimpannya selamanya.',
    empty: 'Belum ada yang tersimpan. Hitung curing di kalkulator garam curing lalu tekan “Simpan ke ‘Curing saya’”.',
    emptyCta: 'Buka kalkulator garam curing',
    savedOn: 'Disimpan {date}',
    meat: 'Daging', water: 'Air', curing: 'Garam curing', salt: 'Garam', sugar: 'Gula', nitrite: 'Nitrit',
    warned: 'Kalkulator menampilkan peringatan untuk dosis ini',
    remove: 'Hapus',
    removeAsk: 'Hapus perhitungan ini?',
    recalc: 'Buka kalkulator',
    stripTitle: 'Tersimpan di perangkat ini',
    stripAll: 'Semua yang tersimpan',
  },
};
