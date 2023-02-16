import { JEWELRY_TYPES } from '@diamantaire/shared/constants';
import { mapShapeToSeoTitle } from '@diamantaire/shared/helpers';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

type PageMetaTitleAndDescriptionProps = {
  title: string;
  description: string;
  countryCode?: string;
};

const PageMetaTitleAndDescription = ({ title, description }: PageMetaTitleAndDescriptionProps) => {
  const router = useRouter();
  const countryCode = 'US';
  const seoTitle = getSeoTitle({ router, title, countryCode });
  const seoDescription = getSeoDescription({
    router,
    description,
    countryCode,
  });

  return (
    <Head>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
    </Head>
  );
};

const getIsJewelryPLPRoute = (router) => {
  return JEWELRY_TYPES.includes(router.asPath);
};

const getSeoTitle = ({ router, title, countryCode }) => {
  const isJewelryPLPRoute = getIsJewelryPLPRoute(router);

  if (isJewelryPLPRoute && countryCode === 'US') {
    return mapShapeToSeoTitle(router.asPath);
  }

  return title;
};

const getSeoDescription = ({ router, description, countryCode }) => {
  const isJewelryPLPRoute = getIsJewelryPLPRoute(router);

  if (isJewelryPLPRoute && countryCode === 'US') {
    return mapShapeToSeoTitle(router.asPath);
  }

  return description;
};

export { PageMetaTitleAndDescription };
