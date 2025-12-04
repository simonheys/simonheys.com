import type { MetadataRoute } from 'next';

import { getPagePaths } from '../modules/content';

import { getServerSideURL } from '@/utils/getURL';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getServerSideURL();
  const paths = getPagePaths();

  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  paths
    .filter((path) => path !== '/')
    .forEach((path) => {
      entries.push({
        url: `${baseUrl}${path}`,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });

  return entries;
}
