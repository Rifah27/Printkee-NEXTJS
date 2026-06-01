"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api, getPublicUrl } from "../../../../lib/api";

export default function BlogEditPage() {
  const router = useRouter();
  const params = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!params?.id) return;
    api.get(`/blogs/${params.id}`).then((res) => {
      const blog = res.data;
      setTitle(blog.title || "");
      setAuthor(blog.author || "");
      setCategory(blog.category || "");
      setDescription(blog.description || "");
      setContent(blog.content || "");
      setCurrentImage(blog.image || "");
    }).catch(console.error);
  }, [params]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0] || null;
    setImage(file);
    if (!file) {
      setImagePreview("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      return setStatus({ type: "error", message: "Title and content are required." });
    }

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("author", author.trim());
      formData.append("category", category.trim());
      formData.append("description", description.trim());
      formData.append("content", content.trim());
      if (image) {
        formData.append("image", image);
      }

      await api.put(`/blogs/${params.id}`, formData);

      setStatus({ type: "success", message: "Blog updated successfully." });
      router.push(`/blog/${params.id}`);
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: error.response?.data?.error || "Unable to update the blog. Please try again." });
    }
  };

  return (
    <main className="page-shell">
      <section className="page-hero page-hero--blog-form">
        <div className="container">
          <p className="home-kicker">Edit Blog Post</p>
          <h1>Update your article and republish</h1>
          <p className="page-lead">Change title, description, category, content, or upload a new featured image for your blog.</p>
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <div className="page-feature-card">
            {status && <div className={`form-status form-status--${status.type}`}>{status.message}</div>}

            <form onSubmit={handleSubmit} className="blog-editor">
              <div className="blog-editor__grid">
                <label>
                  Title
                  <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter the blog title" required />
                </label>
                <label>
                  Author
                  <input value={author} onChange={(e) => setAuthor(e.target.value)} type="text" placeholder="Author name" />
                </label>
                <label>
                  Category
                  <input value={category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Category" />
                </label>
              </div>

              <label>
                Summary
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" placeholder="Short summary or excerpt." />
              </label>

              <label>
                Blog content
                <textarea value={content} onChange={(e) => setContent(e.target.value)} rows="10" placeholder="Write the blog content here." required />
              </label>

              <div className="form-section">
                <label className="form-label">Featured image</label>
                <div className="image-upload-container">
                  <label className="image-upload-box">
                    <div className="upload-icon">📤</div>
                    <span>Choose a new image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer',
                      }}
                    />
                  </label>
                  {(imagePreview || currentImage) && (
                    <div className="image-preview">
                      <img src={imagePreview || getPublicUrl(currentImage)} alt="Blog preview" />
                      {imagePreview && (
                        <button
                          type="button"
                          onClick={() => {
                            setImage(null);
                            setImagePreview("");
                          }}
                          className="remove-image-btn"
                        >
                          Remove image
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" className="home-btn home-btn--primary">Save changes</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
