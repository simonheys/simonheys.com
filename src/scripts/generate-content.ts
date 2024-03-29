import fs from 'fs';
import path from 'path';

import chokidar from 'chokidar';
import yaml from 'js-yaml';

import getFiles from '../utils/getFiles';

const argv = require('minimist')(process.argv.slice(2));

const contentSystemPath = path.join(__dirname, '../content');
const pagesSystemPath = path.join(contentSystemPath, 'pages');
const contentJsonSystemPath = path.join(
  __dirname,
  '../../content/content.json',
);

const filePaths = getFiles('/', pagesSystemPath);

const getYml = (filePath: string): any => {
  const doc = yaml.load(fs.readFileSync(filePath, 'utf8')) as any;
  return doc;
};

const filePathToPagePath = (filePath: string) => {
  const ext = path.extname(filePath);
  const filePathWithoutExt = filePath.substr(0, filePath.length - ext.length);
  const filePathWithoutIndex = filePathWithoutExt.replace('index', '');
  const filePathWithSlashes =
    '/' + filePathWithoutIndex.split('/').filter(Boolean).join('/');
  return filePathWithSlashes;
};

const generateContent = async () => {
  const content = getYml(path.join(contentSystemPath, 'index.yml'));
  const pages = [];
  const sitemap = [];

  for (const filePath of filePaths) {
    const ext = path.extname(filePath);
    if (ext !== '.yml') {
      throw new Error(`Expecting yml files, got ${filePath}`);
    }
    const pagePath = filePathToPagePath(filePath);
    const fileSystemPath = path.join(pagesSystemPath, filePath);
    const doc = getYml(fileSystemPath);
    const page = {
      path: pagePath,
      ...doc,
    };
    pages.push(page);
    sitemap.push(pagePath);
  }

  content.pages = pages;

  const fileContents = JSON.stringify(content, null, 2);
  const dirname = path.dirname(contentJsonSystemPath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
  }
  fs.writeFileSync(contentJsonSystemPath, fileContents, 'utf8');
};

(async () => {
  await generateContent();
  if (argv.watch) {
    console.log(`Watching for changes in ${contentSystemPath}`);
    chokidar.watch(contentSystemPath).on('change', (event, path) => {
      console.log(`Regenerating content…`);
      generateContent();
    });
  }
})();
