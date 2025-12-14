import { type FlightStats } from '../../types/flight';
import { SectionHeader } from '../molecules/SectionHeader';
import { Badge } from '../atoms/Badge';
import { airportLabel, getAirport } from '../../utils/airportLookup';

const MAP_IMAGE = `${import.meta.env.BASE_URL}world-map-2x1.png`;

type CountriesSectionProps = {
  stats: FlightStats;
  containerId?: string;
};

const positionForCode = (code: string) => {
  const info = getAirport(code);
  if (info?.latitude != null && info?.longitude != null) {
    const x = ((info.longitude + 180) / 360) * 100;
    const y = ((90 - info.latitude) / 180) * 100;
    return { x: Math.max(1, Math.min(99, x)), y: Math.max(1, Math.min(99, y)) };
  }

  // Fallback deterministic spread if coordinates are missing
  const normalized = code.padEnd(2, 'X').slice(0, 2).toUpperCase();
  const letterValue = (ch: string) => Math.max(0, Math.min(25, ch.charCodeAt(0) - 65));
  const lon = (letterValue(normalized[0]) / 25) * 360 - 180;
  const lat = 90 - (letterValue(normalized[1]) / 25) * 180;
  const x = ((lon + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { x: Math.max(1, Math.min(99, x)), y: Math.max(1, Math.min(99, y)) };
};

export function CountriesSection({ stats, containerId }: CountriesSectionProps) {
  return (
    <section
      id={containerId}
      className="relative overflow-hidden rounded-3xl border border-white/70 bg-white p-4 text-slate-900 shadow-card sm:p-6 lg:p-8 max-w-6xl w-full mx-auto"
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
          <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-inner">
            <div className="relative aspect-[2/1] w-full">
              <img
                src={MAP_IMAGE}
                alt="World map background"
                className="absolute inset-0 h-full w-full object-fill"
                loading="lazy"
              />
            </div>
            <div className="pointer-events-none absolute inset-3 rounded-2xl border border-primary/25 shadow-[inset_0_0_0_1px_rgba(19,127,236,0.08)]" />
            {stats.airportCodes.map((code) => {
              const { x, y } = positionForCode(code);
              const label = airportLabel(code);
              return (
                <span
                  key={code}
                  className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_14px_rgba(19,127,236,0.55)] ring-2 ring-white/80"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  title={label}
                  aria-label={label}
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
