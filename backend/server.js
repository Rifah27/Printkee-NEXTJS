require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const renderSEO = require("./utils/seoRenderer");

const Category = require("./models/Category");
const Subcategory = require("./models/Subcategory");
const Product = require("./models/product");
const Blog = require("./models/Blog");
const seoOverrides = require("./data/seoOverrides");

const app = express();

/* ==============================
   MIDDLEWARE
============================== */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ==============================
   DATABASE
============================== */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/* ==============================
   API ROUTES
============================== */

app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/visitors", require("./routes/visitor"));
app.use("/api", require("./routes/searchRoutes"));
app.use("/api", require("./routes/emailRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use("/api/subcategory", require("./routes/subcategoryRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/", require("./routes/sitemap"));


/* ======================================================
   HOME PAGE SSR
   /
====================================================== */

app.get("/", (req, res) => {
  const path = "/";
  const override = seoOverrides[path];

  const html = renderSEO({
    title: override?.title || "Printkee | Premium Corporate Gifts",
    description: override?.description || "Custom corporate gifting solutions across India.",
    canonical: `https://printkee.com${path}`,
    seoContent: "",
  });
  res.send(html);
});


/* ======================================================
   PRODUCT PAGE SSR
   /:category/:subcategory/:product
====================================================== */

app.get("/:category/:subcategory/:product", async (req, res) => {
  const path = `/${req.params.category}/${req.params.subcategory}/${req.params.product}`;
  const override = seoOverrides[path];

  try {
    const product = await Product.findOne({
      slug: req.params.product,
    }).lean();

    if (!product && !override) {
      const html = renderSEO({
        title: "Product Not Found | Printkee",
        description: "Explore our wide range of corporate gifts.",
        canonical: `https://printkee.com${path}`,
      });
      return res.send(html);
    }

    const title =
      override?.title || product?.seo?.metaTitle || `${product?.name} | Printkee`;

    const description =
      override?.description ||
      product?.seo?.metaDescription ||
      product?.description?.short ||
      "Premium corporate promotional products";

    const canonical = `https://printkee.com${path}`;

    const seoContent = product ? `
    <article class="seo-product">
    <h1>${product.name}</h1>
    <p>${product.description?.short || ""}</p>
    <h2>Product Details</h2>
    <ul>
    <li><strong>Price:</strong> ₹${product.price}</li>
    <li><strong>Material:</strong> ${product.attributes?.material || ""}</li>
    <li><strong>Color:</strong> ${product.attributes?.color || ""}</li>
    </ul>
    ${product.specifications
        ? `<h2>Specifications</h2>
           <ul>
           ${product.specifications.map((s) => `<li>${s.key}: ${s.value}</li>`).join("")}
           </ul>`
        : ""
      }
    <p>Buy ${product.name} with custom branding for corporate gifting.</p>
    </article>` : "";

    const html = renderSEO({
      title,
      description,
      canonical,
      seoContent,
    });

    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

/* ======================================================
   SUBCATEGORY PAGE SSR
   /:category/:subcategory
====================================================== */

app.get("/:category/:subcategory", async (req, res) => {
  const path = `/${req.params.category}/${req.params.subcategory}`;
  const override = seoOverrides[path];

  try {
    const subcategory = await Subcategory.findOne({
      slug: req.params.subcategory,
    }).lean();

    if (!subcategory && !override) {
      const html = renderSEO({
        title: "Collection | Printkee",
        description: "Explore our premium corporate gift collections.",
        canonical: `https://printkee.com${path}`,
      });
      return res.send(html);
    }

    const title =
      override?.title || subcategory?.seo?.metaTitle || `${subcategory?.name} | Printkee`;

    const description =
      override?.description || subcategory?.seo?.metaDescription || subcategory?.description || "";

    const canonical = `https://printkee.com${path}`;

    const seoContent = subcategory ? `
    <section class="seo-subcategory">
    <h1>${subcategory.name}</h1>
    <p>${subcategory.description}</p>
    <p>Explore high quality ${subcategory.name} for corporate branding.</p>
    <h2>Why Choose Us?</h2>
    <ul>
    <li>Premium quality materials</li>
    <li>Custom logo branding</li>
    <li>Bulk corporate orders</li>
    </ul>
    </section>` : "";

    const html = renderSEO({
      title,
      description,
      canonical,
      seoContent,
    });

    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

/* ======================================================
   CATEGORY PAGE SSR
   /:category
====================================================== */

app.get("/:category", async (req, res) => {
  const path = `/${req.params.category}`;
  const override = seoOverrides[path];

  try {
    const category = await Category.findOne({
      slug: req.params.category,
    }).lean();

    if (!category && !override) {
      const html = renderSEO({
        title: "Category | Printkee",
        description: "Premium corporate gifts for every occasion.",
        canonical: `https://printkee.com${path}`,
      });
      return res.send(html);
    }

    const title =
      override?.title || category?.seo?.metaTitle || `${category?.name} | Printkee`;

    const description =
      override?.description || category?.seo?.metaDescription || category?.description || "";

    const canonical = `https://printkee.com${path}`;

    const seoContent = category ? `
    <section class="seo-category">
    <h1>${category.name}</h1>
    <p>${category.description}</p>
    <p>Printkee offers premium ${category.name} for corporate gifting.</p>
    <h2>Popular Products</h2>
    <ul>
    <li>Custom Apparel</li>
    <li>Corporate Tech Accessories</li>
    <li>Employee Joining Kits</li>
    </ul>
    </section>` : "";

    const html = renderSEO({
      title,
      description,
      canonical,
      seoContent,
    });

    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

/* ==============================
   SERVE FRONTEND BUILD
============================== */

app.use(express.static(path.join(__dirname, "../frontend/dist")));

/* ======================================================
   BLOG PAGE SSR
   /blog/:id
====================================================== */

app.get("/blog/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).lean();

    if (!blog) {
      return res.sendFile(
        path.join(__dirname, "../frontend/dist/index.html")
      );
    }

    const title = blog.title;
    const description = blog.excerpt || blog.content.slice(0, 150);

    const canonical = `https://printkee.com/blog/${blog._id}`;

    const seoContent = `
    <article>

    <h1>${blog.title}</h1>

    <p>${blog.excerpt || ""}</p>

    </article>
    `;

    const html = renderSEO({
      title,
      description,
      canonical,
      seoContent,
    });

    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

/* ======================================================
   REACT ROUTER FALLBACK
====================================================== */

app.get(/(.*)/, (req, res) => {
  try {
    const html = renderSEO({
      title: "Printkee | Premium Corporate Gifts",
      description: "Customized promotional products and corporate gifting solutions.",
      canonical: `https://printkee.com${req.path}`,
    });
    res.send(html);
  } catch (err) {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  }
});

/* ==============================
   SERVER
============================== */

const PORT = process.env.PORT || 5030;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
