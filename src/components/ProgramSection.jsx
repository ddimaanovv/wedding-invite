import { PROGRAM_ITEMS, SECTIONS_TEXT } from "../config/weddingData";

export function ProgramSection() {
  return (
    <section className="fade">
      <div className="glass">
        <h2>{SECTIONS_TEXT.programTitle}</h2>
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
  );
}
