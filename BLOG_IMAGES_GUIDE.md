# Blog Images Setup Guide

## Overview
This guide explains how blog images are handled, displayed, and optimized in the PrintKee Next.js application.

## Blog Image Locations

### 1. **User-Uploaded Images**
**Location**: Backend uploads folder
- Path: `next-backend/uploads/`
- Format: Maintained as original uploaded format
- Access URL: `/uploads/{filename}`

### 2. **Fallback/Default Images**
**Location**: Frontend public assets
- Path: `next-app/public/assets/`
- Current default: `banner-sect2.webp`
- Size: ~100-300KB
- Format: WebP (optimized)

## Current Blog Images in Database

The database stores blog posts with associated images. When a user publishes a blog with an image:

1. **Upload Process**:
   - Image sent to backend via FormData
   - Multer saves file to `next-backend/uploads/`
   - Filename stored in database

2. **Retrieval Process**:
   - Frontend requests blog data from API
   - Database returns blog documents with image filenames
   - Frontend constructs image URLs using `getPublicUrl()` helper

3. **Display Process**:
   - BlogCard component renders image with fallback
   - If image fails to load, fallback image is used

## Image Optimization Strategy

### For Blog Upload Page
- Max file size: 5MB
- Accepted formats: JPG, PNG, WebP
- No client-side compression (user uploads as-is)
- Server-side optimization (recommended)

### For Blog Display (BlogCard)
- Aspect ratio: 16/11 (fixed container)
- Image scaling: Cover fit
- Lazy loading: Native (with Next.js Image component in future)
- Fallback: `banner-sect2.webp`

## Adding Sample Blog Images

### Option 1: Use Existing Assets
The following images from `public/assets/` could serve as blog cover images:
```
- banner1.webp - Colorful promotional banner
- banner2.webp - Professional business banner
- banner3.webp - Corporate events banner
- banner4.webp - Marketing banner
- festive.webp - Festive/seasonal content
- onboarding.webp - Professional onboarding image
- conference.webp - Conference/event image
```

### Option 2: Create New Blog Images
To add new default blog images:

1. **Create images** (1200x675px recommended)
2. **Optimize** to WebP format
3. **Save** to `next-app/public/assets/blog-images/`
4. **Update** fallback references in BlogCard

### Option 3: Use Unsplash Images (License)
For sample data, you can reference these free stock images:
- Corporate gifting themes
- Branding and design
- Marketing and trends
- Sustainability topics

## Image URL Helper

The `getPublicUrl()` function in `lib/api.js`:

```javascript
export function getPublicUrl(imagePath) {
  if (!imagePath) return null;
  
  if (imagePath.startsWith('http')) return imagePath;
  
  if (imagePath.includes('/uploads/')) {
    return `${process.env.NEXT_PUBLIC_API_URL}${imagePath}`;
  }
  
  // Otherwise, treat as public asset
  return `/assets/${imagePath}`;
}
```

### Usage Examples:
```javascript
// Uploaded image
getPublicUrl("uploads/1754767833512-YYCgKy0MmcY[1]")
// Returns: https://api.printkee.com/uploads/1754767833512-YYCgKy0MmcY[1]

// Asset image
getPublicUrl("banner-sect2.webp")
// Returns: /assets/banner-sect2.webp

// Full URL
getPublicUrl("https://example.com/image.jpg")
// Returns: https://example.com/image.jpg
```

## Blog Card Component (current implementation)

```javascript
import Link from "next/link";
import { getPublicUrl } from "../lib/api";

const fallbackImage = "/assets/banner-sect2.webp";

export default function BlogCard({ blog }) {
  const imageSrc = getPublicUrl(blog.image) || fallbackImage;
  // ... rest of component
}
```

## Recommended Image Setup for Blogs

### Blog Categories with Suggested Image Types:

1. **Branding** 
   - Best size: 1200x675px
   - Style: Brand identity, logo evolution
   - Colors: Bold, professional

2. **Marketing**
   - Best size: 1200x675px
   - Style: Campaign materials, social media
   - Colors: Eye-catching, vibrant

3. **Corporate Gifting**
   - Best size: 1200x675px
   - Style: Product images, unboxing
   - Colors: Premium, elegant

4. **Design Tips**
   - Best size: 1200x675px
   - Style: Design showcases, tutorials
   - Colors: Creative, inspiring

5. **Industry News**
   - Best size: 1200x675px
   - Style: News graphics, infographics
   - Colors: Professional, informative

6. **Trends**
   - Best size: 1200x675px
   - Style: Trend analysis, predictions
   - Colors: Forward-thinking, modern

7. **Sustainability**
   - Best size: 1200x675px
   - Style: Eco-friendly materials, green initiatives
   - Colors: Green, nature-inspired

8. **Tips & Tricks**
   - Best size: 1200x675px
   - Style: How-to graphics, step-by-step
   - Colors: Clear, instructional

## Creating Default Blog Images

### Using Online Tools:
1. **Canva**: Create 1200x675px designs for each category
2. **ImageMagick**: Batch resize and convert to WebP
3. **TinyPNG**: Compress WebP files

### Batch WebP Conversion:
```bash
# Using ImageMagick
for img in *.jpg *.png; do
  convert "$img" -quality 80 "${img%.*}.webp"
done

# Using cwebp
cwebp -q 80 input.jpg -o output.webp
```

### File Naming Convention:
```
blog-default-{category}.webp

Examples:
- blog-default-branding.webp
- blog-default-marketing.webp
- blog-default-corporate-gifting.webp
- blog-default-design-tips.webp
- blog-default-industry-news.webp
- blog-default-trends.webp
- blog-default-sustainability.webp
- blog-default-tips-tricks.webp
```

## Serving Images

### Current Setup:
- Static images: Served from `/public/assets/`
- Uploaded images: Served from backend `/uploads/` endpoint

### Future Optimization:
1. **Image CDN**: Use Cloudinary or similar
2. **Next.js Image Component**: For automatic optimization
3. **Image Compression**: Add sharp for server-side compression
4. **Caching Headers**: Implement long-term caching for static images

## Troubleshooting

### Images not displaying:
1. **Check image URL**: Verify image path in database
2. **Check backend**: Ensure `/uploads/` endpoint is accessible
3. **Check fallback**: Ensure `banner-sect2.webp` exists in public/assets
4. **Check permissions**: Verify backend file permissions

### Images loading slowly:
1. **Optimize file size**: Use WebP format
2. **Add CDN**: Serve from CDN instead of local storage
3. **Implement lazy loading**: Use Next.js Image component
4. **Cache headers**: Set proper cache expiration

### Wrong image displayed:
1. **Check image filename**: Verify in database
2. **Check getPublicUrl()**: Debug URL construction
3. **Check img src attribute**: Verify construction in component

## Database Schema for Blog Images

```javascript
// Blog model
{
  title: String,
  content: String,
  image: String,  // Filename only: "1754767833512-YYCgKy0MmcY[1]"
  author: String,
  category: String,
  date: Date,
  // ... other fields
}
```

## Best Practices

1. **Image Naming**: Use consistent naming convention
2. **File Size**: Keep images under 500KB when possible
3. **Format**: Prefer WebP for web (JPG fallback)
4. **Dimensions**: Maintain consistent aspect ratio (16:11)
5. **Accessibility**: Always include alt text in components
6. **Testing**: Test image loading on slow connections
7. **Backup**: Keep original images backed up

## Future Enhancements

1. ✏️ **Automatic Cropping**: Crop images to 16:11 ratio
2. 🖼️ **Image Gallery**: Show multiple images per blog
3. 🎨 **Image Filters**: Apply filters to images
4. 🏷️ **Image Captions**: Add captions to images
5. 📱 **Responsive Images**: Serve different sizes for different devices
6. ⚡ **Lazy Loading**: Load images only when visible
7. 🗂️ **Image Library**: Searchable library of blog images

## Related Files
- `next-app/components/BlogCard.jsx` - Image display component
- `next-app/lib/api.js` - Image URL helper
- `next-app/app/blogs/post/page.jsx` - Image upload page
- `next-app/app/blogs/page.jsx` - Blog list page
- `next-backend/routes/blogRoutes.js` - Blog API endpoints
- `next-backend/server.js` - Image upload configuration (Multer)

## Environment Variables

```env
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_IMG_URL=http://localhost:5000

# Backend
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880  # 5MB in bytes
```

## Testing Image Upload

### Using cURL:
```bash
curl -X POST http://localhost:5000/blogs/post \
  -F "title=My Blog Post" \
  -F "content=Blog content here" \
  -F "image=@/path/to/image.jpg"
```

### Using Postman:
1. Create POST request to `/blogs/post`
2. Set body to form-data
3. Add fields: title, content, image (file)
4. Send request

## Performance Metrics

Current setup should handle:
- ✓ 100+ blogs with images
- ✓ Upload size: 0-5MB per file
- ✓ Concurrent uploads: 5-10
- ✓ Display performance: <2s page load

## Last Updated
May 31, 2026

## Version
1.0.0 - Initial Release
