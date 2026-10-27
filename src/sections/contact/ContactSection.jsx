import { useEffect, useState } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import SectionHeader from '../../common-components/SectionHeader';
import { portfolio } from '../../data/portfolio';
import Button from '../../common-components/Button';
import { appCheckMisconfigured, firebaseConfigured, saveContactMessage } from '../../services/firebase';
import './contact.css';

const emptyForm = { name: '', email: '', message: '' };
const contactDraftKey = 'portfolio-contact-draft';

function getSavedDraft() {
  try {
    const savedDraft = JSON.parse(localStorage.getItem(contactDraftKey) || 'null');
    if (!savedDraft || typeof savedDraft !== 'object') return emptyForm;

    return {
      name: typeof savedDraft.name === 'string' ? savedDraft.name.slice(0, 100) : '',
      email: typeof savedDraft.email === 'string' ? savedDraft.email.slice(0, 254) : '',
      message: typeof savedDraft.message === 'string' ? savedDraft.message.slice(0, 5000) : '',
    };
  } catch (error) {
    console.warn('Unable to restore the saved contact draft.', error);
    return emptyForm;
  }
}

export default function ContactSection() {
  const [form, setForm] = useState(getSavedDraft);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    try {
      if (Object.values(form).some((value) => value.trim())) {
        localStorage.setItem(contactDraftKey, JSON.stringify(form));
      } else {
        localStorage.removeItem(contactDraftKey);
      }
    } catch (error) {
      console.warn('Unable to save the contact draft locally.', error);
    }
  }, [form]);

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (new FormData(event.currentTarget).get('website')) return;

    setIsSubmitting(true);
    setStatus(null);

    try {
      await saveContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      setForm(emptyForm);
      setStatus({ type: 'success', text: 'Thanks for reaching out. Your message has been received.' });
    } catch (error) {
      console.error('Unable to save the contact message.', error);
      setStatus({
        type: 'error',
        text: appCheckMisconfigured
          ? 'Firebase rejected the message because App Check is enabled with an invalid site key. Configure a reCAPTCHA v3 site key and try again.'
          : 'Your message could not be saved. Please email me directly instead.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="content-section contact-section">
      <div className="container">
        <SectionHeader
          eyebrow="Contact"
          title="Let&apos;s build something useful together."
          description="Have a role, collaboration, or idea in mind? Send me a message."
        />

        <div className="contact-card">
          <div className="contact-copy">
            <h3>Get in touch</h3>
            <p>
              I enjoy working with product teams to turn ideas into dependable engineering systems, from Android experiences to full-stack product delivery and AI-powered workflows.
            </p>
            <div className="contact-links">
              <a href={`mailto:${portfolio.email}`}>
                <Mail size={16} />
                {portfolio.email}
              </a>
              <a href={`tel:${portfolio.phone.replace(/\s+/g, '')}`}>
                <Phone size={16} />
                {portfolio.phone}
              </a>
              <a href={portfolio.links.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={16} />
                LinkedIn
                <ArrowUpRight size={14} />
              </a>
              <a href={portfolio.links.github} target="_blank" rel="noreferrer">
                <Github size={16} />
                GitHub
                <ArrowUpRight size={14} />
              </a>
              <span>
                <MapPin size={16} />
                {portfolio.location}
              </span>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={updateField}
                autoComplete="name"
                maxLength={100}
                required
              />
            </label>
            <label>
              Email address
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                autoComplete="email"
                maxLength={254}
                required
              />
            </label>
            <label>
              Message
              <textarea
                name="message"
                value={form.message}
                onChange={updateField}
                rows={5}
                maxLength={5000}
                required
              />
            </label>
            <p className="contact-draft-note">Your message draft is saved on this device and will be restored if you refresh.</p>
            <input className="contact-honeypot" type="text" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" />
            {status ? <p className={`contact-status ${status.type}`} role={status.type === 'error' ? 'alert' : 'status'}>{status.text}</p> : null}
            {!firebaseConfigured ? (
              <p className="contact-status info" role="status">Firebase setup is needed before messages can be sent. You can email me directly using the address on the left.</p>
            ) : null}
            <Button type="submit" className="contact-submit" disabled={isSubmitting || !firebaseConfigured}>
              {isSubmitting ? 'Sending…' : 'Send message'}
              <Send size={17} />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
