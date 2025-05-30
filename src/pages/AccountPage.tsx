import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, MapPin, LogOut, Plus } from 'lucide-react';
import { useAuth, Address } from '../contexts/AuthContext';

const AccountPage: React.FC = () => {
  const { user, isAuthenticated, logout, addAddress, updateAddress, removeAddress } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressFormData, setAddressFormData] = useState({
    title: '',
    fullName: '',
    phone: '',
    city: '',
    street: '',
    building: '',
    apartment: '',
    isDefault: false
  });
  const [orders, setOrders] = useState<any[]>([]);
  
  // Set document title
  useEffect(() => {
    document.title = 'Личный кабинет - Barakat';
  }, []);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/account' } } });
    }
  }, [isAuthenticated, navigate]);
  
  // Load orders from localStorage
  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      const allOrders = JSON.parse(storedOrders);
      // Filter orders for current user (in a real app this would be done on the server)
      if (user) {
        const userOrders = allOrders.filter((order: any) => 
          order.customer.email === user.email || order.customer.phone === user.phone
        );
        setOrders(userOrders);
      }
    }
  }, [user]);
  
  const handleAddressFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setAddressFormData({
      ...addressFormData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };
  
  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAddress) {
      // Update existing address
      updateAddress({
        ...addressFormData,
        id: editingAddress.id
      } as Address);
    } else {
      // Add new address
      addAddress(addressFormData);
    }
    
    // Reset form and state
    setIsAddressFormOpen(false);
    setEditingAddress(null);
    setAddressFormData({
      title: '',
      fullName: '',
      phone: '',
      city: '',
      street: '',
      building: '',
      apartment: '',
      isDefault: false
    });
  };
  
  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setAddressFormData(address);
    setIsAddressFormOpen(true);
  };
  
  const handleDeleteAddress = (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот адрес?')) {
      removeAddress(id);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  if (!isAuthenticated || !user) {
    return null;
  }
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-semibold mb-8">Личный кабинет</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <User size={24} />
                  </div>
                  <div className="ml-3">
                    <h2 className="font-medium">{user.name}</h2>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center w-full px-4 py-3 rounded-md ${
                    activeTab === 'profile'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User size={18} className="mr-3" />
                  Профиль
                </button>
                
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center w-full px-4 py-3 rounded-md ${
                    activeTab === 'orders'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Package size={18} className="mr-3" />
                  Мои заказы
                </button>
                
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`flex items-center w-full px-4 py-3 rounded-md ${
                    activeTab === 'addresses'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <MapPin size={18} className="mr-3" />
                  Адреса доставки
                </button>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  <LogOut size={18} className="mr-3" />
                  Выйти
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-medium mb-6">Мой профиль</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Имя</h3>
                      <p>{user.name}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                      <p>{user.email}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Телефон</h3>
                      <p>{user.phone}</p>
                    </div>
                  </div>
                  
                  <button
                    className="btn btn-outline"
                    disabled
                  >
                    Редактировать профиль
                  </button>
                </div>
              )}
              
              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-medium mb-6">Мои заказы</h2>
                  
                  {orders.length > 0 ? (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg overflow-hidden">
                          <div className="bg-gray-50 p-4 border-b">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div>
                                <span className="text-sm text-gray-500">Заказ №</span>
                                <span className="font-medium ml-1">{order.id}</span>
                              </div>
                              
                              <div>
                                <span className="text-sm text-gray-500">Дата:</span>
                                <span className="ml-1">
                                  {new Date(order.date).toLocaleDateString('ru-RU')}
                                </span>
                              </div>
                              
                              <div>
                                <span className="text-sm text-gray-500">Статус:</span>
                                <span className="ml-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                                  В обработке
                                </span>
                              </div>
                              
                              <div>
                                <span className="text-sm text-gray-500">Сумма:</span>
                                <span className="font-medium ml-1">{order.totalPrice} сом</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <h3 className="font-medium mb-3">Товары</h3>
                            <div className="space-y-3">
                              {order.items.map((item: any) => (
                                <div key={item.id} className="flex justify-between items-center">
                                  <div>
                                    <span>{item.name}</span>
                                    {item.variant && (
                                      <span className="text-sm text-gray-500 ml-2">({item.variant})</span>
                                    )}
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm text-gray-600">
                                      {item.quantity} x {item.price} сом
                                    </div>
                                    <div className="font-medium">
                                      {item.quantity * item.price} сом
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">У вас пока нет заказов</h3>
                      <p className="text-gray-600">
                        Перейдите в каталог, чтобы сделать первый заказ
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div>
                  <h2 className="text-xl font-medium mb-6">Адреса доставки</h2>
                  
                  {isAddressFormOpen ? (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-4">
                        {editingAddress ? 'Редактировать адрес' : 'Добавить новый адрес'}
                      </h3>
                      
                      <form onSubmit={handleAddressSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                              Название адреса*
                            </label>
                            <input
                              type="text"
                              id="title"
                              name="title"
                              value={addressFormData.title}
                              onChange={handleAddressFormChange}
                              placeholder="Например: Дом, Работа"
                              className="input"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                              Получатель*
                            </label>
                            <input
                              type="text"
                              id="fullName"
                              name="fullName"
                              value={addressFormData.fullName}
                              onChange={handleAddressFormChange}
                              className="input"
                              required
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
                              value={addressFormData.phone}
                              onChange={handleAddressFormChange}
                              className="input"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                              Город*
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={addressFormData.city}
                              onChange={handleAddressFormChange}
                              className="input"
                              required
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                              Улица*
                            </label>
                            <input
                              type="text"
                              id="street"
                              name="street"
                              value={addressFormData.street}
                              onChange={handleAddressFormChange}
                              className="input"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="building" className="block text-sm font-medium text-gray-700 mb-1">
                              Дом*
                            </label>
                            <input
                              type="text"
                              id="building"
                              name="building"
                              value={addressFormData.building}
                              onChange={handleAddressFormChange}
                              className="input"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
                              Квартира
                            </label>
                            <input
                              type="text"
                              id="apartment"
                              name="apartment"
                              value={addressFormData.apartment}
                              onChange={handleAddressFormChange}
                              className="input"
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-6">
                          <input
                            type="checkbox"
                            id="isDefault"
                            name="isDefault"
                            checked={addressFormData.isDefault}
                            onChange={handleAddressFormChange}
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                          />
                          <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
                            Использовать как адрес по умолчанию
                          </label>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <button
                            type="submit"
                            className="btn btn-primary"
                          >
                            {editingAddress ? 'Сохранить' : 'Добавить адрес'}
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddressFormOpen(false);
                              setEditingAddress(null);
                            }}
                            className="btn btn-outline"
                          >
                            Отмена
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsAddressFormOpen(true)}
                      className="btn btn-primary mb-6"
                    >
                      <Plus size={18} className="mr-2" />
                      Добавить новый адрес
                    </button>
                  )}
                  
                  {user.addresses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {user.addresses.map((address) => (
                        <div 
                          key={address.id} 
                          className={`border rounded-lg p-4 relative ${address.isDefault ? 'border-emerald-500' : ''}`}
                        >
                          {address.isDefault && (
                            <div className="absolute top-2 right-2 bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                              По умолчанию
                            </div>
                          )}
                          
                          <h3 className="font-medium mb-2">{address.title}</h3>
                          <p className="text-gray-700 mb-1">{address.fullName}</p>
                          <p className="text-gray-700 mb-1">{address.phone}</p>
                          <p className="text-gray-700">
                            {address.city}, {address.street}, {address.building}
                            {address.apartment && `, кв. ${address.apartment}`}
                          </p>
                          
                          <div className="mt-4 flex items-center space-x-3">
                            <button
                              onClick={() => handleEditAddress(address)}
                              className="text-sm text-emerald-700 hover:text-emerald-800"
                            >
                              Редактировать
                            </button>
                            <button
                              onClick={() => handleDeleteAddress(address.id)}
                              className="text-sm text-red-600 hover:text-red-700"
                            >
                              Удалить
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">У вас пока нет сохраненных адресов</h3>
                      <p className="text-gray-600">
                        Добавьте адрес доставки для быстрого оформления заказов
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;