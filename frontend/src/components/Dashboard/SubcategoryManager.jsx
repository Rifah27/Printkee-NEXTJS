import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import axios from "axios";
import Modal from "../../components/Dashboard/Modal";
import FormInput from "../../components/Dashboard/FormInput";
import AdminLayout from "../../components/Dashboard/AdminLayout";
import "../../styles/admin/HeroManager.css";

const SubcategoryManager = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    category: "",
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: "",
    },
  });

  const [editId, setEditId] = useState(null);

  //  Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //  Pagination calculations
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentSubs = subcategories.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(subcategories.length / itemsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  //  Fetch subcategories
  const fetchSubcategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/subcategory/all`);
      setSubcategories(res.data);
    } catch (err) {
      console.error("Error fetching subcategories:", err);
    }
  };

  //  Fetch categories (for dropdown)
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/category/all`);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, []);

  //  Open modal for adding
  const openAddModal = () => {
    setForm({
      name: "",
      slug: "",
      description: "",
      image: "",
      category: "",
      seo: { metaTitle: "", metaDescription: "", keywords: "" },
    });

    setEditId(null);
    setIsModalOpen(true);
  };

  //  Save Subcategory
  const handleSave = async () => {
    if (!form.name || !form.slug || !form.category) {
      alert("Name, slug and category are required ❗");
      return;
    }

    try {
      if (editId) {
        await axios.put(`${import.meta.env.VITE_API_URL}/subcategory/update/${editId}`, form);
        alert("Subcategory updated successfully ✅");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/subcategory/create`, form);
        alert("Subcategory added successfully ✅");
      }

      fetchSubcategories();
      setIsModalOpen(false);

    } catch (err) {
      console.error("Error saving subcategory:", err);
      alert("Failed to save ❌");
    }
  };

  // Edit Subcategory
  const handleEdit = (sub) => {
    setForm({
      name: sub.name,
      slug: sub.slug,
      description: sub.description,
      image: sub.image,
      category: sub.category?._id || "",
      seo: {
        metaTitle: sub.seo?.metaTitle || "",
        metaDescription: sub.seo?.metaDescription || "",
        keywords: sub.seo?.keywords?.join(", ") || "",
      },
    });

    setEditId(sub._id);
    setIsModalOpen(true);
  };

  //  Delete Subcategory
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subcategory?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/subcategory/delete/${id}`);
      alert("Subcategory deleted ✅");
      fetchSubcategories();
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to delete ❌");
    }
  };

  //  Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const fd = new FormData();
      fd.append("image", file);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/subcategory/upload`,
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setForm((prev) => ({ ...prev, image: res.data.url }));
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
            <ImageIcon size={18} /> Subcategory Manager
          </h3>

          <button className="hm-add-btn" onClick={openAddModal}>
            <Plus size={16} /> Add Subcategory
          </button>
        </div>

        <p className="hm-description">Manage all subcategories.</p>

        {/*  List */}
        <ul className="hm-slide-list">
          {currentSubs.length === 0 ? (
            <li className="hm-empty">No subcategories found.</li>
          ) : (
            currentSubs.map((sub) => (
              <li key={sub._id} className="hm-slide-item">

                <div className="hm-slide-info">
                  <strong className="hm-slide-title">{sub.name}</strong>
                  <div className="hm-slide-type">(slug: {sub.slug})</div>
                  <div className="hm-slide-sub">
                    Category: {sub.category?.name}
                  </div>
                </div>

                <div className="hm-slide-actions">
                  <button className="hm-edit-btn" onClick={() => handleEdit(sub)}>
                    <Edit size={16} /> Edit
                  </button>

                  <button className="hm-delete-btn" onClick={() => handleDelete(sub._id)}>
                    <Trash2 size={16} /> Delete
                  </button>
                </div>

              </li>
            ))
          )}
        </ul>

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="pagination-container">
            {/* Prev */}
            <button
              className="pg-btn"
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
            >
              ◀ Prev
            </button>

            {/* Page Numbers with Ellipsis */}
            {(() => {
              const buttons = [];
              const addButton = (p) => {
                buttons.push(
                  <button
                    key={p}
                    className={`pg-number ${currentPage === p ? "active" : ""}`}
                    onClick={() => goToPage(p)}
                  >
                    {p}
                  </button>
                );
              };

              // Always show first page
              if (currentPage > 3) {
                addButton(1);
                buttons.push(<span key="dots-left" className="pg-dots">...</span>);
              }

              // Middle pages
              const start = Math.max(1, currentPage - 1);
              const end = Math.min(totalPages, currentPage + 1);

              for (let p = start; p <= end; p++) addButton(p);

              // Always show last page
              if (currentPage < totalPages - 2) {
                buttons.push(<span key="dots-right" className="pg-dots">...</span>);
                addButton(totalPages);
              }

              return buttons;
            })()}

            {/* Next */}
            <button
              className="pg-btn"
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
            >
              Next ▶
            </button>
          </div>
        )}
      </div>

      {/*  Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editId ? "Edit Subcategory" : "Add New Subcategory"}
      >
        <FormInput
          label="Name"
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

        <div className="hm-form-group">
          <label className="hm-input-label">Select Category</label>
          <select
            className="hm-select"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/*  Upload image */}
        <div className="hm-upload-group">
          <label className="hm-input-label">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        <FormInput
          label="OR Paste Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        {form.image && (
          <div className="hm-preview">
            <img src={form.image} alt="Preview" />
          </div>
        )}

        {/*  SEO Fields */}
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

export default SubcategoryManager;
