import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { gsap } from "gsap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const cardRef = useRef(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    gsap.from(cardRef.current, { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Invalid email or password.");
      gsap.from(cardRef.current, { x: -6, duration: 0.06, repeat: 5, yoyo: true, ease: "none" });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "11px 14px", background: "var(--slate3)",
    border: "1px solid var(--border)", borderRadius: "3px",
    color: "var(--warm-grey)", fontSize: "14px", fontFamily: "var(--sans)",
    outline: "none", transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--slate)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div ref={cardRef} style={{ width: "100%", maxWidth: "400px" }}>

        <div style={{ marginBottom: "40px" }}>
          <p className="mono" style={{ marginBottom: "12px" }}>Authentication</p>
          <h1 className="serif" style={{ fontSize: "2rem", color: "var(--warm-white)" }}>
            Welcome <span style={{ fontStyle: "italic", color: "var(--terra)" }}>back.</span>
          </h1>
        </div>

        {error && (
          <div style={{ padding: "12px 16px", background: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.3)", borderRadius: "3px", marginBottom: "20px", fontSize: "13px", color: "#e74c3c" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label className="mono" style={{ display: "block", marginBottom: "8px", fontSize: "10px" }}>Email</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "var(--terra)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
          </div>

          <div>
            <label className="mono" style={{ display: "block", marginBottom: "8px", fontSize: "10px" }}>Password</label>
            <div style={{ position: "relative" }}>
              <input type={showPass ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ ...inputStyle, paddingRight: "52px" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--terra)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "10px", fontFamily: "var(--sans)", color: "var(--muted)", letterSpacing: "0.06em" }}>
                {showPass ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: "100%", padding: "12px", marginTop: "4px", opacity: loading ? 0.6 : 1 }}>
            {loading ? "Signing in..." : "Login →"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "13px", color: "var(--muted)", marginTop: "24px" }}>
          No account?{" "}
          <button onClick={() => navigate("/register")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--terra)", fontSize: "13px", fontFamily: "var(--sans)" }}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
