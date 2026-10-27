import { GraduationCap } from 'lucide-react';
import SectionHeader from '../../common-components/SectionHeader';
import { portfolio } from '../../data/portfolio';
import './education.css';

export default function EducationSection() {
  const { education } = portfolio;

  return (
    <section className="content-section education-section">
      <div className="container">
        <SectionHeader
          eyebrow="Education"
          title="Academic foundation."
          description="A concise view of the degree and institution listed in the resume."
        />

        <div className="education-card">
          <div className="education-icon">
            <GraduationCap size={20} />
          </div>
          <div>
            <h3>{education.degree}</h3>
            <p>{education.institution}</p>
            <div className="education-meta">
              <span>{education.period}</span>
              <span>{education.detail}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
