import Color from "color";
import sharp from "sharp";
import { NdArray } from "ndarray";

import getImagePixels from "./getImagePixels";

const getImageColor = async (filePath: string, type: string) => {
  let pixels: NdArray<Uint8Array>;
  if (type === "svg") {
    const imageBuffer = await sharp(filePath).toFormat("png").toBuffer();
    pixels = await getImagePixels(imageBuffer, "image/png");
  } else {
    pixels = await getImagePixels(filePath);
  }
  const firstPixel = pixels.data.slice(0, 3);
  const color = Color.rgb(firstPixel);
  return color.hex().toLowerCase();
};

export default getImageColor;
