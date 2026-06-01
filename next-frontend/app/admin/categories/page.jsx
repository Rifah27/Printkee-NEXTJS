"use client";

import AdminPageShell from "../../../components/AdminPageShell";
import AdminResourceManager, {
  categoryFields,
  renderImageCell,
  resourceNormalizers,
  textFromDescription,
} from "../../../components/AdminResourceManager";
import { fallbackCategories } from "../../../lib/adminFallbackData";

export default function AdminCategoriesPage() {
  return (
    <AdminPageShell>
      <AdminResourceManager
        title="Manage categories"
        kicker="Categories"
        description="Browse and edit main PrintKee categories. Use the create category page for new sections."
        badge="Backend CRUD"
        resourceName="category"
        resourceLabel="Category"
        endpoints={{
          list: "/category/all",
          create: "/category/create",
          update: "/category/update",
          delete: "/category/delete",
        }}
        fields={categoryFields}
        columns={[
          { key: "image", label: "Image", render: (item) => renderImageCell(item.image, item.name) },
          { key: "name", label: "Name" },
          { key: "slug", label: "Slug", render: (item) => `/${item.slug}` },
          { key: "description", label: "Description", render: (item) => textFromDescription(item.description).slice(0, 130) || "-" },
          { key: "subcategories", label: "Subs", render: (item) => item.subcategories?.length || 0 },
        ]}
        normalizeFromApi={resourceNormalizers.categoryFromApi}
        normalizeToApi={resourceNormalizers.categoryToApi}
        fallbackItems={fallbackCategories}
        showEditor={false}
        showToolbar={true}
        pageSize={10}
        createLink="/admin/categories/create"
        createLabel="Create category"
      />
    </AdminPageShell>
  );
}
