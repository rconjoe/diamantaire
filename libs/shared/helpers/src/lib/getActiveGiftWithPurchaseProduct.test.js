import getActiveGiftWithPurchaseProduct from './getActiveGiftWithPurchaseProduct';

describe('getActiveGiftWithPurchaseProduct()', () => {
  const paramsThatReturnActiveGift = {
    isFeatureFlagEnabled: true,
    isDataFetchedAndPopulated: true,
    fetchedData: {
      giftProductOptions: [
        {
          id: 1,
          isActive: true,
        },
        {
          id: 2,
          isActive: true,
        },
      ],
      cmsData: {
        isFreeGiftEnabled: true,
      },
    },
  };

  it('returns first active gift when all required switches are on and active data is populated', () => {
    // two active products
    const result1 = getActiveGiftWithPurchaseProduct(
      paramsThatReturnActiveGift
    );
    // first product inactive, second active
    const result2 = getActiveGiftWithPurchaseProduct({
      ...paramsThatReturnActiveGift,
      fetchedData: {
        giftProductOptions: [
          {
            id: 1,
            isActive: false,
          },
          {
            id: 2,
            isActive: true,
          },
        ],
        cmsData: {
          isFreeGiftEnabled: true,
        },
      },
    });

    expect(result1.id).toEqual(1);
    expect(result2.id).toEqual(2);
  });

  it('returns null when feature flag is disabled', () => {
    const result = getActiveGiftWithPurchaseProduct({
      ...paramsThatReturnActiveGift,
      isFeatureFlagEnabled: false,
    });

    expect(result).toBe(null);
  });

  it('returns null when gwp data is not fetch or populated', () => {
    const result = getActiveGiftWithPurchaseProduct({
      ...paramsThatReturnActiveGift,
      isDataFetchedAndPopulated: false,
    });

    expect(result).toBe(null);
  });

  it('returns null when gwp switch is not turned on in dato', () => {
    const result = getActiveGiftWithPurchaseProduct({
      ...paramsThatReturnActiveGift,
      fetchedData: {
        giftProductOptions: [
          {
            isActive: true,
          },
        ],
        cmsData: {
          isFreeGiftEnabled: false,
        },
      },
    });

    expect(result).toBe(null);
  });

  it('returns null when there is no active gwp product', () => {
    const result1 = getActiveGiftWithPurchaseProduct({
      ...paramsThatReturnActiveGift,
      fetchedData: {
        giftProductOptions: [
          {
            isActive: false,
          },
          {
            isActive: false,
          },
        ],
        cmsData: {
          isFreeGiftEnabled: true,
        },
      },
    });

    const result2 = getActiveGiftWithPurchaseProduct({
      ...paramsThatReturnActiveGift,
      fetchedData: {
        giftProductOptions: [],
        cmsData: {
          isFreeGiftEnabled: true,
        },
      },
    });

    expect(result1).toBe(null);
    expect(result2).toBe(null);
  });
});
