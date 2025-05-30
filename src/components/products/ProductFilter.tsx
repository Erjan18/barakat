import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { categories } from '../../data/products';

interface FilterOption {
  id: string;
  name: string;
}

export interface FilterState {
  category: string | null;
  subcategory: string | null;
  priceRange: [number, number];
  inStock: boolean;
  isNew: boolean;
  isDiscount: boolean;
}

interface ProductFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  maxPrice: number;
  minPrice: number;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  onFilterChange,
  maxPrice,
  minPrice
}) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(filters.priceRange);

  // Get subcategories based on selected category
  const getSubcategories = (): FilterOption[] => {
    if (!filters.category) return [];
    const category = categories.find(c => c.id === filters.category);
    return category ? category.subcategories : [];
  };

  const handleCategoryChange = (categoryId: string | null) => {
    onFilterChange({
      ...filters,
      category: categoryId,
      subcategory: null // Reset subcategory when category changes
    });
  };

  const handleSubcategoryChange = (subcategoryId: string | null) => {
    onFilterChange({
      ...filters,
      subcategory: subcategoryId
    });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setLocalPriceRange([min, max]);
  };

  const applyPriceRange = () => {
    onFilterChange({
      ...filters,
      priceRange: localPriceRange
    });
  };

  const handleCheckboxChange = (filterName: 'inStock' | 'isNew' | 'isDiscount', value: boolean) => {
    onFilterChange({
      ...filters,
      [filterName]: value
    });
  };

  const resetFilters = () => {
    onFilterChange({
      category: null,
      subcategory: null,
      priceRange: [minPrice, maxPrice],
      inStock: false,
      isNew: false,
      isDiscount: false
    });
    setLocalPriceRange([minPrice, maxPrice]);
  };

  return (
    <div className="mb-6">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <button
          className="w-full flex items-center justify-center bg-emerald-700 text-white px-4 py-2 rounded-md"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          <Filter size={18} className="mr-2" />
          Фильтры
        </button>
      </div>

      {/* Filter Panel */}
      <div className={`
        ${isMobileFilterOpen ? 'block' : 'hidden'} md:block
        bg-white p-4 rounded-lg shadow-md
      `}>
        {/* Mobile Close Button */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <h3 className="text-lg font-medium">Фильтры</h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setIsMobileFilterOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h4 className="text-gray-800 font-medium mb-3">Категории</h4>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category.id} className="flex items-center">
                <input
                  type="radio"
                  id={`category-${category.id}`}
                  name="category"
                  checked={filters.category === category.id}
                  onChange={() => handleCategoryChange(category.id)}
                  className="mr-2"
                />
                <label htmlFor={`category-${category.id}`} className="text-gray-700">
                  {category.name}
                </label>
              </div>
            ))}
            <div className="flex items-center mt-2">
              <input
                type="radio"
                id="category-all"
                name="category"
                checked={filters.category === null}
                onChange={() => handleCategoryChange(null)}
                className="mr-2"
              />
              <label htmlFor="category-all" className="text-gray-700">
                Все категории
              </label>
            </div>
          </div>
        </div>

        {/* Subcategories - only show if a category is selected */}
        {filters.category && getSubcategories().length > 0 && (
          <div className="mb-6">
            <h4 className="text-gray-800 font-medium mb-3">Подкатегории</h4>
            <div className="space-y-2">
              {getSubcategories().map(subcategory => (
                <div key={subcategory.id} className="flex items-center">
                  <input
                    type="radio"
                    id={`subcategory-${subcategory.id}`}
                    name="subcategory"
                    checked={filters.subcategory === subcategory.id}
                    onChange={() => handleSubcategoryChange(subcategory.id)}
                    className="mr-2"
                  />
                  <label htmlFor={`subcategory-${subcategory.id}`} className="text-gray-700">
                    {subcategory.name}
                  </label>
                </div>
              ))}
              <div className="flex items-center mt-2">
                <input
                  type="radio"
                  id="subcategory-all"
                  name="subcategory"
                  checked={filters.subcategory === null}
                  onChange={() => handleSubcategoryChange(null)}
                  className="mr-2"
                />
                <label htmlFor="subcategory-all" className="text-gray-700">
                  Все подкатегории
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="text-gray-800 font-medium mb-3">Цена</h4>
          <div className="flex items-center mb-4">
            <input
              type="number"
              value={localPriceRange[0]}
              onChange={(e) => handlePriceRangeChange(Number(e.target.value), localPriceRange[1])}
              min={minPrice}
              max={localPriceRange[1]}
              className="w-24 px-2 py-1 border border-gray-300 rounded mr-2"
            />
            <span className="text-gray-500 mx-2">-</span>
            <input
              type="number"
              value={localPriceRange[1]}
              onChange={(e) => handlePriceRangeChange(localPriceRange[0], Number(e.target.value))}
              min={localPriceRange[0]}
              max={maxPrice}
              className="w-24 px-2 py-1 border border-gray-300 rounded ml-2"
            />
          </div>
          <button
            onClick={applyPriceRange}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm transition-colors"
          >
            Применить
          </button>
        </div>

        {/* Availability */}
        <div className="mb-6">
          <h4 className="text-gray-800 font-medium mb-3">Наличие</h4>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="inStock"
              checked={filters.inStock}
              onChange={(e) => handleCheckboxChange('inStock', e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="inStock" className="text-gray-700">
              В наличии
            </label>
          </div>
        </div>

        {/* Other Filters */}
        <div className="mb-6">
          <h4 className="text-gray-800 font-medium mb-3">Дополнительно</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isNew"
                checked={filters.isNew}
                onChange={(e) => handleCheckboxChange('isNew', e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="isNew" className="text-gray-700">
                Новинки
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isDiscount"
                checked={filters.isDiscount}
                onChange={(e) => handleCheckboxChange('isDiscount', e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="isDiscount" className="text-gray-700">
                Со скидкой
              </label>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded transition-colors"
        >
          Сбросить фильтры
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;