import { type FlightStats } from '../../types/flight';
import { SectionHeader } from '../molecules/SectionHeader';
import { StatCard } from '../molecules/StatCard';
import { airportLabel } from '../../utils/airportLookup';

type ItinerariesSectionProps = {
  stats: FlightStats;
  containerId?: string;
};

export function ItinerariesSection({ stats, containerId }: ItinerariesSectionProps) {
  return (
    <section
      id={containerId}
      className="overflow-hidden rounded-3xl border border-white/70 bg-white p-4 text-slate-900 shadow-card sm:p-6 lg:p-8 max-w-6xl w-full mx-auto"
    >
      <SectionHeader
        align="center"
        eyebrow="Flighty ✈"
        title="Itineraries & Airports"
        subtitle="Your most frequent takeoffs and landings."
      />
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon="flight_takeoff" title={stats.topOrigin?.code ?? '—'} subtitle="Top departure">
          {stats.topOrigin
            ? `${airportLabel(stats.topOrigin.code)} · ${stats.topOrigin.flights} flights out`
            : 'Upload to see your favorite hub.'}
        </StatCard>
        <StatCard icon="flight_land" title={stats.topDestination?.code ?? '—'} subtitle="Top arrival">
          {stats.topDestination
            ? `${airportLabel(stats.topDestination.code)} · ${stats.topDestination.flights} arrivals`
            : 'Your go-to landing spot.'}
        </StatCard>
        <StatCard icon="alt_route" title={stats.topRoute?.route ?? '—'} subtitle="Most flown route">
          {stats.topRoute
            ? `${stats.topRoute.flights} trips · ${stats.topRoute.route
                .split('-')
                .map((part) => airportLabel(part))
                .join(' → ')}`
            : 'Route stats appear after upload.'}
        </StatCard>
        <StatCard icon="public" title={`${stats.airports}`} subtitle="Airports visited">
          {stats.topAirportOverall
            ? `Most visited: ${airportLabel(stats.topAirportOverall.code)} (${stats.topAirportOverall.visits} times)`
            : 'Unique airports across your journeys.'}
        </StatCard>
        <StatCard icon="swap_calls" title={`${stats.routes}`} subtitle="Routes covered">
          Paired from your departures and arrivals.
        </StatCard>
        <StatCard icon="map" title={`${stats.airportCodes.length}`} subtitle="Airport codes mapped">
          Every unique IATA pulled from your trips.
        </StatCard>
      </div>
    </section>
  );
}
