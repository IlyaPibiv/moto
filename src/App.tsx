import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, Star, ArrowRight, X, Plus, Minus, CheckCircle2, MapPin, Phone, Mail } from 'lucide-react';
import { CATEGORIES, PRODUCTS, BRANDS_DATA, formatPrice } from './data';
import { Calculator } from './Calculator';

declare global {
  interface Window {
    Telegram?: any;
  }
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}


function App() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const filteredProducts = activeCategory === "Все" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const addToCart = (product: typeof PRODUCTS[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Добавлено: ${product.name}`);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background text-textMain font-sans selection:bg-primary/30 overflow-x-hidden">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-[100] bg-surface border border-white/10 px-6 py-3 rounded-full shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span className="font-medium text-white">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-surface border-l border-white/5 z-[70] flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  Корзина {cartCount > 0 && <span className="bg-primary/20 text-primary text-sm px-2 py-0.5 rounded-full">{cartCount}</span>}
                </h2>
                <button onClick={() => setCartOpen(false)} className="text-textMuted hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-textMuted space-y-4 opacity-70">
                    <ShoppingCart className="w-16 h-16 mb-2" />
                    <p>Ваша корзина пуста</p>
                    <button onClick={() => {setCartOpen(false); scrollToSection('catalog');}} className="text-primary hover:underline">
                      Перейти к покупкам
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <motion.div layout key={item.id} className="flex gap-4 items-center bg-background p-3 rounded-xl border border-white/5">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white line-clamp-2 leading-tight mb-2">{item.name}</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-primary font-bold">{formatPrice(item.price)}</span>
                          <div className="flex items-center gap-3 bg-surface px-2 py-1 rounded-lg border border-white/5">
                            <button onClick={() => updateQuantity(item.id, -1)} className="text-textMuted hover:text-white">
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="text-textMuted hover:text-white">
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-textMuted hover:text-red-400 p-2 ml-1 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>
              
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/5 bg-background/50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-textMuted">Итого:</span>
                    <span className="text-2xl font-bold text-white">{formatPrice(cartTotal)}</span>
                  </div>
                  <button 
                    onClick={() => {
                      if (window.Telegram && window.Telegram.WebApp) {
                        window.Telegram.WebApp.sendData(JSON.stringify({
                          action: "checkout",
                          cart: cart,
                          total: cartTotal
                        }));
                        window.Telegram.WebApp.close();
                      } else {
                        showToast("Заказ оформлен! (Тестовый режим)");
                        setCart([]);
                        setCartOpen(false);
                      }
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-4 rounded-xl transition-colors shadow-[0_0_20px_rgba(217,119,54,0.3)] flex items-center justify-center gap-2"
                  >
                    Оформить заказ в Telegram
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md border-b border-white/10 shadow-lg py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center gap-12">
              <div className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                  <span className="text-white text-lg">M</span>
                </div>
                <span>MOTO<span className="text-primary">PARTS</span></span>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center space-x-8">
                  {[
                    {name: 'Каталог', id: 'catalog'}, 
                    {name: 'Бренды', id: 'brands'}, 
                    {name: 'Гарантия', id: 'warranty'}, 
                    {name: 'Контакты', id: 'contacts'}
                  ].map((item) => (
                    <button 
                      key={item.id} 
                      onClick={() => scrollToSection(item.id)}
                      className="text-sm font-medium text-textMain hover:text-primary transition-colors cursor-pointer"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-5">
              <button className="text-textMain hover:text-primary transition-colors p-2 bg-surface/50 rounded-full backdrop-blur-sm border border-white/5 hidden sm:block">
                <Search className="w-5 h-5" />
              </button>
              <button className="text-textMain hover:text-primary transition-colors p-2 bg-surface/50 rounded-full backdrop-blur-sm border border-white/5 hidden sm:block">
                <User className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setCartOpen(true)}
                className="text-textMain hover:text-primary transition-colors p-2 bg-surface/50 rounded-full backdrop-blur-sm border border-white/5 relative group"
              >
                <ShoppingCart className="w-5 h-5" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-lg shadow-primary/30"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 1.5 }}
            src="/images/hero.jpg" 
            alt="Motorcycle" 
            className="w-full h-full object-cover object-right"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-semibold text-textMain uppercase tracking-wider">Обновление ассортимента 2026</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              Детали, создающие <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                превосходство
              </span>
            </h1>
            <p className="text-lg text-textMuted mb-10 max-w-xl leading-relaxed">
              Оригинальные мотозапчасти для тех, кто не признает компромиссов. Надежность, проверенная на треке и в долгих путешествиях.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={() => scrollToSection('catalog')}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(217,119,54,0.3)]"
              >
                Открыть каталог
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <Calculator />
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-24 bg-surface/30 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Каталог запчастей</h2>
              <p className="text-textMuted max-w-2xl text-lg">Широкий выбор оригинальных комплектующих и тюнинга от ведущих мировых брендов.</p>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-4 md:pb-0 hide-scrollbar w-full md:w-auto">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === category 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-surface border border-white/10 text-textMuted hover:text-white hover:border-white/30'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={product.id}
                  className="bg-surface border border-white/5 rounded-2xl overflow-hidden group flex flex-col hover:border-primary/30 transition-all hover:shadow-[0_10px_30px_-15px_rgba(217,119,54,0.3)]"
                >
                  <div className="aspect-[4/3] overflow-hidden relative bg-background/50">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                    <img 
                      src={product.image} 
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 z-20">
                      <span className="bg-background/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                        {product.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 z-20 bg-background/80 backdrop-blur-md px-2 py-1 rounded-md text-xs font-medium text-white flex items-center gap-1 border border-white/10">
                      <Star className="w-3 h-3 text-primary fill-primary" /> {product.rating}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow bg-surface">
                    <h3 className="text-lg font-medium text-white mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-textMuted mb-4 flex-grow">
                      Оригинальная деталь с гарантией от производителя.
                    </p>
                    
                    <div className="flex items-center gap-2 mb-6">
                      <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-xs text-textMuted">
                        {product.stock > 5 ? 'В наличии' : product.stock > 0 ? `Осталось: ${product.stock} шт.` : 'Под заказ'}
                      </span>
                    </div>

                    <div className="mt-auto flex items-end justify-between">
                      <div>
                        <span className="text-xs text-textMuted block mb-1">Цена</span>
                        <span className="text-2xl font-bold text-white">{formatPrice(product.price)}</span>
                      </div>
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-primary/10 hover:bg-primary text-primary hover:text-white w-12 h-12 rounded-xl flex items-center justify-center transition-all group/btn"
                      >
                        <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Brands Section */}
      <section id="brands" className="py-24 bg-background border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Наши партнеры</h2>
            <p className="text-textMuted max-w-2xl mx-auto text-lg">Мы работаем только с лучшими мировыми брендами, чтобы гарантировать безупречное качество каждой детали.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {BRANDS_DATA.map((brand, i) => (
              <motion.div 
                key={brand.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface border border-white/5 hover:border-primary/30 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 transition-all hover:-translate-y-1 group h-40"
              >
                <div className="h-16 w-16 flex items-center justify-center">
                  <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
                <span className="text-sm font-bold text-textMuted group-hover:text-white tracking-wider uppercase transition-colors">{brand.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Section */}
      <section id="warranty" className="py-24 bg-surface/30 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-white tracking-tight mb-6">Гарантия качества</h2>
              <p className="text-textMuted text-lg mb-8 leading-relaxed">
                Покупая запчасти в MOTOPARTS, вы можете быть уверены в их подлинности. Вся продукция сертифицирована и поставляется с официальной гарантией от производителя на срок от 1 до 5 лет.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 bg-primary/20 p-2 rounded-lg text-primary self-start">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">Возврат в течение 30 дней</h4>
                    <p className="text-textMuted">Если запчасть не подошла, вы можете вернуть ее без лишних вопросов, сохранив товарный вид и упаковку.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 bg-primary/20 p-2 rounded-lg text-primary self-start">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">Помощь с подбором</h4>
                    <p className="text-textMuted">Наши специалисты всегда готовы помочь проверить совместимость детали с вашим мотоциклом по VIN-номеру.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
              <img 
                src="/images/mechanic.jpg" 
                alt="Mechanic" 
                className="rounded-3xl border border-white/10 relative z-10 shadow-2xl object-cover h-[500px] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-24 bg-background border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Свяжитесь с нами</h2>
            <p className="text-textMuted max-w-2xl mx-auto text-lg">Готовы помочь с выбором и ответить на любые ваши вопросы.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface p-8 rounded-2xl border border-white/5 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="text-white font-bold text-xl mb-3">Наш офис</h4>
              <p className="text-textMuted">г. Москва, ул. Моторная, д. 42<br />Ежедневно с 10:00 до 20:00</p>
            </div>
            
            <div className="bg-surface p-8 rounded-2xl border border-white/5 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                <Phone className="w-6 h-6" />
              </div>
              <h4 className="text-white font-bold text-xl mb-3">Телефон</h4>
              <p className="text-textMuted mb-2">Отдел продаж:</p>
              <a href="tel:+78001234567" className="text-primary font-bold text-xl hover:underline">+7 (800) 123-45-67</a>
            </div>

            <div className="bg-surface p-8 rounded-2xl border border-white/5 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h4 className="text-white font-bold text-xl mb-3">Email</h4>
              <p className="text-textMuted mb-2">Для заказов и вопросов:</p>
              <a href="mailto:order@motoparts.ru" className="text-primary font-bold text-xl hover:underline">order@motoparts.ru</a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-surface border-t border-white/5 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <a href="#" onClick={(e) => {e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'})}} className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                  <span className="text-white text-lg">M</span>
                </div>
                <span>MOTO<span className="text-primary">PARTS</span></span>
              </a>
              <p className="text-textMuted max-w-sm mb-6">
                Премиальный магазин мотозапчастей. Мы помогаем мотоциклистам получать максимум от своей техники.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Навигация</h4>
              <ul className="space-y-4">
                <li><button onClick={() => scrollToSection('catalog')} className="text-textMuted hover:text-primary transition-colors">Каталог</button></li>
                <li><button onClick={() => scrollToSection('brands')} className="text-textMuted hover:text-primary transition-colors">Бренды</button></li>
                <li><button onClick={() => scrollToSection('warranty')} className="text-textMuted hover:text-primary transition-colors">Гарантия</button></li>
                <li><button onClick={() => scrollToSection('contacts')} className="text-textMuted hover:text-primary transition-colors">Контакты</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Информация</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-textMuted hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="text-textMuted hover:text-primary transition-colors">Доставка и оплата</a></li>
                <li><a href="#" className="text-textMuted hover:text-primary transition-colors">Возврат товара</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-textMuted text-sm">© 2026 MOTOPARTS. Все права защищены. Разработано для портфолио.</p>
            <div className="flex gap-4 text-sm text-textMuted">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Оферта</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
