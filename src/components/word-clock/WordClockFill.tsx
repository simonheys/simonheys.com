import { FC, useCallback } from 'react';

import useWindowScroll from '../../hooks/useWindowScroll';
import useWindowSize from '../../hooks/useWindowSize';
import AppearWhenInView from '../ui/AppearWhenInView';
import { ChevronDown } from '../ui/icons';

import WordClockEditable, { WordClockEditableProps } from './WordClockEditable';
import styles from './WordClockFill.module.scss';

const WordClockFill: FC<WordClockEditableProps> = (props) => {
  const windowSize = useWindowSize();
  const windowScroll = useWindowScroll();

  const onChevronClick = useCallback(() => {
    if (typeof window !== 'undefined' && windowSize?.innerHeight) {
      const html = document.getElementsByTagName('html')[0];
      html.style.setProperty('scroll-behavior', 'smooth');
      window.scrollTo(window.scrollX, windowSize.innerHeight - 16);
      html.style.removeProperty('scroll-behavior');
    }
  }, [windowSize?.innerHeight]);

  const chevronVisible = windowScroll.scrollY < 16;

  return (
    <div className={styles.container}>
      <div className={'row h-100 mb-md-5'}>
        <div className={'col h-100'}>
          <WordClockEditable {...props} />
        </div>
      </div>
    </div>
  );
};

export default WordClockFill;
