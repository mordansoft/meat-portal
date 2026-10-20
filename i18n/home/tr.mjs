// Ana sayfa — Türkçe. i18n/home/en.mjs ile birebir. Çeviri: Iya, 20.10.2026. “Sen” diye.
// “Sade tuzun yetmediği yer” bloğu güvenlikle ilgili: her değişikliği Povar kontrol eder.
export default {
  title: 'SaltCure hesaplayıcıları — salamura, kuru salamura ve kür tuzu, kaynaklarıyla birlikte',
  desc: 'Evde et tuzlamak için ücretsiz hesaplayıcılar: salamura, kuru salamura ve kür tuzu. Tahmin yerine gram, kalınlığa göre süre ve her güvenlik rakamı için USDA, FDA veya 9 CFR kaynağı.',
  eyebrow: 'Ücretsiz · hesap gerekmez · her güvenlik rakamının kaynağı var',
  h1: 'Tuzu hesapla. Sonra pişir.',
  lead: 'Et parçan için gram, neye göre ölçüldüğü belirtilmiş yüzde ve geldiği kurala bağlanmış her güvenlik rakamı.',
  ask: 'Ne hazırlıyorsun?',
  open: 'Hesaplayıcıyı aç',
  tiles: {
    brine: { eb: 'Islak', when: '2 gün içinde pişirilir', p: 'Et tuzlu suda. Hindi, tavuk, domuz eti, brisket, somon. Tuz, şeker ve ne kadar süre — parçanın kalınlığına göre.' },
    dry: { eb: 'Kuru', when: '2 gün içinde pişirilir', p: 'Su yok, kova yok, daha iyi bir deri. Tuz, etin kendi ağırlığının bir payı olarak.' },
    curing: { eb: 'Nitrit', when: 'Soğuk tütsüleme, kurutma, 2 günden uzun', p: 'Cure #1 ve #2, ppm cinsinden nitrit, 9 CFR’den ürün başına sınırlar ve doz sınırı aşınca kesin durdurma.' },
  },
  jobs: {
    h: 'Sık kullanılanlar',
    p: 'Her biri hesaplayıcıyı hazır ayarlanmış olarak açar.',
    sub: { 'bacon-cure-calculator': 'Kuru kür veya salamura, Cure #1', 'pink-salt-calculator': 'Etin için ne kadar', 'dry-cure-calculator': 'Kür tuzu, tuz ve şeker ağırlığa göre', 'cure-1-per-kg': 'Paund başına da, tablo hâlinde' },
  },
  split: {
    eb: 'Hangi hesaplayıcı',
    h: 'Sade tuzun yetmediği yer',
    p: 'Ne kadar tuzlu olacağı zevk meselesi. Ne kadar soğuk, ne kadar süre ve sade tuzun ne zaman yetmediği ise değil: bunların yayımlanmış kaynakları var ve biz onları belirtiyoruz.',
    plainEb: 'Sade tuz yeter',
    plain: 'Eti tuzlarsın ve iki gün içinde pişirirsin; bu süre boyunca et hep soğukta kalır.',
    cureEb: 'Kür tuzu gerekir',
    cure: ['Soğuk tütsüleme', 'Bütün bir parçayı haftalarca havada kurutmak', 'Sucuk fermente etmek', 'İki günden uzun her kürleme'],
    fine: 'Tahmin yürütmektense “bunun için rakam vermiyoruz” demeyi tercih ederiz. Soğuk tütsülenmiş balık da böyle bir durum ve geçtiği sayfada bu belirtiliyor.',
  },
  learn: { eb: 'Bilgi', h: 'Kür tuzu ve nitrit, sade bir dille', all: 'Tüm sorular' },
  band: {
    eb: 'Android ve iPhone için SaltCure',
    h: 'Salamura bir gecede biter. Kürleme bitmez.',
    p: 'Aynı hesap telefonunda, artı haftalarca süren partilerin kaydı: çevirme hatırlatmaları, tartımlar, o ürünün aralığına göre ağırlık kaybı.',
    meta: 'Ücretsiz · çevrimdışı · hesap gerekmez',
  },
};
