import React from 'react';
import { Product } from '../types';
import { ExternalLink, ShoppingCart, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Calculate discount percentage
  const discountPercent = Math.round(
    ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full overflow-hidden">
      
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow-sm">
            -{discountPercent}%
          </div>
        )}

        {/* Official Badge */}
        {product.isOfficial && (
          <div className="absolute bottom-0 left-0 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-tr-lg flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            Mall
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {product.tags?.map((tag, index) => (
            <span 
              key={index} 
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                tag === 'Deal Hot' ? 'bg-red-50 text-red-600 border-red-100' :
                tag === 'Bán Chạy' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                'bg-gray-50 text-gray-600 border-gray-100'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-medium text-gray-800 text-sm leading-snug line-clamp-2 mb-2 flex-grow min-h-[2.5rem]" title={product.name}>
          {product.name}
        </h3>

        {/* Price Section */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">
              {formatCurrency(product.salePrice)}
            </span>
            <span className="text-xs text-gray-400 line-through decoration-gray-400">
              {formatCurrency(product.originalPrice)}
            </span>
          </div>

          {/* CTA Button */}
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-full flex items-center justify-center gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-white font-bold py-2.5 rounded-lg transition-colors duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Mua Ngay</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;