import { type FlightStats } from '../../types/flight';
import { SectionHeader } from '../molecules/SectionHeader';
import { StatCard } from '../molecules/StatCard';

type DurationSectionProps = {
  stats: FlightStats;
  containerId?: string;
};

export function DurationSection({ stats, containerId }: DurationSectionProps) {
  const totalHours = Math.floor(stats.totalMinutes / 60);
  const totalMins = stats.totalMinutes % 60;
  const avgHours = Math.floor(stats.averageFlightMinutes / 60);
  const avgMins = stats.averageFlightMinutes % 60;

  return (
    <section
      id={containerId}
      className="overflow-hidden rounded-3xl border border-white/70 bg-white p-4 text-slate-900 shadow-card sm:p-6 lg:p-8 max-w-3xl mx-auto"
    >
      <SectionHeader
        align="center"
        eyebrow="Flighty ✈"
        title="Durations"
        subtitle="Quick hops to long hauls in one snapshot."
      />
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon="schedule" title={`${totalHours}h ${totalMins}m`} subtitle="Time in the air">
          Average flight {avgHours}h {avgMins}m.
        </StatCard>
        <StatCard icon="bolt" title={`${stats.durationBuckets.short}`} subtitle="Short hops (&lt;2h)">
          Fastest legs in your year.
        </StatCard>
        <StatCard icon="flight_class" title={`${stats.durationBuckets.medium}`} subtitle="Medium (2–4h)">
          Balanced regional runs.
        </StatCard>
        <StatCard icon="public" title={`${stats.durationBuckets.long}`} subtitle="Long (&gt;4h)">
          All your long-haul stretches.
        </StatCard>
        {stats.longestFlight && (
          <StatCard
            icon="trending_up"
            title={`${stats.longestFlight.minutes}m`}
            subtitle="Longest sector"
          >
            {stats.longestFlight.flight} {stats.longestFlight.from}-{stats.longestFlight.to}
          </StatCard>
        )}
        {stats.shortestFlight && (
          <StatCard
            icon="trending_down"
            title={`${stats.shortestFlight.minutes}m`}
            subtitle="Shortest sector"
          >
            {stats.shortestFlight.flight} {stats.shortestFlight.from}-{stats.shortestFlight.to}
          </StatCard>
        )}
      </div>
    </section>
  );
}
