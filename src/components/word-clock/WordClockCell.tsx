import { FC } from 'react';

import WordClockEditable, { WordClockEditableProps } from './WordClockEditable';

import { cn } from '@/utils/cn';

export interface WordClockCellProps extends WordClockEditableProps {
  col: string | number;
}

const WordClockCell: FC<WordClockCellProps> = ({
  col = 'default',
  ...rest
}) => {
  return (
    <div
      className={cn(
        'relative h-0 w-full',
        col === 6 ? 'pb-[114.65%]' : 'pb-[56.25%]',
      )}
    >
      <div className="absolute inset-0">
        <WordClockEditable {...rest} />
      </div>
    </div>
  );
};

export default WordClockCell;
