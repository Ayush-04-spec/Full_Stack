import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt, FaBook, FaUser, FaClipboardList, FaSignOutAlt, FaTimes
} from "react-icons/fa";

const links = [
  { to: "/", icon: <FaTachometerAlt />, label: "Dashboard" },
  { to: "/courses", icon: <FaBook />, label: "Courses" },
  { to: "/profile", icon: <FaUser />, label: "Profile" },
  { to: "/results", icon: <FaClipboardList />, label: "Results" },
];

const Sidebar = ({ open, onClose, onLogout }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-60 bg-white shadow-xl z-30 flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:flex md:w-56 md:min-h-screen
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-orange-100">
          <span className="text-orange-500 font-bold text-lg">Ajinkya Infotech</span>
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-gray-600">
            <FaTimes />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {links.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition
                ${isActive
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                }`
              }
            >
              <span className="text-base">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-orange-100">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-500 transition"
          >
            <FaSignOutAlt className="text-base" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
