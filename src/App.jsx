import { useState } from 'react'
import {
  Building2, Home, BookOpen, User, Menu, X, ArrowRight,
  MapPin, CheckCircle, Clock, Star, Users, TrendingUp,
  Plus, Trash2, Shield, ChevronRight, Phone, Mail, Instagram,
  Award, Target, Layers, LogIn, LogOut, Eye, Lock
} from 'lucide-react'

// ─── Моковые данные ──────────────────────────────────────────────────────────

const MOCK_PROPERTIES = [
  {
    id: 1,
    title: 'Коттедж в Подмосковье',
    address: 'Московская обл., Одинцовский р-н',
    price: 12500000,
    status: 'ready',
    area: 180,
    rooms: 4,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
    author: 'admin',
    authorName: 'Администратор',
    description: 'Двухэтажный коттедж с отделкой под ключ, панорамные окна, участок 12 соток.',
  },
  {
    id: 2,
    title: 'Таунхаус у леса',
    address: 'Ленинградская обл., Всеволожский р-н',
    price: 8900000,
    status: 'foundation',
    area: 130,
    rooms: 3,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',
    author: 'student',
    authorName: 'Алексей Морозов',
    description: 'Современный таунхаус на этапе котлована. Сдача — Q2 2025.',
  },
  {
    id: 3,
    title: 'Дом в Сочи',
    address: 'Краснодарский край, Адлерский р-н',
    price: 22000000,
    status: 'ready',
    area: 240,
    rooms: 5,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
    author: 'admin',
    authorName: 'Администратор',
    description: 'Вилла с видом на море, бассейн, ландшафтный дизайн. Готов к заселению.',
  },
  {
    id: 4,
    title: 'Дуплекс в Екатеринбурге',
    address: 'Свердловская обл., Екатеринбург',
    price: 6700000,
    status: 'foundation',
    area: 110,
    rooms: 3,
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80',
    author: 'student',
    authorName: 'Мария Кузнецова',
    description: 'Перспективный дуплекс в развивающемся районе. ROI до 35%.',
  },
  {
    id: 5,
    title: 'Загородный дом на Рублёвке',
    address: 'Московская обл., Рублёво-Успенское ш.',
    price: 45000000,
    status: 'ready',
    area: 400,
    rooms: 7,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    author: 'admin',
    authorName: 'Администратор',
    description: 'Элитный особняк с охраняемой территорией, СПА, гаражом на 4 машины.',
  },
  {
    id: 6,
    title: 'Коттедж в Казани',
    address: 'Республика Татарстан, Казань',
    price: 9200000,
    status: 'foundation',
    area: 150,
    rooms: 4,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    author: 'student',
    authorName: 'Дмитрий Захаров',
    description: 'Строительство на этапе котлована. Проект авторской архитектуры.',
  },
]

const MOCK_STUDENTS = [
  { id: 1, name: 'Алексей Морозов', email: 'morozov@mail.ru', hasAccess: true, joinDate: '12 янв 2025', properties: 2 },
  { id: 2, name: 'Мария Кузнецова', email: 'kuznetsova@gmail.com', hasAccess: true, joinDate: '28 янв 2025', properties: 1 },
  { id: 3, name: 'Дмитрий Захаров', email: 'zakharov@yandex.ru', hasAccess: true, joinDate: '5 фев 2025', properties: 1 },
  { id: 4, name: 'Ольга Петрова', email: 'petrova@mail.ru', hasAccess: false, joinDate: '14 фев 2025', properties: 0 },
  { id: 5, name: 'Сергей Иванов', email: 'ivanov@gmail.com', hasAccess: false, joinDate: '20 фев 2025', properties: 0 },
]

const COURSE_MODULES = [
  { num: '01', title: 'Основы рынка недвижимости', desc: 'Как читать рынок, находить перспективные районы и оценивать риски.', duration: '3 урока' },
  { num: '02', title: 'Покупка на котловане', desc: 'Юридическая проверка, работа с застройщиками, минимизация рисков.', duration: '5 уроков' },
  { num: '03', title: 'Строительство под ключ', desc: 'Подрядчики, сметы, контроль качества и сдача объекта.', duration: '7 уроков' },
  { num: '04', title: 'Продажа и маркетинг', desc: 'Как продать быстро и дорого: фото, объявления, переговоры.', duration: '4 урока' },
  { num: '05', title: 'Финансовая модель', desc: 'ROI, точка безубыточности, реинвестирование прибыли.', duration: '4 урока' },
  { num: '06', title: 'Масштабирование', desc: 'Команда, юрлицо, потоковые продажи и партнёрства.', duration: '3 урока' },
]

// ─── Утилиты ─────────────────────────────────────────────────────────────────

const formatPrice = (price) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price)

// ─── Общие UI-компоненты ──────────────────────────────────────────────────────

const StatusBadge = ({ status }) => (
  status === 'ready'
    ? <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
        <CheckCircle size={11} /> Готово
      </span>
    : <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
        <Clock size={11} /> Котлован
      </span>
)

const AuthorBadge = ({ author, name }) => (
  author === 'admin'
    ? <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-700">
        <Shield size={11} /> {name}
      </span>
    : <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
        <User size={11} /> {name}
      </span>
)

const PropertyCard = ({ property, onDelete, showDelete }) => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-slate-100">
    <div className="relative overflow-hidden h-52">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-3 left-3">
        <StatusBadge status={property.status} />
      </div>
      {showDelete && (
        <button
          onClick={() => onDelete(property.id)}
          className="absolute top-3 right-3 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
    <div className="p-5">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-bold text-slate-900 text-lg leading-snug">{property.title}</h3>
      </div>
      <div className="flex items-center gap-1 text-slate-500 text-sm mb-3">
        <MapPin size={13} />
        <span>{property.address}</span>
      </div>
      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{property.description}</p>
      <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
        <span className="flex items-center gap-1"><Layers size={13} /> {property.area} м²</span>
        <span className="w-1 h-1 rounded-full bg-slate-300" />
        <span>{property.rooms} комн.</span>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <span className="text-xl font-bold text-blue-900">{formatPrice(property.price)}</span>
        <AuthorBadge author={property.author} name={property.authorName} />
      </div>
    </div>
  </div>
)

// ─── Header ───────────────────────────────────────────────────────────────────

const Header = ({ activeTab, setActiveTab, role }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navItems = [
    { id: 'home', label: 'Главная', icon: Home },
    { id: 'catalog', label: 'Каталог', icon: Building2 },
    { id: 'education', label: 'Обучение', icon: BookOpen },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 size={18} className="text-white" />
            </div>
            <span className="font-black text-xl text-slate-900 tracking-tight">
              Дом<span className="text-blue-600">Эксперт</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-slate-900 text-white hover:bg-slate-700'
              }`}
            >
              <User size={15} />
              {activeTab === 'dashboard' ? `Кабинет (${role === 'admin' ? 'Админ' : 'Ученик'})` : 'Войти / Кабинет'}
            </button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden py-3 border-t border-slate-100 space-y-1">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => { setActiveTab(id); setMenuOpen(false) }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === id ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => { setActiveTab('dashboard'); setMenuOpen(false) }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Войти / Кабинет
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

// ─── HomePage ─────────────────────────────────────────────────────────────────

const HomePage = ({ setActiveTab, properties }) => {
  const latestThree = properties.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-slate-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Star size={13} className="fill-blue-400 text-blue-400" />
              Более 120 успешных сделок
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Строим дома<br />
              <span className="text-blue-400">и обучаем</span><br />
              бизнесу
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl mb-10 leading-relaxed">
              Покупаем квартиры на этапе котлована, строим загородные дома под ключ и продаём с прибылью до 40%.
              Обучаем этому бизнесу с нуля.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setActiveTab('catalog')}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/40 text-base"
              >
                Смотреть объекты <ArrowRight size={18} />
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-base"
              >
                Стать учеником <BookOpen size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '120+', label: 'Сделок закрыто' },
              { value: '40%', label: 'Средний ROI' },
              { value: '85+', label: 'Учеников обучено' },
              { value: '7 лет', label: 'На рынке' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-white mb-1">{value}</div>
                <div className="text-blue-200 text-sm font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* О нас */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3 block">О компании</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 leading-tight">
                Эксперт, который<br />прошёл весь путь сам
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Начинал с первой покупки квартиры в новостройке на этапе котлована. Сегодня — портфель из 40+ объектов
                и сотни учеников, которые зарабатывают на строительстве домов по всей России.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Наш подход: минимальный риск через правильный выбор объекта, максимальная прибыль через грамотное
                строительство и маркетинг. Ученики получают доступ к закрытой базе объектов и инструментам для
                размещения своих предложений.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Target, text: 'Чёткая стратегия входа и выхода' },
                  { icon: Shield, text: 'Юридическая защита каждой сделки' },
                  { icon: Users, text: 'Сообщество активных инвесторов' },
                  { icon: TrendingUp, text: 'Системный рост портфеля' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={15} className="text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 leading-snug">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80"
                alt="Основатель"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/5]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Award size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Эксперт #1</div>
                    <div className="text-sm text-slate-500">по загородной недвижимости</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Последние объекты */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3 block">Объекты</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Последние добавления</h2>
            </div>
            <button
              onClick={() => setActiveTab('catalog')}
              className="hidden sm:inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
            >
              Весь каталог <ChevronRight size={18} />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestThree.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
          <div className="mt-8 sm:hidden text-center">
            <button
              onClick={() => setActiveTab('catalog')}
              className="inline-flex items-center gap-2 text-blue-600 font-semibold"
            >
              Весь каталог <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
            Готовы начать зарабатывать<br />на недвижимости?
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Присоединяйтесь к курсу и получите доступ к закрытой базе объектов и инструментам для ведения бизнеса.
          </p>
          <button
            onClick={() => setActiveTab('education')}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/40 text-lg"
          >
            Записаться на курс <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
                <Building2 size={15} className="text-white" />
              </div>
              <span className="font-black text-white">Дом<span className="text-blue-400">Эксперт</span></span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Phone size={18} /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Mail size={18} /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Instagram size={18} /></a>
            </div>
            <p className="text-slate-600 text-sm">© 2025 ДомЭксперт. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ─── CatalogPage ──────────────────────────────────────────────────────────────

const CatalogPage = ({ properties }) => {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = properties.filter(p => {
    const matchStatus = filter === 'all' || p.status === filter
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.address.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">Каталог объектов</h1>
          <p className="text-slate-500">Актуальные предложения от экспертов и учеников</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Поиск по названию или адресу..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex gap-2">
            {[
              { id: 'all', label: 'Все' },
              { id: 'ready', label: 'Готово' },
              { id: 'foundation', label: 'Котлован' },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  filter === id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <>
            <p className="text-sm text-slate-500 mb-6">Найдено объектов: <span className="font-semibold text-slate-800">{filtered.length}</span></p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <Building2 size={48} className="text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg font-medium">Объекты не найдены</p>
            <p className="text-slate-400 text-sm mt-1">Попробуйте изменить фильтры или поисковый запрос</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── EducationPage ────────────────────────────────────────────────────────────

const EducationPage = ({ setActiveTab }) => (
  <div className="min-h-screen">
    {/* Hero */}
    <section className="bg-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <BookOpen size={13} /> Авторский курс
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
            Бизнес на недвижимости<br />
            <span className="text-blue-400">с нуля до прибыли</span>
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl mb-10 leading-relaxed">
            Полная система: от покупки первого объекта на котловане до потока сделок и пассивного дохода.
            Только практика, только реальные кейсы.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all text-base shadow-lg shadow-blue-900/40"
            >
              Стать учеником <ArrowRight size={18} />
            </button>
            <div className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-medium px-8 py-4 rounded-xl text-sm">
              <Star size={15} className="fill-yellow-400 text-yellow-400" /> 4.97 · 85 выпускников
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Для кого */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Для кого этот курс</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: '🏦', title: 'Инвесторы', desc: 'Хотите вложить капитал с доходностью выше банковского вклада' },
            { icon: '🏗️', title: 'Строители', desc: 'Уже работаете в строительстве и хотите зарабатывать на продаже' },
            { icon: '🚀', title: 'Стартующие', desc: 'Начинаете с нуля и ищете проверенную бизнес-модель' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Программа */}
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3 block">Программа</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">6 модулей · 26 уроков</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {COURSE_MODULES.map(m => (
            <div key={m.num} className="flex gap-5 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors group">
              <div className="text-3xl font-black text-blue-100 group-hover:text-blue-200 transition-colors flex-shrink-0 w-10">{m.num}</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">{m.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-2">{m.desc}</p>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{m.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Что входит */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-10 sm:p-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-10">Что вы получаете</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-12 text-left">
              {[
                'Доступ к закрытой базе объектов на котловане',
                'Шаблоны договоров с застройщиками',
                'Чек-листы для приёмки строительства',
                'Финансовые модели в Excel',
                'Доступ к платформе для размещения объявлений',
                'Личная поддержка куратора 3 месяца',
                'Закрытое сообщество выпускников',
                'Партнёрская программа для масштабирования',
              ].map(item => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-xl transition-all text-lg shadow-lg shadow-blue-900/40"
            >
              Стать учеником <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
)

// ─── DashboardPage ────────────────────────────────────────────────────────────

const DashboardPage = ({ role, setRole, properties, setProperties, students, setStudents }) => {
  const [newProperty, setNewProperty] = useState({
    title: '', address: '', price: '', area: '', rooms: '', status: 'foundation', description: ''
  })
  const [formError, setFormError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const myProperties = role === 'admin'
    ? properties
    : properties.filter(p => p.author === 'student')

  const handleAddProperty = () => {
    if (!newProperty.title || !newProperty.address || !newProperty.price) {
      setFormError('Заполните обязательные поля: название, адрес и цена.')
      return
    }
    const images = [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80',
    ]
    const newProp = {
      id: Date.now(),
      ...newProperty,
      price: Number(newProperty.price),
      area: Number(newProperty.area) || 0,
      rooms: Number(newProperty.rooms) || 0,
      image: images[Math.floor(Math.random() * images.length)],
      author: role,
      authorName: role === 'admin' ? 'Администратор' : 'Мой объект',
    }
    setProperties([newProp, ...properties])
    setNewProperty({ title: '', address: '', price: '', area: '', rooms: '', status: 'foundation', description: '' })
    setFormError('')
    setSuccessMsg('Объект успешно добавлен!')
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  const handleDelete = (id) => setProperties(properties.filter(p => p.id !== id))

  const toggleAccess = (id) => {
    setStudents(students.map(s => s.id === id ? { ...s, hasAccess: !s.hasAccess } : s))
  }

  const inputClass = 'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400'
  const labelClass = 'block text-sm font-semibold text-slate-700 mb-1.5'

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Личный кабинет</h1>
              <p className="text-slate-500 text-sm mt-1">
                {role === 'admin' ? 'Панель администратора' : 'Кабинет ученика'}
              </p>
            </div>

            {/* Переключатель роли (mock) */}
            <div className="bg-slate-100 rounded-2xl p-1 flex items-center gap-1">
              <button
                onClick={() => setRole('admin')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  role === 'admin' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Shield size={15} /> Админ
              </button>
              <button
                onClick={() => setRole('student')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  role === 'student' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <User size={15} /> Ученик
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Форма добавления */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Plus size={20} className="text-blue-600" /> Добавить объект
          </h2>

          {formError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">{formError}</div>
          )}
          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl flex items-center gap-2">
              <CheckCircle size={15} /> {successMsg}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Название объекта *</label>
              <input className={inputClass} placeholder="Например: Коттедж в Подмосковье"
                value={newProperty.title} onChange={e => setNewProperty({ ...newProperty, title: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Адрес *</label>
              <input className={inputClass} placeholder="Регион, район"
                value={newProperty.address} onChange={e => setNewProperty({ ...newProperty, address: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Цена (₽) *</label>
              <input className={inputClass} type="number" placeholder="12500000"
                value={newProperty.price} onChange={e => setNewProperty({ ...newProperty, price: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Статус</label>
              <select className={inputClass}
                value={newProperty.status} onChange={e => setNewProperty({ ...newProperty, status: e.target.value })}>
                <option value="foundation">Котлован</option>
                <option value="ready">Готово</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Площадь (м²)</label>
              <input className={inputClass} type="number" placeholder="150"
                value={newProperty.area} onChange={e => setNewProperty({ ...newProperty, area: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Комнат</label>
              <input className={inputClass} type="number" placeholder="4"
                value={newProperty.rooms} onChange={e => setNewProperty({ ...newProperty, rooms: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Описание</label>
              <textarea className={`${inputClass} resize-none`} rows={3} placeholder="Краткое описание объекта..."
                value={newProperty.description} onChange={e => setNewProperty({ ...newProperty, description: e.target.value })} />
            </div>
          </div>

          <button onClick={handleAddProperty}
            className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-sm">
            <Plus size={16} /> Опубликовать объект
          </button>
        </div>

        {/* Список объектов */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
            <Building2 size={20} className="text-blue-600" />
            {role === 'admin' ? `Все объекты (${myProperties.length})` : `Мои объекты (${myProperties.length})`}
          </h2>

          {myProperties.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {myProperties.map(p => (
                <PropertyCard key={p.id} property={p} onDelete={handleDelete} showDelete={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
              <Building2 size={40} className="text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">Объекты ещё не добавлены</p>
              <p className="text-slate-400 text-sm mt-1">Используйте форму выше, чтобы добавить первый объект</p>
            </div>
          )}
        </div>

        {/* Управление доступом (только админ) */}
        {role === 'admin' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Users size={20} className="text-blue-600" /> Управление доступом
            </h2>
            <p className="text-slate-500 text-sm mb-6">Управляйте правами учеников на публикацию объявлений</p>

            <div className="space-y-3">
              {students.map(student => (
                <div key={student.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors bg-slate-50/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-700 font-bold text-sm">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{student.name}</p>
                      <p className="text-slate-500 text-xs">{student.email} · С {student.joinDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="hidden sm:block text-xs text-slate-500">
                      Объектов: <span className="font-semibold text-slate-700">{student.properties}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      {student.hasAccess
                        ? <span className="flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                            <Eye size={11} /> Есть доступ
                          </span>
                        : <span className="flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                            <Lock size={11} /> Нет доступа
                          </span>
                      }
                      <button
                        onClick={() => toggleAccess(student.id)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          student.hasAccess
                            ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                        }`}
                      >
                        {student.hasAccess ? 'Отозвать' : 'Дать доступ'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Для ученика: статус доступа */}
        {role === 'student' && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 mb-1">Ваш доступ активен</h3>
              <p className="text-blue-700 text-sm">
                Вы можете публиковать объекты в каталоге. Используйте форму выше для добавления.
                При вопросах обращайтесь к куратору.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [role, setRole] = useState('admin')
  const [properties, setProperties] = useState(MOCK_PROPERTIES)
  const [students, setStudents] = useState(MOCK_STUDENTS)

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} properties={properties} />
      case 'catalog':
        return <CatalogPage properties={properties} />
      case 'education':
        return <EducationPage setActiveTab={setActiveTab} />
      case 'dashboard':
        return (
          <DashboardPage
            role={role} setRole={setRole}
            properties={properties} setProperties={setProperties}
            students={students} setStudents={setStudents}
          />
        )
      default:
        return <HomePage setActiveTab={setActiveTab} properties={properties} />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} role={role} />
      <main>{renderPage()}</main>
    </div>
  )
}
