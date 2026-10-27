import { motion } from 'framer-motion';
import { ArrowUpRight, Image as ImageIcon } from 'lucide-react';
import SectionHeader from '../../common-components/SectionHeader';
import TagList from '../../common-components/TagList';
import { portfolio } from '../../data/portfolio';
import './projects.css';

export default function ProjectsSection() {
  return (
    <motion.section id="projects" className="content-section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
      <div className="container">
        <SectionHeader
          eyebrow="Projects"
          title="Selected projects."
          description="A closer look at the products, experiments, and engineering work I build."
        />

        {portfolio.projects.length ? (
          <div className="projects-grid">
            {portfolio.projects.map((project, index) => (
              <article key={project.id || `${project.name}-${index}`} className="project-card">
                <div className="project-visual">
                  {project.image ? (
                    <img src={project.image} alt={project.imageAlt || `${project.name} preview`} />
                  ) : (
                    <div className="project-image-placeholder" aria-hidden="true">
                      <ImageIcon size={28} />
                      <span>Project image</span>
                    </div>
                  )}
                </div>

                <div className="project-body">
                  <div className="project-header">
                    <h3>{project.name}</h3>
                    {project.link ? (
                      <a href={project.link} aria-label={`Open ${project.name}`} target="_blank" rel="noreferrer">
                        <ArrowUpRight size={17} />
                      </a>
                    ) : null}
                  </div>

                  {project.description ? <p className="project-description">{project.description}</p> : null}

                  {project.impact ? (
                    <div className="project-meta">
                      <span>Impact</span>
                      <p>{project.impact}</p>
                    </div>
                  ) : null}

                  {project.sections?.length ? (
                    <div className="project-details">
                      {project.sections.map((section, sectionIndex) => (
                        <div className="project-detail" key={section.title || sectionIndex}>
                          {section.title ? <h4>{section.title}</h4> : null}
                          {section.content ? <p>{section.content}</p> : null}
                          {section.items?.length ? (
                            <ul>
                              {section.items.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {project.skills?.length ? <TagList items={project.skills} className="tech-tags" /> : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="projects-empty-state">
            <span className="projects-empty-icon" aria-hidden="true"><ImageIcon size={20} /></span>
            <div>
              <h3>Project case studies are on the way</h3>
              <p>Add your project details to the <code>projects</code> array in <code>src/data/portfolio.js</code> to create a card here.</p>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}
