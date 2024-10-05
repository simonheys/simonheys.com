import { FC } from "react";

import styles from "./Footer.module.scss";
import AppearWhenInView from "./ui/AppearWhenInView";

export interface FooterProps {
  text: string;
}

const Footer: FC<FooterProps> = ({ text }) => {
  return (
    <AppearWhenInView>
      <div className="container-fluid">
        <div className="row gx-0 border-top"></div>
      </div>
      <div className="container-fluid mb-5 pt-2">
        <div className="row">
          <div className="col">
            <div className={styles.text}>{text}</div>
          </div>
        </div>
      </div>
    </AppearWhenInView>
  );
};

export default Footer;
