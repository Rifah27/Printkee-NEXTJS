"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiImage, FiRefreshCw, FiSend, FiX, FiCheck, FiAlertTriangle } from "react-icons/fi";
import { api } from "../../../lib/api";
import "./blog-post.css";

export default function BlogPostPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const plainText = (content || "").trim();

  const updateWordCount = (text) => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    setWordCount(words);
  };

  const handleContentChange = (e) => {
    const value = e.target.value;
    setContent(value);
    updateWordCount(value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    processImage(file);
  };

  const processImage = (file) => {
    if (!file) {
      setImage(null);
      setImagePreview(null);
      setImageError(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image too large. Please upload an image under 5MB.");
      setImage(null);
      setImagePreview(null);
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setImageError("Please upload a valid image file (JPG, PNG, or WebP).");
      setImage(null);
      setImagePreview(null);
      return;
    }

    setImageError(null);
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.onerror = () => {
      setImageError("Failed to read the image file.");
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processImage(files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    setImageError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCancel = () => {
    if (title.trim() || author.trim() || content.trim() || description.trim() || image) {
      const confirmed = window.confirm(
        "Are you sure you want to discard this blog post? All changes will be lost."
      );
      if (!confirmed) return;
    }
    router.push("/blogs");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    if (!title.trim()) {
      setStatus({ type: "error", message: "Please provide a blog title." });
      setIsSubmitting(false);
      return;
    }

    if (!plainText) {
      setStatus({ type: "error", message: "Please provide content for the blog." });
      setIsSubmitting(false);
      return;
    }

    if (plainText.split(/\s+/).length < 10) {
      setStatus({ type: "error", message: "Blog content must be at least 10 words." });
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("author", author.trim() || "Anonymous");
      formData.append("category", category.trim() || "General");
      formData.append("description", description.trim() || title.trim());
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }

      await api.post("/blogs/post", formData);

      setStatus({ type: "success", message: "Blog published successfully! Redirecting..." });
      setTimeout(() => router.push("/blogs"), 2000);
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.error || "Unable to publish the blog. Please try again.";
      setStatus({ type: "error", message: errorMsg });
      setIsSubmitting(false);
    }
  };

  return (
    <main className="blog-post-page">
      {/* Hero Section */}
      <section className="blog-post-hero">
        <div className="container">
          <Link href="/blogs" className="blog-post-breadcrumb">
            <FiArrowLeft aria-hidden="true" />
            Back to Blogs
          </Link>
          <div className="blog-post-header">
            <p className="blog-post-kicker">Post a Blog</p>
            <h1>Share a PrintKee story</h1>
            <p>Publish practical ideas, gifting guides, brand stories, and product inspiration with a featured image.</p>
          </div>
        </div>
      </section>

      <section className="blog-post-editor">
        <div className="container">
          <div className="blog-editor-wrapper">
            {status && (
              <div className={`editor-status editor-status--${status.type}`}>
                <div className="status-content">
                  <div className="status-icon">
                    {status.type === "success" ? <FiCheck aria-hidden="true" /> : <FiAlertTriangle aria-hidden="true" />}
                  </div>
                  <div>
                    <p className="status-message">{status.message}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="blog-form" noValidate>
              <div className="form-section">
                <h2 className="section-heading">Featured Image</h2>
                <div className="image-upload-container">
                  {imagePreview ? (
                    <div className="image-preview-wrapper">
                      <div className="image-preview">
                        <img src={imagePreview} alt="Featured Image Preview" />
                      </div>
                      <div className="image-actions">
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="btn-remove-image"
                          aria-label="Remove featured image"
                        >
                          <FiX aria-hidden="true" /> Remove Image
                        </button>
                        <label htmlFor="image-input" className="btn-replace-image">
                          <FiRefreshCw aria-hidden="true" /> Replace Image
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="image-upload-box"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <div className="upload-icon"><FiImage aria-hidden="true" /></div>
                      <p className="upload-title">Drag and drop your image here</p>
                      <p className="upload-subtitle">or</p>
                      <label htmlFor="image-input" className="upload-btn">
                        Click to browse
                      </label>
                      <p className="file-info">JPG, PNG, or WebP • Max 5MB</p>
                    </div>
                  )}
                  <input
                    id="image-input"
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    aria-label="Upload featured image"
                  />
                </div>
                {imageError && <p className="form-error">{imageError}</p>}
              </div>

              {/* Blog Details Section */}
              <div className="form-section">
                <h2 className="section-heading">Blog Details</h2>
                <div className="form-grid">
                  {/* Title */}
                  <div className="form-group form-group--full">
                    <label htmlFor="title" className="form-label">
                      Blog Title <span className="required">*</span>
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Write a captivating title for your blog"
                      className="form-input"
                      maxLength="100"
                      required
                      autoComplete="off"
                    />
                    <span className="char-count">{title.length}/100</span>
                  </div>

                  {/* Author */}
                  <div className="form-group">
                    <label htmlFor="author" className="form-label">
                      Author Name
                    </label>
                    <input
                      id="author"
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Your name or company"
                      className="form-input"
                      maxLength="50"
                      autoComplete="name"
                    />
                  </div>

                  {/* Category */}
                  <div className="form-group">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="form-input"
                    >
                      <option value="">Select a category</option>
                      <option value="Branding">Branding</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Corporate Gifting">Corporate Gifting</option>
                      <option value="Design Tips">Design Tips</option>
                      <option value="Industry News">Industry News</option>
                      <option value="Trends">Trends</option>
                      <option value="Sustainability">Sustainability</option>
                      <option value="Tips & Tricks">Tips & Tricks</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Summary Section */}
              <div className="form-section">
                <h2 className="section-heading">Summary / Excerpt</h2>
                <label htmlFor="description" className="form-label">
                  Write a brief summary that will appear on the blog list
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A compelling summary that makes readers want to learn more..."
                  rows="3"
                  className="form-textarea"
                  maxLength="500"
                />
                <span className="char-count">{description.length}/500</span>
              </div>

              {/* Content Section */}
              <div className="form-section">
                <h2 className="section-heading">Blog Content</h2>
                <label htmlFor="content" className="form-label">
                  Your Story <span className="required">*</span>
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={handleContentChange}
                  placeholder="Write your blog content here. Use blank lines to separate paragraphs for better readability."
                  rows="16"
                  className="form-textarea"
                  required
                />
                <div className="content-stats">
                  <span className="word-count">{wordCount} words</span>
                  <span className="char-count">{plainText.length} characters</span>
                </div>
              </div>

              {/* Form Actions */}
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting || !title.trim() || !plainText}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <FiSend aria-hidden="true" />
                      Publish Blog
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-secondary"
                  disabled={isSubmitting}
                  aria-label="Cancel and go back to blogs"
                >
                  <FiX aria-hidden="true" />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
