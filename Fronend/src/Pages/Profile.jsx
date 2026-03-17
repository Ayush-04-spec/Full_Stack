import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import ProfileCard from "../Components/dashboard/ProfileCard";
import ProgressSection from "../Components/dashboard/ProgressSection";
import UpcomingSection from "../Components/dashboard/UpcomingSection";
import PerformanceSection from "../Components/dashboard/PerformanceSection";
import CertificatesSection from "../Components/dashboard/CertificatesSection";
import NotificationsSection from "../Components/dashboard/NotificationsSection";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fdf6ee]">
      <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800">Student Dashboard</h1>

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProfileCard user={user} onLogout={() => { logout(); navigate("/login"); }} />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-6">
            <ProgressSection />
            <UpcomingSection />
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PerformanceSection />
          <CertificatesSection />
          <NotificationsSection />
        </div>
      </div>
    </div>
  );
};

export default Profile;
