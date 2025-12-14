import { type FlightStats } from '../../types/flight';
import { SectionHeader } from '../molecules/SectionHeader';
import { StatCard } from '../molecules/StatCard';

type FrequencySectionProps = {
  stats: FlightStats;
  containerId?: string;
};

const formatDate = (value?: string) => {
  if (!value) return '—';
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return value;
  return new Date(parsed).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

export function FrequencySection({ stats, containerId }: FrequencySectionProps) {
  return (
    <section
      id={containerId}
      className="overflow-hidden rounded-3xl border border-white/70 bg-white p-4 text-slate-900 shadow-card sm:p-6 lg:p-8 max-w-6xl w-full mx-auto"
    >
      <SectionHeader
        align="center"
        eyebrow="Flighty ✈"
        title="Frequency & Dates"
        subtitle="Your busiest moments in the air."
      />
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon="calendar_month" title={stats.topMonth ?? '—'} subtitle="Busiest month">
          {stats.topYear ? `In ${stats.topYear}` : 'Upload your flights to unlock this.'}
        </StatCard>
        <StatCard icon="event_busy" title={stats.topWeekday ?? '—'} subtitle="Most-flown day">
          Across every week.
        </StatCard>
        <StatCard icon="timeline" title={stats.topYear ? `${stats.topYear}` : '—'} subtitle="Most flown year">
          {stats.firstYear && stats.lastYear ? `${stats.firstYear}–${stats.lastYear}` : 'Year span visible after upload.'}
        </StatCard>
        <StatCard
          icon="first_page"
          title={formatDate(stats.firstFlight?.date)}
          subtitle="First flight in data"
        >
          {stats.firstFlight ? `${stats.firstFlight.flight} ${stats.firstFlight.from}-${stats.firstFlight.to}` : 'Waiting for your flights.'}
        </StatCard>
        <StatCard icon="last_page" title={formatDate(stats.lastFlight?.date)} subtitle="Most recent flight">
          {stats.lastFlight ? `${stats.lastFlight.flight} ${stats.lastFlight.from}-${stats.lastFlight.to}` : 'Add flights to see this.'}
        </StatCard>
      </div>
    </section>
  );
}
