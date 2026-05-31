import React, { useEffect, useState } from "react";
import axios from "axios";
import { Package, Layers, Eye, Image } from "lucide-react";

const Overview = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    visitors: 0,
    subcategories: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/stats`
        );
        setStats(res.data);
      } catch (error) {
        console.log("Error fetching stats", error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      label: "Total Products",
      value: stats.products,
      icon: <Package />,
      color: "var(--ad-primary)",
    },
    {
      label: "Categories",
      value: stats.categories,
      icon: <Layers />,
      color: "var(--ad-accent)",
    },
    {
      label: "Total Visitors",
      value: stats.visitors,
      icon: <Eye />,
      color: "#7c3aed",
    },
    {
      label: "Total Subcategories",
      value: stats.subcategories,
      icon: <Image />,
      color: "#0f766e",
    },
  ];

  return (
    <div className="overview-section">
      <div className="overview-header">
        <h2>Welcome back, Admin</h2>
        <p>Here’s a quick look at your site’s management.</p>
      </div>

      <div className="overview-grid">
        {cards.map((item, index) => (
          <div key={index} className="overview-card-4">
            <div
              className="overview-icon-4"
              style={{
                background: `${item.color}22`,
                color: item.color,
              }}
            >
              {item.icon}
            </div>

            <div className="overview-info">
              <h3 className="info1">{item.value}</h3>
              <p className="info2">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;

const css = `

:root {
  --ad-primary: #5b2d8b;        /* Purple */
  --ad-primary-dark: #4a2374;
  --ad-accent: #d4af37;         /* Gold */
  --ad-accent-dark: #b8962e;

  --ad-text-dark: #1f2937;
  --ad-text-muted: #6b7280;

  --ad-glass-bg: rgba(255, 255, 255, 0.75);
  --ad-glass-border: rgba(91, 45, 139, 0.18);

  --ad-shadow-soft: 0 8px 30px rgba(91, 45, 139, 0.12);
  --ad-shadow-hover: 0 14px 40px rgba(91, 45, 139, 0.2);
}

/* ===============================
   OVERVIEW SECTION
================================ */

.overview-section {
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
  max-width: 100%;
}

/* ===============================
   HEADER
================================ */

.overview-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.overview-header h2 {
  color: var(--ad-primary);
  font-size: 1.9rem;
  font-weight: 700;
}

.overview-header p {
  color: var(--ad-text-muted);
  font-size: 1rem;
  max-width: 520px;
}

/* ===============================
   GRID LAYOUT
================================ */

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 22px;
  width: 100%;
}

/* ===============================
   CARD
================================ */

.overview-card-4 {
  display: flex;
  align-items: center;
  gap: 16px;

  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9),
    rgba(248, 246, 252, 0.85)
  );

  border: 1px solid var(--ad-glass-border);
  backdrop-filter: blur(14px);
  box-shadow: var(--ad-shadow-soft);
  padding: 22px;
  border-radius: 18px;

  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.overview-card-4:hover {
  transform: translateY(-4px);
  box-shadow: var(--ad-shadow-hover);
}

/* ===============================
   ICON
================================ */

.overview-icon-4 {
  width: 52px;
  height: 52px;
  border-radius: 14px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 22px;
  flex-shrink: 0;
}

/* ===============================
   INFO
================================ */

.overview-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info1 {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--ad-text-dark);
  
}

.info2 {
  font-size: 0.95rem;
  color: var(--ad-text-muted);
}

`;

const style = document.createElement("style");
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);
