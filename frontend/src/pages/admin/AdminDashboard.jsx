import React from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import Navbar from "../../components/Dashboard/Navbar";
import Overview from "../../components/Dashboard/Overview";

import DashboardFooter from "../../components/Dashboard/DashboardFooter";

const AdminDashboard = () => {
  return (
    <div className="ad-dashboard-layout">
  <Sidebar />
  <div className="ad-main-content">
    <Navbar />
    <div className="ad-dashboard-content">
      <Overview />

      <div className="ad-dashboard-row">
        {/* cards */}
      </div>
    </div>
    <DashboardFooter className="ad-dashboard-footer" />
  </div>
</div>
  );
};

export default AdminDashboard;


const css = `
/* =====================================================
   ROOT THEME — Purple / Gold / Beige
===================================================== */

:root {
  /* Brand */
  --ad-primary: #4b2061;
  --ad-primary-dark: #3b184d;
  --ad-accent: #f39c12;
  --ad-accent-light: #f7b84b;

  /* Backgrounds */
  --ad-bg-light: #fcefdb;
  --ad-bg-main: #fff0d6;
  --ad-white: #ffffff;

  /* Text */
  --ad-text-dark: #2b2b2b;
  --ad-text-muted: #555;

  /* Glass */
  --ad-glass-bg: rgba(255, 255, 255, 0.35);
  --ad-glass-border: rgba(75, 32, 97, 0.18);

  /* Shadows */
  --ad-shadow-soft: 0 4px 16px rgba(0, 0, 0, 0.08);
  --ad-shadow-hover: 0 12px 30px rgba(0, 0, 0, 0.15);

  /* Radius */
  --ad-radius-md: 14px;
  --ad-radius-lg: 18px;

  /* Motion */
  --ad-transition: 0.3s ease;

  /* Font */
  --ad-font: "Poppins", sans-serif;
}

/* =====================================================
   LAYOUT
===================================================== */

.ad-dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    var(--ad-bg-light) 0%,
    var(--ad-bg-main) 100%
  );
  font-family: var(--ad-font);
}

.ad-main-content {
  flex-grow: 1;
  padding-left: 260px;
  display: flex;
  flex-direction: column;
  transition: padding-left var(--ad-transition);
}

/* =====================================================
   CONTENT AREA
===================================================== */

.ad-dashboard-content {
  padding: 30px 55px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  flex-grow: 1;
  background: linear-gradient(
    135deg,
    var(--ad-bg-light) 0%,
    var(--ad-bg-main) 100%
  );
}

.ad-dashboard-row {
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
}

/* =====================================================
   GLASS CARDS
===================================================== */

.ad-glass-card {
  background: var(--ad-glass-bg);
  border: 1px solid var(--ad-glass-border);
  backdrop-filter: blur(12px);
  border-radius: var(--ad-radius-lg);
  box-shadow: var(--ad-shadow-soft);
  padding: 25px;
  flex: 1;
  min-width: 300px;
  color: var(--ad-text-dark);
  transition: transform var(--ad-transition),
              box-shadow var(--ad-transition);
}

.ad-glass-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--ad-shadow-hover);
}

/* =====================================================
   BUTTONS
===================================================== */

.ad-btn-primary {
  background: var(--ad-accent);
  color: var(--ad-white);
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background var(--ad-transition),
              transform var(--ad-transition);
}

.ad-btn-primary:hover {
  background: var(--ad-accent-light);
  transform: translateY(-1px);
}

/* =====================================================
   FOOTER
===================================================== */

.ad-dashboard-footer {
  padding: 15px;
  text-align: center;
  background: var(--ad-primary);
  color: var(--ad-white);
  font-size: 0.85rem;
}

/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 992px) {
  .ad-main-content {
    padding-left: 0;
  }

  .ad-dashboard-row {
    flex-direction: column;
  }

  .ad-dashboard-content {
    padding: 24px;
  }
}

`;
const style = document.createElement('style');
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);