import { ArrowUpRight, BookOpenText } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolio } from '../../data/portfolio';
import './publications.css';

export default function PublicationsSection() {
  return (
    <motion.section
      id="publications"
      className="content-section publications-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Publications</p>
          <h2>Research and publications.</h2>
        </div>

        <div className="publications-list">
          {portfolio.publications.map((publication) => (
            <article className="publication-card" key={`${publication.title}-${publication.date}`}>
              <div className="publication-heading">
                <div className="publication-icon" aria-hidden="true">
                  <BookOpenText size={20} />
                </div>
                <div>
                  <h3>{publication.title}</h3>
                  <p className="publication-meta">
                    <span>{publication.publisher}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={publication.dateTime}>{publication.date}</time>
                    {publication.url ? (
                      <a className="publication-link" href={publication.url} target="_blank" rel="noreferrer">
                        Show publication
                        <ArrowUpRight size={17} />
                      </a>
                    ) : null}
                  </p>
                </div>
              </div>

              <p className="publication-description">{publication.description}</p>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
