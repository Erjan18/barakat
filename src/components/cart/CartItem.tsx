import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../contexts/CartContext';
import { useCart } from '../../contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateItemQuantity, removeItem } = useCart();
  
  const handleIncreaseQuantity = () => {
    updateItemQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateItemQuantity(item.id, item.quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeItem(item.id);
  };
  
  return (
    <div className="flex flex-col sm:flex-row py-6 border-b">
      {/* Product Image */}
      <div className="w-full sm:w-24 md:w-32 mb-4 sm:mb-0">
        <Link to={`/product/${item.productId}`}>
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-auto object-cover rounded-lg"
          />
        </Link>
      </div>
      
      {/* Product Details */}
      <div className="flex-1 sm:ml-6 flex flex-col sm:flex-row">
        <div className="flex-1">
          <Link to={`/product/${item.productId}`} className="text-lg font-medium text-gray-800 hover:text-emerald-700">
            {item.name}
          </Link>
          
          {item.variant && (
            <p className="text-gray-600 text-sm mt-1">
              Вариант: {item.variant}
            </p>
          )}
          
          <div className="mt-2 md:hidden">
            <span className="font-semibold text-emerald-700">
              {item.price} сом
            </span>
          </div>
        </div>
        
        {/* Quantity Controls */}
        <div className="flex items-center mt-4 sm:mt-0">
          <div className="flex items-center border rounded-md">
            <button
              type="button"
              onClick={handleDecreaseQuantity}
              disabled={item.quantity <= 1}
              className={`w-8 h-8 flex items-center justify-center ${item.quantity <= 1 ? 'text-gray-400' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Minus size={16} />
            </button>
            
            <span className="w-10 text-center">{item.quantity}</span>
            
            <button
              type="button"
              onClick={handleIncreaseQuantity}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button
            type="button"
            onClick={handleRemove}
            className="ml-4 text-gray-400 hover:text-red-500"
          >
            <Trash2 size={18} />
          </button>
        </div>
        
        {/* Price (Desktop) */}
        <div className="hidden md:block ml-8 text-right">
          <span className="font-semibold text-emerald-700">
            {item.price} сом
          </span>
          <div className="text-sm text-gray-600 mt-1">
            {item.price * item.quantity} сом
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;