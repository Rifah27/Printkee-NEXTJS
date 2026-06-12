"use client";

import { useEffect, useState } from "react";
import AdminPageShell from "../../../components/AdminPageShell";
import AdminResourceManager, {
  productFields,
  renderImageCell,
  resourceNormalizers,
} from "../../../components/AdminResourceManager";
import { api, authHeader } from "../../../lib/api";
import {
  fallbackCategories,
  fallbackProducts,
  fallbackSubcategories,
} from "../../../lib/adminFallbackData";

const firstImage = (item) => {
  const raw = String(item.images || "").split(",")[0]?.trim();
  return raw || item.images?.[0]?.url || "";
};

export default function AdminProductsPage() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get("/category/all", { headers: authHeader() }),
      api.get("/subcategory/all", { headers: authHeader() }),
    ])
      .then(([categoryRes, subcategoryRes]) => {
        setCategories(categoryRes.data?.length ? categoryRes.data : fallbackCategories);
        setSubcategories(subcategoryRes.data?.length ? subcategoryRes.data : fallbackSubcategories);
      })
      .catch(() => {
        setCategories(fallbackCategories);
        setSubcategories(fallbackSubcategories);
      });
  }, []);

  return (
    <AdminPageShell>
      <AdminResourceManager
        title="Manage product catalog"
        kicker="Products"
        description="Browse, search, and edit PrintKee products. Use the create product page for new items."
        badge="Backend CRUD"
        resourceName="product"
        resourceLabel="Product"
        endpoints={{
          list: "/product/all",
          params: { page: 1, limit: 100, includeInactive: "true" },
          create: "/product/create",
          update: "/product/update",
          delete: "/product/delete",
        }}
        fields={productFields}
        columns={[
          { key: "images", label: "Image", render: (item) => renderImageCell(firstImage(item), item.name) },
          { key: "name", label: "Name" },
          { key: "categoryName", label: "Category" },
          { key: "subcategoryName", label: "Subcategory" },
          { key: "price", label: "Price", render: (item) => `Rs. ${item.salePrice || item.price || 0}` },
          { key: "stock", label: "Stock", render: (item) => item.stock ?? 0 },
        ]}
        normalizeFromApi={resourceNormalizers.productFromApi}
        normalizeToApi={resourceNormalizers.productToApi}
        fallbackItems={fallbackProducts}
        dependencies={{ categories, subcategories }}
        showEditor={false}
        createLink="/admin/products/create"
        pageSize={10}
        createLabel="Create product"
      />
    </AdminPageShell>
  );
}
