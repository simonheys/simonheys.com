import { colord } from 'colord';
import { NdArray } from 'ndarray';
import sharp from 'sharp';

import getImagePixels from './getImagePixels';

const getImageColor = async (filePath: string, type?: string) => {
  let pixels: NdArray<Uint8Array>;
  if (type === 'svg') {
    const imageBuffer = await sharp(filePath).toFormat('png').toBuffer();
    pixels = await getImagePixels(imageBuffer, 'image/png');
  } else {
    pixels = await getImagePixels(filePath);
  }
  const firstPixel = pixels.data.slice(0, 3);
  const color = colord({
    r: firstPixel[0],
    g: firstPixel[1],
    b: firstPixel[2],
  });
  return color.toHex();
};

export default getImageColor;
