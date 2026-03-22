import { FaCalendarAlt } from "react-icons/fa";

const items = [
  { title: "MySQL Mid-Term Exam", date: "March 22, 2026", type: "Exam" },
  { title: "Web Dev Assignment – HTML Forms", date: "March 25, 2026", type: "Assignment" },
  { title: "Python Mock Test – Unit 1", date: "March 28, 2026", type: "Mock Test" },
  { title: "Networking Concepts Quiz", date: "April 2, 2026", type: "Quiz" },
];

const typeColor = { Exam: "var(--terra)", Assignment: "var(--forest)", "Mock Test": "var(--terra)", Quiz: "var(--forest)" };

const UpcomingSection = () => (
  <div style={{ background: "var(--slate2)", border: "1px solid var(--border)", borderRadius: "4px", padding: "24px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
      <FaCalendarAlt style={{ color: "var(--terra)", fontSize: "12px" }} />
      <div>
        <p className="mono" style={{ fontSize: "10px", marginBottom: "2px" }}>schedule.upcoming</p>
        <h3 style={{ fontFamily: "var(--serif)", fontSize: "16px", color: "var(--warm-white)" }}>Upcoming</h3>
      </div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "var(--slate3)", gap: "12px" }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: "12px", color: "var(--warm-grey)", fontFamily: "var(--sans)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</p>
            <p style={{ fontSize: "11px", color: "var(--muted)", fontFamily: "var(--sans)", marginTop: "2px" }}>{item.date}</p>
          </div>
          <span style={{ fontSize: "10px", fontFamily: "var(--sans)", letterSpacing: "0.06em", padding: "2px 8px", border: `1px solid ${typeColor[item.type]}`, color: typeColor[item.type], borderRadius: "2px", flexShrink: 0 }}>
            {item.type}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default UpcomingSection;
