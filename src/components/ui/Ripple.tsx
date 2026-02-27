'use client';

import { useState, useCallback, type MouseEvent } from 'react';

interface RippleItem {
  x: number;
  y: number;
  id: number;
}

export function Ripple() {
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  const handleRemove = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return (
    <>
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
          onAnimationEnd={() => handleRemove(r.id)}
        />
      ))}
    </>
  );
}

export function useRipple() {
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  const addRipple = useCallback((e: MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipples((prev) => [
      ...prev,
      {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        id: Date.now(),
      },
    ]);
  }, []);

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return { ripples, addRipple, removeRipple };
}
