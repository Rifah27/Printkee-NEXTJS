import Link from "next/link";

export const metadata = {
  title: "Sitemap | PrintKee",
  description:
    "Navigate PrintKee pages including categories, brands, blogs, customization, and contact information.",
  alternates: {
    canonical: "https://printkee.com/sitemap",
  },
};

const mainPages = [
  ["/", "Home"],
  ["/about", "About Us"],
  ["/blogs", "Blog"],
  ["/brands", "Brands"],
  ["/contact", "Contact Us"],
  ["/customize", "Customize"],
  ["/diwali-special", "Diwali Special"],
];

const categoryPages = [
  ["/bags-and-travel", "Bags and Travel"],
  ["/eco-products", "Eco Products"],
  ["/apparel-and-accessories", "Apparel and Accessories"],
  ["/collection", "Collection"],
  ["/drink-ware", "Drink Ware"],
  ["/technology-accessories", "Technology Accessories"],
  ["/trophy-and-momento", "Trophy and Momento"],
  ["/office-and-writing", "Office and Writing"],
];

export default function SitemapPage() {
  return (
    <main className="sitemap-page">
      <section className="container sitemap-page__inner">
        <div className="sitemap-page__head">
          <p className="catalog-kicker">PrintKee routes</p>
          <h1>Sitemap</h1>
          <p>Explore all key pages and collections on PrintKee</p>
        </div>

        <div className="sitemap-page__grid">
          <section>
            <h2>Main Pages</h2>
            <ul>
              {mainPages.map(([href, label]) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Popular Categories</h2>
            <ul>
              {categoryPages.map(([href, label]) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
