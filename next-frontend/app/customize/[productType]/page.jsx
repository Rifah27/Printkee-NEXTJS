"use client";

import { useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api, getPublicUrl } from "../../../lib/api";
import CustomizerSVG from "../../../components/Customize/CustomizerSVG";
import CustomizerAll from "../../../components/Customize/CustomizerAll";
import { FiLoader } from "react-icons/fi";

const SVG_SUPPORTED = ["polotshirt", "roundneck", "cap"];

export default function CustomizeProductPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const productType = params.productType; 
  const productId = searchParams.get("productId");

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(!!productId);

  useEffect(() => {
    if (productId) {
      api.get(`/product/id/${productId}`)
        .then(res => {
          setProductData(res.data);
        })
        .catch(err => console.error("Failed to load product for customization:", err))
        .finally(() => setLoading(false));
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="customize-page" style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
        <FiLoader className="spin" size={40} />
      </div>
    );
  }

  // Determine props from fetched product or fallback
  let productImages = [];
  let productName = "Custom Product";
  let subcategory = productType;

  if (productData) {
    productName = productData.name;
    subcategory = productData.subcategory?.slug || productData.subcategory || productType;
    productImages = (productData.images || []).map(img => 
      typeof img === "string" ? getPublicUrl(img) : getPublicUrl(img.url)
    );
  } else {
    // Fallback based on product type if no product ID passed
    const fallbackImageMap = {
      apparel: [
        "/assets/products/formalshirts/1.webp",
        "/assets/products/polo/1.webp",
      ],
      "welcome-kits": [
        "/assets/products/welcomekits/1.webp",
        "/assets/products/welcomekits/2.webp",
      ],
      drinkware: [
        "/assets/products/coffeemugs/1.webp",
        "/assets/products/sipperbottles/1.webp",
      ],
      bags: [
        "/assets/products/backpacks/1.webp",
        "/assets/products/dufflebags/1.webp",
      ],
      tech: [
        "/assets/products/wirelesschargers/1.webp",
        "/assets/products/powerbanks/1.webp",
      ],
      "eco-gifts": [
        "/assets/products/cork/1.webp",
        "/assets/products/bamboobottles/1.webp",
      ],
    };

    productImages = fallbackImageMap[productType] || [
      "/assets/products/welcomekits/1.webp",
      "/assets/products/formalshirts/1.webp",
    ];
  }

  const isSVG = SVG_SUPPORTED.includes(productType.toLowerCase());

  return (
    <main className="customize-page-wrapper" style={{ background: '#fbf9f4' }}>
      {isSVG ? (
        <CustomizerSVG 
          productType={productType}
          productImages={productImages}
          productName={productName}
          subcategory={subcategory}
        />
      ) : (
        <CustomizerAll 
          productImages={productImages}
          productName={productName}
          subcategory={subcategory}
        />
      )}
    </main>
  );
}
