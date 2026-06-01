import BlogClient from './BlogClient';

export async function generateMetadata({ params }) {
  const { id } = params;
  const path = `/blog/${id}`;
  
  let title = "Blog | Printkee";
  let description = "Customized promotional products and corporate gifting solutions.";

  let blogData = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5030/api'}/blogs/${id}`);
    if (res.ok) {
      blogData = await res.json();
      title = blogData?.title || title;
      description = blogData?.excerpt || blogData?.content?.slice(0, 150) || description;
    }
  } catch (err) {}

  return {
    title,
    description,
    alternates: { canonical: `https://printkee.com${path}` },
    robots: "index, follow",
    openGraph: { title, description, url: `https://printkee.com${path}`, siteName: 'Printkee', type: 'article' },
    twitter: { card: 'summary_large_image', title, description }
  };
}

export default async function Page({ params }) {
  const { id } = params;
  const path = `/blog/${id}`;

  let blogData = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5030/api'}/blogs/${id}`);
    if (res.ok) {
      blogData = await res.json();
    }
  } catch (err) {
    console.error("Failed to fetch blog:", err);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://printkee.com${path}`
    },
    "headline": blogData?.title || "Printkee Blog",
    "description": blogData?.excerpt || "",
    "author": {
      "@type": "Person",
      "name": blogData?.author || "Printkee"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Printkee"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogClient initialBlog={blogData} />
    </>
  );
}
