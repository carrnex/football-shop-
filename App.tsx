
import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { Checkout } from './components/Checkout';
import { ShippingPage, ReturnsPage, SizeChartPage, CareerPage, NewsPage, SustainabilityPage, RegisterPage } from './components/InfoPages';
import { PRODUCTS } from './constants';
import { Product, CartItem, ViewState } from './types';
import { translations } from './translations';
import { CheckCircle, ArrowRight, Filter, ChevronDown, Truck, ShieldCheck, RefreshCw, SearchX } from 'lucide-react';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=2000"
];

export default function App() {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lang, setLang] = useState<'cs' | 'en'>('cs');
  const [heroIndex, setHeroIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView(ViewState.PRODUCT_DETAIL);
  };

  const handleAddToCart = (product: Product, size: string) => {
    const newItem: CartItem = { ...product, selectedSize: size };
    setCart([...cart, newItem]);
    setView(ViewState.CHECKOUT);
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return PRODUCTS;
    const lowerQuery = searchQuery.toLowerCase();
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.team.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  const renderContent = () => {
    switch (view) {
      case ViewState.HOME:
        return (
          <>
            <div className="relative h-[70vh] md:h-[90vh] w-full bg-black text-white overflow-hidden group">
              {HERO_IMAGES.map((img, index) => (
                <div key={img} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === heroIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                  <img 
                    src={img} 
                    alt="Hero" 
                    className={`w-full h-full object-cover object-center opacity-60 ${index === heroIndex ? 'animate-ken-burns' : ''}`} 
                  />
                </div>
              ))}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-20">
                <div className="overflow-hidden mb-4">
                   <h2 className="font-heading text-xl md:text-2xl uppercase tracking-[0.2em] animate-fade-in-up">{t.hero.collection}</h2>
                </div>
                <h1 className="font-heading text-5xl md:text-8xl font-bold uppercase tracking-tight mb-8 animate-fade-in-up delay-100 drop-shadow-lg">
                  {t.hero.title} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">{t.hero.here}</span>
                </h1>
                <div className="animate-fade-in-up delay-200">
                  <button onClick={() => setView(ViewState.ALL_PRODUCTS)} className="bg-white text-black font-heading font-bold uppercase tracking-widest px-8 py-4 hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-xl">{t.hero.cta}</button>
                </div>
              </div>
            </div>

            <div className="bg-black text-white py-5 border-t border-gray-800 mb-12">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
                    <div className="flex items-center gap-3"><Truck className="w-5 h-5 text-gray-300" /><span className="text-xs font-bold uppercase tracking-widest">{t.usp.shipping}</span></div>
                    <div className="hidden md:flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-gray-300" /><span className="text-xs font-bold uppercase tracking-widest">{t.usp.official}</span></div>
                    <div className="flex items-center gap-3"><RefreshCw className="w-5 h-5 text-gray-300" /><span className="text-xs font-bold uppercase tracking-widest">{t.usp.returns}</span></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
              <div className="flex justify-between items-end mb-8 animate-fade-in-up delay-300">
                <h2 className="font-heading text-3xl font-bold uppercase">{t.home.bestSellers}</h2>
                <button onClick={() => setView(ViewState.ALL_PRODUCTS)} className="text-sm font-bold uppercase border-b border-black pb-1 hover:text-gray-600 transition-transform hover:scale-105 origin-right">{t.home.viewAll}</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
                {PRODUCTS.slice(0, 4).map((product, idx) => (
                  <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                    <ProductCard product={product} onClick={handleProductClick} lang={lang} />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-100 py-20 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="font-heading text-4xl font-bold uppercase mb-6">{t.home.memberTitle}</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{t.home.memberDesc}</p>
                    <button onClick={() => setView(ViewState.REGISTER)} className="border-2 border-black text-black font-heading font-bold uppercase tracking-widest px-10 py-3 hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95">{t.home.register}</button>
                </div>
            </div>
          </>
        );

      case ViewState.ALL_PRODUCTS:
        return (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 animate-fade-in">
             <div className="mb-8">
                <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-4">
                  {searchQuery ? `${t.products.searchResults} "${searchQuery}"` : t.nav.allProducts}
                </h1>
             </div>
             <div className="flex justify-between items-center border-t border-b border-gray-200 py-4 mb-8">
                <button className="flex items-center gap-2 font-bold uppercase text-sm hover:text-gray-600 transition-transform hover:scale-105"><Filter className="w-4 h-4" /> {t.products.filter}</button>
                <span className="font-bold text-sm uppercase">{filteredProducts.length} {t.products.count}</span>
                <button className="flex items-center gap-2 font-bold uppercase text-sm hover:text-gray-600 transition-transform hover:scale-105">{t.products.sort} <ChevronDown className="w-4 h-4" /></button>
             </div>
             {filteredProducts.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-12">
                  {filteredProducts.map((product, idx) => (
                    <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${(idx % 4) * 100}ms` }}>
                      <ProductCard product={product} onClick={handleProductClick} lang={lang} />
                    </div>
                  ))}
               </div>
             ) : (
               <div className="py-20 text-center flex flex-col items-center gap-6">
                 <SearchX className="w-16 h-16 text-gray-200" />
                 <p className="text-xl font-bold uppercase text-gray-400 tracking-widest">{t.products.noResults}</p>
                 <button onClick={() => setSearchQuery('')} className="bg-black text-white font-heading font-bold uppercase tracking-widest px-8 py-3 hover:bg-gray-800 transition-all">{t.home.viewAll}</button>
               </div>
             )}
          </div>
        );

      case ViewState.PRODUCT_DETAIL:
        return selectedProduct ? (
          <ProductDetail product={selectedProduct} onAddToCart={handleAddToCart} onBack={() => setView(ViewState.ALL_PRODUCTS)} lang={lang} />
        ) : null;

      case ViewState.CHECKOUT:
        return <Checkout cart={cart} onRemoveItem={(i) => { const n = [...cart]; n.splice(i, 1); setCart(n); }} onComplete={() => setView(ViewState.SUCCESS)} onBack={() => setView(ViewState.HOME)} lang={lang} />;

      case ViewState.SUCCESS:
        return (
          <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center animate-fade-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600 animate-bounce"><CheckCircle className="w-10 h-10" /></div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-4">{t.register.success}</h1>
            <button onClick={() => setView(ViewState.HOME)} className="bg-black text-white font-heading font-bold uppercase tracking-widest px-10 py-4 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-95 inline-flex items-center gap-2 shadow-lg">{t.nav.home} <ArrowRight className="w-5 h-5" /></button>
          </div>
        );
      
      case ViewState.SHIPPING_INFO: return <ShippingPage onBack={() => setView(ViewState.HOME)} lang={lang} />;
      case ViewState.RETURNS_INFO: return <ReturnsPage onBack={() => setView(ViewState.HOME)} lang={lang} />;
      case ViewState.SIZE_CHART: return <SizeChartPage onBack={() => setView(ViewState.HOME)} lang={lang} />;
      case ViewState.CAREER: return <CareerPage onBack={() => setView(ViewState.HOME)} lang={lang} />;
      case ViewState.NEWS: return <NewsPage onBack={() => setView(ViewState.HOME)} lang={lang} />;
      case ViewState.SUSTAINABILITY: return <SustainabilityPage onBack={() => setView(ViewState.HOME)} lang={lang} />;
      case ViewState.REGISTER: return <RegisterPage onBack={() => setView(ViewState.HOME)} lang={lang} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        cartCount={cart.length} 
        onNavigate={setView} 
        lang={lang} 
        onLangChange={setLang} 
        onSearch={setSearchQuery} 
      />
      <main className="flex-grow">{renderContent()}</main>
      <footer className="bg-black text-white py-12 px-4 md:px-8 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div><h3 className="font-heading font-bold text-xl uppercase mb-4">Fotbal Store</h3><p className="text-gray-400 text-sm">{t.footer.equipment}</p></div>
            <div><h4 className="font-bold uppercase mb-4 text-sm tracking-wider">{t.footer.shopping}</h4><ul className="space-y-2 text-sm text-gray-400"><li onClick={() => setView(ViewState.SHIPPING_INFO)} className="hover:text-white cursor-pointer hover:translate-x-1 transition-transform">{t.footer.shipping}</li><li onClick={() => setView(ViewState.RETURNS_INFO)} className="hover:text-white cursor-pointer hover:translate-x-1 transition-transform">{t.footer.returns}</li><li onClick={() => setView(ViewState.SIZE_CHART)} className="hover:text-white cursor-pointer hover:translate-x-1 transition-transform">{t.footer.sizes}</li></ul></div>
            <div><h4 className="font-bold uppercase mb-4 text-sm tracking-wider">{t.footer.about}</h4><ul className="space-y-2 text-sm text-gray-400"><li onClick={() => setView(ViewState.CAREER)} className="hover:text-white cursor-pointer hover:translate-x-1 transition-transform">{t.footer.career}</li><li onClick={() => setView(ViewState.NEWS)} className="hover:text-white cursor-pointer hover:translate-x-1 transition-transform">{t.footer.news}</li><li onClick={() => setView(ViewState.SUSTAINABILITY)} className="hover:text-white cursor-pointer hover:translate-x-1 transition-transform">{t.footer.sustainability}</li></ul></div>
            <div><h4 className="font-bold uppercase mb-4 text-sm tracking-wider">{t.footer.contact}</h4><ul className="space-y-2 text-sm text-gray-400"><li>info@fotbalstore.cz</li><li>+420 123 456 789</li></ul></div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">© 2024 FOTBAL STORE. All rights reserved.</div>
      </footer>
    </div>
  );
}
