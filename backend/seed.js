// seedCategories.js
require("dotenv").config();
const mongoose = require("mongoose");

const Category = require("./models/Category");
const Subcategory = require("./models/Subcategory");
const Product = require("./models/product");

const categoryData = require("./data/categoryData");

async function seedDatabase() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✔ Connected");

    console.log("🗑 Clearing existing data...");
    await Product.deleteMany({});
    await Subcategory.deleteMany({});
    await Category.deleteMany({});

    console.log("📥 Seeding categories...");
    
    for (const categoryItem of categoryData) {
      /* ================= CATEGORY ================= */
      const category = await Category.create({
        name: categoryItem.name,
        slug: categoryItem.slug,
        description: categoryItem.description || "",
        image: categoryItem.image || "",
        seo: categoryItem.seo || {},
        subcategories: [],
      });

      /* ================= SUBCATEGORIES ================= */
      for (const subItem of categoryItem.subcategories || []) {
        const subcategory = await Subcategory.create({
          name: subItem.name,
          slug: subItem.slug,
          description: subItem.description || "",
          image: subItem.image || "",
          seo: subItem.seo || {},
          category: category._id,
          products: [],
        });

        /* ================= PRODUCTS ================= */
        for (const productItem of subItem.products || []) {
          const product = await Product.create({
            ...productItem,
            category: category._id,
            subcategory: subcategory._id,
          });

          subcategory.products.push(product._id);
        }

        await subcategory.save();
        category.subcategories.push(subcategory._id);
      }

      await category.save();
    }

    console.log("🎉 Categories, Subcategories & Products Seeded Successfully!");

    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedDatabase();
