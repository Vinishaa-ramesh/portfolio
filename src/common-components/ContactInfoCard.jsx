export default function ContactInfoCard({ icon: Icon, label, children, action }) {
  return (
    <article className="contact-info-card">
      <span className="contact-info-icon" aria-hidden="true">
        <Icon size={19} />
      </span>
      <div className="contact-info-content">
        <p className="contact-info-label">{label}</p>
        <div className="contact-info-value">{children}</div>
      </div>
      {action ? <div className="contact-info-action">{action}</div> : null}
    </article>
  );
}
