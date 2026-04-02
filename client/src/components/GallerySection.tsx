/* ============================================================
   GallerySection — Sasak Garden Resort
   Design: Kinfolk Tropical Editorial
   16 high-quality photos from Booking.com CDN (max1280x900)
   Asymmetric masonry grid with fullscreen lightbox + navigation
   ============================================================ */

import { useLang } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";

// All URLs use max1280x900 for maximum quality — keys verified from live Booking.com page
const GALLERY_PHOTOS = [
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/804044336.jpg?k=2131400f8608042488b89cd4c58eb20709694f2cbc403f7116cee260befef121&o=",
    alt: "Бассейн Sasak Garden Resort",
    altEn: "Sasak Garden Resort Pool",
    span: "tall",
    category: "pool",
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/774374096.jpg?k=e65f26e52e07061158cb45eb30a8ae7032ce14de399d21132522e6b84ad04c01&o=",
    alt: "Номер с кроватью king-size",
    altEn: "King-size bedroom",
    span: "normal",
    category: "room",
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/760126503.jpg?k=127f92680d629bfcc85815e3471bda02a9ed778b1ca5417596893ab6e96c80dc&o=",
    alt: "Ванная комната",
    altEn: "Bathroom",
    span: "normal",
    category: "room",
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/804044445.jpg?k=0ed55ec1926fe7be152577ee29598bcc5a50d44abc7ce97d21a32d54552d5b39&o=",
    alt: "Вид на бассейн и сад",
    altEn: "Pool and garden view",
    span: "wide",
    category: "pool",
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/758448525.jpg?k=1def9e8cf73f55b62debd8581b22ce8b911a71037025011e5cc33875f3ede2ad&o=",
    alt: "Гости у бассейна",
    altEn: "Guests by the pool",
    span: "normal",
    category: "pool",
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/774375386.jpg?k=46ee67c0722787af875cc66808f278557ad6f544fccc5fbc1ed20910d2bf13c2&o=",
    alt: "Интерьер номера",
    altEn: "Room interior",
    span: "normal",
    category: "room",
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/760126813.jpg?k=98483d6cfab109839de8036942c08757ec3f37411edd3ff1e5ccf4672185aa4e&o=",
    alt: "Тропический сад",
    altEn: "Tropical garden",
    span: "tall",
    category: "garden",
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/758006404.jpg?k=50ddef816134bc1936673370cb715f50dfb8879598f20af06806d43c380633b2&o=",
    alt: "Уютный номер",
    altEn: "Cozy room",
    span: "normal",
    category: "room",
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/804044542.jpg?k=baf859af59699b6c96f3996c4f7d8859d0e6c31afe940a6bd6feb7cf2ea136d1&o=",
    alt: "Вид с территории",
    altEn: "Resort view",
    span: "normal",
    category: "garden",
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/759825111.jpg?k=f431b439ea58e1ea5917142aed55a59e12cf06b95ed74db7611122d7743f045c&o=",
    alt: "Сад и пальмы",
    altEn: "Garden and palms",
    span: "wide",
    category: "garden",
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/778744177.jpg?k=84fe31bfd8fd55ea2dc4f960c5138723122bc14e4b4e5979c0fce4170a0672a5&o=",
    alt: "Терраса резорта",
    altEn: "Resort terrace",
    span: "normal",
    category: "garden",
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/774379336.jpg?k=76f9bfa7a88df2ab1a9a81647be11188a6d0bcc81d007f7dcb2bcb8a1ed1cf0a&o=",
    alt: "Спальня с видом на сад",
    altEn: "Bedroom with garden view",
    span: "normal",
    category: "room",
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/774377383.jpg?k=3a3d23c0481662aa547b114e82337a68d0a528c7c98e4633bd09534c897d4ca1&o=",
    alt: "Зона отдыха у бассейна",
    altEn: "Pool lounge area",
    span: "tall",
    category: "pool",
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/774376701.jpg?k=dcaaab187b20fdc2374e5a42f94a42dcf428f0bf4cc89a5530879c949913d5ab&o=",
    alt: "Ресторан и завтрак",
    altEn: "Restaurant & breakfast",
    span: "normal",
    category: "food",
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/764840928.jpg?k=a992ebdc1629b67a4f65597f5e19655fe43cdfd3ea3320f397425d4086f2b8ec&o=",
    alt: "Тропический пейзаж",
    altEn: "Tropical landscape",
    span: "normal",
    category: "garden",
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/758006985.jpg?k=f6a9f931976a697f7f3ac4169dad6604ae68e2074642b881c36347474f81bfa2&o=",
    alt: "Уютный уголок отдыха",
    altEn: "Cozy relaxation corner",
    span: "wide",
    category: "room",
  },
];

const FALLBACK = "https://cf.bstatic.com/xdata/images/hotel/max1280x900/804044336.jpg?k=2131400f8608042488b89cd4c58eb20709694f2cbc403f7116cee260befef121&o=";

export default function GallerySection() {
  const { t, lang } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const categories = [
    { key: "all", ru: "Все", en: "All" },
    { key: "pool", ru: "Бассейн", en: "Pool" },
    { key: "room", ru: "Номера", en: "Rooms" },
    { key: "garden", ru: "Сад", en: "Garden" },
    { key: "food", ru: "Ресторан", en: "Restaurant" },
  ];

  const filtered = filter === "all" ? GALLERY_PHOTOS : GALLERY_PHOTOS.filter(p => p.category === filter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowRight") setLightboxIdx(i => i !== null ? (i + 1) % filtered.length : null);
      if (e.key === "ArrowLeft") setLightboxIdx(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIdx, filtered.length]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      style={{
        background: "#F8F5F0",
        padding: "100px 0 120px",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "40px",
            flexWrap: "wrap",
            gap: "24px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <span className="section-label">{t.gallery.sectionNum}</span>
              <div className="gold-line" style={{ width: "40px" }} />
            </div>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: "#0F4A38",
                margin: 0,
              }}
            >
              {t.gallery.title1}
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "#2C1810" }}>
                {t.gallery.title2}
              </em>
            </h2>
          </div>
          <a
            href="https://www.booking.com/hotel/id/sasak-garden-homestay-mataram.ru.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-booking"
          >
            {t.gallery.viewAll}
          </a>
        </div>

        {/* Category filter tabs */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "32px",
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.2s",
          }}
        >
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              style={{
                padding: "8px 20px",
                borderRadius: "100px",
                border: filter === cat.key ? "1.5px solid #0F4A38" : "1.5px solid #D4B88A",
                background: filter === cat.key ? "#0F4A38" : "transparent",
                color: filter === cat.key ? "#F8F5F0" : "#0F4A38",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.05em",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {lang === "ru" ? cat.ru : cat.en}
            </button>
          ))}
        </div>

        {/* Asymmetric gallery grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "280px",
            gap: "10px",
          }}
          className="gallery-grid"
        >
          {filtered.map((photo, i) => (
            <div
              key={photo.url}
              className="gallery-item"
              onClick={() => setLightboxIdx(i)}
              style={{
                gridColumn: photo.span === "wide" ? "span 2" : "span 1",
                gridRow: photo.span === "tall" ? "span 2" : "span 1",
                cursor: "pointer",
                borderRadius: "4px",
                overflow: "hidden",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.7s ease ${i * 0.05}s, transform 0.7s ease ${i * 0.05}s`,
              }}
            >
              <img
                src={photo.url}
                alt={lang === "ru" ? photo.alt : photo.altEn}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.5s ease",
                }}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK;
                }}
              />
              <div className="gallery-overlay">
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    color: "#F8F5F0",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {lang === "ru" ? photo.alt : photo.altEn}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Photo count */}
        <div
          style={{
            textAlign: "center",
            marginTop: "32px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            color: "#8A7B6B",
            letterSpacing: "0.08em",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}
        >
          {lang === "ru"
            ? `Показано ${filtered.length} из 69+ фотографий резорта`
            : `Showing ${filtered.length} of 69+ resort photos`}
          {" · "}
          <a
            href="https://www.booking.com/hotel/id/sasak-garden-homestay-mataram.ru.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0F4A38", textDecoration: "underline" }}
          >
            {lang === "ru" ? "Смотреть все на Booking.com" : "View all on Booking.com"}
          </a>
        </div>
      </div>

      {/* Fullscreen Lightbox with navigation */}
      {lightboxIdx !== null && (
        <div
          onClick={() => setLightboxIdx(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(5,15,10,0.97)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          {/* Main image */}
          <img
            src={filtered[lightboxIdx].url}
            alt={lang === "ru" ? filtered[lightboxIdx].alt : filtered[lightboxIdx].altEn}
            style={{
              maxWidth: "88vw",
              maxHeight: "82vh",
              objectFit: "contain",
              borderRadius: "2px",
              boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Caption */}
          <div
            style={{
              position: "absolute",
              bottom: "32px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "#F8F5F0",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              opacity: 0.7,
              whiteSpace: "nowrap",
            }}
          >
            {lang === "ru" ? filtered[lightboxIdx].alt : filtered[lightboxIdx].altEn}
            {" · "}{lightboxIdx + 1} / {filtered.length}
          </div>

          {/* Close */}
          <button
            onClick={() => setLightboxIdx(null)}
            style={{
              position: "absolute",
              top: "20px",
              right: "24px",
              background: "none",
              border: "none",
              color: "#F8F5F0",
              fontSize: "32px",
              cursor: "pointer",
              lineHeight: 1,
              opacity: 0.8,
            }}
          >
            ×
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIdx(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null); }}
            style={{
              position: "absolute",
              left: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(248,245,240,0.1)",
              border: "1px solid rgba(248,245,240,0.2)",
              color: "#F8F5F0",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
            }}
          >
            ‹
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIdx(i => i !== null ? (i + 1) % filtered.length : null); }}
            style={{
              position: "absolute",
              right: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(248,245,240,0.1)",
              border: "1px solid rgba(248,245,240,0.2)",
              color: "#F8F5F0",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
            }}
          >
            ›
          </button>
        </div>
      )}

      <style>{`
        .gallery-item:hover img {
          transform: scale(1.04);
        }
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: 200px !important;
          }
        }
        @media (max-width: 480px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
            grid-auto-rows: 220px !important;
          }
          .gallery-grid > div {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
