"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiBox,
  FiCheckCircle,
  FiGrid,
  FiLayers,
  FiPackage,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import AdminPageShell from "../../components/AdminPageShell";
import { api, authHeader } from "../../lib/api";
import {
  fallbackCategories,
  fallbackProducts,
  fallbackSubcategories,
} from "../../lib/adminFallbackData";

const statCards = [
  { key: "products", label: "Products", icon: FiBox },
  { key: "categories", label: "Categories", icon: FiGrid },
  { key: "subcategories", label: "Subcategories", icon: FiLayers },
  { key: "visitors", label: "Visitors", icon: FiUsers },
];

const catalogFocus = [
  "Apparel & uniforms",
  "Eco-friendly gifts",
  "Smart tech accessories",
  "Drinkware & mugs",
  "Bags, office & writing",
  "Welcome kits & keychains",
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    products: fallbackProducts.length,
    categories: fallbackCategories.length,
    subcategories: fallbackSubcategories.length,
    visitors: 0,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/admin/stats", { headers: authHeader() })
      .then((res) => {
        setStats(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load live backend stats.");
      });
  }, []);

  return (
    <AdminPageShell>
      <div className="admin-page-head">
        <div>
          <p className="admin-kicker">Dashboard</p>
          <h1>Vorixa admin console</h1>
          <p>
            Manage the full Vorixa catalog, update product listings, categories,
            subcategories, and campaign banners from one minimal dashboard.
          </p>
        </div>

        <div className="admin-page-head__badge">
          <FiTrendingUp aria-hidden="true" />
          Live backend data
        </div>
      </div>

      {error && <p className="admin-alert admin-alert--error">{error}</p>}

      <div className="admin-stat-grid">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <article key={card.key}>
              <Icon aria-hidden="true" />
              <span>{card.label}</span>
              <strong>{stats?.[card.key] ?? "-"}</strong>
            </article>
          );
        })}
      </div>

      <div className="admin-dashboard-hero">
        <div>
          <p className="admin-kicker">Vorixa positioning</p>

          <h2>
            Premium corporate gifting, custom merchandise, and branded products
            across India.
          </h2>

          <p>
            The admin sections now cover the same public catalog pillars:
            apparel, eco products, technology, drinkware, bags, office
            essentials, welcome kits, and event-ready promotional products.
          </p>

          <div className="admin-dashboard-hero__actions">
            <Link
              href="/admin/products"
              className="admin-btn admin-btn--primary"
            >
              Review products
            </Link>

            <Link
              href="/admin/categories"
              className="admin-btn admin-btn--ghost"
            >
              Manage categories
            </Link>
          </div>
        </div>

        <div className="admin-dashboard-hero__card">
          <FiPackage aria-hidden="true" />
          <strong>Built for bulk orders</strong>
          <span>
            Logo printing, employee gifting, onboarding kits, event giveaways,
            and fast catalog updates.
          </span>
        </div>
      </div>

      <div className="admin-insight-grid">
        <article>
          <p className="admin-kicker">Catalog health</p>
          <h2>Keep every range clean, visual, and route-ready.</h2>
          <p>
            Use the admin pages to maintain gifting categories, subcategory
            routes, product prices, images, descriptions, and campaign banners.
          </p>
        </article>

        <article>
          <p className="admin-kicker">Working checklist</p>
          <ul>
            <li>Review newly added products for image quality.</li>
            <li>Keep slugs aligned with customer-facing routes.</li>
            <li>Update banners before seasonal or corporate campaigns.</li>
          </ul>
        </article>
      </div>

      <div className="admin-focus-grid">
        {catalogFocus.map((item) => (
          <article key={item}>
            <FiCheckCircle aria-hidden="true" />
            <span>{item}</span>
          </article>
        ))}
      </div>
    </AdminPageShell>
  );
}