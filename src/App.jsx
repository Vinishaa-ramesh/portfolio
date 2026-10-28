import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './sections/navigation/Navbar';
import Hero from './sections/hero/Hero';
import AboutSection from './sections/about/AboutSection';
import ExperienceSection from './sections/experience/ExperienceSection';
import ProjectsSection from './sections/projects/ProjectsSection';
import SkillsSection from './sections/skills/SkillsSection';
import CertificationsSection from './sections/certifications/CertificationsSection';
import ContactSection from './sections/contact/ContactSection';
import Footer from './sections/footer/Footer';
import { portfolio } from './data/portfolio';
import { firebaseConfigured, recordSiteVisit, reportClientFailure } from './services/firebase';

function getInitialTheme() {
  try {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
  } catch {
    void reportClientFailure('theme_preference_storage_failed');
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyThemeColors(colors, theme) {
  const root = document.documentElement;

  Object.entries(colors).forEach(([key, value]) => {
    if (key.startsWith('dark-')) {
      if (theme === 'dark') root.style.setProperty(`--${key.slice(5)}`, value);
      return;
    }

    root.style.setProperty(`--${key}`, value);
  });
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [colors, setColors] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}theme-colors.json`)
      .then((response) => {
        if (!response.ok) {
          return null;
        }
        return response.json();
      })
      .then((palette) => {
        if (palette) {
          setColors(palette);
        } else {
          void reportClientFailure('theme_palette_load_failed');
        }
      })
      .catch(() => {
        void reportClientFailure('theme_palette_load_failed');
      });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      void reportClientFailure('theme_preference_storage_failed');
    }
  }, [theme]);

  useEffect(() => {
    if (colors) applyThemeColors(colors, theme);
  }, [colors, theme]);

  useEffect(() => {
    if (!firebaseConfigured) {
      void reportClientFailure('firebase_initialization_failed');
      return;
    }

    const visitKey = 'portfolio-visit-recorded';
    try {
      if (sessionStorage.getItem(visitKey)) return;
      sessionStorage.setItem(visitKey, 'true');
    } catch {
      void reportClientFailure('session_storage_failed');
    }

    recordSiteVisit().then((recorded) => {
      if (recorded) return;
      try {
        sessionStorage.removeItem(visitKey);
      } catch {
        void reportClientFailure('session_storage_failed');
      }
    });
  }, []);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <Helmet>
        <title>{`${portfolio.name} | ${portfolio.title}`}</title>
        <meta name="description" content={portfolio.summary} />
        <meta property="og:title" content={`${portfolio.name} | ${portfolio.title}`} />
        <meta property="og:description" content={portfolio.summary} />
      </Helmet>

      <div className="page-shell">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <main>
          <Hero />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          {/* <CertificationsSection /> */}
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
