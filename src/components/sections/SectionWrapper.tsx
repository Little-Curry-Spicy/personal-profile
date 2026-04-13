import { motion } from 'framer-motion';
import type { ComponentType } from 'react';

import { styles } from '@/constants/styles';

const SectionWrapper = (Component: ComponentType, idName: string) =>
  function HOC() {
    return (
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} relative z-0 mx-auto min-h-screen max-w-7xl`}
        id={idName}
      >
        <span className="hash-span">&nbsp;</span>

        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;
