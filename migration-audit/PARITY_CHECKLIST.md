# Parity Checklist

## Database Models & Collections (100%)
- [x] Audit Backend Models (Found in MERN)
- [x] Migrate `Audit.js`
- [x] Migrate `Blog.js`
- [x] Migrate `Category.js`
- [x] Migrate `Price.js`
- [x] Migrate `Subcategory.js`
- [x] Migrate `Visitor.js`
- [x] Migrate `product.js`

## API Parity (100%)
- [x] `/api/category`
- [x] `/api/subcategory`
- [x] `/api/product`
- [x] `/api/admin`
- [x] `/api/blogs`
- [x] `/api/visitors` (`visitor.js`)
- [x] `/api` (`searchRoutes.js`)
- [x] `/api` (`emailRoutes.js`)
- [x] `/` (`sitemap.js`)

## Route Parity (100%)
- [x] `/` -> `app/page.jsx`
- [x] `/about` -> `app/about/page.jsx`
- [x] `/brands` -> `app/brands/page.jsx`
- [x] `/brands/:brand` -> `app/brands/[brand]/page.jsx`
- [x] `/contact` -> `app/contact/page.jsx`
- [x] `/diwali-special` -> `app/diwali-special/page.jsx`
- [x] `/blogs` -> `app/blogs/page.jsx`
- [x] `/blogs/post` -> `app/blogs/post/page.jsx`
- [x] `/blog/:id` -> `app/blog/[id]/page.jsx`
- [x] `/search` -> `app/search/page.jsx`
- [x] `/sitemap` -> `app/sitemap/page.jsx`
- [x] `/:category` -> `app/[category]/page.jsx`
- [x] `/:category/:subcategory` -> `app/[category]/[subcategory]/page.jsx`
- [x] `/:category/:subcategory/:product` -> `app/[category]/[subcategory]/[product]/page.jsx`
- [x] `/customize/:productType` -> `app/customize/[productType]/page.jsx`
- [x] `/customize` -> `app/customize/page.jsx`
- [x] `/login` -> `app/login/page.jsx`
- [x] `/admin/*` -> `app/admin/*`

## SEO Parity (100%)
- [x] `app/brands/[brand]/page.jsx`
- [x] `app/[category]/page.jsx`
- [x] `app/[category]/[subcategory]/page.jsx`
- [x] `app/[category]/[subcategory]/[product]/page.jsx`
- [x] `app/blog/[id]/page.jsx`
- [x] Port `seoOverrides` data structure

## Features Parity (100%)
- [x] Authentication (Verify JWT logic)
- [x] Blog System (Connect API)
- [x] Search (Connect API)
- [x] Emails & Forms (Connect API)
- [x] Visitor Tracking (Connect API)
- [x] Admin Dashboard

