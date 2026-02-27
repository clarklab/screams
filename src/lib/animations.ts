import type { Transition, Variants } from 'motion/react';

export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
};

export const springBouncy: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
};

export const springGentle: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: springGentle },
};

export const staggerChildren: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const cardPress: Variants = {
  rest: { scale: 1 },
  pressed: { scale: 0.97 },
};

export const tabContent: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: springSnappy,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    transition: { duration: 0.2 },
  }),
};
