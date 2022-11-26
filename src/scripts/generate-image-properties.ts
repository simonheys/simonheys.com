import chokidar from 'chokidar';
import cliProgress from 'cli-progress';
import fs from 'fs';
import sizeOf from 'image-size';
import path from 'path';

import { ImageProperties } from '../modules/content';
import getFiles from '../utils/getFiles';
import getImageColor from '../utils/getImageColor';
import getImageHash from '../utils/getImageHash';

const argv = require('minimist')(process.argv.slice(2));

const useProgressBar = !argv.watch;

const publicSystemPath = path.join(__dirname, '../../public');

const imagePropertiesFilePath = 'content/image-properties.json';
const imagePropertiesSystemPath = path.join(
  __dirname,
  '../../',
  imagePropertiesFilePath
);

const getImageProperties = (filePath: string) => {
  const properties = sizeOf(filePath);
  return properties;
};

const getCurrentImageProperties = async (): Promise<
  Record<string, ImageProperties>
> => {
  return new Promise((resolve, reject) => {
    fs.readFile(imagePropertiesSystemPath, 'utf8', (err, data) => {
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        throw e;
      }
    });
  });
};

const generateImageProperties = async () => {
  const currentImageProperties = await getCurrentImageProperties();
  const imageProperties: Record<string, ImageProperties> = {};

  const filePaths = getFiles('./', publicSystemPath);

  const progressBar = new cliProgress.SingleBar(
    {
      format:
        'progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} | {filename}',
    },
    cliProgress.Presets.shades_grey
  );
  useProgressBar && progressBar.start(filePaths.length, 0, { filename: '' });

  for (const filePath of filePaths) {
    useProgressBar && progressBar.increment({ filename: filePath });
    const fileSystemPath = path.join(publicSystemPath, filePath);
    const hash = await getImageHash(fileSystemPath);
    const currentProperties = currentImageProperties[filePath];
    if (currentProperties && currentProperties['hash'] === hash) {
      imageProperties[filePath] = currentProperties;
    } else {
      try {
        const properties = getImageProperties(fileSystemPath);
        const { height = 0, width = 0, type } = properties;
        const color = await getImageColor(fileSystemPath, type);
        imageProperties[filePath] = { hash, height, width, type, color };
      } catch (e) {
        // ignore error for unsupported file
      }
    }
  }

  useProgressBar &&
    progressBar.update(filePaths.length, { filename: imagePropertiesFilePath });

  const fileContents = JSON.stringify(imageProperties, null, 2);
  const dirname = path.dirname(imagePropertiesSystemPath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
  }
  fs.writeFileSync(imagePropertiesSystemPath, fileContents, 'utf8');
  useProgressBar && progressBar.stop();
};

(async () => {
  await generateImageProperties();
  if (argv.watch) {
    console.log(`Watching for changes in ${publicSystemPath}`);
    chokidar.watch(publicSystemPath).on('change', (event, path) => {
      console.log(`Regenerating image properties`);
      generateImageProperties();
    });
  }
})();
