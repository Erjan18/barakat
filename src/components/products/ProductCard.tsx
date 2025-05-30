import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Star, Eye } from 'lucide-react';
import { Product } from '../../data/products';
import { useWishlist } from '../../contexts/WishlistContext';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';
import { formatPrice } from '../../lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  const { showToast } = useToast();
  
  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showToast({
        title: 'Удалено из избранного',
        description: product.name,
        variant: 'default'
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      });
      showToast({
        title: 'Добавлено в избранное',
        description: product.name,
        variant: 'success'
      });
    }
  };
  
  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1
    });
    showToast({
      title: 'Добавлено в корзину',
      description: product.name,
      variant: 'success'
    });
  };
  
  return (
    <div className="card card-hover overflow-hidden">
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
            onClick={toggleWishlist}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isInWishlist(product.id) 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-800 hover:bg-emerald-700 hover:text-white'
            }`}
            aria-label="Toggle wishlist"
          >
            <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
          </button>
          {/* <Link 
            to={`/product/${product.id}`}
            className="w-10 h-10 rounded-full bg-white text-gray-800 hover:bg-emerald-700 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Quick view"
          >
        
          </Link> */}
          <button 
            onClick={handleAddToCart}
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
              {formatPrice(product.oldPrice)}
            </span>
          )}
          <span className="text-lg font-semibold text-emerald-700">
            {formatPrice(product.price)}
          </span>
        </div>
        
        {/* Add to Cart Button (Mobile/Alternative) */}
        <button 
          onClick={handleAddToCart}
          className="mt-3 w-full btn btn-primary"
        >
          В корзину
        </button>
      </div>
    </div>
  );
};

// Helper function to get the correct Russian word form based on count
function getReviewText(count: number): string {
  if (count % 10 === 1 && count % 100 !== 11) return 'отзыв';
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'отзыва';
  return 'отзывов';
}

export default ProductCard;