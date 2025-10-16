import SectionHeader from './SectionHeader.jsx';

export default function Highlights({ items }) {
  const visibleItems = items.filter((item) => item && item.description);
  if (!visibleItems.length) return null;

  return (
    <section className="card" id="highlights">
      <SectionHeader title="商会亮点" subtitle="我们的使命与价值" />
      <div className="highlights">
        {visibleItems.map((item) => (
          <article key={item.title} className="highlights__item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
