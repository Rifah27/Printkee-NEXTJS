const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadsDir = path.join(__dirname, "..", "uploads", "categories");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      fs.mkdirSync(uploadsDir, { recursive: true });
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "-");
      cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${safeName}`);
    },
  }),
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find({})
      .populate({
        path: "subcategories",
        select: "name slug image description seo tag isFeatured",
      })
      .sort({ createdAt: 1 });

    res.json(categories);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/categories/:slug", async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug }).populate({
      path: "subcategories",
      select: "name slug image description seo tag isFeatured",
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const categories = await Category.find()
      .sort({ createdAt: -1 })
      .populate("subcategories", "name slug image description seo");

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { name, slug, description, image, seo } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ message: "Name and slug are required" });
    }

    const exists = await Category.findOne({ $or: [{ name }, { slug }] });
    if (exists) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const category = await Category.create({
      name,
      slug,
      description,
      image,
      seo: {
        metaTitle: seo?.metaTitle || "",
        metaDescription: seo?.metaDescription || "",
        keywords: Array.isArray(seo?.keywords)
          ? seo.keywords
          : String(seo?.keywords || "")
              .split(",")
              .map((keyword) => keyword.trim())
              .filter(Boolean),
      },
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Failed to create category" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { name, slug, description, image, seo } = req.body;

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
        slug,
        description,
        image,
        seo: {
          metaTitle: seo?.metaTitle || "",
          metaDescription: seo?.metaDescription || "",
          keywords: Array.isArray(seo?.keywords)
            ? seo.keywords
            : String(seo?.keywords || "")
                .split(",")
                .map((keyword) => keyword.trim())
                .filter(Boolean),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update category" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category" });
  }
});

router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({ url: `/uploads/categories/${req.file.filename}` });
});

module.exports = router;
