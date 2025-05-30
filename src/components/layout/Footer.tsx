import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center mb-4">
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
            </div>
            <p className="text-gray-600 mb-4">
              Магазин мусульманских товаров в Бишкеке. Предлагаем широкий ассортимент товаров для мусульман: одежду, книги, ароматы, товары для намаза и многое другое.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-700">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-700">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Categories */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Категории</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog/clothing" className="text-gray-600 hover:text-emerald-700">Одежда</Link>
              </li>
              <li>
                <Link to="/catalog/books" className="text-gray-600 hover:text-emerald-700">Книги</Link>
              </li>
              <li>
                <Link to="/catalog/prayer" className="text-gray-600 hover:text-emerald-700">Товары для намаза</Link>
              </li>
              <li>
                <Link to="/catalog/fragrances" className="text-gray-600 hover:text-emerald-700">Ароматы</Link>
              </li>
              <li>
                <Link to="/catalog/gifts" className="text-gray-600 hover:text-emerald-700">Подарки и сувениры</Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Информация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog" className="text-gray-600 hover:text-emerald-700">Акции и скидки</Link>
              </li>
              <li>
                <Link to="/catalog" className="text-gray-600 hover:text-emerald-700">Новинки</Link>
              </li>
              <li>
                <Link to="/catalog" className="text-gray-600 hover:text-emerald-700">Доставка и оплата</Link>
              </li>
              <li>
                <Link to="/catalog" className="text-gray-600 hover:text-emerald-700">О нас</Link>
              </li>
              <li>
                <Link to="/catalog" className="text-gray-600 hover:text-emerald-700">Контакты</Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-emerald-700 mr-2 mt-0.5" />
                <span className="text-gray-600">г. Бишкек, ул. Фрунзе, 43 </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-emerald-700 mr-2" />
                <a href="tel:+996700123456" className="text-gray-600 hover:text-emerald-700">+996 (700) 555-123</a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-emerald-700 mr-2" />
                <a href="mailto:info@halalmarket.kg" className="text-gray-600 hover:text-emerald-700">info@halalmarket.kg</a>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="text-emerald-700 mr-2 mt-0.5" />
                <div className="text-gray-600">
                  <p>Пн-Сб: 9:00 - 20:00</p>
                  <p>Вс: 10:00 - 18:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-300 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Barakat. Все права защищены.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/catalog" className="text-gray-600 hover:text-emerald-700 text-sm">
                Политика конфиденциальности
              </Link>
              <Link to="/catalog" className="text-gray-600 hover:text-emerald-700 text-sm">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;