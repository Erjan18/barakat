import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/products';

const CategorySection: React.FC = () => {
  return (
    <section className="py-12 islamic-pattern">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Категории товаров</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link 
              to={`/catalog/${category.id}`}
              key={category.id}
              className="group"
            >
              <div className="card card-hover overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 group-hover:from-emerald-900/70 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <p className="text-sm text-white/80 mt-1">
                      {category.subcategories.length} {getSubcategoriesText(category.subcategories.length)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// Helper function to get the correct Russian word form based on count
function getSubcategoriesText(count: number): string {
  if (count === 1) return 'подкатегория';
  if (count >= 2 && count <= 4) return 'подкатегории';
  return 'подкатегорий';
}

export default CategorySection;