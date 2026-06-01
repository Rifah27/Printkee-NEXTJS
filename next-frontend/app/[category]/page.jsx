import CategoryClient from './CategoryClient';
import seoOverrides from '../../lib/seoOverrides';

export async function generateMetadata({ params }) {
  const { category } = params;
  const path = `/${category}`;
  const override = seoOverrides[path];
  
  let title = override?.title || "Category | Printkee";
  let description = override?.description || "Premium corporate gifts for every occasion.";
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5030/api'}/category/categories/${category}`);
    if (res.ok) {
      const data = await res.json();
      title = override?.title || data?.seo?.metaTitle || `${data?.name} | Printkee`;
      description = override?.description || data?.seo?.metaDescription || data?.description || "";
    }
  } catch (err) {}

  return {
    title,
    description,
    alternates: { canonical: `https://printkee.com${path}` },
    robots: "index, follow",
    openGraph: {
      title,
      description,
      url: `https://printkee.com${path}`,
      siteName: 'Printkee',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  };
}

export default async function Page({ params }) {
  const { category } = params;
  const path = `/${category}`;
  
  let categoryData = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5030/api'}/category/categories/${category}`, {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      categoryData = await res.json();
    }
  } catch (err) {
    console.error("Failed to fetch category:", err);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://printkee.com" },
      { "@type": "ListItem", "position": 2, "name": categoryData?.name || category, "item": `https://printkee.com${path}` }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CategoryClient initialCategory={categoryData} />
    </>
  );
}
