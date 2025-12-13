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
            'flex h-8 w-8 items-center justify-center rounded-full text-sm text-slate-900 ring-4 ring-white',
            highlight ? 'bg-primary text-white shadow-glow' : 'bg-slate-100',
          )}
        >
          <Icon name={icon} className="text-[18px]" />
        </div>
        {!isLast && <div className="my-1 w-px flex-1 bg-slate-200" />}
      </div>
      <div className={cn('pb-8 pt-1', isLast && 'pb-0')}>
        <p className="text-base font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm text-slate-600 leading-snug">{description}</p>
      </div>
    </div>
  );
}
