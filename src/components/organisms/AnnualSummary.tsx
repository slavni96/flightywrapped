import { type FlightStats } from '../../types/flight';
import { SectionHeader } from '../molecules/SectionHeader';
import { StatCard } from '../molecules/StatCard';
import { formatDuration } from '../../utils/format';
import { airlineLabel } from '../../utils/airlineLookup';

type AnnualSummaryProps = {
  stats: FlightStats;
  scopeLabel?: string;
  subtitleText?: string;
  containerId?: string;
};

export function AnnualSummary({ stats, scopeLabel, subtitleText, containerId }: AnnualSummaryProps) {
  return (
    <section
      id={containerId}
      className="overflow-hidden rounded-3xl border border-white/70 bg-white p-4 text-slate-900 shadow-card sm:p-6 lg:p-8 max-w-6xl w-full mx-auto"
    >
      <SectionHeader
        align="center"
        eyebrow="Flighty ✈"
        title={scopeLabel ?? `${stats.firstYear ?? '—'} In The Air`}
        subtitle={
          subtitleText ??
          `This year, you took ${stats.flights} flights across ${stats.routes} routes and ${stats.airports} airports.`
        }
      />

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <StatCard icon="flight_takeoff" title={`${stats.flights}`} subtitle="Flights">
          Across {stats.routes} routes and {stats.airports} airports.
        </StatCard>
        <StatCard icon="schedule" title={formatDuration(stats.totalMinutes)} subtitle="Total time">
          Average flight: {formatDuration(stats.averageFlightMinutes)}.
        </StatCard>
        {stats.shortestFlight && (
          <StatCard icon="trending_down" title={formatDuration(stats.shortestFlight.minutes)} subtitle="Shortest flight">
            {stats.shortestFlight.flight} {stats.shortestFlight.from}-{stats.shortestFlight.to}
          </StatCard>
        )}
        {stats.longestFlight && (
          <StatCard icon="trending_up" title={formatDuration(stats.longestFlight.minutes)} subtitle="Longest flight">
            {stats.longestFlight.flight} {stats.longestFlight.from}-{stats.longestFlight.to}
          </StatCard>
        )}
        {stats.topAirlineByTime && (
          <StatCard icon="workspace_premium" title={formatDuration(stats.topAirlineByTime.minutes)} subtitle="Most time on">
            {airlineLabel(stats.topAirlineByTime.name)}
          </StatCard>
        )}
        {stats.topAirlines.length > 0 && (
          <StatCard icon="groups" title={`${stats.airlines}`} subtitle="Airlines flown">
            Top carrier: {airlineLabel(stats.topAirlines[0].name)} ({stats.topAirlines[0].flights} flights)
          </StatCard>
        )}
      </div>
    </section>
  );
}
