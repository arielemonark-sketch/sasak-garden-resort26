/* ============================================================
   SpecialOffersSection — Sasak Garden Resort
   Design: Kinfolk Tropical Editorial
   Three exclusive packages: Romantic Weekend, Family Holiday, Long Stay
   Dark emerald background with gold accents, animated card reveals
   ============================================================ */

import { useLang } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";

// Booking.com base URL with hotel ID
const BOOKING_URL = "https://www.booking.com/hotel/id/sasak-garden-homestay-mataram.html";

// Package-specific icons (inline SVG)
const PackageIcon = ({ id }: { id: string }) => {
  if (id === "romantic") return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 28s-12-7.5-12-15a7 7 0 0 1 12-4.9A7 7 0 0 1 28 13c0 7.5-12 15-12 15z" stroke="#D4B88A" strokeWidth="1.5" fill="none"/>
    </svg>
  );
  if (id === "family") return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="10" cy="9" r="3" stroke="#D4B88A" strokeWidth="1.5"/>
      <circle cx="22" cy="9" r="3" stroke="#D4B88A" strokeWidth="1.5"/>
      <circle cx="16" cy="22" r="2.5" stroke="#D4B88A" strokeWidth="1.5"/>
      <path d="M4 22c0-3.3 2.7-6 6-6h2M26 22c0-3.3-2.7-6-6-6h-2M13 28c0-2.2 1.3-4 3-4s3 1.8 3 4" stroke="#D4B88A" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="14" width="24" height="14" rx="2" stroke="#D4B88A" strokeWidth="1.5"/>
      <path d="M10 14V10a6 6 0 0 1 12 0v4" stroke="#D4B88A" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="16" cy="21" r="2" fill="#D4B88A"/>
    </svg>
  );
};

// Checkmark icon
const Check = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="7" cy="7" r="6.5" stroke="#D4B88A" strokeWidth="1"/>
    <path d="M4.5 7l2 2 3-3" stroke="#D4B88A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function SpecialOffersSection() {
  const { t, lang } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);

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

  const handleBook = (pkgId: string) => {
    const url = new URL(BOOKING_URL);
    url.searchParams.set("aid", "898224");
    url.searchParams.set("label", `special-offer-${pkgId}`);
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };

  // Spots remaining (visual urgency)
  const spotsMap: Record<string, number> = { romantic: 3, family: 5, longstay: 8 };

  return (
    <section
      id="special-offers"
      ref={sectionRef}
      style={{
        background: "linear-gradient(160deg, #0A2E20 0%, #0F4A38 50%, #0A2E20 100%)",
        padding: "100px 0 120px",
        overflow: "hidden",
        position: "relative",
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
        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "64px",
            flexWrap: "wrap",
            gap: "24px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#D4B88A",
                  fontWeight: 500,
                }}
              >
                {t.specialOffers.sectionNum}
              </span>
              <div style={{ width: "40px", height: "1px", background: "#D4B88A", opacity: 0.5 }} />
            </div>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 700,
                lineHeight: 1.05,
                color: "#F8F5F0",
                margin: 0,
              }}
            >
              {t.specialOffers.title1}
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "#D4B88A" }}>
                {t.specialOffers.title2}
              </em>
            </h2>
          </div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              lineHeight: 1.7,
              color: "rgba(248,245,240,0.65)",
              maxWidth: "380px",
              margin: 0,
            }}
          >
            {t.specialOffers.subtitle}
          </p>
        </div>

        {/* Package cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
          className="offers-grid"
        >
          {t.specialOffers.packages.map((pkg, i) => {
            const isRomantic = pkg.id === "romantic";
            const isActive = activeCard === pkg.id;

            return (
              <div
                key={pkg.id}
                onMouseEnter={() => setActiveCard(pkg.id)}
                onMouseLeave={() => setActiveCard(null)}
                style={{
                  background: isRomantic
                    ? "linear-gradient(145deg, rgba(212,184,138,0.15) 0%, rgba(212,184,138,0.05) 100%)"
                    : "rgba(248,245,240,0.04)",
                  border: isRomantic
                    ? "1px solid rgba(212,184,138,0.4)"
                    : "1px solid rgba(248,245,240,0.1)",
                  borderRadius: "8px",
                  padding: "36px 32px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0",
                  cursor: "pointer",
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? isActive ? "translateY(-6px)" : "translateY(0)"
                    : "translateY(40px)",
                  transition: `opacity 0.7s ease ${i * 0.12}s, transform ${isActive ? "0.25s" : "0.7s"} ease ${isActive ? "0s" : `${i * 0.12}s`}, box-shadow 0.25s ease, border-color 0.25s ease`,
                  boxShadow: isActive
                    ? "0 24px 60px rgba(0,0,0,0.4)"
                    : isRomantic
                    ? "0 8px 32px rgba(0,0,0,0.2)"
                    : "none",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Popular badge */}
                {isRomantic && (
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                      background: "#D4B88A",
                      color: "#0A2E20",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      borderRadius: "100px",
                    }}
                  >
                    {pkg.tag}
                  </div>
                )}

                {/* Icon */}
                <div style={{ marginBottom: "20px" }}>
                  <PackageIcon id={pkg.id} />
                </div>

                {/* Package type tag */}
                {!isRomantic && (
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#D4B88A",
                      fontWeight: 500,
                      marginBottom: "8px",
                      display: "block",
                    }}
                  >
                    {pkg.tag}
                  </span>
                )}

                {/* Title */}
                <h3
                  className="font-serif"
                  style={{
                    fontSize: "clamp(22px, 2vw, 28px)",
                    fontWeight: 700,
                    color: "#F8F5F0",
                    margin: "0 0 4px",
                    lineHeight: 1.2,
                  }}
                >
                  {pkg.title}
                </h3>

                {/* Subtitle */}
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    color: "rgba(248,245,240,0.5)",
                    margin: "0 0 20px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {pkg.subtitle}
                </p>

                {/* Meta info row */}
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    marginBottom: "24px",
                    paddingBottom: "24px",
                    borderBottom: "1px solid rgba(248,245,240,0.1)",
                  }}
                >
                  {[
                    { icon: "🌙", text: pkg.duration },
                    { icon: "👥", text: pkg.guests },
                  ].map((item, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontSize: "14px" }}>{item.icon}</span>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "12px",
                          color: "rgba(248,245,240,0.6)",
                        }}
                      >
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Highlights list */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    flex: 1,
                  }}
                >
                  {pkg.highlights.map((item, j) => (
                    <li
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        color: "rgba(248,245,240,0.75)",
                        lineHeight: 1.4,
                      }}
                    >
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Price block */}
                <div
                  style={{
                    marginBottom: "20px",
                    paddingTop: "20px",
                    borderTop: "1px solid rgba(248,245,240,0.1)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(28px, 2.5vw, 36px)",
                      fontWeight: 700,
                      color: "#D4B88A",
                      lineHeight: 1,
                      marginBottom: "4px",
                    }}
                  >
                    {pkg.price}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      color: "rgba(248,245,240,0.4)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {pkg.priceNote}
                  </div>
                </div>

                {/* Spots remaining */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: spotsMap[pkg.id] <= 3 ? "#E8A87C" : "#6BAE75",
                      animation: "pulse 2s infinite",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      color: spotsMap[pkg.id] <= 3 ? "#E8A87C" : "rgba(248,245,240,0.5)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {t.specialOffers.limitedLabel}: {spotsMap[pkg.id]}
                  </span>
                </div>

                {/* CTA button */}
                <button
                  onClick={() => handleBook(pkg.id)}
                  style={{
                    width: "100%",
                    padding: "14px 24px",
                    background: isRomantic ? "#D4B88A" : "transparent",
                    border: isRomantic ? "none" : "1.5px solid rgba(212,184,138,0.5)",
                    borderRadius: "4px",
                    color: isRomantic ? "#0A2E20" : "#D4B88A",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isRomantic) {
                      (e.target as HTMLButtonElement).style.background = "rgba(212,184,138,0.15)";
                      (e.target as HTMLButtonElement).style.borderColor = "#D4B88A";
                    } else {
                      (e.target as HTMLButtonElement).style.background = "#C9A870";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isRomantic) {
                      (e.target as HTMLButtonElement).style.background = "transparent";
                      (e.target as HTMLButtonElement).style.borderColor = "rgba(212,184,138,0.5)";
                    } else {
                      (e.target as HTMLButtonElement).style.background = "#D4B88A";
                    }
                  }}
                >
                  {pkg.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div
          style={{
            textAlign: "center",
            marginTop: "48px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              color: "rgba(248,245,240,0.4)",
              letterSpacing: "0.05em",
              margin: "0 0 8px",
            }}
          >
            {lang === "ru"
              ? "Все пакеты бронируются через Booking.com · Бесплатная отмена · Мгновенное подтверждение"
              : lang === "id" ? "Semua paket dipesan via Booking.com · Pembatalan gratis · Konfirmasi instan"
              : "All packages booked via Booking.com · Free cancellation · Instant confirmation"}
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              color: "#D4B88A",
              textDecoration: "underline",
              letterSpacing: "0.08em",
            }}
          >
            {lang === "ru" ? "Смотреть все тарифы на Booking.com →" : lang === "id" ? "Lihat semua tarif di Booking.com →" : "View all rates on Booking.com →"}
          </a>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 1024px) {
          .offers-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .offers-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
