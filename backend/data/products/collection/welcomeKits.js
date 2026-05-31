const welcomeKits = [

/* ================= PRODUCT 1 ================= */

{
  name: "Premium Corporate Welcome Kit",
  slug: "premium-corporate-welcome-kit",
  description: {
    short: "Premium corporate welcome kit for employee onboarding.",
    long: "Premium corporate welcome kit designed for new employee onboarding, HR corporate gifting, and brand identity enhancement. Includes notebook, metal pen, sipper bottle, ID card set, and premium box packaging."
  },
  price: 1499,
  salePrice: 1399,
  images: [
    { url: "/assets/products/welcomekits/1.webp", altText: "Premium Corporate Welcome Kit" }
  ],
  subImages: [
    { url: "/assets/products/welcomekits/2.webp", altText: "Welcome Kit Contents" },
    { url: "/assets/products/welcomekits/3.webp", altText: "Premium Kit Packaging" },
    { url: "/assets/products/welcomekits/4.webp", altText: "Corporate Branding View" }
  ],
  stock: 400,
  sku: "WELCOME-KIT-PREMIUM",
  attributes: {
    color: ["Black"],
    size: ["Standard Kit"],
    material: "Mixed Materials"
  },
  specifications: [
    { key: "HSN Code", value: "48201000" },
    { key: "GST Rate", value: "18%" }
  ],
  tags: [
    "employee welcome kit",
    "corporate onboarding kit",
    "HR joining kit",
    "custom branded welcome box"
  ],
  isFeatured: true,
  isActive: true,
  ratings: { average: 4.8, count: 140 },
  seo: {
    metaTitle: "Premium Corporate Welcome Kit | Employee Onboarding Kits India",
    metaDescription: "Premium corporate welcome kit with branding options for employee onboarding & HR gifting.",
    keywords: [
      "premium welcome kit",
      "employee onboarding package",
      "corporate HR kit"
    ]
  },
  category: null,
  subcategory: null
},

/* ================= PRODUCT 2 ================= */

{
  name: "Essential Employee Welcome Kit",
  slug: "essential-employee-welcome-kit",
  description: {
    short: "Essential welcome kit for employee onboarding.",
    long: "Essential new employee welcome kit perfect for HR onboarding, training sessions, and company induction programs."
  },
  price: 899,
  salePrice: 849,
  images: [
    { url: "/assets/products/welcomekits/5.webp", altText: "Essential Employee Welcome Kit" }
  ],
  subImages: [
    { url: "/assets/products/welcomekits/6.webp", altText: "Essential Kit Contents" },
    { url: "/assets/products/welcomekits/7.webp", altText: "Essential Kit Packaging" }
  ],
  stock: 500,
  sku: "WELCOME-KIT-ESSENTIAL",
  attributes: {
    color: ["Blue"],
    size: ["Standard Kit"],
    material: "Mixed Materials"
  },
  tags: [
    "essential welcome kit",
    "employee joining kit",
    "business onboarding pack"
  ],
  isFeatured: true,
  isActive: true,
  ratings: { average: 4.7, count: 115 },
  seo: {
    metaTitle: "Essential Employee Welcome Kit | Custom HR Kits India",
    metaDescription: "Essential employee welcome kit with notebook & pen for onboarding and training programs.",
    keywords: [
      "employee welcome set",
      "corporate onboarding",
      "custom HR kits India"
    ]
  },
  category: null,
  subcategory: null
},

/* ================= PRODUCT 3 ================= */

{
  name: "Basic Corporate Welcome Kit",
  slug: "basic-corporate-welcome-kit",
  description: {
    short: "Budget-friendly corporate welcome kit.",
    long: "Budget-friendly corporate welcome kit ideal for startups, interns, training batches, and mass onboarding requirements."
  },
  price: 399,
  salePrice: 369,
  images: [
    { url: "/assets/products/welcomekits/8.webp", altText: "Basic Corporate Welcome Kit" }
  ],
  subImages: [
    { url: "/assets/products/welcomekits/9.webp", altText: "Basic Kit Contents" }
  ],
  stock: 700,
  sku: "WELCOME-KIT-BASIC",
  attributes: {
    color: ["Brown"],
    size: ["Basic Kit"],
    material: "Mixed Materials"
  },
  tags: [
    "basic welcome kit",
    "startup joining kit",
    "intern onboarding kit"
  ],
  isFeatured: false,
  isActive: true,
  ratings: { average: 4.4, count: 85 },
  seo: {
    metaTitle: "Basic Corporate Welcome Kit | Affordable HR Kits India",
    metaDescription: "Affordable corporate welcome kits for startups, interns & mass onboarding.",
    keywords: [
      "budget welcome kit",
      "startup onboarding kit",
      "cheap welcome kits India"
    ]
  },
  category: null,
  subcategory: null
},

/* ================= PRODUCT 4 ================= */

{
  name: "Executive Employee Welcome Kit",
  slug: "executive-employee-welcome-kit",
  description: {
    short: "Executive-level welcome kit for senior hires.",
    long: "Executive level welcome kit designed for senior hires, leadership teams, and premium employee onboarding."
  },
  price: 1699,
  salePrice: 1599,
  images: [
    { url: "/assets/products/welcomekits/10.webp", altText: "Executive Employee Welcome Kit" }
  ],
  subImages: [
    { url: "/assets/products/welcomekits/11.webp", altText: "Executive Kit Contents" },
    { url: "/assets/products/welcomekits/12.webp", altText: "Executive Packaging" }
  ],
  stock: 300,
  sku: "WELCOME-KIT-EXECUTIVE",
  attributes: {
    color: ["Black"],
    size: ["Executive Kit"],
    material: "Premium Materials"
  },
  tags: [
    "executive welcome kit",
    "premium client kit",
    "luxury employee onboarding"
  ],
  isFeatured: true,
  isActive: true,
  ratings: { average: 4.9, count: 70 },
  seo: {
    metaTitle: "Executive Employee Welcome Kit | Premium Corporate Gifts India",
    metaDescription: "Premium executive welcome kit for senior hires & corporate leadership gifting.",
    keywords: [
      "executive corporate kit",
      "high-end welcome kit",
      "premium onboarding India"
    ]
  },
  category: null,
  subcategory: null
},

/* ================= PRODUCT 5 ================= */

{
  name: "Eco-Friendly Welcome Kit",
  slug: "eco-friendly-welcome-kit",
  description: {
    short: "Sustainable eco-friendly corporate welcome kit.",
    long: "Environment-friendly welcome kit made using sustainable materials for CSR events and eco-conscious corporate gifting."
  },
  price: 549,
  salePrice: 529,
  images: [
    { url: "/assets/products/welcomekits/13.webp", altText: "Eco-Friendly Welcome Kit" }
  ],
  subImages: [
    { url: "/assets/products/welcomekits/14.webp", altText: "Eco Kit Contents" }
  ],
  stock: 450,
  sku: "WELCOME-KIT-ECO",
  attributes: {
    color: ["Brown"],
    size: ["Eco Kit"],
    material: "Eco-Friendly Materials"
  },
  tags: [
    "eco-friendly welcome kit",
    "sustainable corporate kit",
    "CSR gift set"
  ],
  isFeatured: false,
  isActive: true,
  ratings: { average: 4.6, count: 92 },
  seo: {
    metaTitle: "Eco-Friendly Corporate Welcome Kit | Sustainable Onboarding Kits",
    metaDescription: "Eco-friendly employee welcome kits using bamboo & recycled materials.",
    keywords: [
      "eco-friendly corporate kit",
      "sustainable gifting India",
      "green welcome kit"
    ]
  },
  category: null,
  subcategory: null
}

];

module.exports = welcomeKits;
