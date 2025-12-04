import { FC } from 'react';

import AppearWhenInView from './ui/AppearWhenInView';

export interface FooterProps {
  text: string;
}

const Footer: FC<FooterProps> = ({ text }) => {
  return (
    <AppearWhenInView>
      <div className="container">
        <div className="border-border border-t"></div>
      </div>
      <div className="container mb-12 grid-cols-2 gap-6 pt-2 text-pretty">
        <div className="text-sm text-gray-600 dark:text-gray-400">{text}</div>
      </div>
    </AppearWhenInView>
  );
};

export default Footer;
