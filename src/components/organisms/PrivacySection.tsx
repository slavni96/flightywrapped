import { SectionHeader } from '../molecules/SectionHeader';
import { Icon } from '../atoms/Icon';

export function PrivacySection() {
  return (
    <section className="grid gap-6 rounded-3xl border border-emerald-500/30 bg-white p-6 shadow-card lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
      <SectionHeader
        eyebrow="Privacy by design"
        title="Private by Design"
        subtitle="Your data is processed 100% locally in your browser. No flight data is ever sent to a server."
      />
      <div className="flex items-center gap-4 rounded-2xl border border-emerald-500/40 bg-emerald-50 p-4">
        <div className="rounded-full bg-emerald-100 p-3 text-emerald-600">
          <Icon name="shield_lock" className="filled text-2xl" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-emerald-800">On-device processing</p>
          <p className="text-sm text-emerald-700">
            No external calls, no tracking. Just your CSV in your browser.
          </p>
        </div>
      </div>
    </section>
  );
}
