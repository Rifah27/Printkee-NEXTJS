"use client";

import { useEffect, useState } from "react";
import AdminPageShell from "../../../components/AdminPageShell";
import AdminResourceManager, {
  renderImageCell,
  resourceNormalizers,
  subcategoryFields,
  textFromDescription,
} from "../../../components/AdminResourceManager";
import { api, authHeader } from "../../../lib/api";
import { fallbackCategories, fallbackSubcategories } from "../../../lib/adminFallbackData";

export default function AdminSubcategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .get("/category/all", { headers: authHeader() })
      .then((res) => setCategories(res.data?.length ? res.data : fallbackCategories))
      .catch(() => setCategories(fallbackCategories));
  }, []);

  return (
    <AdminPageShell>
      <AdminResourceManager
        title="Manage subcategories"
        kicker="Subcategories"
        description="Browse and edit PrintKee subcategories. Use the create subcategory page for new product groups."
        badge="Backend CRUD"
        resourceName="subcategory"
        resourceLabel="Subcategory"
        endpoints={{
          list: "/subcategory/all",
          create: "/subcategory/create",
          update: "/subcategory/update",
          delete: "/subcategory/delete",
        }}
        fields={subcategoryFields}
        columns={[
          { key: "image", label: "Image", render: (item) => renderImageCell(item.image, item.name) },
          { key: "name", label: "Name" },
          { key: "categoryName", label: "Category" },
          { key: "slug", label: "Slug", render: (item) => `/${item.slug}` },
          { key: "description", label: "Description", render: (item) => textFromDescription(item.description).slice(0, 120) || "-" },
        ]}
        normalizeFromApi={resourceNormalizers.subcategoryFromApi}
        normalizeToApi={resourceNormalizers.subcategoryToApi}
        fallbackItems={fallbackSubcategories}
        dependencies={{ categories }}
        showEditor={false}
        showToolbar={true}
        pageSize={10}
        createLink="/admin/subcategories/create"
        createLabel="Create subcategory"
      />
    </AdminPageShell>
  );
}
