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
          title="Building thoughtful software with real-world impact."
          description="Software engineering focused on useful, dependable products across Android and full-stack development."
        />

        <div className="about-grid">
          <div className="about-copy">
            <p>{portfolio.about.paragraphOne}</p>
            <p>{portfolio.about.paragraphTwo}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
