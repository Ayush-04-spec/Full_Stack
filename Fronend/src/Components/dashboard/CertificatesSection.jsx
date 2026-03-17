import { FaCertificate, FaDownload, FaSpinner } from "react-icons/fa";

const certs = [
  { name: "C Programming Fundamentals", status: "completed" },
  { name: "MS Office Proficiency", status: "completed" },
  { name: "MSCIT Final Certificate", status: "in-progress" },
];

const CertificatesSection = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5">
    <div className="flex items-center gap-2 mb-4">
      <FaCertificate className="text-orange-400" />
      <h3 className="font-semibold text-gray-800">Certificates</h3>
    </div>

    <div className="space-y-3">
      {certs.map((c, i) => (
        <div key={i} className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm text-gray-700 truncate">{c.name}</p>
            <span
              className={`text-xs font-medium ${
                c.status === "completed" ? "text-green-500" : "text-orange-400"
              }`}
            >
              {c.status === "completed" ? "✓ Completed" : "⏳ In Progress"}
            </span>
          </div>
          {c.status === "completed" ? (
            <button className="shrink-0 flex items-center gap-1 text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-full transition">
              <FaDownload className="text-xs" /> Download
            </button>
          ) : (
            <FaSpinner className="text-orange-300 animate-spin shrink-0" />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default CertificatesSection;
