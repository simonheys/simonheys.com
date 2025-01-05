import manifest from '@simonheys/wordclock-words/json/Manifest.json';
import type { NextApiRequest, NextApiResponse } from 'next';

const words: Record<
  string,
  {
    file: string;
    title: string;
  }[]
> = {};

type LanguageKey = keyof typeof manifest.languages;

interface Meta {
  language: LanguageKey;
  title: string;
}

manifest.files.forEach((file) => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const json = require(`@simonheys/wordclock-words/json/${file}`);
  const { meta }: { meta: Meta } = json;
  const { language, title } = meta;
  const languageTitle = manifest.languages[language];
  if (!words[languageTitle]) {
    words[languageTitle] = [];
  }
  words[languageTitle].push({
    file,
    title,
  });
});

const wordsOrdered = Object.keys(words)
  .sort()
  .reduce((obj: typeof words, key) => {
    obj[key] = words[key];
    return obj;
  }, {});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { method } = req;
  switch (method) {
    case 'GET':
      res.status(200).json(wordsOrdered);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
