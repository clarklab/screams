import type { ReactNode } from 'react';

export function SafeArea({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-lg min-h-dvh">
      {children}
    </div>
  );
}
