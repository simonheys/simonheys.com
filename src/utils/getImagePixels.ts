import getPixels from 'get-pixels';
import { NdArray } from 'ndarray';

const getImagePixels = async (
  filePath: string | Buffer,
  type?: string,
): Promise<NdArray<Uint8Array>> => {
  return new Promise((resolve, reject) => {
    const callback = (err: Error | null, pixels: NdArray<Uint8Array>) => {
      if (err) {
        return reject(err);
      }
      resolve(pixels);
    };
    if (type) {
      getPixels(filePath, type, callback);
    } else if (typeof filePath === 'string') {
      getPixels(filePath, callback);
    } else {
      reject('getImagePixels - invalid arguments');
    }
  });
};

export default getImagePixels;
