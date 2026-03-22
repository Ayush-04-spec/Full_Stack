import { FaCheckCircle, FaCircle } from "react-icons/fa";

const modules = [
  { name: "Introduction to Computers", done: true },
  { name: "MS Office & Productivity Tools", done: true },
  { name: "Internet & Networking Basics", done: true },
  { name: "Introduction to C Programming", done: true },
  { name: "Database Management (MySQL)", done: false },
  { name: "Web Development Basics", done: false },
  { name: "Python Programming", done: false },
];

const done = modules.filter((m) => m.done).length;
const pct = Math.round((done / modules.length) * 100);

const ProgressSection = () => (
  <div style={{ background: "var(--slate2)", border: "1px solid var(--border)", borderRadius: "4px", padding: "24px" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
      <div>
        <p className="mono" style={{ fontSize: "10px", marginBottom: "4px" }}>progress.track</p>
        <h3 style={{ fontFamily: "var(--serif)", fontSize: "16px", color: "var(--warm-white)" }}>Course Progress</h3>
      </div>
      <span style={{ fontFamily: "var(--serif)", fontSize: "24px", color: "var(--terra)" }}>{pct}%</span>
    </div>

    <div className="progress-track" style={{ marginBottom: "6px" }}>
      <div className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
    <p style={{ fontSize: "11px", color: "var(--muted)", fontFamily: "var(--sans)", marginBottom: "16px" }}>{done} of {modules.length} modules</p>

    <div style={{ display: "flex", flexDirection: "column", gap: "6px", maxHeight: "140px", overflowY: "auto" }}>
      {modules.map((m, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px" }}>
          {m.done
            ? <FaCheckCircle style={{ color: "var(--terra)", flexShrink: 0, fontSize: "11px" }} />
            : <FaCircle style={{ color: "var(--slate4)", flexShrink: 0, fontSize: "11px" }} />}
          <span style={{ color: m.done ? "var(--warm-grey)" : "var(--muted)" }}>{m.name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default ProgressSection;
