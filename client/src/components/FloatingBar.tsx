/* ============================================================
   FloatingBar — Sasak Garden Resort
   Sticky bottom booking bar that appears after scrolling past hero
   ============================================================ */

import { useEffect, useState } from "react";

export default function FloatingBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        background: "#0F4A38",
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.2)",
      }}
      className="floating-bar-container"
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div>
          <div
            className="font-serif"
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#F8F5F0",
              lineHeight: 1,
            }}
          >
            Sasak Garden Resort
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              color: "#D4B88A",
              letterSpacing: "0.1em",
              marginTop: "2px",
            }}
          >
            Сенггиги · Ломбок · Оценка 9.9
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            background: "rgba(212,184,138,0.15)",
            border: "1px solid rgba(212,184,138,0.3)",
          }}
          className="hide-mobile"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4B88A" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#D4B88A",
            }}
          >
            Великолепно · 113 отзывов
          </span>
        </div>
      </div>
      <button
        onClick={() => {
          const el = document.querySelector("#booking");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 28px",
          background: "#D4B88A",
          border: "none",
          color: "#2C1810",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          cursor: "pointer",
          flexShrink: 0,
          transition: "background 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#F8F5F0";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#D4B88A";
        }}
      >
        Забронировать
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>

      <style>{`
        @media (max-width: 640px) {
          .hide-mobile {
            display: none !important;
          }
          .floating-bar-container {
            padding: 12px 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
