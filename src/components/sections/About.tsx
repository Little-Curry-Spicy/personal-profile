import { useEffect, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';

import SectionWrapper from './SectionWrapper';
import { fadeIn } from '@/shared/animations';
import { Header } from '@/shared/ui';
import { useI18n } from '@/context/I18nContext';

const About = () => {
  const { catalog } = useI18n();
  const aboutContent = catalog.about.content;
  const [typedContent, setTypedContent] = useState('');
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  /** 切换语言时立刻清空，避免短暂显示上一语言的完整正文 */
  useLayoutEffect(() => {
    setTypedContent('');
  }, [aboutContent]);

  useEffect(() => {
    if (!hasStartedTyping) return;

    let currentIndex = 0;
    const timer = window.setInterval(() => {
      currentIndex += 1;
      setTypedContent(aboutContent.slice(0, currentIndex));

      if (currentIndex >= aboutContent.length) {
        window.clearInterval(timer);
      }
    }, 20);

    return () => window.clearInterval(timer);
  }, [aboutContent, hasStartedTyping]);

  return (
    <>
      <Header useMotion={true} h2={catalog.about.h2} />

      <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_min(100%,300px)] lg:items-start lg:gap-14 xl:min-w-0">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          viewport={{ once: true, amount: 0.6 }}
          onViewportEnter={() => setHasStartedTyping(true)}
          className="max-w-3xl whitespace-pre-line text-[17px] leading-[1.75] text-warm-fg"
        >
          {typedContent}
          {hasStartedTyping && typedContent.length < aboutContent.length ? (
            <span className="animate-pulse text-warm-accent">|</span>
          ) : null}
        </motion.p>

        <motion.aside
          variants={fadeIn('left', 'tween', 0.2, 0.75)}
          viewport={{ once: true, amount: 0.35 }}
          className="relative border border-warm-border bg-warm-elevated/90 px-7 py-8 shadow-sm backdrop-blur-sm dark:border-warm-border/50 dark:bg-warm-elevated/70 lg:sticky lg:top-32 lg:px-8 lg:py-9"
          style={{ borderRadius: '1.35rem' }}
        >
          <span
            className="boutique-display pointer-events-none absolute left-5 top-5 select-none text-[4.5rem] leading-none text-warm-accent/20 lg:left-6 lg:top-6"
            aria-hidden
          >
            &ldquo;
          </span>
          <blockquote className="boutique-display relative z-10 pt-10 text-[1.35rem] leading-snug text-warm-fg sm:text-[1.4rem] lg:text-[1.45rem]">
            {catalog.about.quote}
          </blockquote>
          <p className="mt-8 border-t border-warm-border/70 pt-5 text-[12px] font-medium tracking-wide text-warm-muted dark:border-warm-border/40">
            <cite className="not-italic">{catalog.about.quoteAttribution}</cite>
          </p>
        </motion.aside>
      </div>
    </>
  );
};

export default SectionWrapper(About, 'about');
