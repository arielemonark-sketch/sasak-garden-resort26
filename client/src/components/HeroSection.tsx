/* ============================================================
   HeroSection — Sasak Garden Resort
   Full-viewport immersive hero with parallax, large serif title
   ============================================================ */

import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.4;

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "600px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background image with parallax */}
      <div
        style={{
          position: "absolute",
          inset: "-20% 0",
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/hero-pool-Pue6srXm3JVMUm9PHDPzym.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${parallaxOffset}px)`,
          transition: "transform 0.1s linear",
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(15,74,56,0.35) 0%, rgba(10,30,20,0.55) 50%, rgba(10,30,20,0.75) 100%)",
        }}
      />

      {/* Content */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {/* Label */}
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
            Сенггиги · Ломбок · Индонезия
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
          <em style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(248,245,240,0.85)" }}>
            Resort
          </em>
        </h1>

        {/* Gold line */}
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
          Ваш личный тропический оазис. Окружённый садами,
          в 5 минутах от пляжа Бату-Болонг.
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
              Великолепно
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                color: "rgba(248,245,240,0.6)",
                letterSpacing: "0.08em",
              }}
            >
              113 отзывов · Booking.com
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
            Забронировать сейчас
          </a>
          <button
            onClick={() => {
              document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-gold"
            style={{ background: "transparent" }}
          >
            Узнать больше
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          opacity: loaded ? 0.7 : 0,
          transition: "opacity 1s ease 2s",
          cursor: "pointer",
        }}
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(248,245,240,0.6)",
          }}
        >
          Прокрутить
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, rgba(248,245,240,0.6), transparent)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(0.7); }
        }
      `}</style>
    </section>
  );
}
