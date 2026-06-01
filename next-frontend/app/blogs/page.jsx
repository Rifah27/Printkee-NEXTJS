"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BlogCard from "../../components/BlogCard";
import { api } from "../../lib/api";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/blogs")
      .then((res) => setBlogs(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        console.error(err);
        setError("Unable to load blogs right now.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="printkee-page blogs-redesign">
      <section className="blogs-redesign__hero">
        <div className="container blogs-redesign__hero-inner">
          <div>
            <p>Latest Blogs</p>
            <h1>Latest Blogs</h1>
          </div>
          <Link href="/blogs/post" className="home-btn home-btn--primary" aria-label="Post a new blog">Post a Blog</Link>
        </div>
      </section>

      <section className="blogs-redesign__list">
        <div className="container">
          {loading ? (
            <p className="blogs-redesign__empty">Loading blogs...</p>
          ) : error ? (
            <p className="blogs-redesign__empty">{error}</p>
          ) : blogs.length === 0 ? (
            <p className="blogs-redesign__empty">No blogs available at the moment.</p>
          ) : (
            <div className="blogs-redesign__grid">
              {blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
