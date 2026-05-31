const filesAndFolders = [

/* ================= PRODUCT 1 ================= */

{
  name: "A4 Professional Document File",
  slug: "a4-professional-document-file",
  description: {
    short: "Premium A4 professional document file for offices.",
    long: "Premium A4 professional document file designed for corporate offices, HR departments, onboarding kits, conferences, and business presentations. Ideal for custom logo printing and bulk promotional gifting."
  },
  price: 149,
  salePrice: 129,
  images: [
    { url: "/assets/products/filesfolder/1.webp", altText: "A4 Professional Document File" },
    { url: "/assets/products/filesfolder/2.webp", altText: "A4 Professional File Side View" },
    { url: "/assets/products/filesfolder/3.webp", altText: "A4 Professional File Open View" }
  ],
  stock: 800,
  sku: "A4-PRO-FILE",
  attributes: {
    material: "Polypropylene",
    size: "A4",
    color: "Black"
  },
  specifications: [
    { key: "HSN Code", value: "48203000" },
    { key: "GST Rate", value: "18%" },
    { key: "Usage", value: "Office, HR, Conferences, Onboarding Kits" }
  ],
  tags: [
    "a4 file",
    "corporate document file",
    "professional office file",
    "custom printed file"
  ],
  isFeatured: true,
  isActive: true,
  ratings: { average: 4.6, count: 120 },
  seo: {
    metaTitle: "A4 Professional Document File | Corporate Stationery India",
    metaDescription: "Premium A4 document file with custom branding for offices, HR kits & corporate gifting across India.",
    keywords: ["a4 document file", "corporate file folder", "office stationery"]
  },
  category: null,
  subcategory: null
},

/* ================= PRODUCT 2 ================= */

{
  name: "Expandable Accordion File Folder",
  slug: "expandable-accordion-file-folder",
  description: {
    short: "Multi-pocket expandable accordion file folder.",
    long: "Durable expandable accordion file folder with multiple compartments, ideal for document organization, employee kits, onboarding essentials, and branded corporate gifting."
  },
  price: 249,
  salePrice: 229,
  images: [
    { url: "/assets/products/filesfolder/4.webp", altText: "Expandable Accordion File Folder" },
    { url: "/assets/products/filesfolder/5.webp", altText: "Accordion Folder Open View" },
    { url: "/assets/products/filesfolder/6.webp", altText: "Accordion Folder Compartments" }
  ],
  stock: 600,
  sku: "EXPAND-FOLDER",
  attributes: {
    material: "PP Sheet",
    size: "A4",
    color: "Blue"
  },
  specifications: [
    { key: "HSN Code", value: "48203000" },
    { key: "GST Rate", value: "18%" },
    { key: "Compartments", value: "Multi-pocket" }
  ],
  tags: [
    "accordion file",
    "expandable file folder",
    "office document organizer"
  ],
  isFeatured: true,
  isActive: true,
  ratings: { average: 4.5, count: 95 },
  seo: {
    metaTitle: "Expandable Accordion File Folder | Corporate Office Files",
    metaDescription: "Expandable multi-pocket file folder for corporate offices, HR kits & document storage.",
    keywords: ["accordion file folder", "expandable office file"]
  },
  category: null,
  subcategory: null
},

/* ================= PRODUCT 3 ================= */

{
  name: "Leather Executive File Folder",
  slug: "leather-executive-file-folder",
  description: {
    short: "Premium PU leather executive file folder.",
    long: "High-quality PU leather executive file folder designed for corporate meetings, luxury gifting, conferences, CEO kits, and executive branding."
  },
  price: 899,
  salePrice: 849,
  images: [
    { url: "/assets/products/filesfolder/7.webp", altText: "Leather Executive File Folder" },
    { url: "/assets/products/filesfolder/8.webp", altText: "Leather Folder Inside View" },
    { url: "/assets/products/filesfolder/9.webp", altText: "Leather Folder Branding Area" }
  ],
  stock: 350,
  sku: "LEATHER-FILE",
  attributes: {
    material: "PU Leather",
    size: "A4",
    color: "Brown"
  },
  specifications: [
    { key: "HSN Code", value: "42023120" },
    { key: "GST Rate", value: "18%" },
    { key: "Branding", value: "Embossing / Logo Printing" }
  ],
  tags: [
    "leather file folder",
    "executive office folder",
    "premium corporate gift"
  ],
  isFeatured: true,
  isActive: true,
  ratings: { average: 4.8, count: 75 },
  seo: {
    metaTitle: "Leather Executive File Folder | Premium Corporate Gifting",
    metaDescription: "Premium PU leather file folder with custom branding for executive corporate gifting.",
    keywords: ["leather executive folder", "corporate leather file"]
  },
  category: null,
  subcategory: null
},

/* ================= PRODUCT 4 ================= */

{
  name: "Plastic A4 Clip File",
  slug: "plastic-a4-clip-file",
  description: {
    short: "Lightweight plastic A4 clip file.",
    long: "Durable and lightweight A4 plastic clip file ideal for HR onboarding kits, training programs, offices, and corporate promotional gifting."
  },
  price: 79,
  salePrice: 69,
  images: [
    { url: "/assets/products/filesfolder/10.webp", altText: "Plastic A4 Clip File" },
    { url: "/assets/products/filesfolder/11.webp", altText: "Clip File Side View" },
    { url: "/assets/products/filesfolder/12.webp", altText: "Clip File Open View" }
  ],
  stock: 900,
  sku: "CLIP-FILE",
  attributes: {
    material: "Plastic",
    size: "A4",
    color: "Transparent"
  },
  specifications: [
    { key: "HSN Code", value: "48203000" },
    { key: "GST Rate", value: "18%" }
  ],
  tags: [
    "clip file",
    "plastic office file",
    "hr onboarding kit item"
  ],
  isFeatured: false,
  isActive: true,
  ratings: { average: 4.3, count: 140 },
  seo: {
    metaTitle: "Plastic A4 Clip File | Corporate Stationery Supplier",
    metaDescription: "A4 plastic clip file for offices and HR onboarding kits with custom branding.",
    keywords: ["a4 clip file", "plastic office file"]
  },
  category: null,
  subcategory: null
},

/* ================= PRODUCT 5 ================= */

{
  name: "Mesh Zipper Document Bag",
  slug: "mesh-zipper-document-bag",
  description: {
    short: "Mesh zipper document pouch for offices.",
    long: "Premium mesh zipper document bag ideal for employee welcome kits, corporate events, secure document handling, and branded giveaways."
  },
  price: 129,
  salePrice: 119,
  images: [
    { url: "/assets/products/filesfolder/13.webp", altText: "Mesh Zipper Document Bag" },
    { url: "/assets/products/filesfolder/14.webp", altText: "Zipper Bag Side View" },
    { url: "/assets/products/filesfolder/15.webp", altText: "Mesh Document Pouch" }
  ],
  stock: 700,
  sku: "MESH-DOCUMENT",
  attributes: {
    material: "PVC Mesh",
    size: "A4",
    color: "White"
  },
  specifications: [
    { key: "HSN Code", value: "42022220" },
    { key: "GST Rate", value: "18%" }
  ],
  tags: [
    "zipper document bag",
    "mesh file pouch",
    "corporate welcome kit item"
  ],
  isFeatured: false,
  isActive: true,
  ratings: { average: 4.4, count: 90 },
  seo: {
    metaTitle: "Mesh Zipper Document Bag | Corporate Welcome Kit Pouch",
    metaDescription: "Mesh zipper document pouch with custom branding for corporate gifting and employee kits.",
    keywords: ["mesh document pouch", "zipper file bag"]
  },
  category: null,
  subcategory: null
},

/* ================= PRODUCT 6 ================= */

{
  name: "A4 File Storage Box",
  slug: "a4-file-storage-box",
  description: {
    short: "Heavy-duty A4 document storage box.",
    long: "Strong and durable A4 file storage box designed for corporate document archiving, HR records, finance files, and long-term office storage."
  },
  price: 349,
  salePrice: 329,
  images: [
    { url: "/assets/products/filesfolder/16.webp", altText: "A4 File Storage Box" },
    { url: "/assets/products/filesfolder/17.webp", altText: "File Storage Box Open" },
    { url: "/assets/products/filesfolder/18.webp", altText: "Archive Storage Box" }
  ],
  stock: 500,
  sku: "FILE-STORAGE-BOX",
  attributes: {
    material: "Hard Board",
    size: "A4",
    color: "Brown"
  },
  specifications: [
    { key: "HSN Code", value: "48196000" },
    { key: "GST Rate", value: "18%" },
    { key: "Usage", value: "Archiving & Storage" }
  ],
  tags: [
    "file storage box",
    "office archive box",
    "document storage solution"
  ],
  isFeatured: false,
  isActive: true,
  ratings: { average: 4.5, count: 60 },
  seo: {
    metaTitle: "A4 File Storage Box | Corporate Archive Storage",
    metaDescription: "Heavy-duty A4 file storage box for corporate document archiving and office records.",
    keywords: ["a4 file storage box", "office archive box"]
  },
  category: null,
  subcategory: null
}

];

module.exports = filesAndFolders;
