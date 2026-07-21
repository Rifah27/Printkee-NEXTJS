"use client";

import Link from "next/link";
import { getPublicUrl } from "../lib/api";

const fallbackImage = "/assets/banner-sect2.webp";

const stripHtml = (value = "") => value.replace(/<[^>]+>/g, "").trim();

export default function BlogCard({ blog }) {
  const imageSrc = getPublicUrl(blog.image) || fallbackImage;
  const excerpt = stripHtml(blog.description || blog.excerpt || blog.content || "");

  return (
    <article className="blogs-redesign__card">
      <Link href={`/blog/${blog._id}`} className="blogs-redesign__image">
        <img
          src={imageSrc}
          alt={blog.title ? blog.title : "Blog thumbnail image"}
          onError={(event) => {
            event.currentTarget.src = fallbackImage;
          }}
        />
      </Link>

      <div className="blogs-redesign__card-body">
        <h3>{blog.title}</h3>
        <p className="blogs-redesign__meta">
          By {blog.author ? blog.author : "Unknown"} on{" "}
          {blog.date ? new Date(blog.date).toLocaleDateString() : "Unknown date"}
        </p>
        <p className="blogs-redesign__excerpt">{excerpt ? `${excerpt.slice(0, 140)}...` : "Read the latest story from Vorixa."}</p>
        <Link href={`/blog/${blog._id}`} className="blogs-redesign__read" aria-label={`Read full blog: ${blog.title}`}>
          Read More
        </Link>
      </div>
    </article>
  );
}
