import ProductClient from './ProductClient';
import seoOverrides from '../../../../lib/seoOverrides';

export async function generateMetadata({ params }) {
  const { category, subcategory, product } = params;
  const path = `/${category}/${subcategory}/${product}`;
  const override = seoOverrides[path];
  
  let title = override?.title || "Product | Printkee";
  let description = override?.description || "Explore our wide range of corporate gifts.";

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5030/api'}/product/product-fetch/${category}/${subcategory}/${product}`);
    if (res.ok) {
      const data = await res.json();
      const prod = data.product;
      title = override?.title || prod?.seo?.metaTitle || `${prod?.name} | Printkee`;
      description = override?.description || prod?.seo?.metaDescription || prod?.description?.short || "Premium corporate promotional products";
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
  const { category, subcategory, product } = params;
  const path = `/${category}/${subcategory}/${product}`;

  let fetchedProduct = null;
  let fetchedRelated = [];
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5030/api'}/product/product-fetch/${category}/${subcategory}/${product}`, {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      const data = await res.json();
      fetchedProduct = data.product || data;
    }
  } catch (err) {
    console.error("Failed to fetch product:", err);
  }

  try {
    const relatedRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5030/api'}/product/related-products/${category}/${subcategory}/${product}`, {
      next: { revalidate: 3600 }
    });
    if (relatedRes.ok) {
      fetchedRelated = await relatedRes.json();
    }
  } catch (err) {
    console.error("Failed to fetch related products:", err);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://printkee.com" },
      { "@type": "ListItem", "position": 2, "name": fetchedProduct?.category?.name || category, "item": `https://printkee.com/${category}` },
      { "@type": "ListItem", "position": 3, "name": fetchedProduct?.subcategory?.name || subcategory, "item": `https://printkee.com/${category}/${subcategory}` },
      { "@type": "ListItem", "position": 4, "name": fetchedProduct?.name || product, "item": `https://printkee.com${path}` }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductClient initialProduct={fetchedProduct} initialRelated={Array.isArray(fetchedRelated) ? fetchedRelated : []} />
    </>
  );
}
