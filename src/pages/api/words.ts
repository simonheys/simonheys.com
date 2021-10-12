import type { NextApiRequest, NextApiResponse } from "next";

import manifest from "wordclock/packages/wordclock-words/json/Manifest.json";

const words = {};

manifest.files.forEach((file) => {
  const json = require(`wordclock/packages/wordclock-words/json/${file}`);
  const { meta } = json;
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
  .reduce((obj, key) => {
    obj[key] = words[key];
    return obj;
  }, {});

const handler = (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { method } = req;
  switch (method) {
    case "GET":
      res.status(200).json(wordsOrdered);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
