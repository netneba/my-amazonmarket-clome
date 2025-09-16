import React from 'react';
import Layout from '../../Layout/Layout';
import AmCarousel from '../../Carousel/AmCarousel';
import Category from '../../Categories/Category';
import ProductSection from '../../ProductSection/ProductSection';

const Landing = () => {
  return (
    <Layout>
      <AmCarousel />
      <Category />
      <ProductSection />
    </Layout>
  );
};

export default Landing;
