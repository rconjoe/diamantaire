import { setSpace, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import { stripIndent } from 'common-tags';
import Script from 'next/script';
import { useEffect } from 'react';
import styled from 'styled-components';

type ProductReviewsProps = {
  reviewsId: string;
  shouldUseProductId?: boolean;
  isOkendoReady?: boolean;
  isReviewsPage?: boolean;
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

const ProductReviews = ({ reviewsId, shouldUseProductId, isReviewsPage }: ProductReviewsProps) => {
  useEffect(() => {
    window.okeInitCoreWidgets && window.okeInitCoreWidgets();
  }, [reviewsId]);

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
      <WidgetContainer className={clsx('okeReviews-widget-holder', 'container-wrapper')}>
        <div className="okeReviews okeReviews--theme js-okeReviews-headerAggregateHolder" />
        {getReviewType(isReviewsPage, shouldUseProductId, reviewsId)}
      </WidgetContainer>
    </>
  );
};

export { ProductReviews };

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
