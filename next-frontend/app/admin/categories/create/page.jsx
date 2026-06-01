"use client";

import Link from "next/link";
import AdminPageShell from "../../../../components/AdminPageShell";
import AdminResourceManager, { categoryFields, resourceNormalizers } from "../../../../components/AdminResourceManager";

export default function AdminCategoriesCreatePage() {
  return (
    <AdminPageShell>
      <div className="admin-page-head">
        <div>
          <p className="admin-kicker">Create category</p>
          <h1>New PrintKee category</h1>
          <p>Use this page to add a new category for the public PrintKee catalog.</p>
        </div>
        <Link href="/admin/categories" className="admin-btn admin-btn--ghost">
          Back to categories
        </Link>
      </div>

      <AdminResourceManager
        title="Create category"
        kicker="Category creation"
        description="Add or edit a category with a slug, image, description, and SEO metadata."
        badge="Backend create"
        resourceName="category"
        resourceLabel="Category"
        endpoints={{
          create: "/category/create",
          update: "/category/update",
          delete: "/category/delete",
          list: "/category/all",
        }}
        fields={categoryFields}
        normalizeFromApi={resourceNormalizers.categoryFromApi}
        normalizeToApi={resourceNormalizers.categoryToApi}
        showTable={false}
        showToolbar={false}
        createLabel="Save category"
      />
    </AdminPageShell>
  );
}
