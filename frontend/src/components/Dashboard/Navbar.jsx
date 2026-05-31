import React from "react";
import { Search, Bell, User, LogOut } from "lucide-react";

const AdminNavbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="admin-navbar-container">
      <div className="admin-navbar-left">
        <h2 className="admin-navbar-title">Welcome!!!!</h2>
      </div>

      <div className="admin-navbar-right">
        <div className="admin-navbar-search">
          <Search className="admin-navbar-search-icon" size={18} />
          <input type="text" placeholder="Search" />
        </div>

        <div className="admin-navbar-actions">
          <div className="admin-navbar-icon-box">
            <Bell className="admin-navbar-icon" />
            <span className="admin-navbar-notif-dot"></span>
          </div>

          <div className="admin-navbar-profile">
            <User className="admin-navbar-icon" />
            <span className="admin-navbar-username">Admin</span>
          </div>

          <button className="admin-navbar-logout" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;

const css = `
.admin-navbar-container {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--ad-bg-light);
  border-bottom: 1px solid rgba(75, 32, 97, 0.18);
  padding: 14px 42px 14px 32px;
  margin-left: 30px;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.admin-navbar-left {
  display: flex;
  align-items: center;
}

.admin-navbar-title {
  color: var(--ad-primary);
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.admin-navbar-right {
  display: flex;
  align-items: center;
  gap: 22px;
}

.admin-navbar-search {
  display: flex;
  align-items: center;
  background: var(--ad-white);
  border: 1px solid rgba(75, 32, 97, 0.18);
  border-radius: 25px;
  padding: 6px 12px;
  box-shadow: var(--ad-shadow-soft);
  transition: 0.25s ease;
}

.admin-navbar-search:hover {
  border-color: var(--ad-primary);
  box-shadow: 0 3px 10px rgba(75, 32, 97, 0.2);
}

.admin-navbar-search input {
  border: none;
  outline: none;
  margin-left: 6px;
  font-size: 0.9rem;
  color: var(--ad-text-muted);
  background: transparent;
  width: 180px;
  font-family: "Outfit", sans-serif;
}

.admin-navbar-search-icon {
  color: var(--ad-primary);
}

.admin-navbar-actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

.admin-navbar-icon-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ad-white);
  border-radius: 50%;
  padding: 8px;
  border: 1px solid rgba(75, 32, 97, 0.18);
  transition: all 0.25s ease;
  cursor: pointer;
}

.admin-navbar-icon-box:hover {
  background: var(--ad-accent);
  border-color: var(--ad-accent);
}

.admin-navbar-icon-box:hover .admin-navbar-icon {
  color: var(--ad-white);
}

.admin-navbar-notif-dot {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--ad-accent);
}

.admin-navbar-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--ad-white);
  border: 1px solid rgba(75, 32, 97, 0.18);
  border-radius: 30px;
  padding: 6px 14px;
  transition: 0.3s ease;
  cursor: pointer;
}

.admin-navbar-profile:hover {
  background: var(--ad-primary);
  border-color: var(--ad-primary);
}

.admin-navbar-profile:hover .admin-navbar-icon,
.admin-navbar-profile:hover .admin-navbar-username {
  color: var(--ad-white);
}

.admin-navbar-username {
  font-size: 0.9rem;
  color: var(--ad-text-muted);
  font-weight: 500;
}

.admin-navbar-icon {
  color: var(--ad-primary);
  width: 20px;
  height: 20px;
  transition: color 0.2s ease;
}

.admin-navbar-logout {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--ad-accent);
  color: var(--ad-white);
  border: none;
  border-radius: 20px;
  padding: 8px 14px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 8px rgba(243, 156, 18, 0.35);
}

.admin-navbar-logout:hover {
  background: var(--ad-accent-light);
  transform: translateY(-2px);
  box-shadow: 0 5px 12px rgba(243, 156, 18, 0.45);
}

.admin-navbar-logout span {
  font-weight: 500;
  font-family: "Outfit", sans-serif;
}

@media (max-width: 900px) {
  .admin-navbar-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 14px 16px;
  }

  .admin-navbar-right {
    width: 100%;
    justify-content: space-between;
  }

  .admin-navbar-search input {
    width: 100px;
  }

  .admin-navbar-username,
  .admin-navbar-logout span {
    display: none;
  }
}
`;

const style = document.createElement("style");
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);
1