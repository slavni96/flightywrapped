import { type FlightStats } from '../../types/flight';
import { SectionHeader } from '../molecules/SectionHeader';
import { StatCard } from '../molecules/StatCard';
import { formatDuration } from '../../utils/format';
import { airlineLabel } from '../../utils/airlineLookup';

type PunctualitySectionProps = {
  stats: FlightStats;
  containerId?: string;
};

export function PunctualitySection({ stats, containerId }: PunctualitySectionProps) {
  return (
    <section
      id={containerId}
      className="overflow-hidden rounded-3xl border border-white/70 bg-white p-4 text-slate-900 shadow-card sm:p-6 lg:p-8 max-w-6xl w-full mx-auto"
    >
      <SectionHeader
        align="center"
        eyebrow="Flighty ✈"
        title="Time & Punctuality"
        subtitle="How often you stayed on schedule."
      />
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon="schedule"
          title={`${stats.onTimeDepartures + stats.onTimeArrivals}`}
          subtitle="On-time departures/arrivals"
        >
          {stats.onTimeDepartures} departures, {stats.onTimeArrivals} arrivals within the window.
        </StatCard>
        <StatCard
          icon="error"
          title={`${stats.delayedDepartures + stats.delayedArrivals}`}
          subtitle="Delays logged"
        >
          {stats.delayedDepartures} departures and {stats.delayedArrivals} arrivals ran late.
        </StatCard>
        <StatCard
          icon="timer"
          title={formatDuration(stats.averageDelayMinutes)}
          subtitle="Average delay"
        >
          Total delay accumulated: {formatDuration(stats.totalDelayMinutes)}.
        </StatCard>
        {stats.worstDelay && (
          <StatCard
            icon="warning"
            title={formatDuration(stats.worstDelay.minutes)}
            subtitle="Worst delay"
          >
            {stats.worstDelay.flight} {stats.worstDelay.from}-{stats.worstDelay.to} ({stats.worstDelay.phase})
          </StatCard>
        )}
        {stats.delayByAirline.length > 0 && (
          <StatCard
            icon="flight_takeoff"
            title={formatDuration(stats.delayByAirline[0].averageDelay)}
            subtitle="Most delayed airline"
          >
            {airlineLabel(stats.delayByAirline[0].name)} average per delayed flight.
          </StatCard>
        )}
        {stats.delayByOrigin.length > 0 && (
          <StatCard
            icon="place"
            title={formatDuration(stats.delayByOrigin[0].averageDelay)}
            subtitle="Most delayed airport"
          >
            {stats.delayByOrigin[0].code} average delay on departures/arrivals.
          </StatCard>
        )}
      </div>
    </section>
  );
}
