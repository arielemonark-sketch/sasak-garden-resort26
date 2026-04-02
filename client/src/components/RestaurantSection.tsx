/* ============================================================
   RestaurantSection — Sasak Garden Resort
   Full-bleed restaurant section with menu highlights
   ============================================================ */

import { useLang } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";

const menuHighlights = [
  { category: "Завтрак", items: ["Nasi Goreng", "Eggs Benedict", "Tropical Fruit Platter", "Pancakes with Coconut Syrup"] },
  { category: "Основные блюда", items: ["Grilled Barramundi", "Beef Rendang", "Mediterranean Pasta", "Sasak Chicken Satay"] },
  { category: "Напитки", items: ["Fresh Coconut Water", "Tropical Smoothies", "Indonesian Coffee", "Herbal Teas"] },
  { category: "Десерты", items: ["Klepon (Rice Balls)", "Pandan Cake", "Mango Sorbet", "Banana Fritters"] },
];

export default function RestaurantSection() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="restaurant"
      ref={sectionRef}
      style={{
        background: "#F8F5F0",
        padding: "0",
        overflow: "hidden",
      }}
    >
      {/* Full-bleed image with overlay text */}
      <div
        style={{
          position: "relative",
          height: "70vh",
          minHeight: "500px",
          overflow: "hidden",
        }}
      >
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/restaurant-terrace-8zRSRouaYRQzWZ2AzYBndn.webp"
          alt="Ресторан Sasak Garden Resort"
          style={{
            width: "100%",
            height: "115%",
            objectFit: "cover",
            objectPosition: "center",
            transform: "translateY(-7%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(10,30,20,0.75) 0%, rgba(10,30,20,0.4) 50%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="container">
            <div style={{ maxWidth: "520px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "24px",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.8s ease, transform 0.8s ease",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#D4B88A",
                  }}
                >
                  {t.restaurant.sectionNum}
                </span>
                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, #D4B88A, transparent)",
                  }}
                />
              </div>
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(36px, 5vw, 64px)",
                  fontWeight: 700,
                  lineHeight: 1.05,
                  color: "#F8F5F0",
                  marginBottom: "24px",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
                }}
              >
                {t.restaurant.title1}
                <br />
                <em style={{ fontStyle: "italic", fontWeight: 400, color: "#D4B88A" }}>
                  {t.restaurant.title2}
                </em>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "17px",
                  lineHeight: 1.75,
                  color: "rgba(248,245,240,0.85)",
                  marginBottom: "32px",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
                }}
              >
                {t.restaurant.desc}
              </p>
              <div
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
                }}
              >
                <a
                  href="https://www.booking.com/hotel/id/sasak-garden-homestay-mataram.ru.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  {t.restaurant.cta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu highlights */}
      <div
        style={{
          background: "#EDE4D8",
          padding: "80px 0",
        }}
      >
        <div className="container">
          <div
            style={{
              textAlign: "center",
              marginBottom: "60px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
            }}
          >
            <h3
              className="font-serif"
              style={{
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 600,
                color: "#0F4A38",
                marginBottom: "12px",
              }}
            >
              {t.restaurant.menuTitle}
            </h3>
            <div
              style={{
                width: "60px",
                height: "1px",
                background: "linear-gradient(90deg, transparent, #D4B88A, transparent)",
                margin: "0 auto",
              }}
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
            }}
            className="menu-grid"
          >
            {menuHighlights.map((section, i) => {
              const catKey = ["breakfast","mains","drinks","desserts"][i] as keyof typeof t.restaurant.categories;
              return (<div
                key={section.category}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.8s ease ${i * 0.1 + 0.4}s, transform 0.8s ease ${i * 0.1 + 0.4}s`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#C9A46F",
                    marginBottom: "16px",
                    paddingBottom: "12px",
                    borderBottom: "1px solid rgba(212,184,138,0.4)",
                  }}
                >
                  {t.restaurant.categories[catKey]}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {section.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "15px",
                        lineHeight: 1.6,
                        color: "#5C3D2E",
                        padding: "6px 0",
                        borderBottom: "1px solid rgba(212,184,138,0.15)",
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .menu-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .menu-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
