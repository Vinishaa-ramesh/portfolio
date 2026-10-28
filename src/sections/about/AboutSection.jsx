import { motion } from 'framer-motion';
import SectionHeader from '../../common-components/SectionHeader';
import { portfolio } from '../../data/portfolio';
import './about.css';

export default function AboutSection() {
  return (
    <motion.section id="about" className="content-section about-section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
      <div className="container">
        <SectionHeader
          eyebrow="About"
          title={portfolio.about.title}
          description={portfolio.about.description}
        />

        <div className="about-panel">
          <div className="about-copy">
            <p>{portfolio.about.paragraphOne}</p>
            <p>{portfolio.about.paragraphTwo}</p>
          </div>
          <div className="about-details">
            <section className="about-detail-group" aria-labelledby="about-education-heading">
              <h3 id="about-education-heading">Education</h3>
              <article className="about-education">
                <h4>{portfolio.education.degree}</h4>
                <p>{portfolio.education.institution}</p>
                <div className="about-education-meta">
                  <span>{portfolio.education.period}</span>
                  <span>{portfolio.education.detail}</span>
                </div>
              </article>
            </section>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
