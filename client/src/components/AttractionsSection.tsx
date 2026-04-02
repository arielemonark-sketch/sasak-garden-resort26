/* ============================================================
   AttractionsSection — Sasak Garden Resort
   Nearby attractions and leisure activities around Senggigi
   Design: Kinfolk Tropical Editorial
   Colors: Deep emerald bg #0F4A38, cream cards, gold accents
   Fonts: Playfair Display (headings) + DM Sans (body)
   ============================================================ */

import { useLang } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";
import type { ReactElement } from "react";

/* ---- Category icons ---- */
const ICONS: Record<string, ReactElement> = {
  beaches: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 8c0 4.142-5.5 11-5.5 11S6.5 12.142 6.5 8a5.5 5.5 0 0111 0z"/>
      <circle cx="12" cy="8" r="2"/>
    </svg>
  ),
  diving: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h18M3 6l9 6 9-6M3 18l9-6 9 6"/>
    </svg>
  ),
  culture: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/>
    </svg>
  ),
  islands: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M3.6 9h16.8M3.6 15h16.8M12 3a14.5 14.5 0 010 18M12 3a14.5 14.5 0 000 18"/>
    </svg>
  ),
  adventure: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l4-8 4 4 4-6 4 10H3z"/>
    </svg>
  ),
  dining: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"/>
    </svg>
  ),
};

/* ---- Duration icon ---- */
const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 7v5l3 3"/>
  </svg>
);

/* ---- Distance icon ---- */
const PinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5"/>
  </svg>
);

/* ---- Unsplash images per category ---- */
const CATEGORY_IMAGES: Record<string, string> = {
  beaches:   "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
  diving:    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
  islands:   "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80",
  adventure: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
  culture:   "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80",
  dining:    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
};

export default function AttractionsSection() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const categoryKeys = ["all", "beaches", "diving", "islands", "adventure", "culture"] as const;

  const filteredItems = activeFilter === "all"
    ? t.attractions.items
    : t.attractions.items.filter((item) => item.category === activeFilter);

  const getCategoryLabel = (key: string) => {
    if (key === "all") return t.nav.about === "О нас" ? "Все" : "All";
    return t.attractions.categories[key as keyof typeof t.attractions.categories] ?? key;
  };

  return (
    <section
      id="attractions"
      ref={sectionRef}
      style={{
        background: "#0F4A38",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(212,184,138,0.06) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(212,184,138,0.04) 0%, transparent 40%)`,
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>

        {/* ---- Header ---- */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "end",
            marginBottom: "64px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
          className="attr-header"
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#D4B88A",
                }}
              >
                {t.attractions.sectionNum}
              </span>
              <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, #D4B88A, transparent)" }} />
            </div>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(36px, 4.5vw, 60px)",
                fontWeight: 700,
                lineHeight: 1.05,
                color: "#F8F5F0",
                margin: 0,
              }}
            >
              {t.attractions.title1}
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "#D4B88A" }}>
                {t.attractions.title2}
              </em>
            </h2>
          </div>
          <div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "17px",
                lineHeight: 1.8,
                color: "rgba(248,245,240,0.7)",
                margin: "0 0 32px",
              }}
            >
              {t.attractions.subtitle}
            </p>
            <a
              href="https://wa.me/6281917776161?text=Hello%2C%20I%20would%20like%20to%20book%20an%20excursion"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 28px",
                background: "transparent",
                border: "1px solid rgba(212,184,138,0.6)",
                color: "#D4B88A",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#D4B88A";
                e.currentTarget.style.color = "#0F4A38";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#D4B88A";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.attractions.ctaBook}
            </a>
          </div>
        </div>

        {/* ---- Filter tabs ---- */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "48px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
          }}
        >
          {categoryKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                padding: "9px 18px",
                background: activeFilter === key ? "#D4B88A" : "transparent",
                border: `1px solid ${activeFilter === key ? "#D4B88A" : "rgba(212,184,138,0.3)"}`,
                color: activeFilter === key ? "#0F4A38" : "rgba(248,245,240,0.65)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                fontWeight: activeFilter === key ? 600 : 400,
                letterSpacing: "0.08em",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== key) {
                  e.currentTarget.style.borderColor = "rgba(212,184,138,0.7)";
                  e.currentTarget.style.color = "#F8F5F0";
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== key) {
                  e.currentTarget.style.borderColor = "rgba(212,184,138,0.3)";
                  e.currentTarget.style.color = "rgba(248,245,240,0.65)";
                }
              }}
            >
              {key !== "all" && (
                <span style={{ opacity: 0.8 }}>
                  {ICONS[key]}
                </span>
              )}
              {getCategoryLabel(key)}
            </button>
          ))}
        </div>

        {/* ---- Cards grid ---- */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
          className="attr-grid"
        >
          {filteredItems.map((item, i) => (
            <AttractionCard
              key={`${item.title}-${i}`}
              item={item}
              categoryLabel={t.attractions.categories[item.category as keyof typeof t.attractions.categories] ?? item.category}
              distLabel={t.attractions.distLabel}
              visible={visible}
              delay={Math.min(i * 0.08, 0.5)}
            />
          ))}
        </div>

        {/* ---- Distance legend ---- */}
        <div
          style={{
            marginTop: "64px",
            paddingTop: "48px",
            borderTop: "1px solid rgba(212,184,138,0.15)",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "32px",
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease 0.6s",
          }}
          className="attr-legend"
        >
          {[
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4B88A" strokeWidth="1.5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
              ),
              val: "5 min",
              label: t.nav.about === "О нас" ? "Пляж Бату-Болонг" : "Batu Bolong Beach",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4B88A" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M3.6 9h16.8M3.6 15h16.8M12 3a14.5 14.5 0 010 18M12 3a14.5 14.5 0 000 18"/>
                </svg>
              ),
              val: t.nav.about === "О нас" ? "2 часа" : "2 hours",
              label: t.nav.about === "О нас" ? "Острова Гили" : "Gili Islands",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4B88A" strokeWidth="1.5">
                  <path d="M3 17l4-8 4 4 4-6 4 10H3z"/>
                </svg>
              ),
              val: t.nav.about === "О нас" ? "2 часа" : "2 hours",
              label: t.nav.about === "О нас" ? "Вулкан Ринджани" : "Mount Rinjani",
            },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  border: "1px solid rgba(212,184,138,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {stat.icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#F8F5F0",
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  {stat.val}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    color: "rgba(248,245,240,0.5)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .attr-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .attr-header { grid-template-columns: 1fr !important; gap: 32px !important; }
          .attr-grid { grid-template-columns: 1fr !important; }
          .attr-legend { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}

/* ---- Attraction Card ---- */
interface AttractionCardProps {
  item: { category: string; title: string; desc: string; dist: string; duration: string };
  categoryLabel: string;
  distLabel: string;
  visible: boolean;
  delay: number;
}

function AttractionCard({ item, categoryLabel, distLabel, visible, delay }: AttractionCardProps) {
  const [hovered, setHovered] = useState(false);
  const imgSrc = CATEGORY_IMAGES[item.category] ?? CATEGORY_IMAGES.beaches;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(248,245,240,0.04)",
        border: "1px solid rgba(212,184,138,0.12)",
        overflow: "hidden",
        cursor: "default",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s, border-color 0.3s ease, background 0.3s ease`,
        borderColor: hovered ? "rgba(212,184,138,0.35)" : "rgba(212,184,138,0.12)",
      } as React.CSSProperties}
    >
      {/* Image */}
      <div
        style={{
          height: "200px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={imgSrc}
          alt={item.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          loading="lazy"
        />
        {/* Category badge */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "5px 12px",
            background: "rgba(15,74,56,0.85)",
            backdropFilter: "blur(8px)",
            color: "#D4B88A",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ opacity: 0.9 }}>{ICONS[item.category]}</span>
          {categoryLabel}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "22px 24px 24px" }}>
        <h3
          className="font-serif"
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#F8F5F0",
            margin: "0 0 10px",
            lineHeight: 1.3,
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            lineHeight: 1.75,
            color: "rgba(248,245,240,0.6)",
            margin: "0 0 18px",
          }}
        >
          {item.desc}
        </p>

        {/* Meta: distance + duration */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            paddingTop: "14px",
            borderTop: "1px solid rgba(212,184,138,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#D4B88A",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            <PinIcon />
            {item.dist}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "rgba(248,245,240,0.45)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
            }}
          >
            <ClockIcon />
            {item.duration}
          </div>
        </div>
      </div>
    </div>
  );
}
