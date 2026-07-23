"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FiCheckCircle,
  FiEdit3,
  FiImage,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { api, authHeader, getPublicUrl } from "../lib/api";

const emptyItems = [];

const textFromDescription = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return [value.short, value.long].filter(Boolean).join("\n\n");
};

const splitList = (value) =>
  String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const imageListToString = (images = []) =>
  images
    .map((image) => (typeof image === "string" ? image : image?.url))
    .filter(Boolean)
    .join(", ");

export default function AdminResourceManager({
  title,
  kicker,
  description,
  badge,
  resourceName,
  resourceLabel,
  endpoints,
  fields,
  columns,
  normalizeFromApi,
  normalizeToApi,
  dependencies = {},
  seedItems = emptyItems,
  fallbackItems = emptyItems,
  localStorageKey,
  createLabel,
  showEditor = true,
  showTable = true,
  showToolbar = true,
  createLink,
  pageSize = 10,
}) {
  const blankForm = useMemo(() => {
    return fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue ?? "";
      return acc;
    }, {});
  }, [fields]);

  // allItems: the full list fetched from API (used for client-side pagination/search)
  const [allItems, setAllItems] = useState(() =>
    seedItems.length ? seedItems : fallbackItems
  );
  // serverSide: true when the API returns a paginated wrapper { items, totalItems, totalPages }
  const [serverSide, setServerSide] = useState(false);
  const [serverTotalPages, setServerTotalPages] = useState(1);

  const [form, setForm] = useState(blankForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(Boolean(endpoints?.list));
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const endpointKey = useMemo(() => JSON.stringify(endpoints || {}), [endpoints]);

  // ─── Load items from API ─────────────────────────────────────────────────────
  const loadItems = useCallback(async () => {
    if (localStorageKey) {
      const saved = window.localStorage.getItem(localStorageKey);
      setAllItems(saved ? JSON.parse(saved) : seedItems);
      setLoading(false);
      return;
    }

    if (!endpoints?.list) return;

    setLoading(true);
    try {
      // Use a generous limit to fetch all items at once for client-side pagination.
      // If the caller passes a limit in endpoints.params (e.g. 100) we use that;
      // otherwise fall back to a high ceiling so we capture everything.
      const limitParam =
        (endpoints.params && endpoints.params.limit) || pageSize || 100;

      // For server-side mode we send the real current page; for client-side always page 1.
      const pageParam = serverSide ? currentPage : 1;

      const params = {
        ...(endpoints.params || {}),
        page: pageParam,
        limit: limitParam,
      };

      // Only send search to the server when we know the API handles it (server-side mode).
      if (serverSide && debouncedQuery) params.search = debouncedQuery;

      const res = await api.get(endpoints.list, {
        headers: authHeader(),
        params,
      });

      // Detect whether the server returned a paginated wrapper or a plain array.
      const isServerPaginated =
        !Array.isArray(res.data) && res.data?.items !== undefined;

      if (isServerPaginated) {
        const rawItems = res.data.items || [];
        const nextItems = normalizeFromApi
          ? rawItems.map(normalizeFromApi)
          : rawItems;
        const respPages =
          res.data.totalPages ??
          Math.max(1, Math.ceil((res.data.totalItems || 0) / pageSize));
        setAllItems(nextItems);
        setServerTotalPages(respPages);
        if (!serverSide) setServerSide(true);
      } else {
        // Flat array — use client-side pagination & search
        const rawItems = Array.isArray(res.data) ? res.data : [];
        const nextItems = normalizeFromApi
          ? rawItems.map(normalizeFromApi)
          : rawItems;
        setAllItems(nextItems);
        setServerTotalPages(1);
        if (serverSide) setServerSide(false);
      }

      setMessage(null);
    } catch (err) {
      console.error(err);
      const fallback = normalizeFromApi
        ? fallbackItems.map(normalizeFromApi)
        : fallbackItems;
      setAllItems(fallback);
      setServerSide(false);
      setMessage(
        fallbackItems.length
          ? null
          : {
              type: "error",
              text: `${resourceLabel} could not be loaded. Check that the backend is running on port 5030.`,
            }
      );
    } finally {
      setLoading(false);
    }
  }, [
    endpointKey,
    fallbackItems,
    localStorageKey,
    normalizeFromApi,
    resourceLabel,
    seedItems,
    serverSide,
    currentPage,
    debouncedQuery,
    pageSize,
  ]);

  // Loading overlay with slight delay to avoid flash
  useEffect(() => {
    let t;
    if (loading) {
      t = setTimeout(() => setShowLoadingOverlay(true), 180);
    } else {
      setShowLoadingOverlay(false);
    }
    return () => clearTimeout(t);
  }, [loading]);

  // Keep form in sync with field definitions
  useEffect(() => {
    setForm(blankForm);
  }, [blankForm]);

  // Debounce search query
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Reset to page 1 whenever the search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery]);

  // Trigger data load
  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // ─── Local storage helpers ───────────────────────────────────────────────────
  const persistLocalItems = (nextItems) => {
    setAllItems(nextItems);
    window.localStorage.setItem(localStorageKey, JSON.stringify(nextItems));
  };

  // ─── Form helpers ────────────────────────────────────────────────────────────
  const handleChange = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleImageUpload = async (event, fieldName) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);
      setMessage({ type: "info", text: "Uploading image..." });

      const uploadEndpoint = endpoints.list?.includes("product")
        ? "/product/upload"
        : endpoints.list?.includes("hero")
        ? "/hero/upload"
        : "/category/upload";

      const res = await api.post(uploadEndpoint, formData, {
        headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
      });

      setForm((current) => ({ ...current, [fieldName]: res.data.url }));
      setMessage({ type: "success", text: "Image uploaded successfully." });
    } catch (err) {
      console.error("Upload error:", err);
      setMessage({ type: "error", text: "Failed to upload image." });
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(blankForm);
  };

  const handleEdit = (item) => {
    setEditingId(item._id || item.id);
    const nextForm = { ...blankForm };
    fields.forEach((field) => {
      nextForm[field.name] = field.fromItem
        ? field.fromItem(item)
        : item[field.name] ?? "";
    });
    setForm(nextForm);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = normalizeToApi ? normalizeToApi(form, dependencies) : form;

    if (localStorageKey) {
      const now = new Date().toISOString();
      const nextItem = {
        ...payload,
        id: editingId || `${resourceName}-${Date.now()}`,
        updatedAt: now,
        createdAt: editingId
          ? allItems.find((item) => item.id === editingId)?.createdAt
          : now,
      };
      const nextItems = editingId
        ? allItems.map((item) => (item.id === editingId ? nextItem : item))
        : [nextItem, ...allItems];
      persistLocalItems(nextItems);
      setMessage({ type: "success", text: `${resourceLabel} saved.` });
      resetForm();
      return;
    }

    try {
      if (editingId) {
        await api.put(`${endpoints.update}/${editingId}`, payload, {
          headers: authHeader(),
        });
        setMessage({ type: "success", text: `${resourceLabel} updated.` });
      } else {
        await api.post(endpoints.create, payload, { headers: authHeader() });
        setMessage({ type: "success", text: `${resourceLabel} created.` });
      }
      resetForm();
      loadItems();
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text:
          err.response?.data?.message || `${resourceLabel} could not be saved.`,
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete this ${resourceName}?`)) return;

    if (localStorageKey) {
      persistLocalItems(allItems.filter((item) => item.id !== id));
      setMessage({ type: "success", text: `${resourceLabel} deleted.` });
      return;
    }

    try {
      await api.delete(`${endpoints.delete}/${id}`, { headers: authHeader() });
      setMessage({ type: "success", text: `${resourceLabel} deleted.` });
      loadItems();
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: `${resourceLabel} could not be deleted.`,
      });
    }
  };

  // ─── Pagination & filtering ──────────────────────────────────────────────────

  // Client-side: filter all items by search query
  const filteredItems = useMemo(() => {
    if (serverSide) return allItems; // server already filtered
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return allItems;
    return allItems.filter((item) =>
      Object.values(item).some((v) =>
        String(v ?? "")
          .toLowerCase()
          .includes(q)
      )
    );
  }, [allItems, debouncedQuery, serverSide]);

  const effectivePageSize = pageSize || 10;

  const pageCount = serverSide
    ? serverTotalPages
    : Math.max(1, Math.ceil(filteredItems.length / effectivePageSize));

  // Slice to current page for display
  const paginatedItems = useMemo(() => {
    if (serverSide) return filteredItems;
    const start = (currentPage - 1) * effectivePageSize;
    return filteredItems.slice(start, start + effectivePageSize);
  }, [filteredItems, currentPage, effectivePageSize, serverSide]);

  const totalItems = filteredItems.length;
  const showPagination = showTable && pageCount > 1;

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="admin-page-head">
        <div>
          <p className="admin-kicker">{kicker}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {badge && <div className="admin-page-head__badge">{badge}</div>}
      </div>

      {createLink && !showEditor && (
        <div className="admin-resource-actions">
          <Link href={createLink} className="admin-btn admin-btn--primary">
            Create {resourceLabel}
          </Link>
        </div>
      )}

      {message && (
        <div className={`admin-alert admin-alert--${message.type}`}>
          {message.type === "success" ? <FiCheckCircle /> : <FiX />}
          {message.text}
        </div>
      )}

      {showEditor && (
        <form className="admin-editor" onSubmit={handleSubmit}>
          <div className="admin-editor__head">
            <div>
              <p className="admin-kicker">{editingId ? "Editing" : "Create"}</p>
              <h2>
                {editingId
                  ? `Update ${resourceName}`
                  : createLabel || `Add ${resourceName}`}
              </h2>
            </div>
            {editingId && (
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={resetForm}
              >
                <FiX />
                Cancel
              </button>
            )}
          </div>

          <div className="admin-form-grid">
            {fields.map((field) => (
              <label
                key={field.name}
                className={
                  field.type === "textarea" || field.wide
                    ? "admin-field admin-field--wide"
                    : "admin-field"
                }
              >
                <span>{field.label}</span>
                {field.type === "select" ? (
                  <select
                    value={form[field.name] ?? ""}
                    onChange={(event) =>
                      handleChange(field.name, event.target.value)
                    }
                    required={field.required}
                  >
                    <option value="">{field.placeholder || "Select"}</option>
                    {(dependencies[field.optionsKey] || []).map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    value={form[field.name] ?? ""}
                    onChange={(event) =>
                      handleChange(field.name, event.target.value)
                    }
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                ) : field.name === "image" ||
                  field.name === "images" ||
                  field.type === "file" ? (
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: "8px" }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleImageUpload(event, field.name)}
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span style={{ fontSize: "12px", color: "#666" }}>
                        OR paste URL:
                      </span>
                      <input
                        type="text"
                        value={form[field.name] ?? ""}
                        onChange={(event) =>
                          handleChange(field.name, event.target.value)
                        }
                        placeholder={field.placeholder}
                        style={{ flex: 1 }}
                      />
                    </div>
                    {form[field.name] && (
                      <div style={{ marginTop: "10px" }}>
                        <img
                          src={getPublicUrl(form[field.name])}
                          alt="Preview"
                          style={{ maxHeight: "100px", borderRadius: "8px" }}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <input
                    type={field.type || "text"}
                    value={form[field.name] ?? ""}
                    onChange={(event) =>
                      handleChange(field.name, event.target.value)
                    }
                    placeholder={field.placeholder}
                    required={field.required}
                    min={field.min}
                  />
                )}
              </label>
            ))}
          </div>

          <div className="admin-editor__actions">
            <button type="submit" className="admin-btn admin-btn--primary">
              {editingId ? <FiEdit3 /> : <FiPlus />}
              {editingId ? "Save changes" : createLabel || `Create ${resourceName}`}
            </button>
            <button
              type="button"
              className="admin-btn admin-btn--ghost"
              onClick={loadItems}
            >
              <FiRefreshCw />
              Refresh
            </button>
          </div>
        </form>
      )}

      {showToolbar && showTable && (
        <div className="admin-toolbar">
          <div className="admin-search">
            <FiSearch />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${resourceName}s`}
            />
          </div>
          <span>
            {totalItems} {serverSide ? "total" : "matching"} &mdash;{" "}
            {paginatedItems.length} shown
          </span>
        </div>
      )}

      {showTable && (
        <div className="admin-table-section">
          <div
            className={`admin-table-wrap ${
              loading ? "admin-table-wrap--loading" : ""
            }`}
          >
            <table className="admin-table">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key}>{column.label}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((item) => (
                  <tr key={item._id || item.id}>
                    {columns.map((column) => (
                      <td key={column.key}>
                        {column.render
                          ? column.render(item)
                          : item[column.key] || "-"}
                      </td>
                    ))}
                    <td>
                      <div className="admin-row-actions">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          title="Edit"
                        >
                          <FiEdit3 />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(item._id || item.id)
                          }
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!paginatedItems.length && (
                  <tr>
                    <td colSpan={columns.length + 1}>
                      <div className="admin-empty">
                        No {resourceName}s found.
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {showLoadingOverlay && (
              <div className="admin-loading admin-loading--overlay">
                Refreshing {resourceName}s...
              </div>
            )}
          </div>

          {showPagination && (
            <div className="admin-pagination">
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => page - 1)}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {pageCount}
              </span>
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                disabled={currentPage === pageCount}
                onClick={() => setCurrentPage((page) => page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export const categoryFields = [
  {
    name: "name",
    label: "Category name",
    required: true,
    placeholder: "Apparel and Accessories",
  },
  {
    name: "slug",
    label: "Slug",
    required: true,
    placeholder: "apparel-and-accessories",
  },
  {
    name: "image",
    label: "Image URL",
    wide: true,
    placeholder: "/assets/categories/apparel.webp",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Short admin-facing category description",
  },
  {
    name: "metaTitle",
    label: "SEO title",
    placeholder: "Custom Apparel & Accessories",
  },
  {
    name: "keywords",
    label: "SEO keywords",
    placeholder: "custom apparel, corporate gifting",
  },
  { name: "metaDescription", label: "SEO description", type: "textarea" },
];

export const subcategoryFields = [
  {
    name: "name",
    label: "Subcategory name",
    required: true,
    placeholder: "Custom Welcome Kits",
  },
  {
    name: "slug",
    label: "Slug",
    required: true,
    placeholder: "welcome-kits",
  },
  {
    name: "category",
    label: "Parent category",
    type: "select",
    optionsKey: "categories",
    required: true,
  },
  {
    name: "image",
    label: "Image URL",
    wide: true,
    placeholder: "/assets/subcategories/box.webp",
  },
  { name: "description", label: "Description", type: "textarea" },
  {
    name: "metaTitle",
    label: "SEO title",
    placeholder: "Custom Welcome Kits for Corporate Onboarding",
  },
  {
    name: "keywords",
    label: "SEO keywords",
    placeholder: "welcome kits, onboarding gifts",
  },
  { name: "metaDescription", label: "SEO description", type: "textarea" },
];

export const productFields = [
  {
    name: "name",
    label: "Product name",
    required: true,
    placeholder: "Premium Corporate Gift Mug",
  },
  {
    name: "slug",
    label: "Slug",
    required: true,
    placeholder: "premium-corporate-gift-mug",
  },
  { name: "sku", label: "SKU", placeholder: "PK-MUG-001" },
  {
    name: "category",
    label: "Category",
    type: "select",
    optionsKey: "categories",
    required: true,
  },
  {
    name: "subcategory",
    label: "Subcategory",
    type: "select",
    optionsKey: "subcategories",
    required: true,
  },
  { name: "price", label: "Price", type: "number", required: true, min: "0" },
  { name: "salePrice", label: "Sale price", type: "number", min: "0" },
  { name: "stock", label: "Stock", type: "number", min: "0" },
  {
    name: "images",
    label: "Image URLs",
    wide: true,
    placeholder:
      "/assets/products/coffee-mug/1.webp, /assets/products/coffee-mug/2.webp",
  },
  { name: "shortDescription", label: "Short description", type: "textarea" },
  { name: "longDescription", label: "Long description", type: "textarea" },
  {
    name: "tags",
    label: "Tags",
    placeholder: "corporate gifts, logo printing, bulk order",
  },
  { name: "colors", label: "Colors", placeholder: "Black, White, Navy" },
  { name: "sizes", label: "Sizes", placeholder: "S, M, L, XL" },
  { name: "material", label: "Material", placeholder: "Cotton blend" },
];

export const bannerFields = [
  {
    name: "title",
    label: "Banner title",
    required: true,
    placeholder: "Premium Corporate Gifting",
  },
  {
    name: "section",
    label: "Section",
    required: true,
    placeholder: "Homepage hero",
  },
  {
    name: "image",
    label: "Image URL",
    wide: true,
    placeholder: "/assets/banner1.webp",
  },
  { name: "cta", label: "Button label", placeholder: "Explore gifts" },
  {
    name: "href",
    label: "Button link",
    placeholder: "/collection/welcome-kits",
  },
  { name: "description", label: "Banner copy", type: "textarea" },
];

export const resourceNormalizers = {
  categoryFromApi: (item) => ({
    ...item,
    metaTitle: item.seo?.metaTitle || "",
    metaDescription: item.seo?.metaDescription || "",
    keywords: (item.seo?.keywords || []).join(", "),
  }),
  categoryToApi: (form) => ({
    name: form.name,
    slug: form.slug,
    image: form.image,
    description: form.description,
    seo: {
      metaTitle: form.metaTitle,
      metaDescription: form.metaDescription,
      keywords: form.keywords,
    },
  }),
  subcategoryFromApi: (item) => ({
    ...item,
    category: item.category?._id || item.category || "",
    categoryName: item.category?.name || "Unassigned",
    metaTitle: item.seo?.metaTitle || "",
    metaDescription: item.seo?.metaDescription || "",
    keywords: (item.seo?.keywords || []).join(", "),
  }),
  subcategoryToApi: (form) => ({
    name: form.name,
    slug: form.slug,
    category: form.category,
    image: form.image,
    description: form.description,
    seo: {
      metaTitle: form.metaTitle,
      metaDescription: form.metaDescription,
      keywords: form.keywords,
    },
  }),
  productFromApi: (item) => ({
    ...item,
    category: item.category?._id || item.category || "",
    categoryName: item.category?.name || "N/A",
    subcategory: item.subcategory?._id || item.subcategory || "",
    subcategoryName: item.subcategory?.name || "N/A",
    images: imageListToString(item.images),
    shortDescription: item.description?.short || "",
    longDescription: item.description?.long || "",
    tags: (item.tags || []).join(", "),
    colors: (item.attributes?.color || []).join(", "),
    sizes: (item.attributes?.size || []).join(", "),
    material: item.attributes?.material || "",
  }),
  productToApi: (form) => ({
    name: form.name,
    slug: form.slug,
    sku: form.sku || undefined,
    category: form.category,
    subcategory: form.subcategory,
    price: Number(form.price || 0),
    salePrice: form.salePrice ? Number(form.salePrice) : null,
    stock: Number(form.stock || 0),
    images: splitList(form.images).map((url) => ({ url, altText: form.name })),
    description: {
      short: form.shortDescription,
      long: form.longDescription,
    },
    tags: splitList(form.tags),
    attributes: {
      color: splitList(form.colors),
      size: splitList(form.sizes),
      material: form.material,
    },
    isActive: true,
  }),
};

export const renderImageCell = (src, alt = "") =>
  src ? (
    <span className="admin-image-cell">
      <img src={getPublicUrl(src)} alt={alt} />
    </span>
  ) : (
    <span className="admin-image-cell admin-image-cell--empty">
      <FiImage />
    </span>
  );

export { textFromDescription };
