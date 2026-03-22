import { FaTrophy } from "react-icons/fa";

const scores = [
  { subject: "C Programming", score: 82 },
  { subject: "MS Office", score: 91 },
  { subject: "Networking", score: 74 },
  { subject: "MySQL", score: 68 },
];

const getColor = (score) => {
  if (score >= 80) return "var(--terra)";
  if (score >= 60) return "var(--forest)";
  return "var(--muted)";
};

const avg = Math.round(scores.reduce((a, s) => a + s.score, 0) / scores.length);

const PerformanceSection = () => (
  <div style={{ background: "var(--slate2)", border: "1px solid var(--border)", borderRadius: "4px", padding: "24px", height: "100%" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
      <FaTrophy style={{ color: "var(--terra)", fontSize: "13px", flexShrink: 0 }} />
      <div>
        <p className="mono" style={{ fontSize: "10px", marginBottom: "2px" }}>performance.scores</p>
        <h3 style={{ fontFamily: "var(--serif)", fontSize: "16px", color: "var(--warm-white)" }}>Performance</h3>
      </div>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {scores.map((s) => (
        <div key={s.subject}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ fontSize: "12px", color: "var(--warm-grey)", fontFamily: "var(--sans)" }}>{s.subject}</span>
            <span style={{ fontSize: "12px", fontFamily: "'Courier New', monospace", color: getColor(s.score) }}>{s.score}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${s.score}%`, background: getColor(s.score) }} />
          </div>
        </div>
      ))}
    </div>

    <div style={{
      marginTop: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 14px",
      background: "var(--slate3)",
      border: "1px solid var(--border)",
      borderRadius: "3px",
    }}>
      <span className="mono" style={{ fontSize: "10px" }}>overall_avg</span>
      <span style={{ fontFamily: "var(--serif)", fontSize: "22px", color: "var(--terra)" }}>{avg}%</span>
    </div>
  </div>
);

export default PerformanceSection;
