import SectionHeader from './SectionHeader.jsx';

export default function EventsTimeline({ items }) {
  if (!items.length) return null;

  return (
    <section className="card" id="events">
      <SectionHeader title="近期活动" subtitle="参与我们的商务活动" />
      <div className="timeline">
        {items.map((item) => (
          <article key={item.id} className="timeline__item">
            <div className="timeline__marker" aria-hidden="true"></div>
            <div className="timeline__content">
              <span className="timeline__date">{item.eventDate || '待定'}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              {item.link && (
                <a href={item.link} className="link" target="_blank" rel="noreferrer">
                  活动详情
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
