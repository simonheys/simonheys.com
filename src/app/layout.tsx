import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata, Viewport } from 'next';
import { JetBrains_Mono } from 'next/font/google';

import '../styles/globals.css';

import { getServerSideURL } from '@/utils/getURL';

const font = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
  variable: '--font-jetbrains',
});

const metadataBase = new URL(getServerSideURL());

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  applicationName: 'Simon Heys',
  metadataBase,
  alternates: {
    types: {
      'application/rss+xml': '/feed/rss',
      'application/atom+xml': '/feed/atom',
      'application/json': '/feed/json',
    },
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={font.variable}>
      <body className="overflow-y-scroll bg-background text-foreground antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
