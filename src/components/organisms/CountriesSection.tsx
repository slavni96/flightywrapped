import { type FlightStats } from '../../types/flight';
import { SectionHeader } from '../molecules/SectionHeader';
import { Badge } from '../atoms/Badge';

const MAP_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1200px-World_map_-_low_resolution.svg.png';

type CountriesSectionProps = {
  stats: FlightStats;
  containerId?: string;
};

const positionForCode = (code: string) => {
  const normalized = code.padEnd(2, 'X').slice(0, 2).toUpperCase();
  const letterValue = (ch: string) => Math.max(0, Math.min(25, ch.charCodeAt(0) - 65));
  const lon = (letterValue(normalized[0]) / 25) * 360 - 180; // -180..180
  const lat = 90 - (letterValue(normalized[1]) / 25) * 180; // 90..-90
  const x = ((lon + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { x: Math.max(2, Math.min(98, x)), y: Math.max(2, Math.min(98, y)) };
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
            {stats.airportCodes.map((code) => {
              const { x, y } = positionForCode(code);
              return (
                <span
                  key={code}
                  className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_rgba(19,127,236,0.6)]"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  title={code}
                />
              );
            })}
          </div>
          <p className="text-center text-slate-600">
            That’s your reach based on unique airport codes.
          </p>
        </div>
      </div>
    </section>
  );
}
