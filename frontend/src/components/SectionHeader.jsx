export default function SectionHeader({ title, subtitle, action }) {
  return (
    <header className="section-header">
      <div>
        <p className="section-header__subtitle">{subtitle}</p>
        <h2>{title}</h2>
      </div>
      {action && (
        <a className="section-header__action" href={action.href}>
          {action.label}
        </a>
      )}
    </header>
  );
}
