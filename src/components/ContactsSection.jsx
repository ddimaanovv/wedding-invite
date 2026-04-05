import {
  CONTACTS,
  CONTACTS_CONTENT,
  HEART_SYMBOL,
  SECTIONS_TEXT,
} from "../config/weddingData";

export function ContactsSection({ contactsNote, footerText }) {
  return (
    <>
      <section className="fade contacts-section">
        <div className="glass contacts-card">
          <h2>{SECTIONS_TEXT.contactsTitle}</h2>
          <div className="gold-line" />
          <p className="contacts-note">{contactsNote}</p>

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
                  <span className="contact-text contact-text-soft">
                    {CONTACTS_CONTENT.telegramLabel}
                  </span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fade footer-section">
        <div className="glass footer-card">
          <p className="footer-text">
            {footerText} {HEART_SYMBOL}
          </p>
        </div>
      </section>
    </>
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
