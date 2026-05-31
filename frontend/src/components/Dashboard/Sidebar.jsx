import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Image,
  Layers,
  Package,
  ShoppingBag,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <NavLink to="/" end style={{ display: "inline-block" }}>
          <img
            src="/assets/printkeeLogo.webp"
            alt="Logo"
            className="admin-sidebar-logo"
            style={{
              width: 180,
              height: 80,
              objectFit: "contain",
              borderRadius: 6,
              display: "flex",
              justifyContent: "center",
            }}
          />
        </NavLink>
      </div>

      <ul className="admin-sidebar-menu">
        <li>
          <NavLink to="/admin" end>
            <LayoutDashboard className="icon-3" />
            <span>Dashboard</span>
          </NavLink>
        </li>

        {/* <li>
          <NavLink to="/admin/banners">
            <Image className="icon" />
            <span>Hero Banners</span>
          </NavLink>
        </li> */}

        <li>
          <NavLink to="/admin/categories">
            <Layers className="icon-3" />
            <span>Categories</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/subcategories">
            <Package className="icon-3" />
            <span>Subcategories</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/products">
            <ShoppingBag className="icon-3" />
            <span>Products</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

const css = `
/* ===============================
   ROOT ADMIN VARIABLES
================================ */

:root {
  --ad-primary: #5b2d8b;
  --ad-primary-dark: #4a2374;
  --ad-accent: #d4af37;

  --ad-bg-light: #fbf3e6;
  --ad-white: #ffffff;

  --ad-text-dark: #1f2937;
  --ad-text-muted: #6b7280;
}

/* ===============================
   SIDEBAR CONTAINER
================================ */

.admin-sidebar {
  width: 260px;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  background: var(--ad-bg-light);
  font-family: "Outfit", system-ui, sans-serif;

  display: flex;
  flex-direction: column;

  padding: 25px 15px;
  border-right: 1px solid rgba(75, 32, 97, 0.18);

  overflow-y: auto;
  overflow-x: hidden;
}

/* ===============================
   HEADER / LOGO
================================ */

.admin-sidebar-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 16px;
  margin-left: 10px;
}

.admin-sidebar-logo {
  width: 180px;
  height: 80px;
  object-fit: contain;
  border-radius: 6px;
}

/* ===============================
   MENU
================================ */

.admin-sidebar-menu {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;
  margin: 0;
}

.admin-sidebar-menu li {
  display: flex;
}

/* ===============================
   LINK ITEM
================================ */

.admin-sidebar-menu a {
  display: flex;
  align-items: center;

  gap: 14px;
  width: 100%;

  padding: 12px 16px;

  text-decoration: none;
  font-size: 17px;
  font-weight: 500;
  line-height: 1;

  color: var(--ad-text-muted);
  border-radius: 12px;

  transition: background 0.25s ease, color 0.25s ease;
}

/* ===============================
   HOVER
================================ */

.admin-sidebar-menu a:hover {
  background: rgba(91, 45, 139, 0.08);
  color: var(--ad-primary);
}

/* ===============================
   ACTIVE STATE
================================ */

.admin-sidebar-menu a.active {
  background: var(--ad-primary);
  color: var(--ad-white);
}

/* ===============================
   ICONS (CRITICAL FIX)
================================ */

.admin-sidebar-menu .icon-3 {
  width: 22px;
  height: 22px;

  display: block;         /* FIXES SVG BASELINE ISSUE */
  flex-shrink: 0;

  stroke-width: 2px;
  color: var(--ad-primary);

  transition: color 0.25s ease;
}

.admin-sidebar-menu a.active .icon-3 {
  color: var(--ad-white);
}

/* ===============================
   OPTIONAL: SCROLLBAR POLISH
================================ */

.admin-sidebar::-webkit-scrollbar {
  width: 6px;
}

.admin-sidebar::-webkit-scrollbar-thumb {
  background: rgba(91, 45, 139, 0.3);
  border-radius: 10px;
}

`;

const style = document.createElement("style");
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);
