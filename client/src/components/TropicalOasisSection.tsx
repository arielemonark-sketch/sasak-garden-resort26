/* ============================================================
   TropicalOasisSection — Sasak Garden Resort
   Full-screen cinematic video section with editorial text overlay
   Placed after CTASection, before AboutSection
   Design: Kinfolk Tropical Editorial
   Colors: Cream #F8F5F0, Emerald #0F4A38, Gold #D4B88A
   ============================================================ */

import { useLang } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";

const VIDEO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/oasis-video_fa900bd3.mp4";

const CONTENT = {
  en: {
    eyebrow: "Senggigi · Lombok · Indonesia",
    title: "A Tropical",
    titleItalic: "Senggigi Oasis",
    subtitle:
      "Nestled between ancient banyan trees and the shimmering Indian Ocean, Sasak Garden Resort is where time slows down and every moment becomes a memory.",
    stats: [
      { value: "300m", label: "To the Beach" },
      { value: "9.9", label: "Booking.com Score" },
      { value: "∞", label: "Tropical Serenity" },
    ],
    cta: "Discover the Resort",
    mute: "Unmute",
    unmute: "Mute",
  },
  ru: {
    eyebrow: "Сенггиги · Ломбок · Индонезия",
    title: "Тропический",
    titleItalic: "оазис Сенггиги",
    subtitle:
      "В окружении древних баньяновых деревьев и сверкающего Индийского океана, Sasak Garden Resort — место, где время замедляется и каждый момент становится воспоминанием.",
    stats: [
      { value: "300м", label: "До пляжа" },
      { value: "9.9", label: "Рейтинг Booking.com" },
      { value: "∞", label: "Тропическое спокойствие" },
    ],
    cta: "Открыть резорт",
    mute: "Включить звук",
    unmute: "Выключить звук",
  },
  id: {
    eyebrow: "Senggigi · Lombok · Indonesia",
    title: "Oasis Tropis",
    titleItalic: "Senggigi",
    subtitle:
      "Dikelilingi pohon beringin kuno dan samudra Hindia yang berkilauan, Sasak Garden Resort adalah tempat di mana waktu melambat dan setiap momen menjadi kenangan.",
    stats: [
      { value: "300m", label: "Ke Pantai" },
      { value: "9.9", label: "Skor Booking.com" },
      { value: "∞", label: "Ketenangan Tropis" },
    ],
    cta: "Jelajahi Resort",
    mute: "Aktifkan Suara",
    unmute: "Matikan Suara",
  },
};

export default function TropicalOasisSection() {
  const { lang } = useLang();
  const t = CONTENT[lang as keyof typeof CONTENT] || CONTENT.en;
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Intersection observer to play/pause video
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="oasis"
      style={{ position: "relative", height: "100vh", overflow: "hidden", background: "#0F4A38" }}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted={muted}
        loop
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: videoLoaded ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Gradient overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(15,74,56,0.3) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.55) 100%)",
          zIndex: 1,
        }}
      />
      {/* Left vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(15,74,56,0.6) 0%, transparent 50%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 4rem 5rem",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
        className="oasis-content"
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.5rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}
        >
          <div
            style={{
              width: "2.5rem",
              height: "1px",
              background: "#D4B88A",
            }}
          />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#D4B88A",
            }}
          >
            {t.eyebrow}
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3.5rem, 8vw, 7rem)",
            fontWeight: 700,
            lineHeight: 1.0,
            color: "#F8F5F0",
            marginBottom: "0.25rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
          }}
        >
          {t.title}
        </h2>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3.5rem, 8vw, 7rem)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.0,
            color: "#D4B88A",
            marginBottom: "2rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s",
          }}
        >
          {t.titleItalic}
        </h2>

        {/* Subtitle + Stats row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "4rem",
            flexWrap: "wrap",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.9s ease 0.5s, transform 0.9s ease 0.5s",
          }}
        >
          {/* Subtitle */}
          <div style={{ maxWidth: "480px" }}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "rgba(248,245,240,0.85)",
                marginBottom: "2rem",
              }}
            >
              {t.subtitle}
            </p>
            <button
              onClick={scrollToAbout}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.875rem 2rem",
                background: "transparent",
                border: "1px solid rgba(212,184,138,0.6)",
                color: "#D4B88A",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(212,184,138,0.15)";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "#D4B88A";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "transparent";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(212,184,138,0.6)";
              }}
            >
              {t.cta}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="#D4B88A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: "3rem",
              paddingBottom: "0.25rem",
            }}
          >
            {t.stats.map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: "#D4B88A",
                    lineHeight: 1,
                    marginBottom: "0.4rem",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(248,245,240,0.6)",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mute toggle button */}
      <button
        onClick={toggleMute}
        title={muted ? t.mute : t.unmute}
        style={{
          position: "absolute",
          top: "2rem",
          right: "2rem",
          zIndex: 10,
          width: "2.75rem",
          height: "2.75rem",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(212,184,138,0.3)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(0,0,0,0.4)";
        }}
      >
        {muted ? (
          /* Muted icon */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          /* Unmuted icon */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>

      {/* Section label top-left */}
      <div
        style={{
          position: "absolute",
          top: "2rem",
          left: "4rem",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.65rem",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(248,245,240,0.5)",
          }}
        >
          02 — The Resort
        </span>
        <div
          style={{
            width: "2rem",
            height: "1px",
            background: "rgba(248,245,240,0.3)",
          }}
        />
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "4rem",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: isVisible ? 0.6 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "3rem",
            background: "rgba(248,245,240,0.4)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              background: "#D4B88A",
              animation: "scrollLine 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { height: 0; top: 0; }
          50% { height: 100%; top: 0; }
          100% { height: 0; top: 100%; }
        }
        @media (max-width: 768px) {
          .oasis-content {
            padding: 0 1.5rem 4rem !important;
          }
        }
      `}</style>
    </section>
  );
}
