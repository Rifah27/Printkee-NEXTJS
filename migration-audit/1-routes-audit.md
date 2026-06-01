# Routes Audit

## Frontend Routes (MERN React Source)
Based on `frontend/src/App.jsx`:

### Public Routes
- `/` - Home
- `/about` - AboutUs
- `/brands` - Brands
- `/brands/:brand` - BrandsDisplay
- `/contact` - ContactUs
- `/diwali-special` - Diwali
- `/blogs` - BlogList
- `/blogs/post` - BlogForm
- `/blog/:id` - BlogView
- `/search` - SearchResults
- `/sitemap` - Sitemap
- `/customize` - CustomizerAll
- `/customize/:productType` - CustomizerSVG
- `/login` - Login

### Dynamic Category / E-Commerce Routes
- `/:category` - SubcategoryPage
- `/:category/:subcategory` - ProductPage
- `/:category/:subcategory/:product` - SingleProductPage

### Admin Routes (Protected)
- `/admin` - AdminDashboard
- `/admin/banners` - HeroManagerPage
- `/admin/categories` - CategoryManager
- `/admin/subcategories` - SubcategoryManager
- `/admin/products` - ProductManager

## Target Next.js Structure Required
All the above routes must be mapped exactly in Next.js `app/` router or Next.js `pages/` router, preserving the URL paths and parameters.
