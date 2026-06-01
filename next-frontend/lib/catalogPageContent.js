export const catalogProofPoints = [
  "Premium quality materials",
  "Custom logo branding",
  "Bulk corporate orders",
  "Fast delivery across India",
];

export const categoryBannerImages = {
  "apparel-and-accessories": "/assets/banner1.webp",
  "technology-accessories": "/assets/banner3.webp",
  "eco-products": "/assets/banner2.webp",
  "drink-ware": "/assets/banner4.webp",
  "bags-and-travel": "/assets/banner-sect.webp",
  collection: "/assets/banner-sect2.webp",
  "office-and-writing": "/assets/banner3.webp",
  "trophy-and-momento": "/assets/banner4.webp",
};

export const getCategoryBannerImage = (category) =>
  categoryBannerImages[category?.slug] || "/assets/banner1.webp";

export const getSubcategoryBannerImage = (categorySlug) =>
  categoryBannerImages[categorySlug] || "/assets/banner3.webp";

export const categoryContent = {
  "apparel-and-accessories": {
    eyebrow: "Apparel & uniforms",
    headline: "Customized corporate apparel for teams, events, and promotions",
    intro:
      "Stand out with branded t-shirts, polo shirts, caps, jackets, and uniforms printed or embroidered with your company logo.",
    useCases: ["Team uniforms", "Event merchandise", "School and coaching apparel"],
  },
  "eco-products": {
    eyebrow: "Sustainable gifting",
    headline: "Eco-friendly corporate gifts with a lighter footprint",
    intro:
      "Choose reusable, recycled, bamboo, jute, and cork-based products for thoughtful green gifting and custom branding.",
    useCases: ["Green campaigns", "Wellness kits", "Eco-conscious client gifts"],
  },
  "technology-accessories": {
    eyebrow: "Smart tech gifts",
    headline: "Useful branded tech accessories for modern teams",
    intro:
      "Impress employees and clients with wireless chargers, power banks, mouse pads, and everyday gadgets made for brand recall.",
    useCases: ["Client gifts", "Employee rewards", "Conference giveaways"],
  },
  "drink-ware": {
    eyebrow: "Drinkware collection",
    headline: "Custom bottles and mugs for daily brand visibility",
    intro:
      "From stainless steel bottles to mugs, build practical drinkware gifts that travel from office desks to daily routines.",
    useCases: ["Welcome kits", "Festive hampers", "Office essentials"],
  },
  "bags-and-travel": {
    eyebrow: "Bags & travel",
    headline: "Custom bags built for commutes, events, and giveaways",
    intro:
      "Explore backpacks, duffle bags, tote bags, and foldable bags with logo branding and bulk order support.",
    useCases: ["Expo giveaways", "Travel kits", "Retail-style merchandise"],
  },
  collection: {
    eyebrow: "Curated collections",
    headline: "Promotional merchandise for every brand moment",
    intro:
      "Create memorable branded gifts for onboarding, celebrations, campaigns, and client appreciation.",
    useCases: ["Welcome kits", "Client gifts", "Festive campaigns"],
  },
  "office-and-writing": {
    eyebrow: "Office essentials",
    headline: "Branded stationery and desk essentials for daily use",
    intro:
      "Discover notebooks, diaries, pens, folders, lanyards, and office sets designed for polished corporate gifting.",
    useCases: ["Employee kits", "Meetings", "Executive gifts"],
  },
  "trophy-and-momento": {
    eyebrow: "Recognition gifts",
    headline: "Custom trophies and mementos for awards and milestones",
    intro:
      "Celebrate achievements with elegant glass, metal, wood, acrylic, and engraved recognition products.",
    useCases: ["Award nights", "Sports events", "Employee recognition"],
  },
};

export const getCategoryCopy = (category) => {
  const content = categoryContent[category?.slug] || {};
  return {
    eyebrow: content.eyebrow || category?.name || "Corporate gifting",
    headline:
      content.headline ||
      `${category?.name || "Corporate gifting"} collections for branded campaigns`,
    intro:
      content.intro ||
      category?.description ||
      "Discover customized promotional products with premium finishes, reliable bulk support, and delivery across India.",
    useCases:
      content.useCases ||
      ["Corporate gifting", "Promotional branding", "Employee merchandise"],
  };
};

export const getSubcategoryCopy = (subcategory, categoryName) => {
  const name = subcategory?.name || "Custom products";
  const intro =
    subcategory?.description ||
    `Explore high quality ${name} designed for corporate branding, promotional events, marketing campaigns, and employee gifting.`;

  return {
    eyebrow: categoryName || "Product range",
    headline: name,
    intro,
    whyTitle: `Why choose our ${name}?`,
    location:
      "Built for businesses, coaching institutes, schools, startups, and corporate events across Delhi NCR, Noida, Gurgaon, Okhla, and pan-India orders.",
  };
};

export const getProductCopy = (product, subcategoryName) => {
  const description = product?.description;
  const shortDescription =
    typeof description === "string"
      ? description
      : description?.short || description?.long || "";

  return {
    eyebrow: subcategoryName || "Custom branded product",
    headline: product?.name || "Product",
    intro:
      shortDescription ||
      `Buy ${product?.name || "this product"} with custom branding and logo printing for corporate gifting, employee kits, and promotional campaigns.`,
  };
};
