import { COUNTDOWN_CONTENT, DATE_CONTENT } from "../config/weddingData";

export function createCalendarData(date) {
  const prev = new Date(date);
  const next = new Date(date);
  prev.setDate(prev.getDate() - 1);
  next.setDate(next.getDate() + 1);

  return {
    prevDate: prev.getDate(),
    mainDate: date.getDate(),
    nextDate: next.getDate(),
    prevWeekday: DATE_CONTENT.weekdaysFull[prev.getDay()],
    mainWeekday: DATE_CONTENT.weekdaysFull[date.getDay()],
    nextWeekday: DATE_CONTENT.weekdaysFull[next.getDay()],
  };
}

export function createMonthGridData(date) {
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

export function getCountdownState(targetDate) {
  const now = new Date();
  const diff = targetDate - now;

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

export function getCountdownText(countdown) {
  if (countdown.status === "today") {
    return COUNTDOWN_CONTENT.todayLabel;
  }

  return `${COUNTDOWN_CONTENT.prefixLabel} ${countdown.days} ${COUNTDOWN_CONTENT.shortLabels.days} ${countdown.hours} ${COUNTDOWN_CONTENT.shortLabels.hours} ${countdown.minutes} ${COUNTDOWN_CONTENT.shortLabels.minutes}`;
}
