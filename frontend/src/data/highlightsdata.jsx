import {
  Boxes,
  Gift,
  Shirt,
  PackageCheck,
  PenTool,
  Recycle,
  ShoppingBag,
  Laptop,
  Sparkles,
  ShieldCheck,
  Smartphone,
  Cpu,
  Usb,
  Coffee,
  Medal,
} from "lucide-react";

const categoryHighlights = {
  
  "apparel-and-accessories": {
    heading: "Why Choose Our Customized Apparel & Accessories?",
    highlights: [
      {
        icon: <Shirt size={40} />,
        title: "Premium Fabrics & Stylish Designs",
        description:
          "Choose from high-quality cotton, polyester, dri-fit, hoodies, and winter wear ideal for employee uniforms, events, and promotional activities.",
      },
      {
        icon: <PenTool size={40} />,
        title: "Logo Printing & Embroidery Options",
        description:
          "DTF printing, screen printing, and embroidery provide long-lasting and vibrant branding for T-shirts, caps, shirts, aprons, and more.",
      },
      {
        icon: <PackageCheck size={40} />,
        title: "Bulk Corporate Order Ready",
        description:
          "Perfect for corporate promotions, HR onboarding, events, colleges, NGOs, and marketing campaigns with fast pan-India delivery.",
      },
      {
        icon: <ShieldCheck size={40} />,
        title: "Durable & Comfortable Wearables",
        description:
          "All apparel items are designed for everyday comfort with superior stitching and brand-first finishing.",
      },
    ],
  },

 
  "office-and-writing": {
    heading: "Premium Office & Writing Essentials for Branding",
    highlights: [
      {
        icon: <PenTool size={40} />,
        title: "Branded Pens, Notebooks & Diaries",
        description:
          "Custom printed pens, eco-friendly notebooks, and premium diaries for corporate gifting, meetings, and events.",
      },
      {
        icon: <Boxes size={40} />,
        title: "Corporate Office Sets",
        description:
          "File folders, ID cards, lanyards, and office stationery gift sets ideal for professional use and mass distribution.",
      },
      {
        icon: <Sparkles size={40} />,
        title: "Professional Branding Quality",
        description:
          "UV printing, foil stamping, and laser engraving deliver high-end branding for business communication.",
      },
      {
        icon: <Gift size={40} />,
        title: "Perfect for Employees & Clients",
        description:
          "Ideal for office staff, conferences, seminars, training sessions, and promotional giveaways.",
      },
    ],
  },


  "bags-and-travel": {
    heading: "Customized Bags Designed for Corporate Branding",
    highlights: [
      {
        icon: <ShoppingBag size={40} />,
        title: "Wide Range of Corporate Bags",
        description:
          "Choose from backpacks, tote bags, duffle bags, foldable bags, laptop bags, and travel accessories for gifting and branding.",
      },
      {
        icon: <Recycle size={40} />,
        title: "Eco-Friendly Options Available",
        description:
          "Sustainable bags made from cotton, canvas, and jute — ideal for eco-conscious corporate gifting.",
      },
      {
        icon: <PenTool size={40} />,
        title: "High-Quality Branding & Printing",
        description:
          "Multi-color printing, embroidery, and premium logo placement options to enhance brand visibility.",
      },
      {
        icon: <PackageCheck size={40} />,
        title: "Durable & Travel-Ready Designs",
        description:
          "Built with strong materials and practical design, perfect for daily office use and corporate travel.",
      },
    ],
  },


  "collection": {
    heading: "Premium Corporate Gift Collections for Every Occasion",
    highlights: [
      {
        icon: <Gift size={40} />,
        title: "Welcome Kits & Employee Gift Boxes",
        description:
          "Curated onboarding kits with stationery, tech gadgets, apparel, and drinkware tailored for new employees.",
      },
      {
        icon: <Medal size={40} />,
        title: "Premium Executive & Desktop Gifts",
        description:
          "Desk organizers, clocks, keychains, and executive sets perfect for client gifting and office branding.",
      },
      {
        icon: <Sparkles size={40} />,
        title: "Personalized Corporate Souvenirs",
        description:
          "Custom-designed promotional items ideal for events, seminars, exhibitions, and trade shows.",
      },
      {
        icon: <PackageCheck size={40} />,
        title: "Ready-to-Gift Premium Packaging",
        description:
          "High-end customizable packaging options to elevate the gifting experience for employees and clients.",
      },
    ],
  },


  "drink-ware": {
    heading: "High-Quality Custom Drinkware for Corporate Gifting",
    highlights: [
      {
        icon: <Coffee size={40} />,
        title: "Wide Range of Bottles & Mugs",
        description:
          "Stainless steel, bamboo, insulated, ceramic, and travel mugs perfect for everyday use and gifting.",
      },
      {
        icon: <PenTool size={40} />,
        title: "Laser Engraving & UV Printing",
        description:
          "Premium printing ensures your logo stays sharp, vibrant, and fade-proof on all drinkware items.",
      },
      {
        icon: <Recycle size={40} />,
        title: "Eco-Friendly Options",
        description:
          "Sipper bottles, bamboo bottles, and reusable drinkware for sustainable corporate gifting.",
      },
      {
        icon: <Gift size={40} />,
        title: "Ideal for Employees & Events",
        description:
          "A practical and beloved corporate gift for offices, conferences, and client engagement.",
      },
    ],
  },


  "technology-accessories": {
    heading: "Modern Tech Accessories for Smart Corporate Gifting",
    highlights: [
      {
        icon: <Smartphone size={40} />,
        title: "Latest Tech Gadgets",
        description:
          "Power banks, wireless chargers, Bluetooth speakers, and USB drives designed for modern workplaces.",
      },
      {
        icon: <Cpu size={40} />,
        title: "High-Quality Branding",
        description:
          "Precision printing, engraving, and custom logo placement for durable, premium tech branding.",
      },
      {
        icon: <Laptop size={40} />,
        title: "Ideal for IT Teams & Events",
        description:
          "Perfect promotional items for tech companies, corporate events, digital campaigns, and staff gifting.",
      },
      {
        icon: <Usb size={40} />,
        title: "Useful Everyday Tools",
        description:
          "Cable kits, mousepads, laptop stands, and desktop accessories employees use daily.",
      },
    ],
  },


  "eco-products": {
    heading: "Eco-Friendly Corporate Gifts for Sustainable Branding",
    highlights: [
      {
        icon: <Recycle size={40} />,
        title: "Sustainable Cork & Bamboo Range",
        description:
          "Eco-friendly corporate gifting options including cork yoga items, cork bags, bamboo drinkware, and natural décor.",
      },
      {
        icon: <Sparkles size={40} />,
        title: "Premium Natural Aesthetic",
        description:
          "Beautifully crafted gifts with a modern, earthy finish ideal for green branding campaigns.",
      },
      {
        icon: <Gift size={40} />,
        title: "Perfect for Eco-Conscious Brands",
        description:
          "Ideal for companies focusing on sustainability, CSR activities, and environment-friendly events.",
      },
      {
        icon: <PackageCheck size={40} />,
        title: "Reusable & Biodegradable Materials",
        description:
          "All products are built with biodegradable, recyclable, or renewable materials.",
      },
    ],
  },


  "trophy-and-momento": {
    heading: "Premium Custom Trophies & Momento Gifts",
    highlights: [
      {
        icon: <Medal size={40} />,
        title: "Custom Awards & Trophies",
        description:
          "Glass, crystal, metal, wooden, and acrylic trophies designed for corporate events and award ceremonies.",
      },
      {
        icon: <Gift size={40} />,
        title: "Employee Recognition Gifts",
        description:
          "Premium momentos ideal for employee awards, corporate achievements, appreciation ceremonies, and milestones.",
      },
      {
        icon: <Sparkles size={40} />,
        title: "Elegant Finishing & Branding",
        description:
          "Laser engraving, gold foil, and crystal printing for superior logo presentation and premium appeal.",
      },
      {
        icon: <ShieldCheck size={40} />,
        title: "Perfect for Corporate Events",
        description:
          "Ideal for conferences, award functions, college events, sports tournaments, and recognition programs.",
      },
    ],
  },
};

export default categoryHighlights;
