import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ShieldCheck,
  Truck,
  Clock,
  MessageCircle,
  Heart,
  Dumbbell,
  Users,
  Sparkles,
  Leaf,
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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

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

/* ─── Data ─── */
const brandLogos = [
  {
    name: 'NOW Foods',
    url: 'https://www.nowfoods.com/cdn/shop/files/now-logo_200x.png?v=1614323231',
  },
  {
    name: 'Sambucol',
    url: 'https://sambucolusa.com/cdn/shop/files/Sambucol-Logo_200x.png?v=1614323231',
  },
  {
    name: 'Life Extension',
    url: 'https://www.lifeextension.com/cdn/shop/files/LE-Logo_200x.png?v=1614323231',
  },
  {
    name: "Doctor's Best",
    url: 'https://www.doctorsbest.com/cdn/shop/files/Dr_Best_Logo-01_200x.png?v=1717125120',
  },
];

const heroSlides = [
  {
    image: 'https://i.postimg.cc/JzDTK07q/i-(2).webp',
  },
  {
    image: 'https://i.postimg.cc/FFTD437q/a-AALHUqc-St4Elj-HQDIbe8g.webp',
  },
  {
    image: 'https://i.postimg.cc/j5m9Rfjw/0a4912fef5d3fdc74fba3b6e4b79d5bb.webp',
  },
  {
    image:
      'https://images.pexels.com/photos/7615570/pexels-photo-7615570.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80',
  },
  {
    image:
      'https://images.pexels.com/photos/3850747/pexels-photo-3850747.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80',
  },
  {
    image:
      'https://images.pexels.com/photos/7615571/pexels-photo-7615571.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80',
  },
];

/* ─── Header ─── */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#brands', label: 'Бренды' },
    { href: '#categories', label: 'Категории' },
    { href: '#quality', label: 'Качество' },
    { href: '#delivery', label: 'Доставка' },
    { href: '#contact', label: 'Контакты' },
  ];

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

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary ml-3 !py-2.5 !px-6 text-sm">
            Оставить заявку
          </a>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-neutral-700 hover:text-primary-600 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-neutral-100 shadow-lg">
          <nav className="section-container py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm font-medium text-neutral-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-2 text-sm"
            >
              Оставить заявку
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ─── Hero ─── */
function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length),
    []
  );

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % heroSlides.length),
    []
  );

  return (
    <section className="relative pt-24 sm:pt-28 pb-14 sm:pb-20 overflow-hidden min-h-[560px] sm:min-h-[640px] flex items-center">
      {/* Sliding backgrounds */}
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: current === i ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-neutral-950/70" />
        </div>
      ))}

      {/* Navigation arrows (hidden on mobile) */}
      <button
        onClick={prev}
        className="hidden sm:flex absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white/70 hover:bg-white/20 hover:text-white items-center justify-center transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="hidden sm:flex absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white/70 hover:bg-white/20 hover:text-white items-center justify-center transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      <div className="section-container relative z-10 w-full">
        <div className="max-w-2xl">
          <p className="text-sm sm:text-base font-semibold tracking-widest uppercase text-white/50 mb-5">
            Оригинальная продукция из США
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15] font-bold text-white leading-tight mb-5">
            NOW KZ - дистрибьютор ведущих мировых брендов БАДов в Казахстане
          </h1>

          <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-4 max-w-xl">
            Прямые поставки БАДов и спортивного питания от производителей. Для продавцов маркетплейсов, интернет-магазинов, аптек и торговых сетей.
          </p>

          <p className="text-sm text-white/40 mb-8">
            Только оригинальная продукция с сертификатами качества
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white text-neutral-900 font-semibold rounded-lg hover:bg-neutral-100 active:bg-neutral-200 transition-all duration-200 shadow-lg"
            >
              Оставить заявку
              <ArrowRight size={17} />
            </a>
            <a
              href="#brands"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200"
            >
              Наши бренды
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Why Choose Us ─── */
const advantages = [
  { icon: ShieldCheck, title: 'Гарантия 100% оригинальности' },
  { icon: Leaf, title: 'Популярные бренды: NOW, Sambucol, Life Extension, Doctor\'s Best' },
  { icon: CheckCircle2, title: 'Сертификаты качества и контроль поставок' },
  { icon: Truck, title: 'Быстрая доставка по Казахстану' },
  { icon: Clock, title: 'Актуальные сроки годности' },
  { icon: MessageCircle, title: 'Консультация по подбору витаминов' },
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

/* ─── Brands ─── */
const brands = [
  {
    name: 'NOW Foods',
    description:
      'Один из самых известных мировых производителей витаминов и добавок. Широкий ассортимент: омега-3, магний, витамин D3, коллаген, аминокислоты, спортивное питание и многое другое.',
    accent: 'from-primary-500 to-primary-700',
  },
  {
    name: 'Sambucol',
    description:
      'Известный бренд на основе черной бузины для поддержки иммунитета взрослых и детей. Особенно популярен в сезон простуд и вирусных нагрузок.',
    accent: 'from-accent-600 to-accent-800',
  },
  {
    name: 'Life Extension',
    description:
      'Премиальные формулы для поддержки долголетия, здоровья сердца, мозга, сосудов и общего качества жизни. Высокие стандарты исследований и состава.',
    accent: 'from-amber-500 to-amber-700',
  },
  {
    name: "Doctor's Best",
    description:
      'Научный подход и эффективные формулы для суставов, нервной системы, сна, энергии и восстановления организма.',
    accent: 'from-sky-500 to-sky-700',
  },
];

function Brands() {
  return (
    <section id="brands" className="py-14 sm:py-20 bg-neutral-50">
      <div className="section-container">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Бренды, которые мы поставляем
            </h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full" />
          </div>
        </AnimatedSection>

        {/* Marquee */}
        <AnimatedSection>
          <div className="overflow-hidden mb-12 relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-neutral-50 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-neutral-50 to-transparent z-10" />
            <div className="flex animate-marquee items-center gap-16 py-4">
              {[...brandLogos, ...brandLogos, ...brandLogos, ...brandLogos].map((brand, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center justify-center h-16 px-4"
                >
                  <img
                    src={brand.url}
                    alt={brand.name}
                    className="h-12 sm:h-14 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<span class="text-lg font-bold text-neutral-400 whitespace-nowrap">${brand.name}</span>`;
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Brand cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {brands.map((brand, i) => (
            <AnimatedSection key={i} delay={i * 80}>
              <div className="card h-full flex flex-col overflow-hidden">
                <div className={`h-2 rounded-t-xl bg-gradient-to-r ${brand.accent} -mt-6 -mx-6 sm:-mt-8 sm:-mx-8 mb-6`} />
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{brand.name}</h3>
                <p className="text-neutral-600 leading-relaxed flex-1">{brand.description}</p>
              </div>
            </AnimatedSection>
          ))}
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

/* ─── For Whom ─── */
const audiences = [
  { icon: Heart, text: 'Для тех, кто заботится о здоровье и энергии' },
  { icon: Dumbbell, text: 'Для спортсменов и активных людей' },
  { icon: Users, text: 'Для поддержки иммунитета всей семьи' },
  { icon: Sparkles, text: 'Для восстановления после нагрузок и стресса' },
  { icon: Leaf, text: 'Для поддержания красоты кожи, волос и ногтей' },
];

function ForWhom() {
  return (
    <section className="py-14 sm:py-20 bg-neutral-50">
      <div className="section-container">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Для кого наши БАДы?
            </h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full" />
          </div>
        </AnimatedSection>

        <div className="max-w-2xl mx-auto space-y-3">
          {audiences.map((item, i) => (
            <AnimatedSection key={i} delay={i * 60}>
              <div className="flex items-center gap-4 bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-md hover:border-primary-200 transition-all duration-300">
                <div className="w-11 h-11 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                  <item.icon size={22} />
                </div>
                <p className="text-neutral-700 font-medium">{item.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
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
      {/* Decorative elements */}
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
const deliverySteps = [
  {
    icon: MessageCircle,
    step: '01',
    title: 'Оставьте заявку',
    desc: 'Напишите нам или оставьте заявку на сайте — менеджер свяжется с вами для уточнения деталей.',
  },
  {
    icon: ShieldCheck,
    step: '02',
    title: 'Подберём продукцию',
    desc: 'Поможем выбрать витамины и БАДы под ваши цели, расскажем о составе и дозировках.',
  },
  {
    icon: Truck,
    step: '03',
    title: 'Доставим быстро',
    desc: 'Оперативная доставка в Алматы, Астану, Шымкент и другие города Казахстана.',
  },
  {
    icon: CheckCircle2,
    step: '04',
    title: 'Получите оригинал',
    desc: 'Все товары с сопроводительными документами, актуальными сроками годности и в надёжной упаковке.',
  },
];

function Delivery() {
  return (
    <section id="delivery" className="py-14 sm:py-20 bg-neutral-50">
      <div className="section-container">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Доставка по Казахстану
            </h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full mb-6" />
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Простой и удобный процесс от заявки до получения. Мы контролируем каждый этап.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {deliverySteps.map((item, i) => (
            <AnimatedSection key={i} delay={i * 80}>
              <div className="card relative h-full flex flex-col items-start">
                <span className="text-5xl font-black text-neutral-100 absolute top-4 right-4 leading-none select-none">
                  {item.step}
                </span>
                <div className="w-12 h-12 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center mb-4 relative">
                  <item.icon size={24} />
                </div>
                <h3 className="text-base font-semibold text-neutral-900 mb-2 relative">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed relative">{item.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ─── */
function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-neutral-200">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">Заявка отправлена!</h3>
                  <p className="text-neutral-600">
                    Наш менеджер свяжется с вами в ближайшее время.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">Оставьте заявку</h3>
                  <p className="text-neutral-500 text-sm mb-6">
                    Наш менеджер поможет подобрать подходящие витамины и ответит на все вопросы.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Ваше имя
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                        placeholder="Иван Иванов"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Телефон
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Сообщение
                      </label>
                      <textarea
                        id="message"
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors resize-none"
                        placeholder="Какие витамины вас интересуют?"
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full !py-3">
                      Отправить заявку
                      <ArrowRight size={18} />
                    </button>
                  </form>
                </>
              )}
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
            <a href="#brands" className="hover:text-white transition-colors">Бренды</a>
            <a href="#categories" className="hover:text-white transition-colors">Категории</a>
            <a href="#quality" className="hover:text-white transition-colors">Качество</a>
            <a href="#delivery" className="hover:text-white transition-colors">Доставка</a>
            <a href="#contact" className="hover:text-white transition-colors">Контакты</a>
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
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <WhyUs />
        <Brands />
        <Categories />
        <ForWhom />
        <Quality />
        <Delivery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
