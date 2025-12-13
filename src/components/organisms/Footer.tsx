export function Footer() {
  return (
    <footer className="mt-10 border-t border-white/60 bg-white py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center text-sm text-slate-600 sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-3 text-slate-900">
          <span className="material-symbols-outlined text-primary">flight_takeoff</span>
          <div className="text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Flighty Wrapped
            </p>
            <p className="text-slate-900">© 2025</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-primary">
            About
          </a>
          <a href="#" className="hover:text-primary">
            Privacy
          </a>
          <a href="#" className="hover:text-primary">
            Creator
          </a>
        </div>
      </div>
    </footer>
  );
}
