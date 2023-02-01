import { JEWELRY_TYPES } from '@diamantaire/shared/constants';
import { mapShapeToSeoTitle } from '@diamantaire/shared/helpers';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  countryCode: PropTypes.string,
  router: PropTypes.object,
};

const PageMetaTitleAndDescription = ({ title, description }) => {
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

PageMetaTitleAndDescription.propTypes = propTypes;

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
