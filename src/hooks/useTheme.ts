'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ThemeMode } from '@/types/theme';

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>('dark');

  const applyTheme = useCallback((mode: ThemeMode) => {
    const isDark =
      mode === 'dark' ||
      (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as ThemeMode | null;
    const initial = stored || 'dark';
    setThemeState(initial);
    applyTheme(initial);

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (theme === 'system') applyTheme('system');
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [applyTheme, theme]);

  const setTheme = useCallback(
    (mode: ThemeMode) => {
      setThemeState(mode);
      localStorage.setItem('theme', mode);
      applyTheme(mode);
    },
    [applyTheme]
  );

  const toggleTheme = useCallback(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  }, [setTheme]);

  const resolvedTheme = typeof window !== 'undefined'
    ? document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    : 'light';

  return { theme, resolvedTheme, setTheme, toggleTheme };
}
