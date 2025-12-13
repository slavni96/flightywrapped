import { SectionHeader } from '../molecules/SectionHeader';
import { Icon } from '../atoms/Icon';
import { Badge } from '../atoms/Badge';

export function PrivacySection() {
  return (
    <section className="grid gap-6 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6 shadow-card backdrop-blur-lg lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
      <SectionHeader
        eyebrow="Privacy by design"
        title="Private by Design"
        subtitle="Your data is processed 100% locally in your browser. No flight data is ever sent to a server."
      />
      <div className="flex items-center gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
        <div className="rounded-full bg-emerald-500/20 p-3 text-emerald-400">
          <Icon name="shield_lock" className="filled text-2xl" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-emerald-200">On-device processing</p>
          <p className="text-sm text-emerald-200/80">
            No external calls, no tracking. Just your CSV in your browser.
          </p>
          <Badge tone="success" className="mt-2">Local Only</Badge>
        </div>
      </div>
    </section>
  );
}
