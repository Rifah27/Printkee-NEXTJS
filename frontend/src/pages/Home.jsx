import React from 'react';
import { Helmet } from "react-helmet";

import HeroSection from "../components/HeroSection";
import CategorySlider from "../components/CategorySlider";
import OurServices from '../components/OurServices';
import ShopByOccasion from '../components/ShopByOccasion';
import WhyChooseUs from '../components/WhyChooseUs';
import Industries from '../components/Industries';
import HowitWorks from '../components/HowitWorks';
import Testimonials from '../components/Testimonials';
import GetQuoteCTA from '../components/GetQuoteCTA';
import FaqSectionHome from '../components/FaqSectionHome';


const Home = () => {
  return (
    <>
     
      <Helmet>
        <title>Premium Corporate Gifting & Custom Branding Solutions India
</title>

        <meta
          name="description"
          content="Discover top corporate gifting items with custom branding for events, promotions, onboarding and office needs. Fast delivery, bulk order support across India."
        />

        <meta
          name="keywords"
          content="corporate gifting India, MF Global Services, business gifts, employee gifts, custom hampers, promotional items, branded merchandise"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://printkee.com" />
      </Helmet>

      {/* Page Content */}
      <HeroSection />
      <CategorySlider />
      <ShopByOccasion />
      <OurServices />
      <WhyChooseUs />
      <Industries />
      <FaqSectionHome />
      
      <HowitWorks />
      <Testimonials />
      <GetQuoteCTA />
    </>
  );
};

export default Home;
