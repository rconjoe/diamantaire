import { z } from 'zod';

import { transformProductVariant, variantNodeSchema } from './product-variant';
import { DEFAULT_JEWELRY_RING_SIZE, DEFAULT_ENGAGEMENT_RING_SIZE, DEFAULT_WEDDING_BAND_SIZE } from '../../constants/product';
import { ProductType } from '../../constants/product-properties';
import { VSLUG_PREFIX } from '../../constants/shopify';
import { VraiProduct } from '../../types';

const NormalizerType = {
  Single: 'single',
  Multiple: 'multiple',
  Split: 'split',
} as const;

function getDefaultVariant(variants, productType) {
  let defaultRingSize = DEFAULT_JEWELRY_RING_SIZE;
  const defaultVariant = variants[0];

  if (productType === ProductType.Ring) {
    defaultRingSize = DEFAULT_JEWELRY_RING_SIZE;
  } else if (productType === ProductType.EngagementRing) {
    defaultRingSize = DEFAULT_ENGAGEMENT_RING_SIZE;
  } else if (productType === ProductType.WeddingBand) {
    defaultRingSize = DEFAULT_WEDDING_BAND_SIZE;
  }

  const defaultRingSizeVariant = variants.find((variant) => variant.configuration['ringSize'] === defaultRingSize);

  return defaultRingSizeVariant || defaultVariant;
}

// Single variant product
export function normalizeSingleProduct(tProduct: VraiProduct): VraiProduct[] {
  const defaultVariant = getDefaultVariant(tProduct.variants, tProduct.productType);
  const configuration: Record<string, string> = {
    ...tProduct.configuration,
    ...defaultVariant.configuration,
  };

  delete configuration['size'];
  delete configuration['ringSize'];

  return [
    {
      ...tProduct,
      configuration,
    },
  ];
}

// Multiple variant product where each variant needs to be a seperate product
export function normalizeMultipleProduct(tProduct: VraiProduct): VraiProduct[] {
  const products = [];

  tProduct.variants.forEach((variant) => {
    const contentId = variant.shopifyVariantId.split('/').pop();
    const configuration: Record<string, string> = {
      ...tProduct.configuration,
      ...variant.configuration,
    };
    const configurationSlug = `${configuration['diamondType']}-${configuration['metal}-${contentId']}`;

    const product = {
      ...tProduct,
      contentId, // Make function for converting to shopify global id,
      configurationSlug,
      configuration,
      variants: [variant],
    };

    products.push(product);
  });

  return products;
}

// Variangts need to be grpouped by metal and split into seperate products
export function normalizeSplitProduct(tProduct: VraiProduct): VraiProduct[] {
  const variantsByMetalType = tProduct.variants.reduce((prevMap, variant) => {
    const { metal } = variant.configuration as Record<string, string>;
    const variants = prevMap[metal] || [];

    variants.push(variant);
    prevMap[metal] = variants;

    return prevMap;
  }, {});
  const products = Object.values(variantsByMetalType).map((variants) => {
    const defaultVariant = getDefaultVariant(variants, tProduct.productType);
    const contentId = defaultVariant.shopifyVariantId.split('/').pop();
    const configuration: Record<string, string> = {
      ...tProduct.configuration,
      ...defaultVariant.configuration,
    };

    delete configuration['size'];
    delete configuration['ringSize'];
    const configurationSlug = `${configuration['diamondType']}-${configuration['metal']}-${contentId}`;

    const product = {
      ...tProduct,
      contentId, // Make function for converting to shopify global id,
      configurationSlug,
      configuration,
      price: defaultVariant.price,
    };

    return product;
  });

  return products;
}

function getNormalizationType(vraiProduct: VraiProduct) {
  const { productType } = vraiProduct;

  if (productType === ProductType.Ring) {
    return NormalizerType.Split;
  } else if (
    productType === ProductType.Earrings ||
    productType === ProductType.Necklace ||
    productType === ProductType.Bracelet
  ) {
    // Each side is not a seperate product
    if (vraiProduct.variants[0].configuration['side']) {
      return NormalizerType.Single;
    }

    return NormalizerType.Multiple;
  } else {
    return NormalizerType.Single;
  }
}

export function normalizeShopifyProduct(vraiProduct: VraiProduct): VraiProduct[] {
  const normalizationType = getNormalizationType(vraiProduct);

  if (normalizationType === NormalizerType.Single) {
    return normalizeSingleProduct(vraiProduct);
  } else if (normalizationType === NormalizerType.Multiple) {
    return normalizeMultipleProduct(vraiProduct);
  } else if (normalizationType === NormalizerType.Split) {
    return normalizeSplitProduct(vraiProduct);
  }

  return [];
}

const parseTagsAsConfiguration = (tags: string[]): Record<string, string> => {
  return tags.reduce((prevParsedTags, tag) => {
    if (tag.indexOf('_') === 0) {
      // TODO: use regex
      const [key, value] = tag.replace('_', '').split(':');

      if (
        (key === 'diamondType' && value === 'any') ||
        key === 'collection' ||
        key === 'diamondShape' ||
        key === 'isHybridMadeToOrder' ||
        key === 'removeOneCaratOptions' ||
        key === 'removeDraftFromProduction'
      ) {
        // continue
      } else {
        prevParsedTags = {
          ...prevParsedTags,
          [key]: value,
        };
      }
    }

    return prevParsedTags;
  }, {});
};

const parseProductPropertiesFromTags = (tags: string[]): { styles?: string[] } & Record<string, string> => {
  return tags.reduce((prevParsedTags, tag) => {
    if (tag.indexOf('^') === 0) {
      const [key] = tag.replace('^', '').split(':');

      return {
        ...prevParsedTags,
        [key]: true,
      };
    }

    return prevParsedTags;
  }, {});
};

const transformProductTags = (tags, productType) => {
  const configFromTags = parseTagsAsConfiguration(tags);

  const configuration = {
    ...configFromTags,
  };

  if (productType === ProductType.EngagementRing && !configuration['diamondOrientation']) {
    // configuration.diamondOrientation = 'horizontal';
  }

  return {
    configuration,
    ...parseProductPropertiesFromTags(tags),
  };
};

const shopifyProductSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    handle: z.string(),
    productType: z.string(),
    tags: z.array(z.string()),
    // description: z.string(),
    options: z.array(
      z.object({
        name: z.string(),
        values: z.array(z.string()),
      }),
    ),
    variants: z.object({
      edges: z.array(variantNodeSchema),
    }),
  })
  .optional();

export const shopifyProductNode = z
  .object({
    cursor: z.string().optional(),
    node: shopifyProductSchema,
  })
  .transform((node) => node.node);

export type ShopifyProduct = z.infer<typeof shopifyProductSchema>;

export const transformShopifyProduct = (product: ShopifyProduct, collection) => {
  const { id, title, handle } = collection;
  const selectedVariant = product.variants.edges[0];
  const parsedTags = transformProductTags(product.tags, product.productType);

  return {
    shopifyProductId: product.id,
    contentId: [ProductType.EngagementRing, ProductType.WeddingBand as string].includes(product.productType)
      ? product.handle
      : selectedVariant.id.split('/').pop(), // Make function for converting to shopify global id
    productType: product.productType,
    productSlug: '', // TODO: Any way around this? it needs the variants to be parsed before processing
    productTitle: product.title,
    shopifyCollectionId: id,
    collectionTitle: title,
    collectionSlug: handle.replace(VSLUG_PREFIX, ''),
    price: parseFloat(selectedVariant.price.amount),
    ...parsedTags,
    variants: product.variants.edges.map((variant) => transformProductVariant(variant, product)),
  };
};

export const transformedShopifyProductSchema = shopifyProductSchema.transform(transformShopifyProduct);
