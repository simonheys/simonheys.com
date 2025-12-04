import type { MetadataRoute } from 'next';

import { getServerSideURL } from '@/utils/getURL';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getServerSideURL();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
