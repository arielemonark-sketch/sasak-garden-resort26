/* ============================================================
   WhatsAppButton — Sasak Garden Resort
   Floating WhatsApp button in bottom-right corner
   - Pulsing ring animation to attract attention
   - Chat bubble popup with pre-filled message
   - Auto-shows bubble after 8 seconds, then hides after 6s
   - i18n: EN / RU / ID
   ============================================================ */

import { useLang } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

// Sasak Garden Resort WhatsApp number (Indonesia)
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
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const [visible, setVisible] = useState(false);

  // Show button after 1s, auto-show bubble after 8s
  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 1000);
    const bubbleTimer = setTimeout(() => {
      if (!bubbleDismissed) setBubbleOpen(true);
    }, 8000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(bubbleTimer);
    };
  }, []);

  // Auto-hide bubble after 6s
  useEffect(() => {
    if (!bubbleOpen) return;
    const timer = setTimeout(() => {
      setBubbleOpen(false);
      setBubbleDismissed(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, [bubbleOpen]);

  const handleOpen = () => {
    const message = encodeURIComponent(MESSAGES[lang] || MESSAGES.en);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  const handleToggleBubble = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBubbleOpen((v) => !v);
    if (!bubbleOpen) setBubbleDismissed(false);
  };

  const bubble = BUBBLE_TEXT[lang] || BUBBLE_TEXT.en;

  return (
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
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Chat bubble popup */}
      <div
        style={{
          background: "#fff",
          borderRadius: "16px 16px 4px 16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)",
          padding: "16px 18px",
          maxWidth: "260px",
          opacity: bubbleOpen ? 1 : 0,
          transform: bubbleOpen ? "translateY(0) scale(1)" : "translateY(10px) scale(0.95)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          pointerEvents: bubbleOpen ? "auto" : "none",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setBubbleOpen(false);
            setBubbleDismissed(true);
          }}
          style={{
            position: "absolute",
            top: "8px",
            right: "10px",
            background: "none",
            border: "none",
            fontSize: "16px",
            color: "#999",
            cursor: "pointer",
            lineHeight: 1,
            padding: "2px",
          }}
        >
          ×
        </button>

        {/* Header with avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #0F4A38, #25D366)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: "18px" }}>🌿</span>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "13px", color: "#1a1a1a", lineHeight: 1.2 }}>
              Sasak Garden Resort
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#25D366",
                  display: "inline-block",
                }}
              />
              <span style={{ fontSize: "11px", color: "#666" }}>Online</span>
            </div>
          </div>
        </div>

        {/* Message */}
        <div
          style={{
            background: "#f0f0f0",
            borderRadius: "12px 12px 12px 4px",
            padding: "10px 12px",
            marginBottom: "12px",
          }}
        >
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#0F4A38", marginBottom: "4px" }}>
            {bubble.greeting}
          </div>
          <div style={{ fontSize: "12px", color: "#444", lineHeight: 1.5 }}>
            {bubble.message}
          </div>
        </div>

        {/* CTA button */}
        <button
          onClick={handleOpen}
          style={{
            width: "100%",
            background: "#25D366",
            border: "none",
            borderRadius: "8px",
            padding: "10px",
            color: "#fff",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#1ebe5d"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#25D366"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {bubble.cta}
        </button>
      </div>

      {/* Main WhatsApp button */}
      <div style={{ position: "relative" }}>
        {/* Pulse rings */}
        <div
          style={{
            position: "absolute",
            inset: "-8px",
            borderRadius: "50%",
            border: "2px solid rgba(37,211,102,0.4)",
            animation: "waPulse1 2.5s ease-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "-16px",
            borderRadius: "50%",
            border: "2px solid rgba(37,211,102,0.2)",
            animation: "waPulse2 2.5s ease-out infinite 0.4s",
          }}
        />

        {/* Button */}
        <button
          onClick={handleToggleBubble}
          title="WhatsApp"
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "#25D366",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.15)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            position: "relative",
            zIndex: 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow = "0 6px 24px rgba(37,211,102,0.55), 0 2px 8px rgba(0,0,0,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.15)";
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </button>

        {/* Notification dot */}
        {!bubbleOpen && !bubbleDismissed && (
          <div
            style={{
              position: "absolute",
              top: "2px",
              right: "2px",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "#FF4444",
              border: "2px solid #fff",
              animation: "waDot 1s ease-in-out infinite",
            }}
          />
        )}
      </div>

      <style>{`
        @keyframes waPulse1 {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes waPulse2 {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes waDot {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
