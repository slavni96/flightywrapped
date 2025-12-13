import { type FlightStats } from '../../types/flight';
import { ProgressIndicators } from '../molecules/ProgressIndicators';
import { SectionHeader } from '../molecules/SectionHeader';
import { StatCard } from '../molecules/StatCard';

type AnnualSummaryProps = {
  stats: FlightStats;
};

export function AnnualSummary({ stats }: AnnualSummaryProps) {
  return (
    <section
      id="stats"
      className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#101922] via-[#0f172a] to-[#0a1016] p-6 shadow-card lg:p-10"
    >
      <div className="mb-6 flex items-center justify-between">
        <ProgressIndicators total={4} activeIndex={0} />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Stories</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionHeader
            align="center"
            eyebrow={`${stats.firstYear ?? '—'} In The Air`}
            title={`${stats.flights} Flights`}
            subtitle="Flights parsed from your CSV. Adaptive layout for every screen."
          />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
            {stats.airlines} airlines • {stats.routes} routes • {stats.airports} airports
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="relative flex h-64 w-64 items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-0 scale-125 rounded-full border border-dashed border-white/10" />
            <div className="absolute h-40 w-40 rounded-full border-2 border-primary/30" />
            <div className="absolute flex h-full w-full items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-primary shadow-[0_0_15px_#137fec] animate-orbit" />
            </div>
            <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-[#1c2936] shadow-2xl">
              <span className="material-symbols-outlined text-4xl text-white/90">public</span>
            </div>
          </div>

          <div className="grid w-full gap-4 sm:grid-cols-2">
            <StatCard icon="schedule" title={`${stats.totalHours}h`} subtitle="Total Time">
              Calculated locally from your timestamps.
            </StatCard>
            <StatCard icon="flight_takeoff" title={`${stats.flights}`} subtitle="Flights">
              Directly counted from your CSV rows.
            </StatCard>
          </div>
        </div>
      </div>
    </section>
  );
}
