import fs from 'fs';
import path from 'path';

import { transform } from '@svgr/core';
import chokidar from 'chokidar';
import cliProgress from 'cli-progress';

import getFiles from '../utils/getFiles';

const argv = require('minimist')(process.argv.slice(2));

const iconsSystemPath = path.join(__dirname, '../components/ui/icons');
const iconsSvgSystemPath = path.join(iconsSystemPath, './svg');
const indexSystemPath = path.join(iconsSystemPath, './index.ts');

const useProgressBar = !argv.watch;

const svgCodeToIconComponentCode = async (svgCode: string) => {
  return transform(svgCode, {
    typescript: true,
    icon: true,
    jsxRuntime: 'automatic',
    replaceAttrValues: { '#000': 'currentColor' },
    plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
  });
};

// svgr forces height="1em" and width="1em" regardess of proportions
// this is a crude hack to parse the viewBox and replace width
// with an expected proportional value
const fixIconComponentCodeEmWidth = (iconComponentCode: string) => {
  const viewBoxRegEx = /viewBox="(.+)"/;
  const matches = iconComponentCode.match(viewBoxRegEx);
  if (!matches) {
    return iconComponentCode;
  }
  const viewBox = matches[1];
  const [, , width, height] = viewBox.split(' ').map(parseFloat);
  const widthEm = width / height;
  const widthRegEx = /width="(.+)"/;
  const fixedIconComponentCode = iconComponentCode.replace(
    widthRegEx,
    `width="${widthEm}em"`,
  );
  return fixedIconComponentCode;
};

const generateIconComponents = async () => {
  const filePaths = getFiles('./', iconsSvgSystemPath);
  const lines = [];

  const progressBar = new cliProgress.SingleBar(
    {
      format:
        'progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} | {filename}',
    },
    cliProgress.Presets.shades_grey,
  );
  useProgressBar && progressBar.start(filePaths.length, 0, { filename: '' });

  for (const filePath of filePaths) {
    useProgressBar && progressBar.increment({ filename: filePath });
    const sourcePath = path.join(iconsSvgSystemPath, filePath);
    const ext = path.extname(filePath);
    const filePathWithoutExt = filePath.substr(0, filePath.length - ext.length);
    const destPath = path.join(iconsSystemPath, `${filePathWithoutExt}.tsx`);
    const svgCode = fs.readFileSync(sourcePath).toString('utf8');
    const iconComponentCode = await svgCodeToIconComponentCode(svgCode);
    const fileContents = fixIconComponentCodeEmWidth(iconComponentCode);
    fs.writeFileSync(destPath, fileContents, 'utf8');
    lines.push(
      `export { default as ${filePathWithoutExt} } from './${filePathWithoutExt}';`,
    );
  }
  useProgressBar &&
    progressBar.update(filePaths.length, { filename: indexSystemPath });

  lines.push('');
  const fileContents = lines.join('\r\n');
  fs.writeFileSync(indexSystemPath, fileContents, 'utf8');

  useProgressBar && progressBar.stop();
};

(async () => {
  await generateIconComponents();
  if (argv.watch) {
    console.log(`Watching for changes in ${iconsSvgSystemPath}`);
    chokidar.watch(iconsSvgSystemPath).on('change', (_event, _path) => {
      console.log(`Regenerating icon components…`);
      generateIconComponents();
    });
  }
})();
