import React  from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SubcategoryPage from "./pages/SubcategoryPage";
import SingleProductPage from "./pages/SingleProductPage";
import ProductPage from "./pages/ProductPage";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import Brands from "./pages/Brands";
import ContactUs from "./pages/ContactUs";
import Sitemap from "./pages/Sitemap";
import BlogList from "./pages/BlogList";
import BlogForm from "./pages/BlogForm";
import BlogView from "./pages/BlogView";
import SearchResults from "./pages/SearchResults";
import Diwali from "./pages/Diwali";
import "../src/styles/global.css";
import CustomizerSVG from "./pages/Customize/CustomizerSVG";
import CustomizerAll from "./pages/Customize/CustomizerAll";
import FloatingButton from "./components/FloatingButton";
import BrandsDisplay from "./pages/BrandsDisplay";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HeroManagerPage from "./pages/admin/HeroManagerPage";
import CategoryManager from "./pages/admin/CategoryManagerPage";
import SubcategoryManager from "./pages/admin/SubcategoryManagerPage";
import ProductManager from "./pages/admin/ProductManagerPage";

function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Navbar */}
      {!isAdminRoute && <Navbar />}

      {/* MAIN CONTENT */}
      <main id="main-content" role="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/brands/:brand" element={<BrandsDisplay />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/diwali-special" element={<Diwali />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/post" element={<BlogForm />} />
          <Route path="/blog/:id" element={<BlogView />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/:category" element={<SubcategoryPage />} />
          <Route path="/:category/:subcategory" element={<ProductPage />} />
          <Route
            path="/:category/:subcategory/:product"
            element={<SingleProductPage />}
          />
          <Route path="/customize/:productType" element={<CustomizerSVG />} />
          <Route path="/customize" element={<CustomizerAll />} />
          <Route path="/login" element={<Login />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route index element={<AdminDashboard />} />
            <Route path="banners" element={<HeroManagerPage />} />
            <Route path="categories" element={<CategoryManager />} />
            <Route path="subcategories" element={<SubcategoryManager />} />
            <Route path="products" element={<ProductManager />} />
          </Route>
        </Routes>
      </main>

      {/* Floating Button */}
      {!isAdminRoute && <FloatingButton />}

      {/* Footer */}
      {!isAdminRoute && <Footer />}

      <ScrollToTop />

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
