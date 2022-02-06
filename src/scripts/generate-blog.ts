import fs from "fs-extra";
import path from "path";
import yaml from "js-yaml";
import chokidar from "chokidar";
import { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } from "node-html-markdown";

import getFiles from "../utils/getFiles";

import blogArchive from "../../content/blog-archive.json";

const nhm = new NodeHtmlMarkdown(
  /* options (optional) */ {},
  /* customTransformers (optional) */ undefined,
  /* customCodeBlockTranslators (optional) */ undefined
);

const PREFIX = "http://telemachus.local/simonheys/website";

const pagesRootDirectory = path.join(__dirname, "../content/pages/blog");

const generateBlog = async () => {
  for await (const blogEntry of blogArchive) {
    const { link } = blogEntry;

    // derives a path like /2011/05/31/all-new-word-clock/
    const originalPath = link.substring(PREFIX.length);

    const pathComponents = originalPath.split("/").filter(Boolean);
    const fileName = pathComponents.pop();

    const newDirectory = path.join(...[pagesRootDirectory, ...pathComponents]);
    // console.log(newDirectory, fileName);

    const filePath = path.join(newDirectory, `${fileName}.yml`);

    const fileContents = yaml.dump({
      title: blogEntry.title.rendered,
      components: [
        {
          type: "blog",
          content: nhm.translate(blogEntry.content.rendered),
        },
      ],
    });

    console.log(filePath, fileContents);
  }
};

(async () => {
  await generateBlog();
})();
