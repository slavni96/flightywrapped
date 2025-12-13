import { type FlightStats } from '../../types/flight';
import { SectionHeader } from '../molecules/SectionHeader';
import { Icon } from '../atoms/Icon';

type AirlineSectionProps = {
  stats: FlightStats;
  containerId?: string;
};

export function AirlineSection({ stats, containerId }: AirlineSectionProps) {
  const topAirline = stats.topAirlines[0];

  return (
    <section
      id={containerId}
      className="rounded-3xl border border-white/70 bg-white p-6 shadow-card lg:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <SectionHeader
          eyebrow="Airlines"
          title="Who You Flew With"
          subtitle="Your airlines ranked by how often you flew with them."
        />

        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white p-6">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
            {topAirline ? (
              <>
                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary text-2xl font-bold">
                      {topAirline.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-primary">
                        Top airline
                      </p>
                      <h3 className="text-2xl font-bold text-slate-900 leading-none">
                        {topAirline.name}
                      </h3>
                      <p className="text-sm text-slate-600">Most frequent in your trips</p>
                    </div>
                  </div>
                  <Icon name="workspace_premium" className="text-amber-400 text-3xl" />
                </div>
                <div className="mt-4 flex items-center gap-3 text-sm text-slate-700">
                  <Icon name="flight_takeoff" />
                  <span>{topAirline.flights} flights completed</span>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-600">Upload your data to see your most flown airline.</p>
            )}
          </div>

          <div className="space-y-4">
            <p className="text-lg font-bold text-slate-900">All airlines</p>
            <div className="space-y-4">
              {stats.topAirlines.length === 0 && (
                <p className="text-sm text-slate-600">No airlines to show yet.</p>
              )}
              {stats.topAirlines.map((airline) => {
                const percent = topAirline
                  ? Math.round((airline.flights / topAirline.flights) * 100)
                  : 0;
                return (
                  <div key={airline.name} className="space-y-2">
                    <div className="flex items-end justify-between">
                      <span className="font-semibold text-slate-900">{airline.name}</span>
                      <span className="text-sm text-slate-600">{airline.flights} flights</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-primary/60"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
