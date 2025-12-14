export function Footer() {
  return (
    <footer className="mt-6 border-t border-white/60 bg-white py-2 sm:sticky sm:bottom-0 w-full">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center text-sm text-slate-600 sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-3 text-slate-900">
          <span className="material-symbols-outlined text-primary">flight_takeoff</span>
          <div className="text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Flighty Wrapped
            </p>
            <p className="text-slate-900">© 2025</p>
          </div>
        </div>
        <span className="text-sm text-slate-700">
          Made with ❤️ from Italy during a flight TPE → PVG → MXP · by{' '}
          <a className="underline hover:text-primary" href="https://slavni96.github.io/">
            slavni96
          </a>
        </span>
      </div>
    </footer>
  );
}
