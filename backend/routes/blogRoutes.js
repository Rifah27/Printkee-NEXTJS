const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.json(blogs);
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Get single blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    console.error('Error fetching blog:', err);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

// Create new blog
router.post('/post', upload.single('image'), async (req, res) => {
  try {
    const { title, content, author, category, description } = req.body || {};

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const cleanContent = content.trim();
    const cleanDescription = description?.trim() || '';
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const blog = new Blog({
      title: title.trim(),
      content: cleanContent,
      author: author?.trim() || 'Anonymous',
      category: category?.trim() || 'General',
      description: cleanDescription,
      excerpt: cleanDescription || cleanContent.replace(/<[^>]+>/g, '').slice(0, 150),
      image: imagePath,
      date: new Date(),
      comments: [],
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    console.error('Error creating blog:', err);
    if (req.file) {
      fs.unlink(req.file.path, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting uploaded file:', unlinkErr);
      });
    }
    res.status(500).json({ error: err.message || 'Failed to create blog' });
  }
});

// Update blog
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, content, author, category, description } = req.body || {};
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    if (title) blog.title = title.trim();
    if (content) {
      blog.content = content.trim();
      blog.excerpt = (description || content).replace(/<[^>]+>/g, '').slice(0, 150);
    }
    if (author) blog.author = author.trim();
    if (category) blog.category = category.trim();
    if (description !== undefined) {
      blog.description = description.trim();
      blog.excerpt = description.trim() || (blog.content || '').replace(/<[^>]+>/g, '').slice(0, 150);
    }
    if (req.file) {
      // Delete old image if exists
      if (blog.image && blog.image.startsWith('/uploads/')) {
        const oldPath = path.join(__dirname, '..', blog.image);
        fs.unlink(oldPath, (err) => {
          if (err) console.error('Error deleting old image:', err);
        });
      }
      blog.image = `/uploads/${req.file.filename}`;
    }

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (err) {
    console.error('Error updating blog:', err);
    if (req.file) {
      fs.unlink(req.file.path, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting uploaded file:', unlinkErr);
      });
    }
    res.status(500).json({ error: 'Failed to update blog' });
  }
});

// Add comment to blog
router.post('/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, comment } = req.body;

    if (!name || !comment) {
      return res.status(400).json({ error: 'Name and comment are required' });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    if (!blog.comments) {
      blog.comments = [];
    }

    blog.comments.push({ name, comment });
    await blog.save();

    res.status(200).json(blog);
  } catch (err) {
    console.error('Error adding comment:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete blog
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Delete image if exists
    if (blog.image && blog.image.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '..', blog.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Error deleting image:', err);
      });
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});

module.exports = router;
