import { SectionHeader } from '../molecules/SectionHeader';
import { UploadCard } from '../molecules/UploadCard';

type UploadSectionProps = {
  onFileSelected: (file: File) => void;
  isLoading?: boolean;
  error?: string | null;
};

export function UploadSection({ onFileSelected, isLoading, error }: UploadSectionProps) {
  return (
    <section
      id="upload"
      className="rounded-3xl border border-white/5 bg-white/5 p-6 shadow-card backdrop-blur-lg lg:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <SectionHeader
          eyebrow="Local only"
          title="Import Flighty .CSV"
          subtitle="Tap to browse files. Parsing happens in your browser—no uploads."
        />
        <UploadCard onFileSelected={onFileSelected} isLoading={isLoading} error={error} />
      </div>
    </section>
  );
}
