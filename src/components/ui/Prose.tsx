import { LinkProps } from 'next/link';
import { FC } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';

import AppearWhenInView from './AppearWhenInView';
import ImageResponsive from './ImageResponsive';
import Link from './Link';
import TextLinks from './TextLinks';

export interface ProseProps {
  title?: string;
  text?: string;
  links?: {
    text: string;
    url: string;
  }[];
  ruled?: boolean;
}

const LinkComponent = ({
  href,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link
      href={href as LinkProps['href']}
      className="text-primary transition duration-100 hover:text-primary-hover"
      {...rest}
    />
  );
};

const ImageComponent = ({
  src,
  alt,
  width,
  height,
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <ImageResponsive
      src={src as string}
      alt={alt as string}
      width={width as number}
      height={height as number}
      {...rest}
    />
  );
};

export const reactMarkdownComponents: Partial<Components> = {
  a: LinkComponent,
  img: ImageComponent,
};

const Prose: FC<ProseProps> = ({ title, text, links, ruled }) => {
  return (
    <AppearWhenInView>
      {ruled && (
        <div className="container-fluid">
          <div className="row gx-0 border-top"></div>
        </div>
      )}
      <div className={ruled ? 'container-fluid mb-5 pt-2' : 'container-fluid'}>
        <div className="row mb-5">
          <div className="col-md-6">
            {title && <h2 className="h1 mb-2 font-bold sm:mb-0">{title}</h2>}
          </div>
          <div className="col-md-6">
            {text && (
              <div className="h5 -mb-[1.5rem] [&_code]:rounded [&_code]:bg-gray-150 [&_code]:p-1 [&_code]:text-sm [&_code]:text-gray-700 [&_code]:dark:text-gray-500 [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold [&_h4]:font-bold [&_h5]:font-bold [&_pre]:rounded [&_pre]:bg-gray-150 [&_pre]:p-3 [&_pre]:dark:text-gray-500">
                <ReactMarkdown components={reactMarkdownComponents}>
                  {text}
                </ReactMarkdown>
              </div>
            )}
            {links && (
              <div className="h5 mb-0 mt-6">
                <TextLinks links={links} />
              </div>
            )}
          </div>
        </div>
      </div>
    </AppearWhenInView>
  );
};

export default Prose;
