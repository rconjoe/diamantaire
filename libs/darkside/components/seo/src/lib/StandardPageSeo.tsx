/* 
This is the Seo component for the home page + standard pages. 
It has a fallback DefaultSeo component in CustomApp.tsx

We should update the dato seo component to includes custom meta images, and twitter metatags 

https://github.com/garmeeh/next-seo
*/

import { parseValidLocale } from '@diamantaire/shared/constants';
import { useRouter } from 'next/router';
import { BreadcrumbJsonLd, NextSeo, OrganizationJsonLd } from 'next-seo';

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

const StandardPageSeo = ({ title, description, noIndex = false, noFollow = false, breadcrumb }: StandardPageSeoProps) => {
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

  const areThereBreadcrumbs = breadcrumb.length > 0 ? true : false;

  const breadcrumbList = areThereBreadcrumbs
    ? [
        {
          position: 1,
          name: 'Home',
          item: baseUrl,
        },
      ]
    : null;

  if (areThereBreadcrumbs) {
    breadcrumb?.map((crumb, index) => {
      return breadcrumbList.push({
        position: index + 1 + breadcrumbList.length,
        name: crumb.name,
        item: `${baseUrl}/${crumb?.link?.slug}`,
      });
    });
  }

  return (
    <>
      <OrganizationJsonLd
        name="VRAI"
        url="https://www.vrai.com"
        sameAs={[
          'https://www.facebook.com/VRAIjewelry/',
          'https://www.instagram.com/vraiofficial/',
          'https://www.pinterest.com/vrai/',
        ]}
        id="https://www.vrai.com#organization"
        logo="https://www.vrai.com/static/logo.svg"
        contactPoint={[
          {
            contactType: 'Customer Service',
            email: 'hello@vrai.com',
          },
        ]}
      />
      <BreadcrumbJsonLd itemListElements={breadcrumbList} />
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
      >
        {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                name: 'VRAI',
                url: 'https://www.vrai.com',
                sameAs: [
                  'https://www.facebook.com/VRAIjewelry/',
                  'https://www.instagram.com/vraiofficial/',
                  'https://www.pinterest.com/vrai/',
                ],
                '@id': 'https://www.vrai.com#organization',
                logo: {
                  '@type': 'ImageObject',
                  '@id': 'https://vrai.com/#logo',
                  '@url': 'https://www.vrai.com/static/logo.svg',
                },
                contactPoint: {
                  '@type': 'ContactPoint',
                  contactType: 'Customer Service',
                  email: 'hello@vrai.com',
                },
              },
              {
                '@type': 'WebPage',
                url: 'https://www.vrai.com',
                '@id': 'https://www.vrai.com#webpage',
                isPartOf: {
                  '@id': 'https://www.vrai.com#website',
                },
                name: 'home-page',
                description: 'Modern engagement rings. Everyday fine jewelry. lab grown, lab created diamonds. Solid gold.',
              },
              {
                '@type': 'WebSite',
                name: 'VRAI',
                url: 'https://www.vrai.com#website',
                '@id': 'https://www.vrai.com#website',
                publisher: {
                  '@id': 'https://www.vrai.com#organization',
                },
              },
            ],
          }),
        }}
      /> */}
      </NextSeo>
    </>
  );
};

export { StandardPageSeo };
