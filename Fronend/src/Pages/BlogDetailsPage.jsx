import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import { gsap } from "gsap";
import axios from "axios";

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:8082/blogs/${slug}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to load blog", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  useEffect(() => {
    if (!loading && blog && ref.current) {
      gsap.set(ref.current, { opacity: 1 });
      gsap.from(ref.current, { y: 30, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "opacity,transform" });
    }
  }, [loading, blog]);

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#1A1C1E", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ fontFamily: "'Courier New', monospace", fontSize: "11px", color: "#8A8A8A", letterSpacing: "0.1em", textTransform: "uppercase" }}>Loading...</p>
    </div>
  );

  if (!blog) return (
    <div style={{ minHeight: "100vh", background: "#1A1C1E", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ fontFamily: "'Courier New', monospace", fontSize: "11px", color: "#8A8A8A" }}>Blog not found.</p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#1A1C1E" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "100px 24px 80px" }}>

        {/* Back */}
        <button
          onClick={() => navigate("/blogs")}
          style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", color: "#8A8A8A", fontSize: "13px", fontFamily: "'Inter', sans-serif", marginBottom: "40px", padding: 0 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#E07A5F")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8A8A")}
        >
          <FaArrowLeft style={{ fontSize: "11px" }} /> Back to Blogs
        </button>

        <div ref={ref} style={{ opacity: 1 }}>
          {/* Cover image */}
          {blog.coverImage && (
            <div style={{ width: "100%", height: "280px", overflow: "hidden", borderRadius: "4px", marginBottom: "32px", border: "1px solid #2E3032" }}>
              <img
                src={blog.coverImage}
                alt={blog.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(30%) brightness(0.7)" }}
              />
            </div>
          )}

          {/* Date */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
            <FaCalendarAlt style={{ color: "#E07A5F", fontSize: "10px" }} />
            <p style={{ fontFamily: "'Courier New', monospace", fontSize: "10px", color: "#8A8A8A", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {new Date(blog.createdAt).toDateString()}
            </p>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#F0EDE8", lineHeight: 1.2, fontWeight: 600, marginBottom: "8px" }}>
            {blog.title}
          </h1>

          {/* Terracotta rule */}
          <div style={{ width: "40px", height: "2px", background: "#E07A5F", margin: "20px 0 32px", borderRadius: "1px" }} />

          {/* Body card */}
          <div style={{ background: "#222426", border: "1px solid #2E3032", borderRadius: "4px", padding: "36px 40px" }}>
            <p style={{ fontSize: "15px", color: "#D1D1D1", lineHeight: 1.9, fontFamily: "'Inter', sans-serif", whiteSpace: "pre-wrap", margin: 0 }}>
              {blog.content}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogDetails;
