"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowRight, FiCheckCircle, FiPackage, FiShield, FiTruck } from "react-icons/fi";
import { useParams } from "next/navigation";
import { api, getPublicUrl } from "../../../lib/api";
import {
  catalogProofPoints,
  getSubcategoryBannerImage,
  getSubcategoryCopy,
} from "../../../lib/catalogPageContent";
import ProductGrid from "../../../components/ProductGrid";

const subcategoryStats = [
  { icon: FiShield, label: "Quality", value: "Premium finish" },
  { icon: FiPackage, label: "Branding", value: "Logo ready" },
  { icon: FiTruck, label: "Delivery", value: "Pan-India" },
];

const resolveImage = (path, fallback = "/assets/banner3.webp") => {
  if (!path) return fallback;
  if (path.startsWith("/assets/")) return path;
  return getPublicUrl(path);
};

export default function SubcategoryPage() {
  const params = useParams();
  const [subcategory, setSubcategory] = useState(null);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!params?.category || !params?.subcategory) return;
    api
      .get(`/subcategory/subcategory-fetch/${params.category}/${params.subcategory}`)
      .then((res) => {
        setSubcategory(res.data.subcategory);
        setCategory(res.data.category);
        setProducts(res.data.products || []);
      })
      .catch(console.error);
  }, [params]);

  if (!subcategory) {
    return <div className="catalog-loading">Loading subcategory...</div>;
  }

  const categoryName = category?.name || params.category.replace(/-/g, " ");
  const copy = getSubcategoryCopy(subcategory, categoryName);
  const heroImage = getSubcategoryBannerImage(params.category);

  return (
    <main className="catalog-page">
      <section className="catalog-hero catalog-hero--subcat">
        <div className="catalog-hero__media" style={{ backgroundImage: `url(${resolveImage(heroImage)})` }} />
        <div className="catalog-hero__shade" />
        <div className="container catalog-hero__inner">
          <div className="catalog-hero__copy">
            <div className="catalog-breadcrumbs">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href={`/${params.category}`}>{categoryName}</Link>
              <span>/</span>
              <span>{subcategory.name}</span>
            </div>
            <p className="catalog-kicker">{copy.eyebrow}</p>
            <h1>{copy.headline}</h1>
            <p>{copy.intro}</p>
            <div className="catalog-actions">
              <Link href="/contact" className="catalog-btn catalog-btn--primary">
                Request a sample <FiArrowRight aria-hidden="true" />
              </Link>
              <Link href="#products" className="catalog-btn catalog-btn--ghost">
                View products
              </Link>
            </div>
          </div>
          <div className="catalog-hero__panel">
            <span>Range details</span>
            <strong>{products.length || "Curated"} products</strong>
            <p>{copy.location}</p>
            <div>
              <small>Logo printing</small>
              <small>Bulk pricing</small>
              <small>Sample support</small>
            </div>
          </div>
        </div>
      </section>

      <section className="catalog-band">
        <div className="container catalog-stat-row">
          {subcategoryStats.map((stat) => {
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

      <section id="products" className="catalog-section">
        <div className="container">
          <div className="catalog-section__head catalog-section__head--split">
            <div>
              <p className="catalog-kicker">Products</p>
              <h2>{products.length || "Premium"} {subcategory.name} options</h2>
            </div>
            <p>Every product in this range connects to its detail page and is selected for custom branding, packaging, and dependable order fulfillment.</p>
          </div>
          {products.length ? (
            <ProductGrid products={products} categorySlug={params.category} subcategorySlug={params.subcategory} />
          ) : (
            <div className="catalog-empty">
              <p>No products are available in this subcategory right now. Please contact our team for curated options and custom support.</p>
            </div>
          )}
        </div>
      </section>

      <section className="catalog-section catalog-section--warm">
        <div className="container catalog-proof">
          <div>
            <p className="catalog-kicker">Why choose this range?</p>
            <h2>{copy.whyTitle}</h2>
            <p>{copy.location}</p>
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
            <p className="catalog-kicker">Need help selecting?</p>
            <h2>Our specialists can recommend the best product and finish for your order.</h2>
          </div>
          <Link href="/contact" className="catalog-btn catalog-btn--dark">
            Speak with an expert <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
