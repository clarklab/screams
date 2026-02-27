export const SOUND_MAP = {
  tap: '/sounds/tap.wav',
  tick: '/sounds/tick.wav',
  'spoiler-reveal': '/sounds/spoiler-reveal.wav',
  'sheet-up': '/sounds/sheet-up.wav',
  'sheet-down': '/sounds/sheet-down.wav',
  toggle: '/sounds/toggle.wav',
  back: '/sounds/back.wav',
  warn: '/sounds/warn.wav',
  badge: '/sounds/badge.wav',
  ring: '/sounds/ring.wav',
} as const;

export type SoundName = keyof typeof SOUND_MAP;
