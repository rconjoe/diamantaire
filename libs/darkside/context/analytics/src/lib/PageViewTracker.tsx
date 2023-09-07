import { getCurrency, parseValidLocale, getFormattedPrice } from '@diamantaire/shared/constants';
import { dangerouslyExtractInternalShopifyId } from '@diamantaire/shared-product';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAnalytics, GTM_EVENTS } from './AnalyticsProvider';

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
      const id = dangerouslyExtractInternalShopifyId(canonicalVariant?.defaultVariantId) || '40058777370717';
      const product_id = dangerouslyExtractInternalShopifyId(shopifyProductId);
      const price = getFormattedPrice(canonicalVariant?.price, router?.locale, true, true);
      const quantity = 1;
      const brand = 'VRAI';
      const name = cms?.productTitle;
      const variant = productTitle;
      const configuration = normalizeVariantConfigurationForGTM(canonicalVariant?.configuration);

      productViewed({
        id,
        product_id,
        sku: canonicalVariant?.defaultSku || 'VRAI-0001',
        category: productType,
        name,
        brand,
        variant: productTitle,
        price,
        ringSize: canonicalVariant?.defaultRingSize,
        quantity,
        currency: currencyCode,
        url: router?.asPath,
        image_url: cms?.image?.src,
        ...configuration,
        styles,
        eventCategory: 'product_engagement',
        eventAction: GTM_EVENTS.viewItem,
        eventLabel: productType,
        value: price,
        product: name,
        countryCode,
        ecommerce: {
          detail: {
            products: [
              {
                id,
                name,
                price,
                brand,
                category: productType,
                quantity,
                currency: currencyCode,
                variant,
              },
            ],
          },
          items: [
            {
              item_id: id,
              item_name: name,
              price,
              item_brand: brand,
              item_category: productType,
              variant,
              quantity: 1,
              currency: currencyCode,
              ...configuration,
            },
          ],
        },
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

const normalizeVariantConfigurationForGTM = (configuration: Record<string, any>) => {
  const normalizedConfiguration: Record<string, any> = {};

  for (const [key, value] of Object.entries(configuration)) {
    switch (key) {
      case 'diamondType':
        normalizedConfiguration.diamond_type = value;
        break;
      case 'goldPurity':
        normalizedConfiguration.gold_purity = value;
        break;
      case 'caratWeight':
        normalizedConfiguration.carat_weight = value;
        break;
      default:
        normalizedConfiguration[key] = value;
        break;
    }
  }

  return normalizedConfiguration;
};
