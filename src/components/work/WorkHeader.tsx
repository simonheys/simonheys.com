'use client';

import { usePathname } from 'next/navigation';
import { ElementType, FC } from 'react';
import ReactMarkdown from 'react-markdown';

import { getPageForPath } from '../../modules/content';
import AppearWhenInView from '../ui/AppearWhenInView';
import { reactMarkdownComponents } from '../ui/Prose';
import TextLinks from '../ui/TextLinks';

import { cn } from '@/utils/cn';

export interface WorkHeaderProps {
  title?: string;
  subtitle?: string;
  links?: {
    text: string;
    url: string;
  }[];
  ruled?: boolean;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const WorkHeader: FC<WorkHeaderProps> = ({
  title,
  subtitle,
  links,
  ruled,
  level = 1,
}) => {
  const pathname = usePathname();
  const page = getPageForPath(pathname);
  if (!page) {
    return null;
  }

  const HeadingTag: ElementType = `h${level}`;

  return (
    <AppearWhenInView>
      {ruled && (
        <div className="container">
          <div className="border-border border-t"></div>
        </div>
      )}
      <div className={cn('container', ruled && 'pt-2')}>
        <div className="mb-12 sm:grid sm:grid-cols-2 sm:gap-6">
          <HeadingTag className="mb-2 text-4xl font-bold text-balance sm:mb-0">
            {title !== undefined ? title : page.title}
          </HeadingTag>
          <div className="mb-4 text-2xl font-medium text-pretty sm:mb-0">
            <ReactMarkdown components={reactMarkdownComponents}>
              {subtitle || page.subtitle || ''}
            </ReactMarkdown>
            {links && (
              <div className="mt-2">
                <TextLinks links={links} />
              </div>
            )}
          </div>
        </div>
      </div>
    </AppearWhenInView>
  );
};

export default WorkHeader;
