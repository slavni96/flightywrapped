import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';

type FloatingShareProps = {
  onShare: () => void;
};

export function FloatingShare({ onShare }: FloatingShareProps) {
  return (
    <div className="fixed bottom-4 right-4 z-40 md:bottom-16 md:right-6">
      <Button
        variant="primary"
        icon={<Icon name="ios_share" />}
        onClick={onShare}
        className="px-4 shadow-lg shadow-primary/30"
      >
        Share as image
      </Button>
    </div>
  );
}
