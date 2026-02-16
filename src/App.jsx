import { useEffect, useMemo, useState } from "react";
import dovePng from "./assets/dove.webp";
import flowersPng from "./assets/flowers.webp";
import heartSvg from "./assets/heart.svg";
import ringsPng from "./assets/rings.webp";
import scrollArrowSvg from "./assets/scroll-arrow.svg";
import radisson from "./assets/radisson.webp";
import mainPhoto from "./assets/main-photo.webp";

const WEDDING_DATE = new Date("2026-07-04T15:00:00+03:00");
const WEEKDAYS = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
];

function App() {
    const [countdown, setCountdown] = useState("");
    const [heroPhotoReady, setHeroPhotoReady] = useState(false);

    const calendar = useMemo(() => {
        const prev = new Date(WEDDING_DATE);
        const next = new Date(WEDDING_DATE);
        prev.setDate(prev.getDate() - 1);
        next.setDate(next.getDate() + 1);

        return {
            prevDate: prev.getDate(),
            mainDate: WEDDING_DATE.getDate(),
            nextDate: next.getDate(),
            prevWeekday: WEEKDAYS[prev.getDay()],
            mainWeekday: WEEKDAYS[WEDDING_DATE.getDay()],
            nextWeekday: WEEKDAYS[next.getDay()],
        };
    }, []);

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const diff = WEDDING_DATE - now;

            if (diff <= 0) {
                setCountdown("Сегодня наш день ♥");
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            setCountdown(`До свадьбы осталось ${days} дн. ${hours} ч. ${minutes} мин.`);
        };

        updateCountdown();
        const timer = setInterval(updateCountdown, 60000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            },
            { threshold: 0.18 },
        );

        const fadeNodes = document.querySelectorAll(".fade");
        fadeNodes.forEach((node) => observer.observe(node));

        return () => {
            fadeNodes.forEach((node) => observer.unobserve(node));
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div className="ambient-bg" aria-hidden="true">
                <img className="float-shape heart-icon heart-a" src={heartSvg} alt="" />
                <img className="float-shape heart-icon heart-b" src={heartSvg} alt="" />
                <img className="float-shape heart-icon heart-c" src={heartSvg} alt="" />
                <img className="float-shape heart-icon heart-d" src={heartSvg} alt="" />
                <img className="float-shape heart-icon heart-e" src={heartSvg} alt="" />
                <img className="float-shape heart-icon heart-f" src={heartSvg} alt="" />
                <span className="float-shape glyph-star">✦</span>
                <span className="float-shape glyph-ring">◉</span>
                <img className="float-shape png-dove" src={dovePng} alt="" />
                <img className="float-shape png-dove png-dove-b" src={ringsPng} alt="" />
                <img className="float-shape png-dove png-dove-c" src={flowersPng} alt="" />
            </div>

            <section className="hero-stage">
                <div className="hero-photo-shell" aria-hidden="true">
                    <img
                        className={`hero-photo ${heroPhotoReady ? "is-ready" : ""}`}
                        src={mainPhoto}
                        alt=""
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        onLoad={() => setHeroPhotoReady(true)}
                    />
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
                            <h1>Чингиз & Элина</h1>
                            <div className="gold-line" />
                            <p className="subtitle">Свадебное приглашение</p>
                            <p className="date-line">4 июля 2026 года · начало в 15:00</p>
                        </div>
                    </section>
                    <h3 className="hero-appeal">Дорогие гости!</h3>
                    <p className="hero-note fade show">
                        Приглашаем вас разделить с нами торжество, посвященное дню нашей свадьбы.
                        Для нас будет огромной радостью провести этот счастливый день в кругу самых
                        близких и дорогих людей
                    </p>

                    <a className="scroll-hint" href="#details">
                        <img src={scrollArrowSvg} alt="" aria-hidden="true" />
                    </a>
                </div>
            </section>

            <section className="fade" id="details">
                <div className="glass">
                    <h2>Дата нашего дня</h2>
                    <div className="gold-line" />

                    <div className="calendar-strip">
                        <article className="calendar-day">
                            <div className="weekday">{calendar.prevWeekday}</div>
                            <div className="month">июля</div>
                            <div className="date">{calendar.prevDate}</div>
                        </article>

                        <article className="calendar-day active">
                            <div className="weekday">{calendar.mainWeekday}</div>
                            <div className="month">июля</div>
                            <div className="date">{calendar.mainDate}</div>
                        </article>

                        <article className="calendar-day">
                            <div className="weekday">{calendar.nextWeekday}</div>
                            <div className="month">июля</div>
                            <div className="date">{calendar.nextDate}</div>
                        </article>
                    </div>

                    <p className="details-text countdown">{countdown}</p>
                </div>
            </section>

            <section className="fade">
                <div className="glass">
                    <h2>Программа дня</h2>
                    <div className="gold-line" />

                    <div className="event-grid">
                        <article className="event-item">
                            <div className="event-time">15:00</div>
                            <p className="details-text">Сбор гостей в welcome-зоне, фуршет</p>
                        </article>
                        <article className="event-item">
                            <div className="event-time">16:00</div>
                            <p className="details-text">Начало торжества, аперитив</p>
                        </article>
                        <article className="event-item">
                            <div className="event-time">17:00</div>
                            <p className="details-text">Банкет, поздравления</p>
                        </article>
                        <article className="event-item">
                            <div className="event-time">18:00</div>
                            <p className="details-text">Праздничная программа</p>
                        </article>
                        <article className="event-item">
                            <div className="event-time">20:00</div>
                            <p className="details-text">Вынос торта</p>
                        </article>
                        <article className="event-item">
                            <div className="event-time">21:00</div>
                            <p className="details-text">Танцы</p>
                        </article>
                        <article className="event-item">
                            <div className="event-time">23:00</div>
                            <p className="details-text">Финал</p>
                        </article>
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
                            <p className="details-text">
                                Пространство с панорамным светом, утонченным интерьером и уютной
                                атмосферой для самого важного вечера
                            </p>

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
                    <p className="details-text">
                        Свои тёплые слова и пожелания приносите в сердцах, а подарки - в
                        конверте
                    </p>
                    <p className="details-text">
                        Вместо цветов мы будем счастливы получить бутылочку вина, которую
                        вместе разделим однажды вечером
                    </p>
                </div>
            </section>

            <section className="fade" id="rsvp">
                <div className="glass rsvp-card">
                    <h2>Подтверждение присутствия</h2>
                    <div className="gold-line" />
                    <p>Пожалуйста, заполните анкету</p>

                    <div className="form-embed">
                        <iframe
                            src="https://docs.google.com/forms/d/e/1FAIpQLSemB8X_gfYfUSeONNIgKcI6ksC4CQaQ74gcuJgFltSvPQKGGA/viewform?embedded=true"
                            width="640"
                            height="1220"
                        >
                            Загрузка...
                        </iframe>
                    </div>
                </div>
            </section>

            <section className="fade contacts-section">
                <div className="glass contacts-card">
                    <h2>Контакты</h2>
                    <div className="gold-line" />
                    <p className="contacts-note">Если появятся вопросы, свяжитесь с нами:</p>

                    <div className="contacts-list">
                        <article className="contact-item">
                            <p className="contact-person">Чингиз</p>
                            <a className="contact-row contact-row-link" href="tel:+79051687319">
                                <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        d="M6.62 10.79a15.06 15.06 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.24 11.8 11.8 0 0 0 3.71.59 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.27a1 1 0 0 1 1 1 11.8 11.8 0 0 0 .59 3.71 1 1 0 0 1-.25 1.01z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span className="contact-text">+7 905 168-73-19</span>
                            </a>
                            <a className="contact-row contact-row-link" href="tg://resolve?phone=79051687319">
                                <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        d="M9.04 15.47l-.38 5.35c.55 0 .79-.24 1.08-.53l2.59-2.47 5.37 3.93c.98.54 1.68.26 1.94-.91l3.52-16.47h0c.32-1.49-.54-2.08-1.49-1.73L1.16 10.54c-1.4.55-1.38 1.33-.24 1.68l5.24 1.63L18.33 6.2c.57-.37 1.09-.16.66.22"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span className="contact-text contact-text-soft">Telegram</span>
                            </a>
                        </article>
                        
                        <article className="contact-item">
                            <p className="contact-person">Элина</p>
                            <a className="contact-row contact-row-link" href="tel:+79687721707">
                                <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        d="M6.62 10.79a15.06 15.06 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.24 11.8 11.8 0 0 0 3.71.59 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.27a1 1 0 0 1 1 1 11.8 11.8 0 0 0 .59 3.71 1 1 0 0 1-.25 1.01z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span className="contact-text">+7 968 772-17-07</span>
                            </a>
                            <a className="contact-row contact-row-link" href="tg://resolve?phone=79687721707">
                                <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        d="M9.04 15.47l-.38 5.35c.55 0 .79-.24 1.08-.53l2.59-2.47 5.37 3.93c.98.54 1.68.26 1.94-.91l3.52-16.47h0c.32-1.49-.54-2.08-1.49-1.73L1.16 10.54c-1.4.55-1.38 1.33-.24 1.68l5.24 1.63L18.33 6.2c.57-.37 1.09-.16.66.22"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span className="contact-text contact-text-soft">Telegram</span>
                            </a>
                        </article>
                    </div>
                </div>
            </section>

            <footer>С любовью, Чингиз и Элина ♥</footer>
        </>
    );
}

export default App;
