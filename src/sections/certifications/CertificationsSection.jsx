import { Award } from 'lucide-react';
import SectionHeader from '../../common-components/SectionHeader';
import { portfolio } from '../../data/portfolio';
import './certifications.css';

export default function CertificationsSection() {
  return (
    <section id="certifications" className="content-section">
      <div className="container">
        <SectionHeader
          eyebrow="Certifications"
          description="Professional credentials and learning milestones."
        />

        {portfolio.certifications.length ? (
          <div className="cert-grid">...</div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <Award size={24} />
            </div>
            <h3>No certifications listed yet.</h3>
          </div>
        )}
      </div>
    </section>
  );
}
