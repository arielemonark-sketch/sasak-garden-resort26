/* ============================================================
   AmenitiesSection — Sasak Garden Resort
   65+ amenities organized by category with minimal vector icons
   ============================================================ */

import { useEffect, useRef, useState } from "react";

const amenityCategories = [
  {
    title: "Бассейн и отдых",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 12h20M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        <circle cx="12" cy="6" r="3" />
      </svg>
    ),
    items: ["Открытый бассейн", "Бесплатный вход в бассейн", "Бассейн с видом", "Шезлонги", "Зонты от солнца", "Пляж (250 м)", "Садовая мебель", "Терраса"],
  },
  {
    title: "Питание",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
        <path d="M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
      </svg>
    ),
    items: ["Ресторан на территории", "Завтрак по меню", "Доставка в номер", "Индонезийская кухня", "Средиземноморская кухня", "Американская кухня", "Вегетарианское меню", "Халяльное меню", "Веганское меню", "Безглютеновое меню"],
  },
  {
    title: "Номер",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
    items: ["Кондиционер", "Smart 4K TV", "Netflix, HBO, Mola", "Бесплатный Wi-Fi (200 Мбит/с)", "Горячий и холодный душ", "Биде", "Фен", "Тапочки", "Белоснежное бельё", "Ежедневная уборка"],
  },
  {
    title: "Ванная комната",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 6 6.5 3.5a1.5 1.5 0 00-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 002 2h12a2 2 0 002-2v-5" />
        <line x1="10" y1="5" x2="8" y2="7" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </svg>
    ),
    items: ["Собственная ванная комната", "Бесплатные туалетные принадлежности", "Полотенца", "Туалетная бумага", "Фен", "Биде", "Душ"],
  },
  {
    title: "Интернет и ТВ",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    items: ["Wi-Fi по всей территории", "Скорость до 200 Мбит/с", "Smart 4K TV", "Потоковые сервисы", "Платные ТВ-каналы"],
  },
  {
    title: "Парковка и транспорт",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    items: ["Бесплатная частная парковка", "Трансфер (оплачивается отдельно)", "Такси по запросу"],
  },
  {
    title: "Сервис",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    items: ["Круглосуточная стойка регистрации", "Услуги консьержа", "Обмен валюты", "Ускоренный заезд/выезд", "Услуги по глажению", "Конференц-зал", "Круглосуточная охрана"],
  },
  {
    title: "Безопасность",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    items: ["Видеонаблюдение", "Охранная сигнализация", "Электронный ключ", "Круглосуточная охрана", "Звукоизолированные номера"],
  },
];

export default function AmenitiesSection() {
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
      id="amenities"
      ref={sectionRef}
      style={{
        background: "#F8F5F0",
        padding: "120px 0",
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
          className="amenities-header"
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <span className="section-label">04 — Удобства</span>
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
              65+ удобств
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "#2C1810" }}>
                для вашего комфорта
              </em>
            </h2>
          </div>
          <div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "17px",
                lineHeight: 1.8,
                color: "#5C3D2E",
                margin: 0,
              }}
            >
              Продуманные удобства с оценкой гостей{" "}
              <strong style={{ color: "#0F4A38" }}>9.9 из 10</strong>.
              Каждая деталь создана для того, чтобы ваш отдых был безупречным.
            </p>
          </div>
        </div>

        {/* Categories grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
          }}
          className="amenities-grid"
        >
          {amenityCategories.map((cat, i) => (
            <div
              key={cat.title}
              className="amenity-card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.8s ease ${i * 0.07}s, transform 0.8s ease ${i * 0.07}s`,
              }}
            >
              <div
                style={{
                  color: "#0F4A38",
                  marginBottom: "16px",
                }}
              >
                {cat.icon}
              </div>
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#0F4A38",
                  marginBottom: "16px",
                }}
              >
                {cat.title}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {cat.items.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      color: "#5C3D2E",
                      lineHeight: 1.6,
                      padding: "3px 0",
                    }}
                  >
                    <span
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "#D4B88A",
                        flexShrink: 0,
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Languages spoken */}
        <div
          style={{
            marginTop: "60px",
            padding: "32px",
            background: "#0F4A38",
            display: "flex",
            alignItems: "center",
            gap: "40px",
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#D4B88A",
                marginBottom: "8px",
              }}
            >
              Персонал говорит на
            </div>
            <div
              className="font-serif"
              style={{
                fontSize: "22px",
                fontWeight: 600,
                color: "#F8F5F0",
              }}
            >
              5 языках
            </div>
          </div>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {["Русский", "Английский", "Индонезийский", "Украинский", "Филиппинский"].map((lang) => (
              <span
                key={lang}
                style={{
                  padding: "6px 16px",
                  border: "1px solid rgba(212,184,138,0.4)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  color: "rgba(248,245,240,0.85)",
                }}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .amenities-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .amenities-grid {
            grid-template-columns: 1fr !important;
          }
          .amenities-header {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
