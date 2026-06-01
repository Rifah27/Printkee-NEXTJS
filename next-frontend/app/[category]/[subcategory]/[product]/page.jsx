"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FiArrowRight,
  FiCheckCircle,
  FiPackage,
  FiShield,
  FiTruck,
} from "react-icons/fi";
import { useParams } from "next/navigation";
import { getProductCopy } from "../../../../lib/catalogPageContent";
import { api, getPublicUrl } from "../../../../lib/api";

const noImage = "/assets/banner4.webp";

const resolveImage = (path) => {
  const imagePath = typeof path === "string" ? path : path?.url;
  if (!imagePath) return noImage;
  if (imagePath.startsWith("/assets/")) return imagePath;
  return getPublicUrl(imagePath);
};

const formatList = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean).join(", ");
  return value || "Available on request";
};

const getImagePath = (product) => {
  const image = product?.images?.[0] || product?.image;
  return typeof image === "string" ? image : image?.url;
};

const getImageGallery = (product) => {
  const images = [...(product?.images || []), ...(product?.subImages || [])]
    .map((image) => (typeof image === "string" ? image : image?.url))
    .filter(Boolean);

  return images.length
    ? images.slice(0, 4)
    : [getImagePath(product)].filter(Boolean);
};

const resolveProductDescription = (product) => {
  const description = product?.description;
  if (typeof description === "string") return description;
  return description?.long || description?.short || "";
};

const getName = (value, fallback) => {
  if (typeof value === "object" && value?.name) return value.name;
  return fallback?.replace(/-/g, " ") || "";
};

const getRelatedHref = (params, item) =>
  `/${item.category?.slug || params.category}/${
    item.subcategory?.slug || params.subcategory
  }/${item.slug}`;

const productValue = (product, key) => {
  if (key === "material") return product?.attributes?.material;
  if (key === "color") return formatList(product?.attributes?.color);
  return "";
};

const priceLabel = (product) => {
  if (!product?.salePrice && !product?.price) return "Quote on request";
  return `Rs. ${product.salePrice || product.price}`;
};

const stockLabel = (product) => {
  if (product?.stock > 0) return "In stock and ready to quote";
  return "Available for bulk enquiry";
};

const keyDetails = (product) => [
  ["SKU", product?.sku || "Available on request"],
  ["MOQ", "Bulk orders welcome"],
  ["Branding", "Logo printing and packaging support"],
  ["Delivery", "Delhi NCR and pan-India dispatch"],
];

const productSpecs = [
  { icon: FiShield, label: "Material", key: "material" },
  { icon: FiPackage, label: "Color", key: "color" },
  { icon: FiTruck, label: "Order type", value: "Bulk and custom orders" },
];

const heroDetails = (product) => [
  ["SKU", product?.sku || "On request"],
  ["MOQ", "Bulk friendly"],
  ["Support", "Logo + packaging"],
];

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch product + related products
  useEffect(() => {
    if (!params?.category || !params?.subcategory || !params?.product) return;

    api
      .get(
        `/product/product-fetch/${params.category}/${params.subcategory}/${params.product}`
      )
      .then((res) => setProduct(res.data.product || res.data))
      .catch(console.error);

    api
      .get(
        `/product/related-products/${params.category}/${params.subcategory}/${params.product}`
      )
      .then((res) => setRelated(Array.isArray(res.data) ? res.data : []))
      .catch(console.error);
  }, [params]);

  // Safe computed values BEFORE conditional return
  const categoryName = product
    ? getName(product.category, params.category)
    : "";
  const subcategoryName = product
    ? getName(product.subcategory, params.subcategory)
    : "";
  const copy = product
    ? getProductCopy(product, subcategoryName)
    : {
        eyebrow: "",
        headline: "",
        intro: "",
      };
  const gallery = useMemo(
    () => (product ? getImageGallery(product) : []),
    [product]
  );
  const longDescription = product
    ? resolveProductDescription(product) || copy.intro
    : "";

  // Always run hook in same order
  useEffect(() => {
    if (gallery.length) {
      setSelectedImage(resolveImage(gallery[0]));
    }
  }, [gallery]);

  // Loading state AFTER hooks
  if (!product) {
    return <div className="catalog-loading">Loading product...</div>;
  }

  return (
    <main className="catalog-page product-detail-page">
      <section className="product-hero">
        <div className="container product-hero__grid">
          <div className="product-gallery">
            <div className="product-gallery__main">
              <img
                src={selectedImage || resolveImage(getImagePath(product))}
                alt={product.name}
              />
            </div>

            <div className="product-gallery__thumbs">
              {gallery.map((image, index) => {
                const src = resolveImage(image);

                return (
                  <img
                    key={`${image}-${index}`}
                    src={src}
                    alt={`${product.name} view ${index + 1}`}
                    className={src === selectedImage ? "active" : ""}
                    onClick={() => setSelectedImage(src)}
                  />
                );
              })}
            </div>
          </div>

          <div className="product-hero__copy">
            <div className="catalog-breadcrumbs catalog-breadcrumbs--dark">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href={`/${params.category}`}>{categoryName}</Link>
              <span>/</span>
              <Link href={`/${params.category}/${params.subcategory}`}>
                {subcategoryName}
              </Link>
            </div>

            <p className="catalog-kicker">{subcategoryName || copy.eyebrow}</p>
            <h1>{product.name}</h1>
            <p>{copy.intro}</p>

            <div className="product-hero__details">
              {heroDetails(product).map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>

            <div className="product-price-card">
              <span>{priceLabel(product)}</span>
              <small>{stockLabel(product)}</small>
            </div>

            <div className="catalog-actions">
              <Link
                href="/contact"
                className="catalog-btn catalog-btn--primary"
              >
                Request a quote <FiArrowRight aria-hidden="true" />
              </Link>

              <Link
                href={`/${params.category}/${params.subcategory}`}
                className="catalog-btn catalog-btn--outline"
              >
                Back to range
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="catalog-section">
        <div className="container product-info-grid">
          <article className="product-copy-panel">
            <p className="catalog-kicker">Product details</p>
            <h2>Made for custom branding and corporate gifting</h2>
            <p>{longDescription}</p>

            <ul>
              <li>
                <FiCheckCircle /> Custom logo printing and branding support
              </li>
              <li>
                <FiCheckCircle /> Suitable for employee kits, events,
                promotions, and client gifts
              </li>
              <li>
                <FiCheckCircle /> Bulk order planning with packaging and
                delivery coordination
              </li>
            </ul>
          </article>

          <aside className="product-summary-panel">
            <p className="catalog-kicker">Quick summary</p>

            <div className="product-summary-panel__rows">
              {keyDetails(product).map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="catalog-section catalog-section--warm">
        <div className="container">
          <div className="catalog-section__head">
            <p className="catalog-kicker">Specifications</p>
            <h2>Core buying information</h2>
          </div>

          <div className="product-spec-grid">
            {productSpecs.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.label}>
                  <Icon />
                  <span>{item.label}</span>
                  <strong>
                    {item.value ||
                      productValue(product, item.key) ||
                      "Available on request"}
                  </strong>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="catalog-section">
        <div className="container">
          <div className="catalog-section__head catalog-section__head--split">
            <div>
              <p className="catalog-kicker">Related products</p>
              <h2>More options from {subcategoryName}</h2>
            </div>

            <p>
              Compare similar products and pick the right finish, price point,
              and branding surface for your order.
            </p>
          </div>

          {related.length ? (
            <div className="related-product-grid">
              {related.slice(0, 4).map((item) => (
                <Link
                  key={item._id || item.slug}
                  href={getRelatedHref(params, item)}
                >
                  <img
                    src={resolveImage(getImagePath(item))}
                    alt={item.name}
                  />
                  <div>
                    <span>
                      {item.salePrice || item.price
                        ? `Rs. ${item.salePrice || item.price}`
                        : "Quote"}
                    </span>
                    <h3>{item.name}</h3>
                    <p>View product</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="catalog-empty">
              Related products will appear here once this range has more live
              items.
            </div>
          )}
        </div>
      </section>

      <section className="catalog-cta">
        <div className="container catalog-cta__inner">
          <div>
            <p className="catalog-kicker">Ready to brand it?</p>
            <h2>
              Get custom packaging, logo approvals, and delivery planning for
              this product.
            </h2>
          </div>

          <Link href="/contact" className="catalog-btn catalog-btn--dark">
            Contact sales <FiArrowRight />
          </Link>
        </div>
      </section>
    </main>
  );
}
