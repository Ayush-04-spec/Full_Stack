import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => (
  <footer style={{ background: "var(--slate2)", borderTop: "1px solid var(--border)" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 24px 40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "48px" }}>

      <div>
        <h3 className="serif" style={{ fontSize: "18px", color: "var(--warm-white)", marginBottom: "12px" }}>Ajinkya Infotech</h3>
        <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, maxWidth: "240px" }}>
          A professional software training institute dedicated to building strong technical foundations.
        </p>
        <p className="mono" style={{ marginTop: "16px", fontSize: "10px" }}>Nashik, Maharashtra, India</p>
      </div>

      <div>
        <p className="mono" style={{ marginBottom: "20px" }}>Get in Touch</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <a href="tel:+918275224127" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--terra)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}>
            <FaPhoneAlt style={{ fontSize: "11px", flexShrink: 0 }} />
            +91 82752 24127
          </a>
          <a href="https://wa.me/918275224127" target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--terra)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}>
            <span style={{ fontSize: "11px" }}>💬</span>
            WhatsApp
          </a>
        </div>
      </div>

      <div>
        <p className="mono" style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "6px" }}>
          <FaMapMarkerAlt style={{ fontSize: "10px" }} /> Location
        </p>
        <div style={{ borderRadius: "4px", overflow: "hidden", border: "1px solid var(--border)" }}>
          <iframe
            title="Ajinkya Infotech Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.852195055718!2d73.78607257527406!3d20.014717181392932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddebb188bf4f2b%3A0x5bacd8fb9260328d!2sAjinkya%20Infotech!5e0!3m2!1sen!2sin!4v1768636204624!5m2!1sen!2sin"
            style={{ width: "100%", height: "160px", border: 0, display: "block", filter: "grayscale(80%) brightness(0.6)" }}
            loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>

    <div style={{ borderTop: "1px solid var(--border)", padding: "20px 24px", textAlign: "center" }}>
      <p className="mono" style={{ fontSize: "10px" }}>
        © {new Date().getFullYear()} Ajinkya Infotech — All rights reserved
      </p>
    </div>
  </footer>
);

export default Footer;
