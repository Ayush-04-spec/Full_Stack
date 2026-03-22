import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaClock, FaBookOpen, FaUsers, FaLayerGroup, FaArrowLeft } from "react-icons/fa";
import { gsap } from "gsap";
import api from "../api/axios";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    api.get(`/api/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!loading && course) gsap.from(ref.current, { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" });
  }, [loading, course]);

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "var(--slate)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p className="mono">Loading...</p>
    </div>
  );

  if (!course) return (
    <div style={{ minHeight: "100vh", background: "var(--slate)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p className="mono">Course not found.</p>
    </div>
  );

  const rows = [
    { icon: <FaLayerGroup />, label: "Structure", value: course.courseStructure },
    { icon: <FaClock />, label: "Duration", value: course.durationAndCommitment },
    { icon: <FaUsers />, label: "Who this is for", value: course.whoThisCourseIsFor },
  ];

  return (
    <section style={{ minHeight: "100vh", background: "var(--slate)", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <button onClick={() => navigate("/courses")}
          style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", color: "var(--muted)", fontSize: "13px", fontFamily: "var(--sans)", marginBottom: "40px", padding: 0 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--terra)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}>
          <FaArrowLeft style={{ fontSize: "11px" }} /> Back to Courses
        </button>

        <div ref={ref} style={{ background: "var(--slate2)", border: "1px solid var(--border)", borderRadius: "4px", overflow: "hidden" }}>
          <div style={{ height: "2px", background: "var(--terra)" }} />

          <div style={{ padding: "36px 36px 28px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "flex-start", gap: "16px" }}>
            <div style={{ width: "36px", height: "36px", border: "1px solid var(--border)", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <FaBookOpen style={{ color: "var(--terra)", fontSize: "13px" }} />
            </div>
            <div>
              <p className="mono" style={{ marginBottom: "8px", fontSize: "10px" }}>Course details</p>
              <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "var(--warm-white)", lineHeight: 1.2 }}>{course.courseName}</h1>
            </div>
          </div>

          <div style={{ padding: "28px 36px", borderBottom: "1px solid var(--border)" }}>
            <p className="mono" style={{ marginBottom: "12px", fontSize: "10px" }}>Overview</p>
            <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.8 }}>{course.courseOverview}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1px", background: "var(--border)" }}>
            {rows.map((r) => (
              <div key={r.label} style={{ background: "var(--slate2)", padding: "20px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                  <span style={{ color: "var(--terra)", fontSize: "11px" }}>{r.icon}</span>
                  <p className="mono" style={{ fontSize: "10px" }}>{r.label}</p>
                </div>
                <p style={{ fontSize: "13px", color: "var(--warm-grey)", lineHeight: 1.6 }}>{r.value}</p>
              </div>
            ))}
          </div>

          <div style={{ padding: "24px 36px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p className="mono" style={{ marginBottom: "4px", fontSize: "10px" }}>Investment</p>
              <span style={{ fontFamily: "var(--serif)", fontSize: "26px", fontWeight: 600, color: "var(--warm-white)" }}>₹ {course.price}</span>
            </div>
            <button className="btn-primary">Enroll Now →</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetail;
