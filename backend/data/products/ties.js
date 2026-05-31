const ties = [
  {
    name: "Classic Silk Tie",
    slug: "classic-silk-tie",
    description: {
      short: "Elegant premium silk tie.",
      long: "Elegant silk tie with premium finish, perfect for corporate uniforms and branding."
    },
    price: 699,
    salePrice: 599,
    images: [{ url: "/assets/products/ties/tie (1).webp", altText: "Classic Silk Tie" }],
    subImages: [],
    stock: 1000,
    sku: "TIE-M-SILK",
    attributes: {
      color: ["Navy Blue"],
      size: ["Standard"],
      material: "100% Silk"
    },
    specifications: [
      { key: "HSN Code", value: "62159090" },
      { key: "GST Rate", value: "5%" },
      { key: "Weight", value: "120g" }
    ],
    tags: ["silk tie","premium tie","corporate tie","branded silk tie"],
    isFeatured: true,
    isActive: true,
    ratings: { average: 4.6, count: 110 },
    seo: {
      metaTitle: "Custom Silk Ties | Premium Corporate Wear",
      metaDescription: "Elegant silk ties for corporate uniforms, events, and branding with custom logo options.",
      keywords: ["tie","silk","corporate","premium"]
    },
    category: null,
    subcategory: null
  },

  {
    name: "Formal Cotton Tie",
    slug: "formal-cotton-tie",
    description: {
      short: "Lightweight cotton office tie.",
      long: "Comfortable cotton tie, lightweight and ideal for daily office wear."
    },
    price: 499,
    salePrice: 429,
    images: [{ url: "/assets/products/ties/tie (2).webp", altText: "Formal Cotton Tie" }],
    subImages: [],
    stock: 800,
    sku: "TIE-M-COTTON",
    attributes: {
      color: ["Black"],
      size: ["Standard"],
      material: "Cotton Blend"
    },
    tags: ["cotton tie","formal tie","office wear tie","branded tie"],
    isFeatured: false,
    isActive: true,
    ratings: { average: 4.3, count: 90 },
    seo: {
      metaTitle: "Formal Cotton Ties | Daily Office Wear",
      metaDescription: "Lightweight cotton ties designed for everyday office wear and corporate use.",
      keywords: ["tie","cotton","formal","corporate"]
    },
    category: null,
    subcategory: null
  },

  {
    name: "Polyester Corporate Tie",
    slug: "polyester-corporate-tie",
    description: {
      short: "Durable polyester corporate tie.",
      long: "Durable polyester tie suitable for bulk corporate orders and uniforms."
    },
    price: 399,
    salePrice: 349,
    images: [{ url: "/assets/products/ties/tie (3).webp", altText: "Polyester Corporate Tie" }],
    subImages: [],
    stock: 1500,
    sku: "TIE-M-POLY",
    attributes: {
      color: ["Grey"],
      size: ["Standard"],
      material: "Polyester"
    },
    tags: ["polyester tie","bulk order tie","corporate tie","uniform tie"],
    isFeatured: true,
    isActive: true,
    ratings: { average: 4.1, count: 75 },
    seo: {
      metaTitle: "Polyester Corporate Ties | Durable & Affordable",
      metaDescription: "Durable polyester ties designed for uniforms and bulk corporate orders.",
      keywords: ["tie","polyester","bulk","corporate"]
    },
    category: null,
    subcategory: null
  },

  {
    name: "Striped Office Tie",
    slug: "striped-office-tie",
    description: {
      short: "Professional striped office tie.",
      long: "Stylish striped tie with a professional look, ideal for formal events."
    },
    price: 549,
    salePrice: 489,
    images: [{ url: "/assets/products/ties/tie (4).webp", altText: "Striped Office Tie" }],
    subImages: [],
    stock: 900,
    sku: "TIE-M-STRIPE",
    attributes: {
      color: ["Blue-White Stripes"],
      size: ["Standard"],
      material: "Polyester Silk Blend"
    },
    tags: ["striped tie","office tie","formal striped tie","branded tie"],
    isFeatured: false,
    isActive: true,
    ratings: { average: 4.4, count: 105 },
    seo: {
      metaTitle: "Striped Office Ties | Stylish Corporate Wear",
      metaDescription: "Professional striped ties perfect for office meetings and formal occasions.",
      keywords: ["tie","striped","office","formal"]
    },
    category: null,
    subcategory: null
  },

  {
    name: "Red Power Tie",
    slug: "red-power-tie",
    description: {
      short: "Bold red executive tie.",
      long: "Bold red tie symbolizing power and confidence, great for leadership events."
    },
    price: 649,
    salePrice: 589,
    images: [{ url: "/assets/products/ties/tie (5).webp", altText: "Red Power Tie" }],
    subImages: [],
    stock: 700,
    sku: "TIE-M-RED",
    attributes: {
      color: ["Red"],
      size: ["Standard"],
      material: "Silk Blend"
    },
    tags: ["red tie","power tie","formal red tie","executive tie"],
    isFeatured: true,
    isActive: true,
    ratings: { average: 4.8, count: 160 },
    seo: {
      metaTitle: "Red Power Ties | Executive Formal Wear",
      metaDescription: "Premium red ties for executives and leaders, symbolizing authority and style.",
      keywords: ["tie","red","power","executive"]
    },
    category: null,
    subcategory: null
  },

  {
    name: "Royal Blue Tie",
    slug: "royal-blue-tie",
    description: {
      short: "Elegant royal blue tie.",
      long: "Premium royal blue tie, versatile for both office and special occasions."
    },
    price: 599,
    salePrice: 539,
    images: [{ url: "/assets/products/ties/tie (6).webp", altText: "Royal Blue Tie" }],
    subImages: [],
    stock: 950,
    sku: "TIE-M-BLUE",
    attributes: {
      color: ["Royal Blue"],
      size: ["Standard"],
      material: "Silk"
    },
    tags: ["blue tie","royal blue tie","corporate blue tie","formal tie"],
    isFeatured: true,
    isActive: true,
    ratings: { average: 4.5, count: 125 },
    seo: {
      metaTitle: "Royal Blue Ties | Stylish Corporate Wear",
      metaDescription: "Royal blue ties crafted for professionals, offering elegance and versatility.",
      keywords: ["tie","blue","royal","corporate"]
    },
    category: null,
    subcategory: null
  },

  {
    name: "Corporate Tie Gift Set",
    slug: "corporate-tie-gift-set",
    description: {
      short: "Premium corporate gifting tie set.",
      long: "Premium gift set including tie, cufflinks, and pocket square for corporate gifting."
    },
    price: 1499,
    salePrice: 1299,
    images: [{ url: "/assets/products/ties/tie (7).webp", altText: "Corporate Tie Gift Set" }],
    subImages: [],
    stock: 500,
    sku: "TIE-M-GIFTSET",
    attributes: {
      color: ["Assorted"],
      size: ["Standard"],
      material: "Silk Blend"
    },
    tags: ["tie gift set","corporate gifting","cufflink tie set","branded gift set"],
    isFeatured: true,
    isActive: true,
    ratings: { average: 4.9, count: 180 },
    seo: {
      metaTitle: "Corporate Tie Gift Sets | Premium Gifting",
      metaDescription: "Elegant tie gift sets including cufflinks and pocket squares, perfect for corporate gifting.",
      keywords: ["tie","gift set","corporate","premium"]
    },
    category: null,
    subcategory: null
  }
];

module.exports = ties;
