import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { ProgressIndicators } from '../molecules/ProgressIndicators';

type StoryNavigationProps = {
  current: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
};

export function StoryNavigation({ current, total, onNext, onPrev }: StoryNavigationProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/70 bg-white p-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          Story mode
        </span>
        <ProgressIndicators total={total} activeIndex={current} />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="bg-slate-100 text-slate-700 hover:bg-slate-200"
          icon={<Icon name="arrow_back" />}
          onClick={onPrev}
          disabled={current === 0}
        >
          Back
        </Button>
        <Button
          variant="primary"
          icon={<Icon name="arrow_forward" />}
          onClick={onNext}
          disabled={current === total - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
