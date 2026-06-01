# Features Audit

## Core Application Features
1. **Authentication & Authorization**: Protected Admin routes, JWT sessions.
2. **E-Commerce Hierarchy**: Dynamic multi-level routing `Category -> Subcategory -> Product`.
3. **Product Customization Engine**: Fabric.js / SVG / PNG customization tools (`/customize/*`).
4. **Blog System**: Posts, views, categories, form submissions.
5. **Admin Dashboard**: Managers for Banners, Categories, Subcategories, and Products.
6. **Search**: Search functionality handling products and tags matching.
7. **Emails & Forms**: Contact forms, lead collection forms.
8. **Visitor Tracking**: Visitor auditing and metrics.
9. **SEO Engine**: Dynamic SEO metadata injection using backend interceptors.

## Parity Strategy
All these features must be moved to the `next-frontend` / `next-backend` architecture without altering business logic or database structures.
