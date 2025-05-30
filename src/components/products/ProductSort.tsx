import React from 'react';
import { ChevronDown } from 'lucide-react';

export type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'newest' | 'rating';

interface ProductSortProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  itemCount: number;
}

const ProductSort: React.FC<ProductSortProps> = ({ currentSort, onSortChange, itemCount }) => {
  const sortOptions = [
    { value: 'popular', label: 'Популярные' },
    { value: 'price-asc', label: 'Цена: по возрастанию' },
    { value: 'price-desc', label: 'Цена: по убыванию' },
    { value: 'newest', label: 'Новинки' },
    { value: 'rating', label: 'По рейтингу' }
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
      <div className="text-gray-600 mb-3 md:mb-0">
        Найдено товаров: <span className="font-medium">{itemCount}</span>
      </div>
      
      <div className="relative">
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
};

export default ProductSort;