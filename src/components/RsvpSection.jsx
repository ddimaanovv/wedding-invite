import { RSVP_CONTENT, SECTIONS_TEXT } from "../config/weddingData";

export function RsvpSection({
  rsvpSectionRef,
  rsvpIntro,
  formData,
  submitStatus,
  submitError,
  isSubmitting,
  onSubmit,
  onInputChange,
  onAlcoholToggle,
  onResetSubmitStatus,
}) {
  return (
    <section className="fade" id="rsvp" ref={rsvpSectionRef}>
      <div className="glass rsvp-card">
        <h2>{SECTIONS_TEXT.rsvpTitle}</h2>
        <div className="gold-line" />
        <p>{rsvpIntro}</p>

        {submitStatus === "success" ? (
          <div className="form-success" role="status">
            <span>{RSVP_CONTENT.successMessage}</span>
            <button
              type="button"
              className="btn btn-soft form-success-action"
              onClick={onResetSubmitStatus}
            >
              {RSVP_CONTENT.successAction}
            </button>
          </div>
        ) : (
          <form className="rsvp-form" onSubmit={onSubmit}>
            <div className="form-field">
              <label className="form-label" htmlFor="firstName">
                {RSVP_CONTENT.fields.firstName}
              </label>
              <input
                id="firstName"
                name="firstName"
                className="form-input"
                value={formData.firstName}
                onChange={onInputChange}
                autoComplete="given-name"
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="lastName">
                {RSVP_CONTENT.fields.lastName}
              </label>
              <input
                id="lastName"
                name="lastName"
                className="form-input"
                value={formData.lastName}
                onChange={onInputChange}
                autoComplete="family-name"
                required
              />
            </div>

            <div className="form-field">
              <div className="form-label">{RSVP_CONTENT.questions.willCome.label}</div>
              <div
                className="form-fieldset"
                role="radiogroup"
                aria-label={RSVP_CONTENT.questions.willCome.ariaLabel}
              >
                <div className="form-choice-group">
                  <label className="form-choice">
                    <input
                      type="radio"
                      name="willCome"
                      value={RSVP_CONTENT.options.yes}
                      checked={formData.willCome === RSVP_CONTENT.options.yes}
                      onChange={onInputChange}
                      required
                    />
                    <span>{RSVP_CONTENT.options.yes}</span>
                  </label>
                  <label className="form-choice">
                    <input
                      type="radio"
                      name="willCome"
                      value={RSVP_CONTENT.options.no}
                      checked={formData.willCome === RSVP_CONTENT.options.no}
                      onChange={onInputChange}
                    />
                    <span>{RSVP_CONTENT.options.no}</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="form-field">
              <div className="form-label">{RSVP_CONTENT.questions.withGuest.label}</div>
              <div
                className="form-fieldset"
                role="radiogroup"
                aria-label={RSVP_CONTENT.questions.withGuest.ariaLabel}
              >
                <div className="form-choice-group">
                  <label className="form-choice">
                    <input
                      type="radio"
                      name="withGuest"
                      value={RSVP_CONTENT.options.yes}
                      checked={formData.withGuest === RSVP_CONTENT.options.yes}
                      onChange={onInputChange}
                      required
                    />
                    <span>{RSVP_CONTENT.options.yes}</span>
                  </label>
                  <label className="form-choice">
                    <input
                      type="radio"
                      name="withGuest"
                      value={RSVP_CONTENT.options.no}
                      checked={formData.withGuest === RSVP_CONTENT.options.no}
                      onChange={onInputChange}
                    />
                    <span>{RSVP_CONTENT.options.no}</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="form-field">
              <div className="form-label">{RSVP_CONTENT.fields.guestName}</div>
              <textarea
                id="guestName"
                name="guestName"
                className="form-textarea"
                value={formData.guestName}
                onChange={onInputChange}
                rows={3}
                required={formData.withGuest === RSVP_CONTENT.options.yes}
              />
            </div>

            <div className="form-field">
              <div className="form-label">{RSVP_CONTENT.questions.alcohol.label}</div>
              <div
                className="form-fieldset"
                role="group"
                aria-label={RSVP_CONTENT.questions.alcohol.ariaLabel}
              >
                <div className="form-choice-group form-choice-group-multi">
                  {RSVP_CONTENT.options.alcohol.map((option) => (
                    <label className="form-choice" key={option}>
                      <input
                        type="checkbox"
                        value={option}
                        checked={formData.alcohol.includes(option)}
                        onChange={onAlcoholToggle}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                <div className="form-subfield">
                  <label className="form-label form-sublabel" htmlFor="alcoholOther">
                    {RSVP_CONTENT.fields.alcoholOther}
                  </label>
                  <input
                    id="alcoholOther"
                    name="alcoholOther"
                    className="form-input"
                    value={formData.alcoholOther}
                    onChange={onInputChange}
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
                {isSubmitting ? RSVP_CONTENT.submittingLabel : RSVP_CONTENT.submitLabel}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
