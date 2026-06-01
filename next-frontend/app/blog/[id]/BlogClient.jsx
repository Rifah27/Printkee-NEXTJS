"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { api, getPublicUrl } from '../../../lib/api';

const fallbackImage = '/assets/banner-sect2.webp';

const hasHtml = (value = '') => /<\/?[a-z][\s\S]*>/i.test(value);

export default function BlogViewPage({ initialBlog }) {
  const params = useParams();
  const [blog, setBlog] = useState(initialBlog);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState(null);

  const submitComment = async (event) => {
    event.preventDefault();
    if (!name.trim() || !comment.trim()) {
      return setStatus({ type: 'error', message: 'Please enter your name and comment.' });
    }

    try {
      const res = await api.post(`/blogs/${params.id}/comments`, { name: name.trim(), comment: comment.trim() });
      setBlog(res.data);
      setStatus({ type: 'success', message: 'Comment submitted successfully.' });
      setComment('');
      setName('');
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: error.response?.data?.error || 'Unable to submit comment.' });
    }
  };

  if (!blog) {
    return <div className="container page-shell" style={{ padding: '6rem 0' }}>Loading post…</div>;
  }

  const publishedDate = blog.date ? new Date(blog.date).toLocaleDateString() : 'Unknown date';
  const imageUrl = getPublicUrl(blog.image) || fallbackImage;
  const content = blog.content || blog.description || '';

  return (
    <main className="page-shell">
      <section className="page-hero page-hero--blog-view">
        <div className="page-breadcrumbs container">
          <Link href="/blogs">Blogs</Link> / <span>{blog.title.slice(0, 40)}{blog.title.length > 40 ? '...' : ''}</span>
        </div>
        <div className="container page-hero__content">
          <div>
            <p className="home-kicker">Blog Article</p>
            <h1>{blog.title}</h1>
            <p className="page-lead">{blog.description || 'Read the latest story from the PrintKee blog community, with practical tips, case studies, and business ideas.'}</p>
            <div className="blog-view-meta">
              <span>{publishedDate}</span>
              <span>{blog.author || 'PrintKee Team'}</span>
              <span>{blog.category || 'General'}</span>
            </div>
            <Link href={`/blogs/edit/${params.id}`} className="home-btn home-btn--primary" aria-label="Edit this blog post">
              Edit this post
            </Link>
          </div>
          <div className="page-hero__media" style={{ backgroundImage: `url(${imageUrl})` }} />
        </div>
      </section>

      <section className="home-section">
        <div className="container blog-article-grid">
          <article className="blog-article">
            <div className="blog-article__content">
              {hasHtml(content) ? (
                <div className="rich-text" dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                <div className="rich-text">
                  {content.split(/\n{2,}/).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}
            </div>

            <div className="comment-panel">
              <div className="comment-panel__head">
                <h2>Leave a comment</h2>
                <p>Share your thoughts to help other readers.</p>
              </div>
              {status && (
                <div className={`form-status form-status--${status.type}`}>{status.message}</div>
              )}
              <form onSubmit={submitComment} className="comment-form">
                <label>
                  Your name
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
                </label>
                <label>
                  Your comment
                  <textarea rows="4" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your comment" />
                </label>
                <button type="submit" className="home-btn home-btn--primary">Submit comment</button>
              </form>
            </div>
          </article>

          <aside className="blog-sidebar">
            <div className="page-feature-card">
              <p className="home-kicker">Post details</p>
              <strong>Author</strong>
              <p>{blog.author || 'PrintKee Team'}</p>
              <strong>Category</strong>
              <p>{blog.category || 'General'}</p>
              <strong>Published</strong>
              <p>{publishedDate}</p>
            </div>
            {blog.comments?.length ? (
              <div className="page-feature-card">
                <p className="home-kicker">Comments</p>
                <div className="comment-list">
                  {blog.comments.map((commentItem, index) => (
                    <div className="comment-card" key={index}>
                      <strong>{commentItem.name || 'Guest'}</strong>
                      <span>{new Date(commentItem.date).toLocaleDateString()}</span>
                      <p>{commentItem.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </section>
    </main>
  );
}
