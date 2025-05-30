import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  
  // Set document title
  React.useEffect(() => {
    document.title = 'Корзина - Barakat';
  }, []);
  
  // Calculate delivery cost (free for orders over 5000 som)
  const deliveryCost = totalPrice >= 5000 ? 0 : 200;
  const total = totalPrice + deliveryCost;
  
  if (items.length === 0) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-semibold mb-8">Корзина</h1>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-6 text-gray-500">
              <ShoppingBag size={64} className="mx-auto" />
            </div>
            <h2 className="text-xl font-medium mb-4">Ваша корзина пуста</h2>
            <p className="text-gray-600 mb-6">
              Добавьте товары в корзину, чтобы оформить заказ
            </p>
            <Link 
              to="/catalog"
              className="btn btn-primary px-8 py-3"
            >
              Перейти в каталог
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-semibold mb-8">Корзина</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h2 className="text-lg font-medium">Товары в корзине</h2>
                <button 
                  onClick={clearCart}
                  className="text-gray-500 hover:text-red-600 text-sm"
                >
                  Очистить корзину
                </button>
              </div>
              
              {/* Cart Items List */}
              <div>
                {items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-lg font-medium border-b pb-4 mb-4">
                Итого заказа
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Товары ({items.length}):</span>
                  <span>{totalPrice} сом</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Доставка:</span>
                  <span>{deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost} сом`}</span>
                </div>
                {deliveryCost > 0 && (
                  <div className="text-sm text-gray-500">
                    Добавьте товаров еще на {5000 - totalPrice} сом для бесплатной доставки
                  </div>
                )}
                <div className="border-t pt-3 mt-3 flex justify-between font-medium text-lg">
                  <span>К оплате:</span>
                  <span className="text-emerald-700">{total} сом</span>
                </div>
              </div>
              
              <Link 
                to="/checkout"
                className="btn btn-primary w-full py-3 flex items-center justify-center"
              >
                Оформить заказ
                <ArrowRight size={18} className="ml-2" />
              </Link>
              
              <div className="mt-4">
                <Link 
                  to="/catalog"
                  className="text-emerald-700 hover:text-emerald-800 font-medium text-sm flex items-center justify-center"
                >
                  &larr; Продолжить покупки
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;