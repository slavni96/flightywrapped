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
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/slavni96/flightywrapped"
            className="hidden items-center justify-center rounded-full border border-slate-200 bg-white px-2 py-1 text-slate-700 transition hover:bg-slate-100 md:inline-flex"
            aria-label="GitHub repository"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.95.68 1.93 0 1.39-.01 2.52-.01 2.87 0 .27.18.6.69.49A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/>
            </svg>
          </a>
          {hasData && (
            <button
              onClick={onGoInsights}
              className="hidden rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/15 md:inline-flex"
            >
              View insights
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
