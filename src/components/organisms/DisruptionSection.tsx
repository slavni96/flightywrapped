import { type FlightStats } from '../../types/flight';
import { SectionHeader } from '../molecules/SectionHeader';
import { StatCard } from '../molecules/StatCard';

type DisruptionSectionProps = {
  stats: FlightStats;
  containerId?: string;
};

export function DisruptionSection({ stats, containerId }: DisruptionSectionProps) {
  return (
    <section
      id={containerId}
      className="overflow-hidden rounded-3xl border border-white/70 bg-white p-4 text-slate-900 shadow-card sm:p-6 lg:p-8 max-w-3xl mx-auto"
    >
      <SectionHeader
        align="center"
        eyebrow="Flighty ✈"
        title="Disruptions"
        subtitle="Cancellations and diversions at a glance."
      />
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon="cancel" title={`${stats.canceled}`} subtitle="Cancellations">
          Flights that never left the gate.
        </StatCard>
        <StatCard icon="alt_route" title={`${stats.diverted}`} subtitle="Diversions">
          Re-routed journeys captured here.
        </StatCard>
        <StatCard icon="speed" title={`${stats.totalDelayMinutes}m`} subtitle="Total delay time">
          Average delay: {stats.averageDelayMinutes} minutes.
        </StatCard>
        {stats.delayByAirline.length > 1 && (
          <StatCard
            icon="travel_explore"
            title={`${stats.delayByAirline[1].averageDelay}m`}
            subtitle="Another airline delay avg."
          >
            {stats.delayByAirline[1].name} averaged per delayed flight.
          </StatCard>
        )}
      </div>
    </section>
  );
}
