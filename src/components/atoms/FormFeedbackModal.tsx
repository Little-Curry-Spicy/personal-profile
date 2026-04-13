import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

export type FormFeedbackVariant = 'success' | 'error' | 'warning';

type FormFeedbackModalProps = {
  open: boolean;
  onClose: () => void;
  variant: FormFeedbackVariant;
  title: string;
  dismissLabel: string;
  children: React.ReactNode;
};

function VariantIcon({ variant }: { variant: FormFeedbackVariant }) {
  const common = 'h-6 w-6';
  if (variant === 'success') {
    return (
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (variant === 'warning') {
    return (
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-700 dark:text-amber-400">
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M12 3 2 19h20L12 3z" strokeLinejoin="round" />
          <path d="M12 9v4" strokeLinecap="round" />
          <path d="M12 17h.01" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-warm-accent/15 text-warm-accent">
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
      </svg>
    </span>
  );
}

const FormFeedbackModal = ({ open, onClose, variant, title, dismissLabel, children }: FormFeedbackModalProps) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="form-feedback"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[88] flex items-center justify-center bg-warm-fg/55 p-4 backdrop-blur-sm dark:bg-black/70"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 6 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="form-feedback-title"
            aria-describedby="form-feedback-desc"
            className="w-full max-w-md overflow-hidden rounded-2xl border border-warm-border bg-warm-elevated shadow-[0_0_0_1px_var(--color-subtle),0_24px_64px_-12px_rgba(0,0,0,0.35)]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex gap-4 px-6 pb-2 pt-6">
              <VariantIcon variant={variant} />
              <div className="min-w-0 flex-1">
                <h2 id="form-feedback-title" className="text-lg font-semibold leading-snug text-warm-fg">
                  {title}
                </h2>
                <div
                  id="form-feedback-desc"
                  className="mt-3 max-h-[min(52vh,320px)] overflow-y-auto text-[15px] leading-relaxed text-warm-muted whitespace-pre-line"
                >
                  {children}
                </div>
              </div>
            </div>
            <div className="flex justify-end border-t border-warm-border/80 bg-warm-page/40 px-4 py-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-warm-accent px-5 py-2.5 text-sm font-semibold text-[#faf9f5] shadow-[0_0_0_1px_var(--color-accent)] transition hover:opacity-95"
              >
                {dismissLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
};

export default FormFeedbackModal;
