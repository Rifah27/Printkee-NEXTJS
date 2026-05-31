const aprons = [
  {
    name: "Kitchen Apron",
    slug: "kitchen-apron",

    description: {
      short: "Durable kitchen apron with print.",
      long: "Durable kitchen apron with print, perfect for cooking and food preparation."
    },

    price: 499,
    salePrice: 449,

    images: [{ url: "/assets/products/aprons/apron (1).webp", altText: "Kitchen Apron" }],
    subImages: [{ url: "/assets/products/aprons/apron (1).webp", altText: "Kitchen Apron Side" }],

    stock: 500,
    sku: "APRON-KITCHEN",

    attributes: {
      color: ["Multi-color"],
      size: ["One Size"],
      material: "Polyester Cotton Blend"
    },

    specifications: [
      { key: "HSN Code", value: "62113290" },
      { key: "GST Rate", value: "12%" },
      { key: "Weight", value: "200g" },
      { key: "Dimensions", value: "80 x 70 cm" }
    ],

    tags: ["kitchen apron", "printed apron", "custom apron", "branded kitchen apron"],

    isFeatured: true,
    isActive: true,

    ratings: { average: 4.5, count: 85 },

    seo: {
      metaTitle: "Kitchen Aprons | Durable Printed Aprons",
      metaDescription: "High-quality kitchen aprons perfect for cooking and food preparation.",
      keywords: ["kitchen", "apron", "cooking", "chef"]
    },

    category: null,
    subcategory: null
  },

  {
    name: "Canvas Apron",
    slug: "canvas-apron",

    description: {
      short: "Heavy-duty canvas apron.",
      long: "Heavy-duty canvas apron for industrial and workshop use."
    },

    price: 599,
    salePrice: 549,

    images: [{ url: "/assets/products/aprons/apron (2).webp", altText: "Canvas Apron" }],
    subImages: [{ url: "/assets/products/aprons/apron (2).webp", altText: "Canvas Apron Side" }],

    stock: 450,
    sku: "APRON-CANVAS",

    attributes: {
      color: ["Brown"],
      size: ["One Size"],
      material: "Canvas"
    },

    specifications: [
      { key: "HSN Code", value: "62113290" },
      { key: "GST Rate", value: "12%" },
      { key: "Weight", value: "350g" }
    ],

    tags: ["canvas apron", "heavy-duty apron", "industrial apron"],

    isFeatured: true,
    isActive: true,

    ratings: { average: 4.7, count: 92 },

    seo: {
      metaTitle: "Canvas Aprons | Heavy-Duty Work Aprons",
      metaDescription: "Durable canvas aprons for industrial and workshop environments.",
      keywords: ["canvas", "apron", "industrial", "workshop"]
    },

    category: null,
    subcategory: null
  },

  {
    name: "Bib Apron",
    slug: "bib-apron",

    description: {
      short: "Classic full-coverage bib apron.",
      long: "Classic bib apron with full coverage for professional chefs."
    },

    price: 549,
    salePrice: 499,

    images: [{ url: "/assets/products/aprons/apron (3).webp", altText: "Bib Apron" }],
    subImages: [{ url: "/assets/products/aprons/apron (3).webp", altText: "Bib Apron Side" }],

    stock: 400,
    sku: "APRON-BIB",

    attributes: {
      color: ["Black"],
      size: ["One Size"],
      material: "Cotton Blend"
    },

    tags: ["bib apron", "chef apron", "professional apron"],

    isFeatured: false,
    isActive: true,

    ratings: { average: 4.6, count: 78 },

    seo: {
      metaTitle: "Bib Aprons | Professional Chef Aprons",
      metaDescription: "Classic bib aprons offering full coverage for professional chefs.",
      keywords: ["bib", "apron", "chef", "professional"]
    },

    category: null,
    subcategory: null
  },

  {
    name: "Waist Apron",
    slug: "waist-apron",

    description: {
      short: "Compact waist apron.",
      long: "Convenient waist apron for servers and bartenders."
    },

    price: 399,
    salePrice: 359,

    images: [{ url: "/assets/products/aprons/apron (4).webp", altText: "Waist Apron" }],
    subImages: [{ url: "/assets/products/aprons/apron (4).webp", altText: "Waist Apron Side" }],

    stock: 480,
    sku: "APRON-WAIST",

    attributes: {
      color: ["Black"],
      size: ["One Size"],
      material: "Polyester"
    },

    tags: ["waist apron", "server apron", "bartender apron"],

    isFeatured: false,
    isActive: true,

    ratings: { average: 4.4, count: 65 },

    seo: {
      metaTitle: "Waist Aprons | Server and Bartender Aprons",
      metaDescription: "Convenient waist aprons perfect for servers and bartenders.",
      keywords: ["waist", "apron", "server", "bartender"]
    },

    category: null,
    subcategory: null
  },

  {
    name: "Custom Printed Apron",
    slug: "custom-printed-apron",

    description: {
      short: "Personalized branded apron.",
      long: "Personalized apron with custom printing for branding purposes."
    },

    price: 649,
    salePrice: 599,

    images: [{ url: "/assets/products/aprons/apron (5).webp", altText: "Custom Printed Apron" }],
    subImages: [{ url: "/assets/products/aprons/apron (5).webp", altText: "Custom Printed Apron Side" }],

    stock: 600,
    sku: "APRON-CUSTOM",

    attributes: {
      color: ["White"],
      size: ["One Size"],
      material: "Polyester Cotton"
    },

    tags: ["custom apron", "printed apron", "branded apron"],

    isFeatured: true,
    isActive: true,

    ratings: { average: 4.8, count: 120 },

    seo: {
      metaTitle: "Custom Printed Aprons | Branded Aprons",
      metaDescription: "Personalized aprons with custom printing for effective branding.",
      keywords: ["custom", "printed", "apron", "branding"]
    },

    category: null,
    subcategory: null
  },

  {
    name: "Disposable Apron",
    slug: "disposable-apron",

    description: {
      short: "Hygienic disposable apron.",
      long: "Hygienic disposable apron for medical and food industry use."
    },

    price: 49,
    salePrice: 45,

    images: [{ url: "/assets/products/aprons/apron (6).webp", altText: "Disposable Apron" }],
    subImages: [{ url: "/assets/products/aprons/apron (6).webp", altText: "Disposable Apron Side" }],

    stock: 1000,
    sku: "APRON-DISPOSABLE",

    attributes: {
      color: ["Blue"],
      size: ["One Size"],
      material: "Polypropylene"
    },

    tags: ["disposable apron", "medical apron", "hygienic apron"],

    isFeatured: false,
    isActive: true,

    ratings: { average: 4.2, count: 150 },

    seo: {
      metaTitle: "Disposable Aprons | Medical and Food Industry Aprons",
      metaDescription: "Hygienic disposable aprons for medical and food industry applications.",
      keywords: ["disposable", "apron", "medical", "hygienic"]
    },

    category: null,
    subcategory: null
  }
];

module.exports = aprons;
