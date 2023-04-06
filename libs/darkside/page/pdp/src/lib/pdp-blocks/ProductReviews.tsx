import { setSpace, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import { stripIndent } from 'common-tags';
import Script from 'next/script';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import styled from 'styled-components';

const propTypes = {
  reviewsId: PropTypes.string.isRequired,
  shouldUseProductId: PropTypes.bool,
  isOkendoReady: PropTypes.bool,
  isReviewsPage: PropTypes.bool,
};

const WidgetContainer = styled.div`
  padding-top: ${setSpace(3)} !important;
  padding-bottom: ${setSpace(4)} !important;
  ${tabletAndUp(`
      padding-top: ${setSpace(4)} !important;
      padding-bottom: ${setSpace(6)} !important;
    `)};
  .okeReviews-reviewsAggregate-summary {
    display: none;
  }
  .okeReviews .okeReviews-review-response {
    display: table !important;
  }
`;

declare const window: any;

const ProductReviews = ({ reviewsId, shouldUseProductId, isReviewsPage }) => {
  useEffect(() => {
    window.okeInitCoreWidgets && window.okeInitCoreWidgets();
  }, [reviewsId]);

  // Okendo Star Reviews showing twice so overriding .okeReviews-reviewsAggregate-summary

  //   const flickityScript = useScript({
  //     src: 'https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js',
  //   });

  //   const reviewsWidgetScript = useScript({
  //     src: 'https://d3hw6dc1ow8pp2.cloudfront.net/reviewsWidget.min.js?shop=shop=vo-live.myshopify.com',
  //   });

  //   const awsOkendoScript = useScript({
  //     src: 'https://s3.amazonaws.com/static.vraiandoro.com/js/okendo-3.js',
  //   });

  //   useEffect(() => {
  //     if (flickityScript === 'ready' && window.Flickity && reviewsWidgetScript === 'ready' && awsOkendoScript === 'ready') {
  //       setIsOkendoReady(true);
  //     }
  //   }, [flickityScript, reviewsWidgetScript, awsOkendoScript]);

  return (
    <>
      <Script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js" />
      <Script src="https://d3hw6dc1ow8pp2.cloudfront.net/reviewsWidget.min.js?shop=shop=vo-live.myshopify.com" />
      <Script src="https://s3.amazonaws.com/static.vraiandoro.com/js/okendo-3.js" />

      <link href="https://d3hw6dc1ow8pp2.cloudfront.net/styles/main.min.css" rel="stylesheet" type="text/css" />
      <link
        href="https://dov7r31oq5dkj.cloudfront.net/c4c79526-c8cc-4c48-80ec-9ea847c75f69/widget-style-customisations.css?v=b3d24a1b-b945-4202-a13e-0c10c2f93255"
        rel="stylesheet"
        type="text/css"
      />
      <div
        id="oke-reviews-settings"
        style={{ display: 'none' }}
        dangerouslySetInnerHTML={{
          __html: stripIndent`{"gaEventTrackingEnabled":true,"omitMicrodata":true,"reviewSortOrder":"date","subscriberId":"c4c79526-c8cc-4c48-80ec-9ea847c75f69","widgetTemplateId":"default"}`,
        }}
      />
      <WidgetContainer className={clsx('okeReviews-widget-holder', 'container-emotion')}>
        <div className="okeReviews okeReviews--theme js-okeReviews-headerAggregateHolder" />
        {getReviewType(isReviewsPage, shouldUseProductId, reviewsId)}
      </WidgetContainer>
    </>
  );
};

// const mapStateToProps = (state, { productData, shouldUseProductId }) => {
//   const getReviewsId = () => {
//     if (shouldUseProductId) {
//       const dangerousInternalProductId = omegaProductData.getDangerousInternalProductId(productData);

//       return `shopify-${dangerousInternalProductId}`;
//     }

//     return omegaProductData.getDangerousInternalCollectionId(productData);
//   };

//   return {
//     reviewsId: getReviewsId(),
//   };
// };

ProductReviews.propTypes = propTypes;

export default ProductReviews;

function getReviewType(isReviewsPage, shouldUseProductId, reviewsId) {
  switch (true) {
    case isReviewsPage:
      return <div data-oke-reviews-widget />;
    case shouldUseProductId:
      return <div data-oke-reviews-widget data-oke-reviews-product-id={reviewsId} />;
    default:
      return <div data-oke-reviews-widget data-oke-reviews-collection-id={reviewsId} />;
  }
}
