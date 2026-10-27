export default function Button({ children, variant = 'primary', className = '', href, type = 'button', ...props }) {
  const classes = ['button', `button-${variant}`, className].filter(Boolean).join(' ');

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
