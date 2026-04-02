/* ============================================================
   RoomsSection — Sasak Garden Resort
   Room cards with photos, descriptions, amenities table
   ============================================================ */

import { useLang } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";

const rooms = [
  {
    id: 1,
    name: "Номер с кроватью King-Size",
    nameEn: "King Garden View Room",
    subtitle: "Вид на сад",
    description:
      "Просторный номер с большой двуспальной кроватью и панорамным видом на тропический сад. Идеально для пар, ищущих романтический отдых в окружении природы.",
    image: "https://cf.bstatic.com/xdata/images/hotel/max500/774374096.jpg?k=e65f26e52e07061158cb45eb30a8ae7032ce14de399d21132522e6b84ad04c01&o=",
    bed: "1 большая двуспальная кровать",
    guests: 2,
    features: ["Вид на сад", "Кондиционер", "Smart 4K TV", "Wi-Fi 200 Мбит/с", "Горячий душ", "Балкон"],
    price: "от $45/ночь",
    badge: "Популярный",
  },
  {
    id: 2,
    name: "Двухместный номер",
    nameEn: "Twin Garden View Room",
    subtitle: "2 отдельные кровати · Вид на сад",
    description:
      "Уютный номер с двумя односпальными кроватями, идеальный для друзей или коллег. Вид на ухоженный тропический сад и бассейн.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663493652122/RYSrvNWLgwRH3mdy9NGPmq/room-interior-GPNtYKYz8tg3Bcj9FMtdzZ.webp",
    bed: "2 односпальные кровати",
    guests: 2,
    features: ["Вид на сад", "Кондиционер", "Smart 4K TV", "Wi-Fi 200 Мбит/с", "Горячий душ", "Терраса"],
    price: "от $40/ночь",
    badge: null,
  },
];

const amenityRows = [
  { name: "Кондиционер", king: true, twin: true },
  { name: "Бесплатный Wi-Fi (200 Мбит/с)", king: true, twin: true },
  { name: "Smart 4K TV (Netflix, HBO)", king: true, twin: true },
  { name: "Горячий и холодный душ", king: true, twin: true },
  { name: "Вид на сад", king: true, twin: true },
  { name: "Балкон / Терраса", king: true, twin: true },
  { name: "Бесплатные туалетные принадлежности", king: true, twin: true },
  { name: "Фен", king: true, twin: true },
  { name: "Биде", king: true, twin: true },
  { name: "Тапочки", king: true, twin: true },
  { name: "Ежедневная уборка", king: true, twin: true },
  { name: "Завтрак по меню", king: true, twin: true },
];

export default function RoomsSection() {
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
      id="rooms"
      ref={sectionRef}
      style={{
        background: "#EDE4D8",
        padding: "120px 0",
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            marginBottom: "70px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
            <span className="section-label">{t.rooms.sectionNum}</span>
            <div className="gold-line" style={{ width: "40px" }} />
          </div>
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#0F4A38",
              margin: 0,
            }}
          >
            {t.rooms.title1}
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "#2C1810" }}>
              {t.rooms.title2}
            </em>
          </h2>
        </div>

        {/* Room cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "32px",
            marginBottom: "80px",
          }}
          className="rooms-grid"
        >
          {rooms.map((room, i) => (
            <div
              key={room.id}
              style={{
                background: "#F8F5F0",
                overflow: "hidden",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.9s ease ${i * 0.15}s, transform 0.9s ease ${i * 0.15}s`,
              }}
            >
              {/* Image */}
              <div className="gallery-item" style={{ aspectRatio: "4/3" }}>
                <img
                  src={room.image}
                  alt={room.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {room.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      background: "#D4B88A",
                      color: "#2C1810",
                      padding: "4px 12px",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {room.badge}
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: "32px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <div>
                    <h3
                      className="font-serif"
                      style={{
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "#0F4A38",
                        margin: "0 0 4px",
                      }}
                    >
                      {room.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "12px",
                        color: "#C9A46F",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        margin: 0,
                      }}
                    >
                      {room.subtitle}
                    </p>
                  </div>
                  <div
                    className="font-serif"
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#0F4A38",
                      textAlign: "right",
                    }}
                  >
                    {room.price}
                  </div>
                </div>

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: "#5C3D2E",
                    marginBottom: "20px",
                  }}
                >
                  {room.description}
                </p>

                {/* Features */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "24px",
                  }}
                >
                  {room.features.map((f) => (
                    <span
                      key={f}
                      style={{
                        padding: "4px 10px",
                        border: "1px solid rgba(212,184,138,0.4)",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11px",
                        color: "#5C3D2E",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Bed info */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "24px",
                    paddingTop: "16px",
                    borderTop: "1px solid rgba(212,184,138,0.25)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A46F" strokeWidth="1.5">
                    <path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8" />
                    <path d="M4 10V6a2 2 0 012-2h12a2 2 0 012 2v4" />
                    <path d="M12 10v4" />
                    <path d="M2 18h20" />
                  </svg>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      color: "#5C3D2E",
                    }}
                  >
                    {room.bed}
                  </span>
                  <span style={{ marginLeft: "auto", fontSize: "13px", color: "#999" }}>
                    {room.guests}
                  </span>
                </div>

                <a
                  href="https://www.booking.com/hotel/id/sasak-garden-homestay-mataram.ru.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-booking"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  {t.rooms.bookRoom}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Amenity comparison table */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s",
          }}
        >
          <h3
            className="font-serif"
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: "#0F4A38",
              marginBottom: "32px",
            }}
          >
            {t.rooms.compareTitle}
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(212,184,138,0.5)" }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px 16px",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#999",
                    }}
                  >
                    {t.rooms.feature}
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      padding: "12px 16px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#0F4A38",
                    }}
                  >
                    King-Size
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      padding: "12px 16px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#0F4A38",
                    }}
                  >
                    Twin
                  </th>
                </tr>
              </thead>
              <tbody>
                {amenityRows.map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: "1px solid rgba(212,184,138,0.2)",
                      background: i % 2 === 0 ? "rgba(248,245,240,0.5)" : "transparent",
                    }}
                  >
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: "14px",
                        color: "#5C3D2E",
                      }}
                    >
                      {row.name}
                    </td>
                    <td style={{ textAlign: "center", padding: "12px 16px" }}>
                      {row.king ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F4A38" strokeWidth="2.5" style={{ display: "inline-block" }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <span style={{ color: "#ccc", fontSize: "16px" }}>—</span>
                      )}
                    </td>
                    <td style={{ textAlign: "center", padding: "12px 16px" }}>
                      {row.twin ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F4A38" strokeWidth="2.5" style={{ display: "inline-block" }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <span style={{ color: "#ccc", fontSize: "16px" }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .rooms-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
