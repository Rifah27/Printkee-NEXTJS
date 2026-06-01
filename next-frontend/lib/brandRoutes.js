export const brandRoutes = [
  {
    name: "Adidas",
    logo: "/assets/brands/adidas.webp",
    slug: "adidas",
    description:
      "Adidas is a global leader in sportswear and accessories, offering premium quality apparel, footwear, and accessories designed for performance and lifestyle.",
    tags: ["adidas", "sportswear", "footwear", "lifestyle clothing"],
  },
  {
    name: "American Tourister",
    logo: "/assets/brands/american.webp",
    slug: "american-tourister",
    description:
      "American Tourister offers durable and stylish luggage, backpacks, and travel accessories for professionals and travelers.",
    tags: ["american tourister", "luggage", "backpacks", "travel accessories"],
  },
  {
    name: "Portronics",
    logo: "/assets/brands/portronics.webp",
    slug: "portronics",
    description:
      "Portronics is an Indian brand known for portable electronics, audio products, and lifestyle gadgets.",
    tags: ["portronics", "electronics", "portable speakers", "power banks"],
  },
  {
    name: "Noise",
    logo: "/assets/brands/noise.webp",
    slug: "noise",
    description:
      "Noise specializes in smartwatches, wireless earbuds, wearables, and connected lifestyle technology.",
    tags: ["noise", "smartwatches", "wireless earbuds", "wearables"],
  },
  {
    name: "Puma",
    logo: "/assets/brands/puma.webp",
    slug: "puma",
    description:
      "Puma offers performance-driven footwear, apparel, and accessories for sports and lifestyle programs.",
    tags: ["puma", "sportswear", "athletic shoes", "sports apparel"],
  },
  {
    name: "Boat",
    logo: "/assets/brands/boat.webp",
    slug: "boat",
    description:
      "boAt is a consumer electronics brand known for headphones, speakers, wearables, and lifestyle tech products.",
    tags: ["boat", "audio devices", "headphones", "wireless earbuds"],
  },
  {
    name: "Jack & Jones",
    logo: "/assets/brands/jackjones.webp",
    slug: "jack-and-jones",
    description:
      "Jack & Jones offers stylish menswear, including jeans, shirts, jackets, and accessories.",
    tags: ["jack & jones", "menswear", "denim", "casual clothing"],
  },
  {
    name: "Wildcraft",
    logo: "/assets/brands/wildcraft.webp",
    slug: "wildcraft",
    description:
      "Wildcraft is known for outdoor gear, backpacks, apparel, and travel accessories.",
    tags: ["wildcraft", "outdoor gear", "backpacks", "travel accessories"],
  },
  {
    name: "Swiss Military",
    logo: "/assets/brands/swiss.webp",
    slug: "swiss-military",
    description:
      "Swiss Military offers travel gear, watches, and accessories with practical, rugged design.",
    tags: ["swiss military", "watches", "luggage", "travel accessories"],
  },
  {
    name: "Rare Rabbit",
    logo: "/assets/brands/rare-rabbit.webp",
    slug: "rare-rabbit",
    description:
      "Rare Rabbit is a premium fashion brand offering contemporary menswear for modern professionals.",
    tags: ["rare rabbit", "menswear", "fashion", "shirts"],
  },
  {
    name: "Fuzo",
    logo: "/assets/brands/fuzo.webp",
    slug: "fuzo",
    description:
      "Fuzo focuses on premium tech and lifestyle accessories for gifting and corporate branding.",
    tags: ["fuzo", "corporate gifts", "tech accessories", "custom gifts"],
  },
  {
    name: "Scott International",
    logo: "/assets/brands/scott.webp",
    slug: "scott-international",
    description:
      "Scott International offers casual apparel designed around comfortable everyday fashion.",
    tags: ["scott international", "casual clothing", "menswear", "t-shirts"],
  },
];

export const getBrandRoute = (slug) =>
  brandRoutes.find((brand) => brand.slug === slug);
