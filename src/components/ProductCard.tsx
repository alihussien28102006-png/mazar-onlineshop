import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string, color?: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  
  // Get the current image based on selected color
  const getCurrentImage = () => {
    if (product.colorImages && selectedColor && product.colorImages[selectedColor]) {
      return product.colorImages[selectedColor];
    }
    return product.image;
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;
    onAddToCart(product, selectedSize, product.colors ? selectedColor : undefined);
    setShowQuickAdd(false);
    setSelectedSize('');
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
      onMouseEnter={() => setShowQuickAdd(true)}
      onMouseLeave={() => setShowQuickAdd(false)}
    >
      <div className="relative overflow-hidden">
        <img
          src={getCurrentImage()}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {showQuickAdd && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300">
            <div className="bg-white p-4 rounded-lg max-w-xs w-full mx-4">
              <h3 className="font-semibold text-gray-900 mb-3">{product.name}</h3>
              
              {product.colors && (
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-2">Color:</p>
                  <div className="flex space-x-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1 text-xs rounded-full border-2 transition-colors ${
                          selectedColor === color
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">Size:</p>
                <div className="grid grid-cols-4 gap-1">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-1 text-xs rounded border-2 transition-colors ${
                        selectedSize === size
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="w-full bg-emerald-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Cart - {product.price} ج.م
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-emerald-600">{product.price} ج.م</span>
          <span className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;