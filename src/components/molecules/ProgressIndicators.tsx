type ProgressIndicatorsProps = {
  total: number;
  activeIndex?: number;
};

export function ProgressIndicators({ total, activeIndex = 0 }: ProgressIndicatorsProps) {
  return (
    <div className="flex w-full flex-row items-center gap-1.5">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full ${isActive ? 'bg-primary shadow-[0_0_10px_rgba(19,127,236,0.4)]' : 'bg-slate-200'}`}
          ></div>
        );
      })}
    </div>
  );
}
