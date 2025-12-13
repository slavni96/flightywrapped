import { type FlightStats } from '../../types/flight';
import { ProgressIndicators } from '../molecules/ProgressIndicators';
import { SectionHeader } from '../molecules/SectionHeader';
import { Badge } from '../atoms/Badge';

const MAP_IMAGE = 'https://placeholder.pics/svg/600';

type CountriesSectionProps = {
  stats: FlightStats;
};

export function CountriesSection({ stats }: CountriesSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-6 shadow-card backdrop-blur-lg lg:p-8">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <ProgressIndicators total={4} activeIndex={1} />
          <Badge tone="primary">World Reach</Badge>
        </div>
        <div className="flex flex-col items-center gap-3">
          <SectionHeader
            align="center"
            title={`${stats.airports} Airports`}
            subtitle="Adaptive layout keeps the hero metric centered on any viewport."
          />
          <Badge tone="primary" className="bg-primary/20 text-primary">
            {stats.routes} routes mapped
          </Badge>
          <div className="relative w-full max-w-xl">
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-6 rounded-full border border-dashed border-white/15" />
            <div
              className="aspect-square w-full rounded-full bg-center bg-contain bg-no-repeat opacity-90"
              style={{ backgroundImage: `url(${MAP_IMAGE})` }}
              aria-label="Abstract world map"
            />
            <span className="absolute top-1/3 right-1/4 h-3 w-3 rounded-full bg-primary shadow-[0_0_20px_rgba(19,127,236,0.5)]" />
            <span className="absolute bottom-1/3 left-1/4 h-2 w-2 rounded-full bg-primary/70" />
          </div>
          <p className="text-center text-white/70">
            That’s your reach based on unique airport codes. Live counts update as soon as your CSV is parsed.
          </p>
        </div>
      </div>
    </section>
  );
}
