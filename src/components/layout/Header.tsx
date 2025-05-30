import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { categories } from '../../data/products';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const toggleCategoryMenu = (categoryId: string) => {
    if (isCategoryOpen === categoryId) {
      setIsCategoryOpen(null);
    } else {
      setIsCategoryOpen(categoryId);
    }
  };

  return (
    <header className={`relative z-50 w-full ${isSticky ? 'sticky top-0 shadow-md' : ''}`}>
      {/* Top bar */}
      <div className="bg-emerald-800 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-sm">
            г. Бишкек, ул. Фрунзе, 43 
          </div>
          <div className="text-sm">
            <a href="tel:+996700123456" className="hover:text-emerald-200">+996 (700) 555-123</a>
          </div>
        </div>
      </div>
      
      {/* Main header */}
      <div className="bg-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-emerald-700 mr-2"
              >
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
                <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                <path d="M12 14v7"/>
                <path d="M7 9l5 5 5-5"/>
              </svg>
              <span className="text-xl font-medium text-emerald-700">Barakat</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-emerald-700">
                Главная
              </Link>
              <div className="relative group">
                <button 
                  className="flex items-center text-gray-700 hover:text-emerald-700"
                  onClick={() => setIsCategoryOpen(isCategoryOpen ? null : 'all')}
                >
                  Каталог <ChevronDown size={16} className="ml-1" />
                </button>
                
                {isCategoryOpen === 'all' && (
                  <div className="absolute left-0 mt-2 w-60 bg-white rounded-md shadow-lg z-50 py-2">
                    {categories.map(category => (
                      <div key={category.id} className="relative group/sub">
                        <Link 
                          to={`/catalog/${category.id}`}
                          className="block px-4 py-2 text-gray-800 hover:bg-emerald-50 hover:text-emerald-700"
                          onClick={() => setIsCategoryOpen(null)}
                        >
                          {category.name}
                        </Link>
                        
                        <div className="absolute left-full top-0 mt-0 ml-0.5 w-60 bg-white rounded-md shadow-lg z-50 py-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200">
                          {category.subcategories.map(sub => (
                            <Link 
                              key={sub.id}
                              to={`/catalog/${category.id}?subcategory=${sub.id}`}
                              className="block px-4 py-2 text-gray-800 hover:bg-emerald-50 hover:text-emerald-700"
                              onClick={() => setIsCategoryOpen(null)}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Link to="/catalog" className="text-gray-700 hover:text-emerald-700">
                Акции
              </Link>
             
            </nav>
            
            {/* Search and Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Icon and Form */}
              <div className="relative">
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="text-gray-700 hover:text-emerald-700"
                >
                  <Search size={20} />
                </button>
                
                {isSearchOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-20 p-3">
                    <form onSubmit={handleSearch} className="flex">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Поиск товаров..."
                        className="flex-grow border border-gray-300 rounded-l-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <button 
                        type="submit"
                        className="bg-emerald-700 text-white rounded-r-md px-3 py-1 hover:bg-emerald-800"
                      >
                        <Search size={16} />
                      </button>
                    </form>
                  </div>
                )}
              </div>
              
              {/* Wishlist */}
              <Link to="/wishlist" className="text-gray-700 hover:text-emerald-700">
                <Heart size={20} />
              </Link>
              
              {/* Cart */}
              <Link to="/cart" className="text-gray-700 hover:text-emerald-700 relative">
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              
              {/* User Account */}
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="text-gray-700 hover:text-emerald-700"
                >
                  <User size={20} />
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                    {isAuthenticated ? (
                      <div>
                        <div className="px-4 py-3 text-sm text-gray-700 border-b">
                          <div className="font-medium">{user?.name}</div>
                          <div className="truncate">{user?.email}</div>
                        </div>
                        <Link 
                          to="/account"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Личный кабинет
                        </Link>
                        <Link 
                          to="/wishlist"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Избранное
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50"
                        >
                          Выйти
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Link 
                          to="/login"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Войти
                        </Link>
                        <Link 
                          to="/register"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Регистрация
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-gray-700 hover:text-emerald-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="py-2 text-gray-700 hover:text-emerald-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Главная
              </Link>
              
              {/* Mobile Catalog with Accordions */}
              <div>
                <button 
                  className="flex items-center justify-between w-full py-2 text-gray-700 hover:text-emerald-700"
                  onClick={() => toggleCategoryMenu('all')}
                >
                  <span>Каталог</span>
                  <ChevronDown size={16} className={`transform transition-transform ${isCategoryOpen === 'all' ? 'rotate-180' : ''}`} />
                </button>
                
                {isCategoryOpen === 'all' && (
                  <div className="pl-4 space-y-1">
                    {categories.map(category => (
                      <div key={category.id}>
                        <button
                          className="flex items-center justify-between w-full py-2 text-gray-700 hover:text-emerald-700"
                          onClick={() => toggleCategoryMenu(category.id)}
                        >
                          <span>{category.name}</span>
                          <ChevronDown size={16} className={`transform transition-transform ${isCategoryOpen === category.id ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isCategoryOpen === category.id && (
                          <div className="pl-4 space-y-1">
                            {category.subcategories.map(sub => (
                              <Link 
                                key={sub.id}
                                to={`/catalog/${category.id}?subcategory=${sub.id}`}
                                className="block py-2 text-gray-700 hover:text-emerald-700"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <Link 
                to="/catalog" 
                className="py-2 text-gray-700 hover:text-emerald-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Акции
              </Link>
              
              <Link 
                to="/catalog" 
                className="py-2 text-gray-700 hover:text-emerald-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Контакты
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/account" 
                    className="py-2 text-gray-700 hover:text-emerald-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Личный кабинет
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="py-2 text-left text-gray-700 hover:text-emerald-700"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="py-2 text-gray-700 hover:text-emerald-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Войти
                  </Link>
                  <Link 
                    to="/register" 
                    className="py-2 text-gray-700 hover:text-emerald-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Регистрация
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск товаров..."
                className="flex-grow border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button 
                type="submit"
                className="bg-emerald-700 text-white rounded-r-md px-4 py-2 hover:bg-emerald-800"
              >
                <Search size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;