import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactUs() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-inner", { scrollTrigger: { trigger: ".contact-inner", start: "top 82%" }, y: 40, opacity: 0, duration: 0.9, ease: "power3.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{ background: "var(--slate)", padding: "120px 24px" }}>
      <div className="contact-inner" style={{ maxWidth: "900px", margin: "0 auto", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "80px 0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "40px" }}>
        <div>
          <p className="mono" style={{ marginBottom: "16px" }}>Ready to start?</p>
          <h2 className="serif" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "var(--warm-white)", lineHeight: 1.2 }}>
            {"Let's build your"}<br />
            <span style={{ fontStyle: "italic", color: "var(--terra)" }}>IT career together.</span>
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <a href="https://wa.me/918275224127" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: "none", textAlign: "center" }}>
            💬 WhatsApp Us
          </a>
          <a href="tel:+918275224127" className="btn-outline" style={{ textDecoration: "none", textAlign: "center" }}>
            +91 82752 24127
          </a>
        </div>
      </div>
    </section>
  );
}
