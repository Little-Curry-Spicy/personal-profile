import type { TMotion } from '../types';
import type { Variants } from 'framer-motion';

export const textVariant = (): Variants => {
  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 1.25,
      },
    },
  };
};

export const fadeIn = (
  direction: TMotion['direction'],
  type: TMotion['type'],
  delay: TMotion['delay'],
  duration: TMotion['duration']
): Variants => {
  const transitionType = type || 'tween';

  return {
    hidden: {
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: transitionType,
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  };
};

export const slideIn = (
  direction: TMotion['direction'],
  type: TMotion['type'],
  delay: TMotion['delay'],
  duration: TMotion['duration']
): Variants => {
  const transitionType = type || 'tween';

  return {
    hidden: {
      x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
      y: direction === 'up' ? '100%' : direction === 'down' ? '100%' : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type: transitionType,
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  };
};
