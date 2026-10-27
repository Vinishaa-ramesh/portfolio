const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const requiredConfig = ['apiKey', 'authDomain', 'databaseURL', 'projectId', 'appId'];
export const firebaseConfigured = requiredConfig.every((key) => Boolean(firebaseConfig[key]));

const appCheckSiteKey = import.meta.env.VITE_FIREBASE_APP_CHECK_SITE_KEY;
const isValidAppCheckSiteKey = typeof appCheckSiteKey === 'string' && /^6L[A-Za-z0-9_-]{20,}$/.test(appCheckSiteKey);
export const appCheckMisconfigured = Boolean(appCheckSiteKey) && !isValidAppCheckSiteKey;

const failureCategories = new Set([
  'app_check_configuration_invalid',
  'app_check_initialization_failed',
  'contact_copy_failed',
  'contact_draft_storage_failed',
  'contact_submission_failed',
  'firebase_initialization_failed',
  'gmail_launch_failed',
  'session_storage_failed',
  'theme_palette_load_failed',
  'theme_preference_storage_failed',
  'visit_tracking_failed',
]);

let firebaseAppPromise;

async function writeClientFailure(app, category) {
  try {
    const { getDatabase, ref, push, set, serverTimestamp } = await import('firebase/database');
    const database = getDatabase(app);
    const eventRef = push(ref(database, 'clientEvents'));

    await set(eventRef, { category, timestamp: serverTimestamp() });
    return true;
  } catch {
    return false;
  }
}

async function writeClientFailureFallback(category) {
  if (!firebaseConfig.databaseURL) return;

  try {
    const eventId = crypto.randomUUID();
    const response = await fetch(`${firebaseConfig.databaseURL.replace(/\/$/, '')}/clientEvents/${eventId}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, timestamp: { '.sv': 'timestamp' } }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function reportClientFailure(category) {
  if (!failureCategories.has(category)) return;
  if (!firebaseConfigured) {
    await writeClientFailureFallback(category);
    return;
  }

  let app;
  try {
    app = await getFirebaseApp();
  } catch {
    await writeClientFailureFallback(category);
    return;
  }

  if (!await writeClientFailure(app, category)) {
    await writeClientFailureFallback(category);
  }
}

async function getFirebaseApp() {
  if (!firebaseConfigured) {
    throw new Error();
  }

  if (!firebaseAppPromise) {
    firebaseAppPromise = (async () => {
      const { getApp, getApps, initializeApp } = await import('firebase/app');
      const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

      if (appCheckMisconfigured) {
        void (async () => {
          if (!await writeClientFailure(app, 'app_check_configuration_invalid')) {
            await writeClientFailureFallback('app_check_configuration_invalid');
          }
        })();
      }

      if (isValidAppCheckSiteKey && !globalThis.__portfolioAppCheck) {
        try {
          const { initializeAppCheck, ReCaptchaV3Provider } = await import('firebase/app-check');
          globalThis.__portfolioAppCheck = initializeAppCheck(app, {
            provider: new ReCaptchaV3Provider(appCheckSiteKey),
            isTokenAutoRefreshEnabled: true,
          });
        } catch {
          void (async () => {
            if (!await writeClientFailure(app, 'app_check_initialization_failed')) {
              await writeClientFailureFallback('app_check_initialization_failed');
            }
          })();
        }
      }

      return app;
    })();
  }

  return firebaseAppPromise;
}

export async function recordSiteVisit() {
  try {
    const app = await getFirebaseApp();
    const { getDatabase, increment, ref, update } = await import('firebase/database');
    const database = getDatabase(app);
    await update(ref(database, 'siteStats'), { visits: increment(1) });
    return true;
  } catch {
    void reportClientFailure('visit_tracking_failed');
    return false;
  }
}

export async function saveContactMessage({ name, email, message }) {
  try {
    const app = await getFirebaseApp();
    const { addDoc, collection, getFirestore, serverTimestamp } = await import('firebase/firestore');
    const firestore = getFirestore(app);
    await addDoc(collection(firestore, 'contactMessages'), {
      name,
      email,
      message,
      createdAt: serverTimestamp(),
    });
    return true;
  } catch {
    void reportClientFailure('contact_submission_failed');
    return false;
  }
}
