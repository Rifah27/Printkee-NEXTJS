import HomeClient from "./HomeClient";
import seoOverrides from "../lib/seoOverrides";

export const metadata = {
  title: seoOverrides["/"]?.title || "Vorixa | Premium Corporate Gifts",
  description: seoOverrides["/"]?.description || "Custom corporate gifting solutions across India.",
  alternates: {
    canonical: `https://vorixa.com/`,
  },
  openGraph: {
    title: seoOverrides["/"]?.title || "Vorixa | Premium Corporate Gifts",
    description: seoOverrides["/"]?.description || "Custom corporate gifting solutions across India.",
    url: `https://vorixa.com/`,
    siteName: 'Vorixa',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: seoOverrides["/"]?.title || "Vorixa | Premium Corporate Gifts",
    description: seoOverrides["/"]?.description || "Custom corporate gifting solutions across India.",
  }
};

export default async function HomePage() {
  let categories = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5030/api'}/category/categories`, {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      categories = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  return (
    <HomeClient categories={categories} />
  );
}
