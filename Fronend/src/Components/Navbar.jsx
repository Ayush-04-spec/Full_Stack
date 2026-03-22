import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/image.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setOpen(false);
    setMenuOpen(false);
    navigate("/login");
  };

  const NAV = [
    { label: "Courses", path: "/courses" },
    { label: "Blogs", path: "/blogs" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50,
      transition: "background 0.4s ease, border-color 0.4s ease",
      background: scrolled ? "rgba(26,28,30,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto", padding: "0 24px",
        height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>

        {/* Logo */}
        <div onClick={() => navigate("/")} style={{ cursor: "pointer", flexShrink: 0 }}>
          <img src={logo} alt="Ajinkya Infotech" style={{ height: "38px", width: "auto", objectFit: "contain" }} />
        </div>

        {/* Desktop center links */}
        <div id="nav-links" style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          {NAV.map((l) => (
            <button key={l.path} onClick={() => navigate(l.path)}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", fontFamily: "var(--sans)", color: "var(--muted)", letterSpacing: "0.04em", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.target.style.color = "var(--warm-white)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--muted)")}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Desktop right — auth */}
        <div id="nav-auth" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {!token ? (
            <button className="btn-primary" onClick={() => navigate("/login")} style={{ padding: "8px 20px" }}>
              Login
            </button>
          ) : (
            <div ref={profileRef} style={{ position: "relative" }}>
              <button onClick={() => setOpen(!open)}
                style={{ width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden", border: "2px solid var(--border)", cursor: "pointer", padding: 0, background: "var(--slate3)" }}>
                <img src={user.Image} alt="User" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </button>
              {open && (
                <div style={{ position: "absolute", right: 0, top: "44px", width: "160px", background: "var(--slate2)", border: "1px solid var(--border)", borderRadius: "4px", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                  <button onClick={() => { navigate("/profile"); setOpen(false); }}
                    style={{ width: "100%", textAlign: "left", padding: "10px 16px", background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: "var(--warm-grey)", fontFamily: "var(--sans)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--slate3)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                  >Dashboard</button>
                  <div style={{ height: "1px", background: "var(--border)" }} />
                  <button onClick={handleLogout}
                    style={{ width: "100%", textAlign: "left", padding: "10px 16px", background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: "#c0392b", fontFamily: "var(--sans)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--slate3)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                  >Logout</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hamburger — mobile only */}
        <button id="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", display: "none", flexDirection: "column", gap: "5px", padding: "4px" }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: "block", width: "22px", height: "1.5px", background: "var(--warm-grey)", transition: "all 0.3s",
              ...(menuOpen && i === 0 ? { transform: "rotate(45deg) translate(4.5px, 4.5px)" } : {}),
              ...(menuOpen && i === 1 ? { opacity: 0 } : {}),
              ...(menuOpen && i === 2 ? { transform: "rotate(-45deg) translate(4.5px, -4.5px)" } : {}),
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div style={{ overflow: "hidden", maxHeight: menuOpen ? "300px" : "0", transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ background: "var(--slate2)", borderTop: "1px solid var(--border)", padding: "16px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {NAV.map((l) => (
            <button key={l.path} onClick={() => { navigate(l.path); setMenuOpen(false); }}
              style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: "14px", color: "var(--warm-grey)", fontFamily: "var(--sans)", padding: "4px 0" }}>
              {l.label}
            </button>
          ))}
          <div style={{ height: "1px", background: "var(--border)" }} />
          {!token ? (
            <button className="btn-primary" onClick={() => { navigate("/login"); setMenuOpen(false); }} style={{ width: "fit-content" }}>Login</button>
          ) : (
            <>
              <button onClick={() => { navigate("/profile"); setMenuOpen(false); }}
                style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: "14px", color: "var(--warm-grey)", fontFamily: "var(--sans)", padding: "4px 0" }}>Dashboard</button>
              <button onClick={handleLogout}
                style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: "14px", color: "#c0392b", fontFamily: "var(--sans)", padding: "4px 0" }}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
