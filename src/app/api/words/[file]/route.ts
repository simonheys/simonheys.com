import manifest from '@simonheys/wordclock-words/json/Manifest.json';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

type FileToJson = {
  [key: string]: object;
};

const fileToJson: FileToJson = {};

manifest.files.forEach((file: string) => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const json = require(`@simonheys/wordclock-words/json/${file}`);
  fileToJson[file] = json;
});

export async function GET(
  _request: Request,
  props: { params: Promise<{ file: string }> },
) {
  const params = await props.params;
  const { file } = params;
  const json = fileToJson[file];

  if (!json) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.json(json);
}
