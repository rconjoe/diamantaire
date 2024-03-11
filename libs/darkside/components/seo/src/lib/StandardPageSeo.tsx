/*
This is the Seo component for the home page + standard pages.
It has a fallback DefaultSeo component in CustomApp.tsx

We should update the dato seo component to includes custom meta images, and twitter metatags

https://github.com/garmeeh/next-seo
*/

import { generateLanguageAlternates } from '@diamantaire/shared/constants';
import { useRouter } from 'next/router';
import { NextSeo, WebPageJsonLd } from 'next-seo';

type StandardPageSeoProps = {
  title: string;
  description?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  breadcrumb?: {
    title?: string;
    name?: string;
    path: string;
    link?: {
      slug: string;
      category: string;
      slugNew: string;
    };
  }[];
};

const StandardPageSeo = ({ title, description, noIndex = false, noFollow = false }: StandardPageSeoProps) => {
  const router = useRouter();

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' || process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? 'https://www.vrai.com'
      : 'http://localhost:4200';
  const localePath = router.locale && router.locale !== router.defaultLocale ? `/${router.locale}` : '';
  const canonicalUrl = `${baseUrl}${localePath}${router.asPath}`;
  const languageAlternates = generateLanguageAlternates({ baseUrl, currentPath: router.asPath });

  // "@type": "WebPage",
  // "@id": "[Insert Page URL]/#webpage",
  // "isPartOf":{
  // "@id":""
  // },
  // "url": "Insert Page URL",
  // "name": "Insert Page Name (Title)",
  // "description": "Insert Page Description"

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        noindex={noIndex}
        nofollow={noFollow}
        canonical={canonicalUrl}
        languageAlternates={languageAlternates}
        openGraph={{
          url: canonicalUrl,
          title: title,
          description: description,
          images: [
            {
              url: 'https://www.vrai.com/static/logo.svg',
              width: 800,
              height: 600,
              alt: 'VRAI',
            },
          ],
          siteName: 'VRAI',
        }}
      ></NextSeo>
      <WebPageJsonLd
        id={canonicalUrl + '/#webpage'}
        url={canonicalUrl}
        name={title}
        description={description}
        isPartOf="https://www.vrai.com/#website"
      />
    </>
  );
};

export { StandardPageSeo };
