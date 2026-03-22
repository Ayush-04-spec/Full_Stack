import { useState, useEffect } from "react";

const LINKS = [
  { key: "about", label: "About" },
  { key: "achievements", label: "Highlights" },
  { key: "contact", label: "Contact" },
];

const MiniHeroNav = ({ scrollToAbout, scrollToAchievements, scrollToContact, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 120);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handlers = { about: scrollToAbout, achievements: scrollToAchievements, contact: scrollToContact };

  return (
    <div style={{
      position: "fixed", top: "72px", left: "50%", transform: "translateX(-50%)", zIndex: 40,
      transition: "opacity 0.4s ease, transform 0.4s ease",
      opacity: scrolled ? 0.85 : 1,
    }}>
      <div style={{
        display: "flex", gap: "2px", padding: "4px",
        background: "var(--slate2)", border: "1px solid var(--border)", borderRadius: "4px",
      }}>
        {LINKS.map(({ key, label }) => (
          <button key={key} onClick={handlers[key]}
            style={{
              padding: "6px 16px", borderRadius: "2px", border: "none", cursor: "pointer",
              fontSize: "12px", fontFamily: "var(--sans)", letterSpacing: "0.04em",
              transition: "all 0.2s ease",
              background: activeSection === key ? "var(--terra)" : "transparent",
              color: activeSection === key ? "var(--warm-white)" : "var(--muted)",
            }}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MiniHeroNav;
