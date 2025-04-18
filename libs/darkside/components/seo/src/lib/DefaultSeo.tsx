/*
This is the default SEO meta tag settings.
We can add attributes we want in all meta tag configs here, and it also
acts as a fallback if no other next-seo component is being loaded in the component tree 🌲

https://github.com/garmeeh/next-seo

TODO: Setup default data process in Dato and VRAI Server https://diamondfoundry.atlassian.net/jira/software/projects/DIA/boards/99/backlog?selectedIssue=DIA-111
TODO: Fetch meta image from dato instead of locally
*/

import { useRouter } from 'next/router';
import { DefaultSeo as DefaultNextSeo, OrganizationJsonLd } from 'next-seo';

import defaultImage from '../public/default-seo.jpg';

const DefaultSeo = () => {
  const { locale } = useRouter();
  const config = {
    title: 'VRAI: Engagement Rings & Jewelry | Lab Grown Diamonds',
    description: 'Modern engagement rings. Everyday fine jewelry. lab grown, lab created diamonds. Solid gold.',
    canonical: 'https://vrai.com',
    openGraph: {
      type: 'website',
      url: 'https://vrai.com',
      title: 'VRAI: Engagement Rings & Jewelry | Lab Grown Diamonds',
      description: 'Modern engagement rings. Everyday fine jewelry. lab grown, lab created diamonds. Solid gold.',
      themeColor: '#fff',
      locale,
      images: [
        {
          ...defaultImage,
          alt: 'VRAI: Engagement Rings & Jewelry | Lab Grown Diamonds',
          url:
            process.env['NODE_ENV'] === 'production' || process.env['NODE_ENV'] === 'test'
              ? 'https://' + process.env['NEXT_PUBLIC_VERCEL_URL'] + defaultImage.src
              : 'http://localhost:4200' + defaultImage.src,
        },
      ],
    },
    additionalLinkTags: [
      {
        rel: 'icon',
        href: 'https://cdn.shopify.com/s/files/1/2119/7099/files/favicon.ico?v=1677790346',
      },
    ],
  };

  return (
    <>
      <DefaultNextSeo {...config} />
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
    </>
  );
};

export { DefaultSeo };
