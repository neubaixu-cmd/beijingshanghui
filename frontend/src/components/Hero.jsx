export default function Hero({ content }) {
  return (
    <section className="card hero" id="hero">
      <div className="hero__text">
        {content.subtitle && <p className="hero__subtitle">{content.subtitle}</p>}
        <h1>{content.title}</h1>
        {content.description && <p className="hero__description">{content.description}</p>}
        <div className="hero__actions">
          {content.ctaText && (
            <a className="button button--primary" href={content.ctaLink || '#'}>
              {content.ctaText}
            </a>
          )}
          {content.secondaryCtaText && (
            <a className="button button--ghost" href={content.secondaryCtaLink || '#'}>
              {content.secondaryCtaText}
            </a>
          )}
        </div>
      </div>
      <div className="hero__badge">
        <span>Since</span>
        <strong>2002</strong>
        <span>北京</span>
      </div>
    </section>
  );
}
