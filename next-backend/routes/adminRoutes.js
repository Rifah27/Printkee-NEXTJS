const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Product = require("../models/product");
const Subcategory = require("../models/Subcategory");

const createToken = (email) =>
  Buffer.from(`${email}:${Date.now()}:vorixa-admin`).toString("base64url");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@vorixa.com" && password === "mfvorixa") {
    return res.json({
      token: createToken(email),
      user: { email },
    });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

router.get("/stats", async (req, res) => {
  try {
    const [products, categories, subcategories] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Subcategory.countDocuments(),
    ]);

    res.json({
      products,
      categories,
      subcategories,
      visitors: 0,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
});

module.exports = router;
