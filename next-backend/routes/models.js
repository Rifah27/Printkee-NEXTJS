const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
    subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" }],
  },
  { timestamps: true }
);

const subcategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    hoverImage: { type: String, default: "" },
    tag: { type: String, default: "" },
    isFeatured: { type: Boolean, default: false },
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: {
      short: String,
      long: String,
    },
    price: { type: Number, required: true },
    salePrice: { type: Number, default: null },
    images: [
      {
        url: String,
        altText: String,
      },
    ],
    subImages: [
      {
        url: String,
        altText: String,
      },
    ],
    stock: { type: Number, default: 0 },
    sku: { type: String, unique: true, sparse: true },
    attributes: {
      color: [String],
      size: [String],
      material: String,
    },
    additionalInfo: [
      {
        label: String,
        value: String,
      },
    ],
    specifications: [
      {
        key: String,
        value: String,
      },
    ],
    tags: [String],
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    ratings: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
  },
  { timestamps: true }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
const Subcategory =
  mongoose.models.Subcategory ||
  mongoose.model("Subcategory", subcategorySchema);
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = { Category, Subcategory, Product };
