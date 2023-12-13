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
    modalErrorMessage
    shareWishlistModalTitle
    shareWishlistModalSubtitle
    sharedWishlistPageTitle
    sharedWishlistPageSubtitle
    sharedWishlistPageSeoTitle
    sharedWishlistPageSeoDescription
    sharedWishlistFormSuccessMessage
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
