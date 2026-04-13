import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import roboLottieUrl from '@/assets/robo.lottie?url';

const AiLottie = () => {
  return (
    <motion.div
      className="h-full w-full overflow-hidden rounded-[1.7rem]"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="h-full w-full p-2">
        <DotLottieReact src={roboLottieUrl} loop autoplay />
      </div>
    </motion.div>
  );
};

export default AiLottie;
