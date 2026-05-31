import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../styles/BlogList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/blogs`)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <div className="blog-list-container">
      <Helmet>
        <title>Latest Blogs | MF Global Services</title>
        <meta
          name="description"
          content="Explore insightful blogs and updates from MF Global Services. Stay informed about corporate gifting trends, branding tips, and industry insights."
        />

      
        <link rel="canonical" href="https://printkee.com/blogs" />
      </Helmet>

      <div className="blog-header">
        <h2 className="blog-title">Latest Blogs</h2>

        {/* Accessible link for screen readers */}
        <Link
          to="/blogs/post"
          className="post-blog-btn"
          aria-label="Post a new blog"
        >
          Post a Blog
        </Link>
      </div>

      <div className="blog-list-grid">
        {blogs.length === 0 ? (
          <p>No blogs available at the moment.</p>
        ) : (
          blogs.map((blog) => (
            <article className="blog-card" key={blog._id}>
              <img
                src={`${import.meta.env.VITE_IMG_URL}/uploads/${blog.image}`}
                alt={blog.title ? blog.title : "Blog thumbnail image"}
                className="blog-thumbnail"
              />

              <h3 className="blog-heading">{blog.title}</h3>

              <p className="blog-meta">
                By {blog.author ? blog.author : "Unknown"} on{" "}
                {blog.date
                  ? new Date(blog.date).toLocaleDateString()
                  : "Unknown date"}
              </p>

              <p className="blog-excerpt">
                {blog.content ? blog.content.slice(0, 120) : ""}...
              </p>

              <Link
                to={`/blog/${blog._id}`}
                className="read-more-link"
                aria-label={`Read full blog: ${blog.title}`}
              >
                Read More
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogList;
