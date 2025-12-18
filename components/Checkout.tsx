
import React, { useState } from 'react';
import { Trash2, ArrowRight, Lock, CreditCard, ShoppingBag, Truck, Box, Mail, Wallet, Check, CheckCircle2, ArrowLeft } from 'lucide-react';
import { CartItem, CustomerDetails } from '../types';
import { translations } from '../translations';

interface CheckoutProps {
  cart: CartItem[];
  onRemoveItem: (index: number) => void;
  onComplete: () => void;
  onBack: () => void;
  lang: 'cs' | 'en';
}

export const Checkout: React.FC<CheckoutProps> = ({ cart, onRemoveItem, onComplete, onBack, lang }) => {
  const [details, setDetails] = useState<CustomerDetails>({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', zip: '' });
  const [shippingMethod, setShippingMethod] = useState('zasilkovna');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const t = translations[lang];

  // Empty state handling
  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center animate-fade-in">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h1 className="font-heading text-4xl font-bold uppercase mb-4">{t.checkout.empty}</h1>
        <p className="text-gray-500 max-w-md mb-8">
          {t.checkout.emptyDesc}
        </p>
        <button 
          onClick={onBack} 
          className="bg-black text-white font-heading font-bold uppercase tracking-widest px-10 py-4 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex items-center gap-3"
        >
          <ArrowLeft className="w-5 h-5" />
          {t.checkout.continue}
        </button>
      </div>
    );
  }

  const subtotal = cart.reduce((sum, item) => sum + (lang === 'cs' ? item.priceCZK : item.priceEUR), 0);
  const FREE_SHIPPING_THRESHOLD = lang === 'cs' ? 899 : 40;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  const getShippingCost = (method: string) => {
    if (isFreeShipping) return 0;
    if (lang === 'cs') {
      switch (method) {
        case 'zasilkovna': return 89;
        case 'ppl': return 109;
        case 'posta': return 129;
        default: return 129;
      }
    } else {
      switch (method) {
        case 'zasilkovna': return 3.5;
        case 'ppl': return 4.5;
        case 'posta': return 5.5;
        default: return 5.5;
      }
    }
  };

  const shippingCost = getShippingCost(shippingMethod);
  const total = subtotal + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const FormInput = ({ label, name, type = "text", value, onChange }: any) => (
    <div className="relative w-full">
      <input 
        type={type} 
        name={name} 
        id={name} 
        value={value} 
        onChange={onChange} 
        className="block px-4 py-4 w-full text-base border border-gray-300 focus:outline-none focus:border-black peer rounded-sm bg-white transition-all" 
        placeholder=" " 
        required 
      />
      <label 
        htmlFor={name} 
        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 pointer-events-none"
      >
        {label}
      </label>
    </div>
  );

  return (
    <div className="bg-white min-h-screen animate-fade-in">
        <div className="flex flex-col lg:flex-row min-h-screen">
            <div className="w-full lg:w-[60%] px-4 md:px-12 py-8 lg:py-16 order-2 lg:order-1">
                <div className="max-w-2xl mx-auto">
                    <h1 className="font-heading text-4xl font-bold uppercase mb-12 tracking-tight border-b-4 border-black pb-4 inline-block">{t.checkout.title}</h1>
                    
                    <form onSubmit={(e) => { e.preventDefault(); onComplete(); }} className="space-y-16">
                        {/* 1. Contact */}
                        <div className="space-y-8">
                            <h3 className="font-heading text-2xl font-bold uppercase tracking-wider flex items-center gap-3">
                              <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                              {t.checkout.contact}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormInput label={t.checkout.email} name="email" type="email" value={details.email} onChange={handleChange} />
                              <FormInput label={t.checkout.phone} name="phone" type="tel" value={details.phone} onChange={handleChange} />
                            </div>
                        </div>

                        {/* 2. Address */}
                        <div className="space-y-8">
                            <h3 className="font-heading text-2xl font-bold uppercase tracking-wider flex items-center gap-3">
                              <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                              {t.checkout.address}
                            </h3>
                            <div className="grid grid-cols-2 gap-6">
                                <FormInput label={t.checkout.fname} name="firstName" value={details.firstName} onChange={handleChange} />
                                <FormInput label={t.checkout.lname} name="lastName" value={details.lastName} onChange={handleChange} />
                            </div>
                            <FormInput label={t.checkout.street} name="address" value={details.address} onChange={handleChange} />
                            <div className="grid grid-cols-2 gap-6">
                                <FormInput label={t.checkout.zip} name="zip" value={details.zip} onChange={handleChange} />
                                <FormInput label={t.checkout.city} name="city" value={details.city} onChange={handleChange} />
                            </div>
                        </div>

                        {/* 3. Shipping */}
                        <div className="space-y-8">
                            <h3 className="font-heading text-2xl font-bold uppercase tracking-wider flex items-center gap-3">
                              <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                              {t.checkout.shipping}
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                  { id: 'zasilkovna', name: t.checkout.methods.zasilkovna, price: lang === 'cs' ? 89 : 3.5, icon: <Box className="w-5 h-5" /> },
                                  { id: 'ppl', name: t.checkout.methods.ppl, price: lang === 'cs' ? 109 : 4.5, icon: <Truck className="w-5 h-5" /> },
                                  { id: 'posta', name: t.checkout.methods.posta, price: lang === 'cs' ? 129 : 5.5, icon: <Mail className="w-5 h-5" /> }
                                ].map((method) => (
                                  <label 
                                    key={method.id}
                                    className={`
                                      flex items-center justify-between p-5 border-2 cursor-pointer transition-all duration-200
                                      ${shippingMethod === method.id ? 'border-black bg-gray-50 shadow-md' : 'border-gray-200 hover:border-gray-400'}
                                    `}
                                  >
                                    <input 
                                      type="radio" 
                                      name="shipping" 
                                      className="hidden" 
                                      value={method.id} 
                                      checked={shippingMethod === method.id}
                                      onChange={() => setShippingMethod(method.id)}
                                    />
                                    <div className="flex items-center gap-4">
                                      <div className={`${shippingMethod === method.id ? 'text-black' : 'text-gray-400'}`}>{method.icon}</div>
                                      <span className="font-bold text-sm uppercase">{method.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className={`font-bold ${isFreeShipping ? 'text-green-600' : ''}`}>
                                        {isFreeShipping ? t.checkout.free : `${method.price} ${t.currency}`}
                                      </span>
                                      {shippingMethod === method.id && <CheckCircle2 className="w-5 h-5 text-black" />}
                                    </div>
                                  </label>
                                ))}
                            </div>
                        </div>

                        {/* 4. Payment */}
                        <div className="space-y-8">
                            <h3 className="font-heading text-2xl font-bold uppercase tracking-wider flex items-center gap-3">
                              <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                              {t.checkout.payment}
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {[
                                  { id: 'card', name: t.checkout.methods.card, icon: <CreditCard className="w-6 h-6" /> },
                                  { id: 'paypal', name: t.checkout.methods.paypal, icon: <div className="font-bold text-blue-700">PayPal</div> },
                                  { id: 'bank', name: t.checkout.methods.bank, icon: <Wallet className="w-6 h-6" /> },
                                  { id: 'apple', name: t.checkout.methods.apple, icon: <div className="font-bold">Pay</div> }
                                ].map((method) => (
                                  <label 
                                    key={method.id}
                                    className={`
                                      flex flex-col items-center justify-center p-6 border-2 cursor-pointer transition-all gap-4 text-center
                                      ${paymentMethod === method.id ? 'border-black bg-gray-50 shadow-md' : 'border-gray-200 hover:border-gray-400'}
                                    `}
                                  >
                                    <input 
                                      type="radio" 
                                      name="payment" 
                                      className="hidden" 
                                      value={method.id} 
                                      checked={paymentMethod === method.id}
                                      onChange={() => setPaymentMethod(method.id)}
                                    />
                                    <div className={`${paymentMethod === method.id ? 'text-black' : 'text-gray-400'}`}>{method.icon}</div>
                                    <span className="font-bold text-xs uppercase tracking-tighter leading-tight">{method.name}</span>
                                    {paymentMethod === method.id && <div className="w-2 h-2 bg-black rounded-full" />}
                                  </label>
                                ))}
                            </div>
                        </div>

                        <button 
                          type="submit" 
                          className="w-full bg-black text-white font-heading font-bold text-2xl uppercase tracking-widest py-6 mt-16 hover:bg-gray-800 transition-all shadow-2xl active:scale-[0.98] group flex items-center justify-center gap-4"
                        >
                          {t.checkout.pay} {total.toFixed(lang === 'cs' ? 0 : 2)} {t.currency}
                          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="w-full lg:w-[40%] bg-gray-50 border-l border-gray-200 px-4 md:px-12 py-8 lg:py-16 order-1 lg:order-2">
                <div className="max-w-lg lg:sticky lg:top-24">
                    <h2 className="font-heading text-2xl font-bold uppercase mb-8 border-b border-gray-200 pb-4">{t.checkout.summary} ({cart.length})</h2>
                    <div className="space-y-6 mb-8 overflow-y-auto max-h-[40vh] pr-4 custom-scrollbar">
                        {cart.map((item, index) => (
                            <div key={index} className="flex gap-5 items-start bg-white p-3 border border-gray-100 shadow-sm animate-fade-in-up" style={{animationDelay: `${index * 50}ms`}}>
                                <img src={item.image} className="w-20 h-24 object-cover border border-gray-200" alt={item.name} />
                                <div className="flex-1 flex flex-col justify-between h-24 py-1">
                                    <div>
                                      <h4 className="font-bold text-sm uppercase leading-tight mb-1">{item.name}</h4>
                                      <p className="text-gray-500 text-xs font-bold uppercase">{t.detail.selectSize}: {item.selectedSize}</p>
                                    </div>
                                    <div className="flex justify-between items-end">
                                      <span className="font-bold text-sm">{(lang === 'cs' ? item.priceCZK : item.priceEUR)} {t.currency}</span>
                                      <button onClick={() => onRemoveItem(index)} className="text-red-600 hover:text-red-800 p-1 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Progress to Free Shipping */}
                    {!isFreeShipping && lang === 'cs' && (
                      <div className="bg-yellow-50 p-4 border border-yellow-200 mb-8 rounded-sm">
                        <p className="text-xs font-bold uppercase mb-2">Chybí vám jen {FREE_SHIPPING_THRESHOLD - subtotal} Kč do dopravy zdarma!</p>
                        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-yellow-400 h-full" style={{ width: `${(subtotal / FREE_SHIPPING_THRESHOLD) * 100}%` }}></div>
                        </div>
                      </div>
                    )}

                    <div className="border-t border-gray-200 pt-8 space-y-4">
                        <div className="flex justify-between text-sm uppercase font-medium">
                          <span className="text-gray-500">{t.checkout.subtotal}</span>
                          <span className="font-bold">{subtotal.toFixed(lang === 'cs' ? 0 : 2)} {t.currency}</span>
                        </div>
                        <div className="flex justify-between text-sm uppercase font-medium">
                          <span className="text-gray-500">Doprava ({shippingMethod.toUpperCase()})</span>
                          <span className={`font-bold ${isFreeShipping ? 'text-green-600' : ''}`}>
                            {shippingCost === 0 ? t.checkout.free : `${shippingCost.toFixed(lang === 'cs' ? 0 : 2)} ${t.currency}`}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-3xl font-bold border-t-4 border-black pt-6 mt-4">
                            <span className="uppercase tracking-tighter">{t.checkout.total}</span>
                            <div className="flex flex-col items-end">
                              <span>{total.toFixed(lang === 'cs' ? 0 : 2)} {t.currency}</span>
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t.checkout.inclusive}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-xs uppercase font-bold tracking-widest">
                      <Lock className="w-3 h-3" /> Bezpečná pokladna
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
