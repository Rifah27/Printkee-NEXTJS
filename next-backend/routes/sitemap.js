const express = require("express");
const router = express.Router();

const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const Product = require("../models/product");
const Blog = require("../models/Blog");

router.get("/sitemap.xml", async (req, res) => {
  try {

    const base = "https://printkee.com";

    const categories = await Category.find().lean();

    const subcategories = await Subcategory.find()
      .populate("category")
      .lean();

    const products = await Product.find()
      .populate("category")
      .populate("subcategory")
      .lean();

    const blogs = await Blog.find().lean();

    let urls = [];

    urls.push(`${base}/`);
    urls.push(`${base}/about`);
    urls.push(`${base}/brands`);
    urls.push(`${base}/contact`);
    urls.push(`${base}/blogs`);


    categories.forEach(cat => {
      urls.push(`${base}/${cat.slug}`);
    });


    subcategories.forEach(sub => {
      if (sub.category) {
        urls.push(`${base}/${sub.category.slug}/${sub.slug}`);
      }
    });

    /* ---------- PRODUCT PAGES ---------- */

    products.forEach(prod => {
      if (prod.category && prod.subcategory) {
        urls.push(
          `${base}/${prod.category.slug}/${prod.subcategory.slug}/${prod.slug}`
        );
      }
    });

    /* ---------- BLOG PAGES ---------- */

    blogs.forEach(blog => {
      urls.push(`${base}/blog/${blog._id}`);
    });

    /* ---------- BUILD XML ---------- */

    let xml = `<?xml version="1.0" encoding="UTF-8"?>`;

    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    urls.forEach(url => {
      xml += `
      <url>
        <loc>${url}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`;
    });

    xml += `</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);

  } catch (err) {

    console.error(err);
    res.status(500).send("Error generating sitemap");

  }
});

module.exports = router;