/* ============================================================
   Navigation — Sasak Garden Resort
   Kinfolk Tropical Editorial: minimal sticky nav, transparent → frosted
   i18n: RU / EN via LanguageContext
   ============================================================ */

import { useLang } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

export default function Navigation() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.gallery, href: "#gallery" },
    { label: t.nav.videoGallery, href: "#video-gallery" },
    { label: t.nav.rooms, href: "#rooms" },
    { label: t.nav.booking, href: "#booking" },
    { label: t.nav.amenities, href: "#amenities" },
    { label: t.nav.restaurant, href: "#restaurant" },
    { label: t.nav.faq, href: "#faq" },
    { label: t.nav.reviews, href: "#reviews" },
    { label: t.nav.attractions, href: "#attractions" },
    { label: t.nav.contacts, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "nav-scrolled" : "bg-transparent"
        }`}
        style={{ padding: scrolled ? "10px 0" : "18px 0" }}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex flex-col leading-none"
            style={{ textDecoration: "none" }}
          >
            <span
              className="font-serif"
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: scrolled ? "#0F4A38" : "#F8F5F0",
                letterSpacing: "0.02em",
                lineHeight: 1,
                transition: "color 0.4s",
              }}
            >
              Sasak Garden
            </span>
            <span
              style={{
                fontSize: "9px",
                fontWeight: 400,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: scrolled ? "#C9A46F" : "rgba(248,245,240,0.7)",
                marginTop: "3px",
                transition: "color 0.4s",
              }}
            >
              Resort · Lombok
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "4px 0",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  color: scrolled ? "#2C1810" : "rgba(248,245,240,0.9)",
                  cursor: "pointer",
                  transition: "color 0.3s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = scrolled ? "#0F4A38" : "#D4B88A";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = scrolled ? "#2C1810" : "rgba(248,245,240,0.9)";
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: Lang switcher + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language switcher */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                border: `1px solid ${scrolled ? "rgba(15,74,56,0.25)" : "rgba(248,245,240,0.3)"}`,
                padding: "3px",
                borderRadius: "2px",
              }}
            >
              {(["ru", "en"] as const).map((l, i) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    background: lang === l
                      ? (scrolled ? "#0F4A38" : "rgba(212,184,138,0.9)")
                      : "transparent",
                    border: "none",
                    padding: "4px 10px",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    color: lang === l
                      ? "#F8F5F0"
                      : (scrolled ? "#999" : "rgba(248,245,240,0.55)"),
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    borderRadius: "1px",
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Book CTA */}
            <a
              href="https://www.booking.com/hotel/id/sasak-garden-homestay-mataram.ru.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "9px 20px",
                background: scrolled ? "#0F4A38" : "rgba(248,245,240,0.15)",
                border: `1px solid ${scrolled ? "#0F4A38" : "rgba(248,245,240,0.5)"}`,
                color: "#F8F5F0",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.3s",
                backdropFilter: scrolled ? "none" : "blur(4px)",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "#D4B88A";
                el.style.borderColor = "#D4B88A";
                el.style.color = "#2C1810";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = scrolled ? "#0F4A38" : "rgba(248,245,240,0.15)";
                el.style.borderColor = scrolled ? "#0F4A38" : "rgba(248,245,240,0.5)";
                el.style.color = "#F8F5F0";
              }}
            >
              {t.nav.bookNow}
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              cursor: "pointer",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "24px",
                  height: "1.5px",
                  background: scrolled ? "#2C1810" : "#F8F5F0",
                  transition: "all 0.3s",
                  transform: menuOpen
                    ? i === 0 ? "rotate(45deg) translate(4px, 4px)"
                    : i === 2 ? "rotate(-45deg) translate(4px, -4px)"
                    : "scaleX(0)"
                    : "none",
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "#0F4A38",
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "28px",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.77, 0, 0.175, 1)",
          overflowY: "auto",
          padding: "40px 20px",
        }}
      >
        {/* Mobile lang switcher */}
        <div
          style={{
            display: "flex",
            gap: "0",
            border: "1px solid rgba(212,184,138,0.4)",
            marginBottom: "8px",
          }}
        >
          {(["ru", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                background: lang === l ? "#D4B88A" : "transparent",
                border: "none",
                padding: "8px 24px",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: lang === l ? "#2C1810" : "rgba(248,245,240,0.6)",
                cursor: "pointer",
                transition: "all 0.25s",
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        {navLinks.map((link, i) => (
          <button
            key={link.href}
            onClick={() => handleNavClick(link.href)}
            style={{
              background: "none",
              border: "none",
              fontFamily: "'Playfair Display', serif",
              fontSize: "24px",
              fontWeight: 600,
              color: "#F8F5F0",
              cursor: "pointer",
              letterSpacing: "0.02em",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.4s ease ${i * 0.04 + 0.2}s, transform 0.4s ease ${i * 0.04 + 0.2}s`,
            }}
          >
            {link.label}
          </button>
        ))}
        <a
          href="https://www.booking.com/hotel/id/sasak-garden-homestay-mataram.ru.html"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop: "8px",
            padding: "14px 36px",
            border: "1px solid #D4B88A",
            color: "#D4B88A",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
            opacity: menuOpen ? 1 : 0,
            transition: `opacity 0.4s ease 0.5s`,
          }}
        >
          {t.nav.bookNow}
        </a>
      </div>
    </>
  );
}
