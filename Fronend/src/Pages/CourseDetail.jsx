import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaClock, FaBookOpen, FaUsers, FaLayerGroup, FaArrowLeft } from "react-icons/fa";
import api from "../api/axios";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error("Failed to load course", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdf6ee] flex items-center justify-center">
        <p className="text-orange-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#fdf6ee] flex items-center justify-center">
        <p className="text-gray-500">Course not found.</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#fdf6ee] py-16 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Back button */}
        <button
          onClick={() => navigate("/courses")}
          className="flex items-center gap-2 text-orange-500 hover:text-orange-600 mb-8 text-sm font-medium"
        >
          <FaArrowLeft /> Back to Courses
        </button>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-orange-100">

          {/* Header */}
          <div className="bg-orange-400 px-8 py-6 flex items-center gap-4">
            <FaBookOpen className="text-white text-2xl shrink-0" />
            <h1 className="text-white font-bold text-xl leading-tight">{course.courseName}</h1>
          </div>

          {/* Body */}
          <div className="px-8 py-6 space-y-6 text-gray-700 text-sm">

            <div>
              <h2 className="text-orange-500 font-semibold text-base mb-1">Overview</h2>
              <p className="leading-relaxed">{course.courseOverview}</p>
            </div>

            <div className="flex items-start gap-3">
              <FaLayerGroup className="text-orange-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-orange-500 font-semibold">Structure: </span>
                {course.courseStructure}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaClock className="text-orange-400 shrink-0" />
              <span>{course.durationAndCommitment}</span>
            </div>

            <div className="flex items-start gap-3">
              <FaUsers className="text-orange-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-orange-500 font-semibold">Who this is for: </span>
                {course.whoThisCourseIsFor}
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="px-8 py-5 border-t border-gray-100 flex items-center justify-between">
            <span className="text-orange-500 font-bold text-xl">₹ {course.price}</span>
            <button className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-6 py-2.5 rounded-full transition text-sm">
              Enroll Now
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CourseDetail;
