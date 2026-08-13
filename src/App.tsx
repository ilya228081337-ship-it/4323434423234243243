import { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Truck,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  Award,
  FlaskConical,
  FileCheck,
  ShoppingCart,
  Globe,
  Pill,
  Dumbbell,
  Package,
  Store,
  TrendingUp,
  Tag,
  SlidersHorizontal,
  Sparkles,
  Warehouse,
  Users,
  LifeBuoy,
  Route,
  ClipboardCheck,
  Plane,
  Ship,
} from 'lucide-react';

/* ─── Hooks & shared UI ─── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Modal (Получить условия) ─── */
function ConditionsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
      document.body.style.overflow = 'hidden';
    } else if (mounted) {
      setClosing(true);
      const t = setTimeout(() => {
        setMounted(false);
        setClosing(false);
        setSubmitted(false);
        setFormData({ name: '', phone: '', message: '' });
      }, 250);
      return () => clearTimeout(t);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, mounted]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const startClose = () => {
    if (submitted) {
      setSubmitted(false);
      setFormData({ name: '', phone: '', message: '' });
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={startClose}
    >
      <div
        className={`absolute inset-0 bg-neutral-950/60 backdrop-blur-sm ${
          closing ? 'modal-overlay-out' : 'modal-overlay-in'
        }`}
      />
      <div
        className={`relative bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-neutral-200 w-full max-w-md ${
          closing ? 'modal-panel-out' : 'modal-panel-in'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={startClose}
          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
          aria-label="Закрыть"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center mx-auto mb-4 check-pop">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">Заявка отправлена!</h3>
            <p className="text-neutral-600">
              Наш менеджер свяжется с вами в ближайшее время.
            </p>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">Получить условия</h3>
            <p className="text-neutral-500 text-sm mb-6">
              Оставьте контакты — менеджер пришлёт прайс и условия сотрудничества.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="modal-name" className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Ваше имя
                </label>
                <input
                  id="modal-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200"
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <label htmlFor="modal-phone" className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Телефон
                </label>
                <input
                  id="modal-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
              <div>
                <label htmlFor="modal-message" className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Сообщение
                </label>
                <textarea
                  id="modal-message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200 resize-none"
                  placeholder="Какие бренды и позиции интересуют?"
                />
              </div>
              <button type="submit" className="btn-primary w-full !py-3">
                Получить условия
                <ArrowRight size={18} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Header ─── */
function Header({ onGetConditions }: { onGetConditions: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#brands', label: 'О бренде' },
    { href: '#categories', label: 'Категории' },
    { href: '#exclusive', label: 'Партнёры' },
    { href: '#business', label: 'Бизнесу' },
    { href: '#quality', label: 'Качество' },
    { href: '#delivery', label: 'Доставка' },
  ];

  const handleNavClick = () => setMobileOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        scrolled ? 'shadow-sm border-b border-neutral-100' : ''
      }`}
    >
      <div className="section-container flex items-center justify-between h-16 sm:h-20">
        <a href="#" className="flex items-center gap-3 shrink-0">
          <img
            src="https://i.postimg.cc/pdsXwN9D/a-bold-geometric-wordmark-with-now-in-he-j-Hs-Tax-JOVy-CWrn-Fm-Ixbkhw-8Po-ZMBHSj-WAXb-Ucw8Aa-XA-cove.png"
            alt="NOW KZ"
            className="h-12 sm:h-16 w-auto object-contain"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={onGetConditions}
            className="btn-primary ml-3 !py-2.5 !px-6 text-sm"
          >
            Получить условия
          </button>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-neutral-700 hover:text-primary-600 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-100 shadow-lg">
          <nav className="section-container py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={handleNavClick}
                className="px-4 py-3 text-sm font-medium text-neutral-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                onGetConditions();
              }}
              className="btn-primary mt-2 text-sm"
            >
              Получить условия
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ─── Hero ─── */
const heroImage =
  'https://images.pexels.com/photos/7615570/pexels-photo-7615570.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80';

const heroBullets = [
  { icon: Tag, text: 'Контроль РРЦ' },
  { icon: TrendingUp, text: 'Высокая маржинальность' },
  { icon: Truck, text: 'Прямые поставки' },
  { icon: SlidersHorizontal, text: 'Гибкие условия' },
  { icon: Award, text: 'Официальный дистрибьютор' },
];

function Hero({ onGetConditions }: { onGetConditions: () => void }) {
  return (
    <section className="relative pt-24 sm:pt-28 pb-14 sm:pb-20 overflow-hidden min-h-[560px] sm:min-h-[680px] flex items-center">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="NOW KZ — дистрибьютор БАДов"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-neutral-950/70 to-neutral-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="max-w-2xl">
          <p
            className="text-sm sm:text-base font-semibold tracking-widest uppercase text-primary-300 mb-5 hero-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            Витамины и БАДы оптом для Бизнеса
          </p>

          <h1
            className="text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15] font-bold text-white leading-tight mb-7 hero-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            NOW KZ — ваш надежный поставщик высококачественных витаминов и пищевых добавок из США.
          </h1>

          <div className="flex flex-wrap gap-3 mb-8">
            {heroBullets.map((b, i) => (
              <div
                key={i}
                className="hero-bullet flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15"
                style={{ animationDelay: `${0.35 + i * 0.08}s` }}
              >
                <div className="w-8 h-8 rounded-lg bg-primary-500/20 text-primary-300 flex items-center justify-center shrink-0">
                  <b.icon size={18} />
                </div>
                <span className="text-sm sm:text-base font-semibold text-white">{b.text}</span>
              </div>
            ))}
          </div>

          <div className="hero-fade-up" style={{ animationDelay: '0.5s' }}>
            <button
              onClick={onGetConditions}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-neutral-900 font-semibold rounded-xl hover:bg-primary-50 active:bg-primary-100 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              Получить условия
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Why Choose Us ─── */
const advantages = [
  { icon: ShieldCheck, title: 'Гарантия 100% оригинальности' },
  { icon: Route, title: 'Выстроенная логистика' },
  { icon: FileCheck, title: 'Полный пакет сопроводительных документов' },
  { icon: Warehouse, title: 'Собственные склады в Казахстане' },
  { icon: Users, title: 'Гибкий подход к каждому партнеру' },
  { icon: LifeBuoy, title: 'Поддержка партнеров на всех этапах' },
];

function WhyUs() {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="section-container">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Почему выбирают нас?
            </h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 [grid-auto-rows:1fr]">
          {advantages.map((item, i) => (
            <AnimatedSection key={i} delay={i * 60} className="h-full">
              <div className="card group h-full flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  <item.icon size={24} />
                </div>
                <h3 className="text-base font-semibold text-neutral-900">{item.title}</h3>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About NOW Foods ─── */
const nowPhotos = [
  'https://images.pexels.com/photos/7722648/pexels-photo-7722648.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/17604755/pexels-photo-17604755.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/15897781/pexels-photo-15897781.jpeg?auto=compress&cs=tinysrgb&w=800',
];

function AboutNow({ onGetConditions }: { onGetConditions: () => void }) {
  return (
    <section id="brands" className="py-14 sm:py-20 bg-neutral-50">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <AnimatedSection>
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
                Поставляем продукцию NOW Foods
              </h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p className="text-lg">
                  NOW Foods — один из ведущих американских производителей витаминов, минералов и
                  пищевых добавок с более чем 50-летней историей.
                </p>
                <p>
                  Мы осуществляем прямые поставки продукции NOW с завода-производителя по предзаказу.
                </p>
                <p>
                  Популярные позиции NOW постоянно поддерживаются в наличии на складе в Алматы,
                  что позволяет оперативно отгружать заказы нашим партнерам.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {['Оригинальная продукция', 'Прямые поставки с завода NOW', 'Собственные склады в Казахстане'].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-medium"
                  >
                    <CheckCircle2 size={15} />
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={onGetConditions}
                className="btn-primary mt-8"
              >
                Получить условия
                <ArrowRight size={18} />
              </button>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                  src={nowPhotos[0]}
                  alt="Продукция NOW Foods"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                  src={nowPhotos[1]}
                  alt="Витамины NOW Foods"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="col-span-2 aspect-[2/1] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                  src={nowPhotos[2]}
                  alt="Добавки NOW Foods"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ─── Categories ─── */
const categories = [
  { label: 'Витамин D3 и K2', icon: 'D3' },
  { label: 'Магний и цинк', icon: 'Mg' },
  { label: 'Омега-3', icon: 'Ω3' },
  { label: 'Коллаген', icon: 'C+' },
  { label: 'Витамины для иммунитета', icon: 'ИМ' },
  { label: 'БАДы для суставов', icon: 'СУ' },
  { label: 'Комплексы для сна', icon: 'СН' },
  { label: 'Антиоксиданты и энергия', icon: 'AE' },
];

function Categories() {
  return (
    <section id="categories" className="py-14 sm:py-20 bg-white">
      <div className="section-container">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Популярные категории
            </h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <AnimatedSection key={i} delay={i * 50}>
              <div className="card text-center group cursor-default">
                <div className="w-14 h-14 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-3 text-lg font-bold group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  {cat.icon}
                </div>
                <h3 className="text-sm font-semibold text-neutral-800">{cat.label}</h3>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Exclusive Brands ─── */
const exclusiveBrands = [
  {
    name: 'Swanson',
    logo: 'https://cdn.brandfetch.io/id2iC5Xjma/w/400/h/157/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1781761355302',
    photo: 'https://images.pexels.com/photos/13013778/pexels-photo-13013778.jpeg?auto=compress&cs=tinysrgb&w=600',
    bg: 'bg-orange-50',
    facts: [
      'Американский бренд витаминов и добавок с 1969 года',
      'Более 2 000 наименований в ассортименте',
      'Популярные позиции: омега-3, куркумин, цинк',
    ],
  },
  {
    name: 'VPLab',
    logo: 'https://cdn.brandfetch.io/idCZIY-jM-/w/400/h/145/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1777450057436',
    photo: 'https://images.pexels.com/photos/12625114/pexels-photo-12625114.jpeg?auto=compress&cs=tinysrgb&w=600',
    bg: 'bg-rose-50',
    facts: [
      'Спортивное питание премиум-класса',
      'Высокое содержание белка и аминокислот',
      'Популярные позиции: протеины, BCAA, креатин',
    ],
  },
  {
    name: 'OstroVit',
    logo: '',
    photo: 'https://images.pexels.com/photos/17820735/pexels-photo-17820735.jpeg?auto=compress&cs=tinysrgb&w=600',
    bg: 'bg-blue-50',
    facts: [
      'Европейский производитель спортивного питания и добавок',
      'Отличное соотношение цены и качества',
      'Популярные позиции: протеин, креатин, BCAA',
    ],
  },
  {
    name: 'Solaray',
    logo: 'https://cdn.brandfetch.io/idLO7k4hma/w/400/h/200/theme/light/logo.png?c=1bxid64Mup7aczewSAYMX&t=1781717176418',
    photo: 'https://images.pexels.com/photos/12349439/pexels-photo-12349439.jpeg?auto=compress&cs=tinysrgb&w=600',
    bg: 'bg-emerald-50',
    facts: [
      'Бренд травяных и витаминных комплексов с 1973 года',
      'Инновационные формулы и высокое качество сырья',
      'Популярные позиции: магний, витамин D3, травяные комплексы',
    ],
  },
  {
    name: 'Life Extension',
    logo: '',
    photo: 'https://images.pexels.com/photos/17604755/pexels-photo-17604755.jpeg?auto=compress&cs=tinysrgb&w=600',
    bg: 'bg-slate-50',
    facts: [
      'Премиальные формулы для долголетия и здоровья',
      'Научно обоснованные составы ингредиентов',
      'Популярные позиции: омега-3, магний, NAC',
    ],
  },
];

function ExclusiveBrands({ onGetConditions }: { onGetConditions: () => void }) {
  return (
    <section id="exclusive" className="py-14 sm:py-20 bg-neutral-50">
      <div className="section-container">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Поставляем продукцию ведущих производителей на эксклюзивных условиях
            </h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full mb-6" />
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              NOW KZ является эксклюзивным дистрибьютором на территории Казахстана
              производителей: Swanson, VPLab, OstroVit, Solaray, Life Extension.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 [grid-auto-rows:1fr]">
          {exclusiveBrands.map((brand, i) => (
            <AnimatedSection key={i} delay={i * 80} className="h-full">
              <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
                {/* Logo / photo area */}
                <div className={`relative h-44 ${brand.bg} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <img
                      src={brand.photo}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10 flex items-center justify-center h-full px-6">
                    {brand.logo ? (
                      <img
                        src={brand.logo}
                        alt={`${brand.name} — логотип`}
                        className="max-h-24 max-w-[80%] w-auto object-contain"
                      />
                    ) : (
                      <span className="text-3xl font-black text-neutral-800 tracking-tight text-center">
                        {brand.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Facts */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-neutral-900 mb-3">{brand.name}</h3>
                  <ul className="space-y-2.5 flex-1">
                    {brand.facts.map((fact, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-neutral-600">
                        <CheckCircle2 size={16} className="text-primary-500 shrink-0 mt-0.5" />
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={200}>
          <div className="text-center mt-10">
            <button onClick={onGetConditions} className="btn-primary">
              Получить условия
              <ArrowRight size={18} />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── For Business ─── */
const businessSegments = [
  {
    icon: ShoppingCart,
    title: 'Для продавцов на маркетплейсах',
    desc: 'Востребованные бренды и популярные позиции для продавцов на Kaspi, Wildberries, Ozon и других площадках.',
  },
  {
    icon: Globe,
    title: 'Для интернет-магазинов',
    desc: 'Широкий ассортимент витаминов, БАДов и спортивного питания для развития собственного онлайн-магазина.',
  },
  {
    icon: Pill,
    title: 'Для аптек и аптечных сетей',
    desc: 'Оригинальная продукция известных мировых брендов с официальными поставками и стабильным ассортиментом.',
  },
  {
    icon: Dumbbell,
    title: 'Для магазинов спортивного питания и витаминов',
    desc: 'Популярные позиции NOW, Swanson, Life Extension, OstroVit, VPLab, Solaray и других производителей.',
  },
  {
    icon: Package,
    title: 'Для оптовых компаний и дистрибьюторов',
    desc: 'Специальные условия для региональных партнеров, торговых компаний и оптовых покупателей.',
  },
  {
    icon: Store,
    title: 'Для розничных магазинов',
    desc: 'Готовый ассортимент востребованных товаров для здоровья, красоты, спорта и активного образа жизни.',
  },
];

function ForBusiness({ onGetConditions }: { onGetConditions: () => void }) {
  return (
    <section id="business" className="py-14 sm:py-20 bg-white">
      <div className="section-container">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Надёжный поставщик для вашего бизнеса
            </h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {businessSegments.map((item, i) => (
            <AnimatedSection key={i} delay={i * 60} className="h-full">
              <div className="card group h-full flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  <item.icon size={24} />
                </div>
                <h3 className="text-base font-bold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed flex-1">{item.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={200}>
          <div className="text-center mt-10">
            <button onClick={onGetConditions} className="btn-primary">
              Получить условия
              <ArrowRight size={18} />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── Quality ─── */
const qualityFeatures = [
  {
    icon: ShieldCheck,
    title: 'Сертифицированная продукция',
    desc: 'Все товары имеют сертификаты качества и соответствуют международным стандартам',
  },
  {
    icon: FlaskConical,
    title: 'Лабораторный контроль',
    desc: 'Каждая партия проходит тщательную проверку в аккредитованных лабораториях',
  },
  {
    icon: FileCheck,
    title: 'Полная документация',
    desc: 'Предоставляем все необходимые сопроводительные документы и сертификаты',
  },
  {
    icon: Award,
    title: 'Проверенные поставщики',
    desc: 'Работаем только с официальными дистрибьюторами и проверенными каналами поставок',
  },
];

function Quality() {
  return (
    <section id="quality" className="py-14 sm:py-20 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-700/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-600/10 rounded-full blur-3xl" />

      <div className="section-container relative">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-6 border border-white/20">
              <ShieldCheck size={32} className="text-primary-200" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Гарантия качества
            </h2>
            <div className="w-16 h-1 bg-primary-400 mx-auto rounded-full mb-6" />
            <p className="text-lg text-primary-200 max-w-2xl mx-auto leading-relaxed">
              Мы понимаем, насколько важно получать безопасную и оригинальную продукцию. Поэтому
              работаем только с проверенными поставщиками и тщательно контролируем качество каждой
              партии товара.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {qualityFeatures.map((item, i) => (
            <AnimatedSection key={i} delay={i * 80}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/15 p-6 hover:bg-white/15 transition-all duration-300 text-center h-full">
                <div className="w-12 h-12 rounded-lg bg-white/15 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-primary-200" />
                </div>
                <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-primary-200 leading-relaxed">{item.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Delivery ─── */
const logisticsFeatures = [
  {
    icon: Globe,
    title: 'Надежная международная логистика',
    desc: 'Сотрудничаем с ведущими логистическими операторами для доставки из США и Европы',
  },
  {
    icon: ClipboardCheck,
    title: 'Помощь с растаможкой',
    desc: 'Берем на себя таможенное оформление и подготовку всех необходимых документов',
  },
  {
    icon: Package,
    title: 'Полное сопровождение поставки',
    desc: 'Контроль на каждом этапе — от консолидации груза до получения товара',
  },
  {
    icon: Truck,
    title: 'Доставка по Казахстану',
    desc: 'Отгружаем заказы с локальных складов по всей территории Казахстана',
  },
];

function Delivery() {
  return (
    <section id="delivery" className="py-14 sm:py-20 bg-neutral-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl" />
      <div className="section-container relative">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Логистика и доставка
            </h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full mb-6" />
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Мы сотрудничаем с ведущими международными логистическими операторами, обеспечивая
              надежную и оперативную доставку товаров из США и Европы в Казахстан.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <AnimatedSection>
            <div className="space-y-5 text-neutral-600 leading-relaxed">
              <p className="text-base sm:text-lg">
                Отлаженная логистика обеспечивает надежную доставку — от консолидации груза до
                таможенного оформления и получения товара.
              </p>
              <p className="text-base sm:text-lg">
                Мы также осуществляем доставку по всей территории Казахстана с локальных складов.
              </p>

              {/* Animated route visualization */}
              <div className="relative mt-10 rounded-2xl bg-gradient-to-b from-sky-50 to-blue-50 border border-sky-100 overflow-hidden p-6 h-64 sm:h-72">
                {/* Clouds decoration */}
                <div className="absolute top-4 left-8 w-12 h-6 bg-white/40 rounded-full blur-sm" />
                <div className="absolute top-12 right-16 w-16 h-7 bg-white/30 rounded-full blur-sm" />
                <div className="absolute bottom-20 left-20 w-10 h-5 bg-white/35 rounded-full blur-sm" />

                {/* Route line */}
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-sky-300 via-primary-400 to-primary-600" />

                {/* Start point: USA */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 rounded-xl bg-white border-2 border-sky-200 flex items-center justify-center shadow-sm">
                    <Plane size={22} className="text-sky-600" />
                  </div>
                  <span className="text-xs font-bold text-sky-800 bg-white/80 px-2 py-0.5 rounded-md">США</span>
                </div>

                {/* Flying plane animation */}
                <div className="fly-plane absolute top-[28%] left-[14%] text-primary-500">
                  <Plane size={28} className="rotate-45" fill="currentColor" />
                </div>

                {/* Mid point: ocean */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 rounded-xl bg-white border-2 border-blue-200 flex items-center justify-center shadow-sm">
                    <Ship size={22} className="text-blue-600" />
                  </div>
                  <span className="text-xs font-bold text-blue-800 bg-white/80 px-2 py-0.5 rounded-md">Транзит</span>
                </div>

                {/* Sailing ship animation */}
                <div className="sail-ship absolute bottom-[18%] left-[35%] text-primary-600">
                  <Ship size={26} fill="currentColor" />
                </div>

                {/* End point: Kazakhstan */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 rounded-xl bg-white border-2 border-primary-200 flex items-center justify-center shadow-sm">
                    <MapPin size={22} className="text-primary-600" />
                  </div>
                  <span className="text-xs font-bold text-primary-800 bg-white/80 px-2 py-0.5 rounded-md">Казахстан</span>
                </div>

                {/* Wave decorations at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-8 flex items-end justify-around opacity-20">
                  <div className="w-8 h-3 bg-blue-300 rounded-full" />
                  <div className="w-10 h-4 bg-blue-300 rounded-full" />
                  <div className="w-8 h-3 bg-blue-300 rounded-full" />
                  <div className="w-10 h-4 bg-blue-300 rounded-full" />
                  <div className="w-8 h-3 bg-blue-300 rounded-full" />
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {logisticsFeatures.map((item, i) => (
                <div key={i} className="card group flex flex-col">
                  <div className="w-12 h-12 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-sm font-bold text-neutral-900 mb-1.5">{item.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ─── */
function Contact({ onGetConditions }: { onGetConditions: () => void }) {
  return (
    <section id="contact" className="py-14 sm:py-20 bg-neutral-50 relative overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <AnimatedSection>
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
                Заботьтесь о здоровье с качественными витаминами
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                Выбирайте проверенные мировые бренды и поддерживайте организм каждый день с
                эффективными витаминами и БАДами.
              </p>
              <div className="space-y-4 text-neutral-600">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <span>Консультация по подбору витаминов</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <span>Ответим на все вопросы</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <span>Доставка по всему Казахстану</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-neutral-200 text-center">
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Получить условия сотрудничества</h3>
              <p className="text-neutral-500 text-sm mb-6">
                Оставьте заявку — менеджер пришлёт прайс-лист и расскажет об условиях работы.
              </p>
              <button onClick={onGetConditions} className="btn-primary w-full !py-3">
                Получить условия
                <ArrowRight size={18} />
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-10">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <a href="#brands" className="hover:text-white transition-colors">О бренде</a>
            <a href="#categories" className="hover:text-white transition-colors">Категории</a>
            <a href="#exclusive" className="hover:text-white transition-colors">Партнёры</a>
            <a href="#business" className="hover:text-white transition-colors">Бизнесу</a>
            <a href="#quality" className="hover:text-white transition-colors">Качество</a>
            <a href="#delivery" className="hover:text-white transition-colors">Доставка</a>
          </nav>
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} NOW KZ
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── App ─── */
function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="min-h-screen">
      <ConditionsModal open={modalOpen} onClose={closeModal} />
      <Header onGetConditions={openModal} />
      <main>
        <Hero onGetConditions={openModal} />
        <WhyUs />
        <AboutNow onGetConditions={openModal} />
        <Categories />
        <ExclusiveBrands onGetConditions={openModal} />
        <ForBusiness onGetConditions={openModal} />
        <Quality />
        <Delivery />
        <Contact onGetConditions={openModal} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
