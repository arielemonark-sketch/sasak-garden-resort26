/* ============================================================
   AboutSection — Sasak Garden Resort
   Storytelling block: Sunny's story, resort description
   Kinfolk editorial: asymmetric layout, large serif quote
   ============================================================ */

import { useLang } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: "#F8F5F0",
        padding: "120px 0",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Section label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "80px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <span className="section-label">{t.about.sectionNum}</span>
          <div className="gold-line" style={{ width: "40px" }} />
        </div>

        {/* Main layout: text left, image right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* Left: text content */}
          <div>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(36px, 4.5vw, 58px)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "#0F4A38",
                marginBottom: "32px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
              }}
            >
              {t.about.title1}
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "#2C1810" }}>
                {t.about.title2}
              </em>
            </h2>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "18px",
                lineHeight: 1.85,
                color: "#5C3D2E",
                marginBottom: "24px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.9s ease 0.25s, transform 0.9s ease 0.25s",
              }}
            >
              {t.about.p1}
            </p>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "18px",
                lineHeight: 1.85,
                color: "#5C3D2E",
                marginBottom: "40px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.9s ease 0.35s, transform 0.9s ease 0.35s",
              }}
            >
              {t.about.p2}
            </p>

            {/* Stats row */}
            <div
              style={{
                display: "flex",
                gap: "40px",
                paddingTop: "32px",
                borderTop: "1px solid rgba(212,184,138,0.3)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.9s ease 0.45s, transform 0.9s ease 0.45s",
              }}
            >
              {[
                { num: t.about.stat1Val, label: t.about.stat1Label },
                { num: t.about.stat2Val, label: t.about.stat2Label },
                { num: t.about.stat3Val, label: t.about.stat3Label },
                { num: t.about.stat4Val, label: t.about.stat4Label },
              ].map((stat) => (
                <div key={stat.num} style={{ textAlign: "center" }}>
                  <div
                    className="font-serif"
                    style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "#0F4A38",
                      lineHeight: 1,
                    }}
                  >
                    {stat.num}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      color: "#999",
                      letterSpacing: "0.08em",
                      marginTop: "6px",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image + Sunny quote */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
            }}
          >
            {/* Main image */}
            <div
              className="gallery-item"
              style={{ aspectRatio: "4/3", overflow: "hidden" }}
            >
              <img
                src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/804044336.jpg?k=2131400f8608042488b89cd4c58eb20709694f2cbc403f7116cee260befef121&o="
                alt="Бассейн Sasak Garden Resort"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Sunny quote card */}
            <div
              style={{
                background: "#0F4A38",
                padding: "32px",
                position: "relative",
              }}
            >
              <div
                className="font-serif"
                style={{
                  fontSize: "48px",
                  color: "rgba(212,184,138,0.3)",
                  lineHeight: 1,
                  position: "absolute",
                  top: "16px",
                  left: "24px",
                }}
              >
                "
              </div>
              <p
                className="font-serif"
                style={{
                  fontSize: "17px",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  color: "rgba(248,245,240,0.9)",
                  marginBottom: "20px",
                  paddingTop: "16px",
                }}
              >
                {t.about.quote}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(212,184,138,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#D4B88A",
                  }}
                >
                  S
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
                    Sunny
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      color: "#D4B88A",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {t.about.quoteAuthor}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
