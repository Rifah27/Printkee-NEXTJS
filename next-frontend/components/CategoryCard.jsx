import Link from "next/link";
import { getPublicUrl } from "../lib/api";

export default function CategoryCard({ category }) {
  return (
    <Link href={`/${category.slug}`} className="category-card">
      <div className="category-card__media">
        <img src={getPublicUrl(category.image)} alt={category.name} className="category-card__img" />
        <div className="category-card__overlay">
          <h3 className="category-card__title">{category.name}</h3>
          <span className="category-card__cta">Explore range</span>
        </div>
      </div>
      <div className="category-card__body">
        <p>{category.description || "Explore premium products and custom branding solutions."}</p>
      </div>
    </Link>
  );
}
