import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../styles/BlogView.css';

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState({ name: '', comment: '' });

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${id}`);
      setBlog(res.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/blogs/${id}/comments`, comment);
      setComment({ name: '', comment: '' });
      fetchBlog();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  if (!blog) return <div className="blog-view-loading">Loading blog post...</div>;

  const canonicalUrl = `https://printkee.com/blog/${id}`;

  // JSON-LD Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    image: `${import.meta.env.VITE_IMG_URL}/${blog.image}`,
    author: {
      "@type": "Person",
      name: blog.author
    },
    datePublished: blog.date,
    description: blog.content.slice(0, 150),
    url: canonicalUrl
  };

  return (
    <div className="blog-view-container">

      {/* SEO Helmet */}
      <Helmet>
        <title>{blog.title} | MF Global Blog</title>
        <meta
          name="description"
          content={blog.content.slice(0, 160).replace(/<[^>]+>/g, '')}
        />
        <link rel="canonical" href={canonicalUrl} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* MAIN LAYOUT */}
      <div className="blog-view-main">

        {/* LEFT COLUMN — BLOG CONTENT */}
        <article className="blog-left">
          <h1>{blog.title}</h1>

          <p className="blog-view-meta">
            By {blog.author} on {new Date(blog.date).toLocaleDateString()}
          </p>

          {blog.image && (
            <img
              className="blog-view-image"
              src={`${import.meta.env.VITE_IMG_URL}/uploads/${blog.image}`}
              alt={blog.title}
            />
          )}

          {/* Render content safely & correctly */}
          <div
            className="blog-view-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>
        </article>

        {/* RIGHT COLUMN — COMMENTS */}
        <aside className="blog-right">
          <div className="comment-section">
            <h3 id="comments-title">Comments</h3>

            {blog.comments.length === 0 ? (
              <p>No comments yet. Be the first to comment!</p>
            ) : (
              blog.comments.map((c, i) => (
                <div className="comment" key={i}>
                  <b>{c.name}</b>
                  <p>{c.comment}</p>
                </div>
              ))
            )}

            {/* Accessible Comment Form */}
            <form onSubmit={handleComment} className="comment-form" aria-labelledby="comments-title">

              <label htmlFor="comment-name">Your Name</label>
              <input
                id="comment-name"
                name="name"
                placeholder="Enter your name"
                value={comment.name}
                onChange={(e) => setComment({ ...comment, name: e.target.value })}
                required
              />

              <label htmlFor="comment-text">Your Comment</label>
              <textarea
                id="comment-text"
                name="comment"
                placeholder="Write your comment…"
                value={comment.comment}
                onChange={(e) => setComment({ ...comment, comment: e.target.value })}
                required
              />

              <button type="submit" aria-label="Post your comment">Post Comment</button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogView;
