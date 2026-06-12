const express = require("express");
const router = express.Router();

const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadsDir = path.join(__dirname, "..", "uploads", "subcategories");
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

const toKeywordList = (keywords) =>
  Array.isArray(keywords)
    ? keywords
    : String(keywords || "")
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean);

router.get("/subcategory-fetch/:categorySlug/:subcategorySlug", async (req, res) => {
  try {
    const { categorySlug, subcategorySlug } = req.params;

    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const subcategory = await Subcategory.findOne({
      slug: subcategorySlug,
      category: category._id,
    }).populate({
      path: "products",
      match: { isActive: true },
      select: "name slug price salePrice images stock ratings isFeatured seo category subcategory",
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
        image: subcategory.image,
        tag: subcategory.tag,
        seo: subcategory.seo,
      },
      products: subcategory.products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/subcategories/related-subcategories/:subcatSlug", async (req, res) => {
  try {
    const currentSub = await Subcategory.findOne({
      slug: req.params.subcatSlug,
    }).populate("category", "name slug");

    if (!currentSub) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const subcategories = await Subcategory.find()
      .populate("category", "name slug")
      .sort({ createdAt: -1 });

    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch subcategories" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { name, slug, description, image, category, seo } = req.body;

    if (!name || !slug || !category) {
      return res.status(400).json({ message: "Name, slug and category are required" });
    }

    const exists = await Subcategory.findOne({ slug, category });
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
        keywords: toKeywordList(seo?.keywords),
      },
    });

    await Category.findByIdAndUpdate(category, {
      $addToSet: { subcategories: subcategory._id },
    });

    res.status(201).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: "Failed to create subcategory" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const existing = await Subcategory.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    const { name, slug, description, image, category, seo } = req.body;
    const previousCategory = existing.category?.toString();

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
          keywords: toKeywordList(seo?.keywords),
        },
      },
      { new: true, runValidators: true }
    ).populate("category", "name slug");

    const nextCategory = updated.category?._id?.toString() || updated.category?.toString();
    if (previousCategory && previousCategory !== nextCategory) {
      await Category.findByIdAndUpdate(previousCategory, {
        $pull: { subcategories: updated._id },
      });
    }

    if (nextCategory) {
      await Category.findByIdAndUpdate(nextCategory, {
        $addToSet: { subcategories: updated._id },
      });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update subcategory" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id);
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    await Category.findByIdAndUpdate(subcategory.category, {
      $pull: { subcategories: subcategory._id },
    });
    await subcategory.deleteOne();

    res.json({ message: "Subcategory deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete subcategory" });
  }
});

router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({ url: `/uploads/subcategories/${req.file.filename}` });
});

module.exports = router;
