import { portfolio } from '../data/portfolio';
import { getGmailComposeUrl, openGmail } from '../utils/gmail';

export default function GmailLink({ children, className = '', ...props }) {
  return (
    <a
      {...props}
      href={getGmailComposeUrl(portfolio.email)}
      className={className}
      onClick={(event) => openGmail(event, portfolio.email)}
    >
      {children}
    </a>
  );
}
