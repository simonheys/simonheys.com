const fs = require("fs");
const crypto = require("crypto");

const getImageHash = async (filePath, algorithm = "md4") => {
  const hash = crypto.createHash(algorithm).setEncoding("hex");
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .once("error", reject)
      .pipe(hash)
      .once("finish", () => {
        resolve(hash.read());
      });
  });
};

module.exports = getImageHash;
