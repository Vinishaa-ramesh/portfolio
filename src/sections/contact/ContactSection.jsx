import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import ContactInfoCard from '../../common-components/ContactInfoCard';
import SectionHeader from '../../common-components/SectionHeader';
import GmailLink from '../../common-components/GmailLink';
import { portfolio } from '../../data/portfolio';
import Button from '../../common-components/Button';
import { firebaseConfigured, reportClientFailure, saveContactMessage } from '../../services/firebase';
import { emailjsConfigured, sendContactNotification } from '../../services/emailjs';
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
  } catch {
    void reportClientFailure('contact_draft_storage_failed');
    return emptyForm;
  }
}

export default function ContactSection() {
  const [form, setForm] = useState(getSavedDraft);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [copyStatus, setCopyStatus] = useState('');

  useEffect(() => {
    try {
      if (Object.values(form).some((value) => value.trim())) {
        localStorage.setItem(contactDraftKey, JSON.stringify(form));
      } else {
        localStorage.removeItem(contactDraftKey);
      }
    } catch {
      void reportClientFailure('contact_draft_storage_failed');
    }
  }, [form]);

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const copyContactDetail = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus(`${label} copied.`);
    } catch {
      void reportClientFailure('contact_copy_failed');
      setCopyStatus(`Couldn't copy ${label.toLowerCase()}. Please select and copy it.`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (new FormData(event.currentTarget).get('website')) return;

    setIsSubmitting(true);
    setStatus(null);

    try {
      const saved = await saveContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      if (!saved) {
        setStatus({
          type: 'error',
          text: "We couldn't send your message. Please try again or email me directly.",
        });
        return;
      }

      setForm(emptyForm);
      try {
        await sendContactNotification({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        });
        setStatus({ type: 'success', text: 'Thanks for reaching out. Your message has been received.' });
      } catch {
        void reportClientFailure('contact_notification_failed');
        setStatus({
          type: 'error',
          text: 'Thanks for reaching out. Your message has been received. 2',
        });
      }
    } catch {
      void reportClientFailure('contact_submission_failed');
      setStatus({
        type: 'error',
        text: "We couldn't send your message. Please try again or email me directly.",
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
          description="Have a role, collaboration, or idea in mind? Send me a message."
        />

        <div className="contact-card">
          <aside className="contact-copy" aria-label="Contact details">
            <h3>Get in touch</h3>
            <div className="contact-info-list">
              <ContactInfoCard
                icon={Mail}
                label="Email"
                action={(
                  <button
                    type="button"
                    className="copy-contact-button"
                    onClick={() => copyContactDetail('Email address', portfolio.email)}
                    aria-label="Copy email address"
                    title="Copy email address"
                  >
                    {copyStatus === 'Email address copied.' ? <Check size={15} /> : <Copy size={15} />}
                  </button>
                )}
              >
                <GmailLink target="_blank" rel="noreferrer">{portfolio.email}</GmailLink>
              </ContactInfoCard>

              <ContactInfoCard
                icon={Phone}
                label="Phone"
                action={(
                  <button
                    type="button"
                    className="copy-contact-button"
                    onClick={() => copyContactDetail('Phone number', portfolio.phone)}
                    aria-label="Copy phone number"
                    title="Copy phone number"
                  >
                    {copyStatus === 'Phone number copied.' ? <Check size={15} /> : <Copy size={15} />}
                  </button>
                )}
              >
                <a href={`tel:${portfolio.phone.replace(/\s+/g, '')}`}>{portfolio.phone}</a>
              </ContactInfoCard>

              <ContactInfoCard icon={MapPin} label="Location">
                <span>{portfolio.location}</span>
              </ContactInfoCard>
            </div>
            {copyStatus ? <p className="contact-copy-status" role="status">{copyStatus}</p> : null}

            <div className="contact-social">
              <p>Connect</p>
              <div className="contact-social-links">
                <a
                  href={portfolio.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  title="LinkedIn"
                >
                  <span className="social-icon-circle">
                    <Linkedin size={22} />
                  </span>
                  <span>LinkedIn</span>
                </a>

                <a
                  href={portfolio.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  title="GitHub"
                >
                  <span className="social-icon-circle">
                    <Github size={22} />
                  </span>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </aside>
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
            {(!firebaseConfigured || !emailjsConfigured) ? (
              <p className="contact-status info" role="status">
                The contact form is unavailable until Firebase and EmailJS are configured. Please email me directly instead.
              </p>
            ) : null}
            <Button
              type="submit"
              className="contact-submit"
              disabled={isSubmitting || !firebaseConfigured || !emailjsConfigured}
            >
              {isSubmitting ? 'Sending…' : 'Send message'}
              <Send size={17} />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
