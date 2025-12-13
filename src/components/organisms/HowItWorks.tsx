import { howItWorksSteps } from '../../data/content';
import { SectionHeader } from '../molecules/SectionHeader';
import { TimelineItem } from '../molecules/TimelineItem';

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="rounded-3xl border border-white/70 bg-white p-6 shadow-card lg:p-8"
    >
      <div className="mb-8">
        <SectionHeader
          eyebrow="Guided flow"
          title="How it works"
          subtitle="Three steps from CSV to insights. Export, upload, get your wrapped."
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {howItWorksSteps.map((step, index) => (
          <TimelineItem
            key={step.title}
            icon={step.icon}
            title={step.title}
            description={step.description}
            isLast={index === howItWorksSteps.length - 1}
            highlight={step.highlight}
          />
        ))}
      </div>
    </section>
  );
}
