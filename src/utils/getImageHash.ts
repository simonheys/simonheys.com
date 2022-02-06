import fs from "fs";
import crypto from "crypto";

const getImageHash = async (filePath: string, algorithm = "md4") => {
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

export default getImageHash;
