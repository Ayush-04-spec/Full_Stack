import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { gsap } from "gsap";
import ProfileCard from "../Components/dashboard/ProfileCard";
import ProgressSection from "../Components/dashboard/ProgressSection";
import UpcomingSection from "../Components/dashboard/UpcomingSection";
import PerformanceSection from "../Components/dashboard/PerformanceSection";
import CertificatesSection from "../Components/dashboard/CertificatesSection";
import NotificationsSection from "../Components/dashboard/NotificationsSection";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dashRef = useRef(null);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    const ctx = gsap.context(() => {
      gsap.from(".dash-tile", {
        y: 28,
        opacity: 0,
        stagger: 0.09,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.1,
      });
    }, dashRef);
    return () => ctx.revert();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--slate)", paddingTop: "96px", paddingBottom: "64px" }}>
      <div ref={dashRef} style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

        {/* Page header */}
        <div className="dash-tile" style={{ marginBottom: "32px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div>
            <p className="mono" style={{ fontSize: "10px", marginBottom: "6px" }}>student.dashboard</p>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(24px, 4vw, 36px)", color: "var(--warm-white)", fontWeight: 600 }}>
              Your <span style={{ color: "var(--terra)" }}>Dashboard</span>
            </h1>
          </div>
          <div style={{
            fontSize: "11px",
            fontFamily: "'Courier New', monospace",
            color: "var(--forest)",
            padding: "5px 12px",
            background: "var(--slate2)",
            border: "1px solid var(--border)",
            borderRadius: "3px",
            letterSpacing: "0.05em",
          }}>
            ● active session
          </div>
        </div>

        {/* Row 1 — Profile + Progress + Upcoming */}
        <div className="dash-tile" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px", marginBottom: "20px", alignItems: "start" }}>
          <ProfileCard user={user} onLogout={() => { logout(); navigate("/login"); }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <ProgressSection />
            <UpcomingSection />
          </div>
        </div>

        {/* Row 2 — Performance + Certificates + Notifications */}
        <div className="dash-tile" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          <PerformanceSection />
          <CertificatesSection />
          <NotificationsSection />
        </div>

      </div>
    </div>
  );
};

export default Profile;
