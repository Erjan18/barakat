import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { products, Product } from '../data/products';
import ProductCard from '../components/products/ProductCard';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const query = searchParams.get('q') || '';
  
  // Set document title
  useEffect(() => {
    document.title = `Поиск: ${query} - Barakat`;
  }, [query]);
  
  // Perform search when query changes
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call delay
    const timeoutId = setTimeout(() => {
      const results = products.filter(product => {
        const searchText = query.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchText) ||
          product.description.toLowerCase().includes(searchText) ||
          product.category.toLowerCase().includes(searchText) ||
          (product.subcategory && product.subcategory.toLowerCase().includes(searchText))
        );
      });
      
      setSearchResults(results);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [query]);
  
  const handleClearSearch = () => {
    setSearchParams({});
  };
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">Результаты поиска</h1>
          
          <div className="flex items-center">
            <div className="relative flex-grow">
              <input
                type="text"
                value={query}
                onChange={(e) => setSearchParams({ q: e.target.value })}
                placeholder="Поиск товаров..."
                className="input pr-10"
              />
              {query && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <button
              className="ml-2 btn btn-primary h-full px-4 py-2"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-700 mx-auto"></div>
            <p className="mt-4 text-gray-600">Поиск товаров...</p>
          </div>
        ) : (
          <>
            {query ? (
              <>
                <div className="mb-6">
                  {searchResults.length > 0 ? (
                    <p className="text-gray-600">
                      Найдено {searchResults.length} {getProductsText(searchResults.length)} по запросу "{query}"
                    </p>
                  ) : (
                    <p className="text-gray-600">
                      По запросу "{query}" ничего не найдено
                    </p>
                  )}
                </div>
                
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {searchResults.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <div className="text-center">
                      <Search size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Товары не найдены</h3>
                      <p className="text-gray-600 mb-6">
                        Попробуйте изменить поисковый запрос или перейти в каталог
                      </p>
                      <Link 
                        to="/catalog"
                        className="btn btn-primary px-8 py-3"
                      >
                        Перейти в каталог
                      </Link>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="text-center">
                  <Search size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Введите поисковый запрос</h3>
                  <p className="text-gray-600">
                    Начните вводить название товара, категории или другую информацию
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Helper function to get the correct Russian word form based on count
function getProductsText(count: number): string {
  if (count % 10 === 1 && count % 100 !== 11) return 'товар';
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'товара';
  return 'товаров';
}

export default SearchPage;