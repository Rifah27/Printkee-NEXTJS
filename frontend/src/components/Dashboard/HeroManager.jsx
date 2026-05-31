import React, { useEffect, useState } from "react";
import { Plus, Image as ImageIcon, Trash2, Edit } from "lucide-react";
import axios from "axios";
import Modal from "../../components/Dashboard/Modal";
import FormInput from "../../components/Dashboard/FormInput";
import AdminLayout from "../../components/Dashboard/AdminLayout";
import "../../styles/admin/HeroManager.css";

const HeroManager = () => {
  const [slides, setSlides] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    type: "image",
    src: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchSlides = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/slides/get-all`
      );
      setSlides(res.data);
    } catch (err) {
      console.error("Error fetching slides:", err);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const openAddModal = () => {
    setForm({ title: "", subtitle: "", type: "image", src: "" });
    setEditId(null);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.src || form.src.trim() === "") {
      alert("Please upload an image/video or paste a valid URL.");
      return;
    }

    try {
      if (editId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/slides/update/${editId}`,
          form
        );
        alert("Slide updated successfully ✅");
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/slides/post-all`,
          form
        );
        alert("Slide added successfully ✅");
      }

      fetchSlides();
      setIsModalOpen(false);

    } catch (err) {
      console.error("Error saving slide:", err);
      alert("Failed to save slide ❌ Check console for details.");
    }
  };


  const handleEdit = (slide) => {
    setForm(slide);
    setEditId(slide.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this slide?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/slides/delete/${id}`
      );

      alert("Slide deleted successfully ✅");
      fetchSlides();

    } catch (err) {
      console.error("Error deleting slide:", err);
      alert("Failed to delete slide ❌");
    }
  };


  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/slides/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setForm((prev) => ({
        ...prev,
        src: uploadRes.data.url
      }));

      alert("File uploaded successfully ✅");

    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed ❌ Check console for details.");
    }
  };

  return (
    <AdminLayout>
      <div className="hm-wrapper">
        <div className="hm-header">
          <h3 className="hm-title">
            <ImageIcon size={18} /> Hero Section Manager
          </h3>

          <button className="hm-add-btn" onClick={openAddModal}>
            <Plus size={16} /> Add Slide
          </button>
        </div>

        <p className="hm-description">
          Manage homepage banners (image or video).
        </p>

        <ul className="hm-slide-list">
          {slides.length === 0 ? (
            <li className="hm-empty">No banners available.</li>
          ) : (
            slides.map((slide) => (
              <li key={slide.id} className="hm-slide-item">
                <div className="hm-slide-info">
                  <strong className="hm-slide-title">
                    {slide.title || "Untitled"}
                  </strong>
                  <span className="hm-slide-type">({slide.type})</span>
                  <div className="hm-slide-sub">{slide.subtitle}</div>
                </div>

                <div className="hm-slide-actions">
                  <button
                    className="hm-edit-btn"
                    onClick={() => handleEdit(slide)}
                  >
                    <Edit size={16} /> Edit
                  </button>

                  <button
                    className="hm-delete-btn"
                    onClick={() => handleDelete(slide.id)}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editId ? "Edit Slide" : "Add New Slide"}
      >
        {/* Title */}
        <FormInput
          label="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        {/* Subtitle */}
        <FormInput
          label="Subtitle"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
        />

        {/* Type Selector */}
        <div className="hm-form-group">
          <label className="hm-input-label">Type</label>
          <select
            className="hm-select"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>

        {/*  Upload Input */}
        <div className="hm-upload-group">
          <label className="hm-input-label">Upload Image/Video</label>
          <input
            type="file"
            accept="image/*,video/*"
            className="hm-file-input"
            onChange={handleFileUpload}
          />
        </div>

        {/*  Manual URL Input */}
        <FormInput
          label="OR Paste Image/Video URL"
          value={form.src}
          onChange={(e) => setForm({ ...form, src: e.target.value })}
        />

        {/*  Preview */}
        {form.src && (
          <div className="hm-preview">
            {form.type === "image" ? (
              <img src={form.src} alt="Preview" />
            ) : (
              <video controls>
                <source src={form.src} />
              </video>
            )}
          </div>
        )}

        {/*  Save Button */}
        <button className="hm-save-btn" onClick={handleSave}>
          {editId ? "Update" : "Save"}
        </button>
      </Modal>

    </AdminLayout>
  );
};

export default HeroManager;
