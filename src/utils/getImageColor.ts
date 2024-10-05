import { Resvg } from "@resvg/resvg-js";
import { colord } from "colord";
import fs from "fs-extra";
import { NdArray } from "ndarray";

import getImagePixels from "./getImagePixels";

const getImageColor = async (filePath: string, type?: string) => {
  let pixels: NdArray<Uint8Array>;
  if (type === "svg") {
    const svg = fs.readFileSync(filePath);
    const resvg = new Resvg(svg, {
      shapeRendering: 2,
      textRendering: 2,
      imageRendering: 0,
      fitTo: {
        mode: "original",
      },
    });
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();
    pixels = await getImagePixels(pngBuffer, "image/png");
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
