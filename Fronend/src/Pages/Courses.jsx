import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaClock, FaBookOpen, FaUsers, FaLayerGroup } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import api from "../api/axios";

gsap.registerPlugin(ScrollTrigger);

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const gridRef = useRef(null);

  useEffect(() => {
    api.get("/api/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading && courses.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from(".course-tile", {
          y: 40, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out",
        });
      }, gridRef);
      return () => ctx.revert();
    }
  }, [loading, courses]);

  return (
    <section style={{ minHeight: "100vh", background: "var(--slate)", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "64px" }}>
          <p className="mono" style={{ marginBottom: "16px" }}>Course catalog</p>
          <h1 className="serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--warm-white)" }}>
            Programs built for the <span style={{ fontStyle: "italic", color: "var(--terra)" }}>real world</span>
          </h1>
          <div style={{ width: "40px", height: "2px", background: "var(--terra)", marginTop: "24px" }} />
        </div>

        {loading && (
          <p className="mono" style={{ color: "var(--muted)" }}>Loading courses...</p>
        )}

        {/* Cards grid — flex + stretch = equal height */}
        <div ref={gridRef} style={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", gap: "1px", background: "var(--border)" }}>
          {courses.map((course, i) => (
            <div key={i} className="course-tile"
              style={{ flex: "1 1 300px", maxWidth: "calc(33.333% - 1px)", display: "flex", flexDirection: "column", background: "var(--slate2)", border: "none", borderRadius: 0, transition: "border-color 0.3s ease, box-shadow 0.3s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--slate3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--slate2)"; }}
            >
              {/* Terracotta top bar — appears on hover via CSS class */}
              <div style={{ height: "2px", background: "var(--terra)", opacity: 0, transition: "opacity 0.3s" }}
                ref={(el) => {
                  if (!el) return;
                  const card = el.parentElement;
                  card.addEventListener("mouseenter", () => (el.style.opacity = "1"));
                  card.addEventListener("mouseleave", () => (el.style.opacity = "0"));
                }} />

              {/* Icon + title */}
              <div style={{ padding: "28px 28px 16px", display: "flex", alignItems: "flex-start", gap: "14px", flexShrink: 0 }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "2px", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <FaBookOpen style={{ color: "var(--terra)", fontSize: "12px" }} />
                </div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "16px", fontWeight: 600, color: "var(--warm-white)", lineHeight: 1.35, margin: 0 }}>
                  {course.courseName}
                </h2>
              </div>

              {/* Body — flexGrow:1 pushes footer down */}
              <div style={{ padding: "0 28px 20px", flexGrow: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>
                  {course.courseOverview}
                </p>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12px", color: "var(--muted)" }}>
                  <FaLayerGroup style={{ color: "var(--terra)", flexShrink: 0, marginTop: "2px", fontSize: "10px" }} />
                  <span>{course.courseStructure}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--muted)" }}>
                  <FaClock style={{ color: "var(--terra)", flexShrink: 0, fontSize: "10px" }} />
                  <span>{course.durationAndCommitment}</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12px", color: "var(--muted)" }}>
                  <FaUsers style={{ color: "var(--terra)", flexShrink: 0, marginTop: "2px", fontSize: "10px" }} />
                  <span>{course.whoThisCourseIsFor}</span>
                </div>
              </div>

              {/* Footer — always at bottom */}
              <div style={{ padding: "16px 28px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, borderTop: "1px solid var(--border)" }}>
                <div className="price-wrap" style={{ overflow: "hidden" }}>
                  <span style={{ fontFamily: "var(--serif)", fontSize: "20px", fontWeight: 600, color: "var(--warm-white)" }}>
                    ₹ {course.price}
                  </span>
                </div>
                <button className="btn-primary" onClick={() => navigate(`/courses/${course.id}`)} style={{ padding: "8px 18px", fontSize: "12px" }}>
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
