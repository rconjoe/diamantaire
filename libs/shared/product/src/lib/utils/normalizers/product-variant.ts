import { z } from 'zod';

import { ProductType } from '../../constants/product-properties';

function parseMetalOptionWithPurity(metalStr: string): { metal: string; goldPurity?: string } {
  const { groups } = /^(?<goldPurity>14k|18k)? ?(?<metal>[\w| ]+)/.exec(metalStr.toLocaleLowerCase());
  const { metal, goldPurity } = groups;

  return {
    metal: metal.replace(' ', '-'),
    ...(goldPurity && { goldPurity }),
  };
}

/**
 * Creates fields specific to the product type from the catchall 'ringSize
 * @param sizeValue - value assigned to ringSize
 * @param productType - product type
 * @returns - object with the specific field for the product type
 */

function parseSizeOption(sizeValue: string, productType: string) {
  // Ignore these sizes
  if (sizeValue === 'one-size' || sizeValue === 'ONE') {
    return {};
  }
  if (productType === ProductType.Necklace || productType === ProductType.Bracelet) {
    if (sizeValue.includes('ct') || sizeValue.includes('other')) {
      return {
        caratWeight: sizeValue,
      };
    } else {
      return {
        chainLength: sizeValue,
      };
    }
  }

  if (productType === ProductType.Earrings) {
    if (sizeValue.includes('ct') || sizeValue.includes('other')) {
      return {
        caratWeight: sizeValue,
      };
    } else {
      return {
        earringSize: sizeValue,
      };
    }
  }

  if ([ProductType.EngagementRing, ProductType.WeddingBand, ProductType.Ring as string].includes(productType)) {
    return {
      ringSize: sizeValue,
    };
  }

  return {
    size: sizeValue,
  };
}

const parseVariantSelectedOptions = (
  selectedOptions: { name: string; value: string }[],
  productType: string,
  // hasDiamondType: boolean,
): Record<string, string> => {
  return selectedOptions.reduce((prevSelectedOptions, selectedOption) => {
    if (selectedOption.name === 'Metal') {
      prevSelectedOptions = {
        ...prevSelectedOptions,
        ...parseMetalOptionWithPurity(selectedOption.value),
      };
    } else if (selectedOption.name === 'Size') {
      prevSelectedOptions = {
        ...prevSelectedOptions,
        ...parseSizeOption(selectedOption.value, productType /*, hasDiamondType */),
      };
    } else {
      prevSelectedOptions = {
        ...prevSelectedOptions,
        [selectedOption.name.toLowerCase()]: selectedOption.value.toLowerCase().replace(' ', '-'),
      };
    }

    return prevSelectedOptions;
  }, {});
};

const productVariantSchema = z.object({
  id: z.string(),
  sku: z.string(),
  title: z.string(),
  availableForSale: z.boolean(),
  quantityAvailable: z.number(),
  price: z.object({
    amount: z.string(),
    currencyCode: z.string(),
  }),
  selectedOptions: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    }),
  ),
});

export const variantNodeSchema = z
  .object({
    node: productVariantSchema,
  })
  .transform((variantNode) => variantNode.node);

/* eslint-disable-next-line no-unused-vars */
export const transformProductVariant = (variant, product /* collection, hasDiamondType?: boolean */) => {
  const { title, sku, id, price, selectedOptions } = variant;

  return {
    shopifyVariantId: id,
    sku,
    title,
    price: parseFloat(price.amount),
    configuration: {
      ...parseVariantSelectedOptions(selectedOptions, product.productType /*, hasDiamondType */),
    },
  };
};
