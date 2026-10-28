import SectionHeader from '../../common-components/SectionHeader';
import { portfolio } from '../../data/portfolio';
import './skills.css';

export default function SkillsSection() {
  return (
    <section id="skills" className="content-section">
      <div className="container">
        <SectionHeader
          eyebrow="Skills"
          description="A practical toolkit for product engineering."
        />

        <div className="skills-grid">
          {Object.entries(portfolio.skills).map(([category, items]) => (
            <div className="skill-group" key={category}>
              <h3>{category}</h3>
              <div className="skill-list">
                {items.map((item) => (
                  <span key={item} className="skill-pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
