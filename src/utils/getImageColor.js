const Color = require("color");
const sharp = require("sharp");

const getImagePixels = require("./getImagePixels");

const getImageColor = async (filePath, type) => {
  let pixels;
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

module.exports = getImageColor;
