export default function getLowestPriceDataFromCollection(collection) {
  // the lowest variant price in entire collection
  let lowestPrice = Number.MAX_SAFE_INTEGER;

  // presentment prices corresponding to lowestPrice
  let lowestPresentmentPrices = [];

  /**
   * lowest variant price and corresponding set of presentment prices, per diamondType in collection
   *
   * ex:
   *  {
   *    round-brilliant: {
   *        price: 1950,
   *        presentmentPrices: [ { amount: "264.0", currencyCode: "AUD" }, { amount: "257.0", currencyCode: "CAD"}]}
   *    },
   *    oval: {
   *        price: 1950,
   *        presentmentPrices: [ { amount: "264.0", currencyCode: "AUD" }, { amount: "257.0", currencyCode: "CAD"}]}
   *    },
   * }
   */
  let lowestPricesByDiamondType = {};

  for (const variant of collection.variants) {
    // never include the price of an 'other' size variant as a lowest price
    if (
      variant?.sku?.includes('other') ||
      variant?.options?.ringSize?.includes('other')
    ) {
      // therefore continue to next variant
      continue;
    }

    if (variant.price < lowestPrice) {
      lowestPrice = variant.price;
      lowestPresentmentPrices = variant.presentmentPrices;
    }

    // lowestPricesByDiamondType algorithm
    const diamondType = variant?.options?.diamondType;

    if (diamondType && diamondType.toLowerCase() !== 'none') {
      const lowestPricesForCurrentDiamondType =
        lowestPricesByDiamondType[diamondType];
      const diamondTypeNotYetInObject = !lowestPricesForCurrentDiamondType;

      if (diamondTypeNotYetInObject) {
        lowestPricesByDiamondType[diamondType] = {
          price: variant.price,
          presentmentPrices: variant.presentmentPrices,
        };
      }
      // variant price is less than what is currently in object for diamondType
      else if (variant.price < lowestPricesForCurrentDiamondType.price) {
        lowestPricesByDiamondType[diamondType] = {
          price: variant.price,
          presentmentPrices: variant.presentmentPrices,
        };
      }
    }
  }

  return {
    lowestPrice,
    lowestPresentmentPrices,
    lowestPricesByDiamondType,
  };
}
