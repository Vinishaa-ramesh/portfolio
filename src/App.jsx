import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './sections/navigation/Navbar';
import Hero from './sections/hero/Hero';
import AboutSection from './sections/about/AboutSection';
import ExperienceSection from './sections/experience/ExperienceSection';
import ProjectsSection from './sections/projects/ProjectsSection';
import SkillsSection from './sections/skills/SkillsSection';
import CertificationsSection from './sections/certifications/CertificationsSection';
import EducationSection from './sections/education/EducationSection';
import ContactSection from './sections/contact/ContactSection';
import Footer from './sections/footer/Footer';
import { portfolio } from './data/portfolio';
import { firebaseConfigured, recordSiteVisit } from './services/firebase';

function getInitialTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
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
          throw new Error(`Failed to load theme colors (${response.status})`);
        }
        return response.json();
      })
      .then(setColors)
      .catch((error) => {
        console.error('Unable to load theme colors.', error);
      });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (colors) applyThemeColors(colors, theme);
  }, [colors, theme]);

  useEffect(() => {
    if (!firebaseConfigured) return;

    const visitKey = 'portfolio-visit-recorded';
    if (sessionStorage.getItem(visitKey)) return;

    sessionStorage.setItem(visitKey, 'true');
    recordSiteVisit().catch((error) => {
      sessionStorage.removeItem(visitKey);
      console.error('Unable to record the portfolio visit.', error);
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
          <CertificationsSection />
          <EducationSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
