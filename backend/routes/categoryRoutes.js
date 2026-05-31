const express = require("express");
const router = express.Router();

const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const multer = require("multer");
const path = require("path");
const fs = require("fs");


router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find({})
      .populate({
        path: "subcategories",
        select: "name slug image description seo",
      })
      .sort({ createdAt: 1 });

    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});


router.get("/categories/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await Category.findOne({ slug }).populate({
      path: "subcategories",
      select: "name slug image description seo",
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    console.error("Error fetching category:", err);
    res.status(500).json({ message: "Failed to fetch category" });
  }
});

/**
 * GET SUBCATEGORY BY CATEGORY SLUG + SUBCATEGORY SLUG
 * - Returns subcategory + products
 */
router.get("/categories/:slug/:subcategorySlug", async (req, res) => {
  try {
    const { slug, subcategorySlug } = req.params;

    // 1. Find category
    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // 2. Find subcategory belonging to that category
    const subcategory = await Subcategory.findOne({
      slug: subcategorySlug,
      category: category._id,
    }).populate({
      path: "products",
      match: { isActive: true },
      select:
        "name slug price salePrice images stock ratings isFeatured seo",
    });

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.json(subcategory);
  } catch (err) {
    console.error("Error fetching subcategory:", err);
    res.status(500).json({ message: "Failed to fetch subcategory" });
  }
});

/* ----------------------------------
   MULTER CONFIG (IMAGE UPLOAD)
---------------------------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/categories";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    if (ext) cb(null, true);
    else cb(new Error("Only images allowed"));
  },
});

/* ----------------------------------
   CREATE CATEGORY
---------------------------------- */
router.post("/create", async (req, res) => {
  try {
    const { name, slug, description, image, seo } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ message: "Name and slug are required" });
    }

    const exists = await Category.findOne({
      $or: [{ name }, { slug }],
    });

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
        keywords: seo?.keywords
          ? seo.keywords.split(",").map((k) => k.trim())
          : [],
      },
    });

    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create category" });
  }
});

/* ----------------------------------
   GET ALL CATEGORIES (ADMIN)
---------------------------------- */
router.get("/all", async (req, res) => {
  try {
    const categories = await Category.find()
      .sort({ createdAt: -1 })
      .populate("subcategories");

    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

/* ----------------------------------
   GET SINGLE CATEGORY (OPTIONAL)
---------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "subcategories"
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Error fetching category" });
  }
});

/* ----------------------------------
   UPDATE CATEGORY
---------------------------------- */
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
          keywords: seo?.keywords
            ? seo.keywords.split(",").map((k) => k.trim())
            : [],
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update category" });
  }
});

/* ----------------------------------
   DELETE CATEGORY
---------------------------------- */
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete category" });
  }
});

/* ----------------------------------
   IMAGE UPLOAD
---------------------------------- */
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    const imageUrl = `${process.env.BASE_URL}/${req.file.path.replace(/\\/g, "/")}`;
    res.json({ url: imageUrl });
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = router;
