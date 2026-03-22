import { FaCertificate, FaDownload, FaSpinner } from "react-icons/fa";

const certs = [
  { name: "C Programming Fundamentals", status: "completed" },
  { name: "MS Office Proficiency", status: "completed" },
  { name: "MSCIT Final Certificate", status: "in-progress" },
];

const CertificatesSection = () => (
  <div style={{ background: "var(--slate2)", border: "1px solid var(--border)", borderRadius: "4px", padding: "24px", height: "100%" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
      <FaCertificate style={{ color: "var(--terra)", fontSize: "13px", flexShrink: 0 }} />
      <div>
        <p className="mono" style={{ fontSize: "10px", marginBottom: "2px" }}>certificates.earned</p>
        <h3 style={{ fontFamily: "var(--serif)", fontSize: "16px", color: "var(--warm-white)" }}>Certificates</h3>
      </div>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {certs.map((c, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            padding: "12px 14px",
            background: "var(--slate3)",
            border: "1px solid var(--border)",
            borderRadius: "3px",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: "12px", color: "var(--warm-grey)", fontFamily: "var(--sans)", marginBottom: "3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {c.name}
            </p>
            <span style={{
              fontSize: "10px",
              fontFamily: "'Courier New', monospace",
              color: c.status === "completed" ? "var(--forest)" : "var(--muted)",
              letterSpacing: "0.05em",
            }}>
              {c.status === "completed" ? "✓ completed" : "⏳ in_progress"}
            </span>
          </div>

          {c.status === "completed" ? (
            <button className="btn-primary" style={{ padding: "6px 12px", display: "flex", alignItems: "center", gap: "5px", flexShrink: 0 }}>
              <FaDownload style={{ fontSize: "10px" }} />
              <span style={{ fontSize: "11px" }}>Download</span>
            </button>
          ) : (
            <FaSpinner style={{ color: "var(--muted)", animation: "spin 1s linear infinite", flexShrink: 0 }} />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default CertificatesSection;
