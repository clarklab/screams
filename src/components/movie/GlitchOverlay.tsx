'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface GlitchOverlayProps {
  active: boolean;
  onComplete: () => void;
}

export function GlitchOverlay({ active, onComplete }: GlitchOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active || reducedMotion) {
      if (active) onComplete();
      return;
    }

    setVisible(true);

    import('@/lib/webgl/glitch').then(({ createGlitch }) => {
      if (canvasRef.current) {
        createGlitch(canvasRef.current, 200).then(() => {
          setVisible(false);
          onComplete();
        });
      }
    }).catch(() => {
      setVisible(false);
      onComplete();
    });
  }, [active, reducedMotion, onComplete]);

  if (!visible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 w-full h-full pointer-events-none"
    />
  );
}
