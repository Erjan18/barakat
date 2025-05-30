import React from 'react';
import { Truck, CreditCard, PhoneCall, RefreshCw } from 'lucide-react';

const features = [
  {
    icon: <Truck size={28} />,
    title: 'Быстрая доставка',
    description: 'По Бишкеку и всему Кыргызстану'
  },
  {
    icon: <CreditCard size={28} />,
    title: 'Удобная оплата',
    description: 'Наличными или картой'
  },
  {
    icon: <RefreshCw size={28} />,
    title: 'Гарантия качества',
    description: 'Только сертифицированные товары'
  },
  {
    icon: <PhoneCall size={28} />,
    title: 'Поддержка',
    description: 'Консультация по выбору товаров'
  }
];

const FeaturesBanner: React.FC = () => {
  return (
    <section className="py-12 bg-emerald-700 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="mr-4 text-amber-300">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-emerald-100">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBanner;