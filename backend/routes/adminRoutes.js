const express = require('express');
require ("dotenv").config();
const jwt = require('jsonwebtoken');
const router = express.Router();
const Product = require("../models/product");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const Visitor = require("../models/Visitor");

const SECRET_KEY = process.env.JWT_SECRET;

router.post("/login", (req, res) => {
  console.log("🔐 Login request received:", req.body);

  const { email, password } = req.body;

  if (email === "admin@printkee.com" && password === "mfprintkee") {
    if (!SECRET_KEY) {
      console.error("❌ JWT_SECRET is undefined!");
      return res.status(500).json({ message: "Server misconfiguration" });
    }

    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ token, user: { email } });
  }

  res.status(401).json({ message: "Invalid credentials" });
});



/* ---------------------------------------
   ADMIN DASHBOARD STATS
---------------------------------------- */
router.get("/stats", async (req, res) => {
  try {
    const [
      productCount,
      categoryCount,
      subcategoryCount,
      visitorDocs,
    ] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Subcategory.countDocuments(),
      Visitor.find({}, { count: 1 }),
    ]);

    // Sum total visitors from daily records
    const totalVisitors = visitorDocs.reduce(
      (sum, day) => sum + (day.count || 0),
      0
    );

    res.json({
      products: productCount,
      categories: categoryCount,
      subcategories: subcategoryCount,
      visitors: totalVisitors,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
});

module.exports = router;
