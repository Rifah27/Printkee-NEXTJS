const corporateShirts = [
  {
    name: "Black Corporate Shirt",
    slug: "black-corporate-shirt",

    description: {
      short: "Slim-fit black corporate shirt.",
      long: "Classic slim-fit black corporate shirt made with premium cotton blend."
    },

    price: 899,
    salePrice: 799,

    images: [
      { url: "/assets/products/shirts/black (1).webp", altText: "Black Corporate Shirt" }
    ],
    subImages: [
      { url: "/assets/products/shirts/black (1).webp", altText: "Black Shirt View 1" },
      { url: "/assets/products/shirts/black (2).webp", altText: "Black Shirt View 2" },
      { url: "/assets/products/shirts/black (3).webp", altText: "Black Shirt View 3" },
      { url: "/assets/products/shirts/black (4).webp", altText: "Black Shirt View 4" }
    ],

    stock: 1000,
    sku: "SHIRT-M-BLACK",

    attributes: {
      color: ["Black"],
      size: ["S", "M", "L", "XL", "XXL"],
      material: "Cotton Blend"
    },

    specifications: [
      { key: "HSN Code", value: "61051000" },
      { key: "GST Rate", value: "5%" },
      { key: "Weight", value: "250g" }
    ],

    tags: ["black shirt", "formal shirt", "corporate shirt", "office wear", "slim fit"],

    isFeatured: true,
    isActive: true,

    ratings: { average: 4.6, count: 110 },

    seo: {
      metaTitle: "Black Corporate Shirts | Premium Slim Fit",
      metaDescription: "Elegant slim-fit black corporate shirts for office uniforms and branding.",
      keywords: ["corporate", "black", "formal", "shirt"]
    },

    category: null,
    subcategory: null
  },

  {
    name: "White Corporate Shirt",
    slug: "white-corporate-shirt",

    description: {
      short: "White formal corporate shirt.",
      long: "Crisp white formal shirt for corporate wear and office uniforms."
    },

    price: 899,
    salePrice: 799,

    images: [
      { url: "/assets/products/shirts/white (1).webp", altText: "White Corporate Shirt" }
    ],
    subImages: [
      { url: "/assets/products/shirts/white (1).webp", altText: "White Shirt View 1" },
      { url: "/assets/products/shirts/white (2).webp", altText: "White Shirt View 2" },
      { url: "/assets/products/shirts/white (3).webp", altText: "White Shirt View 3" },
      { url: "/assets/products/shirts/white (4).webp", altText: "White Shirt View 4" }
    ],

    stock: 950,
    sku: "SHIRT-M-WHITE",

    attributes: {
      color: ["White"],
      size: ["S", "M", "L", "XL", "XXL"],
      material: "Cotton"
    },

    specifications: [
      { key: "HSN Code", value: "61051000" },
      { key: "GST Rate", value: "5%" },
      { key: "Weight", value: "240g" }
    ],

    tags: ["white shirt", "formal shirt", "corporate shirt", "office wear"],

    isFeatured: true,
    isActive: true,

    ratings: { average: 4.5, count: 120 },

    seo: {
      metaTitle: "White Corporate Shirts | Premium Formal Wear",
      metaDescription: "Premium white corporate shirts ideal for office wear and uniforms.",
      keywords: ["corporate", "white", "formal", "shirt"]
    },

    category: null,
    subcategory: null
  },

  {
    name: "Purple Corporate Shirt",
    slug: "purple-corporate-shirt",

    description: {
      short: "Purple formal corporate shirt.",
      long: "Solid purple corporate shirt perfect for daily professional wear."
    },

    price: 899,
    salePrice: 799,

    images: [
      { url: "/assets/products/shirts/purple (1).webp", altText: "Purple Corporate Shirt" }
    ],
    subImages: [
      { url: "/assets/products/shirts/purple (1).webp", altText: "Purple Shirt View 1" },
      { url: "/assets/products/shirts/purple (2).webp", altText: "Purple Shirt View 2" },
      { url: "/assets/products/shirts/purple (3).webp", altText: "Purple Shirt View 3" },
      { url: "/assets/products/shirts/purple (4).webp", altText: "Purple Shirt View 4" }
    ],

    stock: 850,
    sku: "SHIRT-M-PURPLE",

    attributes: {
      color: ["Purple"],
      size: ["S", "M", "L", "XL", "XXL"],
      material: "Cotton Blend"
    },

    specifications: [
      { key: "HSN Code", value: "61051000" },
      { key: "GST Rate", value: "5%" },
      { key: "Weight", value: "245g" }
    ],

    tags: ["purple shirt", "formal shirt", "corporate shirt", "office wear"],

    isFeatured: false,
    isActive: true,

    ratings: { average: 4.4, count: 90 },

    seo: {
      metaTitle: "Purple Corporate Shirts | Office Wear",
      metaDescription: "Stylish purple corporate shirts for professional environments.",
      keywords: ["corporate", "purple", "formal", "shirt"]
    },

    category: null,
    subcategory: null
  },

  {
    name: "Navy Corporate Shirt",
    slug: "navy-corporate-shirt",

    description: {
      short: "Navy slim-fit corporate shirt.",
      long: "Professional navy corporate shirt with a modern slim fit."
    },

    price: 899,
    salePrice: 799,

    images: [
      { url: "/assets/products/shirts/navy (1).webp", altText: "Navy Corporate Shirt" }
    ],
    subImages: [
      { url: "/assets/products/shirts/navy (1).webp", altText: "Navy Shirt View 1" },
      { url: "/assets/products/shirts/navy (2).webp", altText: "Navy Shirt View 2" },
      { url: "/assets/products/shirts/navy (3).webp", altText: "Navy Shirt View 3" },
      { url: "/assets/products/shirts/navy (4).webp", altText: "Navy Shirt View 4" }
    ],

    stock: 800,
    sku: "SHIRT-M-NAVY",

    attributes: {
      color: ["Navy"],
      size: ["S", "M", "L", "XL", "XXL"],
      material: "Cotton Blend"
    },

    specifications: [
      { key: "HSN Code", value: "61051000" },
      { key: "GST Rate", value: "5%" },
      { key: "Weight", value: "250g" }
    ],

    tags: ["navy shirt", "formal shirt", "corporate shirt", "office wear"],

    isFeatured: false,
    isActive: true,

    ratings: { average: 4.3, count: 85 },

    seo: {
      metaTitle: "Navy Corporate Shirts | Professional Office Wear",
      metaDescription: "Classic navy corporate shirts ideal for professional work environments.",
      keywords: ["corporate", "navy", "formal", "shirt"]
    },

    category: null,
    subcategory: null
  }
];

module.exports = corporateShirts;
