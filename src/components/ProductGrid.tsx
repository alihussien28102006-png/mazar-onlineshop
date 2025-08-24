import React from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductGridProps {
  onAddToCart: (product: Product, size: string, color?: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onAddToCart }) => {
  return (
    <section className="py-16 px-4 bg-emerald-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Collection
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Carefully curated streetwear pieces that define your unique style journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;