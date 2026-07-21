import Link from "next/link";
import BlogCard from "../../components/BlogCard";

export const metadata = {
  title: "Blog | Vorixa",
  description: "Read the latest corporate gifting trends, case studies, and insights from Vorixa.",
  alternates: {
    canonical: `https://vorixa.com/blogs`,
  },
  openGraph: {
    title: "Blog | Vorixa",
    description: "Read the latest corporate gifting trends, case studies, and insights from Vorixa.",
    url: `https://vorixa.com/blogs`,
    siteName: 'Vorixa',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Blog | Vorixa",
    description: "Read the latest corporate gifting trends, case studies, and insights from Vorixa.",
  }
};

export default async function BlogListPage() {
  let blogs = [];
  let error = "";

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5030/api'}/blogs`, {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      blogs = await res.json();
    } else {
      error = "Unable to load blogs right now.";
    }
  } catch (err) {
    console.error("Failed to fetch blogs:", err);
    error = "Unable to load blogs right now.";
  }

  return (
    <main className="vorixa-page blogs-redesign">
      <section className="blogs-redesign__hero">
        <div className="container blogs-redesign__hero-inner">
          <div>
            <p>Latest Blogs</p>
            <h1>Latest Blogs</h1>
          </div>
          <Link href="/blogs/post" className="home-btn home-btn--primary" aria-label="Post a new blog">Post a Blog</Link>
        </div>
      </section>

      <section className="blogs-redesign__list">
        <div className="container">
          {error ? (
            <p className="blogs-redesign__empty">{error}</p>
          ) : !blogs || blogs.length === 0 ? (
            <p className="blogs-redesign__empty">No blogs available at the moment.</p>
          ) : (
            <div className="blogs-redesign__grid">
              {blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
