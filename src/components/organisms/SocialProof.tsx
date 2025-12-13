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
        <p className="text-sm text-slate-600 max-w-2xl">
          All data comes from <a href="https://flighty.com/" className="text-primary hover:text-primary/80">flighty.com</a>.
          This is just a fan homage by a happy user, inspired by a Reddit post about a Flighty vs Spotify Wrapped vibe (
          <a href="https://www.reddit.com/r/flighty/comments/1pkufe3/flighty_wrapped_2025/" className="text-primary hover:text-primary/80">thread</a>).
          Flighty already shows these stats in-app—I just wanted a fast way to share social-ready snapshots.
        </p>
      </div>
    </section>
  );
}
