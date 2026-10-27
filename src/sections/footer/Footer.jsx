import { portfolio } from '../../data/portfolio';
import './footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© {year} {portfolio.name}</p>
        <div className="footer-links">
          <a href={portfolio.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={portfolio.links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={portfolio.links.resume}>Resume</a>
        </div>
      </div>
    </footer>
  );
}
