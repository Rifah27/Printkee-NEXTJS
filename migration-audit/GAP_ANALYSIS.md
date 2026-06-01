# MERN to Next.js Gap Analysis

## 1. Routes
**Parity: ~95%**

* ✅ `/` -> `app/page.jsx`
* ✅ `/about` -> `app/about/page.jsx`
* ✅ `/brands` -> `app/brands/page.jsx`
* ✅ `/brands/:brand` -> `app/brands/[brand]/page.jsx`
* ✅ `/contact` -> `app/contact/page.jsx`
* ✅ `/diwali-special` -> `app/diwali-special/page.jsx`
* ✅ `/blogs` -> `app/blogs/page.jsx`
* ⚠️ `/blogs/post` -> `app/blog/post/page.jsx` *(Mismatch: URL path changed from `/blogs/post` to `/blog/post`)*
* ✅ `/blog/:id` -> `app/blog/[id]/page.jsx`
* ✅ `/search` -> `app/search/page.jsx`
* ✅ `/sitemap` -> `app/sitemap/page.jsx`
* ✅ `/:category` -> `app/[category]/page.jsx`
* ✅ `/:category/:subcategory` -> `app/[category]/[subcategory]/page.jsx`
* ✅ `/:category/:subcategory/:product` -> `app/[category]/[subcategory]/[product]/page.jsx`
* ✅ `/customize/:productType` -> `app/customize/[productType]/page.jsx`
* ✅ `/customize` -> `app/customize/page.jsx`
* ✅ `/login` -> `app/login/page.jsx`
* ✅ `/admin/*` -> `app/admin/*`

## 2. APIs
**Parity: ~55%**

* ✅ `/api/blogs` -> `next-backend/routes/blogRoutes.js`
* ❌ `/api/visitors` -> *(Missing in Next Backend)*
* ❌ `/api` (Search) -> *(Missing `searchRoutes.js`)*
* ❌ `/api` (Email) -> *(Missing `emailRoutes.js`)*
* ✅ `/api/category` -> `next-backend/routes/categoryRoutes.js`
* ✅ `/api/subcategory` -> `next-backend/routes/subcategoryRoutes.js`
* ✅ `/api/product` -> `next-backend/routes/productRoutes.js`
* ✅ `/api/admin` -> `next-backend/routes/adminRoutes.js`
* ❌ `/` (Sitemap XML API) -> *(Missing `sitemap.js`)*

## 3. Database Models
**Parity: ~42%**

* ⚠️ `Category.js` -> `next-backend/routes/models.js` *(Redefined, not using original MERN schema directly)*
* ⚠️ `Subcategory.js` -> `next-backend/routes/models.js` *(Redefined)*
* ⚠️ `product.js` -> `next-backend/routes/models.js` *(Redefined)*
* ❌ `Audit.js` -> *(Missing)*
* ❌ `Blog.js` -> *(Missing)*
* ❌ `Price.js` -> *(Missing)*
* ❌ `Visitor.js` -> *(Missing)*

## 4. SEO Implementation
**Parity: ~10%**

* ✅ `app/brands/[brand]/page.jsx` *(Has `generateMetadata`)*
* ❌ `app/[category]/page.jsx` *(Missing `generateMetadata`)*
* ❌ `app/[category]/[subcategory]/page.jsx` *(Missing `generateMetadata`)*
* ❌ `app/[category]/[subcategory]/[product]/page.jsx` *(Missing `generateMetadata`)*
* ❌ `app/blog/[id]/page.jsx` *(Missing `generateMetadata`)*
* ❌ `seoOverrides` data integration -> *(Missing)*

## 5. Core Features
**Parity: ~70%**

* ⚠️ **Authentication**: Partially Implemented (Frontend UI exists, API needs verification for JWT parity).
* ✅ **E-Commerce Hierarchy**: Fully Implemented
* ✅ **Product Customization Engine**: Fully Implemented
* ⚠️ **Blog System**: Partially Implemented (API missing Blog model)
* ✅ **Admin Dashboard**: Fully Implemented
* ❌ **Search Engine**: Missing (Search API missing)
* ❌ **Emails & Forms**: Missing (Email API missing)
* ❌ **Visitor Tracking**: Missing (Visitor API and Model missing)
* ❌ **SEO Engine**: Missing (No dynamic metadata tags)
