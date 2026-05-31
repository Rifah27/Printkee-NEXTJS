const express = require("express");
const router = express.Router();
const { Category, Subcategory, Product } = require("./models");

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

    const query = { isActive: true };
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

module.exports = router;
