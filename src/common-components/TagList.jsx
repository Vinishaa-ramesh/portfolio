export default function TagList({ items = [], className = '' }) {
  return (
    <div className={`tag-list ${className}`.trim()}>
      {items.map((item) => (
        <span key={item} className="tag">
          {item}
        </span>
      ))}
    </div>
  );
}
