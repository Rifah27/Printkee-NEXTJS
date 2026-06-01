const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    slug: {
      type: String,
      required: true,
      lowercase: true,
    },

    description: { type: String, default: "" },
    image: { type: String, default: "" },

    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },

    products: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
    ],

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subcategory", subCategorySchema);
