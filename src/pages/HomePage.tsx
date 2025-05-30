import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import FeaturesBanner from '../components/home/FeaturesBanner';
import Newsletter from '../components/home/Newsletter';
import { Product } from '../data/products';

const HomePage: React.FC = () => {
  // Filter for popular products
  const isPopular = (product: Product) => !!product.isPopular;
  
  // Filter for new products
  const isNew = (product: Product) => !!product.isNew;
  
  // Filter for discounted products
  const isDiscounted = (product: Product) => !!product.oldPrice;
  
  // Set document title
  React.useEffect(() => {
    document.title = 'Barakat - Мусульманские товары в Бишкеке';
  }, []);
  
  return (
    <div>
      <HeroBanner />
      
      <CategorySection />
      
      <FeaturedProducts 
        title="Популярные товары"
        subtitle="Самые востребованные товары нашего магазина"
        filter={isPopular}
        limit={8}
      />
      
      <FeaturesBanner />
      
      <FeaturedProducts 
        title="Новинки"
        subtitle="Свежие поступления в нашем магазине"
        filter={isNew}
        limit={4}
      />
      
      <FeaturedProducts 
        title="Специальные предложения"
        subtitle="Товары со скидками и акциями"
        filter={isDiscounted}
        limit={4}
      />
      
      <Newsletter />
    </div>
  );
};

export default HomePage;