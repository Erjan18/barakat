import React, { useState } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email.trim() || !email.includes('@')) {
      setError('Пожалуйста, введите корректный email');
      return;
    }
    
    // In a real app, you would send this to your backend
    console.log('Subscribing email:', email);
    
    // Show success message
    setIsSubmitted(true);
    setError('');
    setEmail('');
    
    // Reset after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Подписывайтесь на наши новости</h2>
          <p className="text-gray-600 mb-8">
            Получайте информацию о новых поступлениях, акциях и специальных предложениях первыми!
          </p>
          
          {isSubmitted ? (
            <div className="bg-green-100 text-green-700 px-4 py-3 rounded-md">
              Спасибо за подписку! Мы отправили письмо для подтверждения на ваш email.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш email"
                className="flex-grow input"
                required
              />
              <button 
                type="submit"
                className="btn btn-primary whitespace-nowrap"
              >
                Подписаться
              </button>
            </form>
          )}
          
          {error && (
            <div className="mt-2 text-red-500 text-sm">
              {error}
            </div>
          )}
          
          <p className="text-sm text-gray-500 mt-4">
            Нажимая кнопку «Подписаться», вы соглашаетесь с нашей политикой конфиденциальности.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;