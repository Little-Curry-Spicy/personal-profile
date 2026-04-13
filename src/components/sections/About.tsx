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

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        viewport={{ once: true, amount: 0.6 }}
        onViewportEnter={() => setHasStartedTyping(true)}
        className="mt-4 max-w-3xl whitespace-pre-line text-[17px] leading-[1.75] text-warm-fg"
      >
        {typedContent}
        {hasStartedTyping && typedContent.length < aboutContent.length ? (
          <span className="animate-pulse text-[#c96442]">|</span>
        ) : null}
      </motion.p>
    </>
  );
};

export default SectionWrapper(About, 'about');
