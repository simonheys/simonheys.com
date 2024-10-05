import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://player.vimeo.com"></link>
          <link
            rel="preconnect"
            href="https://player.vimeo.com"
            crossOrigin="anonymous"
          ></link>
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS 2.0"
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/feed/rss`}
          />
          <link
            rel="alternate"
            type="application/atom+xml"
            title="Atom"
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/feed/atom`}
          />
          <link
            rel="alternate"
            type="application/json"
            title="jsonfeed"
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/feed/json`}
          />
          <link rel="shortcut icon" href="/favicon/favicon.ico"></link>
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          ></link>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          ></link>
          <link
            rel="icon"
            type="image/png"
            sizes="48x48"
            href="/favicon/favicon-48x48.png"
          ></link>
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/favicon/apple-touch-icon-57x57.png"
          ></link>
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/favicon/apple-touch-icon-60x60.png"
          ></link>
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/favicon/apple-touch-icon-72x72.png"
          ></link>
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/favicon/apple-touch-icon-76x76.png"
          ></link>
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/favicon/apple-touch-icon-114x114.png"
          ></link>
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/favicon/apple-touch-icon-120x120.png"
          ></link>
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/favicon/apple-touch-icon-144x144.png"
          ></link>
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/favicon/apple-touch-icon-152x152.png"
          ></link>
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/favicon/apple-touch-icon-167x167.png"
          ></link>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon-180x180.png"
          ></link>
          <link
            rel="apple-touch-icon"
            sizes="1024x1024"
            href="/favicon/apple-touch-icon-1024x1024.png"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
