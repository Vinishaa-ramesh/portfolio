import { FileText, Github, Linkedin } from 'lucide-react';
import { portfolio } from '../../data/portfolio';
import './footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© {year} {portfolio.name}</p>
        <div className="footer-links">
          <a href={portfolio.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" title="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a href={portfolio.links.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" title="GitHub">
            <Github size={18} />
          </a>
          <a href={portfolio.links.resume} target="_blank" rel="noreferrer" aria-label="Resume" title="Resume">
            <FileText size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
