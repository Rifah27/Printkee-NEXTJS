const hats = [
  {
    name: "Reversible Bucket Hat",
    slug: "reversible-bucket-hat",

    description: {
      short: "Reversible bucket hat for sun protection.",
      long: "Reversible bucket hat for sun protection with custom branding options."
    },

    price: 399,
    salePrice: 349,

    images: [
      { url: "/assets/products/hats/hats (1).webp", altText: "Reversible Bucket Hat" }
    ],
    subImages: [],

    stock: 500,
    sku: "HAT-BUCKET-REV",

    attributes: {
      color: ["Navy/White", "Black/Grey", "Blue/Beige"],
      size: ["One Size"],
      material: "Polyester-Cotton Blend"
    },

    specifications: [
      { key: "HSN Code", value: "65050000" },
      { key: "GST Rate", value: "12%" },
      { key: "Weight", value: "120g" }
    ],

    tags: [
      "bucket hat",
      "reversible hat",
      "custom branded hat",
      "sun protection hat",
      "promotional hat"
    ],

    isFeatured: true,
    isActive: true,

    ratings: { average: 4.4, count: 78 },

    seo: {
      metaTitle: "Custom Reversible Bucket Hats | Branded Sun Protection Hats",
      metaDescription:
        "Premium reversible bucket hats perfect for sun protection with custom branding options for events and promotions.",
      keywords: ["bucket", "reversible", "sun protection", "custom"]
    },

    category: null,
    subcategory: null
  },

  {
    name: "Classic Baseball Cap",
    slug: "classic-baseball-cap",

    description: {
      short: "Traditional adjustable baseball cap.",
      long: "Traditional baseball cap with adjustable strap and custom embroidery options."
    },

    price: 349,
    salePrice: 299,

    images: [
      { url: "/assets/products/hats/hats (2).webp", altText: "Classic Baseball Cap" }
    ],
    subImages: [],

    stock: 600,
    sku: "HAT-ONE-BASEBALL",

    attributes: {
      color: ["Black", "Navy", "Red", "White", "Grey"],
      size: ["Adjustable"],
      material: "Cotton Twill"
    },

    specifications: [
      { key: "HSN Code", value: "65050000" },
      { key: "GST Rate", value: "12%" }
    ],

    tags: ["baseball cap", "adjustable cap", "custom cap", "embroidered hat"],

    isFeatured: true,
    isActive: true,

    ratings: { average: 4.6, count: 125 },

    seo: {
      metaTitle: "Custom Baseball Caps | Embroidered Promotional Hats",
      metaDescription:
        "Classic baseball caps with adjustable straps, perfect for custom embroidery and promotional events.",
      keywords: ["baseball", "cap", "adjustable", "embroidered"]
    },

    category: null,
    subcategory: null
  },

  {
    name: "Mesh Back Trucker Hat",
    slug: "mesh-back-trucker-hat",

    description: {
      short: "Breathable mesh trucker hat.",
      long: "Breathable mesh back trucker hat with foam front for custom printing."
    },

    price: 379,
    salePrice: 329,

    images: [
      { url: "/assets/products/hats/hats (3).webp", altText: "Mesh Back Trucker Hat" }
    ],
    subImages: [],

    stock: 450,
    sku: "HAT-ONE-TRUCKER",

    attributes: {
      color: ["Black/Black", "Navy/Navy", "Red/Black", "Green/Black"],
      size: ["Adjustable"],
      material: "Polyester Mesh"
    },

    tags: ["trucker hat", "mesh hat", "breathable cap", "outdoor cap"],

    isFeatured: false,
    isActive: true,

    ratings: { average: 4.3, count: 92 },

    seo: {
      metaTitle: "Mesh Back Trucker Hats | Custom Printed Caps",
      metaDescription:
        "Breathable mesh back trucker hats ideal for outdoor events and custom printing promotions.",
      keywords: ["trucker", "mesh", "breathable", "outdoor"]
    },

    category: null,
    subcategory: null
  },

  {
    name: "Knit Beanie Winter Hat",
    slug: "knit-beanie-winter-hat",

    description: {
      short: "Warm knit beanie for winter.",
      long: "Warm acrylic knit beanie perfect for winter promotions and custom branding."
    },

    price: 279,
    salePrice: 239,

    images: [
      { url: "/assets/products/hats/hats (4).webp", altText: "Knit Beanie Winter Hat" }
    ],
    subImages: [],

    stock: 550,
    sku: "HAT-ONE-BEANIE",

    attributes: {
      color: ["Black", "Navy", "Grey", "Red", "Green", "Charcoal"],
      size: ["One Size Fits Most"],
      material: "Acrylic Knit"
    },

    tags: ["beanie", "winter hat", "knit cap", "custom beanie"],

    isFeatured: true,
    isActive: true,

    ratings: { average: 4.5, count: 115 },

    seo: {
      metaTitle: "Custom Knit Beanies | Winter Promotional Hats",
      metaDescription:
        "Warm acrylic knit beanies perfect for winter promotions and custom branding opportunities.",
      keywords: ["beanie", "winter", "knit", "warm"]
    },

    category: null,
    subcategory: null
  },

  {
    name: "Sports Visor Cap",
    slug: "sports-visor-cap",

    description: {
      short: "Lightweight athletic visor.",
      long: "Lightweight sports visor with sweatband and adjustable strap for athletic events."
    },

    price: 319,
    salePrice: 279,

    images: [
      { url: "/assets/products/hats/hats (5).webp", altText: "Sports Visor Cap" }
    ],
    subImages: [],

    stock: 400,
    sku: "HAT-ONE-VISOR",

    attributes: {
      color: ["Black", "White", "Navy", "Red", "Yellow"],
      size: ["Adjustable"],
      material: "Polyester"
    },

    tags: ["visor", "sports visor", "athletic cap", "golf visor"],

    isFeatured: false,
    isActive: true,

    ratings: { average: 4.2, count: 67 },

    seo: {
      metaTitle: "Custom Sports Visors | Athletic Headwear",
      metaDescription:
        "Lightweight sports visors with sweatband perfect for athletic events and custom branding.",
      keywords: ["visor", "sports", "athletic", "lightweight"]
    },

    category: null,
    subcategory: null
  },

  {
    name: "Classic Fedora Hat",
    slug: "classic-fedora-hat",

    description: {
      short: "Elegant wool fedora.",
      long: "Elegant fedora hat with leather band for sophisticated branding events."
    },

    price: 899,
    salePrice: 799,

    images: [
      { url: "/assets/products/hats/hats (6).webp", altText: "Classic Fedora Hat" }
    ],
    subImages: [],

    stock: 300,
    sku: "HAT-ONE-FEDORA",

    attributes: {
      color: ["Black", "Brown", "Grey", "Navy"],
      size: ["S", "M", "L", "XL"],
      material: "Wool Felt"
    },

    tags: ["fedora", "formal hat", "premium headwear"],

    isFeatured: true,
    isActive: true,

    ratings: { average: 4.7, count: 45 },

    seo: {
      metaTitle: "Custom Fedora Hats | Premium Formal Headwear",
      metaDescription:
        "Elegant wool felt fedora hats with leather band, perfect for sophisticated branding events.",
      keywords: ["fedora", "formal", "wool", "elegant"]
    },

    category: null,
    subcategory: null
  },

  {
    name: "Military Boonie Hat",
    slug: "military-boonie-hat",

    description: {
      short: "Durable outdoor boonie hat.",
      long: "Durable military-style boonie hat with chin strap and wide brim for outdoor use."
    },

    price: 459,
    salePrice: 409,

    images: [
      { url: "/assets/products/hats/hats (7).webp", altText: "Military Boonie Hat" }
    ],
    subImages: [],

    stock: 350,
    sku: "HAT-ONE-BOONIE",

    attributes: {
      color: ["Olive Green", "Coyote Brown", "Black", "Navy"],
      size: ["S/M", "L/XL"],
      material: "Ripstop Polyester"
    },

    tags: ["boonie hat", "military hat", "outdoor hat"],

    isFeatured: false,
    isActive: true,

    ratings: { average: 4.4, count: 83 },

    seo: {
      metaTitle: "Military Boonie Hats | Outdoor Adventure Headwear",
      metaDescription:
        "Durable military-style boonie hats with chin strap, perfect for outdoor activities and custom branding.",
      keywords: ["boonie", "military", "outdoor", "durable"]
    },

    category: null,
    subcategory: null
  },

  {
    name: "Panama Straw Hat",
    slug: "panama-straw-hat",

    description: {
      short: "Lightweight summer straw hat.",
      long: "Lightweight Panama straw hat with black band for summer events and promotions."
    },

    price: 649,
    salePrice: 579,

    images: [
      { url: "/assets/products/hats/hats (8).webp", altText: "Panama Straw Hat" }
    ],
    subImages: [],

    stock: 250,
    sku: "HAT-ONE-PANAMA",

    attributes: {
      color: ["Natural", "White", "Black"],
      size: ["S", "M", "L", "XL"],
      material: "Straw"
    },

    tags: ["panama hat", "straw hat", "summer hat"],

    isFeatured: true,
    isActive: true,

    ratings: { average: 4.6, count: 57 },

    seo: {
      metaTitle: "Panama Straw Hats | Summer Event Headwear",
      metaDescription:
        "Lightweight Panama straw hats perfect for summer events, beach promotions and custom branding.",
      keywords: ["panama", "straw", "summer", "lightweight"]
    },

    category: null,
    subcategory: null
  },

  {
    name: "Premium Fitted Cap",
    slug: "premium-fitted-cap",

    description: {
      short: "Structured premium fitted cap.",
      long: "High-quality fitted cap with structured front and custom embroidery options."
    },

    price: 579,
    salePrice: 519,

    images: [
      { url: "/assets/products/hats/hats (9).webp", altText: "Premium Fitted Cap" }
    ],
    subImages: [],

    stock: 400,
    sku: "HAT-ONE-NEWERA",

    attributes: {
      color: ["Black", "Navy", "Grey", "Red", "Green"],
      size: ["S", "M", "L", "XL"],
      material: "Wool Blend"
    },

    tags: ["fitted cap", "premium cap", "structured hat"],

    isFeatured: false,
    isActive: true,

    ratings: { average: 4.8, count: 96 },

    seo: {
      metaTitle: "Premium Fitted Caps | Custom Embroidered Hats",
      metaDescription:
        "High-quality fitted caps with structured front, perfect for custom embroidery and premium branding.",
      keywords: ["fitted", "premium", "structured", "wool"]
    },

    category: null,
    subcategory: null
  },

  {
    name: "Classic Wool Beret",
    slug: "classic-wool-beret",

    description: {
      short: "Traditional wool beret.",
      long: "Traditional wool beret with leather trim for artistic and fashion branding."
    },

    price: 429,
    salePrice: 379,

    images: [
      { url: "/assets/products/hats/hats (10).webp", altText: "Classic Wool Beret" }
    ],
    subImages: [],

    stock: 320,
    sku: "HAT-ONE-BERET",

    attributes: {
      color: ["Black", "Navy", "Red", "Grey", "Brown"],
      size: ["One Size"],
      material: "Wool"
    },

    tags: ["beret", "wool beret", "fashion hat"],

    isFeatured: true,
    isActive: true,

    ratings: { average: 4.5, count: 64 },

    seo: {
      metaTitle: "Classic Wool Berets | Fashion Headwear",
      metaDescription:
        "Traditional wool berets with leather trim, perfect for artistic, fashion and custom branding applications.",
      keywords: ["beret", "wool", "fashion", "artistic"]
    },

    category: null,
    subcategory: null
  },

  {
    name: "Casual Cotton Bucket Hat",
    slug: "casual-cotton-bucket-hat",

    description: {
      short: "Lightweight cotton bucket hat.",
      long: "Lightweight cotton bucket hat, perfect for outdoor activities and casual branding."
    },

    price: 349,
    salePrice: 319,

    images: [
      { url: "/assets/products/hats/hats (11).webp", altText: "Casual Cotton Bucket Hat" }
    ],
    subImages: [],

    stock: 500,
    sku: "HAT-ONE-BUCKET",

    attributes: {
      color: ["Beige", "Olive", "Black", "White", "Navy"],
      size: ["One Size"],
      material: "Cotton"
    },

    tags: ["bucket hat", "casual hat", "cotton hat", "outdoor hat"],

    isFeatured: true,
    isActive: true,

    ratings: { average: 4.7, count: 89 },

    seo: {
      metaTitle: "Casual Cotton Bucket Hat | Outdoor Headwear",
      metaDescription:
        "Lightweight cotton bucket hat, ideal for casual wear, outdoor branding, and custom printing.",
      keywords: ["bucket hat", "cotton", "casual", "outdoor"]
    },

    category: null,
    subcategory: null
  }
];

module.exports = hats;
