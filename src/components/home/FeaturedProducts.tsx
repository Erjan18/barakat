import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { products, Product } from '../../data/products';
import { useWishlist } from '../../contexts/WishlistContext';
import { useCart } from '../../contexts/CartContext';

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  filter: (product: Product) => boolean;
  limit?: number;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  title, 
  subtitle, 
  filter, 
  limit = 8
}) => {
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  
  // Filter and limit products
  const filteredProducts = products.filter(filter).slice(0, limit);
  
  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1
    });
  };
  
  const handleAddToWishlist = (product: Product) => {
    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    });
  };
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
          {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card card-hover overflow-hidden">
              {/* Product Image with Hover Actions */}
              <div className="relative group">
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                </Link>
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      Новинка
                    </span>
                  )}
                  {product.oldPrice && (
                    <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      Скидка {Math.round((1 - product.price / product.oldPrice) * 100)}%
                    </span>
                  )}
                </div>
                
                {/* Hover Action Buttons */}
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button 
                    onClick={() => handleAddToWishlist(product)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isInWishlist(product.id) 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white text-gray-800 hover:bg-emerald-700 hover:text-white'
                    }`}
                    aria-label="Add to wishlist"
                  >
                    <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                  </button>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-10 h-10 rounded-full bg-white text-gray-800 hover:bg-emerald-700 hover:text-white flex items-center justify-center transition-colors"
                    aria-label="Add to cart"
                  >
                    <ShoppingBag size={18} />
                  </button>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                <Link to={`/product/${product.id}`} className="block">
                  <h3 className="text-lg font-medium text-gray-800 hover:text-emerald-700 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                
                {/* Rating */}
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.reviewCount} {getReviewText(product.reviewCount)}
                  </span>
                </div>
                
                {/* Price */}
                <div className="mt-3 flex items-center">
                  {product.oldPrice && (
                    <span className="text-sm text-gray-500 line-through mr-2">
                      {product.oldPrice} сом
                    </span>
                  )}
                  <span className="text-lg font-semibold text-emerald-700">
                    {product.price} сом
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Link */}
        <div className="text-center mt-10">
          <Link 
            to="/catalog"
            className="btn btn-outline py-3 px-8"
          >
            Смотреть все товары
          </Link>
        </div>
      </div>
    </section>
  );
};

// Helper function to get the correct Russian word form based on count
function getReviewText(count: number): string {
  if (count % 10 === 1 && count % 100 !== 11) return 'отзыв';
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'отзыва';
  return 'отзывов';
}

export default FeaturedProducts;