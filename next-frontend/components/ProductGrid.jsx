import Link from "next/link";
import { getPublicUrl } from "../lib/api";

const getImagePath = (product) => {
  const image = product?.images?.[0] || product?.image;
  return typeof image === "string" ? image : image?.url;
};

const getDescription = (product) => {
  const description = product?.description;
  if (typeof description === "string") return description;
  return description?.short || description?.long || "Customizable corporate and promotional products.";
};

export default function ProductGrid({ products, categorySlug, subcategorySlug }) {
  return (
    <div className="catalog-product-grid">
      {products?.map((product) => (
        <Link
          key={product._id || product.slug}
          href={`/${product.category?.slug || categorySlug || product.category}/${product.subcategory?.slug || subcategorySlug || product.subcategory}/${product.slug}`}
          className="product-card"
        >
          <div className="product-card__media">
            <img
              src={getPublicUrl(getImagePath(product))}
              alt={product.name}
              className="product-card__img"
            />
            <div className="product-card__badge">
              {product.salePrice || product.price ? `Rs. ${product.salePrice || product.price}` : "Quote"}
            </div>
            <div className="product-card__overlay">View product</div>
          </div>
          <div className="product-card__body">
            <p>{product.subcategory?.name || "Custom branding"}</p>
            <h3>{product.name}</h3>
            <span>{getDescription(product).slice(0, 105)}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
