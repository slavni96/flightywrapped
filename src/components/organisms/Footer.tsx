export function Footer() {
  return (
    <footer className="mt-10 border-t border-white/5 bg-white/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center text-sm text-white/60 sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-3 text-white">
          <span className="material-symbols-outlined text-primary">flight_takeoff</span>
          <div className="text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
              Flighty Wrapped
            </p>
            <p className="text-white">© 2024</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white">
            About
          </a>
          <a href="#" className="hover:text-white">
            Privacy
          </a>
          <a href="#" className="hover:text-white">
            Creator
          </a>
        </div>
      </div>
    </footer>
  );
}
