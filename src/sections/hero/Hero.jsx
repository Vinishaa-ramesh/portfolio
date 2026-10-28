import { ArrowRight, Download, Github, Linkedin, MoveDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../common-components/Button';
import GmailLink from '../../common-components/GmailLink';
import TagList from '../../common-components/TagList';
import { portfolio } from '../../data/portfolio';
import './hero.css';

export default function Hero() {
  return (
    <section className="hero-section" id="top">
      <div className="container hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="eyebrow">Software Development Engineer</p>
          <h1>
            {portfolio.name}
            <span className="hero-title-accent">.</span>
          </h1>
          <p className="hero-intro">{portfolio.intro}</p>

          <TagList items={portfolio.coreStrengths} className="hero-tags" />

          <div className="hero-actions">
            <div className="hero-social-links" aria-label="Social profiles">
              <a href={portfolio.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                <Linkedin size={18} />
              </a>
              <a href={portfolio.links.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
                <Github size={18} />
              </a>
            </div>
            <GmailLink
              className="button button-primary"
              target="_blank"
              rel="noreferrer"
            >
              Email me
              <ArrowRight size={18} />
            </GmailLink>
            <Button href={portfolio.links.resume} variant="secondary" target="_blank" rel="noreferrer">
              <Download size={18} />
              Download Resume
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.08, ease: 'easeOut' }}
        >
          <div className="hero-panel">
            <div className="panel-header">
              <span className="dot dot-one" />
              <span className="dot dot-two" />
              <span className="dot dot-three" />
            </div>
            <div className="panel-body">
              <div className="code-card">
                <span className="label">Focus</span>
                <strong>AI-first Product Engineering</strong>
                <ul>
                  {portfolio.mySkills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* <div className="scroll-indicator" aria-label="Scroll to content">
        <MoveDown size={16} />
      </div> */}
    </section>
  );
}
