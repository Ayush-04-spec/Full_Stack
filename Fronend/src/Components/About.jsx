import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    label: "who.we_are",
    title: "Who We Are",
    body: "Ajinkya Infotech is the premier Software Training Institute in Nashik, Maharashtra, focused on building strong digital and technical skills for future-ready careers.",
  },
  {
    label: "what.we_offer",
    title: "What We Offer",
    body: "A wide range of industry-focused courses, experienced trainers, and hands-on practical learning — preparing students to succeed in today's competitive job market.",
  },
  {
    label: "why.choose_us",
    title: "Why Choose Us",
    body: "State-of-the-art facilities, career-oriented training, real-world projects, and continuous support make Ajinkya Infotech the right choice for your professional growth.",
  },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-card", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-grid", start: "top 80%" },
      });
      gsap.from(".about-heading", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-heading", start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ background: "var(--slate)", padding: "96px 24px", borderTop: "1px solid var(--border)" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Heading */}
        <div className="about-heading" style={{ marginBottom: "56px" }}>
          <p className="mono" style={{ marginBottom: "10px" }}>about.ajinkya_infotech</p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 5vw, 44px)", color: "var(--warm-white)", fontWeight: 600, maxWidth: "520px" }}>
            Where Logic <span style={{ color: "var(--terra)" }}>Meets Craft</span>
          </h2>
        </div>

        {/* Cards */}
        <div
          className="about-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "56px" }}
        >
          {cards.map((c, i) => (
            <div
              key={i}
              className="about-card"
              style={{
                background: "var(--slate2)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                padding: "32px 28px",
                transition: "border-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--terra)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <p className="mono" style={{ marginBottom: "12px", fontSize: "10px" }}>{c.label}</p>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "20px", color: "var(--warm-white)", marginBottom: "12px", fontWeight: 600 }}>
                {c.title}
              </h3>
              <div style={{ width: "24px", height: "2px", background: "var(--terra)", marginBottom: "14px", borderRadius: "1px" }} />
              <p style={{ fontSize: "14px", color: "var(--warm-grey)", lineHeight: 1.7, fontFamily: "var(--sans)" }}>
                {c.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
          padding: "28px 32px",
          background: "var(--slate2)",
          border: "1px solid var(--border)",
          borderRadius: "4px",
        }}>
          <p style={{ fontFamily: "var(--serif)", fontSize: "18px", color: "var(--warm-white)", fontWeight: 400 }}>
            Join us and embrace a world of endless opportunities.
          </p>
          <a href="#contact">
            <button className="btn-primary">Contact Us Today</button>
          </a>
        </div>

      </div>
    </section>
  );
}
