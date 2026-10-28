import { send } from '@emailjs/browser';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const emailjsConfigured = Boolean(serviceId && templateId && publicKey);

export async function sendContactNotification({ name, email, message }) {
  if (!emailjsConfigured) {
    throw new Error('EmailJS is not configured.');
  }

  await send(
    serviceId,
    templateId,
    {
      title: 'New portfolio contact message',
      name,
      time: new Date().toLocaleString(),
      from_name: name,
      from_email: email,
      reply_to: email,
      message,
    },
    { publicKey },
  );
}
