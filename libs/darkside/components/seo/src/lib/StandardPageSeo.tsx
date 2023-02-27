/* 
This is the Seo component for the home page + standard pages. 
It has a fallback DefaultSeo component in CustomApp.tsx

We should update the dato seo component to includes custom meta images, and twitter metatags 

https://github.com/garmeeh/next-seo
*/

import { NextSeo } from 'next-seo';

type StandardPageSeoProps = {
  title: string;
  description: string;
  noIndex?: boolean;
  noFollow?: boolean;
};

const StandardPageSeo = ({ title, description, noIndex = false, noFollow = false }: StandardPageSeoProps) => {
  return <NextSeo title={title} description={description} noindex={noIndex} nofollow={noFollow} />;
};

export { StandardPageSeo };
