export const WISHLIST_QUERY = `
query wishlistQuery($locale: SiteLocale) {
  wishlist(locale: $locale) {
    pageTitle
    pageSubtitle
    pageSeoTitle
    pageSeoDescription  
    modalTitle
    modalSubtitle
    tabAll
    tabJewelry
    tabEngagement
    buttonShare
    buttonView
    buttonRemove
    buttonShop
    shareWishlistModalTitle
    shareWishlistModalSubtitle
    sharedWishlistPageTitle
    sharedWishlistPageSubtitle
    sharedWishlistPageSeoTitle
    sharedWishlistPageSeoDescription
    noResult
    noResultBlocks {
      itemTitle
      itemCaption
      itemUrl
      itemImage {
        url
      }
    }
  }
}
`;
