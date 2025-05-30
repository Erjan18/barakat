import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, CheckCircle } from 'lucide-react';
import CheckoutForm from '../components/checkout/CheckoutForm';
import { useCart } from '../contexts/CartContext';

const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  // Set document title
  React.useEffect(() => {
    document.title = 'Оформление заказа - Barakat';
  }, []);
  
  // Redirect to cart if no items
  React.useEffect(() => {
    if (items.length === 0 && !isSubmitted) {
      navigate('/cart');
    }
  }, [items, isSubmitted, navigate]);
  
  // Calculate delivery cost (free for orders over 5000 som)
  const deliveryCost = totalPrice >= 5000 ? 0 : 200;
  const total = totalPrice + deliveryCost;
  
  const handleSubmitOrder = (formData: any) => {
    // In a real app, this would be sent to a backend
    console.log('Order submitted:', formData);
    
    // Generate fake order ID
    const newOrderId = `ORD-${Date.now().toString().substring(7)}`;
    setOrderId(newOrderId);
    
    // Save order to localStorage for demo purposes
    const storedOrders = localStorage.getItem('orders');
    const orders = storedOrders ? JSON.parse(storedOrders) : [];
    
    const newOrder = {
      ...formData,
      id: newOrderId,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Show success message
    setIsSubmitted(true);
    
    // Clear cart
    clearCart();
  };
  
  if (isSubmitted) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <CheckCircle size={64} className="mx-auto text-emerald-500 mb-4" />
              <h1 className="text-2xl font-semibold mb-4">Заказ успешно оформлен!</h1>
              <p className="text-gray-600 mb-6">
                Спасибо за ваш заказ. Номер вашего заказа: <span className="font-bold">{orderId}</span>
              </p>
              <p className="text-gray-600 mb-8">
                В ближайшее время с вами свяжется наш менеджер для подтверждения заказа. 
                Информация о заказе отправлена на указанный вами email.
              </p>
              <button 
                onClick={() => navigate('/')}
                className="btn btn-primary px-8 py-3"
              >
                Вернуться на главную
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-semibold mb-8">Оформление заказа</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <CheckoutForm onSubmit={handleSubmitOrder} />
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-lg font-medium border-b pb-4 mb-4">
                Ваш заказ
              </h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex items-start">
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3 flex-grow">
                      <div className="font-medium line-clamp-1">{item.name}</div>
                      {item.variant && (
                        <div className="text-sm text-gray-500">{item.variant}</div>
                      )}
                      <div className="text-sm flex justify-between mt-1">
                        <span>{item.quantity} x {item.price} сом</span>
                        <span className="font-medium">{item.quantity * item.price} сом</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Totals */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Товары ({items.length}):</span>
                  <span>{totalPrice} сом</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Доставка:</span>
                  <span>{deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost} сом`}</span>
                </div>
                <div className="border-t pt-3 mt-3 flex justify-between font-medium text-lg">
                  <span>К оплате:</span>
                  <span className="text-emerald-700">{total} сом</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;