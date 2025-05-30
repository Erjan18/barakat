import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  // Set document title
  React.useEffect(() => {
    document.title = 'Страница не найдена - Barakat';
  }, []);
  
  return (
    <div className="py-16 islamic-pattern">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-6xl font-semibold text-emerald-700 mb-4">404</h1>
          <h2 className="text-2xl font-medium mb-4">Страница не найдена</h2>
          <p className="text-gray-600 mb-8">
            Извините, страница, которую вы ищете, не существует или была перемещена.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="btn btn-primary px-8 py-3">
              На главную
            </Link>
            <Link to="/catalog" className="btn btn-outline px-8 py-3">
              В каталог
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;