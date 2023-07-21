import crypto from 'crypto';
import fs from 'fs';

const getImageHash = async (
  filePath: string,
  algorithm = 'md5',
): Promise<string> => {
  const hash = crypto.createHash(algorithm).setEncoding('hex');
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .once('error', reject)
      .pipe(hash)
      .once('finish', () => {
        resolve(hash.read());
      });
  });
};

export default getImageHash;
