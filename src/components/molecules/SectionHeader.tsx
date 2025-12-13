type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
}: SectionHeaderProps) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div className={`flex flex-col gap-2 ${alignment}`}>
      {eyebrow && (
        <span className="text-xs font-bold uppercase tracking-[0.28em] text-white/50">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white">{title}</h2>
      {subtitle && <p className="text-white/70 max-w-2xl text-base">{subtitle}</p>}
    </div>
  );
}
