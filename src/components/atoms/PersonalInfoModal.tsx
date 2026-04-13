import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { config } from '@/constants/config';
import { useI18n } from '@/context/I18nContext';

type PersonalInfoModalProps = {
  open: boolean;
  onClose: () => void;
};

const PersonalInfoModal = ({ open, onClose }: PersonalInfoModalProps) => {
  const { t } = useI18n();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="personal-info-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-warm-fg/88 p-4 backdrop-blur-sm dark:bg-black/85"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            role="dialog"
            aria-modal="true"
            aria-label={t('infoEmbed.title')}
            className="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-warm-border bg-warm-elevated shadow-[0_0_0_1px_var(--color-subtle),0_40px_80px_-20px_rgba(0,0,0,0.45)]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-warm-border px-4 py-3">
              <p className="text-sm font-medium text-warm-fg">{t('infoEmbed.title')}</p>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-warm-border bg-warm-page px-3 py-1.5 text-sm font-medium text-warm-soft transition hover:text-warm-fg"
              >
                {t('infoEmbed.close')}
              </button>
            </div>
            <iframe
              src={config.personalInfoEmbedUrl}
              title={t('infoEmbed.title')}
              className="h-[min(72vh,720px)] w-full border-0 bg-warm-page sm:h-[min(70vh,680px)]"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default PersonalInfoModal;
