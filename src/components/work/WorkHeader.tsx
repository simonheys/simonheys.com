import { useRouter } from 'next/router';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';

import { getPageForPath } from '../../modules/content';
import AppearWhenInView from '../ui/AppearWhenInView';
import { reactMarkdownComponents } from '../ui/Prose';
import TextLinks from '../ui/TextLinks';

export interface WorkHeaderProps {
  title?: string;
  subtitle?: string;
  links?: {
    text: string;
    url: string;
  }[];
  ruled?: boolean;
}

const WorkHeader: FC<WorkHeaderProps> = ({ title, subtitle, links, ruled }) => {
  const router = useRouter();
  const page = getPageForPath(router.asPath);
  if (!page) {
    return null;
  }
  return (
    <AppearWhenInView>
      {ruled && (
        <div className="containerAlias">
          <div className="border-t"></div>
        </div>
      )}
      <div className={ruled ? 'containerAlias pt-2' : 'containerAlias'}>
        <div className="mb-12 sm:grid sm:grid-cols-2 sm:gap-6">
          <h1 className="mb-2 text-4xl font-bold sm:mb-0">
            {title !== undefined ? title : page.title}
          </h1>
          <div className="mb-4 text-balance text-2xl font-medium sm:mb-0">
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
