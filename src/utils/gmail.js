import { reportClientFailure } from '../services/firebase';

export function getGmailComposeUrl(email) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
}

export function openGmail(event, email) {
  const userAgent = navigator.userAgent;
  const isAppleMobile = /iPhone|iPad|iPod/i.test(userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(userAgent);
  const webUrl = getGmailComposeUrl(email);

  if (!isAppleMobile && !isAndroid) return;

  event.preventDefault();

  if (isAndroid) {
    const intentUrl = `intent://co?to=${encodeURIComponent(email)}#Intent;scheme=googlegmail;package=com.google.android.gm;S.browser_fallback_url=${encodeURIComponent(webUrl)};end`;
    try {
      window.location.href = intentUrl;
    } catch {
      void reportClientFailure('gmail_launch_failed');
      window.location.href = webUrl;
    }
    return;
  }

  let fallbackTimer;
  const clearFallback = () => {
    if (document.visibilityState === 'hidden') {
      window.clearTimeout(fallbackTimer);
      document.removeEventListener('visibilitychange', clearFallback);
    }
  };

  document.addEventListener('visibilitychange', clearFallback);
  fallbackTimer = window.setTimeout(() => {
    document.removeEventListener('visibilitychange', clearFallback);
    if (document.visibilityState === 'visible') window.location.href = webUrl;
  }, 1200);
  try {
    window.location.href = `googlegmail://co?to=${encodeURIComponent(email)}`;
  } catch {
    window.clearTimeout(fallbackTimer);
    document.removeEventListener('visibilitychange', clearFallback);
    void reportClientFailure('gmail_launch_failed');
    window.location.href = webUrl;
  }
}
