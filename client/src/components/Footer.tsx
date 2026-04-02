/* ============================================================
   Footer — Sasak Garden Resort
   Minimal editorial footer with links and social
   ============================================================ */

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer
      style={{
        background: "#2C1810",
        padding: "60px 0 32px",
      }}
    >
      <div className="container">
        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "48px",
            paddingBottom: "48px",
            borderBottom: "1px solid rgba(212,184,138,0.15)",
            marginBottom: "32px",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div
              className="font-serif"
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#F8F5F0",
                marginBottom: "4px",
              }}
            >
              Sasak Garden Resort
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                fontWeight: 400,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#D4B88A",
                marginBottom: "20px",
              }}
            >
              Senggigi · Lombok · Indonesia
            </div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                lineHeight: 1.75,
                color: "rgba(248,245,240,0.55)",
                maxWidth: "280px",
              }}
            >
              Бутик-резорт в тропическом саду Сенггиги.
              Оценка 9.9 · 113 отзывов на Booking.com.
            </p>
            {/* Social links */}
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              {[
                {
                  name: "Instagram",
                  href: "https://www.instagram.com/sasakgardenresort",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  ),
                },
                {
                  name: "Facebook",
                  href: "https://www.facebook.com/sasakgardenresort",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  ),
                },
                {
                  name: "WhatsApp",
                  href: "https://wa.me/6281917776161",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  style={{
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(212,184,138,0.25)",
                    color: "rgba(248,245,240,0.6)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#D4B88A";
                    e.currentTarget.style.color = "#D4B88A";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(212,184,138,0.25)";
                    e.currentTarget.style.color = "rgba(248,245,240,0.6)";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#D4B88A",
                marginBottom: "20px",
              }}
            >
              Навигация
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { label: "О резорте", href: "#about" },
                { label: "Галерея", href: "#gallery" },
                { label: "Номера", href: "#rooms" },
                { label: "Удобства", href: "#amenities" },
                { label: "Ресторан", href: "#restaurant" },
                { label: "Отзывы", href: "#reviews" },
              ].map((link) => (
                <li key={link.href} style={{ marginBottom: "10px" }}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      color: "rgba(248,245,240,0.55)",
                      cursor: "pointer",
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = "#F8F5F0";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = "rgba(248,245,240,0.55)";
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#D4B88A",
                marginBottom: "20px",
              }}
            >
              Информация
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Политика отмены",
                "Правила проживания",
                "Политика конфиденциальности",
                "Специальные предложения",
                "Корпоративные тарифы",
              ].map((item) => (
                <li key={item} style={{ marginBottom: "10px" }}>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      color: "rgba(248,245,240,0.55)",
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Booking */}
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#D4B88A",
                marginBottom: "20px",
              }}
            >
              Бронирование
            </div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                lineHeight: 1.7,
                color: "rgba(248,245,240,0.55)",
                marginBottom: "20px",
              }}
            >
              Лучшая цена гарантирована при бронировании через Booking.com
            </p>
            <a
              href="https://www.booking.com/hotel/id/sasak-garden-homestay-mataram.ru.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                background: "transparent",
                border: "1px solid rgba(212,184,138,0.5)",
                color: "#D4B88A",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#D4B88A";
                e.currentTarget.style.color = "#2C1810";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#D4B88A";
              }}
            >
              Забронировать
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              color: "rgba(248,245,240,0.35)",
              margin: 0,
            }}
          >
            © {year} Sasak Garden Resort. Все права защищены.
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              color: "rgba(248,245,240,0.35)",
              margin: 0,
            }}
          >
            sasakgardenresort.com
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
