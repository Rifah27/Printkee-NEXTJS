import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { FaHeart, FaEye } from "react-icons/fa";
import "../styles/ProductDisplay.css";
import CTABanner from "./CTABanner";
import RelatedCategories from "./RelatedCategories";
import FAQSection from "./category/FAQSection";
import banners from "../data/banners";
import SubcategoryDescription from "./category/SubcategoryDescription";

const ProductDisplay = () => {
  const { category: categorySlug, subcategory: subcategorySlug } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categoryData, setCategoryData] = useState(null);
  const [subcategoryData, setSubcategoryData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/subcategory/subcategory-fetch/${categorySlug}/${subcategorySlug}`
      )
      .then((res) => {
        setProducts(res.data.products || []);
        setCategoryData(res.data.category || null);
        setSubcategoryData(res.data.subcategory || null);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, [categorySlug, subcategorySlug]);

  if (!subcategoryData || !categoryData) return <div>Loading...</div>;

  const categoryName = categoryData.name;
  const subcategoryName = subcategoryData.name;

  const canonicalUrl = `https://printkee.com/${categorySlug}/${subcategorySlug}`;

  const bannerImage =
    banners[categorySlug]?.subcategories?.[subcategorySlug] ||
    banners[categorySlug]?.banner ||
    "/assets/product-banner.webp";

  return (
    <>
      <Helmet>
        <title>
          {subcategoryData?.seo?.metaTitle ||
            `${subcategoryName} | ${categoryName} - MF Global Services`}
        </title>

        <meta
          name="description"
          content={
            subcategoryData?.seo?.metaDescription ||
            subcategoryData?.description ||
            `Explore premium ${subcategoryName} under ${categoryName}.`
          }
        />

        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* Header */}
      <div className="subcategory-header-2">
        <div className="subcategory-header-content">
          <Link
            to={`/${categorySlug}`}
            className="back-link"
            aria-label={`Go back to ${categoryName}`}
          >
            <div className="circle">
              <span className="arrow-2">&larr;</span>
            </div>
            <span className="span-name">Back to {categoryName}</span>
          </Link>

          <h1 className="page-title">{subcategoryName}</h1>
          <p className="subcategory-description">
            {subcategoryData?.description || ""}
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="product-container-2">
        <div className="page-wrapper">
          <div className="product-container">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="breadcrumb-separator">/</span>
              <Link to={`/${categorySlug}`}>{categoryName}</Link>
              <span className="breadcrumb-separator">/</span>
              <span className="current">{subcategoryName}</span>
            </nav>

            <div className="product-grid">
              {products.map((product) => {
                const sizeSelectId = `size-select-${product._id}`;
                const colorSelectId = `color-select-${product._id}`;

                const imageUrl =
                  product.images?.[0]?.url || "/assets/placeholder.webp";

                return (
                  <div key={product._id} className="product-card">
                    <div className="product-image-wrapper">
                      <img
                        className="product-img"
                        src={imageUrl}
                        alt={
                          product.images?.[0]?.altText || product.name
                        }
                      />

                      <div className="product-icons">
                        <button aria-label={`Add ${product.name} to wishlist`}>
                          <FaHeart />
                        </button>
                        <button aria-label={`View details of ${product.name}`}>
                          <FaEye />
                        </button>
                      </div>
                    </div>

                    <h3 className="product-title">{product.name}</h3>

                    <div className="dropdown-group">
                      {product.attributes?.size?.length > 0 && (
                        <>
                          <label htmlFor={sizeSelectId}>Style:</label>
                          <select id={sizeSelectId}>
                            {product.attributes.size.map((s, index) => (
                              <option key={index}>{s}</option>
                            ))}
                          </select>
                        </>
                      )}

                      {product.attributes?.color?.length > 0 && (
                        <>
                          <label htmlFor={colorSelectId}>Color:</label>
                          <select id={colorSelectId}>
                            {product.attributes.color.map((c, index) => (
                              <option key={index}>{c}</option>
                            ))}
                          </select>
                        </>
                      )}
                    </div>

                    <button
                      className="add-to-cart"
                      aria-label={`View product: ${product.name}`}
                      onClick={() =>
                        navigate(
                          `/${categorySlug}/${subcategorySlug}/${product.slug}`
                        )
                      }
                      disabled={product.stock === 0}
                    >
                      {product.stock === 0 ? "Sold out" : "View"} ➤
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <SubcategoryDescription subcategory={subcategorySlug} />

        <CTABanner
          imageSrc={bannerImage}
          linkTo="/contact"
          alt={`Get a Quote for ${subcategoryName}`}
        />
      </div>

      <FAQSection subcategory={subcategorySlug} />

      <RelatedCategories
        categorySlug={categorySlug}
        currentSubcategorySlug={subcategorySlug}
      />
    </>
  );
};

export default ProductDisplay;
