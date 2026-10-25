import { Resvg } from '@resvg/resvg-js';
import { colord } from 'colord';
import fs from 'fs-extra';
import sharp from 'sharp';

const getImageColor = async (filePath: string, type?: string) => {
  let source: string | Buffer = filePath;
  if (type === 'svg') {
    const svg = fs.readFileSync(filePath);
    const resvg = new Resvg(svg, {
      shapeRendering: 2,
      textRendering: 2,
      imageRendering: 0,
      fitTo: {
        mode: 'original',
      },
    });
    const pngData = resvg.render();
    source = pngData.asPng();
  }
  const firstPixel = await sharp(source)
    .toColourspace('srgb')
    .removeAlpha()
    .raw()
    .toBuffer();
  const color = colord({
    r: firstPixel[0],
    g: firstPixel[1],
    b: firstPixel[2],
  });
  return color.toHex();
};

export default getImageColor;
