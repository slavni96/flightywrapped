import { Icon } from '../atoms/Icon';
import { cn } from '../../utils/cn';

type TimelineItemProps = {
  icon: string;
  title: string;
  description: string;
  isLast?: boolean;
  highlight?: boolean;
};

export function TimelineItem({
  icon,
  title,
  description,
  isLast,
  highlight,
}: TimelineItemProps) {
  return (
    <div className="grid grid-cols-[32px_1fr] gap-x-4">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full text-sm text-white ring-4 ring-background-dark',
            highlight ? 'bg-primary shadow-glow' : 'bg-white/10',
          )}
        >
          <Icon name={icon} className="text-[18px]" />
        </div>
        {!isLast && <div className="my-1 w-px flex-1 bg-white/10" />}
      </div>
      <div className={cn('pb-8 pt-1', isLast && 'pb-0')}>
        <p className="text-base font-semibold text-white">{title}</p>
        <p className="mt-1 text-sm text-white/60 leading-snug">{description}</p>
      </div>
    </div>
  );
}
