import { useEffect, useState } from 'react';
import { Menu, MoonStar, SunMedium, X } from 'lucide-react';
import Button from '../../common-components/Button';
import { portfolio } from '../../data/portfolio';
import './navbar.css';

export default function Navbar({ theme, onToggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const sections = document.querySelectorAll('main section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.2, 0.5, 0.8] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <a href="#top" className="brand-wordmark" aria-label="Vinishaa K R home">
          <img src="/favicon.svg" alt="" width={30} height={30} />
          <span>Vinishaa</span>
          <span className="brand-mark">K R</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {portfolio.navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a key={link.href} href={link.href} className={isActive ? 'nav-link active' : 'nav-link'}>
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="nav-actions">
          <Button href="#contact" variant="primary" className="nav-cta">
            Let&apos;s Talk
          </Button>
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <SunMedium size={18} /> : <MoonStar size={18} />}
          </button>
          <button
            type="button"
            className="menu-button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="mobile-menu" aria-label="Mobile navigation">
          {portfolio.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={activeSection === link.href.replace('#', '') ? 'mobile-link active' : 'mobile-link'}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button href="#contact" variant="primary" className="mobile-cta" onClick={() => setIsMenuOpen(false)}>
            Contact me
          </Button>
        </div>
      ) : null}
    </header>
  );
}
