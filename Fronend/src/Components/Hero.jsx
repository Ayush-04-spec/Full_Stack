import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

function Typewriter({ texts, speed = 70, pause = 2400 }) {
  const [display, setDisplay] = useState("");
  const [tIdx, setTIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const cur = texts[tIdx];
    let t;
    if (!del && cIdx < cur.length)       t = setTimeout(() => setCIdx(c => c + 1), speed);
    else if (!del && cIdx === cur.length) t = setTimeout(() => setDel(true), pause);
    else if (del && cIdx > 0)            t = setTimeout(() => setCIdx(c => c - 1), speed / 2);
    else { setDel(false); setTIdx(i => (i + 1) % texts.length); }
    setDisplay(cur.slice(0, cIdx));
    return () => clearTimeout(t);
  }, [cIdx, del, tIdx, texts, speed, pause]);

  return <span className="tw-cursor" style={{ color: "var(--terra)", fontStyle: "italic" }}>{display}</span>;
}

export default function Hero() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-label", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.1 });
      gsap.from(".hero-h1",    { y: 50, opacity: 0, duration: 1,   ease: "power3.out", delay: 0.25 });
      gsap.from(".hero-sub",   { y: 30, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.5 });
      gsap.from(".hero-btns",  { y: 20, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.7 });
      gsap.from(".hero-stats", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.9 });
      gsap.from(".hero-photo", { x: 40, opacity: 0, duration: 1.1, ease: "power3.out", delay: 0.4 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { v: "500+", l: "Students" },
    { v: "3",    l: "Courses"  },
    { v: "95%",  l: "Placed"   },
    { v: "5★",   l: "Rated"    },
  ];

  return (
    <section ref={heroRef} style={{ minHeight: "100vh", background: "var(--slate)", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>

      <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "var(--border)", opacity: 0.4 }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

        {/* Left */}
        <div>
          <p className="hero-label mono" style={{ marginBottom: "24px" }}>
            Nashik · Est. 2018 · Software Training
          </p>

          <h1 className="hero-h1 serif" style={{ fontSize: "clamp(2.8rem, 5vw, 4.2rem)", fontWeight: 600, lineHeight: 1.1, marginBottom: "28px", color: "var(--warm-white)" }}>
            Where Logic<br />
            Meets{" "}
            <span style={{ fontStyle: "italic" }}>
              <Typewriter texts={["Craft.", "Purpose.", "Career.", "Growth."]} />
            </span>
          </h1>

          <p className="hero-sub" style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.75, maxWidth: "420px", marginBottom: "40px" }}>
            Industry-focused programming courses with hands-on projects and expert mentors.
            We turn beginners into job-ready developers.
          </p>

          <div className="hero-btns" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => navigate("/courses")}>Explore Courses →</button>
            <button className="btn-outline" onClick={() => navigate("/register")}>Get Started</button>
          </div>

          <div className="hero-stats" style={{ display: "flex", gap: "32px", marginTop: "56px", paddingTop: "32px", borderTop: "1px solid var(--border)" }}>
            {stats.map((s) => (
              <div key={s.l}>
                <div style={{ fontFamily: "var(--serif)", fontSize: "22px", fontWeight: 600, color: "var(--warm-white)" }}>{s.v}</div>
                <div className="mono" style={{ marginTop: "4px" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — photo only */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="hero-photo" style={{ width: "100%", maxWidth: "480px", aspectRatio: "4/5", borderRadius: "4px 40px 4px 4px", overflow: "hidden", border: "1px solid var(--border)", position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=900&q=80"
              alt="Developer workspace"
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(60%) brightness(0.65)" }}
            />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "var(--terra)" }} />
            <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
              <p className="mono" style={{ color: "rgba(240,237,232,0.5)", fontSize: "10px" }}>Real skills. Real projects.</p>
            </div>
          </div>
        </div>

      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", background: "linear-gradient(to bottom, transparent, var(--slate))", pointerEvents: "none" }} />
    </section>
  );
}
