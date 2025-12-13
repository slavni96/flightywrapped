import { Icon } from '../atoms/Icon';
import { cn } from '../../utils/cn';

type StatCardProps = {
  icon?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  tone?: 'default' | 'primary';
};

export function StatCard({
  icon,
  title,
  subtitle,
  children,
  className,
  tone = 'default',
}: StatCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 transition-transform duration-200 hover:-translate-y-1 hover:border-primary/40 hover:bg-white/10',
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <div className="relative z-10 flex flex-col items-start gap-2 text-white">
        {icon && (
          <div
            className={cn(
              'rounded-full p-2 text-primary',
              tone === 'primary' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white',
            )}
          >
            <Icon name={icon} className="text-2xl" />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <span className="text-3xl font-bold leading-none tracking-tight">{title}</span>
          {subtitle && (
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              {subtitle}
            </span>
          )}
        </div>
        {children && <div className="text-sm text-white/70">{children}</div>}
      </div>
    </div>
  );
}
