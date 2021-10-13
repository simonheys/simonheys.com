import * as React from "react";

import AppearWhenInView from "./ui/AppearWhenInView";

import styles from "./Footer.module.scss";

const Footer = ({ text }: { text: string }) => {
  return (
    <AppearWhenInView>
      <div className={"container-fluid"}>
        <div className={"row gx-0 border-top"}></div>
      </div>
      <div className={"container-fluid pt-2 mb-5"}>
        <div className={"row"}>
          <div className={"col"}>
            <div className={styles.text}>{text}</div>
          </div>
        </div>
      </div>
    </AppearWhenInView>
  );
};

export default Footer;
