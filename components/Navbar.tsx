
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, Search, X } from 'lucide-react';
import { ViewState } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  cartCount: number;
  onNavigate: (view: ViewState) => void;
  lang: 'cs' | 'en';
  onLangChange: (lang: 'cs' | 'en') => void;
  onSearch: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onNavigate, lang, onLangChange, onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const t = translations[lang];

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleNavigate = (view: ViewState) => {
    onNavigate(view);
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      onNavigate(ViewState.ALL_PRODUCTS);
      setIsSearchOpen(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 h-16 transition-all duration-300 shadow-sm">
        <div className="max-w-[1920px] mx-auto flex items-center px-4 md:px-8 h-full">
          
          {/* Left Section: Logo & Mobile Menu */}
          <div className="flex items-center gap-4 flex-shrink-0 h-full">
            <button 
              className="p-2 hover:bg-gray-100 rounded-full lg:hidden transition-all flex items-center justify-center"
              onClick={() => setIsMenuOpen(true)}
            >
                <Menu className="w-6 h-6" />
            </button>
            <div 
              onClick={() => handleNavigate(ViewState.HOME)}
              className="cursor-pointer flex flex-col items-center leading-none select-none transition-transform duration-300 hover:scale-105 origin-left justify-center"
            >
              <span className="font-heading font-bold text-xl md:text-2xl tracking-tighter">FOTBAL</span>
              <span className="font-heading font-bold text-xl md:text-2xl tracking-tighter -mt-2">STORE</span>
            </div>
          </div>

          {/* Middle Section: Navigation Links */}
          <div className={`flex-grow flex justify-center uppercase font-bold text-sm tracking-widest transition-opacity duration-300 h-full items-center ${isSearchOpen ? 'lg:opacity-0 lg:pointer-events-none' : 'opacity-100'}`}>
            <div className="hidden lg:flex gap-8">
              {['men', 'women', 'kids'].map((key) => (
                <button 
                  key={key}
                  onClick={() => handleNavigate(ViewState.ALL_PRODUCTS)} 
                  className="font-heading hover:underline decoration-2 underline-offset-4 px-2"
                >
                  {t.nav[key as keyof typeof t.nav]}
                </button>
              ))}
              <button 
                onClick={() => handleNavigate(ViewState.ALL_PRODUCTS)} 
                className="font-heading text-red-600 hover:underline decoration-2 underline-offset-4 px-2"
              >
                {t.nav.outlet}
              </button>
            </div>
          </div>

          {/* Right Section: Language, Search, Cart - ABSOLUTE VERTICAL ALIGNMENT */}
          <div className="flex items-center flex-shrink-0 h-full gap-2">
            
            {/* 1. Language Switcher - Centered in h-10 block to match others */}
            <div className="flex items-center h-10 px-3 border-r border-gray-100">
               <div className="flex items-center text-[10px] md:text-[11px] font-bold uppercase tracking-tighter">
                 <button onClick={() => onLangChange('cs')} className={`font-heading px-1 transition-colors ${lang === 'cs' ? 'text-black' : 'text-gray-300 hover:text-gray-500'}`}>CZ</button>
                 <span className="text-gray-200 mx-0.5">|</span>
                 <button onClick={() => onLangChange('en')} className={`font-heading px-1 transition-colors ${lang === 'en' ? 'text-black' : 'text-gray-300 hover:text-gray-500'}`}>EN</button>
               </div>
            </div>

            {/* 2. Search Component - Uniform height h-10 for both button and form */}
            <div className={`flex items-center justify-end transition-all duration-500 ${isSearchOpen ? 'w-48 sm:w-64 md:w-80' : 'w-10'}`}>
              {isSearchOpen ? (
                <form 
                  onSubmit={handleSearchSubmit} 
                  className="flex items-center w-full bg-gray-50 border border-gray-200 rounded-full px-3 h-10 transition-all"
                >
                  <Search className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                  <input 
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder={t.products.searchPlaceholder}
                    className="w-full bg-transparent border-none focus:ring-0 text-[10px] md:text-[11px] font-bold font-heading uppercase tracking-widest p-0 h-full leading-none"
                  />
                  <button 
                    type="button"
                    onClick={() => { setIsSearchOpen(false); setSearchQuery(''); onSearch(''); }}
                    className="p-1 hover:bg-white rounded-full transition-colors flex items-center justify-center"
                  >
                    <X className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </form>
              ) : (
                <button 
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-all text-black"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {/* 3. Cart Button - Uniform height h-10 */}
            <div className="flex items-center justify-center">
              <button 
                onClick={() => handleNavigate(ViewState.CHECKOUT)}
                className="relative w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-all text-black"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-black text-white text-[9px] font-bold h-3.5 w-3.5 flex items-center justify-center rounded-full animate-in fade-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 lg:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div 
          className={`fixed top-0 left-0 h-full w-[80%] max-w-[300px] bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100 h-16">
            <span className="font-heading font-bold text-xl tracking-tighter">{t.nav.menu}</span>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col p-6 space-y-6 overflow-y-auto">
            <button onClick={() => handleNavigate(ViewState.HOME)} className="flex items-center justify-between text-left font-heading font-bold text-xl uppercase tracking-widest">
              <span>{t.nav.home}</span><span className="text-gray-300 text-sm">→</span>
            </button>
            <button onClick={() => handleNavigate(ViewState.ALL_PRODUCTS)} className="flex items-center justify-between text-left font-heading font-bold text-xl uppercase tracking-widest">
              <span>{t.nav.allProducts}</span><span className="text-gray-300 text-sm">→</span>
            </button>
            <div className="pt-4 mt-4 border-t border-gray-100 flex flex-col space-y-4">
                {['men', 'women', 'kids'].map((key) => (
                  <button key={key} onClick={() => handleNavigate(ViewState.ALL_PRODUCTS)} className="text-left font-bold text-sm uppercase tracking-widest">
                    {t.nav[key as keyof typeof t.nav]}
                  </button>
                ))}
            </div>
            <button onClick={() => handleNavigate(ViewState.CHECKOUT)} className="flex items-center justify-between text-left font-heading font-bold text-xl uppercase tracking-widest pt-4">
              <span>{t.nav.cart}</span><span className="text-gray-300 text-sm">→</span>
            </button>
          </div>
          <div className="mt-auto p-6 bg-gray-50 border-t border-gray-100">
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Fotbal Store Club</p>
             <button onClick={() => handleNavigate(ViewState.REGISTER)} className="w-full bg-black text-white font-bold py-3 text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors">
               {t.home.register}
             </button>
          </div>
        </div>
      </div>
    </>
  );
};
