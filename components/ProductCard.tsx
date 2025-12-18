import React from 'react';
import { Product } from '../types';
import { translations } from '../translations';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  lang: 'cs' | 'en';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, lang }) => {
  const t = translations[lang];
  const price = lang === 'cs' ? product.priceCZK : product.priceEUR;
  
  return (
    <div 
      className="group cursor-pointer flex flex-col gap-2 transition-all duration-300 hover:-translate-y-2"
      onClick={() => onClick(product)}
    >
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100 shadow-sm transition-shadow duration-300 group-hover:shadow-xl">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-white px-2 py-1 text-xs font-bold uppercase tracking-widest z-10 shadow-sm">
            {t.products.new}
          </span>
        )}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-lg">
          <span className="text-sm font-bold uppercase tracking-wider text-black">
            {price} {t.currency}
          </span>
        </div>
      </div>
      <div className="pt-3 px-1">
        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{product.team}</h3>
        <h2 className="font-heading text-lg font-medium leading-tight group-hover:underline decoration-1 underline-offset-4 transition-colors group-hover:text-gray-800">
          {product.name}
        </h2>
      </div>
    </div>
  );
};