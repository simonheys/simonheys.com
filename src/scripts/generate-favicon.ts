import fs from "fs";
import path from "path";
import favicons from "favicons";

const publicSystemPath = path.join(__dirname, "../../public/favicon");

const source = path.join(__dirname, "../assets/favicon.svg");

const configuration = {
  background: "#ff0000",
  path: "/images/favicons",
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: false,
    windows: false,
    yandex: false,
  },
};

const faviconsAsync = (
  source: string,
  configuration: Partial<favicons.FaviconOptions>
): Promise<favicons.FaviconResponse> => {
  return new Promise((resolve, reject) => {
    favicons(source, configuration, (error, response) => {
      if (error) {
        reject(error);
      }
      resolve(response);
    });
  });
};

const generateFavicons = async () => {
  const response = await faviconsAsync(source, configuration);
  for (const element of response.images) {
    const { name, contents } = element;
    const filePath = path.join(publicSystemPath, name);
    fs.writeFileSync(filePath, contents);
  }
};

(async () => {
  await generateFavicons();
})();
