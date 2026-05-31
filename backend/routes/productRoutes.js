const express = require("express");
const router = express.Router();

const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const Product = require("../models/product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");


router.get(
  "/product-fetch/:categorySlug/:subcategorySlug/:productSlug",
  async (req, res) => {
    const categorySlug = decodeURIComponent(req.params.categorySlug);
    const subcategorySlug = decodeURIComponent(req.params.subcategorySlug);
    const productSlug = decodeURIComponent(req.params.productSlug);

    try {
      // 1. Find category
      const category = await Category.findOne({ slug: categorySlug });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      // 2. Find subcategory under category
      const subcategory = await Subcategory.findOne({
        slug: subcategorySlug,
        category: category._id,
      });
      if (!subcategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }

      // 3. Find product under subcategory
      const product = await Product.findOne({
        slug: productSlug,
        category: category._id,
        subcategory: subcategory._id,
        isActive: true,
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // 4. Return structured response
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
        },
        product,
      });
    } catch (error) {
      console.error("❌ Error fetching product:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/**
 * RELATED PRODUCTS
 * URL:
 * /related-products/:categorySlug/:subcategorySlug/:productSlug
 */
router.get(
  "/related-products/:categorySlug/:subcategorySlug/:productSlug",
  async (req, res) => {
    const categorySlug = decodeURIComponent(req.params.categorySlug);
    const subcategorySlug = decodeURIComponent(req.params.subcategorySlug);
    const productSlug = decodeURIComponent(req.params.productSlug);

    try {
      // 1. Find category
      const category = await Category.findOne({ slug: categorySlug });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      // 2. Find subcategory
      const subcategory = await Subcategory.findOne({
        slug: subcategorySlug,
        category: category._id,
      });
      if (!subcategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }

      // 3. Fetch related products (exclude current product)
      const relatedProducts = await Product.find({
        category: category._id,
        subcategory: subcategory._id,
        slug: { $ne: productSlug },
        isActive: true,
      })
        .limit(8)
        .select(
          "name slug price salePrice images ratings isFeatured"
        );

      res.json(relatedProducts);
    } catch (err) {
      console.error("❌ Error fetching related products:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/products";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

/* ======================================================
   CREATE PRODUCT
====================================================== */
router.post("/create", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ======================================================
   UPDATE PRODUCT
====================================================== */
router.put("/update/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ======================================================
   DELETE PRODUCT
====================================================== */
router.delete("/delete/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ======================================================
   GET ALL PRODUCTS (PAGINATION + SEARCH)
====================================================== */
router.get("/all", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search || "";

    const query = search
      ? {
          $or: [
            { name: new RegExp(search, "i") },
            { slug: new RegExp(search, "i") },
            { sku: new RegExp(search, "i") },
            { tags: new RegExp(search, "i") },
          ],
        }
      : {};

    const total = await Product.countDocuments(query);

    const items = await Product.find(query)
      .populate("category", "name")
      .populate("subcategory", "name")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      items,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================================================
   GET SINGLE PRODUCT
====================================================== */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name")
      .populate("subcategory", "name");

    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================================================
   UPLOAD PRODUCT IMAGE
====================================================== */
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imageUrl = `${process.env.BASE_URL}/uploads/products/${req.file.filename}`;

  res.json({ url: imageUrl });
});

module.exports = router;
