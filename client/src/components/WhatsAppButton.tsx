/* ============================================================
   WhatsAppButton — Sasak Garden Resort
   Floating WhatsApp button — ENHANCED ANIMATIONS:
   1. Bounce-in entrance (spring physics feel)
   2. Expanding attention rings on entry
   3. Periodic "shake" every 12s to re-attract attention
   4. Hover: scale + glow burst
   5. Chat bubble slides in from bottom-right
   i18n: EN / RU / ID
   ============================================================ */

import { useLang } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "6281917477755";

const MESSAGES: Record<string, string> = {
  en: "Hello! I'm interested in booking a room at Sasak Garden Resort. Could you help me?",
  ru: "Здравствуйте! Я хочу забронировать номер в Sasak Garden Resort. Можете помочь?",
  id: "Halo! Saya tertarik untuk memesan kamar di Sasak Garden Resort. Bisakah Anda membantu saya?",
};

const BUBBLE_TEXT: Record<string, { greeting: string; message: string; cta: string }> = {
  en: {
    greeting: "👋 Hello!",
    message: "Need help with your booking? Chat with us on WhatsApp — we reply within minutes!",
    cta: "Start Chat",
  },
  ru: {
    greeting: "👋 Привет!",
    message: "Нужна помощь с бронированием? Напишите нам в WhatsApp — отвечаем в течение нескольких минут!",
    cta: "Написать",
  },
  id: {
    greeting: "👋 Halo!",
    message: "Butuh bantuan pemesanan? Chat dengan kami di WhatsApp — kami membalas dalam hitungan menit!",
    cta: "Mulai Chat",
  },
};

export default function WhatsAppButton() {
  const { lang } = useLang();
  const [phase, setPhase] = useState<"hidden" | "entering" | "visible">("hidden");
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [attentionRing, setAttentionRing] = useState(false);

  // Entrance sequence: hidden → entering (bounce-in) → visible
  useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase("entering");
      setAttentionRing(true); // fire attention rings on entry
    }, 1200);
    const t2 = setTimeout(() => {
      setPhase("visible");
    }, 1900);
    const t3 = setTimeout(() => setAttentionRing(false), 3000);

    // Auto-show bubble after 9s
    const t4 = setTimeout(() => {
      if (!bubbleDismissed) setBubbleOpen(true);
    }, 9000);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  // Periodic shake every 12s to re-attract attention
  useEffect(() => {
    if (phase !== "visible") return;
    const interval = setInterval(() => {
      if (!bubbleOpen) {
        setShaking(true);
        setTimeout(() => setShaking(false), 700);
      }
    }, 12000);
    return () => clearInterval(interval);
  }, [phase, bubbleOpen]);

  // Auto-hide bubble after 7s
  useEffect(() => {
    if (!bubbleOpen) return;
    const t = setTimeout(() => {
      setBubbleOpen(false);
      setBubbleDismissed(true);
    }, 7000);
    return () => clearTimeout(t);
  }, [bubbleOpen]);

  const handleOpen = () => {
    const message = encodeURIComponent(MESSAGES[lang] || MESSAGES.en);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  const handleToggleBubble = () => {
    setBubbleOpen((v) => !v);
    if (!bubbleOpen) setBubbleDismissed(false);
  };

  const bubble = BUBBLE_TEXT[lang] || BUBBLE_TEXT.en;

  // Compute button transform based on state
  const btnTransform = (() => {
    if (phase === "hidden") return "translateY(80px) scale(0.3)";
    if (phase === "entering") return "translateY(-8px) scale(1.08)";
    if (shaking) return "rotate(0deg)"; // handled via animation
    return "translateY(0) scale(1)";
  })();

  const btnOpacity = phase === "hidden" ? 0 : 1;
  const btnTransition = phase === "entering"
    ? "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease"
    : "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease";

  return (
    <>
      <style>{`
        /* Entrance bounce rings */
        @keyframes waEntryRing1 {
          0%   { transform: scale(1);   opacity: 0.9; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes waEntryRing2 {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(3.0); opacity: 0; }
        }
        @keyframes waEntryRing3 {
          0%   { transform: scale(1);   opacity: 0.5; }
          100% { transform: scale(3.6); opacity: 0; }
        }

        /* Idle pulse rings */
        @keyframes waPulse1 {
          0%   { transform: scale(1);   opacity: 0.75; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes waPulse2 {
          0%   { transform: scale(1);   opacity: 0.5; }
          100% { transform: scale(2.1); opacity: 0; }
        }

        /* Periodic shake */
        @keyframes waShake {
          0%,100% { transform: rotate(0deg) scale(1); }
          15%     { transform: rotate(-14deg) scale(1.08); }
          30%     { transform: rotate(12deg) scale(1.08); }
          45%     { transform: rotate(-10deg) scale(1.05); }
          60%     { transform: rotate(8deg) scale(1.05); }
          75%     { transform: rotate(-5deg) scale(1.02); }
          90%     { transform: rotate(3deg) scale(1.01); }
        }

        /* Notification dot bounce */
        @keyframes waDot {
          0%,100% { transform: scale(1); }
          50%     { transform: scale(1.4); }
        }

        /* Bubble slide-in */
        @keyframes waBubbleIn {
          0%   { opacity: 0; transform: translateY(16px) scale(0.92); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .wa-btn-shake { animation: waShake 0.7s ease-in-out; }

        .wa-entry-ring1 { animation: waEntryRing1 1.0s ease-out forwards; }
        .wa-entry-ring2 { animation: waEntryRing2 1.3s ease-out 0.15s forwards; }
        .wa-entry-ring3 { animation: waEntryRing3 1.6s ease-out 0.3s forwards; }

        .wa-idle-ring1 { animation: waPulse1 2.5s ease-out infinite; }
        .wa-idle-ring2 { animation: waPulse2 2.5s ease-out 0.45s infinite; }

        .wa-bubble-open { animation: waBubbleIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }
      `}</style>

      <div
        style={{
          position: "fixed",
          bottom: "90px",
          right: "24px",
          zIndex: 999,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "12px",
        }}
      >
        {/* ── Chat bubble ── */}
        {bubbleOpen && (
          <div
            className="wa-bubble-open"
            style={{
              background: "#fff",
              borderRadius: "16px 16px 4px 16px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.18), 0 2px 10px rgba(0,0,0,0.08)",
              padding: "16px 18px",
              maxWidth: "268px",
              position: "relative",
            }}
          >
            {/* Close */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setBubbleOpen(false);
                setBubbleDismissed(true);
              }}
              style={{
                position: "absolute", top: "8px", right: "10px",
                background: "none", border: "none",
                fontSize: "17px", color: "#bbb", cursor: "pointer", lineHeight: 1, padding: "2px",
              }}
            >×</button>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <div style={{
                width: "38px", height: "38px", borderRadius: "50%",
                background: "linear-gradient(135deg, #0F4A38, #25D366)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <span style={{ fontSize: "19px" }}>🌿</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "13px", color: "#1a1a1a", lineHeight: 1.2 }}>
                  Sasak Garden Resort
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#25D366", display: "inline-block" }} />
                  <span style={{ fontSize: "11px", color: "#666" }}>Online</span>
                </div>
              </div>
            </div>

            {/* Message bubble */}
            <div style={{
              background: "#f0f0f0", borderRadius: "12px 12px 12px 4px",
              padding: "10px 13px", marginBottom: "12px",
            }}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#0F4A38", marginBottom: "4px" }}>
                {bubble.greeting}
              </div>
              <div style={{ fontSize: "12px", color: "#444", lineHeight: 1.55 }}>
                {bubble.message}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleOpen}
              style={{
                width: "100%", background: "#25D366", border: "none", borderRadius: "8px",
                padding: "10px", color: "#fff", fontSize: "13px", fontWeight: 700,
                cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", gap: "8px", transition: "background 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1ebe5d";
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#25D366";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {bubble.cta}
            </button>
          </div>
        )}

        {/* ── Main button ── */}
        <div style={{ position: "relative", width: "56px", height: "56px" }}>

          {/* Entry attention rings (fire once on entrance) */}
          {attentionRing && (
            <>
              <div className="wa-entry-ring1" style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                border: "3px solid rgba(37,211,102,0.7)",
                pointerEvents: "none",
              }} />
              <div className="wa-entry-ring2" style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                border: "2px solid rgba(37,211,102,0.5)",
                pointerEvents: "none",
              }} />
              <div className="wa-entry-ring3" style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                border: "2px solid rgba(37,211,102,0.35)",
                pointerEvents: "none",
              }} />
            </>
          )}

          {/* Idle pulse rings (always on after entry) */}
          {phase === "visible" && (
            <>
              <div className="wa-idle-ring1" style={{
                position: "absolute", inset: "-6px", borderRadius: "50%",
                border: "2px solid rgba(37,211,102,0.45)",
                pointerEvents: "none",
              }} />
              <div className="wa-idle-ring2" style={{
                position: "absolute", inset: "-12px", borderRadius: "50%",
                border: "2px solid rgba(37,211,102,0.25)",
                pointerEvents: "none",
              }} />
            </>
          )}

          {/* Button */}
          <button
            onClick={handleToggleBubble}
            className={shaking ? "wa-btn-shake" : ""}
            title="WhatsApp"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(37,211,102,0.5), 0 2px 8px rgba(0,0,0,0.18)",
              position: "relative",
              zIndex: 1,
              opacity: btnOpacity,
              transform: btnTransform,
              transition: btnTransition,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.12)";
              e.currentTarget.style.boxShadow = "0 6px 28px rgba(37,211,102,0.65), 0 2px 10px rgba(0,0,0,0.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.5), 0 2px 8px rgba(0,0,0,0.18)";
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </button>

          {/* Notification dot */}
          {!bubbleOpen && !bubbleDismissed && phase === "visible" && (
            <div style={{
              position: "absolute", top: "1px", right: "1px",
              width: "15px", height: "15px", borderRadius: "50%",
              background: "#FF3B30", border: "2.5px solid #fff",
              animation: "waDot 1.2s ease-in-out infinite",
              zIndex: 2,
            }} />
          )}
        </div>
      </div>
    </>
  );
}
