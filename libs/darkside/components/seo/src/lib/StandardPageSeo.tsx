import { NextSeo } from 'next-seo';

const StandardPageSeo = ({ title, description, noIndex = false, noFollow = false }) => {
  return <NextSeo title={title} description={description} noindex={noIndex} nofollow={noFollow} />;
};

export { StandardPageSeo };
