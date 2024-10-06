import fs from 'fs';
import path from 'path';

const visibleFileName = (fileName: string) => !fileName.startsWith('.');
const filePathIsDirectory = (filePath: string) =>
  fs.statSync(filePath).isDirectory();

const getFiles = (
  dirPath: string,
  baseDir = './',
  filesArray: string[] = [],
): string[] => {
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

  return filesArray.sort();
};

export default getFiles;
