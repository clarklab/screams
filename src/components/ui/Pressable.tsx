'use client';

import { type ReactNode, type MouseEvent, useCallback } from 'react';
import { motion } from 'motion/react';
import { springSnappy } from '@/lib/animations';
import { useRipple } from './Ripple';

interface PressableProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function Pressable({ children, className = '', onClick, disabled }: PressableProps) {
  const { ripples, addRipple, removeRipple } = useRipple();

  const handleClick = useCallback(
    (e: MouseEvent) => {
      addRipple(e);
      onClick?.();
    },
    [addRipple, onClick]
  );

  return (
    <motion.div
      className={`relative overflow-hidden cursor-pointer select-none ${className}`}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={springSnappy}
      onClick={disabled ? undefined : handleClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full bg-current opacity-[0.12] pointer-events-none"
          style={{
            left: r.x,
            top: r.y,
            width: 0,
            height: 0,
            transform: 'translate(-50%, -50%)',
            animation: 'ripple-expand 400ms ease-out forwards',
          }}
          onAnimationEnd={() => removeRipple(r.id)}
        />
      ))}
    </motion.div>
  );
}
