import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';

type FloatingShareProps = {
  onShare: () => void;
};

export function FloatingShare({ onShare }: FloatingShareProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40">
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
