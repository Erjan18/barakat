import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductFilter, { FilterState } from '../components/products/ProductFilter';
import ProductSort, { SortOption } from '../components/products/ProductSort';
import ProductCard from '../components/products/ProductCard';
import { products, Product, categories } from '../data/products';

const CatalogPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();
  const subcategoryParam = searchParams.get('subcategory');
  
  // State for filters and sorting
  const [filters, setFilters] = useState<FilterState>({
    category: category || null,
    subcategory: subcategoryParam || null,
    priceRange: [0, 10000],
    inStock: false,
    isNew: false,
    isDiscount: false
  });
  
  const [sortOption, setSortOption] = useState<SortOption>('popular');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  // Update filters when URL params change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: category || null,
      subcategory: subcategoryParam || null
    }));
  }, [category, subcategoryParam]);
  
  // Calculate min and max prices from all products
  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));
  
  // Update filters.priceRange when min/max prices change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      priceRange: [minPrice, maxPrice]
    }));
  }, [minPrice, maxPrice]);
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(p => p.category === filters.category);
    }
    
    // Apply subcategory filter
    if (filters.subcategory) {
      result = result.filter(p => p.subcategory === filters.subcategory);
    }
    
    // Apply price range filter
    result = result.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );
    
    // Apply in-stock filter
    if (filters.inStock) {
      result = result.filter(p => p.inStock);
    }
    
    // Apply new filter
    if (filters.isNew) {
      result = result.filter(p => p.isNew);
    }
    
    // Apply discount filter
    if (filters.isDiscount) {
      result = result.filter(p => p.oldPrice);
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        result.sort((a, b) => (a.isPopular === b.isPopular) ? 0 : a.isPopular ? -1 : 1);
        break;
    }
    
    setFilteredProducts(result);
  }, [filters, sortOption]);
  
  // Get page title based on category
  const getPageTitle = () => {
    if (filters.category) {
      const categoryData = categories.find(c => c.id === filters.category);
      if (categoryData) {
        if (filters.subcategory) {
          const subcategoryData = categoryData.subcategories.find(s => s.id === filters.subcategory);
          if (subcategoryData) {
            return subcategoryData.name;
          }
        }
        return categoryData.name;
      }
    }
    return 'Каталог товаров';
  };
  
  // Set document title
  useEffect(() => {
    document.title = `${getPageTitle()} - Barakat`;
  }, [filters.category, filters.subcategory]);
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-semibold mb-8">{getPageTitle()}</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with Filters */}
          <div className="w-full lg:w-1/4">
            <ProductFilter 
              filters={filters} 
              onFilterChange={setFilters}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          </div>
          
          {/* Product List */}
          <div className="w-full lg:w-3/4">
            {/* Sort Options */}
            <ProductSort 
              currentSort={sortOption} 
              onSortChange={setSortOption}
              itemCount={filteredProducts.length}
            />
            
            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-medium mb-2">Товары не найдены</h3>
                <p className="text-gray-600">
                  По вашему запросу не найдено товаров. Попробуйте изменить параметры фильтрации.
                </p>
                <button 
                  onClick={() => setFilters({
                    category: null,
                    subcategory: null,
                    priceRange: [minPrice, maxPrice],
                    inStock: false,
                    isNew: false,
                    isDiscount: false
                  })}
                  className="mt-4 btn btn-outline"
                >
                  Сбросить все фильтры
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;