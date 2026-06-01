# SEO Audit

## SEO Mechanism in React MERN Source
- Uses an Express backend middleware to intercept static paths.
- Uses `seoOverrides` from `backend/data/seoOverrides.js`.
- Queries MongoDB for Product, Category, Subcategory, and Blog items to inject:
  - `<title>`
  - `<meta name="description">`
  - Canonical URLs
  - `<article>` / `<section>` tags populated with structured content for crawlers.

## Next.js Parity Requirement
- Client-side SEO must be avoided.
- All SEO logic from Express must be moved to Next.js Server-Side rendering.
- Must use `generateMetadata()` in Next.js 13+ App Router.
- Structured data, Canonical URLs, Open Graph, and Twitter Cards must be identical.
- Ensure Breadcrumbs and schema markup are preserved exactly.
