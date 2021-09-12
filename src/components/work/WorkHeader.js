import * as React from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import * as contentModule from "../../modules/content";
import AppearWhenInView from "../ui/AppearWhenInView";
import TextLinks from "../ui/TextLinks";

import styles from "./WorkHeader.module.scss";

const WorkHeader = ({ subtitle, links, services, components }) => {
  const router = useRouter();
  const page = contentModule.getPageForPath(router.asPath);
  const { title } = page;
  return (
    <AppearWhenInView>
      <div className={"container-fluid"}>
        <div className={"row mb-5"}>
          <div className={"col-md-6"}>
            <h1 className={styles.title}>{title}</h1>
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
            {services && (
              <div className={styles.services}>{services.join(", ")}</div>
            )}
          </div>
        </div>
      </div>
    </AppearWhenInView>
  );
};

export default WorkHeader;
