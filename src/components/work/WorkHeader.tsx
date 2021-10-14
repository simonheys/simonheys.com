import * as React from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import { getPageForPath } from "../../modules/content";
import AppearWhenInView from "../ui/AppearWhenInView";
import TextLinks from "../ui/TextLinks";

import styles from "./WorkHeader.module.scss";

export interface WorkHeaderProps {
  title?: string;
  subtitle?: string;
  links?: {
    text: string;
    url: string;
  }[];
  ruled?: boolean;
}

const WorkHeader: React.FC<WorkHeaderProps> = ({
  title,
  subtitle,
  links,
  ruled,
}) => {
  const router = useRouter();
  const page = getPageForPath(router.asPath);
  return (
    <AppearWhenInView>
      {ruled && (
        <div className={"container-fluid"}>
          <div className={"row gx-0 border-top"}></div>
        </div>
      )}
      <div className={ruled ? "container-fluid pt-2 mb-5" : "container-fluid"}>
        <div className={"row mb-5"}>
          <div className={"col-md-6"}>
            <h1 className={styles.title}>
              {title !== undefined ? title : page.title}
            </h1>
          </div>
          <div className={"col-md-6"}>
            <div className={styles.subtitle}>
              <ReactMarkdown>{subtitle || page.subtitle}</ReactMarkdown>
            </div>
            {links && (
              <div className={styles.links}>
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
