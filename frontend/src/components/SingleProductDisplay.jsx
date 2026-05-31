import React, { useEffect, useState } from "react";
import "../styles/SingleProductDisplay.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaChevronLeft } from "react-icons/fa";
import { MdRequestQuote } from "react-icons/md";
import EnquiryModal from "./EnquiryModal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Helmet } from "react-helmet";
import WhyChooseUsProduct from "./category/WhyChooseUsProduct";
import ProductFAQ from "./category/FAQProduct";

const SingleProductDisplay = () => {
  const {
    category: categorySlug,
    subcategory: subcategorySlug,
    product: productSlug,
  } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState(null);
  const [subcategoryData, setSubcategoryData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const canonicalUrl = `https://printkee.com/${categorySlug}/${subcategorySlug}/${productSlug}`;

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/product/product-fetch/${categorySlug}/${subcategorySlug}/${productSlug}`
        );

        setCategoryData(res.data.category);
        setSubcategoryData(res.data.subcategory);
        setProductData(res.data.product);

        setSelectedStyle(
          res.data.product.attributes?.size?.[0] || ""
        );

        setMainImage(
          res.data.product.images?.[0]?.url ||
          res.data.product.subImages?.[0]?.url ||
          ""
        );
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };
    fetchProduct();
  }, [categorySlug, subcategorySlug, productSlug]);

  // FETCH RELATED PRODUCTS
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/product/related-products/${categorySlug}/${subcategorySlug}/${productSlug}`
        );
        setRelatedProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch related products", err);
      }
    };
    fetchRelatedProducts();
  }, [categorySlug, subcategorySlug, productSlug]);

  if (!productData || !subcategoryData || !categoryData)
    return <div>Loading...</div>;

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>
          {productData.seo?.metaTitle ||
            `${productData.name} | ${subcategoryData.name} - MF Global Services`}
        </title>
        <meta
          name="description"
          content={
            productData.seo?.metaDescription ||
            productData.description?.short ||
            `Explore premium ${productData.name} from our ${subcategoryData.name} range.`
          }
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="single-product-page">
        <div className="single-product-container">

          {/* PRODUCT IMAGES */}
          <div className="product-right">
            <div className="image-section">

              {productData.subImages?.length > 0 && (
                <div className="thumbnail-column">
                  {productData.subImages.map((img, i) => (
                    <img
                      key={i}
                      src={img.url}
                      loading="lazy"
                      alt={img.altText || productData.name}
                      className={`thumbnail ${mainImage === img.url ? "active" : ""
                        }`}
                      onClick={() => setMainImage(img.url)}
                    />
                  ))}
                </div>
              )}

              <div className="main-image-wrapper">
                <img
                  src={mainImage}
                  alt={productData.images?.[0]?.altText || productData.name}
                  className="main-image"
                />
              </div>
            </div>
          </div>

          {/* PRODUCT DETAILS */}
          <div className="product-left">

            <button
              className="back-button-2"
              onClick={() =>
                window.history.length > 2
                  ? navigate(-1)
                  : navigate(`/${categorySlug}/${subcategorySlug}`)
              }
            >
              <FaChevronLeft /> Back to {subcategoryData.name}
            </button>

            <h1 className="product-title-1">{productData.name}</h1>

            <h3 className="description-title">Description:</h3>
            <p className="product-description">
              {productData.description?.long}
            </p>

            {/* STYLES */}
            {productData.attributes?.size?.length > 0 && (
              <div className="style-section">
                <label>Style:</label>
                <div className="style-buttons">
                  {productData.attributes.size.map((style) => (
                    <button
                      key={style}
                      className={selectedStyle === style ? "active" : ""}
                      onClick={() => setSelectedStyle(style)}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY */}
            <div className="quantity-section">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            {/* CTA */}
            <div className="cart-buttons">
              <button
                className="add-to-cart-2"
                onClick={() => {
                  let route = "/customize";
                  if (subcategorySlug === "polo-t-shirts") route = "/customize/polotshirt";
                  if (subcategorySlug === "round-neck-t-shirts") route = "/customize/roundneck";
                  if (subcategorySlug === "caps") route = "/customize/cap";

                  navigate(route, {
                    state: {
                      productName: productData.name,
                      productImages: [
                        productData.images?.[0]?.url,
                        ...(productData.subImages?.map((i) => i.url) || []),
                      ],
                      subcategory: subcategoryData.name,
                    },
                  });
                }}
              >
                Customize Now
              </button>

              <button className="get-quote" onClick={() => setShowModal(true)}>
                Get a Quote <MdRequestQuote />
              </button>
            </div>
          </div>
        </div>

        {/* SPECIFICATIONS */}
        <div className="product-spec-section">
          <h3 className="spec-title">Product Specifications</h3>

          <table className="spec-table">
            <tbody>
              {/* SKU */}
              {productData.sku && (
                <tr>
                  <td>SKU</td>
                  <td>{productData.sku}</td>
                </tr>
              )}

              {/* MATERIAL */}
              {productData.attributes?.material && (
                <tr>
                  <td>Material</td>
                  <td>{productData.attributes.material}</td>
                </tr>
              )}

              {/* SIZES */}
              {productData.attributes?.size?.length > 0 && (
                <tr>
                  <td>Available Sizes</td>
                  <td>{productData.attributes.size.join(", ")}</td>
                </tr>
              )}

              {/* COLORS */}
              {productData.attributes?.color?.length > 0 && (
                <tr>
                  <td>Available Colours</td>
                  <td>{productData.attributes.color.join(", ")}</td>
                </tr>
              )}

              {/* ADDITIONAL INFO */}
              {productData.additionalInfo?.length > 0 &&
                productData.additionalInfo.map((info, i) => (
                  <tr key={`add-${i}`}>
                    <td>{info.label}</td>
                    <td>{info.value}</td>
                  </tr>
                ))}

              {/* SPECIFICATIONS */}
              {productData.specifications?.length > 0 &&
                productData.specifications.map((spec, i) => (
                  <tr key={`spec-${i}`}>
                    <td>{spec.key}</td>
                    <td>{spec.value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <WhyChooseUsProduct
          productName={productData.name}
          subcategoryName={subcategoryData.name}
        />

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h2 className="related-title">You May Also Like</h2>

            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={2}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
            >
              {relatedProducts.map((relProd, i) => (
                <SwiperSlide key={i}>
                  <button
                    className="related-product-card"
                    onClick={() => {
                      navigate(`/${categorySlug}/${subcategorySlug}/${relProd.slug}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <img
                      src={relProd.images?.[0]?.url}
                      alt={relProd.name}
                      className="related-product-image"
                    />
                    <p className="related-product-name">{relProd.name}</p>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>

      <ProductFAQ
        productName={productData.name}
        subcategoryName={subcategoryData.name}
        categoryName={categoryData.name}
      />

      <EnquiryModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        image={productData.images?.[0]?.url}
        description={`Get a personalized quote for ${productData.name}.`}
      />
    </>
  );
};

export default SingleProductDisplay;
