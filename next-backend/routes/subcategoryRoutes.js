const express = require("express");
const router = express.Router();

const { Category, Subcategory } = require("./models");

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

module.exports = router;
