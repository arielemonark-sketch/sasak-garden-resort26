/* ============================================================
   Navigation — Sasak Garden Resort
   Kinfolk Tropical Editorial: minimal sticky nav, transparent → frosted
   i18n: EN (default) → RU → ID via LanguageContext
   Language switcher: large, visible pill with flag emojis
   ============================================================ */

import { Lang, useLang } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

const LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "ru", flag: "🇷🇺", label: "RU" },
  { code: "id", flag: "🇮🇩", label: "ID" },
];

export default function Navigation() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.gallery, href: "#gallery" },
    { label: t.nav.videoGallery, href: "#video-gallery" },
    { label: t.nav.rooms, href: "#rooms" },
    { label: t.nav.specialOffers, href: "#special-offers" },
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

  const textColor = scrolled ? "#2C1810" : "rgba(248,245,240,0.9)";
  const hoverColor = scrolled ? "#0F4A38" : "#D4B88A";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "nav-scrolled" : "bg-transparent"
        }`}
        style={{ padding: scrolled ? "8px 0" : "16px 0" }}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex flex-col leading-none"
            style={{ textDecoration: "none", flexShrink: 0 }}
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

          {/* Desktop nav links */}
          <div className="hidden xl:flex items-center gap-5">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "4px 0",
                  fontSize: "9.5px",
                  fontWeight: 500,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  color: textColor,
                  cursor: "pointer",
                  transition: "color 0.3s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = hoverColor; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = textColor; }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: Language switcher + CTA */}
          <div className="hidden lg:flex items-center gap-3" style={{ flexShrink: 0 }}>

            {/* ── Language Switcher ── */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: scrolled ? "rgba(15,74,56,0.07)" : "rgba(248,245,240,0.12)",
                border: `1.5px solid ${scrolled ? "rgba(15,74,56,0.2)" : "rgba(248,245,240,0.35)"}`,
                borderRadius: "30px",
                padding: "3px",
                gap: "2px",
                backdropFilter: "blur(8px)",
                transition: "all 0.4s",
              }}
            >
              {LANGS.map(({ code, flag, label }) => {
                const isActive = lang === code;
                return (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    title={code === "en" ? "English" : code === "ru" ? "Русский" : "Indonesia"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      background: isActive
                        ? (scrolled ? "#0F4A38" : "rgba(212,184,138,0.95)")
                        : "transparent",
                      border: "none",
                      borderRadius: "24px",
                      padding: "5px 11px",
                      fontSize: "11px",
                      fontWeight: isActive ? 700 : 500,
                      letterSpacing: "0.08em",
                      color: isActive
                        ? "#F8F5F0"
                        : (scrolled ? "rgba(44,24,16,0.55)" : "rgba(248,245,240,0.6)"),
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      whiteSpace: "nowrap",
                      boxShadow: isActive ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        const el = e.currentTarget;
                        el.style.background = scrolled ? "rgba(15,74,56,0.12)" : "rgba(248,245,240,0.18)";
                        el.style.color = scrolled ? "#0F4A38" : "#F8F5F0";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        const el = e.currentTarget;
                        el.style.background = "transparent";
                        el.style.color = scrolled ? "rgba(44,24,16,0.55)" : "rgba(248,245,240,0.6)";
                      }
                    }}
                  >
                    <span style={{ fontSize: "14px", lineHeight: 1 }}>{flag}</span>
                    <span>{label}</span>
                  </button>
                );
              })}
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
                borderRadius: "2px",
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

          {/* Mobile: lang switcher compact + hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Compact mobile lang switcher (always visible) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: scrolled ? "rgba(15,74,56,0.1)" : "rgba(248,245,240,0.15)",
                border: `1px solid ${scrolled ? "rgba(15,74,56,0.25)" : "rgba(248,245,240,0.35)"}`,
                borderRadius: "20px",
                padding: "2px",
                gap: "1px",
                backdropFilter: "blur(8px)",
              }}
            >
              {LANGS.map(({ code, flag }) => {
                const isActive = lang === code;
                return (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "32px",
                      height: "28px",
                      background: isActive
                        ? (scrolled ? "#0F4A38" : "rgba(212,184,138,0.9)")
                        : "transparent",
                      border: "none",
                      borderRadius: "16px",
                      fontSize: "15px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      opacity: isActive ? 1 : 0.55,
                    }}
                  >
                    {flag}
                  </button>
                );
              })}
            </div>

            {/* Hamburger */}
            <button
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
        </div>
      </nav>

      {/* Mobile full-screen menu */}
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
          gap: "24px",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.77, 0, 0.175, 1)",
          overflowY: "auto",
          padding: "40px 20px",
        }}
      >
        {/* Mobile full lang switcher */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(248,245,240,0.1)",
            border: "1.5px solid rgba(212,184,138,0.4)",
            borderRadius: "30px",
            padding: "4px",
            gap: "4px",
            marginBottom: "12px",
          }}
        >
          {LANGS.map(({ code, flag, label }) => {
            const isActive = lang === code;
            return (
              <button
                key={code}
                onClick={() => setLang(code)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: isActive ? "#D4B88A" : "transparent",
                  border: "none",
                  borderRadius: "24px",
                  padding: "8px 18px",
                  fontSize: "13px",
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: "0.1em",
                  color: isActive ? "#2C1810" : "rgba(248,245,240,0.6)",
                  cursor: "pointer",
                  transition: "all 0.25s",
                }}
              >
                <span style={{ fontSize: "16px" }}>{flag}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {navLinks.map((link, i) => (
          <button
            key={link.href}
            onClick={() => handleNavClick(link.href)}
            style={{
              background: "none",
              border: "none",
              fontFamily: "'Playfair Display', serif",
              fontSize: "22px",
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
            borderRadius: "2px",
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
