import { type FlightStats } from '../../types/flight';
import { StatCard } from '../molecules/StatCard';

type AnnualSummaryProps = {
  stats: FlightStats;
  scopeLabel?: string;
  subtitleText?: string;
  containerId?: string;
};

export function AnnualSummary({ stats, scopeLabel, subtitleText, containerId }: AnnualSummaryProps) {
  const totalHours = Math.floor(stats.totalMinutes / 60);
  const totalMins = stats.totalMinutes % 60;
  const avgHours = Math.floor(stats.averageFlightMinutes / 60);
  const avgMins = stats.averageFlightMinutes % 60;

  return (
    <section
      id={containerId}
      className="overflow-hidden rounded-3xl bg-gradient-to-b from-[#3b0aff] via-[#4b1fff] to-[#2a0b74] p-6 text-white shadow-card lg:p-10 max-w-3xl mx-auto"
    >
      <div className="flex flex-col items-center text-center gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-90">Flighty ✈</p>
        <h2 className="text-4xl font-extrabold leading-tight">
          {scopeLabel ?? `${stats.firstYear ?? '—'} In The Air`}
        </h2>
        <p className="text-lg font-semibold leading-snug max-w-xl">
          {subtitleText ?? `This year, you took ${stats.flights} flights across ${stats.routes} routes.`}
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <StatCard icon="flight_takeoff" title={`${stats.flights}`} subtitle="Flights">
          Across {stats.routes} routes and {stats.airports} airports.
        </StatCard>
        <StatCard icon="schedule" title={`${totalHours}h ${totalMins}m`} subtitle="Total time">
          Average flight: {avgHours}h {avgMins}m.
        </StatCard>
        {stats.shortestFlight && (
          <StatCard icon="trending_down" title={`${stats.shortestFlight.minutes}m`} subtitle="Shortest flight">
            {stats.shortestFlight.flight} {stats.shortestFlight.from}-{stats.shortestFlight.to}
          </StatCard>
        )}
        {stats.longestFlight && (
          <StatCard icon="trending_up" title={`${stats.longestFlight.minutes}m`} subtitle="Longest flight">
            {stats.longestFlight.flight} {stats.longestFlight.from}-{stats.longestFlight.to}
          </StatCard>
        )}
        {stats.topAirlineByTime && (
          <StatCard icon="workspace_premium" title={`${Math.round(stats.topAirlineByTime.minutes / 60)}h`} subtitle="Most time on">
            {stats.topAirlineByTime.name}
          </StatCard>
        )}
        {stats.topAirlines.length > 0 && (
          <StatCard icon="groups" title={`${stats.airlines}`} subtitle="Airlines flown">
            Top carrier: {stats.topAirlines[0].name} ({stats.topAirlines[0].flights} flights)
          </StatCard>
        )}
      </div>
    </section>
  );
}
