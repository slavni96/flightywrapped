import { Icon } from '../atoms/Icon';

type HeaderProps = {
  hasData: boolean;
  onGoHome: () => void;
  onGoInsights: () => void;
  isOnInsights: boolean;
};

export function Header({ hasData, onGoHome, onGoInsights, isOnInsights }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex justify-center px-4 pt-4">
      <div className="flex w-full max-w-3xl items-center justify-between rounded-full border border-white/60 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-md md:mt-2">
        <button
          className="flex items-center gap-3 text-left"
          onClick={isOnInsights ? onGoHome : undefined}
          aria-label="Flighty Wrapped"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon name="flight_takeoff" className="text-2xl filled" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Flighty Wrapped
            </p>
            <p className="text-lg font-bold text-slate-900">Your 2025 in the Sky</p>
          </div>
        </button>
        {hasData && (
          <button
            onClick={onGoInsights}
            className="hidden rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/15 md:inline-flex"
          >
            View insights
          </button>
        )}
      </div>
    </header>
  );
}
