import { FC } from 'react';

import { ChevronRight } from './icons';
import Link from './Link';

export interface TextLinksProps {
  links: {
    text: string;
    url: string;
  }[];
}

const TextLinks: FC<TextLinksProps> = ({ links }) => {
  if (!links || !links.length) {
    return null;
  }
  return (
    <div className="flex flex-col flex-wrap lg:flex-row lg:gap-4">
      {links.map(({ text, url }, index) => {
        return (
          <Link
            key={index}
            className="group flex text-2xl font-medium text-primary transition duration-100 hover:text-primary-hover"
            href={url}
          >
            {text}
            <span className="ml-1 transition-transform duration-100 group-hover:translate-x-0.5">
              <ChevronRight className="inline" />
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default TextLinks;
