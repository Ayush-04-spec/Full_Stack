import { FaPlayCircle, FaCheckCircle } from "react-icons/fa";

const modules = [
  { name: "Introduction to Computers", done: true },
  { name: "MS Office & Productivity Tools", done: true },
  { name: "Internet & Networking Basics", done: true },
  { name: "Introduction to C Programming", done: true },
  { name: "Database Management (MySQL)", done: false },
  { name: "Web Development Basics", done: false },
  { name: "Python Programming", done: false },
];

const completed = modules.filter((m) => m.done).length;
const total = modules.length;
const percent = Math.round((completed / total) * 100);

const ProgressSection = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-semibold text-gray-800">Course Progress</h3>
      <span className="text-orange-500 font-bold text-sm">{percent}%</span>
    </div>

    {/* Bar */}
    <div className="w-full bg-orange-100 rounded-full h-3 mb-2">
      <div
        className="bg-orange-400 h-3 rounded-full transition-all duration-500"
        style={{ width: `${percent}%` }}
      />
    </div>
    <p className="text-xs text-gray-500 mb-4">{completed} of {total} modules completed</p>

    {/* Module list */}
    <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
      {modules.map((m, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <FaCheckCircle className={m.done ? "text-orange-400" : "text-gray-200"} />
          <span className={m.done ? "text-gray-700" : "text-gray-400"}>{m.name}</span>
        </div>
      ))}
    </div>

    
  </div>
);

export default ProgressSection;
