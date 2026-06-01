"use client";

import AdminPageShell from "../../../components/AdminPageShell";
import AdminResourceManager, {
  bannerFields,
  renderImageCell,
  textFromDescription,
} from "../../../components/AdminResourceManager";

const initialBanners = [
  {
    id: "homepage-hero",
    title: "Premium Corporate Gifting & Custom Branding",
    section: "Homepage hero",
    description:
      "Customized promotional products, branded merchandise, and bulk gifting support across Delhi NCR and India.",
    image: "/assets/banner1.webp",
    cta: "Explore gifts",
    href: "/collection/welcome-kits",
  },
  {
    id: "custom-apparel",
    title: "Customized Corporate Apparel",
    section: "Category spotlight",
    description:
      "Premium shirts, jackets, uniforms, t-shirts, caps, and accessories personalized with company logos.",
    image: "/assets/banner2.webp",
    cta: "View apparel",
    href: "/apparel-and-accessories",
  },
  {
    id: "eco-tech-drinkware",
    title: "Eco, Tech & Drinkware Collections",
    section: "Promotional strip",
    description:
      "Sustainable cork gifts, smart tech products, stainless steel bottles, mugs, bags, and office essentials.",
    image: "/assets/banner3.webp",
    cta: "Browse catalog",
    href: "/eco-products",
  },
];

export default function AdminBannersPage() {
  return (
    <AdminPageShell>
      <AdminResourceManager
        title="Banner studio"
        kicker="Banners"
        description="Plan homepage and campaign banners for corporate gifting, apparel, eco products, technology, drinkware, bags, and office collections."
        badge="Local preview data"
        resourceName="banner"
        resourceLabel="Banner"
        fields={bannerFields}
        columns={[
          { key: "image", label: "Visual", render: (item) => renderImageCell(item.image, item.title) },
          { key: "title", label: "Title" },
          { key: "section", label: "Section" },
          { key: "description", label: "Copy", render: (item) => textFromDescription(item.description).slice(0, 120) || "-" },
          { key: "href", label: "Link" },
        ]}
        seedItems={initialBanners}
        localStorageKey="printkee-admin-banners"
        createLabel="Save banner"
      />
    </AdminPageShell>
  );
}
