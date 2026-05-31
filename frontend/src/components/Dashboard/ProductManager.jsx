import React, { useEffect, useMemo, useState } from "react";
import { Plus, Edit, Trash2, Image as ImageIcon, Search, Layers } from "lucide-react";
import axios from "axios";
import AdminLayout from "../../components/Dashboard/AdminLayout";
import Modal from "../../components/Dashboard/Modal";
import FormInput from "../../components/Dashboard/FormInput";
import "../../styles/admin/HeroManager.css";

const emptyForm = {
  name: "",
  slug: "",
  description: { short: "", long: "" },
  price: "",
  salePrice: "",
  images: [],       // [{url, altText}]
  subImages: [],    // [{url, altText}]
  stock: 0,
  sku: "",
  attributes: { color: [], size: [], material: "" },
  additionalInfo: [], // [{label, value}]
  specifications: [], // [{key, value}]
  tags: "",           // comma string in UI
  isFeatured: false,
  isActive: true,
  seo: { metaTitle: "", metaDescription: "", keywords: "" }, // comma in UI
  category: "",
  subcategory: "",
};

const ProductManager = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(5);
  const [search, setSearch] = useState("");

  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]); // all subcategories (from /subcategories/all)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  // Dependent subs filter by category
  const filteredSubs = useMemo(
    () => subs.filter(s => s.category?._id === form.category),
    [subs, form.category]
  );

  // Fetch list
  const fetchProducts = async (p = 1, q = "") => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/all`, {
      params: { page: p, limit, search: q }
    });
    setItems(res.data.items);
    setPage(res.data.page);
    setTotalPages(res.data.totalPages);
  };

  const fetchCategories = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/category/all`);
    setCategories(res.data);
  };

  const fetchSubs = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/subcategory/all`);
    setSubs(res.data);
  };

  useEffect(() => {
    fetchProducts(1, "");
    fetchCategories();
    fetchSubs();
  }, []);

  // Search submit
  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(1, search);
  };

  // Open Add
  const openAdd = () => {
    setForm({ ...emptyForm });
    setEditId(null);
    setIsModalOpen(true);
  };

  // Save
  const handleSave = async () => {
    // Quick validation
    if (!form.name || !form.slug || !form.price || !form.category) {
      alert("Name, slug, price, and category are required.");
      return;
    }

    // Convert UI comma strings to arrays for tags & SEO keywords
    const payload = {
      ...form,
      price: Number(form.price),
      salePrice: form.salePrice ? Number(form.salePrice) : null,
      tags: form.tags,
      seo: {
        ...form.seo,
        keywords: form.seo.keywords,
      },
    };

    try {
      if (editId) {
        await axios.put(`${import.meta.env.VITE_API_URL}/product/update/${editId}`, payload);
        alert("Product updated ✅");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/product/create`, payload);
        alert("Product created ✅");
      }
      setIsModalOpen(false);
      fetchProducts(page, search);
    } catch (err) {
      console.error(err);
      alert("Save failed ❌");
    }
  };

  const handleEdit = (p) => {
    setEditId(p._id);
    setForm({
      name: p.name,
      slug: p.slug,
      description: { short: p.description?.short || "", long: p.description?.long || "" },
      price: p.price ?? "",
      salePrice: p.salePrice ?? "",
      images: p.images || [],
      subImages: p.subImages || [],
      stock: p.stock ?? 0,
      sku: p.sku || "",
      attributes: {
        color: p.attributes?.color || [],
        size: p.attributes?.size || [],
        material: p.attributes?.material || "",
      },
      additionalInfo: p.additionalInfo || [],
      specifications: p.specifications || [],
      tags: (p.tags || []).join(", "),
      isFeatured: !!p.isFeatured,
      isActive: !!p.isActive,
      seo: {
        metaTitle: p.seo?.metaTitle || "",
        metaDescription: p.seo?.metaDescription || "",
        keywords: (p.seo?.keywords || []).join(", "),
      },
      category: p.category?._id || "",
      subcategory: p.subcategory?._id || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/product/delete/${id}`);
      alert("Product deleted ✅");
      fetchProducts(page, search);
    } catch (err) {
      console.error(err);
      alert("Delete failed ❌");
    }
  };

  // ---- Upload helpers ----
  const uploadSingle = async (file) => {
    const fd = new FormData();
    fd.append("image", file);
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/product/upload`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.url;
  };

  const handleUploadPrimary = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    try {
      const urls = [];
      for (const f of files) {
        const url = await uploadSingle(f);
        urls.push({ url, altText: "" });
      }
      setForm((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
      alert("Primary images uploaded ✅");
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    }
  };

  const handleUploadSecondary = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    try {
      const urls = [];
      for (const f of files) {
        const url = await uploadSingle(f);
        urls.push({ url, altText: "" });
      }
      setForm((prev) => ({ ...prev, subImages: [...prev.subImages, ...urls] }));
      alert("Sub images uploaded ✅");
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    }
  };

  // ---- Dynamic arrays handlers ----
  const addKV = (field) =>
    setForm((p) => ({ ...p, [field]: [...p[field], { label: "", value: "" }] }));

  const updateKV = (field, idx, key, value) => {
    setForm((p) => {
      const next = [...p[field]];
      next[idx] = { ...next[idx], [key]: value };
      return { ...p, [field]: next };
    });
  };

  const removeKV = (field, idx) =>
    setForm((p) => ({ ...p, [field]: p[field].filter((_, i) => i !== idx) }));

  const addSpec = () =>
    setForm((p) => ({ ...p, specifications: [...p.specifications, { key: "", value: "" }] }));
  const updateSpec = (idx, key, value) => {
    setForm((p) => {
      const next = [...p.specifications];
      next[idx] = { ...next[idx], [key]: value };
      return { ...p, specifications: next };
    });
  };
  const removeSpec = (idx) =>
    setForm((p) => ({ ...p, specifications: p.specifications.filter((_, i) => i !== idx) }));

  const removeImage = (field, idx) =>
    setForm((p) => ({ ...p, [field]: p[field].filter((_, i) => i !== idx) }));

  const updateImageAlt = (field, idx, value) =>
    setForm((p) => {
      const next = [...p[field]];
      next[idx] = { ...next[idx], altText: value };
      return { ...p, [field]: next };
    });

  const setArrayFromComma = (field, value) => {
    const arr = value.split(",").map(s => s.trim()).filter(Boolean);
    setForm((p) => ({ ...p, attributes: { ...p.attributes, [field]: arr } }));
  };

  // ---- Pagination UI helpers ----
  const goTo = (p) => {
    if (p < 1 || p > totalPages) return;
    fetchProducts(p, search);
  };

  return (
    <AdminLayout>
      <div className="hm-wrapper">
        <div className="hm-header">
          <h3 className="hm-title"><Layers size={18} /> Product Manager</h3>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <form onSubmit={handleSearch} style={{ display: "flex", gap: 8 }}>
              <input
                placeholder="Search name/slug/sku/tags"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="hm-select"
                style={{ width: 260 }}
              />
              <button className="hm-add-btn" type="submit"><Search size={16}/> Search</button>
            </form>

            <button className="hm-add-btn" onClick={openAdd}>
              <Plus size={16}/> Add Product
            </button>
          </div>
        </div>

        <p className="hm-description">Manage products, media, attributes, and SEO.</p>

        {/* List */}
        <ul className="hm-slide-list">
          {items.length === 0 ? (
            <li className="hm-empty">No products found.</li>
          ) : items.map((p) => (
            <li className="hm-slide-item" key={p._id}>
              <div className="hm-slide-info">
                <strong className="hm-slide-title">{p.name}</strong>
                <div className="hm-slide-type">₹{p.price}{p.salePrice ? ` (Sale: ₹${p.salePrice})` : ""}</div>
                <div className="hm-slide-sub">
                  {p.category?.name} {p.subcategory ? `› ${p.subcategory?.name}` : ""} • SKU: {p.sku || "N/A"}
                </div>
              </div>

              <div className="hm-slide-actions">
                <button className="hm-edit-btn" onClick={() => handleEdit(p)}>
                  <Edit size={16}/> Edit
                </button>
                <button className="hm-delete-btn" onClick={() => handleDelete(p._id)}>
                  <Trash2 size={16}/> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-container">

            {/* Prev */}
            <button className="pg-btn" onClick={() => goTo(page - 1)} disabled={page === 1}>
              ◀ Prev
            </button>

            {/* Page Numbers with Ellipsis */}
            {(() => {
              const btns = [];
              const total = totalPages;

              const addBtn = (p) =>
                btns.push(
                  <button
                    key={p}
                    className={`pg-number ${page === p ? "active" : ""}`}
                    onClick={() => goTo(p)}
                  >
                    {p}
                  </button>
                );

              // Always show 1
              if (page > 3) {
                addBtn(1);
                btns.push(<span key="dots-left" className="pg-dots">...</span>);
              }

              // Middle range (visible pages)
              const start = Math.max(1, page - 1);
              const end = Math.min(total, page + 1);

              for (let p = start; p <= end; p++) {
                addBtn(p);
              }

              // Always show last
              if (page < total - 2) {
                btns.push(<span key="dots-right" className="pg-dots">...</span>);
                addBtn(total);
              }

              return btns;
            })()}

            {/* Next */}
            <button className="pg-btn" onClick={() => goTo(page + 1)} disabled={page === totalPages}>
              Next ▶
            </button>
          </div>
        )}
      </div>

      {/* Editor Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editId ? "Edit Product" : "Add Product"}
      >
        {/* BASIC INFO */}
        <h4>Basic Info</h4>
        <FormInput label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}/>
        <FormInput label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}/>
        <FormInput label="Short Description" value={form.description.short} onChange={(e) => setForm({ ...form, description: { ...form.description, short: e.target.value }})}/>
        <div className="hm-form-group">
          <label className="hm-input-label">Long Description</label>
          <textarea
            rows={4}
            className="hm-select"
            value={form.description.long}
            onChange={(e) => setForm({ ...form, description: { ...form.description, long: e.target.value }})}
          />
        </div>

        {/* PRICING */}
        <h4 style={{ marginTop: 16 }}>Pricing</h4>
        <FormInput label="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}/>
        <FormInput label="Sale Price (optional)" type="number" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: e.target.value })}/>

        {/* CATEGORY/SUB */}
        <h4 style={{ marginTop: 16 }}>Categorization</h4>
        <div className="hm-form-group">
          <label className="hm-input-label">Category</label>
          <select className="hm-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value, subcategory: "" })}>
            <option value="">-- Select Category --</option>
            {categories.map(c => <option value={c._id} key={c._id}>{c.name}</option>)}
          </select>
        </div>
        <div className="hm-form-group">
          <label className="hm-input-label">Subcategory</label>
          <select className="hm-select" value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })}>
            <option value="">-- Select Subcategory --</option>
            {filteredSubs.map(s => <option value={s._id} key={s._id}>{s.name}</option>)}
          </select>
        </div>

        {/* MEDIA */}
        <h4 style={{ marginTop: 16 }}>Media</h4>
        <div className="hm-upload-group">
          <label className="hm-input-label">Upload Primary Images</label>
          <input type="file" accept="image/*" multiple onChange={handleUploadPrimary}/>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {form.images.map((img, i) => (
            <div key={i} style={{ border: "1px solid #e4e4e4", padding: 8 }}>
              <img src={img.url} alt="" style={{ width: "100%", height: 100, objectFit: "cover" }}/>
              <FormInput label="Alt text" value={img.altText} onChange={(e) => updateImageAlt("images", i, e.target.value)}/>
              <button className="hm-delete-btn" onClick={() => removeImage("images", i)}>Remove</button>
            </div>
          ))}
        </div>

        <div className="hm-upload-group" style={{ marginTop: 10 }}>
          <label className="hm-input-label">Upload Sub Images</label>
          <input type="file" accept="image/*" multiple onChange={handleUploadSecondary}/>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {form.subImages.map((img, i) => (
            <div key={i} style={{ border: "1px solid #e4e4e4", padding: 8 }}>
              <img src={img.url} alt="" style={{ width: "100%", height: 100, objectFit: "cover" }}/>
              <FormInput label="Alt text" value={img.altText} onChange={(e) => updateImageAlt("subImages", i, e.target.value)}/>
              <button className="hm-delete-btn" onClick={() => removeImage("subImages", i)}>Remove</button>
            </div>
          ))}
        </div>

        {/* ATTRIBUTES */}
        <h4 style={{ marginTop: 16 }}>Attributes</h4>
        <FormInput label="Colors (comma separated)" value={form.attributes.color.join(", ")} onChange={(e) => setArrayFromComma("color", e.target.value)}/>
        <FormInput label="Sizes (comma separated)" value={form.attributes.size.join(", ")} onChange={(e) => setArrayFromComma("size", e.target.value)}/>
        <FormInput label="Material" value={form.attributes.material} onChange={(e) => setForm({ ...form, attributes: { ...form.attributes, material: e.target.value }})}/>

        {/* INVENTORY */}
        <h4 style={{ marginTop: 16 }}>Inventory</h4>
        <FormInput label="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })}/>
        <FormInput label="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}/>
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <label><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })}/> Active</label>
          <label><input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}/> Featured</label>
        </div>

        {/* SEO */}
        <h4 style={{ marginTop: 16 }}>SEO</h4>
        <FormInput label="Meta Title" value={form.seo.metaTitle} onChange={(e) => setForm({ ...form, seo: { ...form.seo, metaTitle: e.target.value }})}/>
        <FormInput label="Meta Description" value={form.seo.metaDescription} onChange={(e) => setForm({ ...form, seo: { ...form.seo, metaDescription: e.target.value }})}/>
        <FormInput label="Keywords (comma separated)" value={form.seo.keywords} onChange={(e) => setForm({ ...form, seo: { ...form.seo, keywords: e.target.value }})}/>

        {/* ADDITIONAL INFO */}
        <h4 style={{ marginTop: 16 }}>Additional Info</h4>
        <button className="hm-add-btn" onClick={() => addKV("additionalInfo")}><Plus size={14}/> Add Row</button>
        {form.additionalInfo.map((row, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, marginTop: 8 }}>
            <FormInput label="Label" value={row.label} onChange={(e) => updateKV("additionalInfo", i, "label", e.target.value)}/>
            <FormInput label="Value" value={row.value} onChange={(e) => updateKV("additionalInfo", i, "value", e.target.value)}/>
            <button className="hm-delete-btn-2" onClick={() => removeKV("additionalInfo", i)}>Remove</button>
          </div>
        ))}

        {/* SPECIFICATIONS */}
        <h4 style={{ marginTop: 16 }}>Specifications</h4>
        <button className="hm-add-btn" onClick={addSpec}><Plus size={14}/> Add Spec</button>
        {form.specifications.map((row, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, marginTop: 8 }}>
            <FormInput label="Key" value={row.key} onChange={(e) => updateSpec(i, "key", e.target.value)}/>
            <FormInput label="Value" value={row.value} onChange={(e) => updateSpec(i, "value", e.target.value)}/>
            <button className="hm-delete-btn" onClick={() => removeSpec(i)}>Remove</button>
          </div>
        ))}

        {/* TAGS */}
        <h4 style={{ marginTop: 16 }}>Tags</h4>
        <FormInput label="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}/>

        <button className="hm-save-btn" style={{ marginTop: 16 }} onClick={handleSave}>
          {editId ? "Update" : "Save"}
        </button>
      </Modal>
    </AdminLayout>
  );
};

export default ProductManager;
