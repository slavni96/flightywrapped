import { type ReactNode } from 'react';
import { cn } from '../../utils/cn';

type BadgeProps = {
  children: ReactNode;
  tone?: 'neutral' | 'success' | 'primary';
  className?: string;
};

export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  const tones: Record<NonNullable<BadgeProps['tone']>, string> = {
    neutral: 'bg-white/10 text-white border-white/20',
    success: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    primary: 'bg-primary/15 text-primary border-primary/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
