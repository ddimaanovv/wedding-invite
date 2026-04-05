import {
  COUNTDOWN_CONTENT,
  DATE_CONTENT,
  SECTIONS_TEXT,
} from "../config/weddingData";
import {
  createCalendarData,
  createMonthGridData,
  getCountdownText,
} from "../utils/dateUtils";

function CountdownPanel({ countdown, className = "" }) {
  const panelClassName = className
    ? `countdown-panel ${className}`
    : "countdown-panel";

  return (
    <div className={panelClassName} aria-label={COUNTDOWN_CONTENT.prefixLabel}>
      {countdown.status === "today" ? (
        <p className="details-text countdown countdown-panel-message">
          {COUNTDOWN_CONTENT.todayLabel}
        </p>
      ) : (
        <div className="countdown-grid">
          {COUNTDOWN_CONTENT.parts.map((part) => (
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

function DateDetails({ variantKey, countdown, calendarData, monthGridData }) {
  if (variantKey === "warm") {
    return (
      <>
        <div className="date-showcase date-showcase-simple">
          <div className="date-simple-day">{DATE_CONTENT.dayLabel}</div>
          <div className="date-simple-copy">
            <p className="date-eyebrow">{calendarData.mainWeekday}</p>
            <p className="date-main">{DATE_CONTENT.monthCalendarLabel}</p>
          </div>
        </div>
        <p className="details-text countdown">{getCountdownText(countdown)}</p>
      </>
    );
  }

  if (variantKey === "modern") {
    return (
      <div className="date-showcase date-showcase-editorial">
        <div className="date-editorial-stack">
          <div className="date-editorial-day">{DATE_CONTENT.dayLabel}</div>
          <span className="date-editorial-kicker">
            {DATE_CONTENT.monthEditorialLabel}
          </span>
          <span className="date-editorial-meta">{DATE_CONTENT.yearLabel}</span>
          <span className="date-editorial-kicker">{calendarData.mainWeekday}</span>
        </div>
      </div>
    );
  }

  if (variantKey === "minimal") {
    return (
      <>
        <div className="date-showcase date-showcase-month">
          <div className="date-month-head">
            <span className="date-month-title">{DATE_CONTENT.monthCalendarLabel}</span>
            <span className="date-month-meta">{calendarData.mainWeekday}</span>
          </div>
          <div className="date-month-weekdays">
            {DATE_CONTENT.monthGridWeekdays.map((weekday) => (
              <span key={weekday}>{weekday}</span>
            ))}
          </div>
          <div className="date-month-grid">
            {monthGridData.map((cell) => (
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
            <span className="date-emblem-day">{DATE_CONTENT.dayLabel}</span>
            <span className="date-emblem-month">{DATE_CONTENT.monthLabel}</span>
          </div>
          <div className="date-emblem-copy">
            <p className="date-eyebrow">{calendarData.mainWeekday}</p>
            <p className="date-main">{DATE_CONTENT.yearLabel}</p>
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
          <div className="weekday">{calendarData.prevWeekday}</div>
          <div className="month">{DATE_CONTENT.monthLabel}</div>
          <div className="date">{calendarData.prevDate}</div>
        </article>

        <article className="calendar-day active">
          <div className="weekday">{calendarData.mainWeekday}</div>
          <div className="month">{DATE_CONTENT.monthLabel}</div>
          <div className="date">{calendarData.mainDate}</div>
        </article>

        <article className="calendar-day">
          <div className="weekday">{calendarData.nextWeekday}</div>
          <div className="month">{DATE_CONTENT.monthLabel}</div>
          <div className="date">{calendarData.nextDate}</div>
        </article>
      </div>

      <p className="details-text countdown">{getCountdownText(countdown)}</p>
    </>
  );
}

export function DateSection({ variantKey, countdown, weddingDate }) {
  const calendarData = createCalendarData(weddingDate);
  const monthGridData = createMonthGridData(weddingDate);

  return (
    <>
      <section className="fade" id="details">
        <div className="glass">
          <h2>{SECTIONS_TEXT.dateTitle}</h2>
          <div className="gold-line" />
          <DateDetails
            variantKey={variantKey}
            countdown={countdown}
            calendarData={calendarData}
            monthGridData={monthGridData}
          />
        </div>
      </section>

      {variantKey === "modern" ? (
        <section className="fade" id="countdown-section">
          <div className="glass">
            <h2>{COUNTDOWN_CONTENT.prefixLabel}</h2>
            <div className="gold-line" />
            <CountdownPanel countdown={countdown} className="countdown-panel-standalone" />
          </div>
        </section>
      ) : null}
    </>
  );
}
