import { useState } from 'react'
import {
  Building2, Home, BookOpen, User, Menu, X, ArrowRight,
  MapPin, CheckCircle, Clock, Star, Users, TrendingUp,
  Plus, Trash2, Shield, ChevronRight, Phone, Mail, Instagram,
  Award, Target, Layers, Eye, Lock
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
  { id: 1, name: 'Алексей Морозов',  email: 'morozov@mail.ru',      hasAccess: true,  joinDate: '12 янв 2025', properties: 2 },
  { id: 2, name: 'Мария Кузнецова',  email: 'kuznetsova@gmail.com', hasAccess: true,  joinDate: '28 янв 2025', properties: 1 },
  { id: 3, name: 'Дмитрий Захаров',  email: 'zakharov@yandex.ru',   hasAccess: true,  joinDate: '5 фев 2025',  properties: 1 },
  { id: 4, name: 'Ольга Петрова',    email: 'petrova@mail.ru',      hasAccess: false, joinDate: '14 фев 2025', properties: 0 },
  { id: 5, name: 'Сергей Иванов',    email: 'ivanov@gmail.com',     hasAccess: false, joinDate: '20 фев 2025', properties: 0 },
]

const COURSE_MODULES = [
  { num: '01', title: 'Основы рынка недвижимости',  desc: 'Как читать рынок, находить перспективные районы и оценивать риски.',               duration: '3 урока'  },
  { num: '02', title: 'Покупка на котловане',        desc: 'Юридическая проверка, работа с застройщиками, минимизация рисков.',                duration: '5 уроков' },
  { num: '03', title: 'Строительство под ключ',      desc: 'Подрядчики, сметы, контроль качества и сдача объекта.',                            duration: '7 уроков' },
  { num: '04', title: 'Продажа и маркетинг',         desc: 'Как продать быстро и дорого: фото, объявления, переговоры.',                       duration: '4 урока'  },
  { num: '05', title: 'Финансовая модель',           desc: 'ROI, точка безубыточности, реинвестирование прибыли.',                             duration: '4 урока'  },
  { num: '06', title: 'Масштабирование',             desc: 'Команда, юрлицо, потоковые продажи и партнёрства.',                               duration: '3 урока'  },
]

// ─── Утилиты ─────────────────────────────────────────────────────────────────

const formatPrice = (price) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price)

// ─── Общие UI-компоненты ──────────────────────────────────────────────────────

const StatusBadge = ({ status }) => (
  status === 'ready'
    ? <span className="badge badge--ready"><CheckCircle size={11} /> Готово</span>
    : <span className="badge badge--foundation"><Clock size={11} /> Котлован</span>
)

const AuthorBadge = ({ author, name }) => (
  author === 'admin'
    ? <span className="badge--admin" style={{ display:'inline-flex', alignItems:'center', gap:5 }}>
        <Shield size={12} /> {name}
      </span>
    : <span className="badge--student" style={{ display:'inline-flex', alignItems:'center', gap:5 }}>
        <User size={12} /> {name}
      </span>
)

const PropertyCard = ({ property, onDelete, showDelete }) => (
  <div className="prop-card">
    <div className="prop-card__img-wrap">
      <img src={property.image} alt={property.title} className="prop-card__img" />
      <div className="prop-card__badges">
        <StatusBadge status={property.status} />
      </div>
      {showDelete && (
        <button className="prop-card__del-btn" onClick={() => onDelete(property.id)} title="Удалить">
          <Trash2 size={14} />
        </button>
      )}
    </div>
    <div className="prop-card__body">
      <h3 className="prop-card__title">{property.title}</h3>
      <p className="prop-card__addr">
        <MapPin size={13} /> {property.address}
      </p>
      <p className="prop-card__desc">{property.description}</p>
      <div className="prop-card__specs">
        <span style={{ display:'inline-flex', alignItems:'center', gap:5 }}><Layers size={13} /> {property.area} м²</span>
        <span className="prop-card__sep" />
        <span>{property.rooms} комн.</span>
      </div>
      <div className="prop-card__footer">
        <span className="prop-card__price">{formatPrice(property.price)}</span>
        <AuthorBadge author={property.author} name={property.authorName} />
      </div>
    </div>
  </div>
)

// ─── Header ───────────────────────────────────────────────────────────────────

const Header = ({ activeTab, setActiveTab, role }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navItems = [
    { id: 'home',      label: 'Главная' },
    { id: 'catalog',   label: 'Каталог' },
    { id: 'education', label: 'Обучение' },
  ]

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <button className="header__logo" onClick={() => setActiveTab('home')}>
            <div className="logo-icon">
              <Building2 size={17} color="#fff" />
            </div>
            <span className="logo-text">Дом<span>Эксперт</span></span>
          </button>

          <nav className="header__nav">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`nav__link${activeTab === id ? ' nav__link--active' : ''}`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="header__cta">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`btn btn--sm ${activeTab === 'dashboard' ? 'btn--primary' : 'btn--dark'}`}
            >
              <User size={14} />
              {activeTab === 'dashboard'
                ? `Кабинет · ${role === 'admin' ? 'Админ' : 'Ученик'}`
                : 'Войти / Кабинет'}
            </button>
          </div>

          <button
            className="header__burger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div className={`header__mobile-menu${menuOpen ? ' open' : ''}`}>
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              className={`mobile-link${activeTab === id ? ' mobile-link--active' : ''}`}
              onClick={() => { setActiveTab(id); setMenuOpen(false) }}
            >
              {label}
            </button>
          ))}
          <button
            className="mobile-link"
            onClick={() => { setActiveTab('dashboard'); setMenuOpen(false) }}
          >
            Войти / Кабинет
          </button>
        </div>
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
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__overlay" />
        <div className="container">
          <div className="hero__content">
            <div className="hero__badge">
              <Star size={13} style={{ fill: '#c4955a', color: '#c4955a' }} />
              Более 120 успешных сделок
            </div>
            <h1 className="hero__title">
              Строим дома<br />
              <span>и обучаем</span><br />
              бизнесу
            </h1>
            <p className="hero__subtitle">
              Покупаем квартиры на этапе котлована, строим загородные дома
              под ключ и продаём с прибылью до 40%. Обучаем этому бизнесу с нуля.
            </p>
            <div className="hero__actions">
              <button className="btn btn--primary" onClick={() => setActiveTab('catalog')}>
                Смотреть объекты <ArrowRight size={18} />
              </button>
              <button className="btn btn--ghost" onClick={() => setActiveTab('education')}>
                Стать учеником <BookOpen size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-bar__grid">
            {[
              { value: '120+', label: 'Сделок закрыто' },
              { value: '40%',  label: 'Средний ROI' },
              { value: '85+',  label: 'Учеников обучено' },
              { value: '7 лет', label: 'На рынке' },
            ].map(({ value, label }) => (
              <div key={label} className="stats-bar__item">
                <div className="stats-bar__value">{value}</div>
                <div className="stats-bar__label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* О нас */}
      <section className="section section--light">
        <div className="container">
          <div className="about-grid">
            <div>
              <span className="section-eyebrow">О компании</span>
              <h2 className="section-title" style={{ marginBottom: 20 }}>
                Эксперт, который<br />прошёл весь путь сам
              </h2>
              <p className="section-subtitle" style={{ marginBottom: 16 }}>
                Начинал с первой покупки квартиры в новостройке на этапе котлована. Сегодня —
                портфель из 40+ объектов и сотни учеников, которые зарабатывают на строительстве
                домов по всей России.
              </p>
              <p className="section-subtitle">
                Наш подход: минимальный риск через правильный выбор объекта, максимальная прибыль
                через грамотное строительство и маркетинг.
              </p>
              <div className="about__features">
                {[
                  { Icon: Target,     text: 'Чёткая стратегия входа и выхода' },
                  { Icon: Shield,     text: 'Юридическая защита каждой сделки' },
                  { Icon: Users,      text: 'Сообщество активных инвесторов'   },
                  { Icon: TrendingUp, text: 'Системный рост портфеля'          },
                ].map(({ Icon, text }) => (
                  <div key={text} className="feature-card">
                    <div className="feature-card__icon"><Icon size={16} /></div>
                    <span className="feature-card__text">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="about__image-wrap">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80"
                alt="Основатель"
                className="about__image"
              />
              <div className="about__badge-card">
                <div className="about__badge-icon"><Award size={22} /></div>
                <div>
                  <div className="about__badge-title">Эксперт №1</div>
                  <div className="about__badge-sub">по загородной недвижимости</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Последние объекты */}
      <section className="section section--muted">
        <div className="container">
          <div className="section__head">
            <div>
              <span className="section-eyebrow">Объекты</span>
              <h2 className="section-title">Последние добавления</h2>
            </div>
            <button
              onClick={() => setActiveTab('catalog')}
              className="btn btn--outline btn--sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              Весь каталог <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid-3">
            {latestThree.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-section__title">
            Готовы начать зарабатывать<br />на недвижимости?
          </h2>
          <p className="cta-section__sub">
            Присоединяйтесь к курсу и получите доступ к закрытой базе объектов
            и инструментам для ведения бизнеса.
          </p>
          <button className="btn btn--primary" onClick={() => setActiveTab('education')}>
            Записаться на курс <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer__inner">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div className="logo-icon" style={{ width: 30, height: 30 }}>
                <Building2 size={15} color="#fff" />
              </div>
              <span className="logo-text" style={{ fontSize: '1rem' }}>
                Дом<span>Эксперт</span>
              </span>
            </div>
            <div className="footer__socials">
              <a href="#" className="footer__social-link"><Phone size={17} /></a>
              <a href="#" className="footer__social-link"><Mail size={17} /></a>
              <a href="#" className="footer__social-link"><Instagram size={17} /></a>
            </div>
            <p className="footer__copy">© 2025 ДомЭксперт. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ─── CatalogPage ──────────────────────────────────────────────────────────────

const CatalogPage = ({ properties }) => {
  const [filter, setFilter] = useState('all')
  const [search, setSearch]  = useState('')

  const filtered = properties.filter(p => {
    const matchStatus = filter === 'all' || p.status === filter
    const matchSearch  = p.title.toLowerCase().includes(search.toLowerCase()) ||
                         p.address.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">Каталог объектов</h1>
          <p className="page-hero__sub">Актуальные предложения от экспертов и учеников</p>
        </div>
      </div>

      <section className="section section--muted" style={{ paddingTop: 40 }}>
        <div className="container">
          <div className="catalog-filters">
            <input
              type="text"
              className="catalog-search"
              placeholder="Поиск по названию или адресу..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {[
              { id: 'all',        label: 'Все'      },
              { id: 'ready',      label: 'Готово'   },
              { id: 'foundation', label: 'Котлован' },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={`filter-btn${filter === id ? ' filter-btn--active' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <>
              <p className="catalog-count">
                Найдено объектов: <strong>{filtered.length}</strong>
              </p>
              <div className="grid-3">
                {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
              </div>
            </>
          ) : (
            <div className="catalog-empty">
              <Building2 size={48} className="catalog-empty__icon" />
              <p className="catalog-empty__title">Объекты не найдены</p>
              <p className="catalog-empty__sub">Попробуйте изменить фильтры или поисковый запрос</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

// ─── EducationPage ────────────────────────────────────────────────────────────

const EducationPage = ({ setActiveTab }) => (
  <div>
    {/* Hero */}
    <section className="edu-hero">
      <div className="container">
        <div className="edu-hero__inner">
          <div className="edu-hero__badge">
            <BookOpen size={13} /> Авторский курс
          </div>
          <h1 className="edu-hero__title">
            Бизнес на недвижимости<br />
            <span>с нуля до прибыли</span>
          </h1>
          <p className="edu-hero__sub">
            Полная система: от покупки первого объекта на котловане до потока сделок
            и пассивного дохода. Только практика, только реальные кейсы.
          </p>
          <div className="edu-hero__actions">
            <button className="btn btn--primary" onClick={() => setActiveTab('dashboard')}>
              Стать учеником <ArrowRight size={18} />
            </button>
            <div className="rating-pill">
              <Star size={15} style={{ fill: '#facc15', color: '#facc15' }} />
              4.97 · 85 выпускников
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Для кого */}
    <section className="section section--light">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-eyebrow">Аудитория</span>
          <h2 className="section-title">Для кого этот курс</h2>
        </div>
        <div className="grid-3">
          {[
            { emoji: '🏦', title: 'Инвесторы',  desc: 'Хотите вложить капитал с доходностью выше банковского вклада' },
            { emoji: '🏗️', title: 'Строители',  desc: 'Уже работаете в строительстве и хотите зарабатывать на продаже' },
            { emoji: '🚀', title: 'Стартующие', desc: 'Начинаете с нуля и ищете проверенную бизнес-модель' },
          ].map(({ emoji, title, desc }) => (
            <div key={title} className="for-whom-card">
              <span className="for-whom-card__emoji">{emoji}</span>
              <h3 className="for-whom-card__title">{title}</h3>
              <p className="for-whom-card__desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Программа */}
    <section className="section section--muted">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-eyebrow">Программа</span>
          <h2 className="section-title">6 модулей · 26 уроков</h2>
        </div>
        <div className="grid-2" style={{ maxWidth: 900, margin: '0 auto' }}>
          {COURSE_MODULES.map(m => (
            <div key={m.num} className="module-card">
              <div className="module-card__num">{m.num}</div>
              <div>
                <h3 className="module-card__title">{m.title}</h3>
                <p className="module-card__desc">{m.desc}</p>
                <span className="module-chip">{m.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Что включено */}
    <section className="section section--light">
      <div className="container">
        <div className="edu-included">
          <h2 className="edu-included__title">Что вы получаете</h2>
          <ul className="edu-included__list">
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
              <li key={item} className="edu-included__item">
                <CheckCircle size={17} className="edu-included__item-icon" />
                {item}
              </li>
            ))}
          </ul>
          <div style={{ textAlign: 'center' }}>
            <button className="btn btn--primary" onClick={() => setActiveTab('dashboard')}>
              Стать учеником <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
)

// ─── DashboardPage ────────────────────────────────────────────────────────────

const DashboardPage = ({ role, setRole, properties, setProperties, students, setStudents }) => {
  const [form, setForm] = useState({
    title: '', address: '', price: '', area: '', rooms: '', status: 'foundation', description: ''
  })
  const [formError,  setFormError]  = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const myProperties = role === 'admin'
    ? properties
    : properties.filter(p => p.author === 'student')

  const handleAdd = () => {
    if (!form.title || !form.address || !form.price) {
      setFormError('Заполните обязательные поля: название, адрес и цена.')
      return
    }
    const imgs = [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80',
    ]
    setProperties([{
      id: Date.now(),
      ...form,
      price: Number(form.price),
      area:  Number(form.area)  || 0,
      rooms: Number(form.rooms) || 0,
      image: imgs[Math.floor(Math.random() * imgs.length)],
      author:     role,
      authorName: role === 'admin' ? 'Администратор' : 'Мой объект',
    }, ...properties])
    setForm({ title: '', address: '', price: '', area: '', rooms: '', status: 'foundation', description: '' })
    setFormError('')
    setSuccessMsg('Объект успешно опубликован!')
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  const f = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  return (
    <div>
      <div className="dash-header">
        <div className="container">
          <div className="dash-header__inner">
            <div>
              <h1 className="dash-header__title">Личный кабинет</h1>
              <p className="dash-header__sub">
                {role === 'admin' ? 'Панель администратора' : 'Кабинет ученика'}
              </p>
            </div>

            <div className="role-switcher">
              <button
                className={`role-btn${role === 'admin' ? ' role-btn--active' : ''}`}
                onClick={() => setRole('admin')}
              >
                <Shield size={15} /> Админ
              </button>
              <button
                className={`role-btn${role === 'student' ? ' role-btn--active' : ''}`}
                onClick={() => setRole('student')}
              >
                <User size={15} /> Ученик
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="dash-body">
        <div className="container">

          {/* Форма добавления */}
          <div className="form-card">
            <h2 className="form-card__title">
              <Plus size={20} className="form-card__title-icon" /> Добавить объект
            </h2>

            {formError  && <div className="form-alert form-alert--error">{formError}</div>}
            {successMsg && (
              <div className="form-alert form-alert--success">
                <CheckCircle size={16} /> {successMsg}
              </div>
            )}

            <div className="form-grid">
              <div>
                <label className="form-label">Название объекта *</label>
                <input className="form-input" placeholder="Коттедж в Подмосковье" value={form.title}       onChange={f('title')}   />
              </div>
              <div>
                <label className="form-label">Адрес *</label>
                <input className="form-input" placeholder="Регион, район"          value={form.address}     onChange={f('address')} />
              </div>
              <div>
                <label className="form-label">Цена (₽) *</label>
                <input className="form-input" type="number" placeholder="12500000" value={form.price}       onChange={f('price')}   />
              </div>
              <div>
                <label className="form-label">Статус</label>
                <select className="form-select" value={form.status} onChange={f('status')}>
                  <option value="foundation">Котлован</option>
                  <option value="ready">Готово</option>
                </select>
              </div>
              <div>
                <label className="form-label">Площадь (м²)</label>
                <input className="form-input" type="number" placeholder="150"      value={form.area}        onChange={f('area')}    />
              </div>
              <div>
                <label className="form-label">Комнат</label>
                <input className="form-input" type="number" placeholder="4"        value={form.rooms}       onChange={f('rooms')}   />
              </div>
              <div className="form-grid--full">
                <label className="form-label">Описание</label>
                <textarea className="form-textarea" rows={3} placeholder="Краткое описание объекта..."
                  value={form.description} onChange={f('description')} />
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <button className="btn btn--primary" onClick={handleAdd}>
                <Plus size={16} /> Опубликовать объект
              </button>
            </div>
          </div>

          {/* Список объектов */}
          <div>
            <h2 className="dash-section__title">
              <Building2 size={20} className="dash-section__title-icon" />
              {role === 'admin'
                ? `Все объекты (${myProperties.length})`
                : `Мои объекты (${myProperties.length})`}
            </h2>

            {myProperties.length > 0 ? (
              <div className="grid-3">
                {myProperties.map(p => (
                  <PropertyCard
                    key={p.id}
                    property={p}
                    showDelete
                    onDelete={(id) => setProperties(properties.filter(x => x.id !== id))}
                  />
                ))}
              </div>
            ) : (
              <div className="dash-empty">
                <Building2 size={40} className="dash-empty__icon" />
                <p className="dash-empty__title">Объекты ещё не добавлены</p>
                <p className="dash-empty__sub">Используйте форму выше для добавления первого объекта</p>
              </div>
            )}
          </div>

          {/* Управление доступом (только Админ) */}
          {role === 'admin' && (
            <div className="access-card">
              <h2 className="access-card__title">
                <Users size={20} className="access-card__title-icon" /> Управление доступом
              </h2>
              <p className="access-card__sub">
                Управляйте правами учеников на публикацию объявлений
              </p>

              <div className="student-list">
                {students.map(s => (
                  <div key={s.id} className="student-row">
                    <div className="student-row__left">
                      <div className="student-avatar">
                        {s.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="student-name">{s.name}</p>
                        <p className="student-meta">{s.email} · С {s.joinDate}</p>
                      </div>
                    </div>
                    <div className="student-row__right">
                      <span className="props-count">
                        Объектов: <strong>{s.properties}</strong>
                      </span>
                      <span className={`access-pill ${s.hasAccess ? 'access-pill--yes' : 'access-pill--no'}`}>
                        {s.hasAccess ? <><Eye size={11} /> Есть доступ</> : <><Lock size={11} /> Нет доступа</>}
                      </span>
                      <button
                        onClick={() => setStudents(students.map(x => x.id === s.id ? { ...x, hasAccess: !x.hasAccess } : x))}
                        className={`btn btn--sm ${s.hasAccess ? 'btn--danger' : 'btn--access'}`}
                      >
                        {s.hasAccess ? 'Отозвать' : 'Дать доступ'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Баннер для ученика */}
          {role === 'student' && (
            <div className="student-banner">
              <div className="student-banner__icon">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="student-banner__title">Ваш доступ активен</p>
                <p className="student-banner__text">
                  Вы можете публиковать объекты в каталоге. Используйте форму выше для добавления.
                  При вопросах обращайтесь к куратору.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab,   setActiveTab]   = useState('home')
  const [role,        setRole]        = useState('admin')
  const [properties,  setProperties]  = useState(MOCK_PROPERTIES)
  const [students,    setStudents]    = useState(MOCK_STUDENTS)

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
            role={role}           setRole={setRole}
            properties={properties} setProperties={setProperties}
            students={students}   setStudents={setStudents}
          />
        )
      default:
        return <HomePage setActiveTab={setActiveTab} properties={properties} />
    }
  }

  return (
    <div>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} role={role} />
      <main>{renderPage()}</main>
    </div>
  )
}
