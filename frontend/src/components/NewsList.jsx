import SectionHeader from './SectionHeader.jsx';

export default function NewsList({ items }) {
  if (!items.length) return null;

  return (
    <section className="card" id="news">
      <SectionHeader
        title="商会快讯"
        subtitle="第一时间掌握行业动态"
        action={{ label: '全部新闻', href: '#' }}
      />
      <div className="list">
        {items.map((item) => (
          <article key={item.id} className="list__item">
            <div className="list__content">
              <h3>{item.title}</h3>
              {item.summary && <p>{item.summary}</p>}
              <div className="list__meta">
                {item.eventDate && <span>{item.eventDate}</span>}
                {item.link && (
                  <a href={item.link} className="link" target="_blank" rel="noreferrer">
                    查看详情
                  </a>
                )}
              </div>
            </div>
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.title} className="list__image" loading="lazy" />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
