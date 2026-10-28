export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      {description ? <p className="section-copy">{description}</p> : null}
    </div>
  );
}
