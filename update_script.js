const fs = require('fs');

const updates = {
  "polo-t-shirts": {
    name: "Custom T-Shirt Manufacturers in Delhi",
    h2: "Customised printing T-Shirts by vorixa",
    metaTitle: "Custom T-Shirts Printing for Corporate Branding in Delhi"
  },
  "round-neck-t-shirts": {
    name: "Custom Round Neck T Shirts Manufacturers in Delhi NCR",
    h2: "Personalised Round Neck T Shirt",
    metaTitle: "Custom Round Neck T Shirts with Logo | Vorixa India"
  },
  "corporate-shirts": {
    name: "Customized shirt printing near me",
    h2: "Custom Formal shirts Printing",
    metaTitle: "Custom Logo Shirts for Office Uniforms | Customize Online"
  },
  "caps": {
    name: "Custom Cap Manufacturers in Delhi NCR",
    h2: "Custom Caps with Name & Logo",
    metaTitle: "Custom Caps with logo for Promotions & Branding | Vorixa"
  },
  "hats": {
    name: "Custom Hat in Delhi",
    h2: "Custom hats with Name & Logo",
    metaTitle: "Custom Logo Hats for Corporate Branding & Events| Vorixa"
  },
  "ties": {
    name: "Custom Tie in Delhi",
    h2: "Customized Ties with Logo & Embroidery",
    metaTitle: "Custom Logo Ties for Corporate Uniforms | Vorixa"
  },
  "aprons": {
    name: "Custom Aprons in Delhi",
    h2: "Customized Printed Apron with Logo",
    metaTitle: "Custom Aprons with Logo for Restaurants |Services in India"
  },
  "winter-wear": {
    name: "Custom Winter Wear in Delhi",
    h2: "Customized Printed Winter Wear with Logo",
    metaTitle: "Custom Winter Wear with Logo for Employees | Vorixa"
  },
  "backpacks": {
    name: "Custom Backpack in Delhi",
    h2: "Customized Promotional Backpacks with Logo",
    metaTitle: "Custom Backpacks Manufacturers in Delhi NCR"
  },
  "foldable-bags": {
    name: "Custom Foldable Bag in Delhi",
    h2: "Customised Foldable Bag",
    metaTitle: "Custom Foldable Bags for Corporate Gifting | Vorixa"
  },
  "duffle-bags": {
    name: "Custom Duffle Bag Manufacturers in Delhi",
    h2: "Promotional Printed Duffle Bag",
    metaTitle: "Custom Duffle Bags with Logo for Promotions | Vorixa"
  },
  "tote-bags": {
    name: "Custom Tote Bags Manufacturers in Delhi",
    h2: "promotional tote bags with logo",
    metaTitle: "Custom Logo Tote Bags for Branding & Gifting | Vorixa"
  },
  "sipper": {
    name: "Custom Sippers in Delhi",
    h2: "Personalized Sipper Bottles",
    metaTitle: "Custom Sipper Bottles for Branding & Gifting | Vorixa"
  },
  "coffee-mug": {
    name: "custom coffee mugs near me",
    h2: "Custom Printed Coffee Mug",
    metaTitle: "Custom Coffee Mugs for Office Branding | Vorixa"
  },
  "ceramic-mug": {
    name: "Custom Ceramic Mugs",
    h2: "Custom Promotional Ceramic Mugs",
    metaTitle: "Custom Logo Ceramic Mugs for Office Use | Vorixa"
  },
  "welcome-kits": {
    name: "Custom Welcome Kit",
    h2: "Customized Employee Welcome Kit",
    metaTitle: "Corporate Welcome Kits with Custom Branding | Vorixa"
  },
  "promotional-clocks": {
    name: "Custom Promotional Clocks in delhi",
    h2: "Customized Promotional Clocks",
    metaTitle: "Custom Wall Clocks with Logo for Office | Vorixa"
  },
  "keychains": {
    name: "Custom made keychains",
    h2: "Promotional made keychains",
    metaTitle: "Custom Keychains with Logo for Promotions | Vorixa"
  },
  "file-and-folder": {
    name: "Custom Files & Folder for Office",
    h2: "Promotional Branding File and Folder",
    metaTitle: "Custom Files & Folders with Logo | Vorixa India"
  },
  "notebooks-and-diary-sets": {
    name: "Custom Notebooks & Diaries",
    h2: "Custom Printed Notebook",
    metaTitle: "Custom Notebooks & Diary Sets for Gifting | Vorixa"
  },
  "pen-and-writing-set": {
    name: "Custom Pen & Writing Set",
    h2: "Custom Pen with Logo",
    metaTitle: "Customized Pens & Writing Sets for Corporate Gifts | Vorixa"
  },
  "lanyard-and-id-card": {
    name: "Custom Lanyard & ID Card in Delhi NCR",
    h2: "Customized Lanyard & ID Card",
    metaTitle: "Custom Printed Lanyards & ID Cards for Offices | Vorixa"
  },
  "wireless-charging": {
    name: "Custom Wireless Charger with Logo & Name",
    h2: "Personalised Custom Chargers With Logo",
    metaTitle: "Promotional Wireless Charging Accessories | Vorixa"
  },
  "computer-accessories": {
    name: "Custom Computer Accessories in Delhi NCR",
    h2: "personalized computer accessories",
    metaTitle: "Custom Office Computer Accessories with Logo | Vorixa"
  },
  "power-banks": {
    name: "Customized Power Bank in Delhi NCR",
    h2: "Promotional custom Power Bank",
    metaTitle: "Custom Power Banks with Logo for Promotions | Vorixa"
  },
  "desktop-and-mousepad": {
    name: "Custom Mouse pad in Delhi",
    h2: "Custom Printing  Mouse pad",
    metaTitle: "Custom Mousepads & Desktop Accessories for Branding"
  },
  "trophy-and-momento": {
    name: "Custom Trophy and Momento",
    h2: "Customised Corporate Trophies and Awards",
    metaTitle: "Custom Trophies & Mementos for Corporate Awards | Vorixa"
  },
  "cork-sheet": {
    name: "customized Cork Sheet",
    h2: "Promotional Cork Sheet",
    metaTitle: "Custom Cork Sheets for Corporate Use | Vorixa"
  },
  "cork-corporate-gifting-combo": {
    name: "Custom Cork Corporate Gifting Combos",
    h2: "Promotional Cork Corporate Gifting Combo",
    metaTitle: "Cork Corporate Gift Combos for Branding | Vorixa"
  },
  "cork-coaster": {
    name: "customized Cork Coaster in Delhi NCR",
    h2: "Promotional Cork Coaster",
    metaTitle: "Custom Cork Coasters for Branding & Gifting | Vorixa"
  },
  "cork-plant-decorate": {
    name: "Custom Cork Plant Decorate in Delhi NCR",
    h2: "Promotional Cork Plant Decorate",
    metaTitle: "Cork Plant Decor Items with Custom Branding for Offices"
  },
  "cork-serving-decorate": {
    name: "Custom Cork Serving Decoratives",
    h2: "Promotional Cork Serving Decorate",
    metaTitle: "Custom Cork Products for Hotels & Restaurants | Vorixa"
  },
  "cork-horeca-range": {
    name: "Custom Cork Horeca Range in Delhi NCR",
    h2: "Promotional Cork Horeca Range",
    metaTitle: "Eco-Friendly Cork Products for HoReCa Branding | Vorixa"
  },
  "cork-premium-lighting": {
    name: "Custom Cork Premium Lighting",
    h2: "Promotional Cork Premium Lighting",
    metaTitle: "Custom Cork Lighting for Sustainable Interiors | Vorixa"
  },
  "cork-premium-gift-boxes": {
    name: "Custom Cork Premium Gift Box",
    h2: "Promotional Cork Premium Gift Boxes",
    metaTitle: "Custom Cork Premium Gift Box for Corporate Gifting | Vorixa"
  },
  "cork-desk-top-accessories": {
    name: "Custom Cork Desk Top Accessories",
    h2: "Promotional Cork Desk Top Accessories",
    metaTitle: "Cork Desk Accessories for Offices & Gifting | Vorixa"
  },
  "cork-laptop-bag-and-wallet": {
    name: "Custom Cork Laptop Bags & Wallets",
    h2: "Promotional Custom Cork Laptop Bags & Wallets",
    metaTitle: "Custom Laptop Backpacks for Office & Branding | Vorixa"
  },
  "cork-yoga-accessories": {
    name: "Custom Cork Yoga Accessories",
    h2: "Promotional Custom Cork Yoga Accessories",
    metaTitle: "Custom Cork Yoga Products for Promotions | Vorixa"
  }
};

let categoryData = fs.readFileSync('backend/data/categoryData.js', 'utf8');

for (const [slug, data] of Object.entries(updates)) {
  if (data.name) {
    const nameRegex = new RegExp(`(name:\\s*")([^"]*)(".*slug:\\s*"${slug}")`, 'g');
    categoryData = categoryData.replace(nameRegex, `$1${data.name}$3`);
  }
  if (data.metaTitle) {
    // find slug first, then replace the next metaTitle
    const slugIndex = categoryData.indexOf(`slug: "${slug}"`);
    if (slugIndex !== -1) {
      const metaTitleRegex = /metaTitle:\s*"([^"]*)"/;
      const textAfterSlug = categoryData.substring(slugIndex);
      const match = textAfterSlug.match(metaTitleRegex);
      if (match) {
        const replacement = `metaTitle: "${data.metaTitle}"`;
        const updatedText = textAfterSlug.replace(match[0], replacement);
        categoryData = categoryData.substring(0, slugIndex) + updatedText;
      }
    }
  }
}

fs.writeFileSync('backend/data/categoryData.js', categoryData);
console.log('categoryData.js updated.');

let descData = fs.readFileSync('frontend/src/data/subcategorydescriptions.jsx', 'utf8');

for (const [slug, data] of Object.entries(updates)) {
  if (data.h2) {
    const slugIndex = descData.indexOf(`"${slug}":`);
    if (slugIndex !== -1) {
      const h3Regex = /<h3>(.*?)<\/h3>/;
      const textAfterSlug = descData.substring(slugIndex);
      const match = textAfterSlug.match(h3Regex);
      if (match) {
        const replacement = `<h3>${data.h2}</h3>`;
        // only replace the first occurrence after the slug
        const updatedText = textAfterSlug.replace(match[0], replacement);
        descData = descData.substring(0, slugIndex) + updatedText;
      }
    }
  }
}

fs.writeFileSync('frontend/src/data/subcategorydescriptions.jsx', descData);
console.log('subcategorydescriptions.jsx updated.');
