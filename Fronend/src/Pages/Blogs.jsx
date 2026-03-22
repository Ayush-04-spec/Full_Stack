import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "../Context/BlogContext";
import { gsap } from "gsap";

const Blogs = () => {
  const { blogs, loading, fetchBlogs } = useBlogs();
  const navigate = useNavigate();
  const gridRef = useRef(null);

  useEffect(() => { fetchBlogs(); }, []);

  useEffect(() => {
    if (!loading && blogs.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from(".blog-card", { y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" });
      }, gridRef);
      return () => ctx.revert();
    }
  }, [loading, blogs]);

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "var(--slate)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p className="mono">Loading...</p>
    </div>
  );

  return (
    <section style={{ minHeight: "100vh", background: "var(--slate)", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "64px" }}>
          <p className="mono" style={{ marginBottom: "16px" }}>Editorial</p>
          <h1 className="serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--warm-white)" }}>
            Insights &amp; <span style={{ fontStyle: "italic", color: "var(--terra)" }}>Tutorials</span>
          </h1>
          <div style={{ width: "40px", height: "2px", background: "var(--terra)", marginTop: "24px" }} />
        </div>

        <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1px", background: "var(--border)" }}>
          {blogs.filter((b) => b.published).map((blog) => (
            <div key={blog.id} className="blog-card"
              onClick={() => navigate(`/blogs/${blog.slug}`)}
              style={{ background: "var(--slate2)", cursor: "pointer", display: "flex", flexDirection: "column", transition: "background 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--slate3)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--slate2)")}
            >
              <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
                {blog.coverImage
                  ? <img src={blog.coverImage} alt={blog.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(40%) brightness(0.65)", transition: "filter 0.4s" }}
                      onMouseEnter={(e) => (e.target.style.filter = "grayscale(10%) brightness(0.8)")}
                      onMouseLeave={(e) => (e.target.style.filter = "grayscale(40%) brightness(0.65)")} />
                  : <div style={{ width: "100%", height: "100%", background: "var(--slate3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <p className="mono" style={{ fontSize: "10px" }}>No image</p>
                    </div>
                }
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "var(--terra)", opacity: 0, transition: "opacity 0.3s" }}
                  ref={(el) => {
                    if (!el) return;
                    const p = el.parentElement?.parentElement;
                    if (!p) return;
                    p.addEventListener("mouseenter", () => (el.style.opacity = "1"));
                    p.addEventListener("mouseleave", () => (el.style.opacity = "0"));
                  }} />
              </div>
              <div style={{ padding: "24px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <p className="mono" style={{ marginBottom: "10px", fontSize: "10px" }}>{new Date(blog.createdAt).toDateString()}</p>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "17px", color: "var(--warm-white)", marginBottom: "12px", lineHeight: 1.35 }}>{blog.title}</h2>
                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.7, flexGrow: 1 }}>{blog.content?.slice(0, 120)}...</p>
                <p style={{ marginTop: "16px", fontSize: "12px", color: "var(--terra)", fontFamily: "var(--sans)" }}>Read more →</p>
              </div>
            </div>
          ))}
        </div>

        {!loading && blogs.length === 0 && (
          <p className="mono" style={{ color: "var(--muted)", marginTop: "40px" }}>No posts yet.</p>
        )}
      </div>
    </section>
  );
};

export default Blogs;
