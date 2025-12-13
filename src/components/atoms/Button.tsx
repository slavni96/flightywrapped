import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'soft' | 'muted';
  fullWidth?: boolean;
  icon?: ReactNode;
};

export function Button({
  children,
  className,
  variant = 'primary',
  fullWidth,
  icon,
  ...props
}: ButtonProps) {
  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary:
      'bg-primary text-white shadow-glow hover:bg-primary/90 active:scale-[0.99]',
    ghost:
      'bg-white/10 text-white border border-white/10 hover:bg-white/15 active:scale-[0.99]',
    soft:
      'bg-primary/15 text-primary border border-primary/20 hover:bg-primary/20',
    muted:
      'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 active:scale-[0.99]',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
      {icon}
    </button>
  );
}
