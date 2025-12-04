import { FC } from 'react';

import WordClockEditable, { WordClockEditableProps } from './WordClockEditable';

const WordClockFill: FC<WordClockEditableProps> = (props) => {
  return (
    <div className="container-fluid relative flex flex-1 overflow-hidden pb-3 md:pb-5">
      <div className="row container h-full sm:pb-12">
        <div className="col h-full">
          <WordClockEditable {...props} />
        </div>
      </div>
    </div>
  );
};

export default WordClockFill;
