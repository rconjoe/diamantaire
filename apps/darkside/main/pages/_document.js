import { Html, Main, NextScript, Head } from 'next/document';
import { renderStatic } from 'react';

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

// This is temp until we are fully off emotion
export async function getInitialProps(ctx) {
  const page = await ctx.renderPage();
  const { css, ids } = await renderStatic(page.html);
  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style data-emotion={`css ${ids.join(' ')}`} dangerouslySetInnerHTML={{ __html: css }} />
      </>
    ),
  };
}
