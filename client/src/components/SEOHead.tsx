/**
 * SEOHead — Dynamic SEO meta tags for Sasak Garden Resort
 * Design: Kinfolk Tropical Editorial
 * Supports: EN / RU / ID
 * Injects: title, description, keywords, og:*, twitter:*, hreflang, canonical, JSON-LD
 */
import { Helmet } from "react-helmet-async";
import { useLang } from "@/contexts/LanguageContext";

const DOMAIN = "https://sasakgardenresort.com";

// Best photo from Booking.com CDN for og:image (pool + garden, 1280×900)
const OG_IMAGE =
  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/804044445.jpg?k=e5b3a5b3e5b3a5b3e5b3a5b3e5b3a5b3e5b3a5b3e5b3a5b3e5b3a5b3e5b3a5b3&o=";

const SEO_DATA = {
  en: {
    lang: "en",
    title: "Sasak Garden Resort — Tropical Oasis in Senggigi, Lombok",
    description:
      "Sasak Garden Resort is a boutique resort in Senggigi, Lombok. Lush tropical garden, private pool, restaurant, 5 minutes to Batu Bolong Beach. Rated 9.9 on Booking.com · 113 reviews.",
    keywords:
      "Sasak Garden Resort, Lombok, Senggigi, boutique resort, Indonesia, pool, tropical garden, hotel, Batu Bolong Beach, Gili Islands",
    ogTitle: "Sasak Garden Resort — Tropical Oasis in Senggigi",
    ogDescription:
      "Boutique resort in the heart of Senggigi. Tropical garden, pool, restaurant. Rated 9.9 · 113 reviews.",
    twitterTitle: "Sasak Garden Resort · Lombok",
    twitterDescription:
      "Your private tropical oasis in Senggigi. 5 min to the beach, rated 9.9 on Booking.com.",
    canonical: `${DOMAIN}/`,
    hreflang: [
      { hreflang: "en", href: `${DOMAIN}/` },
      { hreflang: "ru", href: `${DOMAIN}/?lang=ru` },
      { hreflang: "id", href: `${DOMAIN}/?lang=id` },
      { hreflang: "x-default", href: `${DOMAIN}/` },
    ],
  },
  ru: {
    lang: "ru",
    title: "Sasak Garden Resort — Тропический оазис в Сенггиги, Ломбок",
    description:
      "Sasak Garden Resort — бутик-резорт в Сенггиги, Ломбок. Тропический сад, бассейн, ресторан, 5 минут до пляжа Бату Болонг. Оценка 9.9 на Booking.com · 113 отзывов.",
    keywords:
      "Sasak Garden Resort, Ломбок, Сенггиги, бутик-резорт, Индонезия, бассейн, тропический сад, отель, пляж Бату Болонг, острова Гили",
    ogTitle: "Sasak Garden Resort — Тропический оазис в Сенггиги",
    ogDescription:
      "Бутик-резорт в сердце Сенггиги. Тропический сад, бассейн, ресторан. Оценка 9.9 · 113 отзывов.",
    twitterTitle: "Sasak Garden Resort · Ломбок",
    twitterDescription:
      "Ваш личный тропический оазис в Сенггиги. 5 минут до пляжа, оценка 9.9 на Booking.com.",
    canonical: `${DOMAIN}/?lang=ru`,
    hreflang: [
      { hreflang: "en", href: `${DOMAIN}/` },
      { hreflang: "ru", href: `${DOMAIN}/?lang=ru` },
      { hreflang: "id", href: `${DOMAIN}/?lang=id` },
      { hreflang: "x-default", href: `${DOMAIN}/` },
    ],
  },
  id: {
    lang: "id",
    title: "Sasak Garden Resort — Oasis Tropis di Senggigi, Lombok",
    description:
      "Sasak Garden Resort adalah resort butik di Senggigi, Lombok. Taman tropis yang rimbun, kolam renang, restoran, 5 menit ke Pantai Batu Bolong. Nilai 9.9 di Booking.com · 113 ulasan.",
    keywords:
      "Sasak Garden Resort, Lombok, Senggigi, resort butik, Indonesia, kolam renang, taman tropis, hotel, Pantai Batu Bolong, Kepulauan Gili",
    ogTitle: "Sasak Garden Resort — Oasis Tropis di Senggigi",
    ogDescription:
      "Resort butik di jantung Senggigi. Taman tropis, kolam renang, restoran. Nilai 9.9 · 113 ulasan.",
    twitterTitle: "Sasak Garden Resort · Lombok",
    twitterDescription:
      "Oasis tropis pribadi Anda di Senggigi. 5 menit ke pantai, nilai 9.9 di Booking.com.",
    canonical: `${DOMAIN}/?lang=id`,
    hreflang: [
      { hreflang: "en", href: `${DOMAIN}/` },
      { hreflang: "ru", href: `${DOMAIN}/?lang=ru` },
      { hreflang: "id", href: `${DOMAIN}/?lang=id` },
      { hreflang: "x-default", href: `${DOMAIN}/` },
    ],
  },
};

// JSON-LD structured data (LodgingBusiness schema)
function buildJsonLd(lang: "en" | "ru" | "id") {
  const names = {
    en: "Sasak Garden Resort",
    ru: "Sasak Garden Resort",
    id: "Sasak Garden Resort",
  };
  const descriptions = {
    en: "Boutique tropical resort in Senggigi, Lombok. Private pool, lush garden, restaurant, 5 minutes to Batu Bolong Beach.",
    ru: "Бутик-резорт в тропическом саду в Сенггиги, Ломбок. Бассейн, ресторан, 5 минут до пляжа Бату Болонг.",
    id: "Resort butik tropis di Senggigi, Lombok. Kolam renang pribadi, taman rimbun, restoran, 5 menit ke Pantai Batu Bolong.",
  };
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: names[lang],
    description: descriptions[lang],
    url: DOMAIN,
    telephone: "+6282234601650",
    image: [
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/804044445.jpg",
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/804044446.jpg",
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/804044447.jpg",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Raya Senggigi",
      addressLocality: "Senggigi",
      addressRegion: "West Lombok",
      postalCode: "83355",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -8.4895,
      longitude: 116.0497,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "9.9",
      reviewCount: "113",
      bestRating: "10",
      worstRating: "1",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Swimming Pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Restaurant", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
    ],
    priceRange: "$$",
    checkinTime: "14:00",
    checkoutTime: "12:00",
    sameAs: [
      "https://www.booking.com/hotel/id/sasak-garden-homestay-mataram.html",
    ],
  };
}

export default function SEOHead() {
  const { lang } = useLang();
  const seo = SEO_DATA[lang];
  const jsonLd = buildJsonLd(lang);

  return (
    <Helmet>
      {/* Language */}
      <html lang={seo.lang} />

      {/* Primary SEO */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Sasak Garden Resort" />

      {/* Sitemap */}
      <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />

      {/* Canonical */}
      <link rel="canonical" href={seo.canonical} />

      {/* Hreflang for multilingual */}
      {seo.hreflang.map((h) => (
        <link key={h.hreflang} rel="alternate" hrefLang={h.hreflang} href={h.href} />
      ))}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Sasak Garden Resort" />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:title" content={seo.ogTitle} />
      <meta property="og:description" content={seo.ogDescription} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="900" />
      <meta property="og:image:alt" content="Sasak Garden Resort — pool and tropical garden" />
      <meta property="og:locale" content={lang === "ru" ? "ru_RU" : lang === "id" ? "id_ID" : "en_US"} />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="ru_RU" />
      <meta property="og:locale:alternate" content="id_ID" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@SasakGardenResort" />
      <meta name="twitter:title" content={seo.twitterTitle} />
      <meta name="twitter:description" content={seo.twitterDescription} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {/* Geo tags */}
      <meta name="geo.region" content="ID-NB" />
      <meta name="geo.placename" content="Senggigi, Lombok" />
      <meta name="geo.position" content="-8.4895;116.0497" />
      <meta name="ICBM" content="-8.4895, 116.0497" />

      {/* Theme color */}
      <meta name="theme-color" content="#0F4A38" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd, null, 2)}
      </script>
    </Helmet>
  );
}
