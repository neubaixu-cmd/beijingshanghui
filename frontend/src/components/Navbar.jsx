export default function Navbar({ title, action }) {
  return (
    <header className="navbar">
      <div className="navbar__logo" aria-label="北京商会标识">
        <span className="logo-mark">京</span>
        <div className="logo-text">
          <span>{title}</span>
          <small>Beijing Chamber of Commerce</small>
        </div>
      </div>
      {action && (
        <a className="navbar__action" href="#contact">
          {action}
        </a>
      )}
    </header>
  );
}
