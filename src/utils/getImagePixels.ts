import getPixels from "get-pixels";
import { NdArray } from "ndarray";

const getImagePixels = async (
  filePath: string,
  type?: string
): Promise<NdArray<Uint8Array>> => {
  return new Promise((resolve, reject) => {
    getPixels(filePath, type, (err, pixels) => {
      if (err) {
        return reject(err);
      }
      resolve(pixels);
    });
  });
};

export default getImagePixels;
