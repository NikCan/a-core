import { Button } from '@/components/ui';
import s from './TreeControl.module.scss';
import { memo } from 'react';

interface TreeControlsProps {
  onExpandAll: () => void;
  onCollapseAll: () => void;
  disabled?: boolean;
}

export const TreeControl = memo(
  ({ onExpandAll, onCollapseAll, disabled }: TreeControlsProps) => (
    <div className={s.buttons}>
      <Button onClick={onExpandAll} disabled={disabled}>
        Развернуть все
      </Button>
      <Button onClick={onCollapseAll} disabled={disabled}>
        Свернуть все
      </Button>
    </div>
  )
);
TreeControl.displayName = 'TreeControl';
