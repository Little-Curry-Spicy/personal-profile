import React from 'react';
import { motion } from 'framer-motion';

import { styles } from '../../constants/styles';
import { textVariant } from '../../utils/motion';

interface IHeader {
  useMotion: boolean;
  p?: string;
  h2: string;
}

export const Header: React.FC<IHeader> = ({ useMotion, h2 }) => {
  const content = (
    <>
      <h2
        className={`${styles.sectionHeadText} text-warm-fg`}
        style={{ fontFamily: 'Georgia, serif', fontWeight: 500 }}
      >
        {h2}
      </h2>
    </>
  );

  return useMotion === true ? <motion.div variants={textVariant()}>{content}</motion.div> : content;
};
