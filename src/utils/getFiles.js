const fs = require("fs");
const path = require("path");

const visibleFileName = (fileName) => !fileName.startsWith(".");
const filePathIsDirectory = (filePath) => fs.statSync(filePath).isDirectory();

const getFiles = (dirPath, baseDir = "./", filesArray = []) => {
  const files = fs.readdirSync(path.join(baseDir, dirPath));
  files.filter(visibleFileName).forEach((fileName) => {
    const filePath = path.join(dirPath, fileName);
    const fileSystemPath = path.join(baseDir, dirPath, fileName);
    if (filePathIsDirectory(fileSystemPath)) {
      filesArray = getFiles(filePath, baseDir, filesArray);
    } else {
      filesArray.push(path.join(filePath));
    }
  });

  return filesArray;
};

module.exports = getFiles;
