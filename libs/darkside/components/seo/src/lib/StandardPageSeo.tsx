/* 
This is the Seo component for the home page + standard pages. 
It has a fallback DefaultSeo component in CustomApp.tsx

We should update the dato seo component to includes custom meta images, and twitter metatags 

https://github.com/garmeeh/next-seo
*/

import { parseValidLocale } from '@diamantaire/shared/constants';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

type StandardPageSeoProps = {
  title: string;
  description?: string;
  noIndex?: boolean;
  noFollow?: boolean;
};

const StandardPageSeo = ({ title, description, noIndex = false, noFollow = false }: StandardPageSeoProps) => {
  const router = useRouter();

  const { languageCode } = parseValidLocale(router.locale);

  const seoParam = {
    en: '',
    es: '/en-ES/',
    fr: '/fr-FR/',
    de: '/de-DE/',
  };

  return (
    <NextSeo
      title={title}
      description={description}
      noindex={noIndex}
      nofollow={noFollow}
      canonical={
        (process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http:localhost:4200') +
        seoParam[languageCode] +
        router.asPath
      }
    />
  );
};

export { StandardPageSeo };
