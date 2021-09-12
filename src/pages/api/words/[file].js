const manifest = require(`wordclock/packages/wordclock-words/json/Manifest.json`);
const fileToJson = {};

manifest.files.forEach((file) => {
  const json = require(`wordclock/packages/wordclock-words/json/${file}`);
  fileToJson[file] = json;
});

const handler = (req, res) => {
  const {
    query: { file },
    method,
  } = req;
  switch (method) {
    case "GET": {
      if (typeof file === "string") {
        const json = fileToJson[file];
        if (json) {
          res.status(200).json(json);
          break;
        }
      }
      res.status(404).end("Not Found");
      break;
    }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
