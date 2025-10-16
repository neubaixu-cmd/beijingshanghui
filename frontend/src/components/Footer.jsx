export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} 北京商会. 保留所有权利。</p>
      <a href="#hero" className="link">
        返回顶部
      </a>
    </footer>
  );
}
