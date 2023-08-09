import {
  MOCK_WEDDING_BAND_PRODUCT_TYPE,
  MOCK_ENGAGEMENT_RING_PRODUCT_TYPE,
  MOCK_COLOR_DISPLAY_NAMING_MAP,
  DF_CERTIFICATE_ROOT_URL,
  DF_API_KEY,
  DIAMOND_TYPE_INTERNAL_NAMES,
} from '@diamantaire/shared/constants';
import axios from 'axios';
import { flatMap, map } from 'lodash';

import { mapShopifyColorsToInternal, dangerouslyExtractInternalShopifyId, getShopifyNumberFromDecimal } from './helper';

export const generateDiamondCollectionHandle = (type) => {
  return `diamonds-${type}`;
};

function checkForMockItem({ productType }) {
  return productType === MOCK_WEDDING_BAND_PRODUCT_TYPE || productType === MOCK_ENGAGEMENT_RING_PRODUCT_TYPE;
}

function getMockDisplayMetal(shopifyColor) {
  return MOCK_COLOR_DISPLAY_NAMING_MAP[shopifyColor];
}

function getDisplayMetal({ metal }, productType) {
  if (productType && checkForMockItem({ productType })) {
    return getMockDisplayMetal(metal);
  }

  return metal;
}

function getOptions(options, isVariant = false, productType?) {
  const extractedOptions: any = {};

  options.forEach((option) => {
    const lowerCaseOption = option.name.toLowerCase();

    extractedOptions[lowerCaseOption] = isVariant ? option.value : option.values;
  });

  if (isVariant) {
    if (extractedOptions.metal) {
      // retain Shopify display color
      extractedOptions.displayMetal = getDisplayMetal(extractedOptions, productType);
      extractedOptions.metal = mapShopifyColorsToInternal(extractedOptions.metal);
    }
    if (extractedOptions.color) {
      extractedOptions.displayColor = extractedOptions.color;
      extractedOptions.color = mapShopifyColorsToInternal(extractedOptions.color);
    }
    if (extractedOptions.side) {
      extractedOptions.side = extractedOptions.side.toLowerCase();
    }
  }

  return extractedOptions;
}

export function normalizeCollectionPages(responsePages) {
  const firstPage = responsePages[0];

  if (!firstPage.collection) {
    throw new Error(`Cannot normalize collection that has no first page`);
  }

  const { handle, title: collectionTitle } = firstPage.collection;

  const products = responsePages.reduce((products, page) => {
    const normalizedProductsInPage = page.collection.products.edges.map((edge) => {
      return getProductData(edge.node);
    });

    return products.concat(normalizedProductsInPage);
  }, []);

  return { collectionTitle, handle, products };
}

function getColorsFromNormalizedOptions(options) {
  return (options.color || options.metal || []).map(mapShopifyColorsToInternal);
}

function getProductData(productData) {
  const {
    handle,
    id,
    productType,
    options,
    tags,
    description,
    title,
    variants: { edges },
  } = productData;
  const extractedOptions = getOptions(options);
  const colors = getColorsFromNormalizedOptions(extractedOptions);
  const normalizedVariants = edges.map((edge) => getVariantData(edge.node));

  const productTitle = formatTitle(title);
  const dangerousInternalProductId = dangerouslyExtractInternalShopifyId(id);

  return {
    dangerousInternalProductId,
    productTitle,
    productType,
    handle,
    tags,
    description,
    colors,
    variants: normalizedVariants,
    options: extractedOptions,
  };
}

function getVariantData(variant, productType?) {
  const {
    selectedOptions,
    price,
    sku: variantSku,
    id: variantId,
    availableForSale: isForSale,
    title: variantTitle,
  } = variant;

  const variantOptions = getOptions(selectedOptions, true, productType);
  const dangerousInternalShopifyVariantId = dangerouslyExtractInternalShopifyId(variantId);
  const { amount } = price;

  return {
    isForSale,
    variantSku,
    variantId,
    dangerousInternalShopifyVariantId,
    variantTitle,
    //price: shopifyPriceToNumber(price),
    price: getShopifyNumberFromDecimal(amount),
    ...variantOptions,
  };
}

export function formatTitle(title) {
  return title.replace('Mock - ', '');
}

export function checkForDiamond(productType) {
  return productType === 'Diamond' || productType === 'Diamonds';
}

export function getDiamondDataFromTitle({ isDiamond = true, productTitle, isCto = false }) {
  if (!isDiamond) {
    return null;
  }

  const [type, carat, cut, color, clarity] = productTitle.split(',');

  //console.log('LOT ID/SKU: ', lotId);
  if (productTitle.split(',').length !== 6) {
    console.log(`Diamond title is not formatted correctly: ${productTitle}`);
  }

  function titleCase(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => {
        return word.replace(word[0], word[0]?.toUpperCase());
      })
      .join(' ');
  }

  function capitalize([firstLetter, ...restOfWord]) {
    return firstLetter.toUpperCase() + restOfWord.join('');
  }

  const titlecaseType = type && titleCase(type);
  const lowercaseType = titlecaseType.toLowerCase();
  const dashedType = lowercaseType.replace(/\s+/g, '-');

  return {
    type: titlecaseType.replace(/^\s+|\s+$/gm, ''),
    carat: Number(carat),
    cut,
    color: color && capitalize(color),
    clarity,
    //lotId, // commented out because lot id can be pulled from the sku
    //lotId: lotId ? lotId.replace(/\D/g, '') : lotId,
    diamondType: isCto === true ? dashedType : DIAMOND_TYPE_INTERNAL_NAMES[titlecaseType], // FOR NON-CTO DIAMONDS
    //diamondType: dashedType, // titlecaseType.toLowerCase().replace(/^\s+|\s+$/gm, ''), // FOR CTO DIAMONDS
  };
}

// export function createDiamondFoundryCertificateUrl({ lotId }) {
//   if (lotId) {
//     return `${DF_CERTIFICATE_ROOT_URL}${lotId}.pdf`;
//   }
//   return null;
// }

export function createDiamondFoundryCertificateUrl(lotId) {
  if (lotId) {
    return `${DF_CERTIFICATE_ROOT_URL}${lotId}.pdf`;
  }

  return null;
}

export function combineAndNormalizeDiamonds(diamondCollections) {
  if (!diamondCollections) {
    throw new Error(`No diamond collections from shopify to combine and normalize`);
  }

  const diamondProducts = flatMap(diamondCollections, ({ products }) =>
    map(products, ({ dangerousInternalProductId, handle, productTitle, productType, variants }) => {
      const isDiamond = checkForDiamond(productType); //product is a diamond
      const diamondData = getDiamondDataFromTitle({ isDiamond, productTitle });
      const lotId = variants[0].variantSku;
      const dfCertificateUrl = createDiamondFoundryCertificateUrl(lotId);
      const { isForSale, variantId, dangerousInternalShopifyVariantId, price } = variants[0];

      return {
        dangerousInternalProductId,
        handle,
        productTitle,
        isForSale,
        variantId,
        dangerousInternalShopifyVariantId,
        productType,
        price,
        variants,
        lotId,
        dfCertificateUrl,
        ...diamondData,
      };
    }),
  );

  const filteredDiamonds = [];

  // filter out diamonds with missing information
  diamondProducts.forEach((d) => {
    if (d && d.handle && d.productTitle) {
      filteredDiamonds.push(d);
    } else {
      console.log('Filtered out invalid diamond.', d);
    }
  });

  return filteredDiamonds;
}

// Remove diamonds that are on hold
export async function removeUnavailableDiamonds(diamondsFromShopify) {
  if (!diamondsFromShopify) {
    return diamondsFromShopify;
  }

  // fetch all holds from the diamond foundry API
  const holds = await getAllInventoryHolds();

  // if there are no holds, then just return the diamonds from shopify
  if (!(holds && Array.isArray(holds) && holds.length > 0)) {
    return diamondsFromShopify;
  }

  // reduce the holds to a hashmap
  // See https://stackoverflow.com/questions/26264956/convert-object-array-to-hash-map-indexed-by-an-attribute-value-of-the-object
  const holdsByLotId = holds.reduce((map, hold) => {
    map[String(hold.holdable.lot_id)] = hold;

    return map;
  }, {});

  return diamondsFromShopify.filter((diamond) => {
    if (!(diamond && diamond.lotId && !holdsByLotId[String(diamond.lotId)])) {
      console.log(`Removing diamond ${diamond.lotId} because it is on hold...`);
    }

    return diamond && diamond.lotId && !holdsByLotId[diamond.lotId];
  });
}

const getAllInventoryHolds = async () => {
  try {
    if (DF_API_KEY) {
      const url = `https://rest.diamondfoundry.com/all/?user_email=info@vrai.com&user_token=${DF_API_KEY}`;
      const res = await axios.get(url);
      const data = await res.data();

      return data;
    } else {
      console.log('Null DF_API_KEY sent to getAllInventoryHolds call.');
    }
  } catch (e) {
    console.log(`Exception in getAllInventoryHolds.`, e);
    //Sentry.captureException(new CustomException(`Exception in getAllInventoryHolds.`, e));
  }

  return [];
};

export function validateDiamondData(diamonds) {
  if (!diamonds || diamonds.some((diamond) => !diamond)) {
    throw new Error(`No diamonds from shopify`);
  }

  return diamonds;
}
