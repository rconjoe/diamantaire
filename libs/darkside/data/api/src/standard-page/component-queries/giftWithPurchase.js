const giftWithPurchase = `
  query giftWithPurchase($locale: SiteLocale) {
    giftWithPurchase(locale: $locale) {
      isFreeGiftEnabled
      minimumSubtotal
      qualifiedCopy
      unqualifiedAfterPriceCopy
      unqualifiedBeforePriceCopy
      pdpBannerTitle
      pdpBannerSubtitle
      pdpBannerSubtitleAfterPrice
      giftProduct {
        jewelryProduct {
          slug
        }
        assetStack {
          url
        }
      }
      fallbackGiftProduct {
        jewelryProduct {
          slug
        }
        assetStack {
          url
        }
      }
    }
  }
`;

export default giftWithPurchase;
