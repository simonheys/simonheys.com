import { ComponentProps, FC } from 'react';
import ReactMarkdown from 'react-markdown';

import { ComponentKey, MappedComponent } from '../Components';
import ImageFadeIn from '../ui/ImageFadeIn';
import TextLinks from '../ui/TextLinks';
import VideoFadeIn from '../ui/VideoFadeIn';

import { cn } from '@/utils/cn';

export interface WorkRowColProps extends Omit<
  ComponentProps<typeof MappedComponent>,
  'type'
> {
  type?: ComponentKey;
  col?: number | string;
  text?: string;
  links?: { text: string; url: string }[];
  src?: string;
  youTubeId?: string;
  vimeoId?: string;
  color?: string;
  title?: string;
  aspect?: string;
}

const WorkRowCol: FC<WorkRowColProps> = ({ type, col, ...rest }) => {
  const className = cn('mb-6', col ? `sm:col-span-${col}` : 'sm:col-span-6');

  if (type) {
    return (
      <div className={className}>
        <MappedComponent type={type} {...{ col }} {...rest} />
      </div>
    );
  }

  const {
    text,
    links,
    src,
    youTubeId,
    vimeoId,
    color,
    title = '',
    aspect,
  } = rest;

  if (text) {
    return (
      <>
        <div className="sm:col-span-6"></div>
        <div className="my-12 flex flex-col sm:col-span-6 sm:mt-6">
          <div className="text-balance text-2xl font-medium">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
          {links && (
            <div className="mb-0 mt-6 text-2xl">
              <TextLinks links={links} />
            </div>
          )}
        </div>
      </>
    );
  }

  if (src) {
    return (
      <div className={className}>
        <div className="w-full overflow-hidden rounded-[0.25em] bg-gray-100">
          <ImageFadeIn src={src} alt={title} />
        </div>
      </div>
    );
  }

  if (youTubeId || vimeoId) {
    return (
      <div className={className}>
        <div className="w-full overflow-hidden rounded-[0.25em] bg-gray-100">
          <VideoFadeIn
            col={col}
            youTubeId={youTubeId}
            vimeoId={vimeoId}
            color={color}
            title={title}
            aspect={aspect}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default WorkRowCol;
