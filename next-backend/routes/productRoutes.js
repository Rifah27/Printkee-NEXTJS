const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const Product = require("../models/product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadsDir = path.join(__dirname, "..", "uploads", "products");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(uploadsDir, { recursive: true });
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "-");
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${safeName}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif|svg/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    cb(ext ? null : new Error("Only image files are allowed"), ext);
  },
});

router.get(
  "/product-fetch/:categorySlug/:subcategorySlug/:productSlug",
  async (req, res) => {
    try {
      const { categorySlug, subcategorySlug, productSlug } = req.params;

      const category = await Category.findOne({ slug: categorySlug });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      const subcategory = await Subcategory.findOne({
        slug: subcategorySlug,
        category: category._id,
      });
      if (!subcategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }

      const product = await Product.findOne({
        slug: productSlug,
        category: category._id,
        subcategory: subcategory._id,
        isActive: true,
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
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
        },
        product,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  "/related-products/:categorySlug/:subcategorySlug/:productSlug",
  async (req, res) => {
    try {
      const { categorySlug, subcategorySlug, productSlug } = req.params;

      const category = await Category.findOne({ slug: categorySlug });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      const subcategory = await Subcategory.findOne({
        slug: subcategorySlug,
        category: category._id,
      });
      if (!subcategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }

      const relatedProducts = await Product.find({
        category: category._id,
        subcategory: subcategory._id,
        slug: { $ne: productSlug },
        isActive: true,
      })
        .limit(8)
        .select("name slug price salePrice images ratings isFeatured category subcategory");

      res.json(relatedProducts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get("/all", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = (req.query.search || "").trim();
    const categoryFilter = req.query.category || "";
    const includeInactive = req.query.includeInactive === "true";

    const query = includeInactive ? {} : { isActive: true };
    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { slug: new RegExp(search, "i") },
        { sku: new RegExp(search, "i") },
        { tags: new RegExp(search, "i") },
      ];
    }

    if (categoryFilter) {
      const category = await Category.findOne({
        $or: [
          { slug: categoryFilter.toLowerCase() },
          { name: categoryFilter },
        ],
      }).lean();

      if (category) {
        query.category = category._id;
      }
    }

    const totalItems = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate("category", "name slug")
      .populate("subcategory", "name slug")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      items: products,
      page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name slug")
      .populate("subcategory", "name slug");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    await Subcategory.findByIdAndUpdate(product.subcategory, {
      $addToSet: { products: product._id },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const existing = await Product.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: "Product not found" });
    }

    const previousSubcategory = existing.subcategory?.toString();
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    const nextSubcategory = updated.subcategory?.toString();
    if (previousSubcategory && previousSubcategory !== nextSubcategory) {
      await Subcategory.findByIdAndUpdate(previousSubcategory, {
        $pull: { products: updated._id },
      });
    }

    if (nextSubcategory) {
      await Subcategory.findByIdAndUpdate(nextSubcategory, {
        $addToSet: { products: updated._id },
      });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Subcategory.findByIdAndUpdate(product.subcategory, {
      $pull: { products: product._id },
    });

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({ url: `/uploads/products/${req.file.filename}` });
});

module.exports = router;
