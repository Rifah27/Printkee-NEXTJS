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

const emptySeo = { metaTitle: "", metaDescription: "", keywords: "" };
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
  seedItems = [],
  fallbackItems = emptyItems,
  localStorageKey,
  createLabel,
  showEditor = true,
  showTable = true,
  showToolbar = true,
  createLink,
  pageSize,
}) {
  const blankForm = useMemo(() => {
    return fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue ?? "";
      return acc;
    }, {});
  }, [fields]);

  const [items, setItems] = useState(() => (seedItems.length ? seedItems : fallbackItems));
  const [form, setForm] = useState(blankForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(Boolean(endpoints?.list));
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const endpointKey = useMemo(() => JSON.stringify(endpoints || {}), [endpoints]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const loadItems = useCallback(async () => {
    if (localStorageKey) {
      const saved = window.localStorage.getItem(localStorageKey);
      setItems(saved ? JSON.parse(saved) : seedItems);
      setLoading(false);
      return;
    }

    if (!endpoints?.list) return;

    setLoading(true);
    try {
      // Merge provided params with current pagination/search
      const pageParam = currentPage || (endpoints.params && endpoints.params.page) || 1;
      const limitParam = pageSize || (endpoints.params && endpoints.params.limit) || 10;
      const params = { ...(endpoints.params || {}), page: pageParam, limit: limitParam };
      if (debouncedQuery) params.search = debouncedQuery;

      const res = await api.get(endpoints.list, {
        headers: authHeader(),
        params,
      });

      const rawItems = Array.isArray(res.data) ? res.data : res.data.items || [];
      const nextItems = normalizeFromApi ? rawItems.map(normalizeFromApi) : rawItems;

      // If API returns pagination metadata, use it
      const respTotal = res.data?.totalItems ?? (Array.isArray(res.data) ? rawItems.length : 0);
      const respPages = res.data?.totalPages ?? Math.max(1, Math.ceil(respTotal / limitParam));

      setItems(nextItems.length ? nextItems : fallbackItems);
      setTotalItems(respTotal);
      setTotalPages(respPages);
      setMessage(null);
    } catch (err) {
      console.error(err);
      setItems(fallbackItems);
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
    resourceName,
    seedItems,
    currentPage,
    debouncedQuery,
    pageSize,
  ]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // Delay showing the loading overlay to avoid flicker on fast requests
  useEffect(() => {
    let t;
    if (loading) {
      t = setTimeout(() => setShowLoadingOverlay(true), 180);
    } else {
      setShowLoadingOverlay(false);
    }
    return () => clearTimeout(t);
  }, [loading]);

  useEffect(() => {
    setForm(blankForm);
  }, [blankForm]);

  const persistLocalItems = (nextItems) => {
    setItems(nextItems);
    window.localStorage.setItem(localStorageKey, JSON.stringify(nextItems));
  };

  const handleChange = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(blankForm);
  };

  const handleEdit = (item) => {
    setEditingId(item._id || item.id);
    const nextForm = { ...blankForm };
    fields.forEach((field) => {
      nextForm[field.name] = field.fromItem ? field.fromItem(item) : item[field.name] ?? "";
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
        createdAt: editingId ? items.find((item) => item.id === editingId)?.createdAt : now,
      };
      const nextItems = editingId
        ? items.map((item) => (item.id === editingId ? nextItem : item))
        : [nextItem, ...items];
      persistLocalItems(nextItems);
      setMessage({ type: "success", text: `${resourceLabel} saved.` });
      resetForm();
      return;
    }

    try {
      if (editingId) {
        await api.put(`${endpoints.update}/${editingId}`, payload, { headers: authHeader() });
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
        text: err.response?.data?.message || `${resourceLabel} could not be saved.`,
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete this ${resourceName}?`)) return;

    if (localStorageKey) {
      persistLocalItems(items.filter((item) => item.id !== id));
      setMessage({ type: "success", text: `${resourceLabel} deleted.` });
      return;
    }

    try {
      await api.delete(`${endpoints.delete}/${id}`, { headers: authHeader() });
      setMessage({ type: "success", text: `${resourceLabel} deleted.` });
      loadItems();
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: `${resourceLabel} could not be deleted.` });
    }
  };

  // Server-side pagination: items are already paginated by the API
  const paginatedItems = items;
  const pageCount = totalPages || 1;
  const showPagination = showTable && pageCount > 1;

  // Reset to first page when query/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery]);

  // Debounce query input to avoid refetching on every keystroke
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Re-load items when page or debounced query changes
  useEffect(() => {
    loadItems();
  }, [loadItems]);

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
              <h2>{editingId ? `Update ${resourceName}` : createLabel || `Add ${resourceName}`}</h2>
            </div>
            {editingId && (
              <button type="button" className="admin-btn admin-btn--ghost" onClick={resetForm}>
                <FiX />
                Cancel
              </button>
            )}
          </div>

        <div className="admin-form-grid">
          {fields.map((field) => (
            <label
              key={field.name}
              className={field.type === "textarea" || field.wide ? "admin-field admin-field--wide" : "admin-field"}
            >
              <span>{field.label}</span>
              {field.type === "select" ? (
                <select
                  value={form[field.name] ?? ""}
                  onChange={(event) => handleChange(field.name, event.target.value)}
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
                  onChange={(event) => handleChange(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              ) : (
                <input
                  type={field.type || "text"}
                  value={form[field.name] ?? ""}
                  onChange={(event) => handleChange(field.name, event.target.value)}
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
          <button type="button" className="admin-btn admin-btn--ghost" onClick={loadItems}>
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
          <span>{totalItems} total • {paginatedItems.length} shown</span>
        </div>
      )}

      {showTable && (
        <div className="admin-table-section">
          <div className={`admin-table-wrap ${loading ? "admin-table-wrap--loading" : ""}`}>
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
                      <td key={column.key}>{column.render ? column.render(item) : item[column.key] || "-"}</td>
                    ))}
                    <td>
                      <div className="admin-row-actions">
                        <button type="button" onClick={() => handleEdit(item)} title="Edit">
                          <FiEdit3 />
                        </button>
                        <button type="button" onClick={() => handleDelete(item._id || item.id)} title="Delete">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!paginatedItems.length && (
                  <tr>
                    <td colSpan={columns.length + 1}>
                      <div className="admin-empty">No {resourceName}s found.</div>
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
  { name: "name", label: "Category name", required: true, placeholder: "Apparel and Accessories" },
  { name: "slug", label: "Slug", required: true, placeholder: "apparel-and-accessories" },
  { name: "image", label: "Image URL", wide: true, placeholder: "/assets/categories/apparel.webp" },
  { name: "description", label: "Description", type: "textarea", placeholder: "Short admin-facing category description" },
  { name: "metaTitle", label: "SEO title", placeholder: "Custom Apparel & Accessories" },
  { name: "keywords", label: "SEO keywords", placeholder: "custom apparel, corporate gifting" },
  { name: "metaDescription", label: "SEO description", type: "textarea" },
];

export const subcategoryFields = [
  { name: "name", label: "Subcategory name", required: true, placeholder: "Custom Welcome Kits" },
  { name: "slug", label: "Slug", required: true, placeholder: "welcome-kits" },
  { name: "category", label: "Parent category", type: "select", optionsKey: "categories", required: true },
  { name: "image", label: "Image URL", wide: true, placeholder: "/assets/subcategories/box.webp" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "metaTitle", label: "SEO title", placeholder: "Custom Welcome Kits for Corporate Onboarding" },
  { name: "keywords", label: "SEO keywords", placeholder: "welcome kits, onboarding gifts" },
  { name: "metaDescription", label: "SEO description", type: "textarea" },
];

export const productFields = [
  { name: "name", label: "Product name", required: true, placeholder: "Premium Corporate Gift Mug" },
  { name: "slug", label: "Slug", required: true, placeholder: "premium-corporate-gift-mug" },
  { name: "sku", label: "SKU", placeholder: "PK-MUG-001" },
  { name: "category", label: "Category", type: "select", optionsKey: "categories", required: true },
  { name: "subcategory", label: "Subcategory", type: "select", optionsKey: "subcategories", required: true },
  { name: "price", label: "Price", type: "number", required: true, min: "0" },
  { name: "salePrice", label: "Sale price", type: "number", min: "0" },
  { name: "stock", label: "Stock", type: "number", min: "0" },
  { name: "images", label: "Image URLs", wide: true, placeholder: "/assets/products/coffee-mug/1.webp, /assets/products/coffee-mug/2.webp" },
  { name: "shortDescription", label: "Short description", type: "textarea" },
  { name: "longDescription", label: "Long description", type: "textarea" },
  { name: "tags", label: "Tags", placeholder: "corporate gifts, logo printing, bulk order" },
  { name: "colors", label: "Colors", placeholder: "Black, White, Navy" },
  { name: "sizes", label: "Sizes", placeholder: "S, M, L, XL" },
  { name: "material", label: "Material", placeholder: "Cotton blend" },
];

export const bannerFields = [
  { name: "title", label: "Banner title", required: true, placeholder: "Premium Corporate Gifting" },
  { name: "section", label: "Section", required: true, placeholder: "Homepage hero" },
  { name: "image", label: "Image URL", wide: true, placeholder: "/assets/banner1.webp" },
  { name: "cta", label: "Button label", placeholder: "Explore gifts" },
  { name: "href", label: "Button link", placeholder: "/collection/welcome-kits" },
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
