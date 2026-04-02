/* ============================================================
   GallerySection — Sasak Garden Resort
   Asymmetric masonry gallery with Booking.com CDN photos
   ============================================================ */

import { useLang } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";

const PHOTO_IDS = [
  { id: "804044336", k: "2131400f8608042488b89cd4c58eb20709694f2cbc403f7116cee260befef121", alt: "Бассейн" },
  { id: "774374096", k: "e65f26e52e07061158cb45eb30a8ae7032ce14de399d21132522e6b84ad04c01", alt: "Номер" },
  { id: "760126503", k: "127f92680d629bfcc85815e3471bda02a9ed778b1ca5417596893ab6e96c80dc", alt: "Ванная" },
  { id: "804044445", k: "0ed55ec1926fe7be152577ee29598bcc5a50d44abc7ce97d21a32d54552d5b39", alt: "Бассейн" },
  { id: "758448525", k: "1def9e8cf73f55b62debd8581b22ce8b911a71037025011e5cc33875f3ede2ad", alt: "Гости" },
  { id: "774375386", k: "46ee67c0722787af875cc66808f278557ad6f544fccc5fbc1ed20910d2bf13c2", alt: "Телевизор" },
  { id: "760126813", k: "98483d6cfab109839de8036942c08757ec3f37411edd3ff1e5ccf4672185aa4e", alt: "Сад" },
  { id: "758006404", k: "50ddef816134bc1936673370cb715f50dfb8879598f20af06806d43c380633b2", alt: "Номер" },
  { id: "804044542", k: "a3c3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3e3", alt: "Вид" },
  { id: "759825111", k: "b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1", alt: "Сад" },
  { id: "778744177", k: "c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2", alt: "Терраса" },
  { id: "774379336", k: "d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3", alt: "Номер" },
];

// Use only the ones with known keys
const GALLERY_PHOTOS = [
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/804044336.jpg?k=2131400f8608042488b89cd4c58eb20709694f2cbc403f7116cee260befef121&o=",
    alt: "Бассейн Sasak Garden Resort",
    span: "tall", // 2 rows
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max500/774374096.jpg?k=e65f26e52e07061158cb45eb30a8ae7032ce14de399d21132522e6b84ad04c01&o=",
    alt: "Номер с кроватью king-size",
    span: "normal",
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max500/760126503.jpg?k=127f92680d629bfcc85815e3471bda02a9ed778b1ca5417596893ab6e96c80dc&o=",
    alt: "Ванная комната",
    span: "normal",
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max300/758448525.jpg?k=1def9e8cf73f55b62debd8581b22ce8b911a71037025011e5cc33875f3ede2ad&o=",
    alt: "Гости резорта",
    span: "wide", // 2 cols
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max300/774375386.jpg?k=46ee67c0722787af875cc66808f278557ad6f544fccc5fbc1ed20910d2bf13c2&o=",
    alt: "Smart TV в номере",
    span: "normal",
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max300/760126813.jpg?k=98483d6cfab109839de8036942c08757ec3f37411edd3ff1e5ccf4672185aa4e&o=",
    alt: "Тропический сад",
    span: "normal",
  },
  {
    url: "https://cf.bstatic.com/xdata/images/hotel/max300/758006404.jpg?k=50ddef816134bc1936673370cb715f50dfb8879598f20af06806d43c380633b2&o=",
    alt: "Уютный номер",
    span: "normal",
  },
  {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/garden-morning-jRuFzipAJysR94X6cBhAsx.webp",
    alt: "Утро в тропическом саду",
    span: "tall",
  },
  {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/room-interior-GPNtYKYz8tg3Bcj9FMtdzZ.webp",
    alt: "Интерьер номера",
    span: "normal",
  },
  {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/restaurant-terrace-8zRSRouaYRQzWZ2AzYBndn.webp",
    alt: "Ресторан на террасе",
    span: "wide",
  },
];

export default function GallerySection() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

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
            marginBottom: "60px",
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

        {/* Asymmetric gallery grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "280px",
            gap: "12px",
          }}
          className="gallery-grid"
        >
          {GALLERY_PHOTOS.map((photo, i) => (
            <div
              key={i}
              className="gallery-item"
              onClick={() => setLightbox(photo.url)}
              style={{
                gridColumn: photo.span === "wide" ? "span 2" : "span 1",
                gridRow: photo.span === "tall" ? "span 2" : "span 1",
                cursor: "pointer",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.8s ease ${i * 0.06}s, transform 0.8s ease ${i * 0.06}s`,
              }}
            >
              <img
                src={photo.url}
                alt={photo.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                loading="lazy"
                onError={(e) => {
                  // Fallback to generated image if Booking CDN fails
                  (e.target as HTMLImageElement).src = "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/hero-pool-Pue6srXm3JVMUm9PHDPzym.webp";
                }}
              />
              <div className="gallery-overlay">
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    color: "#F8F5F0",
                    letterSpacing: "0.1em",
                  }}
                >
                  {photo.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,20,15,0.95)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <img
            src={lightbox}
            alt="Фото резорта"
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              objectFit: "contain",
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute",
              top: "20px",
              right: "24px",
              background: "none",
              border: "none",
              color: "#F8F5F0",
              fontSize: "28px",
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
      )}

      <style>{`
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
