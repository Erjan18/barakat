import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Address } from '../../contexts/AuthContext';

interface CheckoutFormProps {
  onSubmit: (formData: any) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit }) => {
  const { user, isAuthenticated } = useAuth();
  const { items, totalPrice } = useCart();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: '',
    city: 'Бишкек',
    comment: '',
    paymentMethod: 'cash',
    deliveryMethod: 'courier',
    useExistingAddress: true,
    selectedAddressId: user?.addresses?.find(a => a.isDefault)?.id || ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleAddressSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const addressId = e.target.value;
    setFormData({
      ...formData,
      selectedAddressId: addressId,
      useExistingAddress: addressId !== 'new'
    });
  };
  
  const handleAddressTypeChange = (useExisting: boolean) => {
    setFormData({
      ...formData,
      useExistingAddress: useExisting
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get selected address if using existing
    let shippingAddress = null;
    if (formData.useExistingAddress && formData.selectedAddressId && user) {
      shippingAddress = user.addresses.find(a => a.id === formData.selectedAddressId);
    }
    
    // Prepare order data
    const orderData = {
      customer: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email
      },
      shipping: {
        address: shippingAddress || {
          city: formData.city,
          street: formData.address
        },
        method: formData.deliveryMethod
      },
      payment: {
        method: formData.paymentMethod
      },
      comment: formData.comment,
      items: items.map(item => ({
        id: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        variant: item.variant
      })),
      totalPrice: totalPrice,
      date: new Date().toISOString()
    };
    
    onSubmit(orderData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Контактная информация</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Имя*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Телефон*
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="input"
              placeholder="+996 XXX XXX XXX"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>
      </div>
      
      {/* Delivery Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Информация о доставке</h3>
        
        {/* Delivery Method */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Способ доставки*
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="relative border rounded-lg p-4 cursor-pointer hover:border-emerald-500 transition-colors">
              <input
                type="radio"
                name="deliveryMethod"
                value="courier"
                checked={formData.deliveryMethod === 'courier'}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`absolute top-2 right-2 w-4 h-4 rounded-full border ${formData.deliveryMethod === 'courier' ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'}`}></div>
              <div className="font-medium mb-1">Курьером</div>
              <div className="text-sm text-gray-600">Доставка в течение 1-2 дней</div>
            </label>
            
            <label className="relative border rounded-lg p-4 cursor-pointer hover:border-emerald-500 transition-colors">
              <input
                type="radio"
                name="deliveryMethod"
                value="pickup"
                checked={formData.deliveryMethod === 'pickup'}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`absolute top-2 right-2 w-4 h-4 rounded-full border ${formData.deliveryMethod === 'pickup' ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'}`}></div>
              <div className="font-medium mb-1">Самовывоз</div>
              <div className="text-sm text-gray-600">Из нашего магазина</div>
            </label>
            
            <label className="relative border rounded-lg p-4 cursor-pointer hover:border-emerald-500 transition-colors">
              <input
                type="radio"
                name="deliveryMethod"
                value="post"
                checked={formData.deliveryMethod === 'post'}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`absolute top-2 right-2 w-4 h-4 rounded-full border ${formData.deliveryMethod === 'post' ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'}`}></div>
              <div className="font-medium mb-1">Почтой</div>
              <div className="text-sm text-gray-600">По всему Кыргызстану</div>
            </label>
          </div>
        </div>
        
        {/* Address Selection - only for authenticated users */}
        {isAuthenticated && user && user.addresses.length > 0 && formData.deliveryMethod !== 'pickup' && (
          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-3">
              <button
                type="button"
                className={`px-4 py-2 rounded ${formData.useExistingAddress ? 'bg-emerald-100 text-emerald-800 font-medium' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => handleAddressTypeChange(true)}
              >
                Сохраненный адрес
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded ${!formData.useExistingAddress ? 'bg-emerald-100 text-emerald-800 font-medium' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => handleAddressTypeChange(false)}
              >
                Новый адрес
              </button>
            </div>
            
            {formData.useExistingAddress && (
              <div>
                <label htmlFor="selectedAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Выберите адрес доставки*
                </label>
                <select
                  id="selectedAddress"
                  name="selectedAddressId"
                  value={formData.selectedAddressId}
                  onChange={handleAddressSelect}
                  required
                  className="input"
                >
                  <option value="">Выберите адрес</option>
                  {user.addresses.map((address: Address) => (
                    <option key={address.id} value={address.id}>
                      {address.title} - {address.city}, {address.street}, {address.building} {address.apartment ? `, кв. ${address.apartment}` : ''}
                    </option>
                  ))}
                  <option value="new">+ Добавить новый адрес</option>
                </select>
              </div>
            )}
          </div>
        )}
        
        {/* New Address Form */}
        {(!isAuthenticated || !formData.useExistingAddress || formData.selectedAddressId === 'new') && formData.deliveryMethod !== 'pickup' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                Город*
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Адрес*
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required={formData.deliveryMethod !== 'pickup'}
                className="input"
                placeholder="Улица, дом, квартира"
              />
            </div>
          </div>
        )}
        
        {/* Comment */}
        <div className="mt-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Комментарий к заказу
          </label>
          <textarea
            id="comment"
            name="comment"
            rows={3}
            value={formData.comment}
            onChange={handleChange}
            className="input"
            placeholder="Дополнительная информация к заказу"
          ></textarea>
        </div>
      </div>
      
      {/* Payment Method */}
      <div>
        <h3 className="text-lg font-medium mb-4">Способ оплаты</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="relative border rounded-lg p-4 cursor-pointer hover:border-emerald-500 transition-colors">
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={formData.paymentMethod === 'cash'}
              onChange={handleChange}
              className="sr-only"
            />
            <div className={`absolute top-2 right-2 w-4 h-4 rounded-full border ${formData.paymentMethod === 'cash' ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'}`}></div>
            <div className="font-medium mb-1">Наличными</div>
            <div className="text-sm text-gray-600">При получении</div>
          </label>
          
          <label className="relative border rounded-lg p-4 cursor-pointer hover:border-emerald-500 transition-colors">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === 'card'}
              onChange={handleChange}
              className="sr-only"
            />
            <div className={`absolute top-2 right-2 w-4 h-4 rounded-full border ${formData.paymentMethod === 'card' ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'}`}></div>
            <div className="font-medium mb-1">Картой</div>
            <div className="text-sm text-gray-600">Visa, MasterCard</div>
          </label>
          
          <label className="relative border rounded-lg p-4 cursor-pointer hover:border-emerald-500 transition-colors">
            <input
              type="radio"
              name="paymentMethod"
              value="mbank"
              checked={formData.paymentMethod === 'mbank'}
              onChange={handleChange}
              className="sr-only"
            />
            <div className={`absolute top-2 right-2 w-4 h-4 rounded-full border ${formData.paymentMethod === 'mbank' ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'}`}></div>
            <div className="font-medium mb-1">Мобильный банк</div>
            <div className="text-sm text-gray-600">O!, MBank, Элсом</div>
          </label>
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <Link to="/cart" className="text-emerald-700 hover:text-emerald-800 font-medium">
          &larr; Вернуться в корзину
        </Link>
        
        <button
          type="submit"
          className="btn btn-primary px-8 py-3"
        >
          Оформить заказ
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;