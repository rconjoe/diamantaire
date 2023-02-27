/* This is the default SEO meta tag settings.
We can add attributes we want in all meta tag configs here, and it also 
acts as a fallback if no other next-seo component is being loaded 
*/

import { DefaultSeo as DefaultNextSeo } from 'next-seo';

const config = {
  title: 'VRAI: Engagement Rings & Jewelry | Lab Grown Diamonds',
};

const DefaultSeo = () => {
  return <DefaultNextSeo {...config} />;
};

export { DefaultSeo };
