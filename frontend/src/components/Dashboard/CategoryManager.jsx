import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import axios from "axios";
import Modal from "../../components/Dashboard/Modal";
import FormInput from "../../components/Dashboard/FormInput";
import AdminLayout from "../../components/Dashboard/AdminLayout";
import "../../styles/admin/HeroManager.css"; // reuse same styling

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: "",
    },
  });

  const [editId, setEditId] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/category/all`);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAddModal = () => {
    setForm({
      name: "",
      slug: "",
      description: "",
      image: "",
      seo: {
        metaTitle: "",
        metaDescription: "",
        keywords: "",
      },
    });
    setEditId(null);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.slug) {
      alert("Name and slug are required ❗");
      return;
    }

    try {
      if (editId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/category/update/${editId}`,
          form
        );
        alert("Category updated successfully ✅");
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/category/create`,
          form
        );
        alert("Category added successfully ✅");
      }

      fetchCategories();
      setIsModalOpen(false);

    } catch (err) {
      console.error("Error saving category:", err);
      alert("Failed to save category ❌");
    }
  };

  const handleEdit = (cat) => {
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image: cat.image,
      seo: {
        metaTitle: cat.seo?.metaTitle || "",
        metaDescription: cat.seo?.metaDescription || "",
        keywords: cat.seo?.keywords?.join(", ") || "",
      },
    });
    setEditId(cat._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/category/delete/${id}`);
      alert("Category deleted ✅");
      fetchCategories();
    } catch (err) {
      console.error("Error deleting:", err);
      alert("Failed to delete ❌");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const fd = new FormData();
      fd.append("image", file);

      const uploadRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/category/upload`,
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setForm((prev) => ({
        ...prev,
        image: uploadRes.data.url,
      }));

      alert("Image uploaded ✅");

    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed ❌");
    }
  };

  return (
    <AdminLayout>
      <div className="hm-wrapper">
        <div className="hm-header">
          <h3 className="hm-title">
            <ImageIcon size={18} /> Category Manager
          </h3>

          <button className="hm-add-btn" onClick={openAddModal}>
            <Plus size={16} /> Add Category
          </button>
        </div>

        <p className="hm-description">Manage all product categories.</p>

        {/* Category List */}
        <ul className="hm-slide-list">
          {categories.length === 0 ? (
            <li className="hm-empty">No categories available.</li>
          ) : (
            categories.map((cat) => (
              <li key={cat._id} className="hm-slide-item">
                <div className="hm-slide-info">

                  {/* Thumbnail */}
                  {/* {cat.image && (
                    <img
                      src={cat.image}
                      style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "4px", marginBottom: "8px" }}
                    />
                  )} */}

                  <strong className="hm-slide-title">{cat.name}</strong>
                  <div className="hm-slide-type">(slug: {cat.slug})</div>
                  <div className="hm-slide-sub">{cat.description}</div>
                </div>

                <div className="hm-slide-actions">
                  <button className="hm-edit-btn" onClick={() => handleEdit(cat)}>
                    <Edit size={16} /> Edit
                  </button>

                  <button className="hm-delete-btn" onClick={() => handleDelete(cat._id)}>
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editId ? "Edit Category" : "Add New Category"}
      >
        <FormInput
          label="Category Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <FormInput
          label="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />

        <FormInput
          label="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* Upload */}
        <div className="hm-upload-group">
          <label className="hm-input-label">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        {/* Manual URL */}
        <FormInput
          label="OR Paste Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        {/* Preview */}
        {form.image && (
          <div className="hm-preview">
            <img src={form.image} alt="Preview" />
          </div>
        )}

        {/* SEO Section */}
        {/* <h4 style={{ marginTop: "20px" }}>SEO Fields</h4> */}

        <FormInput
          label="Meta Title"
          value={form.seo.metaTitle}
          onChange={(e) =>
            setForm({ ...form, seo: { ...form.seo, metaTitle: e.target.value } })
          }
        />

        <FormInput
          label="Meta Description"
          value={form.seo.metaDescription}
          onChange={(e) =>
            setForm({
              ...form,
              seo: { ...form.seo, metaDescription: e.target.value },
            })
          }
        />

        <FormInput
          label="Keywords (comma separated)"
          value={form.seo.keywords}
          onChange={(e) =>
            setForm({ ...form, seo: { ...form.seo, keywords: e.target.value } })
          }
        />

        <button className="hm-save-btn" onClick={handleSave}>
          {editId ? "Update" : "Save"}
        </button>
      </Modal>
    </AdminLayout>
  );
};

export default CategoryManager;
