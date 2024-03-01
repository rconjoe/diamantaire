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
  breadcrumb: {
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

  const { languageCode } = parseValidLocale(router.locale);

  const seoParam = {
    en: '',
    es: '/en-ES/',
    fr: '/fr-FR/',
    de: '/de-DE/',
  };

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' || process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? 'https://www.vrai.com'
      : 'http://localhost:4200';

  return (
    <NextSeo
      title={title}
      description={description}
      noindex={noIndex}
      nofollow={noFollow}
      canonical={baseUrl + seoParam[languageCode] + router.asPath}
      openGraph={{
        url: baseUrl + seoParam[languageCode] + router.asPath,
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
        site_name: 'VRAI',
      }}
    ></NextSeo>
  );
};

export { StandardPageSeo };
