import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-[var(--bg-tertiary)] rounded-lg relative overflow-hidden',
        className
      )}
    >
      <div
        className="absolute inset-0 -translate-x-full motion-reduce:hidden"
        style={{
          backgroundImage:
            'linear-gradient(90deg, transparent, var(--bg-secondary), transparent)',
          animation: 'shimmer-slide 1500ms linear infinite',
        }}
      />
    </div>
  );
}
