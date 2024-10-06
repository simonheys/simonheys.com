import { FC } from "react";

import AppearWhenInView from "./ui/AppearWhenInView";

export interface FooterProps {
  text: string;
}

const Footer: FC<FooterProps> = ({ text }) => {
  return (
    <AppearWhenInView>
      <div className="containerAlias">
        <div className="border-t"></div>
      </div>
      <div className="containerAlias mb-12 grid-cols-2 gap-6 pt-2">
        <div className="text-sm leading-snug text-gray-600 dark:text-gray-400">
          {text}
        </div>
      </div>
    </AppearWhenInView>
  );
};

export default Footer;
