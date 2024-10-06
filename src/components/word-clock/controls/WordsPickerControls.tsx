import {
  forwardRef,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import preventWindowScroll from '../../../utils/preventWindowScroll';
import { Circle } from '../../ui/icons';

import { cn } from '@/utils/cn';

export interface WordsPickerControlsProps {
  className?: string;
  wordsCollection: {
    [x: string]: {
      file: string;
      title: string;
    }[];
  };
  file: string;
  setFile: (file: string) => void;
}

const WordsPickerControls = forwardRef<
  HTMLDivElement,
  WordsPickerControlsProps
>(({ className, wordsCollection = [], file: selectedFile, setFile }, ref) => {
  const selectedRef = useRef<HTMLDivElement | null>(null);

  const scrollIntoView = useCallback(() => {
    preventWindowScroll(() => {
      selectedRef?.current?.scrollIntoView({
        behavior: 'auto',
        block: 'center',
      });
    });
  }, []);

  const setSelectedRef = useCallback(
    (ref: HTMLDivElement) => {
      selectedRef.current = ref;
      scrollIntoView();
    },
    [scrollIntoView],
  );

  useEffect(() => {
    const timeoutId = setTimeout(scrollIntoView, 0);
    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [scrollIntoView]);

  const wordsCollectionEntries = useMemo(() => {
    return Object.entries(wordsCollection);
  }, [wordsCollection]);

  return (
    <div
      ref={ref}
      className={cn(
        'backdrop-saturate-15 dark:bg-gray-80 mx-auto flex flex-1 flex-row rounded-xl bg-gray-50/70 p-2 leading-5 text-gray-600 shadow-md backdrop-blur-lg',
        className,
      )}
    >
      <div className="relative flex flex-1">
        <div className="absolute inset-0 overflow-y-scroll pe-2">
          {wordsCollectionEntries.map(([language, entries], index) => {
            return (
              <Fragment key={index}>
                <div className="mx-2 mt-2 font-bold">{language}</div>
                <div className="flex flex-col">
                  {entries.map(({ file, title }, index: number) => {
                    const selected = file === selectedFile;
                    return (
                      <div key={index}>
                        <div
                          className={cn(
                            'flex cursor-pointer flex-row items-baseline rounded-lg p-2 transition-colors duration-100 hover:bg-gray-500/20',
                            selected && 'pointer-events-none text-primary',
                          )}
                          onClick={() => setFile(file)}
                          ref={selected ? setSelectedRef : null}
                        >
                          <div
                            className={cn(
                              'pe-2 text-sm',
                              selected ? 'text-primary' : 'text-gray-400',
                            )}
                          >
                            <Circle className="inline" />
                          </div>
                          <div>{title}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
});

WordsPickerControls.displayName = 'WordsPickerControls';

export default WordsPickerControls;
