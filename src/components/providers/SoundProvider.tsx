'use client';

import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useSound } from '@/hooks/useSound';
import type { SoundName } from '@/lib/sounds';

interface SoundContextValue {
  play: (name: SoundName) => void;
  setMuted: (muted: boolean) => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const { play, init, setMuted } = useSound();

  useEffect(() => {
    const handler = () => {
      init();
      window.removeEventListener('pointerdown', handler);
      window.removeEventListener('keydown', handler);
    };
    window.addEventListener('pointerdown', handler, { once: true });
    window.addEventListener('keydown', handler, { once: true });
    return () => {
      window.removeEventListener('pointerdown', handler);
      window.removeEventListener('keydown', handler);
    };
  }, [init]);

  return (
    <SoundContext.Provider value={{ play, setMuted }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundContext() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useSoundContext must be used within SoundProvider');
  return ctx;
}
