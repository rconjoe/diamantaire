/* eslint-disable camelcase */
import { getCurrency, parseValidLocale, getFormattedPrice } from '@diamantaire/shared/constants';
import { dangerouslyExtractInternalShopifyId } from '@diamantaire/shared-product';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAnalytics, GTM_EVENTS, normalizeVariantConfigurationForGTM } from './helpers';

interface ProductData {
  productTitle: string;
  productType: string;
  shopifyProductId: string;
  price: number;
  sku: string;
  canonicalVariant: {
    productSlug: string;
    collectionSlug: string;
    productType: string;
  };
  configuration: {
    bandAccent: string;
    caratWeight: string;
    diamondOrientation: string;
    diamondType: string;
    goldPurity: string;
    metal: string;
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
    productData: any;
  };
  isSummaryPage?: boolean;
}

const PageViewTracker = ({ productData, listPageData, isSummaryPage }: Props) => {
  const { viewPage, productViewed, productListViewed } = useAnalytics();

  const router = useRouter();
  const { countryCode } = parseValidLocale(router?.locale);

  const currencyCode = getCurrency(countryCode);

  function emitViewPageEvent(pageName: string) {
    const segments = router?.pathname.split('/').filter(Boolean);

    const productSlugSegmentPath = segments[segments.length - 1];

    const isProductSlug = productSlugSegmentPath === '[productSlug]' || isSummaryPage;
    const isListPageSlug = productSlugSegmentPath === '[...plpSlug]';

    if (isListPageSlug) {
      const { hero, productData: listpageProductData, category } = listPageData || {};
      const listName = hero?.title;

      const normalizedProducts = getNormalizedListPageProducts({
        productData: listpageProductData,
        locale: router?.locale,
        currencyCode,
      });

      const firstThreeProducts = normalizedProducts.slice(0, 3);
      const firstThreeItems = getGTMNormalizedListPageItems({
        productData: listpageProductData,
        locale: router?.locale,
        currencyCode,
        listName,
      }).slice(0, 3);
      const variantIds = firstThreeProducts.map(({ id }) => id);

      return productListViewed({
        listName,
        category,
        variantIds,
        currency: currencyCode,
        products: firstThreeProducts,
        ecommerce: {
          items: firstThreeItems,
        },
        item_list_name: listName,
      });
    } else if (isProductSlug) {
      const {
        productTitle,
        productType,
        canonicalVariant,
        cms,
        styles,
        shopifyProductId,
        sku,
        price: productPrice,
        configuration: productConfiguration,
      } = productData || {};

      const id = canonicalVariant?.productSlug.split('-').pop();
      const product_id = dangerouslyExtractInternalShopifyId(shopifyProductId);
      const price = getFormattedPrice(productPrice, router?.locale, true, true);
      const quantity = 1;
      const brand = 'VRAI';
      const name = cms?.productTitle;
      const variant = productTitle;
      const configuration = normalizeVariantConfigurationForGTM(productConfiguration);

      return productViewed({
        // rudderstack base ecommerce keys
        id,
        product_id,
        sku,
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
        styles: styles,
        eventCategory: 'product_engagement',
        eventAction: GTM_EVENTS.viewItem,
        eventLabel: productType,
        value: price,
        product: name,
        countryCode,
        isSummaryPage,
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
      return viewPage(pageName);
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

function getNormalizedListPageProducts({ productData, locale, currencyCode }) {
  if (!productData || !Array.isArray(productData.pages)) {
    return [];
  }

  const allProducts = productData.pages.flatMap((page) => page.products);
  const normalizedProducts = allProducts.map((product, idx) => {
    if (!product) {
      return null;
    }
    const { defaultId, variants } = product || {};
    const variant = variants?.[defaultId];

    if (!variant) return null;

    const { productSlug, productType, primaryImage, price, title } = variant;
    const { src } = primaryImage || {};
    const variantId = productSlug.split('-').pop();
    const formattedPrice = getFormattedPrice(price, locale, true, true);
    const brand = 'VRAI';

    return {
      id: variantId,
      position: idx,
      category: productType,
      image_url: src,
      price: formattedPrice,
      currency: currencyCode,
      brand,
      name: title,
      // rudderstack base ecommerce keys could add later
      // sku,
      // variant,
      // product_id
    };
  });

  return normalizedProducts.filter((product) => product !== null);
}

function getGTMNormalizedListPageItems({ productData, locale, currencyCode, listName }) {
  if (!productData || !Array.isArray(productData.pages)) {
    return [];
  }

  const allProducts = productData.pages.flatMap((page) => page.products);

  const normalizedProducts = allProducts.map((product, idx) => {
    const { defaultId, variants } = product || {};
    const variant = variants?.[defaultId];

    if (!variant) return null;

    const { productSlug, productType, price, title, configuration } = variant;
    const variantId = productSlug.split('-').pop();
    const formattedPrice = getFormattedPrice(price, locale, true, true);
    const brand = 'VRAI';

    // Check if configuration exists and is an object
    let itemVariant = '';

    if (configuration && typeof configuration === 'object') {
      itemVariant = Object.values(configuration).join(', ');
    }

    return {
      item_id: variantId,
      item_name: title,
      index: idx,
      item_brand: brand,
      item_category: productType,
      item_list_name: listName,
      price: formattedPrice,
      quantity: 1,
      currency: currencyCode,
      item_variant: itemVariant, // Add item_variant to the returned object
    };
  });

  return normalizedProducts.filter((product) => product !== null);
}
