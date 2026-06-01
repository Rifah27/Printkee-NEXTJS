"use client";

import AdminMenu from "./AdminMenu";
import ProtectedAdmin from "./ProtectedAdmin";

export default function AdminPageShell({ children }) {
  return (
    <ProtectedAdmin>
      <main className="admin-shell">
        <div className="container admin-layout">
          <AdminMenu />
          <section className="admin-main-panel">{children}</section>
        </div>
      </main>
    </ProtectedAdmin>
  );
}
