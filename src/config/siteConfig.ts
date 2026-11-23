/**
 * ─────────────────────────────────────────────────────────────
 *  SNIFF PET KUAFÖR — MERKEZİ SİTE AYARLARI
 * ─────────────────────────────────────────────────────────────
 *  Sitedeki tüm işletme bilgileri bu dosyadan gelir.
 *  Telefon, adres, saatler, hizmetler, SSS vb. değiştirmek için
 *  yalnızca bu dosyayı düzenlemeniz yeterlidir.
 *
 *  ⚠️  "TODO" ile işaretli alanlar örnek (placeholder) verilerdir;
 *      yayına almadan önce gerçek bilgilerle değiştirin.
 * ─────────────────────────────────────────────────────────────
 */

/** Unsplash görsellerini istenen boyutta çağırmak için yardımcı */
const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export type ServiceCategory = "kopek" | "kedi" | "spa";

export interface Service {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  categories: ServiceCategory[];
  duration: string;
  image: string;
}

export interface BeforeAfterItem {
  id: string;
  /** Sekmede görünen başlık */
  label: string;
  note: string;
  /** public/ klasörüne göre yol, ör. /transformations/dog-1-before.jpg */
  before: string;
  after: string;
}

export interface Testimonial {
  id: string;
  name: string;
  pet: string;
  rating: number;
  text: string;
}

export const siteConfig = {
  name: "Sniff Pet Kuaför",
  shortName: "Sniff",
  tagline: "Kedi ve Köpek Bakımında Profesyonel Dokunuş",
  /**
   * Sitenin yayındaki adresi (paylaşım önizlemeleri, sitemap ve Google için).
   * Cloudflare Pages proje adı "sniff-pet-kuafor" ise adres budur.
   * Kendi alan adınızı bağladığınızda burayı güncelleyin (ör. "https://www.sniffpetkuafor.com").
   */
  url: "https://sniff-pet-kuafor.pages.dev",

  /** Logo dosyaları (public/brand/). Yeniden üretmek için: python3 scripts/prepare-logo.py */
  brand: {
    logo: "/brand/sniff-logo.png",
    logoCream: "/brand/sniff-logo-cream.png",
    wordmark: "/brand/sniff-wordmark.png",
    wordmarkCream: "/brand/sniff-wordmark-cream.png",
  },

  seo: {
    title: "Sniff Pet Kuaför | Gölbaşı Ankara Kedi & Köpek Kuaförü",
    description:
      "Sniff Pet Kuaför — Gölbaşı, Ankara. Kedi ve köpek bakımında profesyonel dokunuş: anestezisiz tıraş, ırka özel makas & makine kesimi, kıtık açma, banyo ve tırnak bakımı. WhatsApp veya Instagram'dan randevu alın.",
    keywords: [
      "Gölbaşı pet kuaför",
      "Ankara pet kuaför",
      "Gölbaşı köpek kuaförü",
      "Ankara kedi tıraşı",
      "anestezisiz tıraş",
      "köpek tıraşı",
      "kıtık açma",
      "Sniff Pet Kuaför",
    ],
    ogImage: "/brand/og-image.jpg",
  },

  contact: {
    /** Ekranda gösterilecek telefon */
    phoneDisplay: "+90 (500) 000 00 00", // TODO
    /** tel: linki için (boşluksuz) */
    phoneHref: "+905000000000", // TODO
    /** WhatsApp numarası: ülke kodu ile, başında + ve boşluk olmadan */
    whatsappNumber: "905000000000", // TODO
    /** WhatsApp butonlarında kullanılan varsayılan mesaj */
    whatsappDefaultMessage:
      "Merhaba Sniff Pet Kuaför 🐾 Minik dostum için randevu almak istiyorum. Uygun gün ve saatleri öğrenebilir miyim?",
    /** TODO: E-posta adresiniz (boş bırakılırsa sitede gösterilmez) */
    email: "",
  },

  address: {
    line1: "Gaziosmanpaşa Mahallesi, Şehit Ali Gaffar Okkan Caddesi, Baran Apartmanı No: 43/B",
    district: "Gölbaşı",
    city: "Ankara",
    /** Kısa konum adı (rozetlerde ve başlıklarda kullanılır) */
    short: "Gölbaşı, Ankara",
    full: "Gaziosmanpaşa Mahallesi, Şehit Ali Gaffar Okkan Caddesi, Baran Apartmanı No: 43/B, Gölbaşı / Ankara",
    /** Google Maps'te aranacak sorgu (harita ve yol tarifi bu adrese göre açılır) */
    mapsQuery: "Gaziosmanpaşa Mahallesi Şehit Ali Gaffar Okkan Caddesi 43/B Gölbaşı Ankara",
    /**
     * İsteğe bağlı: Google Maps → Paylaş → Harita yerleştir'den alınan iframe "src" linki.
     * Boş bırakılırsa mapsQuery'den otomatik oluşturulur.
     */
    mapsEmbedUrl: "",
  },

  /** TODO: Çalışma saatlerinizi doğrulayın / güncelleyin */
  hours: [
    { days: "Pazartesi – Cuma", time: "09:30 – 19:30" },
    { days: "Cumartesi", time: "09:30 – 18:00" },
    { days: "Pazar", time: "Kapalı" },
  ],

  social: {
    instagramUsername: "sniffpetkuafor",
    instagramUrl: "https://www.instagram.com/sniffpetkuafor/",
    /** Instagram DM'i doğrudan açan link */
    instagramDmUrl: "https://ig.me/m/sniffpetkuafor",
  },

  trustBadges: [
    { id: "anestezisiz", label: "%100 Anestezisiz Bakım" },
    { id: "steril", label: "Sterilize Ekipman" },
    { id: "uzman", label: "Kedi & Köpek Uzmanlığı" },
  ],

  hero: {
    image: unsplash("1516734212186-a967f81ad0d7", 1400),
    imageAlt: "Sniff Pet Kuaför'de bakım sonrası mutlu bir golden retriever",
    secondaryImage: unsplash("1574158622682-e40e69881006", 600),
    secondaryImageAlt: "Yeşil gözlü, bakımlı bir kedi",
  },

  serviceFilters: [
    { id: "tumu", label: "Tümü" },
    { id: "kopek", label: "Köpek Bakımı" },
    { id: "kedi", label: "Kedi Bakımı" },
    { id: "spa", label: "Spa & Sağlık" },
  ] as const,

  services: [
    {
      id: "irka-ozel-makas",
      title: "Irka Özel Makas Tıraşı",
      description:
        "Poodle, Pomeranian, Shih Tzu, Maltese gibi ırklarda anatomiye ve ırk standardına uygun, el emeği makas kesim.",
      highlights: ["Irk standardına uygun stil", "Yüz & pati şekillendirme"],
      categories: ["kopek"],
      duration: "2 – 3 saat",
      image: unsplash("1625316708582-7c38734be31d", 800),
    },
    {
      id: "makine-hijyen",
      title: "Makine Tıraşı & Hijyen Kesimi",
      description:
        "Sıcak günler için ferahlatan kısa kesim; pati altı, göz çevresi ve hijyen bölgelerinin özenle temizlenmesi.",
      highlights: ["Cilde nazik bıçaklar", "Pati altı & hijyen bölgesi"],
      categories: ["kopek"],
      duration: "1,5 – 2 saat",
      image: unsplash("1561037404-61cd46aa615b", 800),
    },
    {
      id: "kitik-deshedding",
      title: "Kıtık Açma & Alt Tüy (Deshedding) Bakımı",
      description:
        "Keçeleşmiş tüyleri canını acıtmadan açıyor, ölü alt tüyü profesyonel ekipmanla alarak dökülmeyi ciddi ölçüde azaltıyoruz.",
      highlights: ["Ağrısız kıtık açma", "Dökülmede gözle görülür azalma"],
      categories: ["kopek", "kedi"],
      duration: "1 – 2,5 saat",
      image: unsplash("1596492784531-6e6eb5ea9993", 800),
    },
    {
      id: "ozonlu-banyo",
      title: "Ozonlu & Bitkisel Banyo + Fön",
      description:
        "Ozon terapili su ve deri tipine uygun bitkisel şampuanlarla derinlemesine temizlik, ardından düşük ısıda sessiz fön.",
      highlights: ["Hassas deriye uygun", "Uzun süre kalıcı ferah koku"],
      categories: ["kopek", "kedi", "spa"],
      duration: "1 – 1,5 saat",
      image: unsplash("1558788353-f76d92427f16", 800),
    },
    {
      id: "kedi-tirasi",
      title: "Kedi Tıraşı & Tarak Bakımı",
      description:
        "Kedilere özel sessiz ortamda, sakinleştirici ve sabırlı bir yaklaşımla aslan tıraşı, kıtık açma ve tarak bakımı.",
      highlights: ["Sessiz, kediye özel seans", "Stres sinyallerine göre mola"],
      categories: ["kedi"],
      duration: "1 – 2 saat",
      image: unsplash("1514888286974-6c03e2ca1dba", 800),
    },
    {
      id: "tirnak-kulak-goz",
      title: "Tırnak Kesimi, Kulak & Göz Çevresi Temizliği",
      description:
        "Tırnak kesimi ve törpüleme, kulak içi temizliği ve göz yaşı lekelerinin nazikçe giderilmesi. Tek başına da alınabilir.",
      highlights: ["Hızlı & randevusuz da olur", "Veteriner onaylı solüsyonlar"],
      categories: ["kopek", "kedi", "spa"],
      duration: "20 – 30 dk",
      image: unsplash("1537151625747-768eb6cf92b2", 800),
    },
  ] satisfies Service[],

  /**
   * Gerçek öncesi/sonrası fotoğrafları.
   * Yeni dönüşüm eklemek için: yan yana (sol: öncesi, sağ: sonrası) fotoğrafı
   * raw-transformations/ klasörüne dog-4.png gibi koyup `npm run split-photos` çalıştırın.
   */
  beforeAfter: [
    {
      id: "dog-1",
      label: "Maltipoo / Poodle Bakımı",
      note: "Tüyler açılıp yıkandı, yüz ve gövde ırk yapısına uygun şekilde makasla toparlandı.",
      before: "/transformations/dog-1-before.jpg",
      after: "/transformations/dog-1-after.jpg",
    },
    {
      id: "dog-2",
      label: "Kızıl Toy Poodle",
      note: "Kızıl tüylerin rengi ve dokusu korunarak düzenli, sevimli bir toy poodle kesimi yapıldı.",
      before: "/transformations/dog-2-before.jpg",
      after: "/transformations/dog-2-after.jpg",
    },
    {
      id: "dog-3",
      label: "Yorkie & Uzun Tüy Kesimi",
      note: "Uzayan tüyler kısaltıldı; göz çevresi açıldı, pati ve hijyen bölgeleri temizlendi.",
      before: "/transformations/dog-3-before.jpg",
      after: "/transformations/dog-3-after.jpg",
    },
  ] satisfies BeforeAfterItem[],

  whyUs: [
    {
      id: "anestezisiz",
      title: "Uyutmadan / Anestezisiz İşlem",
      description:
        "Hiçbir dostumuza sakinleştirici ya da anestezi uygulamayız. Sabır, doğru tutuş ve molalarla güvenle çalışırız.",
    },
    {
      id: "dezenfeksiyon",
      title: "Her Dost Sonrası Dezenfeksiyon",
      description:
        "Masa, küvet, makas ve tarakların tamamı her seans sonrası dezenfekte edilir; bıçaklar sterilize edilir.",
    },
    {
      id: "dogal-sampuan",
      title: "Irka & Deriye Uygun Doğal Şampuanlar",
      description:
        "Tüy tipine ve deri hassasiyetine göre seçilen, paraben ve sülfat içermeyen bitkisel ürünler kullanırız.",
    },
    {
      id: "seffaf-surec",
      title: "Şeffaf Süreç & Foto/Video Bilgilendirme",
      description:
        "Bakım boyunca WhatsApp'tan fotoğraf ve kısa videolarla sizi bilgilendiririz; içiniz hep rahat olur.",
    },
  ],

  quoteBuilder: {
    petTypes: ["Köpek", "Kedi"],
    sizes: [
      { id: "kucuk", label: "Küçük", hint: "0 – 10 kg" },
      { id: "orta", label: "Orta", hint: "10 – 25 kg" },
      { id: "buyuk", label: "Büyük", hint: "25 kg +" },
    ],
    coatConditions: [
      { id: "normal", label: "Normal", hint: "Tarakla açılabiliyor" },
      { id: "kitikli", label: "Kıtıklı", hint: "Keçeleşme / düğüm var" },
    ],
  },

  /**
   * Instagram vitrini. TODO: Kendi Instagram fotoğraflarınızı public/instagram/ klasörüne
   * koyup "image" alanlarını ör. "/instagram/1.jpg" olarak değiştirin.
   */
  instagramPosts: [
    {
      id: "ig-1",
      image: unsplash("1612536057832-2ff7ead58194", 700),
      alt: "Bakım sonrası poz veren corgi",
      caption: "Bakım sonrası mutlu anlar 💛",
    },
    {
      id: "ig-2",
      image: unsplash("1592194996308-7b43878e84a6", 700),
      alt: "Pati kaldıran sevimli yavru kedi",
      caption: "Kedi dostlarımız da bizimle 🐾",
    },
    {
      id: "ig-3",
      image: unsplash("1583337130417-3346a1be7dee", 700),
      alt: "Sarı kazaklı french bulldog",
      caption: "Banyo + fön sonrası",
    },
    {
      id: "ig-4",
      image: unsplash("1534361960057-19889db9621e", 700),
      alt: "Çimlerde koşan beyaz tüylü köpek",
      caption: "Tüyler açıldı, koşmaya hazır ✨",
    },
  ],

  /**
   * Müşteri yorumları. Gerçek yorumlarınızı (Google / Instagram) buraya ekleyin.
   * Liste boş olduğu sürece yorum alanı sitede gizli kalır. Örnek:
   * { id: "y1", name: "Ayşe K.", pet: "Maltipoo · Pamuk", rating: 5, text: "..." },
   */
  testimonials: [] as Testimonial[],

  faq: [
    {
      q: "Tıraş sırasında anestezi (uyutma) uyguluyor musunuz?",
      a: "Hayır. Sniff Pet Kuaför'de hiçbir dostumuza anestezi veya sakinleştirici uygulanmaz. Tüm işlemler sabırla, doğru tutuş teknikleri ve gerektiğinde verilen molalarla yapılır. Çok yoğun stres yaşayan dostlarımızda işlemi birkaç kısa seansa bölmeyi öneririz.",
    },
    {
      q: "Fiyatlar neye göre belirleniyor?",
      a: "Fiyat; dostunuzun türü, ırkı ve kilosu, tüy uzunluğu ve kıtık durumu ile seçtiğiniz hizmete göre belirlenir. Sayfadaki Fiyat Teklifi formunu doldurup WhatsApp'tan ya da Instagram DM'den gönderirseniz size en kısa sürede net bir fiyat iletiriz.",
    },
    {
      q: "Kedi tıraşı yapıyor musunuz?",
      a: "Evet! Kedilere özel, sessiz saatlerde planlanan seanslarda aslan tıraşı, kıtık açma, banyo ve tarak bakımı yapıyoruz. Köpeklerle aynı anda çalışmayarak kedinizin sakin kalmasını sağlıyoruz.",
    },
    {
      q: "Randevu ne kadar sürmektedir?",
      a: "Hizmete ve dostunuzun tüy durumuna göre değişmekle birlikte banyo + fön ortalama 1–1,5 saat, tam tıraş paketleri 2–3 saat sürer. Tırnak kesimi gibi kısa işlemler 20–30 dakikada tamamlanır. Bitince sizi hemen arıyoruz.",
    },
    {
      q: "Bakım sırasında yanında kalabilir miyim?",
      a: "Dostlarımız sahipleri yanındayken genellikle daha heyecanlı olur ve hareket eder; bu da güvenliği azaltır. Bu yüzden işlem alanına girişe izin vermiyoruz ama süreç boyunca WhatsApp'tan fotoğraf ve video ile anlık bilgi veriyoruz.",
    },
    {
      q: "Aşı veya sağlık şartı var mı?",
      a: "Tüm dostlarımızın güncel karma aşı ve kuduz aşısının olmasını, iç-dış parazit uygulamalarının yapılmış olmasını rica ediyoruz. Deri hastalığı veya yakın zamanda geçirilmiş bir operasyon varsa lütfen randevu öncesinde bize bildirin.",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
