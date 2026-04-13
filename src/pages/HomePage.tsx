import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from '@/components/layout/Navbar';
import { About, Contact, Experience, Hero, Tech, Works } from '@/components/sections';
import AiLottie from '@/components/atoms/AiLottie';
import PersonalInfoModal from '@/components/atoms/PersonalInfoModal';
import { useI18n } from '@/context/I18nContext';

const HomePage = () => {
  const { t } = useI18n();
  const location = useLocation();
  const [personalInfoOpen, setPersonalInfoOpen] = useState(false);

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace(/^#/, '');
    const el = document.getElementById(id);
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [location.hash, location.pathname]);

  return (
    <div className="home-page-root relative z-0 min-h-screen text-warm-fg">
      <div className="border-b border-warm-border bg-transparent dark:border-warm-border/50">
        <Navbar />
        <Hero />
      </div>

      <div className="home-section-strip border-b border-warm-border/80 dark:border-warm-border/40">
        <About />
      </div>
      <div className="home-section-strip border-b border-warm-border/80 dark:border-warm-border/40">
        <Experience />
      </div>
      <div className="home-section-strip border-b border-warm-border/80 dark:border-warm-border/40">
        <Tech />
      </div>
      <div className="home-section-strip border-b border-warm-border/80 dark:border-warm-border/40">
        <Works />
      </div>
      <div className="home-section-strip relative z-0 border-t border-warm-border/80 dark:border-warm-border/40">
        <Contact />
      </div>

      <button
        type="button"
        aria-label={t('a11y.openAssistant')}
        aria-haspopup="dialog"
        onClick={() => setPersonalInfoOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-36 w-36 overflow-hidden rounded-[2rem] border border-warm-border bg-warm-chip shadow-[0_0_0_1px_var(--color-chip-ring),0_18px_40px_-16px_color-mix(in_oklab,var(--color-clay-tint)_28%,transparent)] transition hover:scale-[1.02]"
      >
        <AiLottie />
      </button>

      <PersonalInfoModal open={personalInfoOpen} onClose={() => setPersonalInfoOpen(false)} />
    </div>
  );
};

export default HomePage;
