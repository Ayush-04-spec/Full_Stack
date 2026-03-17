import { FaTrophy } from "react-icons/fa";

const scores = [
  { subject: "C Programming", score: 82, max: 100 },
  { subject: "MS Office", score: 91, max: 100 },
  { subject: "Networking", score: 74, max: 100 },
  { subject: "MySQL", score: 68, max: 100 },
];

const getColor = (score) => {
  if (score >= 80) return "bg-green-400";
  if (score >= 60) return "bg-orange-400";
  return "bg-red-400";
};

const PerformanceSection = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5">
    <div className="flex items-center gap-2 mb-4">
      <FaTrophy className="text-orange-400" />
      <h3 className="font-semibold text-gray-800">Performance</h3>
    </div>

    <div className="space-y-3">
      {scores.map((s, i) => (
        <div key={i}>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>{s.subject}</span>
            <span className="font-semibold">{s.score}/{s.max}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className={`${getColor(s.score)} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${s.score}%` }}
            />
          </div>
        </div>
      ))}
    </div>

    <div className="mt-4 flex items-center justify-between text-sm">
      <span className="text-gray-500">Overall Avg</span>
      <span className="text-orange-500 font-bold">
        {Math.round(scores.reduce((a, s) => a + s.score, 0) / scores.length)}%
      </span>
    </div>
  </div>
);

export default PerformanceSection;
