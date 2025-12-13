import { type ChangeEvent } from 'react';
import { Icon } from '../atoms/Icon';
import { cn } from '../../utils/cn';

type UploadCardProps = {
  onFileSelected?: (file: File) => void;
  helperText?: string;
  label?: string;
  actionLabel?: string;
  className?: string;
  isLoading?: boolean;
  error?: string | null;
};

export function UploadCard({
  onFileSelected,
  helperText = 'Tap to browse files',
  label = 'Import Flighty data',
  actionLabel = 'Where do I find my data?',
  className,
  isLoading,
  error,
}: UploadCardProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onFileSelected) {
      onFileSelected(file);
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      <label className="group relative flex h-44 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-white transition-all hover:border-primary/50 hover:bg-primary/5 active:scale-[0.99]">
        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleChange}
          aria-label="Upload Flighty CSV"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="relative z-10 flex flex-col items-center gap-3 text-center">
          <div className="rounded-full bg-primary/15 p-4 text-primary shadow-inner shadow-primary/20 transition-transform duration-300 group-hover:scale-110">
            <Icon name="upload_file" className="text-3xl filled" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
              {isLoading ? 'Uploading...' : label}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {isLoading ? 'Parsing locally' : helperText}
            </p>
          </div>
        </div>
      </label>
      <div className="flex justify-center">
        <a
          href="#how-it-works"
          className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/15"
        >
          <Icon name="help" className="text-[16px]" />
          {actionLabel}
        </a>
      </div>
      {error && (
        <p className="text-sm text-amber-700">
          <Icon name="warning" className="mr-1 text-[16px]" /> {error}
        </p>
      )}
    </div>
  );
}
