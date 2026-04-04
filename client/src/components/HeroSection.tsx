/* ============================================================
   HeroSection — Sasak Garden Resort
   Dynamic hero with auto-cycling video/image slides
   Design: Kinfolk Tropical Editorial
   Palette: cream #F8F5F0, emerald #0F4A38, gold #D4B88A
   ============================================================ */

import BookingWidget from "@/components/BookingWidget";
import { useLang } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState, useCallback } from "react";

// ── Slide definitions ──────────────────────────────────────────
const SLIDES = [
  {
    type: "video" as const,
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/hero-video_f3a44ab9.mp4",
    poster: "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/hero-pool-Pue6srXm3JVMUm9PHDPzym.webp",
    label: "Garden & Pool",
  },
  {
    type: "video" as const,
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/grok-video-b9af56d3-d841-49a3-8746-ea12ead6730d_4ff020be.mp4",
    poster: "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/grok-image-ca5876cf-34e7-4fdb-b4da-b9c8298587b8_0f3a66aa.png",
    label: "Resort Life",
  },
  {
    type: "video" as const,
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/grok-video-b9af56d3-d841-49a3-8746-ea12ead6730d(3)_ce708673.mp4",
    poster: "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/grok-image-ca5876cf-34e7-4fdb-b4da-b9c8298587b8_0f3a66aa.png",
    label: "Tropical Oasis",
  },
  {
    type: "image" as const,
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/grok-image-ca5876cf-34e7-4fdb-b4da-b9c8298587b8_0f3a66aa.png",
    poster: "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/grok-image-ca5876cf-34e7-4fdb-b4da-b9c8298587b8_0f3a66aa.png",
    label: "Sasak Garden",
  },
];

const SLIDE_DURATION = 8000;
const FADE_DURATION = 1200;

export default function HeroSection() {
  const { t } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [fadingIdx, setFadingIdx] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const activeIdxRef = useRef(0);
  const isTransitioning = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Advance to a specific slide
  const goToSlide = useCallback((target: number) => {
    if (isTransitioning.current) return;
    const idx = ((target % SLIDES.length) + SLIDES.length) % SLIDES.length;
    if (idx === activeIdxRef.current) return;

    isTransitioning.current = true;
    progressRef.current = 0;
    setProgress(0);

    // Show incoming slide underneath (it will fade in)
    setFadingIdx(idx);

    // After fade, commit
    setTimeout(() => {
      activeIdxRef.current = idx;
      setActiveIdx(idx);
      setFadingIdx(null);
      isTransitioning.current = false;

      // Play the new video
      const vid = videoRefs.current[idx];
      if (vid) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      }
    }, FADE_DURATION);
  }, []);

  // Auto-advance timer
  useEffect(() => {
    progressRef.current = 0;
    setProgress(0);

    const TICK = 50;
    const progressInterval = setInterval(() => {
      progressRef.current = Math.min(progressRef.current + (TICK / SLIDE_DURATION) * 100, 100);
      setProgress(progressRef.current);
    }, TICK);

    const slideInterval = setInterval(() => {
      goToSlide(activeIdxRef.current + 1);
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearInterval(slideInterval);
    };
  }, [activeIdx, goToSlide]);

  const parallaxOffset = scrollY * 0.35;

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "700px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* ── Slide backgrounds ─────────────────────────────────── */}
      {SLIDES.map((slide, i) => {
        const isActive = i === activeIdx;
        const isFading = i === fadingIdx;
        // Active slide is always visible; fading-in slide sits on top
        const zIndex = isFading ? 1 : isActive ? 0 : -1;
        const opacity = isFading ? 1 : isActive ? 1 : 0;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: "-20% 0",
              transform: `translateY(${parallaxOffset}px)`,
              overflow: "hidden",
              zIndex,
              opacity,
              transition: isFading
                ? `opacity ${FADE_DURATION}ms ease`
                : "none",
              willChange: "opacity",
            }}
          >
            {slide.type === "video" ? (
              <>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${slide.poster})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <video
                  ref={(el) => { videoRefs.current[i] = el; }}
                  autoPlay={i === 0}
                  muted
                  loop
                  playsInline
                  preload={i <= 1 ? "auto" : "none"}
                  poster={slide.poster}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                >
                  <source src={slide.src} type="video/mp4" />
                </video>
              </>
            ) : (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${slide.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                }}
              />
            )}
          </div>
        );
      })}

      {/* ── Gradient overlay ──────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(15,74,56,0.3) 0%, rgba(10,30,20,0.5) 45%, rgba(10,30,20,0.78) 100%)",
          zIndex: 2,
        }}
      />

      {/* ── Slide counter (top-right) ──────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "90px",
          right: "32px",
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          opacity: loaded ? 0.8 : 0,
          transition: "opacity 1s ease 2s",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#D4B88A",
          }}
        >
          {SLIDES[activeIdx].label}
        </span>
        <div style={{ width: "20px", height: "1px", background: "#D4B88A", opacity: 0.5 }} />
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "10px",
            color: "rgba(248,245,240,0.45)",
            letterSpacing: "0.1em",
          }}
        >
          {String(activeIdx + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      {/* ── Main content ──────────────────────────────────────── */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 3,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          paddingBottom: "260px",
        }}
      >
        {/* Location label */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s",
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
            }}
          >
            {t.hero.location}
          </span>
        </div>

        {/* Main title */}
        <h1
          className="font-serif"
          style={{
            fontSize: "clamp(52px, 9vw, 110px)",
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            color: "#F8F5F0",
            margin: 0,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1.2s ease 0.4s, transform 1.2s ease 0.4s",
          }}
        >
          Sasak Garden
          <br />
          <em
            style={{
              fontStyle: "italic",
              fontWeight: 400,
              color: "rgba(248,245,240,0.85)",
            }}
          >
            Resort
          </em>
        </h1>

        {/* Gold divider */}
        <div
          style={{
            width: "60px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #D4B88A, transparent)",
            opacity: loaded ? 1 : 0,
            transition: "opacity 1s ease 0.8s",
          }}
        />

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(15px, 2vw, 18px)",
            fontWeight: 300,
            lineHeight: 1.6,
            color: "rgba(248,245,240,0.85)",
            maxWidth: "520px",
            margin: 0,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease 1s, transform 1s ease 1s",
          }}
        >
          {t.hero.subtitle}
        </p>

        {/* Rating badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "8px 20px",
            background: "rgba(212, 184, 138, 0.12)",
            border: "1px solid rgba(212, 184, 138, 0.35)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease 1.2s, transform 1s ease 1.2s",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "22px",
              fontWeight: 700,
              color: "#D4B88A",
            }}
          >
            9.9
          </span>
          <div
            style={{
              width: "1px",
              height: "24px",
              background: "rgba(212,184,138,0.4)",
            }}
          />
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                color: "#F8F5F0",
                letterSpacing: "0.05em",
              }}
            >
              {t.hero.ratingLabel}
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                color: "rgba(248,245,240,0.6)",
                letterSpacing: "0.08em",
              }}
            >
              {t.hero.ratingCount}
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease 1.4s, transform 1s ease 1.4s",
          }}
        >
          <a
            href="https://www.booking.com/hotel/id/sasak-garden-homestay-mataram.ru.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-booking"
            style={{
              background: "#D4B88A",
              borderColor: "#D4B88A",
              color: "#2C1810",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#D4B88A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#D4B88A";
              e.currentTarget.style.color = "#2C1810";
            }}
          >
            {t.hero.ctaBook}
          </a>
          <button
            onClick={() =>
              document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-gold"
            style={{ background: "transparent" }}
          >
            {t.hero.ctaLearn}
          </button>
        </div>
      </div>

      {/* ── Progress dots ─────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: "340px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 2s",
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              background: "none",
              border: "none",
              padding: "6px 0",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                height: "2px",
                width: i === activeIdx ? "36px" : "18px",
                background:
                  i === activeIdx
                    ? "rgba(212,184,138,0.3)"
                    : "rgba(248,245,240,0.25)",
                borderRadius: "1px",
                overflow: "hidden",
                transition: "width 0.4s ease",
                position: "relative",
              }}
            >
              {i === activeIdx && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: `${progress}%`,
                    background: "#D4B88A",
                    borderRadius: "1px",
                    transition: "width 0.05s linear",
                  }}
                />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* ── Arrow navigation ──────────────────────────────────── */}
      <button
        onClick={() => goToSlide(activeIdx - 1)}
        aria-label="Previous slide"
        style={{
          position: "absolute",
          left: "24px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 5,
          background: "rgba(248,245,240,0.08)",
          border: "1px solid rgba(248,245,240,0.2)",
          color: "#F8F5F0",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: loaded ? 0.7 : 0,
          transition: "opacity 1s ease 2s, background 0.2s ease",
          backdropFilter: "blur(4px)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(212,184,138,0.2)";
          e.currentTarget.style.opacity = "1";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(248,245,240,0.08)";
          e.currentTarget.style.opacity = "0.7";
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={() => goToSlide(activeIdx + 1)}
        aria-label="Next slide"
        style={{
          position: "absolute",
          right: "24px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 5,
          background: "rgba(248,245,240,0.08)",
          border: "1px solid rgba(248,245,240,0.2)",
          color: "#F8F5F0",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: loaded ? 0.7 : 0,
          transition: "opacity 1s ease 2s, background 0.2s ease",
          backdropFilter: "blur(4px)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(212,184,138,0.2)";
          e.currentTarget.style.opacity = "1";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(248,245,240,0.08)";
          e.currentTarget.style.opacity = "0.7";
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* ── Booking widget ────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 4,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1s ease 1.6s, transform 1s ease 1.6s",
        }}
      >
        <div className="container" style={{ paddingBottom: 0 }}>
          <BookingWidget variant="hero" />
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: "320px",
          left: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          zIndex: 4,
          opacity: loaded ? 0.65 : 0,
          transition: "opacity 1s ease 2s",
          cursor: "pointer",
        }}
        onClick={() =>
          document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, rgba(248,245,240,0.6), transparent)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(248,245,240,0.5)",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          {t.hero.scrollLabel}
        </span>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
