import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  MessageCircle,
  MountainSnow,
  Package,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  X,
} from 'lucide-react';

const IMG_BASE = `${import.meta.env.BASE_URL}img/`;

const navLinks = [
  { label: 'Каталог', href: '#catalog' },
  { label: 'Преимущества', href: '#features' },
  { label: 'Как работаем', href: '#how' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакты', href: '#contacts' },
];

const socials = [
  { label: 'Авито Москва', href: 'https://www.avito.ru/brands/i184536091?src=sharing' },
  {
    label: 'Авито Новосибирск',
    href: 'https://www.avito.ru/user/1f5f6349b1b4e5e061c17ae33aae143c/profile?src=sharing',
  },
  { label: 'Telegram', href: 'https://t.me/bvbvbabab' },
  { label: 'WhatsApp', href: 'https://wa.me/79831289090' },
];

const products = [
  {
    title: '1 пара лыжных скрепок для гоночных лыж',
    tag: 'Хит продаж',
    description: 'Лучшие скрепки для лыж от той самой лыжной компании.',
    price: 249,
    oldPrice: 399,
    image: `${IMG_BASE}skrepki-main.jpg`,
    link: 'https://www.avito.ru/moskva/sport_i_otdyh/1_para_lyzhnyh_skrepok_dlya_gonochnyh_lyzh_4569176201',
  },
  {
    title: 'Производство лыжных термобаков',
    tag: 'Опт',
    description: 'Термобаки для лыж с вашим логотипом. Объем 1 литр.',
    price: 1290,
    oldPrice: 3999,
    image: `${IMG_BASE}termobak-main.jpg`,
    link: 'https://t.me/bvbvbabab',
  },
  {
    title: 'Темляк для лыжных палок',
    tag: 'Опт',
    description: 'Регулируемый неопреновый темляк для лыжных палок.',
    price: 390,
    oldPrice: 590,
    image: `${IMG_BASE}temlyak-main.jpg`,
    link: 'https://www.alibaba.com/product-detail/Trade-Assurance-Wholesale-High-Quality-Ski_60775697864.html',
  },
];

const features = [
  {
    title: 'Проверенный ассортимент',
    text: 'Реальные позиции, которые продаются и доступны в сезон.',
    icon: ShoppingBag,
  },
  {
    title: 'Оптовые условия',
    text: 'Работаем с клубами, школами и магазинами на спецусловиях.',
    icon: Package,
  },
  {
    title: 'Отгрузка по РФ',
    text: 'Отправляем по всей России через транспортные компании.',
    icon: Truck,
  },
  {
    title: 'Честное качество',
    text: 'Только проверенные поставки и контроль перед отправкой.',
    icon: ShieldCheck,
  },
];

const stats = [
  { value: 3, suffix: '+', label: 'ключевые товарные позиции' },
  { value: 24, suffix: 'ч', label: 'средняя отгрузка со склада' },
  { value: 4, suffix: '', label: 'основных канала связи' },
];

const howSteps = [
  {
    title: 'Оставляете заявку',
    text: 'Пишите в Telegram, WhatsApp или на Авито, что вам нужно.',
    icon: MessageCircle,
  },
  {
    title: 'Согласовываем детали',
    text: 'Подбираем позицию, объем, цену и формат доставки.',
    icon: Sparkles,
  },
  {
    title: 'Получаете товар',
    text: 'Упаковываем и отправляем заказ с сопровождением.',
    icon: Check,
  },
];

const faqs = [
  {
    q: 'Есть ли оптовые условия?',
    a: 'Да. Для оптовых покупателей действуют специальные условия и персональный расчет.',
  },
  {
    q: 'Можно сделать партию с логотипом?',
    a: 'Да. Делаем кастомные партии (например, термобаки) с вашим брендингом.',
  },
  {
    q: 'Куда доставляете?',
    a: 'Доставка по всей России транспортными компаниями.',
  },
  {
    q: 'Как быстро ответите?',
    a: 'Обычно отвечаем в день обращения в Telegram или WhatsApp.',
  },
];

function useRevealOnScroll() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (el, idx) => {
    refs.current[idx] = el;
  };
}

function Counter({ value, suffix, start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const duration = 2000;
    const frames = 60;
    const total = Math.round((duration / 1000) * frames);
    let frame = 0;

    const timer = setInterval(() => {
      frame += 1;
      const progress = Math.min(frame / total, 1);
      const next = Math.round(value * progress);
      setCount(next);
      if (progress >= 1) clearInterval(timer);
    }, 1000 / frames);

    return () => clearInterval(timer);
  }, [start, value]);

  return (
    <div className="text-4xl font-black text-white sm:text-5xl">
      {count}
      {suffix}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef(null);
  const setRevealRef = useRevealOnScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsStarted(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#08080f] text-slate-100" style={{ scrollBehavior: 'smooth' }}>
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatBlob {
          0%,100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-24px) scale(1.06); }
        }
        .hero-fade { opacity: 0; animation: fadeInUp .85s ease forwards; }
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity .7s ease, transform .7s ease; }
        .reveal.is-visible { opacity: 1; transform: translateY(0); }
      `}</style>

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" style={{ animation: 'floatBlob 8s ease-in-out infinite' }} />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" style={{ animation: 'floatBlob 10s ease-in-out infinite' }} />
      </div>

      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-white/10 bg-slate-900/70 backdrop-blur-xl' : 'bg-transparent'}`}>
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <img src={`${IMG_BASE}logo.png`} alt="BVB" className="h-9 w-9 rounded-lg object-cover" />
            <div>
              <p className="text-sm font-semibold">BVB</p>
              <p className="text-xs text-slate-400">Официальная страница магазина</p>
            </div>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="text-sm text-slate-300 transition hover:text-white">
                {item.label}
              </a>
            ))}
          </div>

          <a href="https://t.me/bvbvbabab" target="_blank" rel="noreferrer" className="hidden h-11 items-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 text-sm font-semibold text-slate-950 transition hover:scale-105 hover:shadow-[0_0_28px_rgba(56,189,248,0.45)] lg:inline-flex">
            Связаться
          </a>

          <button className="grid h-11 w-11 place-content-center rounded-xl border border-white/10 bg-white/5 lg:hidden" onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        <div className={`overflow-hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${menuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="space-y-2 px-4 py-4">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-3 text-sm text-slate-200 hover:bg-white/10">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pt-40">
          <p className="hero-fade mb-4 inline-flex rounded-full border border-cyan-200/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-cyan-200" style={{ animationDelay: '120ms' }}>
            Лыжная атрибутика BVB
          </p>
          <h1 className="hero-fade text-4xl font-black leading-tight sm:text-6xl lg:text-7xl" style={{ animationDelay: '220ms' }}>
            Лучшие товары
            <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              по честным ценам
            </span>
          </h1>
          <p className="hero-fade mt-6 max-w-3xl text-slate-300 sm:text-lg" style={{ animationDelay: '320ms' }}>
            Мы тщательно отбираем ассортимент и отправляем заказы по всей стране. Для оптовых покупателей предусмотрены специальные условия.
          </p>

          <div className="hero-fade mt-8 flex flex-wrap gap-3" style={{ animationDelay: '420ms' }}>
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="h-11 rounded-full border border-white/20 bg-white/5 px-5 text-sm font-medium leading-[44px] text-white transition hover:scale-105 hover:shadow-[0_0_24px_rgba(148,163,184,0.3)]">
                {social.label}
              </a>
            ))}
          </div>
        </section>

        <section id="catalog" ref={(el) => setRevealRef(el, 0)} className="reveal mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">Актуальный каталог</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, idx) => (
              <article key={product.title} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-cyan-300/40 hover:shadow-[0_0_28px_rgba(34,211,238,0.2)]" style={{ transitionDelay: `${idx * 80}ms` }}>
                <img src={product.image} alt={product.title} className="h-64 w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{product.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{product.description}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="rounded-full border border-cyan-300/40 bg-cyan-400/10 px-2 py-1 text-xs text-cyan-200">{product.tag}</span>
                    <span className="text-sm text-slate-400 line-through">{product.oldPrice} ₽</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold">{product.price} ₽</p>
                  <a href={product.link} target="_blank" rel="noreferrer" className="mt-4 inline-flex h-11 items-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 text-sm font-semibold text-slate-950 transition hover:scale-105 hover:shadow-[0_0_28px_rgba(56,189,248,0.45)]">
                    Подробнее <ArrowRight size={16} className="ml-2" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="features" ref={(el) => setRevealRef(el, 1)} className="reveal mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">Почему выбирают BVB</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((item, idx) => (
              <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-cyan-300/40 hover:shadow-[0_0_24px_rgba(34,211,238,0.2)]" style={{ transitionDelay: `${idx * 80}ms` }}>
                <item.icon size={20} className="text-cyan-300" />
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section ref={(el) => { statsRef.current = el; setRevealRef(el, 2); }} className="reveal mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6 sm:p-8">
            <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
            <div className="grid gap-8 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label}>
                  <Counter value={item.value} suffix={item.suffix} start={statsStarted} />
                  <p className="mt-2 text-sm text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how" ref={(el) => setRevealRef(el, 3)} className="reveal mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">Как это работает</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {howSteps.map((step, idx) => (
              <article key={step.title} className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                {idx < howSteps.length - 1 && <span className="absolute -right-5 top-1/2 hidden h-px w-10 bg-gradient-to-r from-cyan-300 to-blue-500 lg:block" />}
                <span className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-xs font-bold text-slate-950">
                  {idx + 1}
                </span>
                <step.icon size={20} className="mb-3 text-cyan-300" />
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" ref={(el) => setRevealRef(el, 4)} className="reveal mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">FAQ</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqs.map((item, idx) => {
              const opened = openFaq === idx;
              return (
                <article key={item.q} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <button onClick={() => setOpenFaq(opened ? -1 : idx)} className="flex min-h-[52px] w-full items-center justify-between gap-3 text-left">
                    <span className="font-medium">{item.q}</span>
                    <ChevronDown size={18} className={`transition-transform ${opened ? 'rotate-180' : ''}`} />
                  </button>
                  <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: opened ? '120px' : '0px', opacity: opened ? 1 : 0 }}>
                    <p className="pt-2 text-sm text-slate-300">{item.a}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="contacts" ref={(el) => setRevealRef(el, 5)} className="reveal mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 p-8 sm:p-10">
            <h3 className="text-3xl font-bold text-slate-950 sm:text-4xl">Нужен прайс и условия для опта?</h3>
            <p className="mt-3 max-w-2xl text-slate-900/90">Напишите в Telegram или WhatsApp, отправим актуальные цены и поможем собрать заказ под вашу задачу.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://t.me/bvbvbabab" target="_blank" rel="noreferrer" className="h-11 rounded-full bg-slate-950 px-6 text-sm font-semibold leading-[44px] text-white transition hover:scale-105">Telegram</a>
              <a href="https://wa.me/79831289090" target="_blank" rel="noreferrer" className="h-11 rounded-full border border-slate-900/25 bg-white/90 px-6 text-sm font-semibold leading-[44px] text-slate-900 transition hover:scale-105">WhatsApp</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <MountainSnow size={20} className="text-cyan-300" />
              <span className="font-semibold">BVB</span>
            </div>
            <p className="mt-3 max-w-md text-sm text-slate-400">Продажа лыжной атрибутики: розница и опт, реальные позиции и быстрый контакт без лишней бюрократии.</p>
          </div>
          <div>
            <p className="font-semibold">Ссылки</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              {navLinks.map((item) => (
                <li key={item.href}><a href={item.href} className="hover:text-white">{item.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold">Контакты</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><a href="https://t.me/bvbvbabab" target="_blank" rel="noreferrer" className="hover:text-white">Telegram</a></li>
              <li><a href="https://wa.me/79831289090" target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp</a></li>
              <li><a href="https://www.avito.ru/brands/i184536091?src=sharing" target="_blank" rel="noreferrer" className="hover:text-white">Авито Москва</a></li>
              <li><a href="https://www.avito.ru/user/1f5f6349b1b4e5e061c17ae33aae143c/profile?src=sharing" target="_blank" rel="noreferrer" className="hover:text-white">Авито Новосибирск</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500 sm:text-sm">© {new Date().getFullYear()} BVB. Все права защищены.</div>
      </footer>
    </div>
  );
}
