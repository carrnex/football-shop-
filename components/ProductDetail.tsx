import React, { useState } from 'react';
import { ArrowLeft, Check, Truck, RotateCcw } from 'lucide-react';
import { Product, ViewState } from '../types';
import { SIZES } from '../constants';
import { translations } from '../translations';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  onBack: () => void;
  lang: 'cs' | 'en';
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onBack, lang }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const t = translations[lang];
  const price = lang === 'cs' ? product.priceCZK : product.priceEUR;

  const handleAdd = () => {
    if (!selectedSize) {
      setError(t.detail.errorSize);
      return;
    }
    setError(null);
    onAddToCart(product, selectedSize);
  };

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <button onClick={onBack} className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:underline mb-6 transition-all hover:-translate-x-1">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> {t.products.back}
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="bg-gray-50 aspect-[4/5] md:aspect-auto md:h-[80vh] w-full overflow-hidden relative group">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-zoom-in" />
          </div>
          <div className="flex flex-col justify-center py-4">
            <div className="mb-2 flex justify-between items-start">
               <span className="text-sm font-bold uppercase tracking-widest text-gray-500">{product.team}</span>
               {product.isNew && <span className="bg-black text-white px-2 py-1 text-xs font-bold uppercase shadow-md">{t.products.new}</span>}
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-4 leading-none">{product.name}</h1>
            <p className="text-xl font-medium mb-8">{price} {t.currency}</p>
            <div className="mb-8">
              <div className="flex justify-between mb-3"><span className="font-bold text-sm uppercase">{t.detail.selectSize}</span></div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {SIZES.map((size) => (
                  <button key={size} onClick={() => { setSelectedSize(size); setError(null); }} className={`h-12 flex items-center justify-center border font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${selectedSize === size ? 'border-black bg-black text-white shadow-lg scale-105' : 'border-gray-200 hover:border-black text-black hover:shadow-md'}`}>{size}</button>
                ))}
              </div>
              {error && <p className="text-red-600 text-sm mt-2 font-medium flex items-center gap-1 animate-pulse"><span className="block w-1 h-1 bg-red-600 rounded-full"></span> {error}</p>}
            </div>
            <button onClick={handleAdd} className="w-full bg-black text-white font-heading font-bold text-lg uppercase tracking-widest py-4 flex items-center justify-center gap-3 hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg group">
              <span>{t.detail.addToCart}</span><span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
            <div className="mt-8 space-y-4 border-t border-gray-100 pt-8">
              <div className="flex items-start gap-3 group cursor-default"><Truck className="w-5 h-5 flex-shrink-0 mt-0.5" /><div><h4 className="font-bold text-sm uppercase">{t.detail.freeShipping}</h4></div></div>
              <div className="flex items-start gap-3 group cursor-default"><RotateCcw className="w-5 h-5 flex-shrink-0 mt-0.5" /><div><h4 className="font-bold text-sm uppercase">{t.detail.freeReturns}</h4></div></div>
            </div>
            <div className="mt-8"><h3 className="font-heading font-bold text-xl uppercase mb-2">{t.detail.description}</h3><p className="text-gray-700 leading-relaxed">{product.description}</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};