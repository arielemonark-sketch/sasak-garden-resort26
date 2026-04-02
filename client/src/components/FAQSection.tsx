/* ============================================================
   FAQSection — Sasak Garden Resort
   Accordion FAQ with RU/EN i18n — transfer, pets, parking, etc.
   Design: Kinfolk Tropical Editorial — cream bg, emerald accents
   ============================================================ */

import { useLang } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";

export default function FAQSection() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      id="faq"
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
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "end",
            marginBottom: "80px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
          className="faq-header"
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#C9A46F",
                }}
              >
                {t.faq.sectionNum}
              </span>
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, #C9A46F, transparent)",
                }}
              />
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
              {t.faq.title1}
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "#2C1810" }}>
                {t.faq.title2}
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
                margin: "0 0 32px",
              }}
            >
              {t.faq.subtitle}
            </p>
            <a
              href="https://wa.me/6281917776161"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 28px",
                background: "#25D366",
                color: "#fff",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1ebe5d";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#25D366";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.faq.ctaContact}
            </a>
          </div>
        </div>

        {/* Accordion */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 48px",
            alignItems: "start",
          }}
          className="faq-grid"
        >
          {/* Left column: questions 0-4 */}
          <div>
            {t.faq.questions.slice(0, 5).map((item, i) => (
              <FAQItem
                key={i}
                index={i}
                question={item.q}
                answer={item.a}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                visible={visible}
                delay={i * 0.06}
              />
            ))}
          </div>
          {/* Right column: questions 5-9 */}
          <div>
            {t.faq.questions.slice(5, 10).map((item, i) => (
              <FAQItem
                key={i + 5}
                index={i + 5}
                question={item.q}
                answer={item.a}
                isOpen={openIndex === i + 5}
                onToggle={() => toggle(i + 5)}
                visible={visible}
                delay={(i + 5) * 0.06}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .faq-header {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .faq-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

interface FAQItemProps {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  visible: boolean;
  delay: number;
}

function FAQItem({ question, answer, isOpen, onToggle, visible, delay }: FAQItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [answer]);

  return (
    <div
      style={{
        borderBottom: "1px solid rgba(15,74,56,0.15)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          padding: "22px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px",
            fontWeight: isOpen ? 600 : 500,
            lineHeight: 1.5,
            color: isOpen ? "#0F4A38" : "#2C1810",
            transition: "color 0.3s ease",
            flex: 1,
          }}
        >
          {question}
        </span>
        {/* Plus/minus icon */}
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            border: `1px solid ${isOpen ? "#0F4A38" : "rgba(15,74,56,0.3)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.3s ease",
            background: isOpen ? "#0F4A38" : "transparent",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke={isOpen ? "#F8F5F0" : "#0F4A38"}
            strokeWidth="1.5"
            style={{
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          >
            <line x1="6" y1="1" x2="6" y2="11" />
            <line x1="1" y1="6" x2="11" y2="6" />
          </svg>
        </div>
      </button>

      {/* Animated answer */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: isOpen ? `${height}px` : "0px",
          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          ref={contentRef}
          style={{
            paddingBottom: "20px",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              lineHeight: 1.8,
              color: "#5C3D2E",
              margin: 0,
            }}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
