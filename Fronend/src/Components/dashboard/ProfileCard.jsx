import { useState } from "react";
import { FaCamera, FaEdit, FaSignOutAlt } from "react-icons/fa";

const ProfileCard = ({ user, onLogout }) => {
  const [avatar, setAvatar] = useState(
    user?.Image || "https://ui-avatars.com/api/?name=Student&background=fb923c&color=fff&size=128"
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 flex flex-col items-center text-center">
      {/* Avatar */}
      <div className="relative mb-4">
        <img
          src={avatar}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-orange-400"
        />
        <label className="absolute bottom-0 right-0 bg-orange-500 text-white rounded-full p-1.5 cursor-pointer hover:bg-orange-600 transition">
          <FaCamera className="text-xs" />
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        </label>
      </div>

      {/* Info */}
      <h2 className="text-lg font-bold text-gray-800">
        {user?.name || "Ayush"}
      </h2>
      <p className="text-sm text-gray-500 mt-0.5">{user?.email}</p>

      <div className="flex gap-2 mt-3 flex-wrap justify-center">
        <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full">
          {user?.role || "STUDENT"}
        </span>
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
          MSCIT
        </span>
      </div>

      {/* Details */}
      <div className="mt-5 w-full text-left space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span className="text-gray-400">Batch</span>
          <span className="font-medium">2026 – 2027</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Status</span>
          <span className="text-green-600 font-medium">Active</span>
        </div>
      </div>

      <button className="mt-5 w-full flex items-center justify-center gap-2 border border-orange-400 text-orange-500 hover:bg-orange-50 py-2 rounded-xl text-sm font-medium transition">
        <FaEdit /> Edit Profile
      </button>

      <button
        onClick={onLogout}
        className="mt-2 w-full flex items-center justify-center gap-2 border border-red-300 text-red-500 hover:bg-red-50 py-2 rounded-xl text-sm font-medium transition"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default ProfileCard;
