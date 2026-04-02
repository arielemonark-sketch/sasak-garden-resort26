/* ============================================================
   BookingSection — Sasak Garden Resort
   Standalone full-width booking section with light variant widget
   Placed between Rooms and Amenities sections
   Design: Kinfolk Tropical Editorial
   ============================================================ */

import BookingWidget from "@/components/BookingWidget";
import { useEffect, useRef, useState } from "react";

export default function BookingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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

  return (
    <section
      id="booking"
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "100px 0",
      }}
    >
      {/* Background: split — left emerald, right cream */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
        }}
      >
        <div style={{ flex: "0 0 42%", background: "#0F4A38" }} />
        <div style={{ flex: 1, background: "#EDE4D8" }} />
      </div>

      {/* Decorative botanical SVG */}
      <div
        style={{
          position: "absolute",
          left: "36%",
          top: "50%",
          transform: "translateY(-50%)",
          opacity: 0.07,
          pointerEvents: "none",
        }}
      >
        <svg width="120" height="240" viewBox="0 0 120 240" fill="none">
          <path d="M60 240 C60 240 60 40 60 0" stroke="#D4B88A" strokeWidth="2" />
          <path d="M60 180 C60 180 10 140 0 100" stroke="#D4B88A" strokeWidth="1.5" />
          <path d="M60 160 C60 160 110 120 120 80" stroke="#D4B88A" strokeWidth="1.5" />
          <path d="M60 130 C60 130 20 100 15 70" stroke="#D4B88A" strokeWidth="1.5" />
          <path d="M60 110 C60 110 100 80 105 50" stroke="#D4B88A" strokeWidth="1.5" />
          <ellipse cx="0" cy="100" rx="18" ry="10" fill="#D4B88A" opacity="0.6" transform="rotate(-30 0 100)" />
          <ellipse cx="120" cy="80" rx="18" ry="10" fill="#D4B88A" opacity="0.6" transform="rotate(30 120 80)" />
          <ellipse cx="15" cy="70" rx="14" ry="8" fill="#D4B88A" opacity="0.5" transform="rotate(-20 15 70)" />
          <ellipse cx="105" cy="50" rx="14" ry="8" fill="#D4B88A" opacity="0.5" transform="rotate(20 105 50)" />
        </svg>
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "60px",
            alignItems: "center",
          }}
          className="booking-section-grid"
        >
          {/* Left: headline */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-30px)",
              transition: "opacity 0.9s ease, transform 0.9s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#D4B88A",
                }}
              >
                Онлайн-бронирование
              </span>
              <div
                style={{
                  width: "32px",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, #D4B88A)",
                }}
              />
            </div>

            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(28px, 3.5vw, 46px)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: "#F8F5F0",
                marginBottom: "20px",
              }}
            >
              Ваш
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#D4B88A",
                }}
              >
                идеальный
              </em>
              <br />
              отдых
            </h2>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                lineHeight: 1.75,
                color: "rgba(248,245,240,0.7)",
                marginBottom: "28px",
              }}
            >
              Выберите даты и гостей — мы перенаправим вас на
              Booking.com для безопасного оформления.
            </p>

            {/* Trust badges */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { icon: "✓", text: "Бесплатная отмена до 24 ч" },
                { icon: "✓", text: "Мгновенное подтверждение" },
                { icon: "✓", text: "Лучшая цена гарантирована" },
                { icon: "✓", text: "Оценка 9.9 · 113 отзывов" },
              ].map((badge) => (
                <div
                  key={badge.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    color: "rgba(248,245,240,0.75)",
                  }}
                >
                  <span
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "rgba(212,184,138,0.2)",
                      border: "1px solid rgba(212,184,138,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      color: "#D4B88A",
                      flexShrink: 0,
                    }}
                  >
                    {badge.icon}
                  </span>
                  {badge.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: widget */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(30px)",
              transition: "opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s",
            }}
          >
            <BookingWidget variant="section" />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .booking-section-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
