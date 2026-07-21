const poloTshirts = require("./products/poloTshirts");
const aprons = require("./products/aprons");
const roundneckTshirts = require("./products/roundneckTshirts");
const caps = require("./products/caps");
const hats = require("./products/hats");
const corporateShirts = require("./products/corporateShirts");
const winterWear = require("./products/winterWear");
const ties = require("./products/ties");
const corkSheetProducts = require("./products/ecoproducts/corkSheetProducts");
const corkCorporateGiftingComboProducts = require("./products/ecoproducts/corkCorporateGiftingComboProducts");
const corkCoasterProducts = require("./products/ecoproducts/corkCoasterProducts");
const corkPlantDecorateProducts = require("./products/ecoproducts/corkPlantDecorateProducts");
const corkServingDecorateProducts = require("./products/ecoproducts/corkServingDecorateProducts");
const corkHorecaProducts = require("./products/ecoproducts/corkHorecaProducts");
const corkLightingProducts = require("./products/ecoproducts/corkLightingProducts");
const corkYogaProducts = require("./products/ecoproducts/corkYogaProducts");
const corkGiftBoxProducts = require("./products/ecoproducts/corkGiftBoxProducts");
const corkDeskProducts = require("./products/ecoproducts/corkDeskProducts");
const corkBagWalletProducts = require("./products/ecoproducts/corkBagWalletProducts");
const filesAndFolders = require("./products/office/filefolder");
const pensAndWritingSets = require("./products/office/pensAndWritingSets");
const lanyardsWithIDCards = require("./products/office/lanyardsWithIDCards");
const notebooksAndDiaries = require("./products/office/notebooksAndDiaries");
const promotionalClocks = require("./products/collection/promotionalClocks");
const promotionalBackpacks = require("./products/bags/promotionalBackpacks");
const foldableBags = require("./products/bags/foldableBags");
const duffleBags = require("./products/bags/duffleBags");
const toteBags = require("./products/bags/toteBags");
const sipperBottles = require("./products/drinkware/sipperBottles");
const bambooBottles = require("./products/drinkware/bambooBottles");
const ceramicMugs = require("./products/drinkware/ceramicMugs");
const trophies = require("./products/trophiesMomento/trophies");
const coffeeMugs = require("./products/drinkware/coffeeMugs");
const welcomeKits = require("./products/collection/welcomeKits");
const keychains = require("./products/collection/keychains");
const wirelessChargers = require("./products/technology/wirelessChargers");
const computerAccessories = require("./products/technology/computerAccessories");
const powerBanks = require("./products/technology/powerBanks");
const mousePads = require("./products/technology/mousePads");

const categoryData = [
  {
    name: "Apparel and Accessories",
    slug: "apparel-and-accessories",
    description:
      "Discover our range of apparel and accessories.\nPerfect for branding and gifting.\nTrendy, comfortable, and customizable.\nIdeal for all occasions.",
    image: "/assets/categories/apparel.webp",

    seo: {
      metaTitle: "Custom Apparel & Accessories for Corporate Branding",
      metaDescription:
        "Discover premium custom apparel and accessories for branding, promotions and corporate gifting across India.",
      keywords: [
        "custom apparel",
        "corporate accessories",
        "branding apparel",
        "promotional clothing"
      ]
    },

    subcategories: [
      {
        name: "Promotional T-Shirt Manufacturers in Delhi",
        slug: "polo-t-shirts",
        description:
          "Premium custom polo and corporate t-shirts tailored for businesses, coaching institutes, and schools in Noida, Gurgaon,okhla and Delhi NCR.\nHigh-quality fabrics for comfort and durability.\nPerfect for branding, events, and team uniforms.",
        image: "/assets/subcategories/polotshirt.webp",

        seo: {
          metaTitle: "Custom T-Shirts Printing for Corporate Branding in Delhi",
          metaDescription:
            "custom polo t-shirts with logo printing for corporate uniforms, events, promotions and gifting. Bulk order support, quality fabric and fast delivery across India.",
          keywords: [
            "polo t-shirts",
            "custom polo t-shirts",
            "corporate t-shirts",
            "branded t-shirts"
          ]
        },

        products: poloTshirts
      },

      {
        name: "Promotional Round Neck T-Shirts ",
        slug: "round-neck-t-shirts",
        description:
          "High-quality custom round neck t-shirts designed for businesses, coaching institutes, and schools in Noida, Gurgaon, Okhla, and Delhi NCR.\nComfortable fabrics ideal for everyday wear.\nPerfect for branding, events, and team uniforms.",
        image: "/assets/subcategories/round.webp",

        seo: {
          metaTitle: "Custom Round Neck T Shirts with Logo | Vorixa India",
          metaDescription:
            "Premium round neck t-shirts with custom logo printing for corporate branding, events and staff uniforms. Best bulk prices, top quality and fast India-wide delivery.",
          keywords: [
            "round neck t-shirts",
            "custom t-shirts",
            "branding t-shirts",
            "corporate wear"
          ]
        },

        products: roundneckTshirts
      },

      {
        name: "Custom Cap Manufacturer in Delhi NCR",
        slug: "caps",
        description:
          "High-quality custom caps designed for businesses, coaching institutes, schools, and corporate events in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable materials ideal for outdoor use and promotions.\nPerfect for branding, giveaways, and team uniforms.",
        image: "/assets/subcategories/cap.webp",

        seo: {
          metaTitle: "Custom Caps with logo for Promotions & Branding | Vorixa",
          metaDescription:
            "Premium custom caps with logo embroidery and printing for events, marketing, corporate gifting and outdoor branding. Fast delivery and affordable bulk order pricing.",
          keywords: [
            "custom caps",
            "promotional caps",
            "branding caps",
            "corporate caps"
          ]
        },

        products: caps
      },

      {
        name: "Promotional Hat in Delhi",
        slug: "hats",
        description:
          "Premium-quality custom hats designed for businesses, coaching institutes, schools, and corporate events in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and stylish materials ideal for outdoor use and promotions.\nPerfect for branding, giveaways, and team uniforms.",
        image: "/assets/subcategories/hats.webp",

        seo: {
          metaTitle: "Custom Logo Hats for Corporate Branding & Events| Vorixa",
          metaDescription:
            "Premium promotional hats with custom logo printing for corporate branding, outdoor events and marketing campaigns. Bulk order support with fast delivery across India.",
          keywords: [
            "custom hats",
            "promotional hats",
            "event hats",
            "branding accessories"
          ]
        },

        products: hats
      },

      {
        name: "Customized Formal Shirt in Delhi",
        slug: "corporate-shirts",
        description:
          "High-quality Custom formal shirt and corporate shirts designed for businesses, coaching institutes, schools, and corporate events in Noida, Gurgaon, Okhla, and Delhi NCR.\nComfortable and durable fabrics ideal for professional settings.\nPerfect for branding, uniforms, and corporate gifting.",
        image: "/assets/subcategories/corporateshirt.webp",

        seo: {
          metaTitle: "Custom Logo Shirts for Office Uniforms | Customize Online",
          metaDescription:
            "Premium corporate shirts for office uniforms with custom logo printing and embroidery. Ideal for branding and promotions, with bulk order support and fast delivery",
          keywords: [
            "corporate shirts",
            "formal shirts",
            "office uniforms",
            "branded shirts"
          ]
        },

        products: corporateShirts
      },

      {
        name: "Promotional Tie in Delhi",
        slug: "ties",
        description:
          "High-quality custom ties and corporate ties designed for businesses, coaching institutes, schools, and corporate events in Noida, Gurgaon, Okhla, and Delhi NCR.\nElegant materials ideal for professional settings and branding.\nPerfect for uniforms, corporate gifting, and special occasions.",
        image: "/assets/subcategories/tie.webp",

        seo: {
          metaTitle: "Custom Logo Ties for Corporate Uniforms | Vorixa",
          metaDescription:
            "Premium corporate ties with custom branding for office uniforms, events and corporate gifting. Bulk order support with reliable delivery across India for all branding needs.",
          keywords: [
            "corporate ties",
            "custom ties",
            "branding ties",
            "formal accessories"
          ]
        },

        products: ties
      },

      {
        name: "Promotional Apron in Delhi",
        slug: "aprons",
        description:
          "High-quality custom aprons and corporate aprons designed for restaurants, cafes, catering services, schools, coaching institutes, and corporate events in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and comfortable materials ideal for daily use and branding.\nPerfect for uniforms, promotional events, and corporate gifting.",
        image: "/assets/subcategories/apron.webp",

        seo: {
          metaTitle: "Custom Aprons with Logo for Restaurants |Services in India",
          metaDescription:
            "Premium round neck t-shirts with custom logo printing for corporate branding, events and staff uniforms. Best bulk prices, reliable quality and hassle-free pan India supply.",
          keywords: [
            "custom aprons",
            "printed aprons",
            "branding aprons",
            "corporate aprons"
          ]
        },

        products: aprons
      },

      {
        name: "Promotional Winter Wear in Delhi",
        slug: "winter-wear",
        description:
          "High-quality custom winter jackets, sweaters, and corporate winter wear designed for offices, schools, coaching institutes, and corporate events in Noida, Gurgaon, Okhla, and Delhi NCR.\nWarm and comfortable fabrics ideal for cold weather and branding.\nPerfect for uniforms, promotional events, and corporate gifting.",
        image: "/assets/subcategories/winterwear.webp",

        seo: {
          metaTitle: "Custom Winter Wear with Logo for Employees | Vorixa",
          metaDescription:
            "Premium winter wear with custom logo printing for employees, gifting and outdoor events. Soft fabric, bulk order support and fast delivery across India.",
          keywords: [
            "custom winter wear",
            "branded jackets",
            "corporate hoodies",
            "promotional sweaters"
          ]
        },

        products: winterWear
      }
    ]
  },
   {
    name: "Office and Writing",
    slug: "office-and-writing",
    description:
      "Essential office and writing tools. Perfect for daily use and gifting. Custom branding options. Boost productivity and style.",
    image: "/assets/categories/officewriting.webp",

    seo: {
      metaTitle: "Office & Writing Essentials for Corporate Branding",
      metaDescription:
        "Explore custom office and writing essentials including pens, files, notebooks and ID accessories for corporate branding and gifting.",
      keywords: [
        "office stationery",
        "writing essentials",
        "corporate stationery",
        "custom office products"
      ]
    },

    subcategories: [
      {
        name: "Custom Files & Folder for Office",
        slug: "file-and-folder",
        description:
          "High-quality Promotional files and folders designed for offices, schools, corporate gifting, events, and promotional purposes in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable materials with customizable covers ideal for branding and daily use.\nPerfect for organizing documents, presentations, and employee kits.",
        image: "/assets/products/filesfolder/4.webp",

        seo: {
          metaTitle: "Custom Files & Folders with Logo | Vorixa India",
          metaDescription:
            "Branded office files and folders for employee kits and promotional gifting. High-quality material, custom printing and bulk supply for corporates across India.",
          keywords: [
            "custom files",
            "office folders",
            "branded folders",
            "corporate stationery"
          ]
        },

        products: filesAndFolders
      },

      {
        name: "Custom Pen & Writing Set in Delhi NCR",
        slug: "pen-and-writing-set",
        description:
          "Premium Promotional pens and writing sets perfect for corporate gifting, employee kits, events, and branding. Smooth writing experience with custom engraving options.",
        image: "/assets/products/pens/1.webp",

        seo: {
          metaTitle: "Customized Pens & Writing Sets for Corporate Gifts | Vorixa",
          metaDescription:
            "Elegant writing sets for premium corporate gifting, events, and branding. Custom logo printing, bulk pricing, and fast delivery across India.",
          keywords: [
            "custom pens",
            "writing sets",
            "corporate pens",
            "branded stationery"
          ]
        },

        products: pensAndWritingSets
      },

      {
        name: "Custom Lanyard & ID Card in Delhi NCR",
        slug: "lanyard-and-id-card",
        description:
          "High-quality Promotional lanyards, ID card holders, designed for corporate gifting, employee identification, offices, and promotional events in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable materials ideal for daily use and branding.\nPerfect for enhancing professional appearance and brand visibility.",
        image: "/assets/products/lanyards/1.webp",

        seo: {
          metaTitle: "Custom Printed Lanyards & ID Cards for Offices | Vorixa",
          metaDescription:
            "High-quality lanyards and ID cards for offices, events and branding. Logo printing available with bulk orders and fast delivery across India.",
          keywords: [
            "custom lanyards",
            "id cards",
            "office accessories",
            "branding products"
          ]
        },

        products: lanyardsWithIDCards
      },

      {
        name: "Customized Notebooks & Diaries in Delhi ",
        slug: "notebooks-and-diary-sets",
        description:
          "High-quality Custom notebooks and diaries designed for offices, schools, corporate gifting, events, and promotional purposes in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable materials with customizable covers ideal for branding and daily use.\nPerfect for meetings, note-taking, and employee kits.",
        image: "/assets/products/notebooks/16.webp",

        seo: {
          metaTitle: "Custom Notebooks & Diary Sets for Gifting | Vorixa",
          metaDescription:
            "Premium notebooks and diaries with logo printing for office, clients and events. Perfect for corporate gifting with bulk order support and fast delivery across India.",
          keywords: [
            "custom notebooks",
            "corporate diaries",
            "branded notebooks",
            "office stationery"
          ]
        },

        products: notebooksAndDiaries
      }
    ]
  },

  {
    name: "Collection",
    slug: "collection",
    description:
      "Exclusive gift collections. Perfect for special occasions. Curated for every need. Customizable options available.",
    image: "/assets/categories/collections.webp",

    seo: {
      metaTitle: "Exclusive Corporate Gift Collections",
      metaDescription:
        "Explore exclusive corporate gift collections curated for onboarding, events and promotional gifting with customization options.",
      keywords: [
        "corporate gift collections",
        "custom gift sets",
        "promotional gifts",
        "branded collections"
      ]
    },

    subcategories: [
      {
        name: "Customized Welcome Kit in Delhi",
        slug: "welcome-kits",
        description:
          "High-quality Promotional welcome kits designed for corporate gifts, events, hotels, onboarding programs, and promotional campaigns in Noida, Gurgaon, Okhla, and Delhi NCR.\nThoughtfully curated items ideal for new employees and clients.\nPerfect for making a lasting first impression.",
        image: "/assets/products/welcomekits/13.webp",

        seo: {
          metaTitle: "Corporate Welcome Kits with Custom Branding | Vorixa",
          metaDescription:
            "Personalized welcome kits with branded products for new employees, events and promotional gifting. Bulk pricing and India-wide fast delivery available.",
          keywords: [
            "welcome kits",
            "corporate onboarding kits",
            "employee kits",
            "custom gift boxes"
          ]
        },

        products: welcomeKits
      },

      {
        name: "Promotional Clock in Delhi",
        slug: "promotional-clocks",
        description:
          "Durable and stylish customized clocks designed for corporate gifts, events, giveaways, and branding campaigns in Delhi, Noida, Gurgaon, Okhla, and NCR.\nHigh-quality materials ideal for office and home use.\nPerfect for enhancing brand visibility with custom logo printing.",
        image: "/assets/products/clocks/1.webp",

        seo: {
          metaTitle: "Custom Wall Clocks with Logo for Office | Vorixa",
          metaDescription:
            "Elegant promotional clocks with custom logo printing for offices, events, and brand gifting. Bulk orders and fast delivery across India.",
          keywords: [
            "promotional clocks",
            "custom clocks",
            "corporate gifts",
            "branding products"
          ]
        },

        products: promotionalClocks
      },

      {
        name: "Custom Keychain in Delhi",
        slug: "keychains",
        description:
          "High-quality, Promotional  keychains designed to enhance brand visibility and make perfect corporate gifts across Delhi, Noida, Gurgaon, Okhla, and NCR.\nDurable materials with unique designs ideal for daily use and promotions.\nPerfect for branding, giveaways, and employee gifts.",
        image: "/assets/products/keychains/9.webp",

        seo: {
          metaTitle: "Custom Keychains with Logo for Promotions | Vorixa",
          metaDescription:
            "Branded keychains for events, advertising and gifting. Durable quality, multiple designs and logo customization available. Bulk order pricing and fast India-wide delivery for corporates.",
          keywords: [
            "custom keychains",
            "promotional keychains",
            "branding gifts",
            "corporate giveaways"
          ]
        },

        products: keychains
      }
    ]
  },
  {
    name: "Bags and Travel",
    slug: "bags-and-travel",
    description:
      "Travel in style with our bags. Backpacks, totes, and more. Durable and functional designs. Custom branding available.",
    image: "/assets/categories/bags.webp",

    seo: {
      metaTitle: "Custom Bags & Travel Accessories for Corporate Branding",
      metaDescription:
        "Explore custom backpacks, tote bags, duffle bags and travel accessories for corporate gifting, promotions and branding.",
      keywords: [
        "custom bags",
        "corporate travel bags",
        "promotional bags",
        "branded backpacks"
      ]
    },

    subcategories: [
      {
        name: "Backpacks Manufacturers in Delhi NCR",
        slug: "backpacks",
        description:
          "High-quality custom backpacks designed for corporates, schools, coaching institutes, colleges, and events in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable materials ideal for daily use and travel.\nPerfect for branding, giveaways, and team use.",
        image: "/assets/products/backpacks/1.webp",

        seo: {
          metaTitle: "Custom Backpacks Manufacturers in Delhi NCR",
          metaDescription:
            "Durable custom backpacks for employees, events and corporate gifting. Premium printing, bulk order support and fast delivery across India to boost brand visibility.",
          keywords: [
            "custom backpacks",
            "corporate backpacks",
            "promotional backpacks",
            "branded travel bags"
          ]
        },

        products: promotionalBackpacks
      },

      {
        name: "Foldable Bag Manufacturers in Delhi",
        slug: "foldable-bags",
        description:
          "High-quality custom foldable bags designed for corporates, schools, coaching institutes, colleges, events, and marketing campaigns in Noida, Gurgaon, Okhla, and Delhi NCR.\nLightweight and durable materials ideal for shopping and travel.\nPerfect for branding, giveaways, and eco-friendly promotions.",
        image: "/assets/products/foldablebags/1.webp",

        seo: {
          metaTitle: "Custom Foldable Bags for Corporate Gifting | Vorixa",
          metaDescription:
            "Easy-to-carry foldable bags with custom logo printing for events, giveaways and eco-friendly branding. Best quality for bulk orders with fast delivery across India.",
          keywords: [
            "foldable bags",
            "custom foldable bags",
            "eco friendly bags",
            "promotional bags"
          ]
        },

        products: foldableBags
      },

      {
        name: " Custom Duffle Bag Manufacturers in Delhi ",
        slug: "duffle-bags",
        description:
          "High-quality duffle bags customized for corporates, schools, coaching institutes, colleges, gyms, events, and marketing campaigns in Delhi, Noida, Gurgaon, and Okhla.\nSpacious and durable materials ideal for travel and sports.\nPerfect for branding, giveaways, and promotional use.",
        image: "/assets/products/dufflebags/1.webp",

        seo: {
          metaTitle: "Custom Duffle Bags with Logo for Promotions | Vorixa",
          metaDescription:
            "Premium duffle bags with custom branding for corporate teams, travel gifting and event promotions. Bulk order pricing with reliable delivery all over India.",
          keywords: [
            "custom duffle bags",
            "corporate duffle bags",
            "travel bags",
            "promotional sports bags"
          ]
        },

        products: duffleBags
      },

      {
        name: "Tote Bags Manufacturers in Delhi",
        slug: "tote-bags",
        description:
          "High-quality custom tote bags designed for corporates, retail stores, events, and marketing campaigns in Noida, Gurgaon, Okhla, and Delhi NCR.\nEco-friendly and durable materials ideal for shopping and daily use.\nPerfect for branding, giveaways, and sustainable promotions.",
        image: "/assets/products/totebags/1.webp",

        seo: {
          metaTitle: "Custom Logo Tote Bags for Branding & Gifting | Vorixa",
          metaDescription:
            "tote bags with custom logo printing for events, trade shows and corporate gifting. Eco-friendly materials, bulk order pricing and fast delivery across India.",
          keywords: [
            "custom tote bags",
            "eco friendly tote bags",
            "branded tote bags",
            "promotional carry bags"
          ]
        },

        products: toteBags
      }
    ]
  },

  {
    name: "Technology Accessories",
    slug: "technology-accessories",
    description:
      "Latest tech accessories. Wireless, portable, and smart. Perfect for gifting and use. Custom branding available.",
    image: "/assets/categories/technology.webp",

    seo: {
      metaTitle: "Custom Technology Accessories for Corporate Gifting & Branding",
      metaDescription:
        "Discover custom technology accessories including power banks, wireless chargers and computer accessories for corporate gifting.",
      keywords: [
        "technology accessories",
        "corporate tech gifts",
        "branded gadgets",
        "promotional electronics"
      ]
    },

    subcategories: [
      {
        name: "Custom Wireless Charger ",
        slug: "wireless-charging",
        description:
          "High-quality, Promotional wireless chargers designed for client gifts, employee rewards, and brand promotion across Delhi, Noida, Gurgaon, Okhla, and NCR.\nCompact and portable designs ideal for on-the-go charging.\nPerfect for enhancing brand visibility with custom logo printing.",
        image: "/assets/products/wirelesschargers/17.webp",

        seo: {
          metaTitle: "Promotional Wireless Charging Accessories | Vorixa",
          metaDescription:
            "Modern wireless chargers for promotional gifting and office accessories. Custom branding, premium build quality and bulk delivery options across India.",
          keywords: [
            "wireless chargers",
            "custom wireless chargers",
            "corporate tech gifts",
            "promotional chargers"
          ]
        },

        products: wirelessChargers
      },

      {
        name: "Custom Computer Accessories in Delhi NCR",
        slug: "computer-accessories",
        description:
          "High-quality Promotional computer accessories designed for offices, employees, clients, and promotional campaigns across Delhi, Noida, Gurgaon, Okhla, and NCR.\nDurable and practical items ideal for daily use and branding.\nPerfect for enhancing workspaces and corporate gifting.",
        image: "/assets/products/computeraccessories/1.webp",

        seo: {
          metaTitle: "Custom Office Computer Accessories with Logo | Vorixa",
          metaDescription:
            "Custom computer accessories for corporate gifting and office branding. Bulk orders, logo printing and fast delivery across India for employee welcome kits.",
          keywords: [
            "computer accessories",
            "office accessories",
            "corporate tech products",
            "branded office gadgets"
          ]
        },

        products: computerAccessories
      },

      {
        name: "Custom Power Bank in Delhi NCR",
        slug: "power-banks",
        description:
          "Promotional High-quality, branded power banks designed for corporate gifting, client appreciation, employee rewards, and promotional campaigns across Delhi, Noida, Gurgaon, Okhla, and NCR.\nCompact and portable designs ideal for on-the-go charging.\nPerfect for enhancing brand visibility with custom logo printing.",
        image: "/assets/products/powerbanks/13.webp",

        seo: {
          metaTitle: "Custom Power Banks with Logo for Promotions | Vorixa",
          metaDescription:
            "Premium power banks with custom logo printing. Perfect for corporate gifting, events and branding. Bulk pricing and fast nationwide delivery.",
          keywords: [
            "custom power banks",
            "branded power banks",
            "corporate tech gifts",
            "promotional electronics"
          ]
        },

        products: powerBanks
      },

      {
        name: "Custom Desktop & Mousepad ",
        slug: "desktop-and-mousepad",
        description:
          "High-quality Promotional branded desktops and mousepads designed for offices, client gifts, employee rewards, and promotional campaigns across Delhi, Noida, Gurgaon, Okhla, and NCR.\nDurable materials with smooth surfaces ideal for daily use and branding.\nPerfect for enhancing workspaces and corporate gifting.",
        image: "/assets/products/mousepads/10.webp",

        seo: {
          metaTitle: "Custom Mousepads & Desktop Accessories for Branding",
          metaDescription:
            "High-quality mousepads and desktop accessories for promotional gifting and office branding. Custom printing with bulk order support and fast India delivery.",
          keywords: [
            "custom mousepads",
            "desktop accessories",
            "office desk branding",
            "promotional office products"
          ]
        },

        products: mousePads
      }
    ]
  },
  {
    name: "Eco Products",
    slug: "eco-products",
    description:
      "Eco-friendly product range. Sustainable and reusable. Perfect for green gifting. Custom branding available.",
    image: "/assets/categories/ecoproducts.webp",

    seo: {
      metaTitle: "Eco-Friendly Products for Sustainable Corporate Gifting",
      metaDescription:
        "Explore eco-friendly cork products, desk accessories, lighting, yoga items and sustainable gifting solutions with custom branding.",
      keywords: [
        "eco friendly products",
        "sustainable corporate gifts",
        "green gifting",
        "cork products"
      ]
    },

    subcategories: [
      {
        name: "Custom Cork Sheet ",
        slug: "cork-sheet",
        description:
          "High-quality Promotional cork sheets designed for industrial use, flooring, insulation, notice boards, packaging, and creative projects in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and eco-friendly materials ideal for various applications.\nPerfect for promoting sustainability and green building practices.",
        image: "/assets/subcategories/sheet.webp",

        seo: {
          metaTitle: "Custom Cork Sheets for Corporate Use | Vorixa",
          metaDescription:
            "Premium cork sheets for sustainable innovation, office décor & product designing. Eco-friendly material available with competitive bulk pricing and fast delivery across India.",
          keywords: [
            "cork sheets",
            "eco friendly cork",
            "sustainable materials",
            "green building products"
          ]
        },

        products: corkSheetProducts
      },

      {
        name: "Custom Cork Corporate Gifting Combos ",
        slug: "cork-corporate-gifting-combo",
        description:
          "High-quality Promotional cork gifting combos designed for corporate gifting, client appreciation, employee rewards, trade shows, and promotional events in Noida, Gurgaon, Okhla, and Delhi NCR.\nElegant and durable materials ideal for showcasing gifts and enhancing brand image.\nPerfect for promoting sustainability and eco-friendly gifting practices.",
        image: "/assets/subcategories/combo.webp",

        seo: {
          metaTitle: "Cork Corporate Gift Combos for Branding | Vorixa",
          metaDescription:
            "Eco-friendly cork gifting combos with custom branding, ideal for corporate events and employee welcome kits. Bulk order pricing with fast delivery",
          keywords: [
            "cork gift combos",
            "eco friendly gift sets",
            "sustainable corporate gifts",
            "green gifting products"
          ]
        },

        products: corkCorporateGiftingComboProducts
      },

      {
        name: "Promotional Cork Coaster in Delhi NCR",
        slug: "cork-coaster",
        description:
          "High-quality Promotional cork coasters in Delhi NCR, designed for offices, restaurants, cafes, corporate gifting, promotional events, and everyday use in Noida, Gurgaon, Okhla, and surrounding NCR regions.\nDurable and eco-friendly materials ideal for protecting surfaces from drink stains and enhancing table aesthetics.\nPerfect for promoting sustainability and brand visibility with custom logo printing.",
        image: "/assets/subcategories/coaster.webp",

        seo: {
          metaTitle: "Custom Cork Coasters for Branding & Gifting | Vorixa",
          metaDescription:
            "Stylish cork coasters with custom logo printing for offices, cafés & events. Eco-friendly promotional product with reliable bulk supply and timely delivery.",
          keywords: [
            "cork coasters",
            "custom coasters",
            "eco friendly drinkware",
            "branding coasters"
          ]
        },

        products: corkCoasterProducts
      },

      {
        name: "Custom Cork Plant Decorate in Delhi NCR",
        slug: "cork-plant-decorate",
        description:
          "High-quality Promotional cork plant décor designed for homes, offices, restaurants, corporate gifting, and creative spaces in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and eco-friendly materials ideal for plant presentation and decoration.\nPerfect for promoting sustainability and enhancing green environments.",
        image: "/assets/subcategories/plant.webp",

        seo: {
          metaTitle: "Cork Plant Decor Items with Custom Branding for Offices",
          metaDescription:
            "Eco-friendly cork plant décor for office spaces, events and gifting. Unique design with custom branding and premium quality available for reliable bulk delivery.",
          keywords: [
            "cork plant decor",
            "eco friendly decor",
            "office plant accessories",
            "sustainable decor"
          ]
        },

        products: corkPlantDecorateProducts
      },

      {
        name: "Custom Cork Serving Decoratives ",
        slug: "cork-serving-decorate",
        description:
          "High-quality Promotional cork serving décor designed for homes, restaurants, cafes, corporate gifting, and creative dining spaces in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and eco-friendly materials ideal for food presentation and service.\nPerfect for promoting sustainability and enhancing dining experiences.",
        image: "/assets/subcategories/serving.webp",

        seo: {
          metaTitle: "Custom Cork Products for Hotels & Restaurants | Vorixa",
          metaDescription:
            "Custom-branded cork serving décor for restaurants, events and premium corporate gifting. Eco-friendly, stylish and available with reliable bulk customization options.",
          keywords: [
            "cork serving products",
            "eco friendly tableware",
            "restaurant cork items",
            "sustainable serveware"
          ]
        },

        products: corkServingDecorateProducts
      },

      {
        name: "Custom Cork Horeca Range in Delhi NCR",
        slug: "cork-horeca-range",
        description:
          "High-quality Promotional cork products designed for the hospitality industry including hotels, restaurants, cafes, and catering services in Noida, Gurgaon, Okhla, and Delhi NCR.High-quality cork products designed for the hospitality industry including hotels, restaurants, cafes, and catering services in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and eco-friendly materials ideal for food and beverage service.\nPerfect for promoting sustainability and enhancing customer experience.",
        image: "/assets/subcategories/horeca.webp",

        seo: {
          metaTitle: "Eco-Friendly Cork Products for HoReCa Branding | Vorixa",
          metaDescription:
            "High-quality sustainable cork products for hotels, bars, and restaurants. Custom branding, durable finish, bulk supplies, and fast delivery across India.",
          keywords: [
            "cork horeca products",
            "hotel cork accessories",
            "restaurant cork items",
            "sustainable horeca supplies"
          ]
        },

        products: corkHorecaProducts
      },

      {
        name: "Custom Cork Premium Lighting ",
        slug: "cork-premium-lighting",
        description:
          "High-quality Promotional cork lighting fixtures designed for interior décor, home lighting, office spaces, hotels, restaurants, and sustainable design projects in Noida, Gurgaon, Okhla, and Delhi NCR.\nEco-friendly and durable materials ideal for ambient and accent lighting.\nPerfect for promoting sustainability and unique lighting solutions.",
        image: "/assets/subcategories/lighting.webp",

        seo: {
          metaTitle: "Custom Cork Lighting for Sustainable Interiors | Vorixa",
          metaDescription:
            "Stylish premium cork lighting for office and home décor. Eco-friendly, modern design, custom branding, and bulk delivery",
          keywords: [
            "cork lighting",
            "eco friendly lighting",
            "sustainable lamps",
            "decorative cork lights"
          ]
        },

        products: corkLightingProducts
      },

      {
        name: "Custom Cork Premium Gift Box ",
        slug: "cork-premium-gift-boxes",
        description:
          "High-quality Promotional cork gift boxes designed for corporate gifting, client appreciation, employee rewards, festive occasions, and premium promotional events in Noida, Gurgaon, Okhla, and Delhi NCR.\nElegant and durable materials ideal for showcasing gifts and enhancing brand image.\nPerfect for promoting sustainability and eco-friendly gifting practices.",
        image: "/assets/subcategories/box.webp",

        seo: {
          metaTitle: "Custom Cork Premium Gift Box for Corporate Gifting | Vorixa",
          metaDescription:
            "Eco-friendly and durable cork gift boxes ideal for premium gifting and brand promotions. Custom logo available with bulk orders and quick India delivery.",
          keywords: [
            "cork gift boxes",
            "eco friendly gift packaging",
            "sustainable gift boxes",
            "premium corporate gifts"
          ]
        },

        products: corkGiftBoxProducts
      },

      {
        name: "Custom Cork Desk Top Accessories ",
        slug: "cork-desk-top-accessories",
        description:
          "High-quality Promotional cork desk accessories designed for offices, workstations, home offices, corporate gifting, and creative workspaces in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and eco-friendly materials ideal for organizing and enhancing workspaces.\nPerfect for promoting sustainability and stylish office setups.",
        image: "/assets/subcategories/desk.webp",

        seo: {
          metaTitle: "Cork Desk Accessories for Offices & Gifting | Vorixa",
          metaDescription:
            "Stylish cork desktop accessories for employee kits, workstation décor and branding gifts. Eco-friendly, durable and available for bulk orders across India.",
          keywords: [
            "cork desk accessories",
            "eco friendly office accessories",
            "sustainable workstation decor",
            "corporate desk gifts"
          ]
        },

        products: corkDeskProducts
      },

      {
        name: "Custom Cork Laptop Bags & Wallets",
        slug: "cork-laptop-bag-and-wallet",
        description:
          "High-quality Promotional cork laptop bags and wallets designed for professionals, corporates, students, and eco-conscious users in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and stylish materials ideal for everyday use and travel.\nPerfect for promoting sustainability and eco-friendly living.",
        image: "/assets/subcategories/bag.webp",

        seo: {
          metaTitle: "Custom Laptop Backpacks for Office & Branding | Vorixa",
          metaDescription:
            "Trendy cork laptop bags and wallets with custom branding for corporate gifting. Strong build, eco-conscious design and bulk delivery anywhere in India.",
          keywords: [
            "cork laptop bags",
            "cork wallets",
            "eco friendly bags",
            "sustainable corporate gifts"
          ]
        },

        products: corkBagWalletProducts
      },

      {
        name: "Custom Cork Yoga Accessories ",
        slug: "cork-yoga-accessories",
        description:
          "High-quality Promotional cork yoga mats, blocks, straps, and accessories designed for home, studios, gyms, and corporate wellness programs in Noida, Gurgaon, Okhla, and Delhi NCR.\nEco-friendly and durable materials ideal for all levels of practice.\nPerfect for promoting wellness, mindfulness, and sustainable living.",
        image: "/assets/subcategories/yoga.webp",

        seo: {
          metaTitle: "Custom Cork Yoga Products for Promotions | Vorixa",
          metaDescription:
            "Anti-slip cork yoga accessories perfect for wellness branding, gyms and corporate gifting. Sustainable products with bulk order support and fast delivery.",
          keywords: [
            "cork yoga accessories",
            "eco friendly yoga mats",
            "wellness corporate gifts",
            "sustainable fitness products"
          ]
        },

        products: corkYogaProducts
      }
    ]
  },

  {
    name: "Drink Ware",
    slug: "drink-ware",
    description:
      "Promotional drinkware collection. Sippers, mugs, bottles, and more. Perfect for daily use and gifting. Custom branding available.",
    image: "/assets/categories/drinkware.webp",

    seo: {
      metaTitle: "Custom Drinkware for Corporate Branding & Promotional Gifting",
      metaDescription:
        "Explore branded sippers, mugs, bamboo bottles and ceramic drinkware for corporate gifting and daily promotional use.",
      keywords: [
        "custom drinkware",
        "promotional bottles",
        "corporate mugs",
        "branded drinkware"
      ]
    },

    subcategories: [
      {
        name: "Custom Sippers in Delhi",
        slug: "sipper",
        description:
          "High-quality Promotional sippers designed for corporates, retail stores, events, and marketing campaigns in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and stylish materials ideal for daily hydration and promotions.\nPerfect for branding, giveaways, and sustainable gifting.",
        image: "/assets/products/sipperbottles/1.webp",

        seo: {
          metaTitle: "Custom Sipper Bottles for Branding & Gifting | Vorixa",
          metaDescription:
            "Premium sipper bottles with custom logo printing for branding, events & corporate gifting. Bulk orders with fast delivery across India.",
          keywords: [
            "custom sippers",
            "branded water bottles",
            "promotional sipper bottles",
            "corporate drinkware"
          ]
        },

        products: sipperBottles
      },

      {
        name: "Custom Bamboo Bottles  in Delhi",
        slug: "bamboo-bottle",
        description:
          "High-quality Promotional bamboo bottles designed for corporates, retail stores, events, and marketing campaigns in Noida, Gurgaon, Okhla, and Delhi NCR.\nEco-friendly and durable materials ideal for daily hydration and sustainable promotions.\nPerfect for branding, giveaways, and green gifting.",
        image: "/assets/products/bamboobottles/1.webp",

        seo: {
          metaTitle: "Customized Bamboo Bottles for Corporate Gifting",
          metaDescription:
            "Eco-friendly bamboo bottles with custom branding for corporate gifting, events & employee welcome kits. Bulk order pricing with fast delivery across India",
          keywords: [
            "bamboo bottles",
            "eco friendly bottles",
            "custom bamboo drinkware",
            "sustainable corporate gifts"
          ]
        },

        products: bambooBottles
      },

      {
        name: "Custom Coffee Mugs in Delhi",
        slug: "coffee-mug",
        description:
          "High-quality Promotional coffee mugs designed for corporates, retail stores, events, and marketing campaigns in Noida, Gurgaon, Okhla, and Delhi NCR.",
        image: "/assets/products/coffeemugs/1.webp",

        seo: {
          metaTitle: "Custom Coffee Mugs for Office Branding | Vorixa",
          metaDescription:
            "Premium coffee mugs with custom logo printing for employee gifting, events & office branding. Bulk order pricing with fast delivery across India. Request a quote today!",
          keywords: [
            "custom coffee mugs",
            "branded mugs",
            "office mugs",
            "corporate gifting mugs"
          ]
        },

        products: coffeeMugs
      },

      {
        name: "Custom Ceramic Mugs ",
        slug: "ceramic-mug",
        description:
          "High-quality Promotional ceramic mugs designed for corporates, retail stores, events, and marketing campaigns in Noida, Gurgaon, Okhla, and Delhi NCR",
        image: "/assets/products/ceramicmugs/1.webp",

        seo: {
          metaTitle: "Custom Logo Ceramic Mugs for Office Use | Vorixa",
          metaDescription:
            "Premium ceramic mugs with custom logo printing for corporate gifting, events & office branding. Bulk order pricing with fast and reliable delivery across India.",
          keywords: [
            "ceramic mugs",
            "custom ceramic mugs",
            "promotional mugs",
            "corporate drinkware"
          ]
        },

        products: ceramicMugs
      }
    ]
  },

  {
    name: "Custom Trophies & Mementos",
    slug: "trophy-and-momento",
    description:
      "High-quality, Promotional trophies and mementos designed for corporate recognition, sports events, employee awards, and special occasions across Delhi, Noida, Gurgaon, Okhla, and NCR.\nPremium materials including glass, crystal, metal, wood, and acrylic.\nElegant designs with options for custom engraving and branding to celebrate achievements in style.",
    image: "/assets/categories/trophy.webp",

    seo: {
      metaTitle: "Custom Trophies & Mementos for Corporate Awards | Vorixa",
      metaDescription:
        "Premium trophies and mementos for awards, sports events and corporate recognition with custom engraving and fast delivery.",
      keywords: [
        "custom trophies",
        "corporate mementos",
        "award trophies",
        "recognition gifts"
      ]
    },

    subcategories: [
      {
        name: "Custom Trophy and Momento",
        slug: "trophy-and-momento",
        description:
          "Exclusive trophies and momentos. Crystal and wooden options. Ideal for awards and events. Custom branding available.",
        image: "/assets/products/trophies/11.webp",

        seo: {
          metaTitle: "Custom Trophies & Mementos for Awards and Corporate Events",
          metaDescription:
            "Premium trophies and mementos designed for recognition events and corporate awards. Logo engraving and customization available with fast delivery across India.",
          keywords: [
            "award trophies",
            "corporate trophies",
            "custom mementos",
            "engraved trophies"
          ]
        },

        products: trophies
      }
    ]
  }
];

module.exports = categoryData;