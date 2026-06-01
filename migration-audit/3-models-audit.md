# Models Audit

## Database Models (Mongoose Source)
Located in `backend/models/`:

1. `Audit.js`
2. `Blog.js`
3. `Category.js`
4. `Price.js`
5. `Subcategory.js`
6. `Visitor.js`
7. `product.js`

## Requirement
The Next.js implementation must use the **exact same database** and **same schemas**. 
- No duplicates
- No migration of data
- No schema modifications

Next.js must connect to the same MongoDB instance and utilize matching Mongoose models (or Prisma connecting to the same DB without changing schemas). Since Mongoose models are already defined in `backend/models/`, `next-backend` should theoretically reuse these exact models.
