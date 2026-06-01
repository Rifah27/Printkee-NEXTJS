# APIs Audit

## Backend API Endpoints (Node/Express Source)
Based on `backend/server.js` and `backend/routes/`:

### Grouped Endpoints
- `/api/blogs` - Handled by `blogRoutes.js`
- `/api/visitors` - Handled by `visitor.js`
- `/api/category` - Handled by `categoryRoutes.js`
- `/api/subcategory` - Handled by `subcategoryRoutes.js`
- `/api/product` - Handled by `productRoutes.js`
- `/api/admin` - Handled by `adminRoutes.js`
- `/api` (Search) - Handled by `searchRoutes.js`
- `/api` (Email) - Handled by `emailRoutes.js`
- `/` - Sitemap routes handled by `sitemap.js`

### SSR / SEO Overrides (Express side)
The backend intercepts these paths to inject SEO metadata:
- `/`
- `/:category/:subcategory/:product`
- `/:category/:subcategory`
- `/:category`
- `/blog/:id`

## Target Next.js API Structure
These APIs must be recreated identically in `next-backend` or mapped carefully if keeping the Node.js backend. The instructions say `/next-backend = Next.js compatible backend/API layer`.
We must ensure identical response structures, status codes, query param handling, and auth validation.
