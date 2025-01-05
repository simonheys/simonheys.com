import manifest from '@simonheys/wordclock-words/json/Manifest.json';
import { NextResponse } from 'next/server';

const words: Record<
  string,
  {
    file: string;
    title: string;
  }[]
> = {};

type LanguageKey = keyof typeof manifest.languages;

interface Meta {
  language: LanguageKey;
  title: string;
}

manifest.files.forEach((file) => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const json = require(`@simonheys/wordclock-words/json/${file}`);
  const { meta }: { meta: Meta } = json;
  const { language, title } = meta;
  const languageTitle = manifest.languages[language];
  if (!words[languageTitle]) {
    words[languageTitle] = [];
  }
  words[languageTitle].push({
    file,
    title,
  });
});

const wordsOrdered = Object.keys(words)
  .sort()
  .reduce((obj: typeof words, key) => {
    obj[key] = words[key];
    return obj;
  }, {});

export async function GET() {
  return NextResponse.json(wordsOrdered);
}

// Handle unsupported methods
export async function POST() {
  return new NextResponse(null, { status: 405 });
}

export async function PUT() {
  return new NextResponse(null, { status: 405 });
}

export async function DELETE() {
  return new NextResponse(null, { status: 405 });
}

export async function PATCH() {
  return new NextResponse(null, { status: 405 });
}
