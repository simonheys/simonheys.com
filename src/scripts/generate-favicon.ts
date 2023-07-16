import { FaviconOptions, favicons } from 'favicons';

import fs from 'fs';
import path from 'path';

const publicSystemPath = path.join(__dirname, '../../public/favicon');

const source = path.join(__dirname, '../assets/favicon.svg');

const configuration: FaviconOptions = {
  background: '#ff0000',
  path: '/images/favicons',
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: false,
    favicons: true,
    windows: false,
    yandex: false,
  },
};

const generateFavicons = async () => {
  const response = await favicons(source, configuration);
  for (const element of response.images) {
    const { name, contents } = element;
    const filePath = path.join(publicSystemPath, name);
    fs.writeFileSync(filePath, contents);
  }
};

(async () => {
  await generateFavicons();
})();
