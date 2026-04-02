/* ============================================================
   ContactSection — Sasak Garden Resort
   Location info, contact details, booking CTA
   ============================================================ */

import { useEffect, useRef, useState } from "react";

export default function ContactSection() {
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
      id="contact"
      ref={sectionRef}
      style={{
        background: "#F8F5F0",
        padding: "120px 0 0",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            marginBottom: "70px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
            <span className="section-label">07 — Расположение</span>
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
            Найдите нас
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "#2C1810" }}>
              в Сенггиги
            </em>
          </h2>
        </div>

        {/* Content grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "60px",
            marginBottom: "0",
          }}
          className="contact-grid"
        >
          {/* Left: contact info */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-30px)",
              transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
            }}
          >
            {/* Address */}
            <div style={{ marginBottom: "40px" }}>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C9A46F",
                  marginBottom: "12px",
                }}
              >
                Адрес
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: "#2C1810",
                  margin: 0,
                }}
              >
                Jl. Raya Senggigi No. 14
                <br />
                Senggigi, Lombok Barat
                <br />
                Nusa Tenggara Barat 83355
                <br />
                Индонезия
              </p>
            </div>

            {/* Phone */}
            <div style={{ marginBottom: "40px" }}>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C9A46F",
                  marginBottom: "12px",
                }}
              >
                Телефон
              </div>
              <a
                href="tel:+6281917776161"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "18px",
                  color: "#0F4A38",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                +62 819-1777-6161
              </a>
              <a
                href="https://wa.me/6281917776161"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  color: "#25D366",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>

            {/* Email */}
            <div style={{ marginBottom: "40px" }}>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C9A46F",
                  marginBottom: "12px",
                }}
              >
                Email
              </div>
              <a
                href="mailto:sasakgardenresort@gmail.com"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "16px",
                  color: "#0F4A38",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                sasakgardenresort@gmail.com
              </a>
            </div>

            {/* Check-in info */}
            <div
              style={{
                padding: "24px",
                background: "#EDE4D8",
                borderLeft: "3px solid #D4B88A",
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C9A46F",
                  marginBottom: "16px",
                }}
              >
                Заезд / Выезд
              </div>
              <div style={{ display: "flex", gap: "32px" }}>
                <div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#0F4A38",
                    }}
                  >
                    14:00
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      color: "#999",
                    }}
                  >
                    Заезд
                  </div>
                </div>
                <div
                  style={{
                    width: "1px",
                    background: "rgba(212,184,138,0.4)",
                  }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#0F4A38",
                    }}
                  >
                    12:00
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      color: "#999",
                    }}
                  >
                    Выезд
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(30px)",
              transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
              overflow: "hidden",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.8!2d116.0434!3d-8.4867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcdb9e3a4c5e5c3%3A0x5c3e5e5e5e5e5e5e!2sSenggigi%2C%20Lombok!5e0!3m2!1sru!2sid!4v1680000000000!5m2!1sru!2sid"
              width="100%"
              height="420"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Расположение Sasak Garden Resort"
            />
            {/* Nearby attractions */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1px",
                background: "rgba(212,184,138,0.2)",
                marginTop: "1px",
              }}
            >
              {[
                { place: "Пляж Бату-Болонг", dist: "5 мин пешком" },
                { place: "Центр Сенггиги", dist: "10 мин пешком" },
                { place: "Аэропорт Ломбок", dist: "45 мин на авто" },
              ].map((item) => (
                <div
                  key={item.place}
                  style={{
                    padding: "16px",
                    background: "#EDE4D8",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#2C1810",
                      marginBottom: "4px",
                    }}
                  >
                    {item.place}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      color: "#C9A46F",
                    }}
                  >
                    {item.dist}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA banner */}
      <div
        style={{
          marginTop: "100px",
          background: "#0F4A38",
          padding: "80px 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#D4B88A",
                display: "block",
                marginBottom: "24px",
              }}
            >
              Ваш тропический отдых ждёт
            </span>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 700,
                lineHeight: 1.05,
                color: "#F8F5F0",
                marginBottom: "32px",
              }}
            >
              Забронируйте
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "#D4B88A" }}>
                {" "}сейчас
              </em>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "18px",
                lineHeight: 1.7,
                color: "rgba(248,245,240,0.75)",
                maxWidth: "480px",
                margin: "0 auto 40px",
              }}
            >
              Оценка 9.9 · 113 отзывов · Лучшая цена гарантирована на Booking.com
            </p>
            <a
              href="https://www.booking.com/hotel/id/sasak-garden-homestay-mataram.ru.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "18px 48px",
                background: "#D4B88A",
                color: "#2C1810",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F8F5F0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#D4B88A";
              }}
            >
              Проверить наличие мест
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
