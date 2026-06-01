"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiBox,
  FiGrid,
  FiHome,
  FiImage,
  FiLayers,
  FiLogOut,
} from "react-icons/fi";

const items = [
  { href: "/admin", label: "Dashboard", icon: FiHome },
  { href: "/admin/banners", label: "Banners", icon: FiImage },
  { href: "/admin/categories", label: "Categories", icon: FiGrid },
  { href: "/admin/subcategories", label: "Subcategories", icon: FiLayers },
  { href: "/admin/products", label: "Products", icon: FiBox },
];

export default function AdminMenu() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    window.localStorage.removeItem("printkee-admin-token");
    window.localStorage.removeItem("adminToken");
    router.replace("/login");
  };

  return (
    <aside className="admin-menu">
      <Link href="/admin" className="admin-menu__brand">
        <img src="/assets/printkeeLogo.webp" alt="PrintKee" />
        <span>
          <strong>PrintKee</strong>
          <small>Admin Console</small>
        </span>
      </Link>

      <nav className="admin-menu__nav" aria-label="Admin navigation">
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(`${item.href}/`));

          return (
            <Link key={item.href} href={item.href} className={active ? "is-active" : ""}>
              <Icon aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button type="button" onClick={handleLogout} className="admin-menu__logout">
        <FiLogOut aria-hidden="true" />
        Sign out
      </button>
    </aside>
  );
}
