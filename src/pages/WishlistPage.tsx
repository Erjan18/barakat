import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Trash2 } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';

const WishlistPage: React.FC = () => {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  
  // Set document title
  React.useEffect(() => {
    document.title = 'Избранное - Barakat';
  }, []);
  
  const handleAddToCart = (item: any) => {
    addToCart({
      productId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
  };
  
  const handleRemove = (id: string) => {
    removeItem(id);
  };
  
  if (items.length === 0) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-semibold mb-8">Избранное</h1>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-6 text-gray-500">
              <Heart size={64} className="mx-auto" />
            </div>
            <h2 className="text-xl font-medium mb-4">Ваш список избранного пуст</h2>
            <p className="text-gray-600 mb-6">
              Добавляйте товары в избранное, чтобы не потерять их из виду
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold">Избранное</h1>
          <button 
            onClick={clearWishlist}
            className="text-gray-500 hover:text-red-600 text-sm flex items-center"
          >
            <Trash2 size={16} className="mr-1" />
            Очистить список
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map(item => (
            <div key={item.id} className="card overflow-hidden">
              <div className="relative">
                <Link to={`/product/${item.id}`}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-64 object-cover"
                  />
                </Link>
                
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 text-red-500 hover:bg-white flex items-center justify-center"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div className="p-4">
                <Link to={`/product/${item.id}`} className="block">
                  <h3 className="text-lg font-medium text-gray-800 hover:text-emerald-700 transition-colors">
                    {item.name}
                  </h3>
                </Link>
                
                <div className="mt-3 font-semibold text-emerald-700">
                  {item.price} сом
                </div>
                
                <button 
                  onClick={() => handleAddToCart(item)}
                  className="mt-3 w-full btn btn-primary"
                >
                  <ShoppingBag size={16} className="mr-2" />
                  В корзину
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;