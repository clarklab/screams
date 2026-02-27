'use client';

import { useCallback } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useHaptic() {
  const reducedMotion = useReducedMotion();

  const vibrate = useCallback(
    (pattern: number | number[]) => {
      if (reducedMotion) return;
      navigator.vibrate?.(pattern);
    },
    [reducedMotion]
  );

  const light = useCallback(() => vibrate(10), [vibrate]);
  const medium = useCallback(() => vibrate(20), [vibrate]);
  const heavy = useCallback(() => vibrate([30, 50, 30]), [vibrate]);

  return { light, medium, heavy };
}
