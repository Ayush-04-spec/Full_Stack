import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaClock, FaBookOpen } from "react-icons/fa";
import api from "../api/axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Failed to load courses", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="min-h-screen bg-[#fdf6ee] py-16 px-6">

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-orange-500">Our Courses</h1>
        <p className="text-gray-500 mt-2 max-w-lg mx-auto text-sm">
          Industry-focused courses designed to build strong fundamentals, practical
          skills, and job-ready confidence.
        </p>
      </div>

      {loading && (
        <p className="text-center text-orange-500">Loading courses...</p>
      )}

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-100 flex flex-col"
          >
            {/* Orange Header */}
            <div className="bg-orange-400 px-5 py-4 flex items-center gap-3 min-h-[72px]">
              <FaBookOpen className="text-white text-lg shrink-0" />
              <h2 className="text-white font-semibold text-base leading-tight">
                {course.courseName}
              </h2>
            </div>

            {/* Body */}
            <div className="px-5 py-4 space-y-3 text-sm text-gray-700 flex-grow">
              <p className="leading-relaxed">{course.courseOverview}</p>

              <p>
                <span className="text-orange-500 font-semibold">Structure: </span>
                {course.courseStructure}
              </p>

              <div className="flex items-center gap-2 text-gray-600">
                <FaClock className="text-orange-400" />
                <span>{course.durationAndCommitment}</span>
              </div>

              <p>
                <span className="text-orange-500 font-semibold">For: </span>
                {course.whoThisCourseIsFor}
              </p>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 flex items-center justify-between border-t border-gray-100">
              <span className="text-orange-500 font-bold text-base">
                ₹ {course.price}
              </span>
              <button
                onClick={() => navigate(`/courses/${course.id}`)}
                className="bg-orange-400 hover:bg-orange-500 text-white text-sm font-medium px-5 py-2 rounded-full transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
