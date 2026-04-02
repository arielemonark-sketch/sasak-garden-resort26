/* ============================================================
   LanguageContext — Sasak Garden Resort
   Global RU/EN language switching with full translation dictionaries
   ============================================================ */

import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "ru" | "en";

export interface Translations {
  // Navigation
  nav: {
    about: string;
    gallery: string;
    rooms: string;
    booking: string;
    amenities: string;
    restaurant: string;
    faq: string;
    reviews: string;
    contacts: string;
    bookNow: string;
    attractions: string;
    videoGallery: string;
    specialOffers: string;
  };
  // Hero
  hero: {
    location: string;
    subtitle: string;
    ratingLabel: string;
    ratingCount: string;
    ctaBook: string;
    ctaLearn: string;
    scrollLabel: string;
  };
  // About
  about: {
    sectionNum: string;
    title1: string;
    title2: string;
    quote: string;
    quoteAuthor: string;
    p1: string;
    p2: string;
    stat1Val: string; stat1Label: string;
    stat2Val: string; stat2Label: string;
    stat3Val: string; stat3Label: string;
    stat4Val: string; stat4Label: string;
    learnMore: string;
  };
  // Gallery
  gallery: {
    sectionNum: string;
    title1: string;
    title2: string;
    subtitle: string;
    viewAll: string;
  };
  // Rooms
  rooms: {
    sectionNum: string;
    title1: string;
    title2: string;
    subtitle: string;
    from: string;
    perNight: string;
    bookRoom: string;
    compareTitle: string;
    compareSubtitle: string;
    feature: string;
    kingName: string;
    twinName: string;
    features: {
      size: string;
      bed: string;
      guests: string;
      view: string;
      ac: string;
      tv: string;
      wifi: string;
      shower: string;
      breakfast: string;
      balcony: string;
    };
    kingValues: {
      size: string; bed: string; guests: string; view: string;
      ac: string; tv: string; wifi: string; shower: string; breakfast: string; balcony: string;
    };
    twinValues: {
      size: string; bed: string; guests: string; view: string;
      ac: string; tv: string; wifi: string; shower: string; breakfast: string; balcony: string;
    };
  };
  // Booking widget
  bookingWidget: {
    title: string;
    nights1: string; nights2: string; nights5: string;
    checkin: string;
    checkout: string;
    adults: string;
    children: string;
    roomsLabel: string;
    cta: string;
    secure: string;
    freeCancel: string;
    instant: string;
    via: string;
  };
  // Booking section
  bookingSection: {
    sectionLabel: string;
    title1: string; title2: string; title3: string;
    desc: string;
    badge1: string; badge2: string; badge3: string; badge4: string;
  };
  // Amenities
  amenities: {
    sectionNum: string;
    title1: string; title2: string;
    subtitle: string;
    langTitle: string;
    langCount: string;
    languages: string[];
    categories: {
      pool: string; dining: string; room: string; bathroom: string;
      media: string; parking: string; service: string; security: string;
    };
  };
  // Restaurant
  restaurant: {
    sectionNum: string;
    title1: string; title2: string;
    desc: string;
    cta: string;
    menuTitle: string;
    categories: { breakfast: string; mains: string; drinks: string; desserts: string };
  };
  // Reviews
  reviews: {
    sectionNum: string;
    title1: string; title2: string;
    overallLabel: string;
    ctaAll: string;
    ratingLabels: { staff: string; facilities: string; cleanliness: string; comfort: string; value: string; location: string };
  };
  // FAQ
  faq: {
    sectionNum: string;
    title1: string; title2: string;
    subtitle: string;
    ctaContact: string;
    questions: Array<{ q: string; a: string }>;
  };
  // Contact
  contact: {
    sectionNum: string;
    title1: string; title2: string;
    addressLabel: string;
    address: string;
    phoneLabel: string;
    emailLabel: string;
    checkinLabel: string;
    checkin: string;
    checkoutLabel: string;
    checkout: string;
    nearby: Array<{ place: string; dist: string }>;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaDesc: string;
    ctaBtn: string;
  };
  // Footer
  footer: {
    tagline: string;
    navTitle: string;
    infoTitle: string;
    bookingTitle: string;
    bookingDesc: string;
    bookingBtn: string;
    copyright: string;
    infoLinks: string[];
    navLinks: Array<{ label: string; href: string }>;
  };
  // Floating bar
  floatingBar: {
    subtitle: string;
    ratingLabel: string;
    cta: string;
  };
  // Video Gallery
  videoGallery: {
    sectionNum: string;
    title1: string;
    title2: string;
    subtitle: string;
    playLabel: string;
    closeLabel: string;
    prevLabel: string;
    nextLabel: string;
    videoLabels: string[];
  };
  // Special Offers
  specialOffers: {
    sectionNum: string;
    title1: string;
    title2: string;
    subtitle: string;
    badge: string;
    ctaBook: string;
    ctaDetails: string;
    limitedLabel: string;
    packages: Array<{
      id: string;
      tag: string;
      title: string;
      subtitle: string;
      duration: string;
      guests: string;
      price: string;
      priceNote: string;
      highlights: string[];
      cta: string;
    }>;
  };
  // Attractions
  attractions: {
    sectionNum: string;
    title1: string;
    title2: string;
    subtitle: string;
    distLabel: string;
    ctaBook: string;
    categories: {
      beaches: string;
      diving: string;
      culture: string;
      islands: string;
      adventure: string;
      dining: string;
    };
    items: Array<{
      category: string;
      title: string;
      desc: string;
      dist: string;
      duration: string;
    }>;
  };
}

const ru: Translations = {
  nav: {
    about: "О нас", gallery: "Галерея", rooms: "Номера", booking: "Бронирование",
    amenities: "Удобства", restaurant: "Ресторан", faq: "FAQ", reviews: "Отзывы",
    contacts: "Контакты", bookNow: "Забронировать", attractions: "Досуг", videoGallery: "Видео", specialOffers: "Акции",
  },
  hero: {
    location: "Сенггиги · Ломбок · Индонезия",
    subtitle: "Ваш личный тропический оазис. Окружённый садами, в 5 минутах от пляжа Бату-Болонг.",
    ratingLabel: "Великолепно",
    ratingCount: "113 отзывов · Booking.com",
    ctaBook: "Забронировать сейчас",
    ctaLearn: "Узнать больше",
    scrollLabel: "Прокрутить",
  },
  about: {
    sectionNum: "01 — О резорте",
    title1: "Тропический",
    title2: "оазис Сенггиги",
    quote: "«Мы создали это место, чтобы каждый гость чувствовал себя как дома — но лучше»",
    quoteAuthor: "— Sunny, основатель Sasak Garden Resort",
    p1: "Sasak Garden Resort — бутик-резорт в самом сердце Сенггиги, окружённый пышными тропическими садами. Каждый уголок создан с любовью к деталям: от традиционных балийских бунгало до кристально чистого бассейна с видом на сад.",
    p2: "Всего в 5 минутах ходьбы от пляжа Бату-Болонг, резорт предлагает идеальное сочетание уединения и близости к жизни острова. Персонал, говорящий на 5 языках, включая русский, обеспечивает безупречный сервис 24/7.",
    stat1Val: "9.9", stat1Label: "Рейтинг",
    stat2Val: "113", stat2Label: "Отзывов",
    stat3Val: "5 мин", stat3Label: "До пляжа",
    stat4Val: "24/7", stat4Label: "Сервис",
    learnMore: "Подробнее о резорте",
  },
  gallery: {
    sectionNum: "02 — Галерея",
    title1: "Красота",
    title2: "в каждом кадре",
    subtitle: "Тропические сады, кристальный бассейн, уютные бунгало — погрузитесь в атмосферу Sasak Garden.",
    viewAll: "Смотреть все фото",
  },
  rooms: {
    sectionNum: "03 — Номера",
    title1: "Ваш",
    title2: "идеальный номер",
    subtitle: "Два типа номеров с продуманными удобствами и видом на тропический сад.",
    from: "от",
    perNight: "/ ночь",
    bookRoom: "Забронировать номер",
    compareTitle: "Сравнение номеров",
    compareSubtitle: "Выберите идеальный вариант для вашего отдыха",
    feature: "Характеристика",
    kingName: "King-Size Suite",
    twinName: "Twin Garden Room",
    features: {
      size: "Площадь", bed: "Кровать", guests: "Гости", view: "Вид",
      ac: "Кондиционер", tv: "Smart TV", wifi: "Wi-Fi", shower: "Душ",
      breakfast: "Завтрак", balcony: "Балкон",
    },
    kingValues: {
      size: "35 м²", bed: "King-Size", guests: "2 взрослых", view: "Сад + бассейн",
      ac: "✓", tv: "4K Netflix", wifi: "200 Мбит/с", shower: "Горячий/холодный",
      breakfast: "По меню", balcony: "Терраса",
    },
    twinValues: {
      size: "28 м²", bed: "2 × Twin", guests: "2 взрослых", view: "Тропический сад",
      ac: "✓", tv: "4K Netflix", wifi: "200 Мбит/с", shower: "Горячий/холодный",
      breakfast: "По меню", balcony: "Патио",
    },
  },
  bookingWidget: {
    title: "Проверить наличие номеров",
    nights1: "ночь", nights2: "ночи", nights5: "ночей",
    checkin: "Заезд", checkout: "Выезд",
    adults: "Взрослые", children: "Дети", roomsLabel: "Номера",
    cta: "Найти номер",
    secure: "Безопасное бронирование",
    freeCancel: "Бесплатная отмена",
    instant: "Подтверждение мгновенно",
    via: "Через Booking.com",
  },
  bookingSection: {
    sectionLabel: "Онлайн-бронирование",
    title1: "Ваш", title2: "идеальный", title3: "отдых",
    desc: "Выберите даты и гостей — мы перенаправим вас на Booking.com для безопасного оформления.",
    badge1: "Бесплатная отмена до 24 ч",
    badge2: "Мгновенное подтверждение",
    badge3: "Лучшая цена гарантирована",
    badge4: "Оценка 9.9 · 113 отзывов",
  },
  amenities: {
    sectionNum: "04 — Удобства",
    title1: "65+ удобств",
    title2: "для вашего комфорта",
    subtitle: "Продуманные удобства с оценкой гостей 9.9 из 10. Каждая деталь создана для того, чтобы ваш отдых был безупречным.",
    langTitle: "Персонал говорит на",
    langCount: "5 языках",
    languages: ["Русский", "Английский", "Индонезийский", "Украинский", "Филиппинский"],
    categories: {
      pool: "Бассейн и отдых", dining: "Питание", room: "Номер", bathroom: "Ванная комната",
      media: "Интернет и ТВ", parking: "Парковка и транспорт", service: "Сервис", security: "Безопасность",
    },
  },
  restaurant: {
    sectionNum: "05 — Ресторан",
    title1: "Вкус",
    title2: "Индонезии",
    desc: "Наш ресторан предлагает лучшее из индонезийской, средиземноморской и американской кухни. Завтрак подаётся по меню с 7:00 до 10:00. Доставка в номер доступна круглосуточно.",
    cta: "Забронировать столик",
    menuTitle: "Избранные блюда",
    categories: { breakfast: "Завтрак", mains: "Основные блюда", drinks: "Напитки", desserts: "Десерты" },
  },
  reviews: {
    sectionNum: "06 — Отзывы",
    title1: "Что говорят",
    title2: "наши гости",
    overallLabel: "Великолепно · 113 отзывов",
    ctaAll: "Читать все 113 отзывов",
    ratingLabels: {
      staff: "Персонал", facilities: "Удобства", cleanliness: "Чистота",
      comfort: "Комфорт", value: "Цена/качество", location: "Расположение",
    },
  },
  faq: {
    sectionNum: "07 — FAQ",
    title1: "Часто задаваемые",
    title2: "вопросы",
    subtitle: "Ответы на самые популярные вопросы наших гостей. Не нашли ответ? Свяжитесь с нами напрямую.",
    ctaContact: "Задать вопрос в WhatsApp",
    questions: [
      {
        q: "Есть ли бесплатная парковка?",
        a: "Да, на территории резорта есть бесплатная частная парковка для всех гостей. Парковочные места расположены прямо у входа и охраняются круглосуточно. Предварительное бронирование парковочного места не требуется.",
      },
      {
        q: "Можно ли приехать с домашними животными?",
        a: "К сожалению, проживание с домашними животными в Sasak Garden Resort не предусмотрено. Это связано с заботой о комфорте всех гостей и сохранностью тропического сада. Если у вас есть особые обстоятельства, пожалуйста, свяжитесь с нами заранее.",
      },
      {
        q: "Есть ли трансфер из аэропорта?",
        a: "Да, мы организуем трансфер из международного аэропорта Ломбок (LOP) и обратно. Услуга платная и бронируется заранее. Стоимость трансфера зависит от типа автомобиля. Для бронирования свяжитесь с нами по WhatsApp: +62 819-1777-6161.",
      },
      {
        q: "Во сколько заезд и выезд?",
        a: "Стандартное время заезда — 14:00, выезда — 12:00. Ранний заезд (с 10:00) и поздний выезд (до 16:00) возможны при наличии свободных номеров и оплачиваются дополнительно. Хранение багажа после выезда предоставляется бесплатно.",
      },
      {
        q: "Включён ли завтрак в стоимость?",
        a: "Завтрак не включён автоматически, но доступен по меню в нашем ресторане с 7:00 до 10:00. Меню включает блюда индонезийской, американской и вегетарианской кухни. Стоимость завтрака — от 50 000 IDR с человека.",
      },
      {
        q: "Есть ли бассейн? Какой режим работы?",
        a: "Да, на территории резорта есть открытый бассейн с видом на тропический сад. Бассейн открыт для гостей с 7:00 до 22:00. Вход в бассейн бесплатный для всех проживающих. Шезлонги и зонты предоставляются без дополнительной оплаты.",
      },
      {
        q: "Какой Wi-Fi в резорте?",
        a: "Высокоскоростной Wi-Fi (до 200 Мбит/с) доступен бесплатно по всей территории резорта — в номерах, у бассейна и в ресторане. Пароль от сети предоставляется при заезде.",
      },
      {
        q: "Как добраться до пляжа?",
        a: "Пляж Бату-Болонг находится всего в 5 минутах ходьбы от резорта. Наш персонал с удовольствием подскажет лучший маршрут и порекомендует лучшие места для сёрфинга и снорклинга в районе Сенггиги.",
      },
      {
        q: "Есть ли возможность отмены бронирования?",
        a: "Условия отмены зависят от выбранного тарифа при бронировании. Большинство тарифов предусматривают бесплатную отмену за 24–48 часов до заезда. Точные условия указаны на странице бронирования на Booking.com.",
      },
      {
        q: "Говорит ли персонал по-русски?",
        a: "Да! Наш персонал говорит на русском языке. Мы рады принимать гостей из России, Украины и других русскоязычных стран. Помимо русского, персонал владеет английским, индонезийским, украинским и филиппинским языками.",
      },
    ],
  },
  contact: {
    sectionNum: "08 — Расположение",
    title1: "Найдите нас",
    title2: "в Сенггиги",
    addressLabel: "Адрес",
    address: "Jl. Raya Senggigi No. 14\nSenggigi, Lombok Barat\nNusa Tenggara Barat 83355\nИндонезия",
    phoneLabel: "Телефон",
    emailLabel: "Email",
    checkinLabel: "Заезд",
    checkin: "14:00",
    checkoutLabel: "Выезд",
    checkout: "12:00",
    nearby: [
      { place: "Пляж Бату-Болонг", dist: "5 мин пешком" },
      { place: "Центр Сенггиги", dist: "10 мин пешком" },
      { place: "Аэропорт Ломбок", dist: "45 мин на авто" },
    ],
    ctaTitle: "Забронируйте",
    ctaSubtitle: " сейчас",
    ctaDesc: "Оценка 9.9 · 113 отзывов · Лучшая цена гарантирована на Booking.com",
    ctaBtn: "Проверить наличие мест",
  },
  footer: {
    tagline: "Бутик-резорт в тропическом саду Сенггиги. Оценка 9.9 · 113 отзывов на Booking.com.",
    navTitle: "Навигация",
    infoTitle: "Информация",
    bookingTitle: "Бронирование",
    bookingDesc: "Лучшая цена гарантирована при бронировании через Booking.com",
    bookingBtn: "Забронировать",
    copyright: "Все права защищены.",
    infoLinks: ["Политика отмены", "Правила проживания", "Политика конфиденциальности", "Специальные предложения", "Корпоративные тарифы"],
    navLinks: [
      { label: "О резорте", href: "#about" },
      { label: "Галерея", href: "#gallery" },
      { label: "Номера", href: "#rooms" },
      { label: "Удобства", href: "#amenities" },
      { label: "Ресторан", href: "#restaurant" },
      { label: "Отзывы", href: "#reviews" },
    ],
  },
  floatingBar: {
    subtitle: "Сенггиги · Ломбок · Оценка 9.9",
    ratingLabel: "Великолепно · 113 отзывов",
    cta: "Забронировать",
  },
  videoGallery: {
    sectionNum: "10 — Видео",
    title1: "Жизнь",
    title2: "резорта",
    subtitle: "Почувствуйте атмосферу Sasak Garden Resort через видео. Тропический сад, бассейн, номера и окрестности — всё в одном месте.",
    playLabel: "Смотреть",
    closeLabel: "Закрыть",
    prevLabel: "Назад",
    nextLabel: "Вперёд",
    videoLabels: [
      "Территория резорта",
      "Тропический сад",
      "Бассейн и зона отдыха",
      "Номера и интерьер",
      "Ресторан и завтрак",
      "Вид на окрестности",
      "Атмосфера резорта",
    ],
  },
  specialOffers: {
    sectionNum: "09 — Спецпредложения",
    title1: "Особые",
    title2: "предложения",
    subtitle: "Эксклюзивные пакеты для незабываемого отдыха. Ограниченное количество мест — бронируйте заранее.",
    badge: "Ограниченное предложение",
    ctaBook: "Забронировать пакет",
    ctaDetails: "Подробнее",
    limitedLabel: "Осталось мест",
    packages: [
      {
        id: "romantic",
        tag: "Самый популярный",
        title: "Романтический уикенд",
        subtitle: "Для двоих",
        duration: "2 ночи",
        guests: "2 взрослых",
        price: "от $89",
        priceNote: "за 2 ночи · включая все услуги пакета",
        highlights: [
          "King-Size Suite с видом на сад",
          "Завтрак для двоих в постель",
          "Бутылка шампанского при заезде",
          "Поздний выезд до 14:00",
          "Украшение номера цветами",
          "Приватный ужин у бассейна",
        ],
        cta: "Забронировать романтику",
      },
      {
        id: "family",
        tag: "Для семьи",
        title: "Семейный отдых",
        subtitle: "Для всей семьи",
        duration: "3 ночи",
        guests: "2 взрослых + дети",
        price: "от $120",
        priceNote: "за 3 ночи · дети до 12 лет бесплатно",
        highlights: [
          "Twin Garden Room с патио",
          "Завтрак для всей семьи",
          "Детское приветственное угощение",
          "Бесплатный трансфер из аэропорта",
          "Экскурсия на острова Гили",
          "Поздний выезд до 14:00",
        ],
        cta: "Забронировать для семьи",
      },
      {
        id: "longstay",
        tag: "Лучшая цена",
        title: "Длительное проживание",
        subtitle: "7+ ночей",
        duration: "7+ ночей",
        guests: "1–2 взрослых",
        price: "−20%",
        priceNote: "скидка на стандартный тариф · от 7 ночей",
        highlights: [
          "Любой тип номера на выбор",
          "Завтрак включён каждый день",
          "Бесплатная прачечная",
          "Скидка 20% на все услуги ресторана",
          "Персональный менеджер",
          "Гибкие условия отмены",
        ],
        cta: "Узнать о скидке",
      },
    ],
  },
  attractions: {
    sectionNum: "09 — Досуг",
    title1: "Исследуйте",
    title2: "Ломбок",
    subtitle: "Сенггиги — идеальная база для исследования острова. Пляжи мирового класса, острова Гили, вулкан Ринджани и древние храмы — всё это в нескольких минутах от резорта.",
    distLabel: "От резорта",
    ctaBook: "Забронировать экскурсию",
    categories: {
      beaches: "Пляжи",
      diving: "Дайвинг и снорклинг",
      culture: "Культура",
      islands: "Острова Гили",
      adventure: "Приключения",
      dining: "Рестораны",
    },
    items: [
      {
        category: "beaches",
        title: "Пляж Бату-Болонг",
        desc: "Один из лучших пляжей Ломбока с черным песком. Идеальное место для сёрфинга, снорклинга и встречи заката.",
        dist: "5 мин пешком",
        duration: "Целый день",
      },
      {
        category: "diving",
        title: "Дайвинг в Сенггиги",
        desc: "Богатый подводный мир: черепаховые рифы, морские черепахи и тропические рыбы. Для начинающих и опытных.",
        dist: "10 мин на авто",
        duration: "2–4 часа",
      },
      {
        category: "islands",
        title: "Острова Гили",
        desc: "Три райских острова с белоснежными пляжами и прозрачной водой. Доступны на пароме или быстроходном катере.",
        dist: "2 часа на пароме",
        duration: "1–2 дня",
      },
      {
        category: "adventure",
        title: "Вулкан Ринджани",
        desc: "Восхождение на действующий вулкан — одно из самых зрелищных приключений Ломбока. Старт в 3:00 ночи.",
        dist: "2 часа на авто",
        duration: "8–10 часов",
      },
      {
        category: "culture",
        title: "Храм Пура Лонггар",
        desc: "Древнейший храм Ломбока с уникальной сасакской архитектурой. Центр традиционной культуры.",
        dist: "30 мин на авто",
        duration: "2–3 часа",
      },
      {
        category: "beaches",
        title: "Пляж Мангсит-Бич",
        desc: "Дикий пляж с розовым песком и кристальной водой. Одно из самых фотогеничных мест Ломбока.",
        dist: "45 мин на авто",
        duration: "Полдня",
      },
      {
        category: "adventure",
        title: "Сёрфинг в Сенггиги",
        desc: "Волны для начинающих и опытных сёрферов. Инструкторы доступны прямо на пляже Бату-Болонг.",
        dist: "5 мин пешком",
        duration: "2–4 часа",
      },
      {
        category: "culture",
        title: "Деревня сасаков",
        desc: "Традиционные деревни коренных жителей Ломбока. Уникальная архитектура, традиции и ремёсла.",
        dist: "1 час на авто",
        duration: "3–4 часа",
      },
      {
        category: "diving",
        title: "Снорклинг на Гили Мено",
        desc: "Прозрачные воды, множество рыб и кораллов. Одно из лучших мест для снорклинга в Индонезии.",
        dist: "2 часа на пароме",
        duration: "1 день",
      },
    ],
  },
};

const en: Translations = {
  nav: {
    about: "About", gallery: "Gallery", rooms: "Rooms", booking: "Book Now",
    amenities: "Amenities", restaurant: "Restaurant", faq: "FAQ", reviews: "Reviews",
    contacts: "Contact", bookNow: "Book Now", attractions: "Explore", videoGallery: "Video", specialOffers: "Offers",
  },
  hero: {
    location: "Senggigi · Lombok · Indonesia",
    subtitle: "Your private tropical oasis. Surrounded by lush gardens, just 5 minutes from Batu Bolong Beach.",
    ratingLabel: "Exceptional",
    ratingCount: "113 reviews · Booking.com",
    ctaBook: "Book Now",
    ctaLearn: "Discover More",
    scrollLabel: "Scroll",
  },
  about: {
    sectionNum: "01 — About",
    title1: "A Tropical",
    title2: "Senggigi Oasis",
    quote: "«We created this place so every guest feels at home — but better»",
    quoteAuthor: "— Sunny, founder of Sasak Garden Resort",
    p1: "Sasak Garden Resort is a boutique resort in the heart of Senggigi, surrounded by lush tropical gardens. Every corner is crafted with attention to detail: from traditional Balinese bungalows to a crystal-clear pool overlooking the garden.",
    p2: "Just a 5-minute walk from Batu Bolong Beach, the resort offers the perfect blend of seclusion and island life. Our multilingual staff — speaking 5 languages including English and Russian — provides impeccable service 24/7.",
    stat1Val: "9.9", stat1Label: "Rating",
    stat2Val: "113", stat2Label: "Reviews",
    stat3Val: "5 min", stat3Label: "To Beach",
    stat4Val: "24/7", stat4Label: "Service",
    learnMore: "Learn more about the resort",
  },
  gallery: {
    sectionNum: "02 — Gallery",
    title1: "Beauty",
    title2: "in every frame",
    subtitle: "Tropical gardens, crystal pool, cosy bungalows — immerse yourself in the Sasak Garden atmosphere.",
    viewAll: "View all photos",
  },
  rooms: {
    sectionNum: "03 — Rooms",
    title1: "Your",
    title2: "perfect room",
    subtitle: "Two room types with thoughtful amenities and views of the tropical garden.",
    from: "from",
    perNight: "/ night",
    bookRoom: "Book this room",
    compareTitle: "Room Comparison",
    compareSubtitle: "Choose the perfect option for your stay",
    feature: "Feature",
    kingName: "King-Size Suite",
    twinName: "Twin Garden Room",
    features: {
      size: "Size", bed: "Bed", guests: "Guests", view: "View",
      ac: "Air Con", tv: "Smart TV", wifi: "Wi-Fi", shower: "Shower",
      breakfast: "Breakfast", balcony: "Balcony",
    },
    kingValues: {
      size: "35 m²", bed: "King-Size", guests: "2 adults", view: "Garden + Pool",
      ac: "✓", tv: "4K Netflix", wifi: "200 Mbps", shower: "Hot/Cold",
      breakfast: "À la carte", balcony: "Terrace",
    },
    twinValues: {
      size: "28 m²", bed: "2 × Twin", guests: "2 adults", view: "Tropical Garden",
      ac: "✓", tv: "4K Netflix", wifi: "200 Mbps", shower: "Hot/Cold",
      breakfast: "À la carte", balcony: "Patio",
    },
  },
  bookingWidget: {
    title: "Check Room Availability",
    nights1: "night", nights2: "nights", nights5: "nights",
    checkin: "Check-in", checkout: "Check-out",
    adults: "Adults", children: "Children", roomsLabel: "Rooms",
    cta: "Find a Room",
    secure: "Secure booking",
    freeCancel: "Free cancellation",
    instant: "Instant confirmation",
    via: "Via Booking.com",
  },
  bookingSection: {
    sectionLabel: "Online Booking",
    title1: "Your", title2: "perfect", title3: "getaway",
    desc: "Select your dates and guests — we'll redirect you to Booking.com for secure checkout.",
    badge1: "Free cancellation up to 24h",
    badge2: "Instant confirmation",
    badge3: "Best price guaranteed",
    badge4: "Score 9.9 · 113 reviews",
  },
  amenities: {
    sectionNum: "04 — Amenities",
    title1: "65+ amenities",
    title2: "for your comfort",
    subtitle: "Thoughtful amenities rated 9.9/10 by guests. Every detail is designed to make your stay perfect.",
    langTitle: "Staff speaks",
    langCount: "5 languages",
    languages: ["Russian", "English", "Indonesian", "Ukrainian", "Filipino"],
    categories: {
      pool: "Pool & Leisure", dining: "Dining", room: "Room", bathroom: "Bathroom",
      media: "Internet & TV", parking: "Parking & Transport", service: "Services", security: "Security",
    },
  },
  restaurant: {
    sectionNum: "05 — Restaurant",
    title1: "Taste of",
    title2: "Indonesia",
    desc: "Our restaurant offers the best of Indonesian, Mediterranean and American cuisine. Breakfast is served à la carte from 7:00 to 10:00. Room service is available around the clock.",
    cta: "Reserve a table",
    menuTitle: "Featured Dishes",
    categories: { breakfast: "Breakfast", mains: "Main Courses", drinks: "Beverages", desserts: "Desserts" },
  },
  reviews: {
    sectionNum: "06 — Reviews",
    title1: "What our",
    title2: "guests say",
    overallLabel: "Exceptional · 113 reviews",
    ctaAll: "Read all 113 reviews",
    ratingLabels: {
      staff: "Staff", facilities: "Facilities", cleanliness: "Cleanliness",
      comfort: "Comfort", value: "Value", location: "Location",
    },
  },
  faq: {
    sectionNum: "07 — FAQ",
    title1: "Frequently Asked",
    title2: "Questions",
    subtitle: "Answers to our guests' most common questions. Didn't find what you need? Contact us directly.",
    ctaContact: "Ask via WhatsApp",
    questions: [
      {
        q: "Is there free parking on site?",
        a: "Yes, Sasak Garden Resort offers free private parking for all guests. Parking spaces are located right at the entrance and are monitored 24/7. No advance booking is required for a parking spot.",
      },
      {
        q: "Are pets allowed?",
        a: "Unfortunately, pets are not permitted at Sasak Garden Resort. This policy is in place to ensure the comfort of all guests and to protect our tropical garden ecosystem. If you have special circumstances, please contact us in advance.",
      },
      {
        q: "Is airport transfer available?",
        a: "Yes, we arrange transfers to and from Lombok International Airport (LOP). The service is paid and must be booked in advance. The price depends on the vehicle type. To book, contact us via WhatsApp: +62 819-1777-6161.",
      },
      {
        q: "What are the check-in and check-out times?",
        a: "Standard check-in is at 14:00 and check-out is at 12:00. Early check-in (from 10:00) and late check-out (until 16:00) are available subject to room availability and incur an additional charge. Free luggage storage is available after check-out.",
      },
      {
        q: "Is breakfast included in the room rate?",
        a: "Breakfast is not automatically included but is available à la carte in our restaurant from 7:00 to 10:00. The menu features Indonesian, American and vegetarian options. Breakfast starts from 50,000 IDR per person.",
      },
      {
        q: "Is there a pool? What are the opening hours?",
        a: "Yes, the resort has an outdoor pool with views of the tropical garden. The pool is open to guests from 7:00 to 22:00. Pool access is free for all staying guests. Sun loungers and umbrellas are provided at no extra charge.",
      },
      {
        q: "What is the Wi-Fi speed?",
        a: "High-speed Wi-Fi (up to 200 Mbps) is available free of charge throughout the resort — in rooms, by the pool and in the restaurant. The network password is provided at check-in.",
      },
      {
        q: "How far is the beach?",
        a: "Batu Bolong Beach is just a 5-minute walk from the resort. Our staff will be happy to point you in the right direction and recommend the best spots for surfing and snorkelling around Senggigi.",
      },
      {
        q: "What is the cancellation policy?",
        a: "Cancellation terms depend on the rate selected at the time of booking. Most rates allow free cancellation 24–48 hours before check-in. Exact terms are shown on the Booking.com reservation page.",
      },
      {
        q: "Does the staff speak English?",
        a: "Absolutely! Our staff speaks English fluently. In addition to English, the team speaks Russian, Indonesian, Ukrainian and Filipino — so we're ready to welcome guests from all over the world.",
      },
    ],
  },
  contact: {
    sectionNum: "08 — Location",
    title1: "Find us",
    title2: "in Senggigi",
    addressLabel: "Address",
    address: "Jl. Raya Senggigi No. 14\nSenggigi, Lombok Barat\nNusa Tenggara Barat 83355\nIndonesia",
    phoneLabel: "Phone",
    emailLabel: "Email",
    checkinLabel: "Check-in",
    checkin: "14:00",
    checkoutLabel: "Check-out",
    checkout: "12:00",
    nearby: [
      { place: "Batu Bolong Beach", dist: "5 min walk" },
      { place: "Senggigi Centre", dist: "10 min walk" },
      { place: "Lombok Airport", dist: "45 min by car" },
    ],
    ctaTitle: "Book",
    ctaSubtitle: " today",
    ctaDesc: "Score 9.9 · 113 reviews · Best price guaranteed on Booking.com",
    ctaBtn: "Check Availability",
  },
  footer: {
    tagline: "Boutique resort in the tropical gardens of Senggigi. Score 9.9 · 113 reviews on Booking.com.",
    navTitle: "Navigation",
    infoTitle: "Information",
    bookingTitle: "Reservations",
    bookingDesc: "Best price guaranteed when booking through Booking.com",
    bookingBtn: "Book Now",
    copyright: "All rights reserved.",
    infoLinks: ["Cancellation Policy", "House Rules", "Privacy Policy", "Special Offers", "Corporate Rates"],
    navLinks: [
      { label: "About", href: "#about" },
      { label: "Gallery", href: "#gallery" },
      { label: "Rooms", href: "#rooms" },
      { label: "Amenities", href: "#amenities" },
      { label: "Restaurant", href: "#restaurant" },
      { label: "Reviews", href: "#reviews" },
    ],
  },
  floatingBar: {
    subtitle: "Senggigi · Lombok · Score 9.9",
    ratingLabel: "Exceptional · 113 reviews",
    cta: "Book Now",
  },
  videoGallery: {
    sectionNum: "10 — Video",
    title1: "Resort",
    title2: "in motion",
    subtitle: "Experience the atmosphere of Sasak Garden Resort through video. Tropical garden, pool, rooms and surroundings — all in one place.",
    playLabel: "Watch",
    closeLabel: "Close",
    prevLabel: "Previous",
    nextLabel: "Next",
    videoLabels: [
      "Resort Grounds",
      "Tropical Garden",
      "Pool & Leisure",
      "Rooms & Interior",
      "Restaurant & Breakfast",
      "Surrounding Views",
      "Resort Atmosphere",
    ],
  },
  attractions: {
    sectionNum: "09 — Explore",
    title1: "Explore",
    title2: "Lombok",
    subtitle: "Senggigi is the perfect base for exploring the island. World-class beaches, the Gili Islands, Mount Rinjani and ancient temples — all just minutes from the resort.",
    distLabel: "From resort",
    ctaBook: "Book Excursion",
    categories: {
      beaches: "Beaches",
      diving: "Diving & Snorkelling",
      culture: "Culture",
      islands: "Gili Islands",
      adventure: "Adventure",
      dining: "Dining",
    },
    items: [
      {
        category: "beaches",
        title: "Batu Bolong Beach",
        desc: "One of Lombok's finest beaches with black sand. Perfect for surfing, snorkelling and watching the sunset.",
        dist: "5 min walk",
        duration: "All day",
      },
      {
        category: "diving",
        title: "Senggigi Diving",
        desc: "Rich underwater world: coral reefs, sea turtles and tropical fish. Suitable for beginners and experienced divers.",
        dist: "10 min by car",
        duration: "2–4 hours",
      },
      {
        category: "islands",
        title: "Gili Islands",
        desc: "Three paradise islands with white-sand beaches and crystal-clear water. Accessible by ferry or speedboat.",
        dist: "2 hrs by ferry",
        duration: "1–2 days",
      },
      {
        category: "adventure",
        title: "Mount Rinjani",
        desc: "Trekking to an active volcano — one of Lombok's most spectacular adventures. Departs at 3:00 AM.",
        dist: "2 hrs by car",
        duration: "8–10 hours",
      },
      {
        category: "culture",
        title: "Pura Longgear Temple",
        desc: "Lombok's oldest temple with unique Sasak architecture. A centre of traditional culture and heritage.",
        dist: "30 min by car",
        duration: "2–3 hours",
      },
      {
        category: "beaches",
        title: "Mawun Beach",
        desc: "A wild beach with pink sand and crystal-clear water. One of the most photogenic spots on Lombok.",
        dist: "45 min by car",
        duration: "Half day",
      },
      {
        category: "adventure",
        title: "Surfing in Senggigi",
        desc: "Waves for beginners and experienced surfers alike. Instructors available right on Batu Bolong Beach.",
        dist: "5 min walk",
        duration: "2–4 hours",
      },
      {
        category: "culture",
        title: "Sasak Villages",
        desc: "Traditional villages of Lombok's indigenous people. Unique architecture, customs and crafts.",
        dist: "1 hr by car",
        duration: "3–4 hours",
      },
      {
        category: "diving",
        title: "Gili Meno Snorkelling",
        desc: "Crystal-clear waters, abundant fish and corals. One of Indonesia's best snorkelling spots.",
        dist: "2 hrs by ferry",
        duration: "1 day",
      },
    ],
  },
  specialOffers: {
    sectionNum: "09 — Special Offers",
    title1: "Special",
    title2: "Packages",
    subtitle: "Exclusive packages for an unforgettable stay. Limited availability — book in advance.",
    badge: "Limited Offer",
    ctaBook: "Book Package",
    ctaDetails: "Details",
    limitedLabel: "Spots left",
    packages: [
      {
        id: "romantic",
        tag: "Most Popular",
        title: "Romantic Weekend",
        subtitle: "For Two",
        duration: "2 nights",
        guests: "2 adults",
        price: "from $89",
        priceNote: "for 2 nights · all package services included",
        highlights: [
          "King-Size Suite with garden view",
          "Breakfast in bed for two",
          "Champagne on arrival",
          "Late check-out until 14:00",
          "Room decorated with flowers",
          "Private dinner by the pool",
        ],
        cta: "Book Romance",
      },
      {
        id: "family",
        tag: "Family",
        title: "Family Holiday",
        subtitle: "For the Whole Family",
        duration: "3 nights",
        guests: "2 adults + children",
        price: "from $120",
        priceNote: "for 3 nights · children under 12 stay free",
        highlights: [
          "Twin Garden Room with patio",
          "Breakfast for the whole family",
          "Children's welcome treat",
          "Free airport transfer",
          "Gili Islands excursion",
          "Late check-out until 14:00",
        ],
        cta: "Book for Family",
      },
      {
        id: "longstay",
        tag: "Best Value",
        title: "Long Stay",
        subtitle: "7+ nights",
        duration: "7+ nights",
        guests: "1–2 adults",
        price: "−20%",
        priceNote: "discount on standard rate · from 7 nights",
        highlights: [
          "Any room type of your choice",
          "Breakfast included every day",
          "Free laundry service",
          "20% off all restaurant services",
          "Personal concierge",
          "Flexible cancellation",
        ],
        cta: "Get Discount",
      },
    ],
  },
};

export const translations: Record<Lang, Translations> = { ru, en };

// ---- Context ----
interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextValue>({
  lang: "ru",
  setLang: () => {},
  t: ru,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ru");
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
