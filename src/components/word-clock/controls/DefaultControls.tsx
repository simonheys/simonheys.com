import { ReactEventHandler, forwardRef } from 'react';

import Link from '../../ui/Link';
import { ChevronDown, FullScreen } from '../../ui/icons';

import DefaultControlsItem from './DefaultControlsItem';

import { cn } from '@/utils/cn';

export interface DefaultControlsProps {
  className?: string;
  title: boolean;
  source: boolean;
  download: boolean;
  wordsOpen: boolean;
  onToggleWordsOpen: ReactEventHandler;
  onFullscreen: ReactEventHandler;
}

const DefaultControls = forwardRef<HTMLDivElement, DefaultControlsProps>(
  (
    {
      className,
      title,
      source,
      download,
      wordsOpen,
      onToggleWordsOpen,
      onFullscreen,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'dark:bg-gray-80 mx-auto flex flex-row rounded-xl bg-gray-50/70 px-2 shadow-md backdrop-blur-lg backdrop-saturate-15',
          className,
        )}
      >
        {title && (
          <DefaultControlsItem as={Link} href="/wordclock">
            Word Clock
          </DefaultControlsItem>
        )}
        <DefaultControlsItem onClick={onToggleWordsOpen} active={wordsOpen}>
          Words <ChevronDown className="inline" />
        </DefaultControlsItem>
        {download && (
          <DefaultControlsItem
            as="a"
            href="https://github.com/simonheys/wordclock/releases"
            target="_blank"
            rel="noreferrer"
          >
            Download
          </DefaultControlsItem>
        )}
        {source && (
          <DefaultControlsItem
            as="a"
            href="https://github.com/simonheys/wordclock"
            target="_blank"
            rel="noreferrer"
          >
            Source
          </DefaultControlsItem>
        )}
        <DefaultControlsItem
          onClick={onFullscreen}
          className="flex items-center justify-center"
        >
          <FullScreen />
        </DefaultControlsItem>
      </div>
    );
  },
);

DefaultControls.displayName = 'DefaultControls';

export default DefaultControls;
