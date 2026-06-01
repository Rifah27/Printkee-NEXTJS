const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

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

module.exports = router;
