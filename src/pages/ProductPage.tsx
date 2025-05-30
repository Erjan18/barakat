import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, Star, Share2, Check, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { products, Product } from '../data/products';
import ProductCard from '../components/products/ProductCard';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  
  // Find product by ID
  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Initialize selected variants
        if (foundProduct.variants && foundProduct.variants.length > 0) {
          const initialVariants: Record<string, string> = {};
          foundProduct.variants.forEach(variant => {
            initialVariants[variant.name] = variant.options[0];
          });
          setSelectedVariants(initialVariants);
        }
        
        // Find related products
        if (foundProduct.relatedProducts && foundProduct.relatedProducts.length > 0) {
          const related = products.filter(p => 
            foundProduct.relatedProducts?.includes(p.id)
          );
          setRelatedProducts(related);
        } else {
          // If no related products specified, find some from the same category
          const related = products.filter(p => 
            p.id !== foundProduct.id && p.category === foundProduct.category
          ).slice(0, 4);
          setRelatedProducts(related);
        }
        
        // Reset states
        setQuantity(1);
        setActiveImageIndex(0);
        setShowSuccessMessage(false);
        
        // Set document title
        document.title = `${foundProduct.name} - Barakat`;
      }
    }
  }, [id]);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-xl font-medium">Товар не найден</h2>
          <p className="text-gray-600 mt-2">Извините, запрашиваемый товар не существует или был удален.</p>
          <Link to="/catalog" className="btn btn-primary mt-4">
            Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleVariantChange = (variantName: string, optionValue: string) => {
    setSelectedVariants({
      ...selectedVariants,
      [variantName]: optionValue
    });
  };
  
  const getVariantString = () => {
    return Object.entries(selectedVariants)
      .map(([name, value]) => `${name}: ${value}`)
      .join(', ');
  };
  
  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      variant: Object.keys(selectedVariants).length > 0 ? getVariantString() : undefined
    });
    
    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };
  
  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      });
    }
  };
  
  const handleImageNav = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setActiveImageIndex(prev => (prev > 0 ? prev - 1 : product.images.length - 1));
    } else {
      setActiveImageIndex(prev => (prev < product.images.length - 1 ? prev + 1 : 0));
    }
  };
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center text-sm">
            <li>
              <Link to="/" className="text-gray-500 hover:text-emerald-700">
                Главная
              </Link>
            </li>
            <li className="mx-2 text-gray-400">/</li>
            <li>
              <Link to="/catalog" className="text-gray-500 hover:text-emerald-700">
                Каталог
              </Link>
            </li>
            <li className="mx-2 text-gray-400">/</li>
            <li>
              <Link 
                to={`/catalog/${product.category}`} 
                className="text-gray-500 hover:text-emerald-700"
              >
                {categories.find(c => c.id === product.category)?.name || product.category}
              </Link>
            </li>
            <li className="mx-2 text-gray-400">/</li>
            <li className="text-gray-700 truncate max-w-[200px]">{product.name}</li>
          </ol>
        </nav>
        
        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Product Images */}
            <div className="md:w-1/2 p-6 relative">
              <div className="relative h-[400px] md:h-[500px] flex items-center justify-center mb-4">
                <img 
                  src={product.images[activeImageIndex]} 
                  alt={`${product.name} - изображение ${activeImageIndex + 1}`}
                  className="max-h-full max-w-full object-contain"
                />
                
                {/* Image Navigation Buttons */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => handleImageNav('prev')}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow-md"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => handleImageNav('next')}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow-md"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="flex justify-center space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`w-16 h-16 border rounded overflow-hidden ${
                        index === activeImageIndex ? 'border-emerald-500' : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="md:w-1/2 p-6 md:border-l">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  {product.rating.toFixed(1)} ({product.reviewCount} {getReviewText(product.reviewCount)})
                </span>
              </div>
              
              {/* Price */}
              <div className="mb-6">
                {product.oldPrice && (
                  <span className="text-gray-500 line-through mr-2">
                    {product.oldPrice} сом
                  </span>
                )}
                <span className="text-2xl font-semibold text-emerald-700">
                  {product.price} сом
                </span>
              </div>
              
              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-6 space-y-4">
                  {product.variants.map(variant => (
                    <div key={variant.name}>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">
                        {variant.name}:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {variant.options.map(option => (
                          <button
                            key={option}
                            onClick={() => handleVariantChange(variant.name, option)}
                            className={`px-3 py-1 border rounded-md text-sm ${
                              selectedVariants[variant.name] === option
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Количество:
                </h3>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className={`w-10 h-10 rounded-l-md border border-r-0 flex items-center justify-center ${
                      quantity <= 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-16 h-10 border text-center focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    min="1"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-10 h-10 rounded-r-md border border-l-0 flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Add to Cart & Wishlist Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary flex-1 py-3"
                >
                  <ShoppingBag size={18} className="mr-2" />
                  В корзину
                </button>
                
                <button
                  onClick={toggleWishlist}
                  className={`btn ${
                    isInWishlist(product.id)
                      ? 'bg-red-50 text-red-600 border border-red-300 hover:bg-red-100'
                      : 'btn-outline'
                  } sm:flex-none px-4 py-3`}
                >
                  <Heart 
                    size={18} 
                    className="mr-2" 
                    fill={isInWishlist(product.id) ? "currentColor" : "none"} 
                  />
                  {isInWishlist(product.id) ? 'В избранном' : 'В избранное'}
                </button>
                
                <button
                  className="btn bg-gray-100 hover:bg-gray-200 text-gray-700 sm:flex-none px-4 py-3"
                >
                  <Share2 size={18} />
                </button>
              </div>
              
              {/* Success Message */}
              {showSuccessMessage && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-start">
                  <Check size={18} className="mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Товар добавлен в корзину!</p>
                    <p className="text-sm">
                      {product.name} (x{quantity})
                      {Object.keys(selectedVariants).length > 0 && ` - ${getVariantString()}`}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Availability */}
              <div className="mb-6">
                <div className="flex items-center text-sm">
                  <div className={`w-3 h-3 rounded-full mr-2 ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span>{product.inStock ? 'В наличии' : 'Нет в наличии'}</span>
                </div>
              </div>
              
              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Характеристики:
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check size={16} className="text-emerald-600 mt-1 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="p-6 border-t">
            <h2 className="text-xl font-semibold mb-4">Описание</h2>
            <div className="prose max-w-none text-gray-700">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Похожие товары</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to get the correct Russian word form based on count
function getReviewText(count: number): string {
  if (count % 10 === 1 && count % 100 !== 11) return 'отзыв';
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'отзыва';
  return 'отзывов';
}

export default ProductPage;