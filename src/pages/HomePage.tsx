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
    <div className="relative z-0 bg-warm-page text-warm-fg">
      <div className="border-b border-warm-border">
        <Navbar />
        <Hero />
      </div>

      <div className="border-b border-warm-subtle bg-warm-elevated">
        <About />
      </div>
      <div className="border-b border-warm-border bg-warm-page">
        <Experience />
      </div>
      <div className="border-b border-warm-subtle bg-warm-elevated">
        <Tech />
      </div>
      <div className="border-b border-warm-border bg-warm-page">
        <Works />
      </div>
      <div className="relative z-0 border-t border-warm-border bg-warm-page">
        <Contact />
      </div>

      <button
        type="button"
        aria-label={t('a11y.openAssistant')}
        aria-haspopup="dialog"
        onClick={() => setPersonalInfoOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-36 w-36 overflow-hidden rounded-[2rem] border border-warm-border bg-warm-chip shadow-[0_0_0_1px_var(--color-chip-ring)] transition hover:scale-[1.02]"
      >
        <AiLottie />
      </button>

      <PersonalInfoModal open={personalInfoOpen} onClose={() => setPersonalInfoOpen(false)} />
    </div>
  );
};

export default HomePage;
