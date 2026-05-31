import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import '../styles/BlogForm.css';

const BlogForm = () => {
  const [form, setForm] = useState({ title: '', content: '', author: '' });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (image) data.append("image", image);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/blogs/post`, data);
      alert("Blog posted!");
      setForm({ title: "", content: "", author: "" });
      setImage(null);
      navigate("/blogs");
    } catch (err) {
      console.error("Error posting blog:", err);
      alert("Failed to post blog.");
    }
  };

  return (
    <section className="blog-form-wrapper">
      <Helmet>
        <title>Post a New Blog | MF Global Services</title>
        <meta
          name="description"
          content="Contribute to MF Global Services blog. Share your insights, ideas, and news with our community by posting a new blog today!"
        />
        
        {/* ✅ Canonical Tag Added */}
        <link rel="canonical" href="https://printkee.com/blogs/post" />
      </Helmet>

      <form onSubmit={handleSubmit} className="blog-form slide-up" aria-label="Post a new blog form">
        <h2>Post a New Blog</h2>

        {/* Title Input */}
        <label htmlFor="title">Blog Title</label>
        <input
          id="title"
          name="title"
          placeholder="Enter blog title"
          value={form.title}
          onChange={handleChange}
          required
        />

        {/* Author Input */}
        <label htmlFor="author">Author Name</label>
        <input
          id="author"
          name="author"
          placeholder="Enter author name"
          value={form.author}
          onChange={handleChange}
          required
        />

        {/* Content Input */}
        <label htmlFor="content">Blog Content</label>
        <textarea
          id="content"
          name="content"
          placeholder="Write your content here..."
          rows="6"
          value={form.content}
          onChange={handleChange}
          required
        />

        {/* Image Upload */}
        <label htmlFor="image-upload">Upload Blog Image</label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {/* Submit Button (Accessible Name ✓) */}
        <button type="submit" className="submit-btn" aria-label="Post blog">
          Post Blog
        </button>
      </form>
    </section>
  );
};

export default BlogForm;
