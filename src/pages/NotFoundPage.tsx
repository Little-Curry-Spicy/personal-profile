import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import notFoundLottieUrl from '@/assets/404.lottie?url';
import Navbar from '@/components/layout/Navbar';
import { styles } from '@/constants/styles';
import { useI18n } from '@/context/I18nContext';

const NotFoundPage = () => {
  const { t } = useI18n();

  return (
    <div className="relative z-0 min-h-screen bg-warm-page text-warm-fg">
      <Navbar />
      <main className={`${styles.paddingX} mx-auto flex max-w-2xl flex-col items-center justify-center px-4 pb-24 pt-36 text-center`}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="mx-auto mb-8 h-60 w-60 max-w-full sm:h-64 sm:w-64 md:h-80 md:w-80" aria-hidden>
            <DotLottieReact src={notFoundLottieUrl} loop autoplay className="h-full w-full" />
          </div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-warm-wash">404</p>
          <h1 className="boutique-display mt-4 text-3xl font-medium text-warm-fg">{t('notFound.title')}</h1>
          <p className="mt-4 text-[17px] leading-relaxed text-warm-muted">{t('notFound.body')}</p>
          <Link
            to="/"
            className="mt-10 inline-flex rounded-full border border-warm-border bg-warm-elevated px-7 py-3 text-sm font-medium text-warm-soft transition hover:border-warm-muted/40 hover:text-warm-fg"
          >
            {t('notFound.backHome')}
          </Link>
        </motion.div>
      </main>
    </div>
  );
};

export default NotFoundPage;
