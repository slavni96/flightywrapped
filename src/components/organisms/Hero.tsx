import { type FlightStats } from '../../types/flight';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';

const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBixsi6XoR35BexcuOwKbROvmE2n9l_gFIxrY4BlRI6lj3KmG3qrJgQHdN88anJVZCSjhEpU5ZeGdC9l4K7ZjqAb1DSse1haAJCRlyW79fQ_HtXNT5em70WDXfueViFIG3o9GnjwZJ18cYCOjWqn3aw4FSl9Xggz1i3hL7xppk1oAVJagXgVsjUPZwfVmykkEP__OWQWzdqmm63JU068hry9pWLPNsEJueVto64je8KaUT7rmdfg4mniAVwZ-tI3nDFflYaPI2Jltu0';

type HeroProps = {
  stats?: FlightStats | null;
  onStart?: () => void;
};

export function Hero({ stats, onStart }: HeroProps) {
  return (
    <section className="grid gap-8 rounded-3xl border border-white/5 bg-white/5 p-6 shadow-card backdrop-blur-lg lg:grid-cols-2 lg:p-8">
      <div className="flex flex-col gap-6">
        <Badge tone="primary" className="w-fit">
          2024 Edition
        </Badge>
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl">
            Your Year <br /> in the Sky
          </h1>
          <p className="text-lg text-white/70">
            Visualise your Flighty history, instantly. See your travel story unfold with zero privacy
            compromises.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            variant="primary"
            icon={<Icon name="arrow_forward" />}
            className="sm:w-auto"
            fullWidth
            onClick={onStart}
          >
            Start Boarding
          </Button>
          <Button variant="ghost" icon={<Icon name="visibility" />} className="sm:w-auto" fullWidth>
            Preview the flow
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 text-white/80 sm:max-w-xl">
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-sm uppercase tracking-[0.18em] text-white/60">Flights</p>
            <p className="mt-2 text-2xl font-bold">{stats?.flights ?? '—'}</p>
            <p className="text-xs text-white/50">Loaded from your CSV</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-sm uppercase tracking-[0.18em] text-white/60">Time in air</p>
            <p className="mt-2 text-2xl font-bold">
              {stats ? `${stats.totalHours}h` : 'Local only'}
            </p>
            <p className="text-xs text-white/50">Processed in-browser</p>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-card">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-purple-500/20 mix-blend-overlay" />
        <div
          className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          aria-label="3D globe with flight routes"
        >
          <div className="absolute bottom-4 left-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Flighty Wrapped • Responsive
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
