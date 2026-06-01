import SubcategoryClient from './SubcategoryClient';
import seoOverrides from '../../../lib/seoOverrides';

export async function generateMetadata({ params }) {
  const { category, subcategory } = params;
  const path = `/${category}/${subcategory}`;
  const override = seoOverrides[path];
  
  let title = override?.title || "Collection | Printkee";
  let description = override?.description || "Explore our premium corporate gift collections.";

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5030/api'}/subcategory/subcategory-fetch/${category}/${subcategory}`);
    if (res.ok) {
      const data = await res.json();
      const sub = data.subcategory;
      title = override?.title || sub?.seo?.metaTitle || `${sub?.name} | Printkee`;
      description = override?.description || sub?.seo?.metaDescription || sub?.description || "";
    }
  } catch (err) {}
  
  return {
    title,
    description,
    alternates: { canonical: `https://printkee.com${path}` },
    robots: "index, follow",
    openGraph: { title, description, url: `https://printkee.com${path}`, siteName: 'Printkee', type: 'website' },
    twitter: { card: 'summary_large_image', title, description }
  };
}

export default async function Page({ params }) {
  const { category, subcategory } = params;
  const path = `/${category}/${subcategory}`;

  let fetchedData = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5030/api'}/subcategory/subcategory-fetch/${category}/${subcategory}`, {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      fetchedData = await res.json();
    }
  } catch (err) {
    console.error("Failed to fetch subcategory:", err);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://printkee.com" },
      { "@type": "ListItem", "position": 2, "name": fetchedData?.category?.name || category, "item": `https://printkee.com/${category}` },
      { "@type": "ListItem", "position": 3, "name": fetchedData?.subcategory?.name || subcategory, "item": `https://printkee.com${path}` }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SubcategoryClient initialData={fetchedData} />
    </>
  );
}
