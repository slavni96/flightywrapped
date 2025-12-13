type AvatarStackProps = {
  avatars: { src: string; alt: string }[];
  extraLabel?: string;
};

export function AvatarStack({ avatars, extraLabel }: AvatarStackProps) {
  return (
    <div className="flex items-center justify-center gap-1">
      <div className="flex -space-x-3">
        {avatars.map((avatar) => (
          <div
            key={avatar.alt}
            className="h-10 w-10 rounded-full border-2 border-background-dark bg-slate-200 bg-cover bg-center"
            style={{ backgroundImage: `url(${avatar.src})` }}
            aria-label={avatar.alt}
          />
        ))}
        {extraLabel && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background-dark bg-white/10 text-xs font-bold text-white/70">
            {extraLabel}
          </div>
        )}
      </div>
    </div>
  );
}
