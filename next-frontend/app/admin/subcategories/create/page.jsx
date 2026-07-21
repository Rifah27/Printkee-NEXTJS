"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminPageShell from "../../../../components/AdminPageShell";
import AdminResourceManager, { subcategoryFields, resourceNormalizers } from "../../../../components/AdminResourceManager";
import { api, authHeader } from "../../../../lib/api";
import { fallbackCategories } from "../../../../lib/adminFallbackData";

export default function AdminSubcategoriesCreatePage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .get("/category/all", { headers: authHeader() })
      .then((res) => setCategories(res.data?.length ? res.data : fallbackCategories))
      .catch(() => setCategories(fallbackCategories));
  }, []);

  return (
    <AdminPageShell>
      <div className="admin-page-head">
        <div>
          <p className="admin-kicker">Create subcategory</p>
          <h1>New Vorixa subcategory</h1>
          <p>Use this page to add a subcategory that maps under a parent category.</p>
        </div>
        <Link href="/admin/subcategories" className="admin-btn admin-btn--ghost">
          Back to subcategories
        </Link>
      </div>

      <AdminResourceManager
        title="Create subcategory"
        kicker="Subcategory creation"
        description="Add a new subcategory with parent category, image, description, and SEO metadata."
        badge="Backend create"
        resourceName="subcategory"
        resourceLabel="Subcategory"
        endpoints={{
          create: "/subcategory/create",
          update: "/subcategory/update",
          delete: "/subcategory/delete",
          list: "/subcategory/all",
        }}
        fields={subcategoryFields}
        normalizeFromApi={resourceNormalizers.subcategoryFromApi}
        normalizeToApi={resourceNormalizers.subcategoryToApi}
        dependencies={{ categories }}
        showTable={false}
        showToolbar={false}
        createLabel="Save subcategory"
      />
    </AdminPageShell>
  );
}
