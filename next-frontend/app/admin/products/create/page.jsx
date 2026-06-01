"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminPageShell from "../../../../components/AdminPageShell";
import AdminResourceManager, {
  productFields,
  resourceNormalizers,
} from "../../../../components/AdminResourceManager";
import { api, authHeader } from "../../../../lib/api";
import {
  fallbackCategories,
  fallbackSubcategories,
} from "../../../../lib/adminFallbackData";

export default function AdminProductsCreatePage() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get("/category/all", { headers: authHeader() }),
      api.get("/subcategory/all", { headers: authHeader() }),
    ])
      .then(([categoryRes, subcategoryRes]) => {
        setCategories(categoryRes.data?.length ? categoryRes.data : fallbackCategories);
        setSubcategories(
          subcategoryRes.data?.length ? subcategoryRes.data : fallbackSubcategories
        );
      })
      .catch(() => {
        setCategories(fallbackCategories);
        setSubcategories(fallbackSubcategories);
      });
  }, []);

  return (
    <AdminPageShell>
      <div className="admin-page-head">
        <div>
          <p className="admin-kicker">Create product</p>
          <h1>New PrintKee product</h1>
          <p>Use this page to add a product with category, subcategory, images, pricing and attributes.</p>
        </div>
        <Link href="/admin/products" className="admin-btn admin-btn--ghost">
          Back to products
        </Link>
      </div>

      <AdminResourceManager
        title="Create product"
        kicker="Product creation"
        description="Add a new product and assign it to the right category and subcategory."
        badge="Backend create"
        resourceName="product"
        resourceLabel="Product"
        endpoints={{
          create: "/product/create",
          update: "/product/update",
          delete: "/product/delete",
          list: "/product/all",
          params: { page: 1, limit: 10 },
        }}
        fields={productFields}
        normalizeFromApi={resourceNormalizers.productFromApi}
        normalizeToApi={resourceNormalizers.productToApi}
        dependencies={{ categories, subcategories }}
        showTable={false}
        showToolbar={false}
        createLabel="Save product"
      />
    </AdminPageShell>
  );
}
