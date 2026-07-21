import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowRight, FiDownload, FiPackage } from "react-icons/fi";
import { brandRoutes, getBrandRoute } from "../../../lib/brandRoutes";
import { getBrandProducts } from "../../../lib/brandProducts";

export function generateStaticParams() {
  return brandRoutes.map((brand) => ({ brand: brand.slug }));
}

export function generateMetadata({ params }) {
  const brand = getBrandRoute(params.brand);

  if (!brand) return {};

  return {
    title: `${brand.name} Products | Corporate Gifting`,
    description: brand.description,
    keywords: brand.tags,
    alternates: {
      canonical: `https://vorixa.com/brands/${brand.slug}`,
    },
  };
}

export default function BrandDetailPage({ params }) {
  const brand = getBrandRoute(params.brand);
  const products = brand ? getBrandProducts(brand.slug) : [];

  if (!brand) notFound();

  return (
    <main className="brand-detail-page">
      <section className="brand-detail-hero">
        <div className="container brand-detail-hero__inner">
          <div className="brand-detail-hero__copy">
            <Link href="/brands" className="brand-detail-back">
              <FiArrowLeft aria-hidden="true" /> Back to Brands
            </Link>
            <p className="brands-kicker">Brand catalogue</p>
            <h1>{brand.name}</h1>
            <p>{brand.description}</p>
            <div className="brand-detail-actions">
              <Link href="/contact" className="brands-btn brands-btn--primary">
                Request catalogue <FiDownload aria-hidden="true" />
              </Link>
              <Link href="/customize" className="brands-btn brands-btn--ghost">
                Start customizing <FiArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="brand-detail-logo">
            <img src={brand.logo} alt={`${brand.name} logo`} />
          </div>
        </div>
      </section>

      <section className="brands-section">
        <div className="container brand-detail-grid">
          {["Corporate gifting", "Bulk branding", "Premium packaging"].map((item) => (
            <article key={item}>
              <FiPackage aria-hidden="true" />
              <h2>{item}</h2>
              <p>
                Share your quantity, logo, timeline, and delivery locations. The Vorixa team will
                recommend suitable {brand.name} options for your campaign.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="brands-section brand-detail-overview">
        <div className="container brand-detail-overview__inner">
          <div>
            <p className="brands-kicker">Explore this brand</p>
            <h2>{brand.name} products for corporate gifting and bulk orders</h2>
          </div>
          <div className="brand-detail-overview__stats">
            <span>{products.length}+ products available</span>
            <div>
              {brand.tags.slice(0, 4).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="brands-section brand-detail-products">
        <div className="container">
          <div className="brands-section__head">
            <p className="brands-kicker">Popular picks</p>
            <h2>Browse curated {brand.name} items for gifting campaigns.</h2>
          </div>
          <div className="brand-product-grid">
            {products.map((product) => (
              <article className="brand-product-card" key={product.slug}>
                <img src={product.image || brand.logo} alt={product.name} />
                <div className="brand-product-card__copy">
                  <span>{product.category}</span>
                  <h3>{product.name}</h3>
                  <Link href="/customize" className="brand-product-card__action">
                    Customize now <FiArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
