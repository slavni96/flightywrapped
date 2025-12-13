import { type FlightStats } from '../../types/flight';
import { SectionHeader } from '../molecules/SectionHeader';
import { Badge } from '../atoms/Badge';

const MAP_IMAGE = 'https://placeholder.pics/svg/600';

type CountriesSectionProps = {
  stats: FlightStats;
  containerId?: string;
};

export function CountriesSection({ stats, containerId }: CountriesSectionProps) {
  return (
    <section
      id={containerId}
      className="relative overflow-hidden rounded-3xl border border-white/70 bg-white p-4 text-slate-900 shadow-card sm:p-6 lg:p-8 max-w-3xl mx-auto"
    >
      <div className="relative z-10 flex flex-col gap-6">
        <SectionHeader
          align="center"
          eyebrow="Flighty ✈"
          title="World Reach"
          subtitle={`You visited ${stats.airports} airports across ${stats.routes} routes.`}
        />
        <div className="flex flex-col items-center gap-3">
          <Badge tone="primary" className="bg-primary/20 text-primary">
            {stats.routes} routes mapped
          </Badge>
          <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/5 to-indigo-100" />
            <div
              className="relative aspect-[3/2] w-full bg-cover bg-center opacity-90"
              style={{ backgroundImage: `url(${MAP_IMAGE})` }}
              aria-label="Abstract world map"
            />
            <div className="absolute inset-4 rounded-xl border border-primary/30 pointer-events-none" />
            <span className="absolute top-1/3 right-1/4 h-3 w-3 rounded-full bg-primary shadow-[0_0_20px_rgba(19,127,236,0.5)]" />
            <span className="absolute bottom-1/3 left-1/4 h-2 w-2 rounded-full bg-primary/70" />
          </div>
          <p className="text-center text-slate-600">
            That’s your reach based on unique airport codes.
          </p>
        </div>
      </div>
    </section>
  );
}
