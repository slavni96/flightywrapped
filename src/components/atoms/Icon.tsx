import { cn } from '../../utils/cn';

type IconProps = {
  name: string;
  filled?: boolean;
  className?: string;
};

export function Icon({ name, filled, className }: IconProps) {
  return (
    <span className={cn('material-symbols-outlined', filled && 'filled', className)}>
      {name}
    </span>
  );
}
