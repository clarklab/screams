'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function AtmosphereCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (reducedMotion || !canvasRef.current) {
      setSupported(false);
      return;
    }

    const canvas = canvasRef.current;
    let atmosphereInstance: { destroy: () => void } | null = null;
    let frameCount = 0;
    const startTime = performance.now();

    // Performance gate: benchmark first 10 frames
    const testCtx = canvas.getContext('webgl');
    if (!testCtx) {
      setSupported(false);
      return;
    }

    import('@/lib/webgl/atmosphere').then(({ createAtmosphere }) => {
      atmosphereInstance = createAtmosphere(canvas, 0.3);

      // Benchmark after 10 frames
      const checkPerf = () => {
        frameCount++;
        if (frameCount === 10) {
          const elapsed = performance.now() - startTime;
          const fps = 10000 / elapsed;
          if (fps < 30) {
            atmosphereInstance?.destroy();
            setSupported(false);
          }
        } else if (frameCount < 10) {
          requestAnimationFrame(checkPerf);
        }
      };
      requestAnimationFrame(checkPerf);
    });

    return () => {
      atmosphereInstance?.destroy();
    };
  }, [reducedMotion]);

  if (!supported || reducedMotion) {
    return (
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(196, 30, 30, 0.05) 0%, transparent 70%)',
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none"
    />
  );
}
