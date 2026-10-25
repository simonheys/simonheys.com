import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import sharp from 'sharp';

import getImageColor from './getImageColor';

let directory: string;

beforeEach(async () => {
  directory = await mkdtemp(path.join(tmpdir(), 'image-color-'));
});

afterEach(async () => {
  await rm(directory, { recursive: true, force: true });
});

test('reads the first pixel rather than averaging the image', async () => {
  const filePath = path.join(directory, 'colors.png');
  await sharp(Buffer.from([255, 0, 0, 0, 0, 255]), {
    raw: { width: 2, height: 1, channels: 3 },
  })
    .png()
    .toFile(filePath);

  await expect(getImageColor(filePath)).resolves.toBe('#ff0000');
});

test('reads RGB channels from transparent images', async () => {
  const filePath = path.join(directory, 'transparent.png');
  await sharp(Buffer.from([12, 34, 56, 0]), {
    raw: { width: 1, height: 1, channels: 4 },
  })
    .png()
    .toFile(filePath);

  await expect(getImageColor(filePath)).resolves.toBe('#0c2238');
});

test('expands grayscale pixels to RGB', async () => {
  const filePath = path.join(directory, 'gray.png');
  await sharp(Buffer.from([128]), {
    raw: { width: 1, height: 1, channels: 1 },
  })
    .toColourspace('b-w')
    .png()
    .toFile(filePath);

  await expect(getImageColor(filePath)).resolves.toBe('#808080');
});

test('reads SVG colors through the existing renderer', async () => {
  const filePath = path.join(directory, 'color.svg');
  await writeFile(
    filePath,
    '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><rect width="1" height="1" fill="#123456"/></svg>',
  );

  await expect(getImageColor(filePath, 'svg')).resolves.toBe('#123456');
});
