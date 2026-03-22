import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DATA = [
  {
    tag: "01 — Methodology",
    title: "Practical, Hands-On Learning",
    body: "We believe in learning by doing. Every module includes real coding exercises, mini projects, and assignments that mirror actual workplace tasks — not just theory.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
  },
  {
    tag: "02 — Approach",
    title: "Small Batches, Personal Attention",
    body: "We keep our batch sizes small intentionally. Every student gets direct access to the trainer, personalized feedback, and the time they need to truly understand the material.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
  },
  {
    tag: "03 — Outcomes",
    title: "Career-Focused Curriculum",
    body: "Our courses are built around what employers actually look for. From C and OOP fundamentals to Python and web development, every topic is chosen to make you job-ready from day one.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
  },
];

export default function Achievements() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ach-head", { scrollTrigger: { trigger: ".ach-head", start: "top 82%" }, y: 40, opacity: 0, duration: 0.9, ease: "power3.out" });
      DATA.forEach((_, i) => {
        const rev = i % 2 !== 0;
        gsap.from(`.ach-txt-${i}`, { scrollTrigger: { trigger: `.ach-row-${i}`, start: "top 78%" }, x: rev ? 50 : -50, opacity: 0, duration: 0.9, ease: "power3.out" });
        gsap.from(`.ach-img-${i}`, { scrollTrigger: { trigger: `.ach-row-${i}`, start: "top 78%" }, x: rev ? -50 : 50, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.1 });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{ background: "var(--slate2)", padding: "120px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <div className="ach-head" style={{ marginBottom: "80px" }}>
          <p className="mono" style={{ marginBottom: "16px" }}>What makes us different</p>
          <h2 className="serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--warm-white)" }}>
            The <span style={{ fontStyle: "italic", color: "var(--terra)" }}>standard</span> we hold ourselves to
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "96px" }}>
          {DATA.map((item, i) => {
            const rev = i % 2 !== 0;
            return (
              <div key={i} className={`ach-row-${i}`} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center", direction: rev ? "rtl" : "ltr" }}>
                <div className={`ach-txt-${i}`} style={{ direction: "ltr" }}>
                  <p className="mono" style={{ color: "var(--terra)", marginBottom: "16px" }}>{item.tag}</p>
                  <h3 className="serif" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "var(--warm-white)", marginBottom: "20px", lineHeight: 1.25 }}>{item.title}</h3>
                  <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.8 }}>{item.body}</p>
                  <div style={{ width: "40px", height: "2px", background: "var(--terra)", marginTop: "28px" }} />
                </div>
                <div className={`ach-img-${i}`} style={{ direction: "ltr" }}>
                  <div style={{ borderRadius: "4px", overflow: "hidden", border: "1px solid var(--border)", position: "relative" }}>
                    <img src={item.image} alt={item.title}
                      style={{ width: "100%", height: "300px", objectFit: "cover", display: "block", filter: "grayscale(50%) brightness(0.7)", transition: "filter 0.5s ease" }}
                      onMouseEnter={(e) => (e.target.style.filter = "grayscale(20%) brightness(0.85)")}
                      onMouseLeave={(e) => (e.target.style.filter = "grayscale(50%) brightness(0.7)")}
                    />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "var(--terra)" }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
