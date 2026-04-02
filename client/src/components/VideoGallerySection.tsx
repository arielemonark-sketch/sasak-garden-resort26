/* ============================================================
   VideoGallerySection — Sasak Garden Resort
   7-video gallery with masonry grid, hover-play previews,
   fullscreen lightbox with prev/next navigation
   Design: Kinfolk Tropical Editorial
   Colors: Cream #F8F5F0, Emerald #0F4A38, Gold #D4B88A
   ============================================================ */

import { useLang } from "@/contexts/LanguageContext";
import { useCallback, useEffect, useRef, useState } from "react";

/* ---- CDN video URLs ---- */
const VIDEO_URLS = [
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/video1_cropped_553ebac6.mp4",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/video2_0ac52be3.mp4",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/video3_f87d20c9.mp4",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/video4_178f6258.mp4",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/video5_afc09ad1.mp4",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/video6_9fa01e25.mp4",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/video7_3b9fb3b1.mp4",
];

/* ---- Play icon SVG ---- */
const PlayIcon = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="23" stroke="rgba(248,245,240,0.9)" strokeWidth="1.5" fill="rgba(15,74,56,0.7)" />
    <polygon points="19,14 37,24 19,34" fill="#F8F5F0" />
  </svg>
);

/* ---- Close icon ---- */
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ---- Arrow icon ---- */
const ArrowIcon = ({ dir }: { dir: "left" | "right" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {dir === "left"
      ? <><polyline points="15 18 9 12 15 6" /></>
      : <><polyline points="9 6 15 12 9 18" /></>
    }
  </svg>
);

export default function VideoGallerySection() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Keyboard navigation */
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (lightboxIndex === null) return;
    if (e.key === "Escape") setLightboxIndex(null);
    if (e.key === "ArrowLeft") setLightboxIndex((i) => i !== null ? Math.max(0, i - 1) : null);
    if (e.key === "ArrowRight") setLightboxIndex((i) => i !== null ? Math.min(VIDEO_URLS.length - 1, i + 1) : null);
  }, [lightboxIndex]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  /* Lock body scroll when lightbox open */
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  const labels = t.videoGallery.videoLabels;

  return (
    <section
      id="video-gallery"
      ref={sectionRef}
      style={{ background: "#1A1A1A", padding: "120px 0", position: "relative", overflow: "hidden" }}
    >
      {/* Subtle grain overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
        opacity: 0.4,
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>

        {/* ---- Header ---- */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "64px",
            gap: "40px",
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500,
                letterSpacing: "0.18em", textTransform: "uppercase", color: "#D4B88A",
              }}>
                {t.videoGallery.sectionNum}
              </span>
              <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, #D4B88A, transparent)" }} />
            </div>
            <h2 className="font-serif" style={{
              fontSize: "clamp(36px, 4.5vw, 60px)", fontWeight: 700,
              lineHeight: 1.05, color: "#F8F5F0", margin: 0,
            }}>
              {t.videoGallery.title1}
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "#D4B88A" }}>
                {t.videoGallery.title2}
              </em>
            </h2>
          </div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "16px", lineHeight: 1.8,
            color: "rgba(248,245,240,0.55)", margin: 0, maxWidth: "420px",
          }}>
            {t.videoGallery.subtitle}
          </p>
        </div>

        {/* ---- Masonry-style grid ---- */}
        {/* Layout: row1 = [big(2/3) | small(1/3)], row2 = [small | small | small], row3 = [small | big] */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

          {/* Row 1: video 0 (large) + video 1 (small) */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "12px" }} className="vg-row1">
            <VideoCard
              url={VIDEO_URLS[0]}
              label={labels[0]}
              index={0}
              onOpen={setLightboxIndex}
              visible={visible}
              delay={0}
              aspectRatio="56.25%"
              playLabel={t.videoGallery.playLabel}
            />
            <VideoCard
              url={VIDEO_URLS[1]}
              label={labels[1]}
              index={1}
              onOpen={setLightboxIndex}
              visible={visible}
              delay={0.08}
              aspectRatio="56.25%"
              playLabel={t.videoGallery.playLabel}
            />
          </div>

          {/* Row 2: videos 2, 3, 4 (equal) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }} className="vg-row2">
            {[2, 3, 4].map((idx, i) => (
              <VideoCard
                key={idx}
                url={VIDEO_URLS[idx]}
                label={labels[idx]}
                index={idx}
                onOpen={setLightboxIndex}
                visible={visible}
                delay={0.12 + i * 0.07}
                aspectRatio="62%"
                playLabel={t.videoGallery.playLabel}
              />
            ))}
          </div>

          {/* Row 3: video 5 (small) + video 6 (large) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "12px" }} className="vg-row3">
            <VideoCard
              url={VIDEO_URLS[5]}
              label={labels[5]}
              index={5}
              onOpen={setLightboxIndex}
              visible={visible}
              delay={0.32}
              aspectRatio="56.25%"
              playLabel={t.videoGallery.playLabel}
            />
            <VideoCard
              url={VIDEO_URLS[6]}
              label={labels[6]}
              index={6}
              onOpen={setLightboxIndex}
              visible={visible}
              delay={0.38}
              aspectRatio="56.25%"
              playLabel={t.videoGallery.playLabel}
            />
          </div>
        </div>
      </div>

      {/* ---- Lightbox ---- */}
      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          total={VIDEO_URLS.length}
          url={VIDEO_URLS[lightboxIndex]}
          label={labels[lightboxIndex]}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => i !== null ? Math.max(0, i - 1) : null)}
          onNext={() => setLightboxIndex((i) => i !== null ? Math.min(VIDEO_URLS.length - 1, i + 1) : null)}
          closeLabel={t.videoGallery.closeLabel}
          prevLabel={t.videoGallery.prevLabel}
          nextLabel={t.videoGallery.nextLabel}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .vg-row1 { grid-template-columns: 1fr !important; }
          .vg-row2 { grid-template-columns: 1fr 1fr !important; }
          .vg-row3 { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .vg-row2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ---- Video Card ---- */
interface VideoCardProps {
  url: string;
  label: string;
  index: number;
  onOpen: (i: number) => void;
  visible: boolean;
  delay: number;
  aspectRatio: string;
  playLabel: string;
}

function VideoCard({ url, label, index, onOpen, visible, delay, aspectRatio, playLabel }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(index)}
      style={{
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {/* Aspect ratio wrapper */}
      <div style={{ position: "relative", paddingBottom: aspectRatio, height: 0 }}>
        {/* Video element (muted preview on hover) */}
        <video
          ref={videoRef}
          src={url}
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />

        {/* Dark overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: hovered
            ? "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(15,74,56,0.5) 100%)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)",
          transition: "background 0.4s ease",
        }} />

        {/* Play button */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: hovered ? 0 : 1,
          transform: hovered ? "scale(0.85)" : "scale(1)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}>
          <PlayIcon size={52} />
        </div>

        {/* Hover CTA */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column", gap: "10px",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1)" : "scale(0.9)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}>
          <PlayIcon size={56} />
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600,
            letterSpacing: "0.15em", textTransform: "uppercase", color: "#F8F5F0",
          }}>
            {playLabel}
          </span>
        </div>

        {/* Label badge */}
        <div style={{
          position: "absolute", bottom: "14px", left: "14px",
          padding: "5px 12px",
          background: "rgba(15,74,56,0.8)",
          backdropFilter: "blur(8px)",
          fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500,
          letterSpacing: "0.1em", textTransform: "uppercase", color: "#D4B88A",
        }}>
          {label}
        </div>

        {/* Index number */}
        <div style={{
          position: "absolute", top: "14px", right: "14px",
          fontFamily: "'Playfair Display', serif", fontSize: "13px",
          color: "rgba(248,245,240,0.4)", fontStyle: "italic",
        }}>
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}

/* ---- Lightbox ---- */
interface LightboxProps {
  index: number;
  total: number;
  url: string;
  label: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
}

function Lightbox({ index, total, url, label, onClose, onPrev, onNext, closeLabel, prevLabel, nextLabel }: LightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [url]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.95)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "fadeIn 0.25s ease",
      }}
    >
      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>

      {/* Close button */}
      <button
        onClick={onClose}
        aria-label={closeLabel}
        style={{
          position: "absolute", top: "20px", right: "20px",
          width: "44px", height: "44px",
          background: "rgba(248,245,240,0.1)",
          border: "1px solid rgba(248,245,240,0.2)",
          color: "#F8F5F0", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s ease", zIndex: 10,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(248,245,240,0.2)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(248,245,240,0.1)"; }}
      >
        <CloseIcon />
      </button>

      {/* Counter */}
      <div style={{
        position: "absolute", top: "24px", left: "50%", transform: "translateX(-50%)",
        fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
        color: "rgba(248,245,240,0.5)", letterSpacing: "0.1em",
      }}>
        {index + 1} / {total}
      </div>

      {/* Prev button */}
      {index > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label={prevLabel}
          style={{
            position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)",
            width: "48px", height: "48px",
            background: "rgba(248,245,240,0.08)",
            border: "1px solid rgba(248,245,240,0.15)",
            color: "#F8F5F0", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s ease", zIndex: 10,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(248,245,240,0.18)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(248,245,240,0.08)"; }}
        >
          <ArrowIcon dir="left" />
        </button>
      )}

      {/* Next button */}
      {index < total - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label={nextLabel}
          style={{
            position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)",
            width: "48px", height: "48px",
            background: "rgba(248,245,240,0.08)",
            border: "1px solid rgba(248,245,240,0.15)",
            color: "#F8F5F0", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s ease", zIndex: 10,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(248,245,240,0.18)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(248,245,240,0.08)"; }}
        >
          <ArrowIcon dir="right" />
        </button>
      )}

      {/* Video player */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(90vw, 1100px)",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <video
          ref={videoRef}
          key={url}
          src={url}
          controls
          autoPlay
          playsInline
          style={{
            width: "100%",
            maxHeight: "78vh",
            objectFit: "contain",
            background: "#000",
            outline: "none",
          }}
        />
        {/* Label */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: "8px",
          borderTop: "1px solid rgba(248,245,240,0.1)",
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
            fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase",
            color: "#D4B88A",
          }}>
            {label}
          </span>
          <span style={{
            fontFamily: "'Playfair Display', serif", fontSize: "13px",
            fontStyle: "italic", color: "rgba(248,245,240,0.3)",
          }}>
            Sasak Garden Resort
          </span>
        </div>
      </div>
    </div>
  );
}
