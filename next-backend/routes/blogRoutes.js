const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || "";
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

const blogsCollection = () => mongoose.connection.db.collection("blogs");
const toObjectId = (id) => new mongoose.Types.ObjectId(id);
const excerptFrom = (description, content) =>
  (description || content || "").replace(/<[^>]+>/g, "").trim().slice(0, 150);

router.get("/", async (req, res) => {
  try {
    const blogs = await blogsCollection().find({}).sort({ date: -1 }).toArray();
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid id" });

    const blog = await blogsCollection().findOne({ _id: toObjectId(id) });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/post", upload.single("image"), async (req, res) => {
  try {
    const { title, author, category, description, content } = req.body || {};

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const blog = {
      title: title.trim(),
      author: author?.trim() || "Anonymous",
      category: category?.trim() || "General",
      description: description?.trim() || "",
      excerpt: excerptFrom(description, content),
      content: content.trim(),
      date: new Date(),
      comments: [],
    };

    if (req.file) {
      blog.image = `/uploads/${req.file.filename}`;
    }

    const result = await blogsCollection().insertOne(blog);
    const created = await blogsCollection().findOne({ _id: result.insertedId });
    res.status(201).json(created);
  } catch (error) {
    console.error(error);
    if (req.file) fs.unlink(req.file.path, () => {});
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid id" });

    const existing = await blogsCollection().findOne({ _id: toObjectId(id) });
    if (!existing) return res.status(404).json({ message: "Blog not found" });

    const { title, author, category, description, content } = req.body || {};
    const update = {
      updatedAt: new Date(),
    };

    if (title) update.title = title.trim();
    if (author) update.author = author.trim();
    if (category) update.category = category.trim();
    if (description !== undefined) update.description = description.trim();
    if (content) update.content = content.trim();
    if (description !== undefined || content) {
      update.excerpt = excerptFrom(
        description !== undefined ? description : existing.description,
        content || existing.content
      );
    }

    if (req.file) {
      if (existing.image && existing.image.startsWith("/uploads/")) {
        fs.unlink(path.join(__dirname, "..", existing.image), () => {});
      }
      update.image = `/uploads/${req.file.filename}`;
    }

    await blogsCollection().updateOne({ _id: toObjectId(id) }, { $set: update });
    const updated = await blogsCollection().findOne({ _id: toObjectId(id) });
    res.json(updated);
  } catch (error) {
    console.error(error);
    if (req.file) fs.unlink(req.file.path, () => {});
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, comment } = req.body || {};
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid id" });
    if (!name || !comment) return res.status(400).json({ error: "Name and comment are required" });

    await blogsCollection().updateOne(
      { _id: toObjectId(id) },
      { $push: { comments: { name: name.trim(), comment: comment.trim(), date: new Date() } } }
    );

    const updated = await blogsCollection().findOne({ _id: toObjectId(id) });
    if (!updated) return res.status(404).json({ message: "Blog not found" });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
