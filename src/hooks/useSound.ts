'use client';

import { useCallback, useRef, useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';
import { SOUND_MAP, type SoundName } from '@/lib/sounds';

export function useSound() {
  const reducedMotion = useReducedMotion();
  const howlsRef = useRef<Map<string, Howl>>(new Map());
  const initializedRef = useRef(false);
  const mutedRef = useRef(true);

  useEffect(() => {
    const howls = howlsRef.current;
    return () => {
      howls.forEach((howl) => howl.unload());
      howls.clear();
    };
  }, []);

  const init = useCallback(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    import('howler').then(({ Howl }) => {
      Object.entries(SOUND_MAP).forEach(([name, src]) => {
        try {
          const howl = new Howl({
            src: [src],
            preload: true,
            volume: 0.5,
            onloaderror: () => {
              howlsRef.current.delete(name);
            },
          });
          howlsRef.current.set(name, howl);
        } catch {
          // Gracefully handle missing sound files
        }
      });
    }).catch(() => {
      // Howler failed to load
    });
  }, []);

  const play = useCallback(
    (name: SoundName) => {
      if (reducedMotion || mutedRef.current) return;
      const howl = howlsRef.current.get(name);
      if (howl) {
        try { howl.play(); } catch { /* ignore */ }
      }
    },
    [reducedMotion]
  );

  const setMuted = useCallback((muted: boolean) => {
    mutedRef.current = muted;
  }, []);

  return { play, init, setMuted, isMuted: mutedRef.current };
}
