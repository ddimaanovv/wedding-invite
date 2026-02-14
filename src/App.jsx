import { useEffect, useMemo, useState } from "react";

const WEDDING_DATE = new Date("2026-07-04T16:00:00+05:00");
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
        setCountdown("Сегодня наш день ❤");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      setCountdown(
        `До свадьбы осталось ${days} дн. ${hours} ч. ${minutes} мин.`,
      );
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
        <span className="float-shape blob-a" />
        <span className="float-shape blob-b" />
        <span className="float-shape blob-c" />
        <span className="float-shape blob-d" />
        <span className="float-shape bubble-a" />
        <span className="float-shape bubble-b" />
        <span className="float-shape bubble-c" />
        <span className="float-shape glyph-heart">❤</span>
        <span className="float-shape glyph-star">✦</span>
        <span className="float-shape glyph-ring">◌</span>
      </div>

      <section className="hero fade show">
        <div className="sparkles" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="hero-card">
          <h1>Элина & Чингиз</h1>
          <div className="gold-line" />
          <p className="subtitle">Свадебное приглашение</p>
          <p className="date-line">4 июля 2026 года · начало в 16:00</p>
        </div>
      </section>

      <section className="fade">
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

          <p className="countdown">{countdown}</p>
        </div>
      </section>

      <section className="fade">
        <div className="glass">
          <h2>Программа дня</h2>
          <div className="gold-line" />

          <div className="event-grid">
            <article className="event-item">
              <div className="event-time">15:00</div>
              <p>Сбор гостей и welcome-зона.</p>
            </article>
            <article className="event-item">
              <div className="event-time">16:00</div>
              <p>Торжественная церемония.</p>
            </article>
            <article className="event-item">
              <div className="event-time">17:00</div>
              <p>Фотосессия, аперитив и поздравления.</p>
            </article>
            <article className="event-item">
              <div className="event-time">18:30</div>
              <p>Банкет, танцы и праздничная программа.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="fade">
        <div className="glass">
          <h2>Место проведения</h2>
          <div className="gold-line" />

          <div className="location">
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80"
              alt="Светлый свадебный зал"
            />

            <div>
              <h3>Radisson Collection</h3>
              <p>
                Пространство с панорамным светом, утонченным интерьером и уютной
                атмосферой для самого важного вечера.
              </p>

              <div className="actions">
                <a
                  className="btn btn-primary"
                  href="https://yandex.ru/maps"
                  target="_blank"
                  rel="noreferrer"
                >
                  Открыть карту
                </a>
                <a className="btn btn-soft" href="#rsvp">
                  Подтвердить присутствие
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fade" id="rsvp">
        <div className="glass rsvp-card">
          <h2>Подтверждение присутствия</h2>
          <p>Пожалуйста, заполните форму до 1 июня 2026 года.</p>

          <div className="form-embed">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSemB8X_gfYfUSeONNIgKcI6ksC4CQaQ74gcuJgFltSvPQKGGA/viewform?embedded=true"
              width="640"
              height="720"
              frameborder="0"
              marginheight="0"
              marginwidth="0"
            >
              Загрузка…
            </iframe>
          </div>
        </div>
      </section>

      <footer>С любовью, Элина и Чингиз ❤</footer>
    </>
  );
}

export default App;
