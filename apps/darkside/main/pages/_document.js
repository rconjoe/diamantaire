import { Html, Main, NextScript, Head } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preload" href="https://use.typekit.net/ram5cej.css" as="style" crossOrigin="true" />
        <link rel="stylesheet" href="https://use.typekit.net/ram5cej.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
