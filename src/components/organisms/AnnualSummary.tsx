import { type FlightStats } from '../../types/flight';
import { SectionHeader } from '../molecules/SectionHeader';
import { StatCard } from '../molecules/StatCard';

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
      className="overflow-hidden rounded-3xl border border-white/70 bg-white p-6 shadow-card lg:p-10"
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionHeader
            align="center"
            eyebrow={scopeLabel ?? `${stats.firstYear ?? '—'} In The Air`}
            title={`${stats.flights} Flights`}
            subtitle={subtitleText ?? 'Your year at a glance—miles, time, and routes ready to share.'}
          />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            {stats.airlines} airlines • {stats.routes} routes • {stats.airports} airports
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="relative flex h-64 w-64 items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-slate-200" />
            <div className="absolute inset-0 scale-125 rounded-full border border-dashed border-slate-200" />
            <div className="absolute h-40 w-40 rounded-full border-2 border-primary/30" />
            <div className="absolute flex h-full w-full items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-primary shadow-[0_0_15px_#137fec] animate-orbit" />
            </div>
            <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-slate-200 bg-white shadow-2xl">
              <span className="material-symbols-outlined text-4xl text-slate-800">public</span>
            </div>
          </div>

          <div className="grid w-full gap-4 sm:grid-cols-2">
            <StatCard icon="schedule" title={`${stats.totalHours}h`} subtitle="Total Time">
              Calculated locally for you.
            </StatCard>
            <StatCard icon="flight_takeoff" title={`${stats.flights}`} subtitle="Flights">
              Directly counted from your trips.
            </StatCard>
            <StatCard icon="public" title={`${stats.routes}`} subtitle="Routes">
              Unique origin-destination pairs in this view.
            </StatCard>
            <StatCard icon="groups" title={`${stats.airlines}`} subtitle="Airlines">
              Different carriers across your trips.
            </StatCard>
          </div>
        </div>
      </div>
    </section>
  );
}
