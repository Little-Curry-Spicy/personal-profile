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
      <h2 className={`${styles.sectionHeadText} font-medium text-warm-fg`}>
        {h2}
      </h2>
    </>
  );

  return useMotion === true ? <motion.div variants={textVariant()}>{content}</motion.div> : content;
};
