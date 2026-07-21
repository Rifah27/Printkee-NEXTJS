"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiCheckCircle,
  FiGlobe,
  FiPackage,
  FiShield,
  FiTruck,
  FiUsers,
} from "react-icons/fi";
import { useParams } from "next/navigation";
import { getPublicUrl } from "../../lib/api";
import {
  catalogProofPoints,
  getCategoryBannerImage,
  getCategoryCopy,
} from "../../lib/catalogPageContent";
import CategoryCard from "../../components/CategoryCard";
import BrandsContent from "../../components/BrandsContent";

const staticRouteContent = {
  brands: BrandsContent,
};

const categoryFeatures = [
  {
    icon: FiShield,
    title: "Premium finishing",
    description:
      "Products are selected for strong materials, neat branding, and a polished corporate look.",
  },
  {
    icon: FiPackage,
    title: "Packaging support",
    description:
      "Add custom sleeves, labels, boxes, or kit-style packing for events and employee gifting.",
  },
  {
    icon: FiTruck,
    title: "Pan-India delivery",
    description:
      "Plan bulk dispatches for Delhi NCR, Noida, Gurgaon, Okhla, and nationwide campaigns.",
  },
];

const categoryStats = [
  { icon: FiUsers, label: "Happy clients", value: "1000+" },
  { icon: FiGlobe, label: "Shipping", value: "Pan-India" },
  { icon: FiCheckCircle, label: "Branding", value: "Logo ready" },
];

const resolveImage = (path, fallback = "/assets/banner1.webp") => {
  if (!path) return fallback;
  if (path.startsWith("/assets/")) return path;
  return getPublicUrl(path);
};

export default function CategoryPage({ initialCategory }) {
  const params = useParams();
  const category = initialCategory;
  const staticRoute = params?.category ? staticRouteContent[params.category] : null;

  if (staticRoute) {
    const StaticRoute = staticRoute;
    return <StaticRoute />;
  }

  if (!category) {
    return <div className="catalog-loading">Loading category...</div>;
  }

  const copy = getCategoryCopy(category);
  const subcategories = category.subcategories || [];
  const heroImage = getCategoryBannerImage(category);

  return (
    <main className="catalog-page">
      <section className="catalog-hero">
        <div className="catalog-hero__media" style={{ backgroundImage: `url(${resolveImage(heroImage)})` }} />
        <div className="catalog-hero__shade" />
        <div className="container catalog-hero__inner">
          <div className="catalog-hero__copy">
            <div className="catalog-breadcrumbs">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>{category.name}</span>
            </div>
            <p className="catalog-kicker">{copy.eyebrow}</p>
            <h1>{copy.headline}</h1>
            <p>{copy.intro}</p>
            <div className="catalog-actions">
              <Link href="/contact" className="catalog-btn catalog-btn--primary">
                Request a quote <FiArrowRight aria-hidden="true" />
              </Link>
              <Link href="#subcategories" className="catalog-btn catalog-btn--ghost">
                Explore ranges
              </Link>
            </div>
          </div>
          <div className="catalog-hero__panel">
            <span>Category guide</span>
            <strong>{subcategories.length || "Curated"} product ranges</strong>
            <p>Built for gifting, promotional branding, onboarding kits, and events.</p>
            <div>
              {copy.useCases.map((item) => (
                <small key={item}>{item}</small>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="catalog-band">
        <div className="container catalog-stat-row">
          {categoryStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <article key={stat.label}>
                <Icon aria-hidden="true" />
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            );
          })}
        </div>
      </section>

      <section id="subcategories" className="catalog-section">
        <div className="container">
          <div className="catalog-section__head">
            <p className="catalog-kicker">All subcategories</p>
            <h2>Choose the range that fits your campaign</h2>
            <p>Each collection is ready for custom logos, bulk pricing, and coordinated delivery support.</p>
          </div>
          {subcategories.length ? (
            <div className="catalog-category-grid">
              {subcategories.map((sub) => (
                <CategoryCard key={sub._id || sub.slug} category={{ ...sub, slug: `${category.slug}/${sub.slug}` }} />
              ))}
            </div>
          ) : (
            <div className="catalog-empty">No subcategories are available yet. Contact us for a curated quote.</div>
          )}
        </div>
      </section>

      <section className="catalog-section catalog-section--warm">
        <div className="container">
          <div className="catalog-section__head catalog-section__head--split">
            <div>
              <p className="catalog-kicker">Why Vorixa</p>
              <h2>Corporate gifting that looks organized from first sample to final dispatch</h2>
            </div>
            <p>Use the same dependable workflow whether you are ordering apparel, tech gifts, drinkware, office kits, or sustainable merchandise.</p>
          </div>
          <div className="catalog-feature-grid">
            {categoryFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title}>
                  <Icon aria-hidden="true" />
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="catalog-section">
        <div className="container catalog-proof">
          <div>
            <p className="catalog-kicker">Popular product promise</p>
            <h2>Designed for brand recall, everyday use, and smooth bulk execution.</h2>
          </div>
          <ul>
            {catalogProofPoints.map((point) => (
              <li key={point}><FiCheckCircle aria-hidden="true" /> {point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="catalog-cta">
        <div className="container catalog-cta__inner">
          <div>
            <p className="catalog-kicker">Need bespoke guidance?</p>
            <h2>Our team can help select finishes, packaging, and delivery for your order.</h2>
          </div>
          <Link href="/contact" className="catalog-btn catalog-btn--dark">
            Talk to an expert <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
