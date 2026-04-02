/* ============================================================
   BookingWidget — Sasak Garden Resort
   Inline booking form that builds a Booking.com deep-link URL
   with pre-filled checkin/checkout/guests and redirects user.
   Design: Kinfolk Tropical Editorial
   ============================================================ */

import { useLang } from "@/contexts/LanguageContext";
import { useState } from "react";

interface BookingWidgetProps {
  /** "hero" = dark glass panel over hero image; "section" = light card on cream bg */
  variant?: "hero" | "section";
}

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function toInputValue(d: Date): string {
  return formatDate(d);
}

export default function BookingWidget({ variant = "section" }: BookingWidgetProps) {
  const { t, lang } = useLang();
  const today = new Date();
  const tomorrow = addDays(today, 1);

  const [checkin, setCheckin] = useState(toInputValue(today));
  const [checkout, setCheckout] = useState(toInputValue(tomorrow));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const isHero = variant === "hero";

  // Build Booking.com deep-link
  const handleBook = () => {
    const base = "https://www.booking.com/hotel/id/sasak-garden-homestay-mataram.ru.html";
    const params = new URLSearchParams({
      aid: "898224",
      checkin,
      checkout,
      group_adults: String(adults),
      group_children: String(children),
      no_rooms: String(rooms),
    });
    window.open(`${base}?${params.toString()}`, "_blank", "noopener,noreferrer");
  };

  // Ensure checkout is always after checkin
  const handleCheckinChange = (val: string) => {
    setCheckin(val);
    if (val >= checkout) {
      const next = addDays(new Date(val), 1);
      setCheckout(toInputValue(next));
    }
  };

  // Compute nights
  const nights = Math.max(
    1,
    Math.round((new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000)
  );
  const nightsLabel = lang === "ru"
    ? nights === 1 ? t.bookingWidget.nights1 : nights < 5 ? t.bookingWidget.nights2 : t.bookingWidget.nights5
    : nights === 1 ? t.bookingWidget.nights1 : t.bookingWidget.nights2;

  /* ---- Shared style tokens ---- */
  const bg = isHero
    ? "rgba(10,30,20,0.72)"
    : "#FFFFFF";
  const border = isHero
    ? "1px solid rgba(212,184,138,0.3)"
    : "1px solid rgba(212,184,138,0.35)";
  const labelColor = isHero ? "rgba(212,184,138,0.85)" : "#C9A46F";
  const valueColor = isHero ? "#F8F5F0" : "#2C1810";
  const inputBg = isHero ? "rgba(255,255,255,0.07)" : "#F8F5F0";
  const inputBorder = isHero ? "1px solid rgba(212,184,138,0.25)" : "1px solid rgba(212,184,138,0.4)";
  const dividerColor = isHero ? "rgba(212,184,138,0.2)" : "rgba(212,184,138,0.3)";

  const fieldStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: 1,
    minWidth: "120px",
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: labelColor,
  };
  const inputStyle: React.CSSProperties = {
    background: inputBg,
    border: inputBorder,
    padding: "10px 12px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    fontWeight: 500,
    color: valueColor,
    outline: "none",
    width: "100%",
    cursor: "pointer",
    appearance: "none",
    WebkitAppearance: "none",
    colorScheme: isHero ? "dark" : "light",
  };
  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23D4B88A' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    paddingRight: "30px",
  };

  return (
    <div
      style={{
        background: bg,
        border,
        backdropFilter: isHero ? "blur(12px)" : "none",
        WebkitBackdropFilter: isHero ? "blur(12px)" : "none",
        padding: "24px 28px",
        width: "100%",
        boxShadow: isHero
          ? "0 8px 40px rgba(0,0,0,0.35)"
          : "0 4px 32px rgba(44,24,16,0.1)",
      }}
    >
      {/* Title row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <div
          className="font-serif"
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: isHero ? "#F8F5F0" : "#0F4A38",
          }}
        >
          {t.bookingWidget.title}
        </div>
            {nights > 0 && (
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              color: labelColor,
              padding: "4px 12px",
              border: `1px solid ${dividerColor}`,
            }}
          >
            {nights} {nightsLabel}
          </div>
        )}
      </div>

      {/* Fields row */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          alignItems: "flex-end",
          marginBottom: "16px",
        }}
        className="booking-fields"
      >
        {/* Check-in */}
        <div style={fieldStyle}>
          <label style={labelStyle}>
            <span style={{ marginRight: "4px" }}>📅</span> {t.bookingWidget.checkin}
          </label>
          <input
            type="date"
            value={checkin}
            min={toInputValue(today)}
            onChange={(e) => handleCheckinChange(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Divider arrow */}
        <div
          style={{
            color: labelColor,
            paddingBottom: "12px",
            flexShrink: 0,
            fontSize: "16px",
          }}
        >
          →
        </div>

        {/* Check-out */}
        <div style={fieldStyle}>
          <label style={labelStyle}>
            <span style={{ marginRight: "4px" }}>📅</span> {t.bookingWidget.checkout}
          </label>
          <input
            type="date"
            value={checkout}
            min={toInputValue(addDays(new Date(checkin), 1))}
            onChange={(e) => setCheckout(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Vertical divider */}
        <div
          style={{
            width: "1px",
            height: "44px",
            background: dividerColor,
            flexShrink: 0,
            alignSelf: "flex-end",
          }}
          className="hide-on-wrap"
        />

        {/* Adults */}
        <div style={{ ...fieldStyle, minWidth: "90px", maxWidth: "110px" }}>
          <label style={labelStyle}>
            <span style={{ marginRight: "4px" }}>👤</span> {t.bookingWidget.adults}
          </label>
          <select
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            style={selectStyle}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n} style={{ background: "#2C1810", color: "#F8F5F0" }}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* Children */}
        <div style={{ ...fieldStyle, minWidth: "90px", maxWidth: "110px" }}>
          <label style={labelStyle}>
            <span style={{ marginRight: "4px" }}>🧒</span> {t.bookingWidget.children}
          </label>
          <select
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            style={selectStyle}
          >
            {[0, 1, 2, 3, 4].map((n) => (
              <option key={n} value={n} style={{ background: "#2C1810", color: "#F8F5F0" }}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* Rooms */}
        <div style={{ ...fieldStyle, minWidth: "80px", maxWidth: "100px" }}>
          <label style={labelStyle}>
            <span style={{ marginRight: "4px" }}>🏠</span> {t.bookingWidget.roomsLabel}
          </label>
          <select
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
            style={selectStyle}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n} style={{ background: "#2C1810", color: "#F8F5F0" }}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* CTA button */}
        <button
          onClick={handleBook}
          style={{
            padding: "12px 28px",
            background: "#D4B88A",
            border: "none",
            color: "#2C1810",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            flexShrink: 0,
            alignSelf: "flex-end",
            transition: "background 0.25s ease, transform 0.15s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#0F4A38";
            e.currentTarget.style.color = "#F8F5F0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#D4B88A";
            e.currentTarget.style.color = "#2C1810";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "scale(0.97)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {t.bookingWidget.cta}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Footer note */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            color: isHero ? "rgba(248,245,240,0.5)" : "rgba(92,61,46,0.7)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          {t.bookingWidget.secure}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            color: isHero ? "rgba(248,245,240,0.5)" : "rgba(92,61,46,0.7)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {t.bookingWidget.freeCancel}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            color: isHero ? "rgba(248,245,240,0.5)" : "rgba(92,61,46,0.7)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {t.bookingWidget.instant}
        </div>
        <div
          style={{
            marginLeft: "auto",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            color: isHero ? "rgba(248,245,240,0.4)" : "rgba(92,61,46,0.5)",
          }}
        >
          {t.bookingWidget.via}
        </div>
      </div>
    </div>
  );
}
