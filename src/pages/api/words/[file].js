const handler = (req, res) => {
  const {
    query: { file },
    method,
  } = req;
  switch (method) {
    case "GET": {
      try {
        const json = require(`wordclock/packages/wordclock-words/json/${file}`);
        if (json) {
          res.status(200).json(json);
        }
      } catch (e) {}
      res.status(404).end("Not Found");
      break;
    }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
