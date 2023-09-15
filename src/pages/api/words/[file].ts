import type { NextApiRequest, NextApiResponse } from 'next';
import manifest from '@simonheys/wordclock-words/json/Manifest.json';

type FileToJson = {
  [key: string]: any;
};

const fileToJson: FileToJson = {};

manifest.files.forEach((file: string) => {
  const json = require(`@simonheys/wordclock-words/json/${file}`);
  fileToJson[file] = json;
});

const handler = (req: NextApiRequest, res: NextApiResponse<any>) => {
  const {
    query: { file },
    method,
  } = req;
  switch (method) {
    case 'GET': {
      if (typeof file === 'string') {
        const json = fileToJson[file];
        if (json) {
          res.status(200).json(json);
          break;
        }
      }
      res.status(404).end('Not Found');
      break;
    }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
