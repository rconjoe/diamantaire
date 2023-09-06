import { getCurrency, parseValidLocale, getFormattedPrice } from '@diamantaire/shared/constants';
import { dangerouslyExtractInternalShopifyId } from '@diamantaire/shared-product';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAnalytics } from './AnalyticsProvider';

const PageViewTracker = ({ productData }) => {
  const { viewPage, productViewed } = useAnalytics();
  const router = useRouter();

  function emitViewPageEvent(pageName: string) {
    const segments = router?.pathname.split('/').filter(Boolean);
    const productSlugSegmentPath = segments[segments.length - 1];
    const isProductSlug = productSlugSegmentPath === '[productSlug]';

    if (isProductSlug) {
      const { shopifyProductId, productTitle, productType, canonicalVariant, cms, styles } = productData || {};

      const { countryCode } = parseValidLocale(router?.locale);

      const currencyCode = getCurrency(countryCode);
      const product_id = dangerouslyExtractInternalShopifyId(shopifyProductId);
      const id = dangerouslyExtractInternalShopifyId(canonicalVariant?.defaultVariantId) || '40058777370717';

      productViewed({
        id,
        product_id,
        sku: canonicalVariant?.defaultSku || 'VRAI-0001',
        category: productType,
        name: cms?.productTitle,
        brand: 'VRAI',
        variant: productTitle,
        price: getFormattedPrice(canonicalVariant?.price, router?.locale, true, true),
        ringSize: canonicalVariant?.defaultRingSize,
        quantity: 1,
        currency: currencyCode,
        url: router?.asPath,
        image_url: cms?.image?.src,
        ...canonicalVariant?.configuration,
        styles,
      });
    } else {
      viewPage(pageName);
    }
  }
  useEffect(() => {
    // Manually track the initial page view when the component mounts
    emitViewPageEvent(router.pathname);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null; // This component doesn't render anything in the DOM
};

export { PageViewTracker };
