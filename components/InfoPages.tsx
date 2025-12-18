
import React, { useState } from 'react';
import { 
  ArrowLeft, Truck, Box, RotateCcw, Ruler, 
  Rocket, Heart, Users, Instagram, Facebook, 
  Video, Droplets, Thermometer, Ban, Wind,
  Mail, CheckCircle, Gift, Zap
} from 'lucide-react';
import { translations } from '../translations';

// Updated interface to include lang
interface InfoPageProps {
  onBack: () => void;
  lang: 'cs' | 'en';
}

// Updated InfoWrapper to accept lang and handle localization for the back button
const InfoWrapper: React.FC<{ title: string; onBack: () => void; lang: 'cs' | 'en'; children: React.ReactNode }> = ({ title, onBack, lang, children }) => {
  const t = translations[lang];
  return (
    <div className="min-h-screen bg-white animate-fade-in py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:underline mb-8 transition-all hover:-translate-x-1"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> {t.products.back}
        </button>
        <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-8 border-b-4 border-black pb-4 inline-block">{title}</h1>
        <div className="text-gray-800 leading-relaxed space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Existing Pages ---

export const ShippingPage: React.FC<InfoPageProps> = ({ onBack, lang }) => {
  const t = translations[lang];
  return (
    <InfoWrapper title={t.footer.shipping} onBack={onBack} lang={lang}>
      <div className="bg-gray-50 p-6 border-l-4 border-black mb-8">
        <h3 className="font-bold text-xl uppercase mb-2 flex items-center gap-2"><Truck className="w-5 h-5"/> {lang === 'cs' ? 'Doprava zdarma' : 'Free Shipping'}</h3>
        <p>{lang === 'cs' ? 'Při nákupu nad' : 'With purchase over'} <span className="font-bold">{lang === 'cs' ? '899 Kč' : '899 CZK'}</span> {lang === 'cs' ? 'máte od nás dopravu zcela zdarma, bez ohledu na zvoleného dopravce.' : 'shipping is completely free, regardless of the chosen carrier.'}</p>
      </div>

      <h2 className="font-heading text-2xl font-bold uppercase mb-4">{lang === 'cs' ? 'Možnosti dopravy' : 'Shipping Options'}</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="border p-6 rounded-sm hover:shadow-lg transition-shadow">
          <h3 className="font-bold text-lg uppercase mb-2">{lang === 'cs' ? 'Zásilkovna - Výdejní místo' : 'Packeta - Pickup point'}</h3>
          <p className="text-gray-600 text-sm mb-4">{lang === 'cs' ? 'Doručení na jednu z tisíců poboček nebo do Z-Boxu.' : 'Delivery to one of thousands of branches or Z-Box.'}</p>
          <div className="flex justify-between items-center font-bold">
            <span>{lang === 'cs' ? '89 Kč' : '89 CZK'}</span>
            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">{lang === 'cs' ? '1-2 dny' : '1-2 days'}</span>
          </div>
        </div>
        
        <div className="border p-6 rounded-sm hover:shadow-lg transition-shadow">
          <h3 className="font-bold text-lg uppercase mb-2">{lang === 'cs' ? 'PPL - Kurýr na adresu' : 'PPL - Courier to address'}</h3>
          <p className="text-gray-600 text-sm mb-4">{lang === 'cs' ? 'Komfortní doručení přímo k vašim dveřím s možností sledování.' : 'Comfortable delivery directly to your door with tracking option.'}</p>
          <div className="flex justify-between items-center font-bold">
            <span>{lang === 'cs' ? '109 Kč' : '109 CZK'}</span>
            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">{lang === 'cs' ? 'Do 24h' : 'Within 24h'}</span>
          </div>
        </div>

        <div className="border p-6 rounded-sm hover:shadow-lg transition-shadow">
          <h3 className="font-bold text-lg uppercase mb-2">{lang === 'cs' ? 'Česká pošta - Balík do ruky' : 'Czech Post - Hand parcel'}</h3>
          <p className="text-gray-600 text-sm mb-4">{lang === 'cs' ? 'Tradiční doručení poštovním doručovatelem.' : 'Traditional delivery by postal carrier.'}</p>
          <div className="flex justify-between items-center font-bold">
            <span>{lang === 'cs' ? '129 Kč' : '129 CZK'}</span>
            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">{lang === 'cs' ? '2-3 dny' : '2-3 days'}</span>
          </div>
        </div>
      </div>
    </InfoWrapper>
  );
};

export const ReturnsPage: React.FC<InfoPageProps> = ({ onBack, lang }) => {
  const t = translations[lang];
  return (
    <InfoWrapper title={t.footer.returns} onBack={onBack} lang={lang}>
      <p className="text-lg font-medium">{lang === 'cs' ? 'Nesedí vám velikost nebo dres nevypadá podle vašich představ? Žádný problém.' : 'Does the size not fit or the jersey does not look as you imagined? No problem.'}</p>
      
      <div className="flex items-center gap-4 my-8 bg-black text-white p-6 shadow-xl transform -rotate-1">
        <RotateCcw className="w-10 h-10 flex-shrink-0" />
        <div>
          <h3 className="font-heading font-bold text-xl uppercase">{lang === 'cs' ? '30 dní na vrácení' : '30 days returns'}</h3>
          <p className="text-sm text-gray-300">{lang === 'cs' ? 'Garance vrácení peněz bez zbytečných otázek.' : 'Money back guarantee without unnecessary questions.'}</p>
        </div>
      </div>

      <h2 className="font-heading text-2xl font-bold uppercase mb-4 mt-8">{lang === 'cs' ? 'Jak postupovat?' : 'How to proceed?'}</h2>
      <ol className="list-decimal list-inside space-y-4 font-medium text-gray-700">
        <li className="pl-2">{lang === 'cs' ? 'Zboží musí být nenošené, neprané a s originálními visačkami.' : 'Goods must be unworn, unwashed and with original tags.'}</li>
        <li className="pl-2">{lang === 'cs' ? 'Vyplňte formulář pro vrácení zboží, který byl přiložen v balíčku (nebo si jej stáhněte zde).' : 'Fill in the return form that was attached in the package (or download it here).'}</li>
        <li className="pl-2">{lang === 'cs' ? 'Zabalte zboží tak, aby se při přepravě nepoškodilo.' : 'Pack the goods so that they are not damaged during transport.'}</li>
        <li className="pl-2">{lang === 'cs' ? 'Odešlete balíček na naši adresu nebo jej doneste na jakoukoliv pobočku Zásilkovny s kódem' : 'Send the package to our address or bring it to any Packeta branch with the code'} <span className="font-bold bg-yellow-100 px-2">98765432</span> {lang === 'cs' ? '(zpětná zásilka zdarma).' : '(free return shipment).'}</li>
      </ol>

      <div className="mt-8 p-4 border border-gray-200 rounded-sm bg-gray-50">
        <h4 className="font-bold uppercase text-sm mb-2">{lang === 'cs' ? 'Adresa pro vrácení:' : 'Return address:'}</h4>
        <p className="text-sm text-gray-600">Fotbal Store Sklad, Průmyslová 123, 102 00 Praha 10</p>
      </div>
    </InfoWrapper>
  );
};

export const SizeChartPage: React.FC<InfoPageProps> = ({ onBack, lang }) => {
  const t = translations[lang];
  return (
    <InfoWrapper title={t.footer.sizes} onBack={onBack} lang={lang}>
      <p className="mb-6">
        {lang === 'cs' ? 'Aby vám dres perfektně seděl, doporučujeme změřit vaše tělesné míry a porovnat je s naší tabulkou. Míry jsou uvedeny v centimetrech a odpovídají standardním střihům fotbalových dresů (Nike, Adidas, Puma).' : 'To make sure the jersey fits you perfectly, we recommend measuring your body and comparing them with our table. Measures are in centimeters and correspond to standard football jersey cuts (Nike, Adidas, Puma).'}
      </p>

      <div className="flex items-start gap-4 mb-8 text-sm text-gray-500 italic">
        <Ruler className="w-5 h-5 flex-shrink-0" />
        <p>{lang === 'cs' ? 'Tip: Pokud jste na rozmezí dvou velikostí, pro volnější střih (Fan verze) zvolte větší velikost, pro upnutější střih (Authentic verze) menší.' : 'Tip: If you are between two sizes, for a looser fit (Fan version) choose a larger size, for a tighter fit (Authentic version) smaller.'}</p>
      </div>

      <div className="overflow-x-auto shadow-md rounded-sm">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-white uppercase bg-black">
            <tr>
              <th scope="col" className="px-6 py-4">{lang === 'cs' ? 'Velikost' : 'Size'}</th>
              <th scope="col" className="px-6 py-4">{lang === 'cs' ? 'Hrudník (cm)' : 'Chest (cm)'}</th>
              <th scope="col" className="px-6 py-4">{lang === 'cs' ? 'Pas (cm)' : 'Waist (cm)'}</th>
              <th scope="col" className="px-6 py-4">{lang === 'cs' ? 'Boky (cm)' : 'Hips (cm)'}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b hover:bg-gray-50">
              <th scope="row" className="px-6 py-4 font-bold text-black whitespace-nowrap">XS</th>
              <td className="px-6 py-4">82 - 87</td>
              <td className="px-6 py-4">71 - 75</td>
              <td className="px-6 py-4">82 - 86</td>
            </tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100">
              <th scope="row" className="px-6 py-4 font-bold text-black whitespace-nowrap">S</th>
              <td className="px-6 py-4">88 - 94</td>
              <td className="px-6 py-4">76 - 82</td>
              <td className="px-6 py-4">87 - 93</td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <th scope="row" className="px-6 py-4 font-bold text-black whitespace-nowrap">M</th>
              <td className="px-6 py-4">95 - 102</td>
              <td className="px-6 py-4">83 - 90</td>
              <td className="px-6 py-4">94 - 101</td>
            </tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100">
              <th scope="row" className="px-6 py-4 font-bold text-black whitespace-nowrap">L</th>
              <td className="px-6 py-4">103 - 112</td>
              <td className="px-6 py-4">91 - 99</td>
              <td className="px-6 py-4">102 - 110</td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <th scope="row" className="px-6 py-4 font-bold text-black whitespace-nowrap">XL</th>
              <td className="px-6 py-4">113 - 122</td>
              <td className="px-6 py-4">100 - 109</td>
              <td className="px-6 py-4">111 - 119</td>
            </tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100">
              <th scope="row" className="px-6 py-4 font-bold text-black whitespace-nowrap">XXL</th>
              <td className="px-6 py-4">123 - 132</td>
              <td className="px-6 py-4">110 - 121</td>
              <td className="px-6 py-4">120 - 128</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-xs uppercase font-bold tracking-wider text-gray-500">
        <div>
          <div className="bg-gray-100 h-10 mb-2 w-full flex items-center justify-center">{lang === 'cs' ? 'Hrudník' : 'Chest'}</div>
          {lang === 'cs' ? 'Měřte v nejširším místě' : 'Measure at the widest point'}
        </div>
        <div>
          <div className="bg-gray-100 h-10 mb-2 w-full flex items-center justify-center">{lang === 'cs' ? 'Pas' : 'Waist'}</div>
          {lang === 'cs' ? 'Měřte v nejužším místě' : 'Measure at the narrowest point'}
        </div>
        <div>
          <div className="bg-gray-100 h-10 mb-2 w-full flex items-center justify-center">{lang === 'cs' ? 'Boky' : 'Hips'}</div>
          {lang === 'cs' ? 'Měřte v nejširším místě boků' : 'Measure at the widest point of hips'}
        </div>
      </div>
    </InfoWrapper>
  );
};

// --- New Pages ---

export const CareerPage: React.FC<InfoPageProps> = ({ onBack, lang }) => {
  const t = translations[lang];
  return (
    <InfoWrapper title={t.footer.career} onBack={onBack} lang={lang}>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-heading text-3xl font-bold uppercase mb-4">{lang === 'cs' ? 'Více než jen obchod' : 'More than just a shop'}</h2>
          <p className="mb-4">
            {lang === 'cs' ? 'Jsme začínající e-shop, který vznikl z čisté vášně pro fotbal. Na hřišti i mimo něj žijeme tímto sportem 24/7. Náš příběh začal jednoduchou myšlenkou: přinést fanouškům dresy jejich oblíbených klubů v nejvyšší kvalitě a s moderním servisem, který v Česku chyběl.' : 'We are a starting e-shop that was born from pure passion for football. On and off the pitch, we live this sport 24/7. Our story began with a simple idea: to bring fans jerseys of their favorite clubs in the highest quality and with modern service that was missing in the Czech Republic.'}
          </p>
          <p className="mb-6">
            {lang === 'cs' ? 'Nejsme korporát. Jsme parta nadšenců, kteří věří, že fotbalový dres není jen kus látky, ale symbol hrdosti. Každou objednávku balíme s pečlivostí, jako bychom ji posílali sami sobě.' : 'We are not a corporation. We are a bunch of enthusiasts who believe that a football jersey is not just a piece of cloth, but a symbol of pride. We pack every order with care, as if we were sending it to ourselves.'}
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-black text-white p-3 rounded-full"><Rocket className="w-5 h-5"/></div>
              <div><h4 className="font-bold uppercase text-sm">{lang === 'cs' ? 'Rychlý růst' : 'Fast Growth'}</h4><p className="text-xs text-gray-500">{lang === 'cs' ? 'Každý měsíc rozšiřujeme nabídku o nové týmy.' : 'Every month we expand the offer with new teams.'}</p></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-black text-white p-3 rounded-full"><Heart className="w-5 h-5"/></div>
              <div><h4 className="font-bold uppercase text-sm">{lang === 'cs' ? 'Srdcaři' : 'Hearties'}</h4><p className="text-xs text-gray-500">{lang === 'cs' ? 'Děláme to pro komunitu, ne jen pro čísla.' : 'We do it for the community, not just for numbers.'}</p></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-black text-white p-3 rounded-full"><Users className="w-5 h-5"/></div>
              <div><h4 className="font-bold uppercase text-sm">{lang === 'cs' ? 'Hledáme posily' : 'We are looking for reinforcements'}</h4><p className="text-xs text-gray-500">{lang === 'cs' ? 'Máš stejnou vášeň? Napiš nám!' : 'Have the same passion? Write to us!'}</p></div>
            </div>
          </div>
        </div>
        <div className="relative h-96 bg-gray-100 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=1000&auto=format&fit=crop" alt="Team" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      </div>
    </InfoWrapper>
  );
};

export const NewsPage: React.FC<InfoPageProps> = ({ onBack, lang }) => {
  const t = translations[lang];
  const socialCards = [
    {
      name: 'Instagram',
      icon: <Instagram className="w-8 h-8" />,
      desc: lang === 'cs' ? 'Sledujte zákulisí našeho skladu, detailní fotky nových dresů a každodenní dávku fotbalové inspirace.' : 'Watch behind the scenes of our warehouse, detailed photos of new jerseys and daily dose of football inspiration.',
      link: 'https://www.instagram.com/carnex.exe/',
      color: 'hover:bg-pink-50 hover:border-pink-500 hover:text-pink-600'
    },
    {
      name: 'TikTok',
      icon: <Video className="w-8 h-8" />,
      desc: lang === 'cs' ? 'Rychlé unboxingy, trendy, fotbalové výzvy a zábava. Buďte u toho s námi.' : 'Fast unboxings, trends, football challenges and fun. Be there with us.',
      link: 'https://www.tiktok.com/@carnex_0',
      color: 'hover:bg-gray-50 hover:border-black hover:text-black'
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-8 h-8" />,
      desc: lang === 'cs' ? 'Přidejte se do naší komunity. Diskuse o zápasech, soutěže o dresy a důležité novinky z e-shopu.' : 'Join our community. Discussions about matches, jersey competitions and important news from the e-shop.',
      link: 'https://facebook.com',
      color: 'hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600'
    }
  ];

  return (
    <InfoWrapper title={t.footer.news} onBack={onBack} lang={lang}>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl">
        {lang === 'cs' ? 'Chcete vědět o nových kolekcích jako první? Nebo se jen pobavit u fotbalového obsahu? Sledujte nás na našich platformách a buďte součástí hry.' : 'Want to know about new collections first? Or just have fun with football content? Follow us on our platforms and be part of the game.'}
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {socialCards.map((social) => (
          <a 
            key={social.name}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              block p-8 border-2 border-gray-100 transition-all duration-300 group
              ${social.color} cursor-pointer
            `}
          >
            <div className="mb-6 text-black group-hover:scale-110 transition-transform duration-300">
              {social.icon}
            </div>
            <h3 className="font-heading font-bold text-2xl uppercase mb-3">{social.name}</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              {social.desc}
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
              {lang === 'cs' ? 'Sledovat' : 'Follow'} <ArrowLeft className="w-3 h-3 rotate-180" />
            </div>
          </a>
        ))}
      </div>
    </InfoWrapper>
  );
};

export const SustainabilityPage: React.FC<InfoPageProps> = ({ onBack, lang }) => {
  const t = translations[lang];
  return (
    <InfoWrapper title={t.footer.sustainability} onBack={onBack} lang={lang}>
      <div className="mb-10">
        <h2 className="font-heading text-2xl font-bold uppercase mb-4">{lang === 'cs' ? 'Dlouhá životnost = Udržitelnost' : 'Long Life = Sustainability'}</h2>
        <p>
          {lang === 'cs' ? 'Nejekologičtější dres je ten, který vám vydrží roky. Moderní fotbalové dresy jsou vyrobeny z technických materiálů a recyklovaných plastů (polyester), které vyžadují specifickou péči. Pokud se o ně budete správně starat, potisk nepopraská a barvy nevyblednou.' : 'The most ecological jersey is the one that lasts you for years. Modern football jerseys are made of technical materials and recycled plastics (polyester), which require specific care. If you take proper care of them, the print will not crack and the colors will not fade.'}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="border border-gray-200 p-6 flex flex-col items-center text-center hover:border-black transition-colors">
          <Thermometer className="w-10 h-10 mb-4 text-gray-400" />
          <h3 className="font-bold uppercase mb-2">{lang === 'cs' ? 'Maximálně 30°C' : 'Maximum 30°C'}</h3>
          <p className="text-xs text-gray-500">{lang === 'cs' ? 'Perte vždy ve studené vodě. Vysoká teplota ničí strukturu vláken a lepidlo potisků.' : 'Always wash in cold water. High temperature destroys fiber structure and print glue.'}</p>
        </div>

        <div className="border border-gray-200 p-6 flex flex-col items-center text-center hover:border-black transition-colors">
          <RotateCcw className="w-10 h-10 mb-4 text-gray-400" />
          <h3 className="font-bold uppercase mb-2">{lang === 'cs' ? 'Prát naruby' : 'Wash Inside Out'}</h3>
          <p className="text-xs text-gray-500">{lang === 'cs' ? 'Vždy otočte dres potiskem dovnitř. Chráníte tak jméno, číslo i loga před odřením o buben pračky.' : 'Always turn the jersey inside out. This protects the name, number and logos from abrasion against the washing machine drum.'}</p>
        </div>

        <div className="border border-gray-200 p-6 flex flex-col items-center text-center hover:border-black transition-colors">
          <Droplets className="w-10 h-10 mb-4 text-gray-400" />
          <h3 className="font-bold uppercase mb-2">{lang === 'cs' ? 'Žádná aviváž' : 'No Fabric Softener'}</h3>
          <p className="text-xs text-gray-500 text-red-600 font-bold">{lang === 'cs' ? 'Nikdy nepoužívejte aviváž!' : 'Never use fabric softener!'}</p>
          <p className="text-xs text-gray-500 mt-1">{lang === 'cs' ? 'Aviváž zalepí funkční póry dresu a ten přestane odvádět pot. Navíc rozpouští lepidlo potisků.' : 'Softener clogs functional pores of the jersey and it stops wicking sweat. Plus it dissolves print glue.'}</p>
        </div>

        <div className="border border-gray-200 p-6 flex flex-col items-center text-center hover:border-black transition-colors">
          <Wind className="w-10 h-10 mb-4 text-gray-400" />
          <h3 className="font-bold uppercase mb-2">{lang === 'cs' ? 'Nesušit v sušičce' : 'Do Not Tumble Dry'}</h3>
          <p className="text-xs text-gray-500">{lang === 'cs' ? 'Sušte volně na vzduchu. Horký vzduch v sušičce může dres srazit a zničit potisky.' : 'Air dry freely. Hot air in the dryer can shrink the jersey and destroy prints.'}</p>
        </div>
      </div>

      <div className="mt-10 bg-gray-50 p-6 border-l-4 border-yellow-400">
        <h4 className="font-bold uppercase text-sm mb-2 flex items-center gap-2"><Ban className="w-4 h-4"/> {lang === 'cs' ? 'Další tipy' : 'Other Tips'}</h4>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>{lang === 'cs' ? 'Dresy nikdy nežehlete přímo přes potisk.' : 'Never iron jerseys directly over the print.'}</li>
          <li>{lang === 'cs' ? 'Neperte s oblečením, které má zipy nebo suché zipy (může zatrhnout látku).' : 'Do not wash with clothes that have zippers or velcro (can snag the fabric).'}</li>
          <li>{lang === 'cs' ? 'Po sportu nenechávejte dres zmuchlaný v tašce, ihned ho vyvětrejte nebo vyperte.' : 'After sport, do not leave the jersey crumpled in a bag, air it out or wash it immediately.'}</li>
        </ul>
      </div>
    </InfoWrapper>
  );
};

export const RegisterPage: React.FC<InfoPageProps> = ({ onBack, lang }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const t = translations[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white animate-fade-in flex flex-col items-center justify-center p-4 text-center">
        <div className="max-w-md w-full">
           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-8 mx-auto text-green-600 animate-bounce">
              <CheckCircle className="w-10 h-10" />
           </div>
           <h1 className="font-heading text-4xl font-bold uppercase mb-4">{t.register.success}</h1>
           <p className="text-gray-600 mb-8 text-lg">
             {lang === 'cs' ? 'Děkujeme za registraci. Na email' : 'Thank you for registering. To email'} <span className="font-bold text-black">{email}</span> {lang === 'cs' ? 'jsme vám právě poslali potvrzení a slevový kód 10% na první nákup.' : 'we have just sent a confirmation and a 10% discount code for your first purchase.'}
           </p>
           <button 
             onClick={onBack}
             className="w-full bg-black text-white font-heading font-bold uppercase tracking-widest px-10 py-4 hover:bg-gray-800 transition-all duration-300"
           >
             {t.register.back}
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white animate-fade-in flex flex-col">
       {/* Close/Back button area */}
       <div className="p-4 md:p-8">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:underline transition-all hover:-translate-x-1"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> {t.register.back}
          </button>
       </div>

       <div className="flex-grow flex items-center justify-center p-4">
         <div className="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center">
            
            {/* Text Side */}
            <div className="space-y-8">
               <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase leading-none">
                 {t.register.title.split(' ').map((word, i) => <React.Fragment key={i}>{word} {i === 1 ? <br/> : ''}</React.Fragment>)}
               </h1>
               <p className="text-lg text-gray-600 max-w-md leading-relaxed">
                 {t.register.desc}
               </p>

               <div className="space-y-6">
                  <div className="flex items-start gap-4">
                     <div className="p-2 bg-gray-50 rounded-full"><Gift className="w-6 h-6"/></div>
                     <div>
                        <h4 className="font-bold uppercase">{t.register.benefit1}</h4>
                        <p className="text-sm text-gray-500">{lang === 'cs' ? 'Slevový kód vám přijde okamžitě na email.' : 'Discount code will be sent to your email immediately.'}</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="p-2 bg-gray-50 rounded-full"><Zap className="w-6 h-6"/></div>
                     <div>
                        <h4 className="font-bold uppercase">{t.register.benefit2}</h4>
                        <p className="text-sm text-gray-500">{lang === 'cs' ? 'Limitované edice dresů pro členy o 24h dříve.' : 'Limited edition jerseys for members 24h earlier.'}</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="p-2 bg-gray-50 rounded-full"><Mail className="w-6 h-6"/></div>
                     <div>
                        <h4 className="font-bold uppercase">{t.register.benefit3}</h4>
                        <p className="text-sm text-gray-500">{lang === 'cs' ? 'Budete vědět o nových kolekcích jako první.' : 'You will be the first to know about new collections.'}</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Form Side */}
            <div className="bg-gray-50 p-8 md:p-12 border border-gray-200 shadow-xl relative overflow-hidden">
               {/* Decorative background element */}
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-gray-200 rounded-full opacity-50 blur-3xl"></div>
               
               <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold uppercase mb-2">{t.checkout.email}</label>
                    <input 
                      type="email" 
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={lang === 'cs' ? 'např. jan.novak@email.cz' : 'e.g. john.doe@email.com'}
                      className="w-full p-4 bg-white border border-gray-300 focus:outline-none focus:border-black transition-colors"
                      required
                    />
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="consent" required className="mt-1 w-4 h-4 accent-black" />
                    <label htmlFor="consent" className="text-xs text-gray-500">
                      {t.register.consent} {lang === 'cs' ? 'Z odběru se můžete kdykoliv odhlásit.' : 'You can unsubscribe at any time.'}
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-black text-white font-heading font-bold uppercase tracking-widest py-4 hover:bg-gray-800 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>{t.register.process}</>
                    ) : (
                      <>{t.home.register}</>
                    )}
                  </button>
               </form>
            </div>
         </div>
       </div>
    </div>
  );
};
