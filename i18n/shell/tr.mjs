// Site çerçevesi — üst bar, alt bilgi, hesabı kaydetme ve “Kürlerim” sayfası.
// i18n/shell/en.mjs ile birebir. Çeviri: Iya, 20.10.2026. “Sen” diye, i18n/tr.mjs hesaplayıcıları gibi.
// Buradaki hiçbir metin güvenlik metni değil: nitrit uyarıları i18n/tr.mjs’te kalıyor (arb.*).
export default {
  tag: 'hesaplayıcılar',
  nav: { calculators: 'Hesaplayıcılar', learn: 'Bilgi', cures: 'Kürlerim', app: 'Uygulama', menu: 'Menü' },
  foot: {
    calculators: 'Hesaplayıcılar', learn: 'Bilgi', allQuestions: 'Tüm sorular', sources: 'Kaynaklar',
    app: 'SaltCure uygulaması', legal: 'Yasal', support: 'Destek', privacy: 'Gizlilik', terms: 'Koşullar',
    note: 'Kürleme sayıları 9 CFR part 424’ten; et işleme ve sıcaklıklar ise USDA rehberlerinden ve FDA Food Code’dan geliyor. Bu kurallar denetlenen tesisler için yazılmıştır ve ev mutfağını düzenlemez — onlara dayanıyoruz, çünkü birini hasta edebilecek bir hesapta yayımlanmış bir sayı, bir forum gönderisinden iyidir. Buradaki hiçbir şey yaptığın şeyi onaylamaz.',
  },
  app: {
    h: 'Haftalarca süren bir kür mü?',
    p: 'SaltCure aynı hesabı telefonunda yapar ve kaydı tutar: çevirme hatırlatmaları, tartımlar, o ürünün aralığına göre ağırlık kaybı. Ücretsiz, çevrimdışı, hesap gerekmez.',
    cta: 'Uygulamayı indir',
  },
  crumbs: { home: 'Hesaplayıcılar' },
  cures: {
    save: '“Kürlerim”e kaydet',
    saved: '“Kürlerim”e kaydedildi',
    open: '“Kürlerim”i aç',
    print: 'Yazdır',
    local: 'Yalnızca bu tarayıcıda kaydedilir. Hesap gerekmez.',
    cantSave: 'Doz sınırın içine girmeden kaydedilemez.',
    title: 'Kürlerim — Kaydedilmiş kürleme hesapları | SaltCure',
    desc: 'Bu cihazda kaydettiğin kürleme hesapları: tartılacak gramlar, ppm cinsinden nitrit ve kayıt tarihi.',
    h1: 'Kürlerim',
    lead: 'Kaydettiğin hesaplar yalnızca bu tarayıcıda durur. Tarayıcı verilerini silersen kaybolurlar; SaltCure uygulaması onları kalıcı olarak saklar.',
    empty: 'Henüz kayıtlı bir şey yok. Kür tuzu hesaplayıcıda bir kür hesapla ve “‘Kürlerim’e kaydet” düğmesine bas.',
    emptyCta: 'Kür tuzu hesaplayıcıyı aç',
    savedOn: 'Kaydedildi: {date}',
    meat: 'Et', water: 'Su', curing: 'Kür tuzu', salt: 'Tuz', sugar: 'Şeker', nitrite: 'Nitrit',
    warned: 'Hesaplayıcı bu doz için uyarı gösterdi',
    remove: 'Sil',
    removeAsk: 'Bu hesap silinsin mi?',
    recalc: 'Hesaplayıcıyı aç',
    stripTitle: 'Bu cihazda kayıtlı',
    stripAll: 'Tüm kayıtlar',
  },
};
