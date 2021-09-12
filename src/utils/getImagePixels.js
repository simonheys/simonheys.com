const getPixels = require("get-pixels");

const getImagePixels = async (filePath, type) => {
  return new Promise((resolve, reject) => {
    getPixels(filePath, type, (err, pixels) => {
      if (err) {
        return reject(err);
      }
      resolve(pixels);
    });
  });
};

module.exports = getImagePixels;
