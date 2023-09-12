/* eslint-disable camelcase */
import { getCurrency, parseValidLocale, getFormattedPrice } from '@diamantaire/shared/constants';
import { dangerouslyExtractInternalShopifyId } from '@diamantaire/shared-product';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAnalytics, GTM_EVENTS } from './AnalyticsProvider';

interface ProductData {
  productTitle: string;
  productType: string;
  canonicalVariant: {
    shopifyVariantId: string;
    shopifyProductId: string;
    price: number;
    sku: string;
    configuration: {
      [key: string]: string;
    };
    defaultRingSize: string;
    subStyles: string[];
  };
  cms: {
    productTitle: string;
    image: {
      src: string;
    };
  };
  styles: string[];
}

interface Props {
  productData?: ProductData;
  listPageData?: {
    hero: {
      title: string;
    };
    category: string;
    productData: ProductData[];
  };
}

const PageViewTracker = ({ productData, listPageData }: Props) => {
  const { viewPage, productViewed, productListViewed } = useAnalytics();

  const router = useRouter();
  const { countryCode } = parseValidLocale(router?.locale);

  const currencyCode = getCurrency(countryCode);

  function emitViewPageEvent(pageName: string) {
    const segments = router?.pathname.split('/').filter(Boolean);
    const productSlugSegmentPath = segments[segments.length - 1];
    const isProductSlug = productSlugSegmentPath === '[productSlug]';
    const isListPageSlug = productSlugSegmentPath === '[...plpSlug]';

    if (isListPageSlug) {
      const { hero, productData: products, category } = listPageData || {};

      const normalizedProducts = getNormalizedListPageProducts({ products, locale: router?.locale, currencyCode });
      const firstThreeProducts = normalizedProducts.slice(0, 3);
      const variantIds = firstThreeProducts.map(({ id }) => id);

      productListViewed({
        listName: hero?.title,
        category,
        variantIds,
        products: firstThreeProducts,
      });
    } else if (isProductSlug) {
      const { productTitle, productType, canonicalVariant, cms, styles } = productData || {};

      const id = dangerouslyExtractInternalShopifyId(canonicalVariant?.shopifyVariantId);
      const product_id = dangerouslyExtractInternalShopifyId(canonicalVariant?.shopifyProductId);
      const price = getFormattedPrice(canonicalVariant?.price, router?.locale, true, true);
      const quantity = 1;
      const brand = 'VRAI';
      const name = cms?.productTitle;
      const variant = productTitle;
      const configuration = normalizeVariantConfigurationForGTM(canonicalVariant?.configuration);
      const { subStyles } = canonicalVariant || {};

      productViewed({
        // rudderstack base ecommerce keys
        id,
        product_id,
        sku: canonicalVariant?.sku,
        category: productType,
        name,
        brand,
        variant: productTitle,
        price,
        quantity,
        currency: currencyCode,
        url: router?.asPath,
        image_url: cms?.image?.src,
        // gtm specific
        ...configuration,
        ringSize: canonicalVariant?.defaultRingSize,
        styles: styles || subStyles,
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

function getNormalizedListPageProducts({ products, locale, currencyCode }) {
  if (!products) {
    return [];
  }

  const normalizedProducts =
    products &&
    products.map((product, idx) => {
      const { defaultId, variants } = product;
      const {
        productSlug,
        productType,
        primaryImage: { src },
        price,
        title,
      } = variants[defaultId];
      const variantId = productSlug.split('-').pop();
      const formattedPrice = getFormattedPrice(price, locale, true, true);
      const brand = 'VRAI';

      return {
        id: variantId,
        position: idx,
        category: productType,
        image_url: src,
        price: formattedPrice,
        currencyCode,
        brand,
        name: title,
        // rudderstack base ecommerce keys could add later
        // sku,
        // variant,
        // product_id
      };
    });

  return normalizedProducts;
}
