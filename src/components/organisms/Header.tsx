import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';

type HeaderProps = {
  hasData: boolean;
  onGoHome: () => void;
  onGoInsights: () => void;
  isOnInsights: boolean;
};

export function Header({ hasData, onGoHome, onGoInsights, isOnInsights }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-background-dark/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        <button
          className="flex items-center gap-2 text-left"
          onClick={onGoHome}
          aria-label="Back to home"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <Icon name="flight_takeoff" className="text-2xl filled" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
              Flighty Wrapped
            </p>
            <p className="text-lg font-bold text-white">Your 2024 in the Sky</p>
          </div>
        </button>
        <div className="hidden items-center gap-3 md:flex">
          <nav className="flex items-center gap-4 text-sm text-white/70">
            {!isOnInsights && (
              <>
                <a href="#upload" className="hover:text-white">
                  Upload
                </a>
                <a href="#how-it-works" className="hover:text-white">
                  How it works
                </a>
              </>
            )}
            {hasData && (
              <button onClick={onGoInsights} className="hover:text-white">
                Insights
              </button>
            )}
          </nav>
          {hasData ? (
            <Button variant="ghost" icon={<Icon name={isOnInsights ? 'home' : 'arrow_forward'} />} onClick={isOnInsights ? onGoHome : onGoInsights}>
              {isOnInsights ? 'Back home' : 'View insights'}
            </Button>
          ) : (
            <Button variant="ghost" icon={<Icon name="menu" />}>
              Menu
            </Button>
          )}
        </div>
        <button className="md:hidden rounded-full border border-white/10 bg-white/5 p-2 text-white/70">
          <Icon name="menu" />
        </button>
      </div>
    </header>
  );
}
