import { useState } from "react";
import { FaCamera, FaSignOutAlt } from "react-icons/fa";

const ProfileCard = ({ user, onLogout }) => {
  const [avatar, setAvatar] = useState(user?.Image || "https://ui-avatars.com/api/?name=Student&background=1A1C1E&color=D1D1D1&size=128");

  return (
    <div style={{ background: "var(--slate2)", border: "1px solid var(--border)", borderRadius: "4px", padding: "28px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", height: "100%" }}>
      <div style={{ position: "relative", marginBottom: "16px" }}>
        <img src={avatar} alt="Profile" style={{ width: "72px", height: "72px", borderRadius: "50%", objectFit: "cover", border: "1px solid var(--border)", display: "block" }} />
        <label style={{ position: "absolute", bottom: 0, right: 0, width: "22px", height: "22px", borderRadius: "50%", background: "var(--terra)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <FaCamera style={{ color: "var(--warm-white)", fontSize: "9px" }} />
          <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { const f = e.target.files[0]; if (f) setAvatar(URL.createObjectURL(f)); }} />
        </label>
      </div>

      <h3 style={{ fontFamily: "var(--serif)", fontSize: "17px", color: "var(--warm-white)", marginBottom: "4px" }}>{user?.name || "Student"}</h3>
      <p style={{ fontSize: "12px", color: "var(--muted)", fontFamily: "var(--sans)" }}>{user?.email}</p>

      <div style={{ display: "flex", gap: "6px", marginTop: "12px", flexWrap: "wrap", justifyContent: "center" }}>
        {[user?.role || "STUDENT", "MSCIT"].map((tag) => (
          <span key={tag} style={{ fontSize: "10px", fontFamily: "var(--sans)", letterSpacing: "0.06em", padding: "3px 10px", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--muted)" }}>{tag}</span>
        ))}
      </div>

      <div style={{ width: "100%", marginTop: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
        {[{ l: "Batch", v: "2026–2027" }, { l: "Status", v: "Active", c: "var(--forest)" }].map((r) => (
          <div key={r.l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "var(--slate3)", borderRadius: "2px" }}>
            <span style={{ fontSize: "11px", color: "var(--muted)", fontFamily: "var(--sans)" }}>{r.l}</span>
            <span style={{ fontSize: "11px", color: r.c || "var(--warm-grey)", fontFamily: "var(--sans)", fontWeight: 500 }}>{r.v}</span>
          </div>
        ))}
      </div>

      <button onClick={onLogout} style={{ marginTop: "20px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "9px", background: "none", border: "1px solid var(--border)", borderRadius: "3px", cursor: "pointer", fontSize: "12px", color: "var(--muted)", fontFamily: "var(--sans)", transition: "border-color 0.2s, color 0.2s" }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#c0392b"; e.currentTarget.style.color = "#c0392b"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}>
        <FaSignOutAlt style={{ fontSize: "10px" }} /> Logout
      </button>
    </div>
  );
};

export default ProfileCard;
