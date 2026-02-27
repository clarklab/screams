import { cn } from '@/lib/utils';

type BadgeVariant = 'lead' | 'supporting' | 'cameo' | 'ghostface' | 'franchise-regular';

const variantStyles: Record<BadgeVariant, string> = {
  lead: 'bg-[var(--accent-subtle)] text-[var(--accent)]',
  supporting: 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]',
  cameo: 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]',
  ghostface: 'bg-[var(--accent)] text-white',
  'franchise-regular': 'bg-[color:var(--color-franchise-badge)]/15 text-[var(--color-franchise-badge)]',
};

const variantLabels: Record<BadgeVariant, string> = {
  lead: 'Lead',
  supporting: 'Supporting',
  cameo: 'Cameo',
  ghostface: 'Ghostface',
  'franchise-regular': 'Franchise Regular',
};

interface BadgeProps {
  variant: BadgeVariant;
  label?: string;
  className?: string;
}

export function Badge({ variant, label, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[0.6875rem] font-medium leading-tight',
        variantStyles[variant],
        className
      )}
    >
      {label || variantLabels[variant]}
    </span>
  );
}
