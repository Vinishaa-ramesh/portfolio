import { motion } from 'framer-motion';
import { BriefcaseBusiness } from 'lucide-react';
import SectionHeader from '../../common-components/SectionHeader';
import TagList from '../../common-components/TagList';
import { portfolio } from '../../data/portfolio';
import './experience.css';

export default function ExperienceSection() {
  return (
    <motion.section id="experience" className="content-section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
      <div className="container">
        <SectionHeader
          eyebrow="Experience"
          title="Engineering work with measurable traction."
          description="My experience combines product ownership, production reliability, and technical execution across mobile and full-stack systems."
        />

        <div className="timeline">
          {portfolio.experience.map((role) => (
            <article className="timeline-item" key={`${role.company}-${role.title}`}>
              <div className="timeline-marker">
                <BriefcaseBusiness size={16} />
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <div>
                    <h3>{role.title}</h3>
                    <p className="meta-line">
                      <a href={role.website} target="_blank" rel="noreferrer">
                        {role.company}
                      </a>{' '}
                      · {role.location}
                    </p>
                  </div>
                  <span className="date-pill">{role.period}</span>
                </div>

                <div className="role-summary">
                  <h4>Work summary</h4>
                  <p className="role-description">{role.description}</p>
                </div>

                <div className="role-contributions">
                  <h4>Selected contributions</h4>
                  <ul className="bullet-list">
                    {role.bullets.slice(0, 4).map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>

                <TagList items={role.technologies} className="tech-tags" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
