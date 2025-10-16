import SectionHeader from './SectionHeader.jsx';

export default function MemberGrid({ items }) {
  if (!items.length) return null;

  return (
    <section className="card" id="members">
      <SectionHeader title="会员风采" subtitle="与优秀的同行者建立连接" />
      <div className="grid">
        {items.map((item) => (
          <article key={item.id} className="grid__item">
            {item.imageUrl && <img src={item.imageUrl} alt={item.title} loading="lazy" />}
            <div className="grid__content">
              <h3>{item.title}</h3>
              {item.summary && <p>{item.summary}</p>}
              {item.link && (
                <a href={item.link} className="link" target="_blank" rel="noreferrer">
                  了解更多
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
