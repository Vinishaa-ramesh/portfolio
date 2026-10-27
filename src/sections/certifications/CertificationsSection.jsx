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
          title="Professional credentials and learning milestones."
          description="The resume does not list any explicit certifications, so this section is intentionally kept as a structured empty state ready for future additions."
        />

        {portfolio.certifications.length ? (
          <div className="cert-grid">...</div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <Award size={24} />
            </div>
            <h3>No certifications listed in the resume.</h3>
            <p>
              This portfolio is configured to accept future certification entries in the centralized data file without inventing credentials.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
