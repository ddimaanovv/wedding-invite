import radisson from "../assets/radisson.webp";
import { SECTIONS_TEXT, VENUE_CONTENT } from "../config/weddingData";

export function VenueSection({ venueDescription }) {
  return (
    <section className="fade">
      <div className="glass">
        <h2>{SECTIONS_TEXT.venueTitle}</h2>
        <div className="gold-line" />

        <div className="location">
          <img src={radisson} alt={VENUE_CONTENT.imageAlt} />

          <div>
            <h3>{VENUE_CONTENT.name}</h3>
            <h5>{VENUE_CONTENT.location}</h5>
            <p className="details-text">{venueDescription}</p>

            <div className="actions">
              <a
                className="btn btn-primary"
                href={VENUE_CONTENT.mapUrl}
                target="_blank"
                rel="noreferrer"
              >
                {VENUE_CONTENT.mapButtonLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
