import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <strong>Xuyang Zhao</strong>
          <p>Research · Build · Learn · Live</p>
        </div>
        <div className="footer-links">
          <Link href="/about">About</Link>
          <a href="https://github.com/bshr000">GitHub</a>
          <a href="mailto:18369588966@163.com">Email</a>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} · Built slowly, kept thoughtfully.
        </p>
      </div>
    </footer>
  );
}
