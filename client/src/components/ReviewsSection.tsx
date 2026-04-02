/* ============================================================
   ReviewsSection — Sasak Garden Resort
   Guest reviews from Booking.com with beautiful cards
   ============================================================ */

import { useLang } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";

const reviews = [
  {
    name: "Danii",
    country: "Россия",
    flag: "🇷🇺",
    rating: 10,
    text: "Не в первый раз посещаю данный резорт, очень комфортно и красиво. Персонал очень заботливый. Идеально для спокойного отдыха.",
    highlight: true,
  },
  {
    name: "Gleb",
    country: "Россия",
    flag: "🇷🇺",
    rating: 10,
    text: "Удобные кровати, зелень вокруг, тихий местный райончик. Всё что нужно для отдыха.",
    highlight: false,
  },
  {
    name: "Melodie",
    country: "Франция",
    flag: "🇫🇷",
    rating: 10,
    text: "Clean, really nice room, hot shower. Located only 5 min from Senggigi beach, ideal if you want to surf. The little welcome fruits & drink is a treat upon arrival.",
    highlight: false,
  },
  {
    name: "Gagnon",
    country: "Канада",
    flag: "🇨🇦",
    rating: 10,
    text: "In our opinion, this is the best hotel on the island! We stayed in a water bungalow, the rooms near the pool are definitely the best. We were absolutely delighted.",
    highlight: true,
  },
  {
    name: "Bouchard",
    country: "Австралия",
    flag: "🇦🇺",
    rating: 10,
    text: "I love how charming this place. It has such a warm and hospitable staff. Highly recommended!",
    highlight: false,
  },
  {
    name: "Danii",
    country: "Канада",
    flag: "🇨🇦",
    rating: 10,
    text: "Everything was top-notch during my stay at Sasak Garden. From the moment I arrived, I felt a unique, welcoming atmosphere that you won't find in big hotels.",
    highlight: false,
  },
  {
    name: "Martin",
    country: "Дания",
    flag: "🇩🇰",
    rating: 10,
    text: "They couldn't do enough. True value for money. Very helpful and lovely breakfast. Great quiet pool, and wifi and tv was better than I have experienced before.",
    highlight: false,
  },
  {
    name: "Alison",
    country: "Великобритания",
    flag: "🇬🇧",
    rating: 10,
    text: "Clean & comfortable room. All rooms overlook the well designed garden and pool area. This is the best place I've been to on the hill, the staff is wonderful.",
    highlight: true,
  },
  {
    name: "Lu",
    country: "Индонезия",
    flag: "🇮🇩",
    rating: 10,
    text: "Красивое и тихое место. Очень хорошие владельцы резорта — встретили меня очень поздно ночью, хотя я забыл предупредить.",
    highlight: false,
  },
];

const ratingCategoriesBase = [
  { key: "staff", score: 10.0 },
  { key: "facilities", score: 9.9 },
  { key: "cleanliness", score: 9.9 },
  { key: "comfort", score: 9.9 },
  { key: "value", score: 9.9 },
  { key: "location", score: 9.8 },
];

export default function ReviewsSection() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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

  // Auto-rotate featured review
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.filter((r) => r.highlight).length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const highlightedReviews = reviews.filter((r) => r.highlight);
  const regularReviews = reviews.filter((r) => !r.highlight);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      style={{
        background: "#0F4A38",
        padding: "120px 0",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "end",
            marginBottom: "80px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
          className="reviews-header"
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D4B88A" }}>
                {t.reviews.sectionNum}
              </span>
              <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, #D4B88A, transparent)" }} />
            </div>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: "#F8F5F0",
                margin: 0,
              }}
            >
              {t.reviews.title1}
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "#D4B88A" }}>
                {t.reviews.title2}
              </em>
            </h2>
          </div>

          {/* Overall rating */}
          <div
            style={{
              display: "flex",
              gap: "32px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                className="font-serif"
                style={{
                  fontSize: "72px",
                  fontWeight: 800,
                  color: "#D4B88A",
                  lineHeight: 1,
                }}
              >
                9.9
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  color: "rgba(248,245,240,0.7)",
                  letterSpacing: "0.08em",
                  marginTop: "8px",
                }}
              >
                {t.reviews.overallLabel}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: "200px" }}>
              {ratingCategoriesBase.map((cat) => (
                <div
                  key={cat.key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      color: "rgba(248,245,240,0.7)",
                      width: "120px",
                      flexShrink: 0,
                    }}
                  >
                    {t.reviews.ratingLabels[cat.key as keyof typeof t.reviews.ratingLabels]}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: "2px",
                      background: "rgba(248,245,240,0.15)",
                      borderRadius: "1px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${(cat.score / 10) * 100}%`,
                        height: "100%",
                        background: "#D4B88A",
                        transition: "width 1.5s ease",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#D4B88A",
                      width: "30px",
                      textAlign: "right",
                    }}
                  >
                    {cat.score.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured review carousel */}
        <div
          style={{
            marginBottom: "60px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}
        >
          <div
            style={{
              padding: "48px",
              background: "rgba(248,245,240,0.06)",
              border: "1px solid rgba(212,184,138,0.2)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              className="font-serif"
              style={{
                fontSize: "120px",
                color: "rgba(212,184,138,0.08)",
                lineHeight: 0.8,
                position: "absolute",
                top: "20px",
                left: "32px",
              }}
            >
              "
            </div>
            <p
              className="font-serif"
              style={{
                fontSize: "clamp(18px, 2.5vw, 26px)",
                fontStyle: "italic",
                lineHeight: 1.6,
                color: "#F8F5F0",
                marginBottom: "32px",
                position: "relative",
                zIndex: 1,
              }}
            >
              {highlightedReviews[activeIndex % highlightedReviews.length]?.text}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "rgba(212,184,138,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#D4B88A",
                }}
              >
                {highlightedReviews[activeIndex % highlightedReviews.length]?.name[0]}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#F8F5F0",
                  }}
                >
                  {highlightedReviews[activeIndex % highlightedReviews.length]?.name}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    color: "#D4B88A",
                  }}
                >
                  {highlightedReviews[activeIndex % highlightedReviews.length]?.flag}{" "}
                  {highlightedReviews[activeIndex % highlightedReviews.length]?.country}
                </div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
                {highlightedReviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    style={{
                      width: i === activeIndex % highlightedReviews.length ? "24px" : "8px",
                      height: "8px",
                      borderRadius: "4px",
                      background: i === activeIndex % highlightedReviews.length ? "#D4B88A" : "rgba(212,184,138,0.3)",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Regular reviews grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
          className="reviews-grid"
        >
          {regularReviews.slice(0, 6).map((review, i) => (
            <div
              key={i}
              style={{
                padding: "28px",
                background: "rgba(248,245,240,0.05)",
                borderLeft: "2px solid rgba(212,184,138,0.4)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.8s ease ${i * 0.08 + 0.4}s, transform 0.8s ease ${i * 0.08 + 0.4}s`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(212,184,138,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#D4B88A",
                    flexShrink: 0,
                  }}
                >
                  {review.name[0]}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#F8F5F0",
                    }}
                  >
                    {review.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      color: "rgba(212,184,138,0.8)",
                    }}
                  >
                    {review.flag} {review.country}
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: "auto",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#D4B88A",
                  }}
                >
                  {review.rating}
                </div>
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "rgba(248,245,240,0.75)",
                  margin: 0,
                }}
              >
                "{review.text}"
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            textAlign: "center",
            marginTop: "60px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.8s",
          }}
        >
          <a
            href="https://www.booking.com/hotel/id/sasak-garden-homestay-mataram.ru.html#tab-reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            Читать все 113 отзывов
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .reviews-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .reviews-grid {
            grid-template-columns: 1fr !important;
          }
          .reviews-header {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
