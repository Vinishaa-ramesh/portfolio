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

if (appCheckMisconfigured) {
  console.warn(
    'Firebase App Check was not initialized: VITE_FIREBASE_APP_CHECK_SITE_KEY must be a reCAPTCHA v3 site key. Google Analytics IDs starting with G- are not valid App Check keys.',
  );
}

let firebaseAppPromise;

async function getFirebaseApp() {
  if (!firebaseConfigured) {
    throw new Error('Firebase is not configured. Add the required VITE_FIREBASE_* values.');
  }

  if (!firebaseAppPromise) {
    firebaseAppPromise = (async () => {
      const { getApp, getApps, initializeApp } = await import('firebase/app');
      const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

      if (isValidAppCheckSiteKey && !globalThis.__portfolioAppCheck) {
        const { initializeAppCheck, ReCaptchaV3Provider } = await import('firebase/app-check');
        globalThis.__portfolioAppCheck = initializeAppCheck(app, {
          provider: new ReCaptchaV3Provider(appCheckSiteKey),
          isTokenAutoRefreshEnabled: true,
        });
      }

      return app;
    })();
  }

  return firebaseAppPromise;
}

export async function recordSiteVisit() {
  const app = await getFirebaseApp();
  const { getDatabase, increment, ref, update } = await import('firebase/database');
  const database = getDatabase(app);
  await update(ref(database, 'siteStats'), { visits: increment(1) });
}

export async function saveContactMessage({ name, email, message }) {
  const app = await getFirebaseApp();
  const { addDoc, collection, getFirestore, serverTimestamp } = await import('firebase/firestore');
  const firestore = getFirestore(app);
  await addDoc(collection(firestore, 'contactMessages'), {
    name,
    email,
    message,
    createdAt: serverTimestamp(),
  });
}
