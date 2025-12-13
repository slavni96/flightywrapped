import { fleet } from '../../data/content';
import { type FlightStats } from '../../types/flight';
import { SectionHeader } from '../molecules/SectionHeader';
import { Icon } from '../atoms/Icon';
import { cn } from '../../utils/cn';

type FleetSectionProps = {
  stats: FlightStats;
  containerId?: string;
};

export function FleetSection({ stats, containerId }: FleetSectionProps) {
  return (
    <section
      id={containerId}
      className="rounded-3xl bg-gradient-to-b from-[#3b0aff] via-[#4b1fff] to-[#2a0b74] p-6 text-white shadow-card lg:p-10 max-w-3xl mx-auto"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionHeader
            align="center"
            eyebrow="Fleet"
            title="Your Fleet"
            subtitle="From classics to modern wide-bodies across your flights."
          />
          <div className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            <div className="h-px flex-1 bg-slate-200" />
            {stats.firstYear ?? '—'} to {stats.lastYear ?? '—'}
            <div className="h-px flex-1 bg-slate-200" />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {[fleet.oldest, fleet.newest].map((plane, index) => (
            <div
              key={plane.model}
              className="group relative overflow-hidden rounded-2xl border border-white/50 bg-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div
                className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${plane.image})` }}
                aria-label={plane.model}
              />
              <div className="relative z-10 flex h-full min-h-[220px] flex-col justify-between p-5">
                <div className="flex items-start justify-between">
                  <span className="rounded-full border border-primary/30 bg-primary/15 px-2 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                    {index === 0 ? 'First flight on record' : 'Most flown type'}
                  </span>
                  <span className="font-mono text-sm text-white/80">
                    {index === 0
                      ? stats.firstYear ?? '—'
                      : `${stats.topAircraftCount ?? '—'} flts`}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-slate-200">
                    {index === 0 ? 'Oldest flown' : 'Most modern'}
                  </p>
                  <h3 className="text-2xl font-bold leading-tight text-white">
                    {index === 0 ? plane.model : stats.topAircraft ?? plane.model}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 rounded-2xl border border-white/40 bg-white/10 p-5">
          <h3 className="text-lg font-bold text-white">Fleet Composition</h3>
          <div className="flex flex-col gap-3">
            {stats.aircraftBreakdown.length === 0 && (
              <p className="text-sm text-white/80">Add data with aircraft types to see a split.</p>
            )}
            {stats.aircraftBreakdown.map((maker) => (
              <div
                key={maker.name}
                className="flex items-center gap-4 rounded-xl border border-white/40 bg-white/10 p-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary-foreground">
                  <Icon name="flight" />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-end justify-between">
                    <span className="font-semibold text-white">{maker.name}</span>
                    <span className="text-lg font-bold text-white">
                      {maker.flights}
                      <span className="ml-1 text-xs font-normal text-white/70">flts</span>
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className={cn('h-full rounded-full', 'bg-primary')}
                      style={{ width: `${maker.share}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-white/80">
          From the roar of the classics to modern wide-bodies, your fleet is rendered instantly from
          your data.
        </p>
      </div>
    </section>
  );
}
