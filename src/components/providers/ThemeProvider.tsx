'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useTheme } from '@/hooks/useTheme';
import type { ThemeMode } from '@/types/theme';

interface ThemeContextValue {
  theme: ThemeMode;
  resolvedTheme: string;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeValue = useTheme();
  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be used within ThemeProvider');
  return ctx;
}
