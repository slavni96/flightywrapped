import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { ProgressIndicators } from '../molecules/ProgressIndicators';

type StoryNavigationProps = {
  current: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
  years: string[];
  selectedYear: string;
  onYearChange: (year: string) => void;
};

export function StoryNavigation({
  current,
  total,
  onNext,
  onPrev,
  years,
  selectedYear,
  onYearChange,
}: StoryNavigationProps) {
  const isLast = current === total - 1;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/70 bg-white p-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          Story mode
        </span>
        <ProgressIndicators total={total} activeIndex={current} />
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-xs font-semibold text-slate-600">Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year === 'all' ? 'All' : year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto sm:justify-end sm:flex-1">
        <Button
          variant="muted"
          icon={<Icon name="arrow_back" />}
          onClick={onPrev}
          disabled={current === 0}
        >
          Back
        </Button>
        {!isLast && (
          <Button
            variant="primary"
            className="ml-auto sm:ml-2"
            icon={<Icon name="arrow_forward" />}
            onClick={onNext}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
