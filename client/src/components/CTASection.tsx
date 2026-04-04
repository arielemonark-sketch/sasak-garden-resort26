/* ============================================================
   CTASection — Sasak Garden Resort
   Design: Kinfolk Tropical Editorial
   Placed immediately after HeroSection
   Left: real pool photo (CDN) + trust stats
   Right: video reel (3 videos auto-cycling) + booking CTA
   Colors: Cream #F8F5F0, Emerald #0F4A38, Gold #D4B88A
   Fonts: Playfair Display (headings) + DM Sans (body)
   ============================================================ */

import { useLang } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";

const POOL_PHOTO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/pool-main_6c16ad38.jpg";

const VIDEOS = [
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/resort-video-1_65660c23.mp4",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/resort-video-2_eebc95f3.mp4",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/resort-video-3_f17bfd53.mp4",
];

const STATS_DATA: Record<string, Array<{value: string; label: string}>> = {
  ru: [
    { value: "9.9", label: "Рейтинг Booking.com" },
    { value: "113+", label: "Отзывов гостей" },
    { value: "300м", label: "До пляжа" },
    { value: "24/7", label: "Ресепшн" },
  ],
  en: [
    { value: "9.9", label: "Booking.com Score" },
    { value: "113+", label: "Guest Reviews" },
    { value: "300m", label: "To the Beach" },
    { value: "24/7", label: "Reception" },
  ],
  id: [
    { value: "9.9", label: "Skor Booking.com" },
    { value: "113+", label: "Ulasan Tamu" },
    { value: "300m", label: "Ke Pantai" },
    { value: "24/7", label: "Resepsionis" },
  ],
};

export default function CTASection() {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [videoIdx, setVideoIdx] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  const stats = STATS_DATA[lang] ?? STATS_DATA.en;

  // Intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-cycle videos
  useEffect(() => {
    const timer = setInterval(() => {
      setVideoIdx((prev) => (prev + 1) % VIDEOS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Reload video when index changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [videoIdx]);

  return (
    <>
      <section
        id="cta-pool"
        ref={sectionRef}
        style={{
          background: "#F8F5F0",
          padding: "0",
          overflow: "hidden",
        }}
      >
        {/* Main split layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: "600px",
          }}
          className="cta-grid"
        >
          {/* LEFT — Pool photo + stats overlay */}
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.9s ease, transform 0.9s ease",
            }}
          >
            {/* Pool image */}
            <img
              src={POOL_PHOTO}
              alt="Sasak Garden Resort Pool"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />

            {/* Dark gradient overlay at bottom */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(15,74,56,0.85) 0%, rgba(15,74,56,0.2) 50%, transparent 100%)",
              }}
            />

            {/* Stats grid over photo */}
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                right: "0",
                padding: "32px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1px",
                background: "rgba(15,74,56,0.6)",
                backdropFilter: "blur(8px)",
              }}
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  style={{
                    padding: "16px 20px",
                    borderRight: i % 2 === 0 ? "1px solid rgba(248,245,240,0.12)" : "none",
                    borderBottom: i < 2 ? "1px solid rgba(248,245,240,0.12)" : "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "#D4B88A",
                      lineHeight: 1,
                      marginBottom: "4px",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      color: "rgba(248,245,240,0.65)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* "Real photo" badge */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                background: "rgba(15,74,56,0.85)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(212,184,138,0.3)",
                borderRadius: "100px",
                padding: "6px 14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#D4B88A",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10px",
                  color: "#D4B88A",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                {lang === "ru" ? "Реальное фото" : lang === "id" ? "Foto Asli" : "Real Photo"}
              </span>
            </div>
          </div>

          {/* RIGHT — Video + CTA */}
          <div
            style={{
              background: "#0F4A38",
              display: "flex",
              flexDirection: "column",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s",
            }}
          >
            {/* Video preview area */}
            <div
              style={{
                position: "relative",
                flex: "0 0 55%",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={() => setVideoOpen(true)}
            >
              <video
                ref={videoRef}
                key={videoIdx}
                autoPlay
                muted
                loop={false}
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              >
                <source src={VIDEOS[videoIdx]} type="video/mp4" />
              </video>

              {/* Play button overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(15,74,56,0.25)",
                  transition: "background 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.background =
                    "rgba(15,74,56,0.45)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.background =
                    "rgba(15,74,56,0.25)")
                }
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "rgba(212,184,138,0.9)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(4px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    style={{ marginLeft: "3px" }}
                  >
                    <path d="M6 4l12 6-12 6V4z" fill="#0F4A38" />
                  </svg>
                </div>
              </div>

              {/* Video counter dots */}
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: "6px",
                }}
              >
                {VIDEOS.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setVideoIdx(i);
                    }}
                    style={{
                      width: i === videoIdx ? "20px" : "6px",
                      height: "6px",
                      borderRadius: "3px",
                      background:
                        i === videoIdx
                          ? "#D4B88A"
                          : "rgba(248,245,240,0.4)",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>

              {/* Label */}
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "rgba(15,74,56,0.8)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(212,184,138,0.25)",
                  borderRadius: "100px",
                  padding: "5px 12px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "10px",
                    color: "#D4B88A",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {lang === "ru" ? "Видео резорта" : lang === "id" ? "Video Resort" : "Resort Video"}
                </span>
              </div>
            </div>

            {/* CTA content */}
            <div
              style={{
                flex: 1,
                padding: "36px 40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#D4B88A",
                    marginBottom: "10px",
                    fontWeight: 500,
                  }}
                >
                  {"Senggigi, Lombok"}
                </div>
                <h3
                  className="font-serif"
                  style={{
                    fontSize: "clamp(22px, 2.5vw, 30px)",
                    fontWeight: 700,
                    color: "#F8F5F0",
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  {lang === "ru" ? "Тропический рай" : lang === "id" ? "Surga tropis" : "Your tropical paradise"}
                  <br />
                  <em
                    style={{
                      fontStyle: "italic",
                      fontWeight: 400,
                      color: "#D4B88A",
                    }}
                  >
                    {lang === "ru" ? "ждёт вас" : lang === "id" ? "menanti Anda" : "awaits you"}
                  </em>
                </h3>
              </div>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "rgba(248,245,240,0.65)",
                  margin: 0,
                }}
              >
                {lang === "ru"
                  ? "Открытый бассейн, тропический сад, ресторан и пляж в 300 метрах. Бесплатная парковка и Wi-Fi 200 Мбит/с."
                  : lang === "id"
                  ? "Kolam renang, taman tropis, restoran, dan pantai hanya 300m. Parkir gratis dan Wi-Fi 200 Mbps."
                  : "Open pool, tropical garden, restaurant and beach just 300m away. Free parking and 200 Mbps Wi-Fi included."}
              </p>

              {/* Trust row */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                {[
                  { icon: "✓", text: lang === "ru" ? "Бесплатная отмена" : lang === "id" ? "Pembatalan gratis" : "Free cancellation" },
                  { icon: "✓", text: lang === "ru" ? "Завтрак включён" : lang === "id" ? "Sarapan termasuk" : "Breakfast included" },
                  { icon: "✓", text: lang === "ru" ? "Лучшая цена" : lang === "id" ? "Harga terbaik" : "Best price" },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        background: "rgba(212,184,138,0.15)",
                        border: "1px solid rgba(212,184,138,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "9px",
                        color: "#D4B88A",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "12px",
                        color: "rgba(248,245,240,0.6)",
                      }}
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA button */}
              <a
                href="#booking"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  background: "#D4B88A",
                  color: "#0F4A38",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "14px 28px",
                  borderRadius: "2px",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  alignSelf: "flex-start",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#C9A870";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(212,184,138,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#D4B88A";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="3" width="14" height="11" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M1 7h14" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M5 1v4M11 1v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                {lang === "ru" ? "Забронировать номер" : lang === "id" ? "Pesan Kamar" : "Book Your Room"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen video lightbox */}
      {videoOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.92)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setVideoOpen(false)}
        >
          <button
            onClick={() => setVideoOpen(false)}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "rgba(248,245,240,0.1)",
              border: "1px solid rgba(248,245,240,0.2)",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              cursor: "pointer",
              color: "#F8F5F0",
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
          <video
            autoPlay
            controls
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              borderRadius: "4px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <source src={VIDEOS[videoIdx]} type="video/mp4" />
          </video>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
        @media (max-width: 768px) {
          .cta-grid {
            grid-template-columns: 1fr !important;
          }
          .cta-grid > div:first-child {
            min-height: 300px;
          }
        }
      `}</style>
    </>
  );
}
