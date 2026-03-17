import { FaBell } from "react-icons/fa";

const notifications = [
  {
    title: "New module unlocked: Python Basics",
    time: "2 hours ago",
    unread: true,
  },
  {
    title: "Exam schedule updated for March",
    time: "Yesterday",
    unread: true,
  },
  {
    title: "Your C Programming certificate is ready",
    time: "2 days ago",
    unread: false,
  },
  {
    title: "Holiday notice: March 25 – No classes",
    time: "3 days ago",
    unread: false,
  },
];

const NotificationsSection = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <FaBell className="text-orange-400" />
        <h3 className="font-semibold text-gray-800">Notifications</h3>
      </div>
      <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
        {notifications.filter((n) => n.unread).length} new
      </span>
    </div>

    <div className="space-y-3">
      {notifications.map((n, i) => (
        <div
          key={i}
          className={`flex gap-3 p-2.5 rounded-xl text-sm ${
            n.unread ? "bg-orange-50" : ""
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
              n.unread ? "bg-orange-400" : "bg-gray-200"
            }`}
          />
          <div>
            <p className="text-gray-700 leading-snug">{n.title}</p>
            <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default NotificationsSection;
