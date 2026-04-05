export const WEDDING_DATE_ISO = "2026-07-04T15:00:00+03:00";
export const HEART_SYMBOL = "♥";

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDCcOYnGQksJUe6P-kKlUEOtmsIXdBwH4E",
  authDomain: "wedding-invite-51714.firebaseapp.com",
  projectId: "wedding-invite-51714",
  storageBucket: "wedding-invite-51714.firebasestorage.app",
  messagingSenderId: "881433018362",
  appId: "1:881433018362:web:5c573164a8ea308004ee43",
};

export const HERO_CONTENT = {
  title: "Михаил & София",
  dateLine: "4 июля 2026 года · начало в 15:00",
  scrollHintTarget: "#hero-message",
};

export const COUNTDOWN_CONTENT = {
  prefixLabel: "До свадьбы осталось",
  todayLabel: "Сегодня наш день ♥",
  shortLabels: {
    days: "дн.",
    hours: "ч.",
    minutes: "мин.",
  },
  parts: [
    { key: "days", label: "дней:" },
    { key: "hours", label: "часов:" },
    { key: "minutes", label: "минут:" },
  ],
};

export const DATE_CONTENT = {
  dayLabel: "04",
  yearLabel: "2026",
  monthLabel: "июля",
  monthCalendarLabel: "Июль 2026",
  monthEditorialLabel: "июль",
  weekdaysFull: [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ],
  monthGridWeekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
};

export const WARM_INTRO_CONTENT = {
  overline: "Свадебное приглашение",
  openLabel: "Открыть",
  openSublabel: "приглашение",
};

export const SECTIONS_TEXT = {
  dateTitle: "Дата нашего дня",
  programTitle: "Программа дня",
  venueTitle: "Место проведения",
  detailsTitle: "Детали",
  contactsTitle: "Контакты",
  rsvpTitle: "Подтверждение присутствия",
};

export const RSVP_COLLECTION_NAME = "rsvp";

export const PROGRAM_ITEMS = [
  { time: "15:00", text: "Сбор гостей в welcome-зоне, фуршет" },
  { time: "16:00", text: "Начало торжества, аперитив" },
  { time: "17:00", text: "Банкет, поздравления" },
  { time: "18:00", text: "Праздничная программа" },
  { time: "20:00", text: "Вынос торта" },
  { time: "21:00", text: "Танцы" },
  { time: "23:00", text: "Финал" },
];

export const VENUE_CONTENT = {
  name: "Dolce Villa",
  location: "Терпигорьево, Московская область",
  imageAlt: "Отель и свадебный зал",
  mapButtonLabel: "Открыть карту",
  mapUrl: "https://yandex.ru/maps/-/CPBiR--a",
};

export const DRESS_CODE_CONTENT = {
  sectionTitle: "Дресс-код",
  intro:
    "Будем рады образам в светлой, приглушенной гамме — молочные, песочные, пудровые и дымчато-голубые оттенки.",
  paletteTitle: "Рекомендуемая палитра",
  summary:
    "Подойдут лаконичные платья, костюмы или комплекты в спокойном стиле из легких матовых тканей; избегайте неоновых оттенков, total black и крупного принта.",
  note:
    "Если у вас есть сомнения по образу, ориентируйтесь на эффект мягкой элегантности без резких контрастов.",
  swatches: [
    { label: "Молочный", color: "#f4eee6" },
    { label: "Шампань", color: "#e9dcc7" },
    { label: "Песочный", color: "#d8c0a0" },
    { label: "Пудровый", color: "#d9c0c6" },
    { label: "Дымчато-голубой", color: "#b8c6d1" },
  ],
};

export const RSVP_CONTENT = {
  intro: "Пожалуйста, заполните анкету ниже.",
  successMessage:
    "Ваш ответ отправлен. Если что-то изменится, заполните анкету заново.",
  successAction: "Отправить заново",
  submitLabel: "Отправить",
  submittingLabel: "Отправка...",
  requiredError: "Пожалуйста, заполните обязательные поля.",
  guestNameError: "Укажите имя и фамилию гостя.",
  submitError: "Не удалось отправить форму. Попробуйте еще раз.",
  fields: {
    firstName: "Имя *",
    lastName: "Фамилия *",
    guestName: "ФИО того, с кем будете",
    alcoholOther: "Другое",
  },
  questions: {
    willCome: {
      label: "Вы придете? *",
      ariaLabel: "Вы придете?",
    },
    withGuest: {
      label: "Вы будете с кем-то? *",
      ariaLabel: "Вы будете с кем-то?",
    },
    alcohol: {
      label: "Какой алкоголь будете пить?",
      ariaLabel: "Какой алкоголь будете пить?",
    },
  },
  options: {
    yes: "Да",
    no: "Нет",
    alcohol: ["Вино белое", "Вино красное", "Водка", "Виски", "Коньяк"],
  },
};

export const CONTACTS_CONTENT = {
  telegramLabel: "Telegram",
};

export const CONTACTS = [
  {
    name: "Михаил",
    phone: "+7 777 777-77-77",
    tel: "tel:+77777777777",
    telegram: "tg://resolve?phone=77777777777",
  },
  {
    name: "София",
    phone: "+7 888 888-88-88",
    tel: "tel:+78888888888",
    telegram: "tg://resolve?phone=78888888888",
  },
];

export const VARIANT_SWITCHER_CONTENT = {
  ariaLabel: "Варианты текста приглашения",
  pillPrefix: "Вариант",
};

export const AMBIENT_CONFIG = {
  petalsCount: 14,
  twinkleStars: [
    "large",
    "small",
    "",
    "small",
    "",
    "small",
    "large",
    "small",
    "",
    "small",
    "",
    "small",
    "large",
    "",
    "small",
    "",
    "small",
    "large",
    "",
    "small",
  ],
};

export const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  willCome: "",
  withGuest: "",
  guestName: "",
  alcohol: [],
  alcoholOther: "",
};

export const SHARED_VARIANT_CONTENT = {
  preview: "Спокойный, торжественный текст",
  meta: {
    title: "Михаил & София — свадебное приглашение",
    description: "Свадебное приглашение Михаила и Софии на 4 июля 2026 года.",
  },
  hero: {
    kicker: "Классический вечер",
    subtitle: "Свадебное приглашение",
    appeal: "Дорогие гости!",
    note:
      "Приглашаем вас разделить с нами торжество, посвященное дню нашей свадьбы. Для нас будет огромной радостью провести этот счастливый день в кругу самых близких и дорогих людей.",
  },
  venueDescription:
    "Романтичное место с потрясающим видом и необыкновенными закатами.",
  details: [
    "Свои теплые слова и пожелания приносите в сердцах, а подарки, если захотите, можно подготовить в конверте.",
    "Вместо цветов мы будем рады бутылочке вина, которую однажды с удовольствием откроем и вспомним этот день.",
  ],
  rsvpIntro: RSVP_CONTENT.intro,
  contactsNote: "Если появятся вопросы, свяжитесь с нами:",
  footer: "С любовью, Михаил и София",
};

export const VARIANT_LABELS = {
  classic: "Классический",
  warm: "Теплый",
  modern: "Современный",
  minimal: "Сдержанный",
  scenic: "Пятый",
};
