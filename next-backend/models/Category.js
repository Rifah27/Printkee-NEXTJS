const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    description: { type: String, default: "" },
    image: { type: String, default: "" },

    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },

    subcategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
