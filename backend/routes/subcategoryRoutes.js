const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const multer = require("multer");
const path = require("path");
const fs = require("fs");


router.get("/subcategories/related-subcategories/:subcatSlug", async (req, res) => {
  try {
    const { subcatSlug } = req.params;

    // 1. Find current subcategory
    const currentSub = await Subcategory.findOne({ slug: subcatSlug }).populate(
      "category",
      "name slug"
    );

    if (!currentSub) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    // 2. Find related subcategories from same category
    const relatedSubcategories = await Subcategory.find({
      category: currentSub.category._id,
      _id: { $ne: currentSub._id },
      isActive: true,
    }).select("name slug image hoverImage tag isFeatured");

    res.json({
      currentSubcategory: {
        _id: currentSub._id,
        name: currentSub.name,
        slug: currentSub.slug,
        image: currentSub.image,
        hoverImage: currentSub.hoverImage,
        tag: currentSub.tag,
        isFeatured: currentSub.isFeatured,
        category: currentSub.category,
      },
      relatedSubcategories,
    });
  } catch (err) {
    console.error("❌ Error fetching related subcategories:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * FETCH SUBCATEGORY + PRODUCTS
 * URL: /subcategory-fetch/:categorySlug/:subcategorySlug
 */
router.get("/subcategory-fetch/:categorySlug/:subcategorySlug", async (req, res) => {
  try {
    const { categorySlug, subcategorySlug } = req.params;

    // 1. Find category
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // 2. Find subcategory under this category
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
      return res.status(404).json({ error: "Subcategory not found" });
    }

    res.json({
      category: {
        _id: category._id,
        name: category.name,
        slug: category.slug,
      },
      subcategory: {
        _id: subcategory._id,
        name: subcategory.name,
        slug: subcategory.slug,
        description: subcategory.description,
        tag: subcategory.tag,
      },
      products: subcategory.products,
    });
  } catch (err) {
    console.error("❌ Error fetching subcategory:", err);
    res.status(500).json({ error: "Error fetching subcategory" });
  }
});



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/subcategories";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(
        file.originalname
      )}`
    );
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    if (ext) cb(null, true);
    else cb(new Error("Only image files allowed"));
  },
});

/* ==============================
   CREATE SUBCATEGORY
============================== */

router.post("/create", async (req, res) => {
  try {
    const { name, slug, description, image, category, seo } = req.body;

    if (!name || !slug || !category) {
      return res
        .status(400)
        .json({ message: "Name, slug and category are required" });
    }

    // Validate category
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const exists = await Subcategory.findOne({
      $or: [{ slug }, { name }],
      category,
    });

    if (exists) {
      return res.status(409).json({ message: "Subcategory already exists" });
    }

    const subcategory = await Subcategory.create({
      name,
      slug,
      description,
      image,
      category,
      seo: {
        metaTitle: seo?.metaTitle || "",
        metaDescription: seo?.metaDescription || "",
        keywords: seo?.keywords
          ? seo.keywords.split(",").map((k) => k.trim())
          : [],
      },
    });

    // Attach to category
    await Category.findByIdAndUpdate(category, {
      $addToSet: { subcategories: subcategory._id },
    });

    res.status(201).json(subcategory);
  } catch (err) {
    console.error("Create subcategory error:", err);
    res.status(500).json({ message: "Failed to create subcategory" });
  }
});

/* ==============================
   GET ALL SUBCATEGORIES
============================== */

router.get("/all", async (req, res) => {
  try {
    const subs = await Subcategory.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.json(subs);
  } catch (err) {
    console.error("Fetch subcategories error:", err);
    res.status(500).json({ message: "Failed to fetch subcategories" });
  }
});

/* ==============================
   UPDATE SUBCATEGORY
============================== */

router.put("/update/:id", async (req, res) => {
  try {
    const { name, slug, description, image, category, seo } = req.body;

    const updated = await Subcategory.findByIdAndUpdate(
      req.params.id,
      {
        name,
        slug,
        description,
        image,
        category,
        seo: {
          metaTitle: seo?.metaTitle || "",
          metaDescription: seo?.metaDescription || "",
          keywords: seo?.keywords
            ? seo.keywords.split(",").map((k) => k.trim())
            : [],
        },
      },
      { new: true }
    ).populate("category", "name");

    if (!updated) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Update subcategory error:", err);
    res.status(500).json({ message: "Failed to update subcategory" });
  }
});

/* ==============================
   DELETE SUBCATEGORY
============================== */

router.delete("/delete/:id", async (req, res) => {
  try {
    const sub = await Subcategory.findById(req.params.id);

    if (!sub) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    // Remove reference from category
    await Category.findByIdAndUpdate(sub.category, {
      $pull: { subcategories: sub._id },
    });

    await sub.deleteOne();

    res.json({ message: "Subcategory deleted" });
  } catch (err) {
    console.error("Delete subcategory error:", err);
    res.status(500).json({ message: "Failed to delete subcategory" });
  }
});

/* ==============================
   IMAGE UPLOAD
============================== */

router.post("/upload", upload.single("image"), (req, res) => {
  try {
    const imageUrl = `${process.env.BASE_URL}/${req.file.path.replace(
      /\\/g,
      "/"
    )}`;

    res.json({ url: imageUrl });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = router;
