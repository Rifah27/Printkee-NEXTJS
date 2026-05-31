const poloTshirts = [
  {
    name: "Classic White Polo T-Shirt",
    slug: "classic-white-polo-t-shirt",
    description: {
      short: "Elegant white polo t-shirt.",
      long: "Elegant white polo t-shirt with premium fabric and custom logo print."
    },
    price: 599,
    salePrice: 499,
    images: [{ url: "/assets/products/polo/classic-white (2).webp", altText: "White Polo T-Shirt" }],
    subImages: [
      { url: "/assets/products/polo/classic-white (2).webp", altText: "View 1" },
      { url: "/assets/products/polo/classic-white (1).webp", altText: "View 2" },
      { url: "/assets/products/polo/classic-white (3).webp", altText: "View 3" },
      { url: "/assets/products/polo/classic-white (4).webp", altText: "View 4" }
    ],
    stock: 1000,
    sku: "POLO-M-WHITE",
    attributes: { color: ["White"], size: ["S","M","L","XL","XXL"], material: "Cotton Blend" },
    specifications: [
      { key: "HSN Code", value: "61099090" },
      { key: "GST Rate", value: "5%" },
      { key: "Weight", value: "200g" }
    ],
    tags: ["white polo t-shirt","custom logo polo","branded white polo shirt","corporate polo t-shirt"],
    isFeatured: true,
    isActive: true,
    ratings: { average: 4.5, count: 120 },
    seo: {
      metaTitle: "Custom White Polo T-Shirts | Branded Corporate Polos",
      metaDescription: "Premium white polo t-shirts for corporate branding and team uniforms.",
      keywords: ["polo","white","corporate","branded"]
    },
    category: null,
    subcategory: null
  },

  {
    name: "Navy Blue Polo T-Shirt",
    slug: "navy-blue-polo-t-shirt",
    description: {
      short: "Stylish navy blue polo.",
      long: "Stylish navy blue polo t-shirt, perfect for office and events branding."
    },
    price: 599,
    salePrice: 499,
    images: [{ url: "/assets/products/polo/navy-blue (2).webp", altText: "Navy Blue Polo T-Shirt" }],
    subImages: [
      { url: "/assets/products/polo/navy-blue (2).webp", altText: "View 1" },
      { url: "/assets/products/polo/navy-blue (1).webp", altText: "View 2" },
      { url: "/assets/products/polo/navy-blue (3).webp", altText: "View 3" },
      { url: "/assets/products/polo/navy-blue (4).webp", altText: "View 4" }
    ],
    stock: 800,
    sku: "POLO-M-NAVY",
    attributes: { color: ["Navy Blue"], size: ["S","M","L","XL","XXL"], material: "Cotton Blend" },
    tags: ["navy blue polo t-shirt","corporate navy polo","custom navy polo tee","logo printed polo shirt"],
    isFeatured: true,
    isActive: true,
    ratings: { average: 4.3, count: 95 },
    seo: {
      metaTitle: "Custom Navy Blue Polo T-Shirts | Branded Polos",
      metaDescription: "Premium navy blue polo t-shirts for corporate branding.",
      keywords: ["polo","navy","corporate","branded"]
    },
    category: null,
    subcategory: null
  },

  {
    name: "Black Polo T-Shirt",
    slug: "black-polo-t-shirt",
    description: {
      short: "Premium black polo.",
      long: "Premium black polo t-shirt with soft cotton blend and logo embroidery option."
    },
    price: 599,
    salePrice: 499,
    images: [{ url: "/assets/products/polo/black (3).webp", altText: "Black Polo T-Shirt" }],
    subImages: [
      { url: "/assets/products/polo/black (3).webp", altText: "View 1" },
      { url: "/assets/products/polo/black (2).webp", altText: "View 2" },
      { url: "/assets/products/polo/black (1).webp", altText: "View 3" },
      { url: "/assets/products/polo/black (4).webp", altText: "View 4" }
    ],
    stock: 900,
    sku: "POLO-M-BLACK",
    attributes: { color: ["Black"], size: ["S","M","L","XL","XXL"], material: "Cotton Blend" },
    tags: ["black polo t-shirt","branded polo shirt black","custom corporate polo black","event staff polo shirt"],
    isFeatured: true,
    isActive: true,
    ratings: { average: 4.7, count: 150 },
    seo: {
      metaTitle: "Custom Black Polo T-Shirts | Premium Branded Polos",
      metaDescription: "Premium black polo t-shirts for corporate branding.",
      keywords: ["polo","black","corporate","branded"]
    },
    category: null,
    subcategory: null
  },

  {
    name: "Grey Polo T-Shirt",
    slug: "grey-polo-t-shirt",
    description: {
      short: "Comfortable grey polo.",
      long: "Lightweight grey polo t-shirt designed for all-day comfort and corporate branding."
    },
    price: 599,
    salePrice: 499,
    images: [{ url: "/assets/products/polo/grey (3).webp", altText: "Grey Polo T-Shirt" }],
    subImages: [
      { url: "/assets/products/polo/grey (3).webp", altText: "View 1" },
      { url: "/assets/products/polo/grey (2).webp", altText: "View 2" },
      { url: "/assets/products/polo/grey (1).webp", altText: "View 3" },
      { url: "/assets/products/polo/grey (4).webp", altText: "View 4" }
    ],
    stock: 750,
    sku: "POLO-M-GREY",
    attributes: { color: ["Grey"], size: ["S","M","L","XL","XXL"], material: "Cotton Blend" },
    tags: ["grey polo t-shirt","custom grey polo shirt","corporate wear polo","branded grey polo"],
    isFeatured: false,
    isActive: true,
    ratings: { average: 4.2, count: 85 },
    seo: {
      metaTitle: "Custom Grey Polo T-Shirts | Corporate Branded Polos",
      metaDescription: "Lightweight grey polo t-shirts perfect for branding.",
      keywords: ["polo","grey","corporate","branded"]
    },
    category: null,
    subcategory: null
  },

  {
    name: "Red Polo T-Shirt",
    slug: "red-polo-t-shirt",
    description: {
      short: "Bold red polo.",
      long: "Bold red polo t-shirt ideal for events, promotions, and team uniforms."
    },
    price: 599,
    salePrice: 499,
    images: [{ url: "/assets/products/polo/red (1).webp", altText: "Red Polo T-Shirt" }],
    subImages: [
      { url: "/assets/products/polo/red (1).webp", altText: "View 1" },
      { url: "/assets/products/polo/red (2).webp", altText: "View 2" },
      { url: "/assets/products/polo/red (3).webp", altText: "View 3" },
      { url: "/assets/products/polo/red (4).webp", altText: "View 4" }
    ],
    stock: 700,
    sku: "POLO-M-RED",
    attributes: { color: ["Red"], size: ["S","M","L","XL","XXL"], material: "Cotton Blend" },
    tags: ["red polo t-shirt","custom red polo shirt","branded red polo","event promotion polo"],
    isFeatured: false,
    isActive: true,
    ratings: { average: 4.0, count: 65 },
    seo: {
      metaTitle: "Custom Red Polo T-Shirts | Promotional Event Polos",
      metaDescription: "Vibrant red polo t-shirts for events and promotions.",
      keywords: ["polo","red","event","promotional"]
    },
    category: null,
    subcategory: null
  },

  {
    name: "Royal Blue Polo T-Shirt",
    slug: "royal-blue-polo-t-shirt",
    description: {
      short: "Royal blue polo.",
      long: "Royal blue polo t-shirt with durable stitching and stylish fit."
    },
    price: 599,
    salePrice: 499,
    images: [{ url: "/assets/products/polo/royal-blue (3).webp", altText: "Royal Blue Polo T-Shirt" }],
    subImages: [
      { url: "/assets/products/polo/royal-blue (3).webp", altText: "View 1" },
      { url: "/assets/products/polo/royal-blue (2).webp", altText: "View 2" },
      { url: "/assets/products/polo/royal-blue (1).webp", altText: "View 3" },
      { url: "/assets/products/polo/royal-blue (4).webp", altText: "View 4" }
    ],
    stock: 850,
    sku: "POLO-M-ROYALBLUE",
    attributes: { color: ["Royal Blue"], size: ["S","M","L","XL","XXL"], material: "Cotton Blend" },
    tags: ["royal blue polo t-shirt","custom blue polo shirt","logo embroidered blue polo","stylish branded polo"],
    isFeatured: true,
    isActive: true,
    ratings: { average: 4.4, count: 110 },
    seo: {
      metaTitle: "Custom Royal Blue Polo T-Shirts | Branded Corporate Polos",
      metaDescription: "Premium royal blue polo t-shirts for corporate branding.",
      keywords: ["polo","royal blue","corporate","branded"]
    },
    category: null,
    subcategory: null
  },

  {
    name: "Green Polo T-Shirt",
    slug: "green-polo-t-shirt",
    description: {
      short: "Eco-friendly green polo.",
      long: "Eco-friendly green polo t-shirt made with breathable organic cotton."
    },
    price: 649,
    salePrice: 549,
    images: [{ url: "/assets/products/polo/green (2).webp", altText: "Green Polo T-Shirt" }],
    subImages: [
      { url: "/assets/products/polo/green (2).webp", altText: "View 1" },
      { url: "/assets/products/polo/green (1).webp", altText: "View 2" },
      { url: "/assets/products/polo/green (3).webp", altText: "View 3" },
      { url: "/assets/products/polo/green (4).webp", altText: "View 4" }
    ],
    stock: 600,
    sku: "POLO-M-GREEN",
    attributes: { color: ["Green"], size: ["S","M","L","XL","XXL"], material: "Organic Cotton" },
    tags: ["green polo t-shirt","custom green polo shirt","eco friendly polo shirt","branded green polo"],
    isFeatured: false,
    isActive: true,
    ratings: { average: 4.6, count: 75 },
    seo: {
      metaTitle: "Eco-Friendly Green Polo T-Shirts | Organic Cotton Polos",
      metaDescription: "Sustainable green polo t-shirts made with organic cotton.",
      keywords: ["polo","green","eco-friendly","organic"]
    },
    category: null,
    subcategory: null
  },

  {
    name: "Yellow Polo T-Shirt",
    slug: "yellow-polo-t-shirt",
    description: {
      short: "Vibrant yellow polo.",
      long: "Vibrant yellow polo t-shirt that stands out in team events."
    },
    price: 599,
    salePrice: 499,
    images: [{ url: "/assets/products/polo/yellow (2).webp", altText: "Yellow Polo T-Shirt" }],
    subImages: [
      { url: "/assets/products/polo/yellow (2).webp", altText: "View 1" },
      { url: "/assets/products/polo/yellow (1).webp", altText: "View 2" },
      { url: "/assets/products/polo/yellow (3).webp", altText: "View 3" },
      { url: "/assets/products/polo/yellow (4).webp", altText: "View 4" }
    ],
    stock: 550,
    sku: "POLO-M-YELLOW",
    attributes: { color: ["Yellow"], size: ["S","M","L","XL","XXL"], material: "Cotton Blend" },
    tags: ["yellow polo t-shirt","custom yellow polo","branded polo shirt yellow","team polo yellow"],
    isFeatured: false,
    isActive: true,
    ratings: { average: 3.9, count: 45 },
    seo: {
      metaTitle: "Vibrant Yellow Polo T-Shirts | Promotional Team Polos",
      metaDescription: "Eye-catching yellow polo t-shirts for promotions.",
      keywords: ["polo","yellow","vibrant","promotional"]
    },
    category: null,
    subcategory: null
  },

  {
    name: "Maroon Polo T-Shirt",
    slug: "maroon-polo-t-shirt",
    description: {
      short: "Sophisticated maroon polo.",
      long: "Sophisticated maroon polo t-shirt with embroidered logo branding."
    },
    price: 599,
    salePrice: 499,
    images: [{ url: "/assets/products/polo/maroon (1).webp", altText: "Maroon Polo T-Shirt" }],
    subImages: [
      { url: "/assets/products/polo/maroon (1).webp", altText: "View 1" },
      { url: "/assets/products/polo/maroon (2).webp", altText: "View 2" },
      { url: "/assets/products/polo/maroon (3).webp", altText: "View 3" },
      { url: "/assets/products/polo/maroon (4).webp", altText: "View 4" }
    ],
    stock: 650,
    sku: "POLO-M-MAROON",
    attributes: { color: ["Maroon"], size: ["S","M","L","XL","XXL"], material: "Cotton Blend" },
    tags: ["maroon polo t-shirt","custom maroon polo shirt","branded maroon polo","corporate event polo"],
    isFeatured: false,
    isActive: true,
    ratings: { average: 4.1, count: 60 },
    seo: {
      metaTitle: "Sophisticated Maroon Polo T-Shirts | Corporate Branding",
      metaDescription: "Elegant maroon polo t-shirts for corporate branding.",
      keywords: ["polo","maroon","corporate"]
    },
    category: null,
    subcategory: null
  },

  {
    name: "Sky Blue Polo T-Shirt",
    slug: "sky-blue-polo-t-shirt",
    description: {
      short: "Comfortable sky blue polo.",
      long: "Comfortable sky blue polo t-shirt perfect for summer promotions."
    },
    price: 599,
    salePrice: 499,
    images: [{ url: "/assets/products/polo/sky-blue (1).webp", altText: "Sky Blue Polo T-Shirt" }],
    subImages: [
      { url: "/assets/products/polo/sky-blue (1).webp", altText: "View 1" },
      { url: "/assets/products/polo/sky-blue (2).webp", altText: "View 2" },
      { url: "/assets/products/polo/sky-blue (3).webp", altText: "View 3" },
      { url: "/assets/products/polo/sky-blue (4).webp", altText: "View 4" }
    ],
    stock: 700,
    sku: "POLO-M-SKYBLUE",
    attributes: { color: ["Sky Blue"], size: ["S","M","L","XL","XXL"], material: "Cotton Blend" },
    tags: ["sky blue polo t-shirt","custom sky blue polo","branded polo shirt blue","staff wear polo shirt"],
    isFeatured: false,
    isActive: true,
    ratings: { average: 4.3, count: 80 },
    seo: {
      metaTitle: "Sky Blue Polo T-Shirts | Summer Staff Wear",
      metaDescription: "Comfortable sky blue polo t-shirts for staff uniforms.",
      keywords: ["polo","sky blue","summer","staff wear"]
    },
    category: null,
    subcategory: null
  },

  {
    name: "Orange Polo T-Shirt",
    slug: "orange-polo-t-shirt",
    description: {
      short: "Bright orange polo.",
      long: "Bright orange polo t-shirt ideal for outdoor events."
    },
    price: 599,
    salePrice: 499,
    images: [{ url: "/assets/products/polo/orange (1).webp", altText: "Orange Polo T-Shirt" }],
    subImages: [
      { url: "/assets/products/polo/orange (1).webp", altText: "View 1" },
      { url: "/assets/products/polo/orange (2).webp", altText: "View 2" },
      { url: "/assets/products/polo/orange (3).webp", altText: "View 3" },
      { url: "/assets/products/polo/orange (4).webp", altText: "View 4" }
    ],
    stock: 500,
    sku: "POLO-M-ORANGE",
    attributes: { color: ["Orange"], size: ["S","M","L","XL","XXL"], material: "Cotton Blend" },
    tags: ["orange polo t-shirt","custom orange polo shirt","event wear polo","branded orange polo"],
    isFeatured: false,
    isActive: true,
    ratings: { average: 3.8, count: 40 },
    seo: {
      metaTitle: "Bright Orange Polo T-Shirts | Outdoor Event Wear",
      metaDescription: "Vibrant orange polo t-shirts for outdoor events.",
      keywords: ["polo","orange","event"]
    },
    category: null,
    subcategory: null
  },

  {
    name: "Purple Polo T-Shirt",
    slug: "purple-polo-t-shirt",
    description: {
      short: "Trendy purple polo.",
      long: "Trendy purple polo t-shirt designed for stylish branding."
    },
    price: 599,
    salePrice: 499,
    images: [{ url: "/assets/products/polo/purple (1).webp", altText: "Purple Polo T-Shirt" }],
    subImages: [
      { url: "/assets/products/polo/purple (1).webp", altText: "View 1" },
      { url: "/assets/products/polo/purple (2).webp", altText: "View 2" },
      { url: "/assets/products/polo/purple (3).webp", altText: "View 3" },
      { url: "/assets/products/polo/purple (4).webp", altText: "View 4" }
    ],
    stock: 600,
    sku: "POLO-M-PURPLE",
    attributes: { color: ["Purple"], size: ["S","M","L","XL","XXL"], material: "Cotton Blend" },
    tags: ["purple polo t-shirt","custom purple polo shirt","branded polo purple","stylish corporate polo"],
    isFeatured: false,
    isActive: true,
    ratings: { average: 4.0, count: 55 },
    seo: {
      metaTitle: "Trendy Purple Polo T-Shirts | Stylish Corporate Wear",
      metaDescription: "Fashionable purple polo t-shirts for corporate branding.",
      keywords: ["polo","purple","corporate"]
    },
    category: null,
    subcategory: null
  },

  {
    name: "Pink Polo T-Shirt",
    slug: "pink-polo-t-shirt",
    description: {
      short: "Soft pink polo.",
      long: "Soft pink polo t-shirt suitable for events and campaigns."
    },
    price: 599,
    salePrice: 499,
    images: [{ url: "/assets/products/polo/pink (1).webp", altText: "Pink Polo T-Shirt" }],
    subImages: [
      { url: "/assets/products/polo/pink (1).webp", altText: "View 1" },
      { url: "/assets/products/polo/pink (2).webp", altText: "View 2" },
      { url: "/assets/products/polo/pink (3).webp", altText: "View 3" },
      { url: "/assets/products/polo/pink (4).webp", altText: "View 4" }
    ],
    stock: 550,
    sku: "POLO-M-PINK",
    attributes: { color: ["Pink"], size: ["S","M","L","XL","XXL"], material: "Cotton Blend" },
    tags: ["pink polo t-shirt","custom pink polo shirt","branded pink polo","corporate wear pink polo"],
    isFeatured: false,
    isActive: true,
    ratings: { average: 4.2, count: 70 },
    seo: {
      metaTitle: "Soft Pink Polo T-Shirts | Casual Corporate Wear",
      metaDescription: "Comfortable pink polo t-shirts for campaigns and branding.",
      keywords: ["polo","pink","casual"]
    },
    category: null,
    subcategory: null
  },

  {
    name: "Olive Polo T-Shirt",
    slug: "olive-polo-t-shirt",
    description: {
      short: "Casual olive polo.",
      long: "Casual olive polo t-shirt made with premium cotton and durable stitching."
    },
    price: 599,
    salePrice: 499,
    images: [{ url: "/assets/products/polo/olive (1).webp", altText: "Olive Polo T-Shirt" }],
    subImages: [
      { url: "/assets/products/polo/olive (1).webp", altText: "View 1" },
      { url: "/assets/products/polo/olive (2).webp", altText: "View 2" },
      { url: "/assets/products/polo/olive (3).webp", altText: "View 3" },
      { url: "/assets/products/polo/olive (4).webp", altText: "View 4" }
    ],
    stock: 650,
    sku: "POLO-M-OLIVE",
    attributes: { color: ["Olive"], size: ["S","M","L","XL","XXL"], material: "Cotton Blend" },
    tags: ["olive polo t-shirt","custom olive polo shirt","branded olive polo","stylish olive green polo"],
    isFeatured: false,
    isActive: true,
    ratings: { average: 4.1, count: 60 },
    seo: {
      metaTitle: "Olive Green Polo T-Shirts | Casual Durable Polos",
      metaDescription: "Premium olive green polo t-shirts for casual corporate wear.",
      keywords: ["polo","olive","casual"]
    },
    category: null,
    subcategory: null
  }
];

module.exports = poloTshirts;
