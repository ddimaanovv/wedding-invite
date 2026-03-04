import { startTransition, useEffect, useRef, useState } from "react";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import dovePng from "./assets/dove.webp";
import flowersPng from "./assets/flowers.webp";
import heartSvg from "./assets/heart.svg";
import ringsPng from "./assets/rings.webp";
import scrollArrowSvg from "./assets/scroll-arrow.svg";
import radisson from "./assets/radisson.webp";
import mainPhoto1 from "./assets/main-photo-1.png";
import mainPhoto2 from "./assets/main-photo-2.avif";
import mainPhoto3 from "./assets/main-photo-3.png";
import mainPhoto4 from "./assets/main-photo-4.avif";
import mainPhoto5 from "./assets/main-photo-5.png";
import {
  DEFAULT_VARIANT_KEY,
  WEDDING_VARIANTS,
  getWeddingVariant,
} from "./variants";

const WEDDING_DATE = new Date("2026-07-04T15:00:00+03:00");
const COUNTDOWN_PREFIX_LABEL = "\u0414\u043e \u0441\u0432\u0430\u0434\u044c\u0431\u044b \u043e\u0441\u0442\u0430\u043b\u043e\u0441\u044c";
const COUNTDOWN_TODAY_LABEL = "\u0421\u0435\u0433\u043e\u0434\u043d\u044f \u043d\u0430\u0448 \u0434\u0435\u043d\u044c \u2665";
const COUNTDOWN_PARTS = [
  { key: "days", label: "\u0434\u043d\u0435\u0439:" },
  { key: "hours", label: "\u0447\u0430\u0441\u043e\u0432:" },
  { key: "minutes", label: "\u043c\u0438\u043d\u0443\u0442:" },
];
const MINIMAL_DRESS_CODE_TITLE = "\u0414\u0440\u0435\u0441\u0441-\u043a\u043e\u0434";
const MINIMAL_DRESS_CODE_INTRO = "\u0411\u0443\u0434\u0435\u043c \u0440\u0430\u0434\u044b \u043e\u0431\u0440\u0430\u0437\u0430\u043c \u0432 \u0441\u0432\u0435\u0442\u043b\u043e\u0439, \u043f\u0440\u0438\u0433\u043b\u0443\u0448\u0435\u043d\u043d\u043e\u0439 \u0433\u0430\u043c\u043c\u0435 \u2014 \u043c\u043e\u043b\u043e\u0447\u043d\u044b\u0435, \u043f\u0435\u0441\u043e\u0447\u043d\u044b\u0435, \u043f\u0443\u0434\u0440\u043e\u0432\u044b\u0435 \u0438 \u0434\u044b\u043c\u0447\u0430\u0442\u043e-\u0433\u043e\u043b\u0443\u0431\u044b\u0435 \u043e\u0442\u0442\u0435\u043d\u043a\u0438.";
const MINIMAL_DRESS_CODE_PALETTE_TITLE = "\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0443\u0435\u043c\u0430\u044f \u043f\u0430\u043b\u0438\u0442\u0440\u0430";
const MINIMAL_DRESS_CODE_SUMMARY = "\u041f\u043e\u0434\u043e\u0439\u0434\u0443\u0442 \u043b\u0430\u043a\u043e\u043d\u0438\u0447\u043d\u044b\u0435 \u043f\u043b\u0430\u0442\u044c\u044f, \u043a\u043e\u0441\u0442\u044e\u043c\u044b \u0438\u043b\u0438 \u043a\u043e\u043c\u043f\u043b\u0435\u043a\u0442\u044b \u0432 \u0441\u043f\u043e\u043a\u043e\u0439\u043d\u043e\u043c \u0441\u0442\u0438\u043b\u0435 \u0438\u0437 \u043b\u0435\u0433\u043a\u0438\u0445 \u043c\u0430\u0442\u043e\u0432\u044b\u0445 \u0442\u043a\u0430\u043d\u0435\u0439; \u0438\u0437\u0431\u0435\u0433\u0430\u0439\u0442\u0435 \u043d\u0435\u043e\u043d\u043e\u0432\u044b\u0445 \u043e\u0442\u0442\u0435\u043d\u043a\u043e\u0432, total black \u0438 \u043a\u0440\u0443\u043f\u043d\u043e\u0433\u043e \u043f\u0440\u0438\u043d\u0442\u0430.";
const MINIMAL_DRESS_CODE_NOTE = "\u0415\u0441\u043b\u0438 \u0443 \u0432\u0430\u0441 \u0435\u0441\u0442\u044c \u0441\u043e\u043c\u043d\u0435\u043d\u0438\u044f \u043f\u043e \u043e\u0431\u0440\u0430\u0437\u0443, \u043e\u0440\u0438\u0435\u043d\u0442\u0438\u0440\u0443\u0439\u0442\u0435\u0441\u044c \u043d\u0430 \u044d\u0444\u0444\u0435\u043a\u0442 \u043c\u044f\u0433\u043a\u043e\u0439 \u044d\u043b\u0435\u0433\u0430\u043d\u0442\u043d\u043e\u0441\u0442\u0438 \u0431\u0435\u0437 \u0440\u0435\u0437\u043a\u0438\u0445 \u043a\u043e\u043d\u0442\u0440\u0430\u0441\u0442\u043e\u0432.";
const MINIMAL_DRESS_CODE_SWATCHES = [
  { label: "\u041c\u043e\u043b\u043e\u0447\u043d\u044b\u0439", color: "#f4eee6" },
  { label: "\u0428\u0430\u043c\u043f\u0430\u043d\u044c", color: "#e9dcc7" },
  { label: "\u041f\u0435\u0441\u043e\u0447\u043d\u044b\u0439", color: "#d8c0a0" },
  { label: "\u041f\u0443\u0434\u0440\u043e\u0432\u044b\u0439", color: "#d9c0c6" },
  { label: "\u0414\u044b\u043c\u0447\u0430\u0442\u043e-\u0433\u043e\u043b\u0443\u0431\u043e\u0439", color: "#b8c6d1" },
];
const WEEKDAYS = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];
const MONTH_LABEL = "июля";
const MONTH_CALENDAR_LABEL = "\u0418\u044e\u043b\u044c 2026";
const MONTH_EDITORIAL_LABEL = "\u0438\u044e\u043b\u044c";
const DATE_FULL_LABEL = `4 ${MONTH_LABEL} 2026`;
const MONTH_GRID_WEEKDAYS = ["\u041f\u043d", "\u0412\u0442", "\u0421\u0440", "\u0427\u0442", "\u041f\u0442", "\u0421\u0431", "\u0412\u0441"];
const WARM_INTRO_OVERLINE = "\u0421\u0432\u0430\u0434\u0435\u0431\u043d\u043e\u0435 \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435";
const WARM_INTRO_MONOGRAM = "\u041c & \u0421";
const WARM_INTRO_NAMES = "\u041c\u0438\u0445\u0430\u0438\u043b & \u0421\u043e\u0444\u0438\u044f";
const WARM_INTRO_SUBTITLE = "\u0421\u0432\u0430\u0434\u0435\u0431\u043d\u043e\u0435 \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435";
const WARM_INTRO_OPEN_LABEL = "\u041e\u0442\u043a\u0440\u044b\u0442\u044c";
const WARM_INTRO_OPEN_SUBLABEL = "\u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435";
const PROGRAM_ITEMS = [
  { time: "15:00", text: "Сбор гостей в welcome-зоне, фуршет" },
  { time: "16:00", text: "Начало торжества, аперитив" },
  { time: "17:00", text: "Банкет, поздравления" },
  { time: "18:00", text: "Праздничная программа" },
  { time: "20:00", text: "Вынос торта" },
  { time: "21:00", text: "Танцы" },
  { time: "23:00", text: "Финал" },
];
const CONTACTS = [
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

const firebaseConfig = {
  apiKey: "AIzaSyDCcOYnGQksJUe6P-kKlUEOtmsIXdBwH4E",
  authDomain: "wedding-invite-51714.firebaseapp.com",
  projectId: "wedding-invite-51714",
  storageBucket: "wedding-invite-51714.firebasestorage.app",
  messagingSenderId: "881433018362",
  appId: "1:881433018362:web:5c573164a8ea308004ee43",
};

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const ALCOHOL_OPTIONS = [
  "Вино белое",
  "Вино красное",
  "Водка",
  "Виски",
  "Коньяк",
];

const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  willCome: "",
  withGuest: "",
  guestName: "",
  alcohol: [],
  alcoholOther: "",
};

const AMBIENT_TWINKLE_STARS = [
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
];

const HERO_PHOTOS_BY_VARIANT = {
  classic: mainPhoto1,
  warm: mainPhoto2,
  modern: mainPhoto3,
  minimal: mainPhoto4,
  scenic: mainPhoto5,
};

const CALENDAR = createCalendarData(WEDDING_DATE);
const MONTH_GRID = createMonthGridData(WEDDING_DATE);

function createCalendarData(date) {
  const prev = new Date(date);
  const next = new Date(date);
  prev.setDate(prev.getDate() - 1);
  next.setDate(next.getDate() + 1);

  return {
    prevDate: prev.getDate(),
    mainDate: date.getDate(),
    nextDate: next.getDate(),
    prevWeekday: WEEKDAYS[prev.getDay()],
    mainWeekday: WEEKDAYS[date.getDay()],
    nextWeekday: WEEKDAYS[next.getDay()],
  };
}

function createMonthGridData(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingEmptyDays = (firstDay.getDay() + 6) % 7;
  const cells = [];

  for (let index = 0; index < leadingEmptyDays; index += 1) {
    cells.push({ key: `empty-start-${index}`, label: "", isEmpty: true });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      key: `day-${day}`,
      label: String(day),
      isActive: day === date.getDate(),
      isEmpty: false,
    });
  }

  const trailingEmptyDays = (7 - (cells.length % 7 || 7)) % 7;

  for (let index = 0; index < trailingEmptyDays; index += 1) {
    cells.push({ key: `empty-end-${index}`, label: "", isEmpty: true });
  }

  return cells;
}

function getCountdownState() {
  const now = new Date();
  const diff = WEDDING_DATE - now;

  if (diff <= 0) {
    return {
      status: "today",
      days: 0,
      hours: 0,
      minutes: 0,
    };
  }

  return {
    status: "counting",
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
  };
}

function getCountdownText(countdown) {
  if (countdown.status === "today") {
    return COUNTDOWN_TODAY_LABEL;
  }

  return `${COUNTDOWN_PREFIX_LABEL} ${countdown.days} \u0434\u043d. ${countdown.hours} \u0447. ${countdown.minutes} \u043c\u0438\u043d.`;
}
function renderCountdownPanel(countdown, className = "") {
  const panelClassName = className
    ? `countdown-panel ${className}`
    : "countdown-panel";

  return (
    <div className={panelClassName} aria-label={COUNTDOWN_PREFIX_LABEL}>
      {countdown.status === "today" ? (
        <p className="details-text countdown countdown-panel-message">
          {COUNTDOWN_TODAY_LABEL}
        </p>
      ) : (
        <div className="countdown-grid">
          {COUNTDOWN_PARTS.map((part) => (
            <article className="countdown-unit" key={part.key}>
              <span className="countdown-label">{part.label}</span>
              <span className="countdown-value">{countdown[part.key]}</span>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
function renderDressCodeSection(variantKey) {
  if (variantKey !== "minimal") {
    return null;
  }

  return (
    <section className="fade" id="dress-code">
      <div className="glass dress-code-card">
        <h2>{MINIMAL_DRESS_CODE_TITLE}</h2>
        <div className="gold-line" />
        <p className="dress-code-intro">{MINIMAL_DRESS_CODE_INTRO}</p>

        <div className="dress-code-palette">
          <p className="dress-code-panel-title">
            {MINIMAL_DRESS_CODE_PALETTE_TITLE}
          </p>
          <div className="dress-code-swatches">
            {MINIMAL_DRESS_CODE_SWATCHES.map((swatch) => (
              <article className="dress-code-swatch" key={swatch.label}>
                <span
                  className="dress-code-swatch-chip"
                  style={{ "--swatch-color": swatch.color }}
                />
                <span className="dress-code-swatch-name">{swatch.label}</span>
              </article>
            ))}
          </div>
        </div>

        <p className="dress-code-summary">{MINIMAL_DRESS_CODE_SUMMARY}</p>
        <p className="dress-code-note">{MINIMAL_DRESS_CODE_NOTE}</p>
      </div>
    </section>
  );
}
function renderDateDetails(variantKey, countdown) {
  if (variantKey === "warm") {
    return (
      <>
        <div className="date-showcase date-showcase-simple">
          <div className="date-simple-day">04</div>
          <div className="date-simple-copy">
            <p className="date-eyebrow">{CALENDAR.mainWeekday}</p>
            <p className="date-main">{MONTH_CALENDAR_LABEL}</p>
          </div>
        </div>
        <p className="details-text countdown">{getCountdownText(countdown)}</p>
      </>
    );
  }

  if (variantKey === "modern") {
    return (
      <>
        <div className="date-showcase date-showcase-editorial">
          <div className="date-editorial-stack">
            <div className="date-editorial-day">04</div>
            <span className="date-editorial-kicker">{MONTH_EDITORIAL_LABEL}</span>
            <span className="date-editorial-meta">2026</span>
            <span className="date-editorial-kicker">{CALENDAR.mainWeekday}</span>
          </div>
        </div>
      </>
    );
  }

  if (variantKey === "minimal") {
    return (
      <>
        <div className="date-showcase date-showcase-month">
          <div className="date-month-head">
            <span className="date-month-title">{MONTH_CALENDAR_LABEL}</span>
            <span className="date-month-meta">{CALENDAR.mainWeekday}</span>
          </div>
          <div className="date-month-weekdays">
            {MONTH_GRID_WEEKDAYS.map((weekday) => (
              <span key={weekday}>{weekday}</span>
            ))}
          </div>
          <div className="date-month-grid">
            {MONTH_GRID.map((cell) => (
              <span
                key={cell.key}
                className={`date-month-cell${cell.isActive ? " is-active" : ""}${cell.isEmpty ? " is-empty" : ""}`}
              >
                {cell.label}
              </span>
            ))}
          </div>
        </div>
        <p className="details-text countdown">{getCountdownText(countdown)}</p>
      </>
    );
  }

  if (variantKey === "scenic") {
    return (
      <>
        <div className="date-showcase date-showcase-emblem">
          <div className="date-emblem-medallion">
            <span className="date-emblem-day">04</span>
            <span className="date-emblem-month">{MONTH_LABEL}</span>
          </div>
          <div className="date-emblem-copy">
            <p className="date-eyebrow">{CALENDAR.mainWeekday}</p>
            <p className="date-main">2026</p>
          </div>
        </div>
        <p className="details-text countdown">{getCountdownText(countdown)}</p>
      </>
    );
  }

  return (
    <>
      <div className="calendar-strip">
        <article className="calendar-day">
          <div className="weekday">{CALENDAR.prevWeekday}</div>
          <div className="month">{MONTH_LABEL}</div>
          <div className="date">{CALENDAR.prevDate}</div>
        </article>

        <article className="calendar-day active">
          <div className="weekday">{CALENDAR.mainWeekday}</div>
          <div className="month">{MONTH_LABEL}</div>
          <div className="date">{CALENDAR.mainDate}</div>
        </article>

        <article className="calendar-day">
          <div className="weekday">{CALENDAR.nextWeekday}</div>
          <div className="month">{MONTH_LABEL}</div>
          <div className="date">{CALENDAR.nextDate}</div>
        </article>
      </div>

      <p className="details-text countdown">{getCountdownText(countdown)}</p>
    </>
  );
}

function getVariantKeyFromLocation() {
  if (typeof window === "undefined") {
    return DEFAULT_VARIANT_KEY;
  }

  const key = new URLSearchParams(window.location.search).get("variant");
  return getWeddingVariant(key).key;
}

function syncVariantInLocation(variantKey) {
  if (typeof window === "undefined") {
    return;
  }

  const url = new URL(window.location.href);
  url.searchParams.set("variant", variantKey);
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

function updateMeta(variant) {
  if (typeof document === "undefined") {
    return;
  }

  document.title = variant.meta.title;
  const descriptionTag = document.querySelector('meta[name="description"]');

  if (descriptionTag) {
    descriptionTag.setAttribute("content", variant.meta.description);
  }
}

function syncDocumentBackground(variant) {
  if (typeof document === "undefined") {
    return;
  }

  const pageBackground = variant.theme["--page-background"];
  const fallbackBackground =
    pageBackground && pageBackground !== "transparent" ? pageBackground : "#ffffff";

  document.documentElement.style.background = fallbackBackground;
  document.body.style.background = fallbackBackground;
}

function App() {
  const [activeVariantKey, setActiveVariantKey] = useState(() =>
    getVariantKeyFromLocation(),
  );
  const [countdown, setCountdown] = useState(() => getCountdownState());
  const [heroPhotoReady, setHeroPhotoReady] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isWarmIntroDismissed, setIsWarmIntroDismissed] = useState(() =>
    getVariantKeyFromLocation() !== "warm",
  );
  const [isWarmIntroOpening, setIsWarmIntroOpening] = useState(false);
  const warmIntroTimeoutRef = useRef(null);
  const rsvpSectionRef = useRef(null);
  const activeVariant = getWeddingVariant(activeVariantKey);
  const activeHeroPhoto = HERO_PHOTOS_BY_VARIANT[activeVariant.key] ?? mainPhoto1;
  const shouldHideHeroPhoto =
    activeVariant.key === "minimal" || activeVariant.key === "scenic";
  const isWarmIntroVisible =
    activeVariant.key === "warm" && !isWarmIntroDismissed;
  const warmIntroClassName = isWarmIntroVisible
    ? isWarmIntroOpening
      ? " warm-intro-opening"
      : " warm-intro-active"
    : "";
  const pageShellClassName = `page-shell theme-${activeVariant.scene}${warmIntroClassName}`;

  useEffect(() => {
    return () => {
      if (warmIntroTimeoutRef.current) {
        clearTimeout(warmIntroTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (warmIntroTimeoutRef.current) {
      clearTimeout(warmIntroTimeoutRef.current);
      warmIntroTimeoutRef.current = null;
    }

    if (activeVariant.key === "warm") {
      setIsWarmIntroDismissed(false);
      setIsWarmIntroOpening(false);
      return;
    }

    setIsWarmIntroDismissed(true);
    setIsWarmIntroOpening(false);
  }, [activeVariant.key]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    if (isWarmIntroVisible) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [isWarmIntroVisible]);

  useEffect(() => {
    if (typeof window === "undefined" || shouldHideHeroPhoto) {
      setHeroPhotoReady(false);
      return undefined;
    }

    let cancelled = false;
    setHeroPhotoReady(false);

    const image = new window.Image();
    const handleReady = () => {
      if (!cancelled) {
        setHeroPhotoReady(true);
      }
    };

    image.onload = handleReady;
    image.onerror = handleReady;
    image.src = activeHeroPhoto;

    if (image.complete) {
      handleReady();
    }

    return () => {
      cancelled = true;
      image.onload = null;
      image.onerror = null;
    };
  }, [activeHeroPhoto, shouldHideHeroPhoto]);

  const revealVisibleFadeNodes = () => {
    if (typeof window === "undefined") {
      return;
    }

    const viewportHeight = window.innerHeight || 0;
    const fadeNodes = Array.from(document.querySelectorAll(".fade"));

    fadeNodes.forEach((node) => {
      if (node.classList.contains("show")) {
        return;
      }

      const rect = node.getBoundingClientRect();
      const visibleTop = Math.max(rect.top, 0);
      const visibleBottom = Math.min(rect.bottom, viewportHeight);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const visibleRatio = rect.height > 0 ? visibleHeight / rect.height : 0;

      if (visibleRatio >= 0.18) {
        node.classList.add("show");
      }
    });
  };

  useEffect(() => {
    const updateCountdown = () => {
      setCountdown(getCountdownState());
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const fadeNodes = Array.from(document.querySelectorAll(".fade"));
    let observer;

    const revealNode = (node) => {
      if (node.classList.contains("show")) {
        return;
      }

      node.classList.add("show");
      observer?.unobserve(node);
    };

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealNode(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    fadeNodes.forEach((node) => observer.observe(node));
    const rafId = window.requestAnimationFrame(revealVisibleFadeNodes);
    const timeoutIds = [240, 900, 1600].map((delay) =>
      window.setTimeout(revealVisibleFadeNodes, delay),
    );

    window.addEventListener("load", revealVisibleFadeNodes);
    window.addEventListener("pageshow", revealVisibleFadeNodes);
    window.addEventListener("resize", revealVisibleFadeNodes);

    return () => {
      window.cancelAnimationFrame(rafId);
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      window.removeEventListener("load", revealVisibleFadeNodes);
      window.removeEventListener("pageshow", revealVisibleFadeNodes);
      window.removeEventListener("resize", revealVisibleFadeNodes);
      fadeNodes.forEach((node) => observer.unobserve(node));
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!heroPhotoReady) {
      return undefined;
    }

    const rafId = window.requestAnimationFrame(revealVisibleFadeNodes);
    const timeoutId = window.setTimeout(revealVisibleFadeNodes, 180);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [heroPhotoReady]);

  useEffect(() => {
    if (submitStatus !== "success" || !rsvpSectionRef.current) {
      return;
    }

    requestAnimationFrame(() => {
      rsvpSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [submitStatus]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handlePopstate = () => {
      setActiveVariantKey(getVariantKeyFromLocation());
    };

    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, []);

  useEffect(() => {
    syncVariantInLocation(activeVariant.key);
    updateMeta(activeVariant);
    syncDocumentBackground(activeVariant);
  }, [activeVariant]);


  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      if (name === "withGuest" && value === "Нет") {
        return { ...prev, withGuest: value, guestName: "" };
      }

      return { ...prev, [name]: value };
    });
  };

  const handleAlcoholToggle = (event) => {
    const { value, checked } = event.target;

    setFormData((prev) => {
      const nextAlcohol = checked
        ? [...prev.alcohol, value]
        : prev.alcohol.filter((item) => item !== value);

      return {
        ...prev,
        alcohol: nextAlcohol,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitStatus("idle");
    setSubmitError("");

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.willCome ||
      !formData.withGuest
    ) {
      setSubmitStatus("error");
      setSubmitError("Пожалуйста, заполните обязательные поля.");
      return;
    }

    if (formData.withGuest === "Да" && !formData.guestName.trim()) {
      setSubmitStatus("error");
      setSubmitError("Укажите имя и фамилию гостя.");
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "rsvp"), {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        willCome: formData.willCome,
        withGuest: formData.withGuest,
        guestName: formData.withGuest === "Да" ? formData.guestName.trim() : "",
        alcohol: formData.alcohol,
        alcoholOther: formData.alcoholOther.trim(),
        submittedAt: serverTimestamp(),
      });

      setSubmitStatus("success");
      setFormData(INITIAL_FORM_STATE);
    } catch {
      setSubmitStatus("error");
      setSubmitError("Не удалось отправить форму. Попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const completeWarmIntro = () => {
    setIsWarmIntroDismissed(true);
    setIsWarmIntroOpening(false);

    if (warmIntroTimeoutRef.current) {
      clearTimeout(warmIntroTimeoutRef.current);
      warmIntroTimeoutRef.current = null;
    }
  };

  const handleWarmInvitationOpen = () => {
    if (isWarmIntroOpening) {
      return;
    }

    setIsWarmIntroOpening(true);

    if (warmIntroTimeoutRef.current) {
      clearTimeout(warmIntroTimeoutRef.current);
    }

    // Fallback in case animation events are skipped (tab hidden, etc.).
    warmIntroTimeoutRef.current = setTimeout(() => {
      completeWarmIntro();
    }, 2400);
  };

  const handleWarmIntroAnimationEnd = (event) => {
    if (!isWarmIntroOpening) {
      return;
    }

    if (event.target !== event.currentTarget) {
      return;
    }

    if (event.animationName !== "warm-gate-fade") {
      return;
    }

    completeWarmIntro();
  };

  const handleVariantChange = (variantKey) => {
    if (variantKey === activeVariant.key) {
      return;
    }

    startTransition(() => {
      setActiveVariantKey(variantKey);
    });
  };

  return (
    <div className={pageShellClassName} style={activeVariant.theme}>
      <div className="ambient-bg" aria-hidden="true">
        <span className="ambient-layer ambient-wash" />
        <span className="ambient-layer ambient-veil" />
        <span className="ambient-layer ambient-velvet" />
        <span className="ambient-layer ambient-aurora" />
        <span className="ambient-layer ambient-sweep" />
        <span className="ambient-layer ambient-vignette" />
        <span className="ambient-arc" />
        <span className="ambient-frame" />
        <span className="ambient-starfield" />
        <span className="ambient-orb ambient-orb-a" />
        <span className="ambient-orb ambient-orb-b" />
        <span className="ambient-orb ambient-orb-c" />
        <span className="ambient-orb ambient-orb-d" />
        <span className="ambient-line ambient-line-a" />
        <span className="ambient-line ambient-line-b" />
        <span className="ambient-ring ambient-ring-a" />
        <span className="ambient-ring ambient-ring-b" />
        <span className="ambient-ring ambient-ring-c" />
        <span className="ambient-streak ambient-streak-a" />
        <span className="ambient-streak ambient-streak-b" />
        <span className="ambient-streak ambient-streak-c" />
        <div className="ambient-petals" aria-hidden="true">
          {Array.from({ length: 14 }, (_, petalIndex) => (
            <span className="ambient-petal" key={`petal-${petalIndex}`}>
              <svg viewBox="0 0 100 140" role="presentation" focusable="false">
                <defs>
                  <linearGradient
                    id={`petal-gradient-${petalIndex}`}
                    x1="18%"
                    y1="10%"
                    x2="82%"
                    y2="92%"
                  >
                    <stop offset="0%" stopColor="#fff7f8" stopOpacity="0.24" />
                    <stop offset="30%" stopColor="#ff5b5f" stopOpacity="0.96" />
                    <stop offset="72%" stopColor="#c21544" stopOpacity="0.88" />
                    <stop offset="100%" stopColor="#5c0010" stopOpacity="0.18" />
                  </linearGradient>
                </defs>
                <path
                  d="M50 8C82 2 95 50 50 132C5 50 18 2 50 8Z"
                  fill={`url(#petal-gradient-${petalIndex})`}
                />
                <path
                  d="M50 24C52 56 50 86 48 114"
                  stroke="rgba(255, 235, 235, 0.78)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <ellipse
                  cx="40"
                  cy="36"
                  rx="9"
                  ry="13"
                  fill="rgba(255, 255, 255, 0.2)"
                  transform="rotate(-18 40 36)"
                />
              </svg>
            </span>
          ))}
        </div>
        <div className="ambient-glints" aria-hidden="true">
          {AMBIENT_TWINKLE_STARS.map((size, index) => (
            <span
              className={size ? `ambient-twinkle-star ${size}` : "ambient-twinkle-star"}
              key={`twinkle-${index}`}
            >
              <span className="ambient-twinkle-core" />
            </span>
          ))}
        </div>
        <img className="float-shape ambient-heart heart-a" src={heartSvg} alt="" />
        <img className="float-shape ambient-heart heart-b" src={heartSvg} alt="" />
        <img className="float-shape ambient-heart heart-c" src={heartSvg} alt="" />
        <img className="float-shape ambient-heart heart-d" src={heartSvg} alt="" />
        <img className="float-shape ambient-dove" src={dovePng} alt="" />
        <img className="float-shape ambient-rings" src={ringsPng} alt="" />
        <img className="float-shape ambient-flowers" src={flowersPng} alt="" />
      </div>

      {isWarmIntroVisible ? (
        <div
          className={`warm-invite-gate${isWarmIntroOpening ? " is-opening" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="warm-intro-title"
          onAnimationEnd={handleWarmIntroAnimationEnd}
        >
          <div className="warm-arch-screen" aria-hidden="true">
            <div className="warm-arch-panel warm-arch-panel-left" />
            <div className="warm-arch-panel warm-arch-panel-right" />
          </div>

          <div className="warm-envelope-ui">
            <p className="warm-intro-overline">{WARM_INTRO_OVERLINE}</p>
            <button
              id="warm-intro-title"
              type="button"
              className="warm-envelope-seal warm-envelope-open"
              onClick={handleWarmInvitationOpen}
              disabled={isWarmIntroOpening}
            >
              <span>{WARM_INTRO_OPEN_LABEL}</span>
              <small>{WARM_INTRO_OPEN_SUBLABEL}</small>
            </button>
          </div>
        </div>
      ) : null}

      <div className="page-content">
        <section className="hero-stage">
        <div
          className={`hero-photo-shell ${
            shouldHideHeroPhoto ? "is-placeholder" : ""
          }`}
          aria-hidden="true"
        >
          {!shouldHideHeroPhoto ? (
            <img
              className={`hero-photo ${heroPhotoReady ? "is-ready" : ""}`}
              src={activeHeroPhoto}
              alt=""
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onLoad={() => setHeroPhotoReady(true)}
            />
          ) : null}
        </div>

        <div className="hero-intro">
          <section className="hero fade show">
            <div className="sparkles" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="hero-card">
              <h1>Михаил & София</h1>
              <div className="gold-line" />
              <p className="subtitle">{activeVariant.hero.subtitle}</p>
              <p className="date-line">4 июля 2026 года · начало в 15:00</p>
            </div>
          </section>

          <a className="scroll-hint" href="#hero-message">
            <img src={scrollArrowSvg} alt="" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="fade" id="hero-message">
        <div className="glass hero-message-card">
          <h3 className="hero-appeal">{activeVariant.hero.appeal}</h3>
          <p className="hero-note">{activeVariant.hero.note}</p>
        </div>
      </section>

      <section className="fade" id="details">
        <div className="glass">
          <h2>Дата нашего дня</h2>
          <div className="gold-line" />

          {renderDateDetails(activeVariant.key, countdown)}
        </div>
      </section>

      {activeVariant.key === "modern" ? (
        <section className="fade" id="countdown-section">
          <div className="glass">
            <h2>{COUNTDOWN_PREFIX_LABEL}</h2>
            <div className="gold-line" />

            {renderCountdownPanel(countdown, "countdown-panel-standalone")}
          </div>
        </section>
      ) : null}
      <section className="fade">
        <div className="glass">
          <h2>Программа дня</h2>
          <div className="gold-line" />

          <div className="event-grid">
            {PROGRAM_ITEMS.map((item) => (
              <article className="event-item" key={item.time}>
                <div className="event-time">{item.time}</div>
                <p className="details-text">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fade">
        <div className="glass">
          <h2>Место проведения</h2>
          <div className="gold-line" />

          <div className="location">
            <img src={radisson} alt="Отель и свадебный зал" />

            <div>
              <h3>Radisson Blu</h3>
              <h5>Москва, Ленинский проспект, 90/3</h5>
              <p className="details-text">{activeVariant.venueDescription}</p>

              <div className="actions">
                <a
                  className="btn btn-primary"
                  href="https://yandex.ru/maps/-/CPUV4VjH"
                  target="_blank"
                  rel="noreferrer"
                >
                  Открыть карту
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fade">
        <div className="glass details-card">
          <h2>Детали</h2>
          <div className="gold-line" />
          {activeVariant.details.map((paragraph) => (
            <p className="details-text" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {renderDressCodeSection(activeVariant.key)}

      <section className="fade" id="rsvp" ref={rsvpSectionRef}>
        <div className="glass rsvp-card">
          <h2>Подтверждение присутствия</h2>
          <div className="gold-line" />
          <p>{activeVariant.rsvpIntro}</p>

          {submitStatus === "success" ? (
            <div className="form-success" role="status">
              <span>
                Ваш ответ отправлен. Если что-то изменится, заполните анкету
                заново.
              </span>
              <button
                type="button"
                className="btn btn-soft form-success-action"
                onClick={() => setSubmitStatus("idle")}
              >
                Отправить заново
              </button>
            </div>
          ) : (
            <form className="rsvp-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label className="form-label" htmlFor="firstName">
                  Имя *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  className="form-input"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  autoComplete="given-name"
                  required
                />
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="lastName">
                  Фамилия *
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  className="form-input"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  autoComplete="family-name"
                  required
                />
              </div>

              <div className="form-field">
                <div className="form-label">Вы придете? *</div>
                <div className="form-fieldset" role="radiogroup" aria-label="Вы придете?">
                  <div className="form-choice-group">
                    <label className="form-choice">
                      <input
                        type="radio"
                        name="willCome"
                        value="Да"
                        checked={formData.willCome === "Да"}
                        onChange={handleInputChange}
                        required
                      />
                      <span>Да</span>
                    </label>
                    <label className="form-choice">
                      <input
                        type="radio"
                        name="willCome"
                        value="Нет"
                        checked={formData.willCome === "Нет"}
                        onChange={handleInputChange}
                      />
                      <span>Нет</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-field">
                <div className="form-label">Вы будете с кем-то? *</div>
                <div
                  className="form-fieldset"
                  role="radiogroup"
                  aria-label="Вы будете с кем-то?"
                >
                  <div className="form-choice-group">
                    <label className="form-choice">
                      <input
                        type="radio"
                        name="withGuest"
                        value="Да"
                        checked={formData.withGuest === "Да"}
                        onChange={handleInputChange}
                        required
                      />
                      <span>Да</span>
                    </label>
                    <label className="form-choice">
                      <input
                        type="radio"
                        name="withGuest"
                        value="Нет"
                        checked={formData.withGuest === "Нет"}
                        onChange={handleInputChange}
                      />
                      <span>Нет</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-field">
                <div className="form-label">ФИО того, с кем будете</div>
                <textarea
                  id="guestName"
                  name="guestName"
                  className="form-textarea"
                  value={formData.guestName}
                  onChange={handleInputChange}
                  rows={3}
                  required={formData.withGuest === "Да"}
                />
              </div>

              <div className="form-field">
                <div className="form-label">Какой алкоголь будете пить?</div>
                <div
                  className="form-fieldset"
                  role="group"
                  aria-label="Какой алкоголь будете пить?"
                >
                  <div className="form-choice-group form-choice-group-multi">
                    {ALCOHOL_OPTIONS.map((option) => (
                      <label className="form-choice" key={option}>
                        <input
                          type="checkbox"
                          value={option}
                          checked={formData.alcohol.includes(option)}
                          onChange={handleAlcoholToggle}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  <div className="form-subfield">
                    <label className="form-label form-sublabel" htmlFor="alcoholOther">
                      Другое
                    </label>
                    <input
                      id="alcoholOther"
                      name="alcoholOther"
                      className="form-input"
                      value={formData.alcoholOther}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {submitStatus === "error" && (
                <p className="form-error" role="alert">
                  {submitError}
                </p>
              )}

              <div className="form-actions">
                <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Отправка..." : "Отправить"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <section className="fade contacts-section">
        <div className="glass contacts-card">
          <h2>Контакты</h2>
          <div className="gold-line" />
          <p className="contacts-note">{activeVariant.contactsNote}</p>

          <div className="contacts-list">
            {CONTACTS.map((contact) => (
              <article className="contact-item" key={contact.name}>
                <p className="contact-person">{contact.name}</p>
                <a className="contact-row contact-row-link" href={contact.tel}>
                  <PhoneIcon />
                  <span className="contact-text">{contact.phone}</span>
                </a>
                <a className="contact-row contact-row-link" href={contact.telegram}>
                  <TelegramIcon />
                  <span className="contact-text contact-text-soft">Telegram</span>
                </a>
              </article>
            ))}
          </div>

        </div>
      </section>
      <section className="fade footer-section">
          <div className="glass footer-card">
            <p className="footer-text">{activeVariant.footer} {"\u2665"}</p>
          </div>
        </section>
      </div>

      <section className="variant-dock-shell">
        <div className="variant-dock">

          <div
            className="variant-switcher"
            role="group"
            aria-label="Варианты текста приглашения"
          >
            {WEDDING_VARIANTS.map((variant, index) => (
              <button
                key={variant.key}
                type="button"
                className={`variant-pill ${
                  variant.key === activeVariant.key ? "is-active" : ""
                }`}
                onClick={() => handleVariantChange(variant.key)}
                aria-pressed={variant.key === activeVariant.key}
              >
                <span className="variant-pill-title">{`Вариант ${index + 1}`}</span>
              </button>
            ))}
          </div>

          <div className="variant-dots" aria-hidden="true">
            {WEDDING_VARIANTS.map((variant) => (
              <span
                key={`${variant.key}-dot`}
                className={`variant-dot ${
                  variant.key === activeVariant.key ? "is-active" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </section>
      </div>
  );
}

function PhoneIcon() {
  return (
    <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6.62 10.79a15.06 15.06 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.24 11.8 11.8 0 0 0 3.71.59 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.27a1 1 0 0 1 1 1 11.8 11.8 0 0 0 .59 3.71 1 1 0 0 1-.25 1.01z"
        fill="currentColor"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M9.04 15.47l-.38 5.35c.55 0 .79-.24 1.08-.53l2.59-2.47 5.37 3.93c.98.54 1.68.26 1.94-.91l3.52-16.47h0c.32-1.49-.54-2.08-1.49-1.73L1.16 10.54c-1.4.55-1.38 1.33-.24 1.68l5.24 1.63L18.33 6.2c.57-.37 1.09-.16.66.22"
        fill="currentColor"
      />
    </svg>
  );
}

export default App;







