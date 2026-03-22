import { FaBell } from "react-icons/fa";

const notifications = [
  { title: "New module unlocked: Python Basics", time: "2 hours ago", unread: true },
  { title: "Exam schedule updated for March", time: "Yesterday", unread: true },
  { title: "Your C Programming certificate is ready", time: "2 days ago", unread: false },
  { title: "Holiday notice: March 25 – No classes", time: "3 days ago", unread: false },
];

const unreadCount = notifications.filter((n) => n.unread).length;

const NotificationsSection = () => (
  <div style={{ background: "var(--slate2)", border: "1px solid var(--border)", borderRadius: "4px", padding: "24px", height: "100%" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <FaBell style={{ color: "var(--terra)", fontSize: "13px", flexShrink: 0 }} />
        <div>
          <p className="mono" style={{ fontSize: "10px", marginBottom: "2px" }}>notifications.feed</p>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: "16px", color: "var(--warm-white)" }}>Notifications</h3>
        </div>
      </div>
      {unreadCount > 0 && (
        <span style={{
          fontSize: "10px",
          fontFamily: "'Courier New', monospace",
          padding: "3px 8px",
          background: "var(--slate3)",
          border: "1px solid var(--terra)",
          borderRadius: "2px",
          color: "var(--terra)",
          letterSpacing: "0.05em",
        }}>
          {unreadCount} new
        </span>
      )}
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {notifications.map((n, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: "10px",
            padding: "10px 12px",
            background: n.unread ? "var(--slate3)" : "transparent",
            border: `1px solid ${n.unread ? "var(--border)" : "transparent"}`,
            borderRadius: "3px",
          }}
        >
          <div style={{ marginTop: "5px", flexShrink: 0 }}>
            {n.unread
              ? <div className="dot-terra" />
              : <div className="dot-muted" />}
          </div>
          <div>
            <p style={{ fontSize: "12px", color: n.unread ? "var(--warm-grey)" : "var(--muted)", fontFamily: "var(--sans)", lineHeight: 1.4 }}>
              {n.title}
            </p>
            <p style={{ fontSize: "10px", color: "var(--muted)", fontFamily: "'Courier New', monospace", marginTop: "3px" }}>
              {n.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default NotificationsSection;
