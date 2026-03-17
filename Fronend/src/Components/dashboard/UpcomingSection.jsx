import { FaCalendarAlt, FaFileAlt, FaPencilAlt } from "react-icons/fa";

const upcoming = [
  {
    icon: <FaPencilAlt className="text-orange-400" />,
    title: "MySQL Mid-Term Exam",
    date: "March 22, 2026",
    type: "Exam",
  },
  {
    icon: <FaFileAlt className="text-blue-400" />,
    title: "Web Dev Assignment – HTML Forms",
    date: "March 25, 2026",
    type: "Assignment",
  },
  {
    icon: <FaPencilAlt className="text-orange-400" />,
    title: "Python Mock Test – Unit 1",
    date: "March 28, 2026",
    type: "Mock Test",
  },
  {
    icon: <FaFileAlt className="text-blue-400" />,
    title: "Networking Concepts Quiz",
    date: "April 2, 2026",
    type: "Quiz",
  },
];

const UpcomingSection = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5">
    <div className="flex items-center gap-2 mb-4">
      <FaCalendarAlt className="text-orange-400" />
      <h3 className="font-semibold text-gray-800">Upcoming</h3>
    </div>

    <div className="space-y-3">
      {upcoming.map((item, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-orange-50 hover:bg-orange-100 transition">
          <div className="text-lg">{item.icon}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-700 truncate">{item.title}</p>
            <p className="text-xs text-gray-400">{item.date}</p>
          </div>
          <span className="text-xs bg-white border border-orange-200 text-orange-500 px-2 py-0.5 rounded-full shrink-0">
            {item.type}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default UpcomingSection;
