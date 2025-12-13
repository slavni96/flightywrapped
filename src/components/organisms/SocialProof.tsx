import { travelerAvatars } from '../../data/content';
import { AvatarStack } from '../molecules/AvatarStack';
import { SectionHeader } from '../molecules/SectionHeader';

export function SocialProof() {
  return (
    <section className="rounded-3xl border border-white/70 bg-white p-6 text-center shadow-card lg:p-8">
      <div className="flex flex-col items-center gap-4">
        <SectionHeader
          align="center"
          eyebrow="Community"
          title="Trusted by travelers worldwide"
          subtitle="Join thousands of travelers visualizing their miles."
        />
        <AvatarStack avatars={travelerAvatars} extraLabel="+2k" />
      </div>
    </section>
  );
}
