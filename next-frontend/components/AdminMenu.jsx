"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiBox,
  FiDatabase,
  FiGrid,
  FiHome,
  FiImage,
  FiLayers,
  FiLogOut,
  FiShield,
} from "react-icons/fi";

const sections = [
  {
    label: "Workspace",
    items: [{ href: "/admin", label: "Dashboard", icon: FiHome }],
  },
  {
    label: "Catalog",
    items: [
      { href: "/admin/products", label: "Products", icon: FiBox, meta: "Database" },
      { href: "/admin/categories", label: "Categories", icon: FiGrid },
      { href: "/admin/subcategories", label: "Subcategories", icon: FiLayers },
    ],
  },
  {
    label: "Content",
    items: [{ href: "/admin/banners", label: "Banners", icon: FiImage }],
  },
];

export default function AdminMenu() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    window.localStorage.removeItem("vorixa-admin-token");
    window.localStorage.removeItem("adminToken");
    router.replace("/login");
  };

  return (
    <aside className="admin-menu">
      <Link href="/admin" className="admin-menu__brand">
        <span className="admin-menu__logo">
          <img src="/assets/vorixaLogo.png" alt="Vorixa" />
        </span>
        <span>
          <strong>Vorixa</strong>
          <small>Catalog Admin</small>
        </span>
      </Link>

      <div className="admin-menu__status">
        <FiDatabase aria-hidden="true" />
        <span>
          <strong>Live database</strong>
          <small>Products sync through backend APIs</small>
        </span>
      </div>

      <nav className="admin-menu__nav" aria-label="Admin navigation">
        {sections.map((section) => (
          <div className="admin-menu__section" key={section.label}>
            <span className="admin-menu__section-label">{section.label}</span>
            {section.items.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(`${item.href}/`));

              return (
                <Link key={item.href} href={item.href} className={active ? "is-active" : ""}>
                  <Icon aria-hidden="true" />
                  <span>{item.label}</span>
                  {item.meta && <small>{item.meta}</small>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="admin-menu__guard">
        <FiShield aria-hidden="true" />
        <span>Protected admin session</span>
      </div>

      <button type="button" onClick={handleLogout} className="admin-menu__logout">
        <FiLogOut aria-hidden="true" />
        Sign out
      </button>
    </aside>
  );
}
