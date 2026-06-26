const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Product = require("../models/product");

router.get("/search", async (req, res) => {
  const keyword = req.query.q || "";
  const categoryFilter = req.query.cat || "All Categories";

  const regex = new RegExp(keyword, "i");
  const isCategoryFilterActive = categoryFilter && categoryFilter !== "All Categories";

  try {
    let category = null;
    if (isCategoryFilterActive) {
      category = await Category.findOne({
        $or: [
          { slug: categoryFilter.toLowerCase() },
          { name: categoryFilter },
        ],
      }).lean();
    }

    const query = { isActive: true };
    if (keyword) {
      query.$or = [
        { name: regex },
        { "description.short": regex },
        { "description.long": regex },
        { tags: regex },
        { "seo.keywords": regex },
      ];
    }

    if (category) {
      query.category = category._id;
    }

    const products = await Product.find(query)
      .populate({ path: "category", select: "name slug" })
      .populate({ path: "subcategory", select: "name slug" })
      .lean();

    const matchedProducts = products.map((product) => ({
      _id: product._id,
      name: product.name,
      slug: product.slug,
      description: product.description?.short || product.description?.long || "",
      image: product.images?.[0]?.url || product.image || "",
      price: product.price,
      salePrice: product.salePrice,
      category: product.category
        ? { name: product.category.name, slug: product.category.slug }
        : null,
      subcategory: product.subcategory
        ? { name: product.subcategory.name, slug: product.subcategory.slug }
        : null,
      tags: product.tags,
      keywords: product.seo?.keywords,
    }));

    res.json(matchedProducts);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;
