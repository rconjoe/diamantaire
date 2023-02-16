import ResponsiveImageFragment from './fragments/ResponsiveImageFragment';

const jewelryOmegaProduct = `
    query jewelryOmegaProduct($slug: String!, $locale: SiteLocale) {
        jewelryOmegaProduct(filter: { slug: { eq: $slug } }, locale: $locale) {
            seoFields {
                seoTitle
                seoDescription
            }
            slug
            productTitle
            products {
                plpTitle
                shownWithCenterStone
                configuredProductOptionsInOrder
                variantId
                assetStack {
                    url
                    mimeType
                    video {
                        streamingUrl
                    }
                    alt
                }
                productSuggestionQuadBlock {
                    _modelApiKey
                    name
                    content {
                      ... on ModularProductSuggestionQuadBlockRecord {
                        id
                        _modelApiKey
                        aboveCopy
                        title1
                        configuration1 {
                          ... on OmegaProductRecord {
                            collection {
                              ... on WeddingBandProductRecord {
                                  slug
                              }
                              ... on EngagementRingProductRecord {
                                  slug
                              }
                            }
                            _modelApiKey
                            shopifyProductHandle
                          }
                          ... on ConfigurationRecord {
                            jewelryProduct {
                              slug
                            }
                            _modelApiKey
                            configuredProductOptionsInOrder
                            variantId
                          }
                        }
                        title2
                        configuration2 {
                          ... on OmegaProductRecord {
                            collection {
                              ... on WeddingBandProductRecord {
                                  slug
                              }
                              ... on EngagementRingProductRecord {
                                  slug
                              }
                            }
                            _modelApiKey
                            shopifyProductHandle
                          }
                          ... on ConfigurationRecord {
                            jewelryProduct {
                              slug
                            }
                            _modelApiKey
                            configuredProductOptionsInOrder
                            variantId
                          }
                        }
                        title3
                        configuration3 {
                          ... on OmegaProductRecord {
                            collection {
                              ... on WeddingBandProductRecord {
                                  slug
                              }
                              ... on EngagementRingProductRecord {
                                  slug
                              }
                            }
                            _modelApiKey
                            shopifyProductHandle
                          }
                          ... on ConfigurationRecord {
                            jewelryProduct {
                              slug
                            }
                            _modelApiKey
                            configuredProductOptionsInOrder
                            variantId
                          }
                        }
                        title4
                        configuration4 {
                          ... on OmegaProductRecord {
                            collection {
                              ... on WeddingBandProductRecord {
                                  slug
                              }
                              ... on EngagementRingProductRecord {
                                  slug
                              }
                            }
                            _modelApiKey
                            shopifyProductHandle
                          }
                          ... on ConfigurationRecord {
                            jewelryProduct {
                              slug
                            }
                            _modelApiKey
                            configuredProductOptionsInOrder
                            variantId
                          }
                        }
                      }
                    }
                }
            }
            productDescription(markdown: false)
            productSpecifications(markdown: false)
            extraOptions {
                label
                name
            }
            productIconList {
                items {
                    ... on ModularProductIconListItemRecord {
                        _modelApiKey
                        icon {
                          url
                          alt
                        }
                        copy
                        ctaCopy
                        ctaRoute
                        additionalInfo {
                          text
                          title
                          image {
                            url
                            alt
                            responsiveImage (imgixParams: { w: 448, q: 60, auto: format }){
                              ...responsiveImageFragment
                            }
                          }
                        }
                    }
                    ... on ModularShippingProductIconListItemRecord {
                        id
                        _modelApiKey
                        shippingBusinessDays
                        shippingText
                        useStaticText
                        staticText
                        icon {
                          url
                          alt
                        }
                        shippingBusinessDaysCountryMap
                    }
                }
            }
            productAccordionSpecsLabel {
                labels {
                    ... on DescriptionLabelRecord {
                        copy
                        specName
                    }
                    ... on SpecificationsLabelRecord {
                        copy
                        specName
                    }
                    ... on ShippingAndReturnsLabelRecord {
                        copy
                        specName
                    }
                }
            }
            shippingAndReturns {
                copy(markdown: false)
            }
            belowBannerBlocks {
                ... on FullWidthBannerBlockRecord {
                    id
                    _modelApiKey
                    title
                    desktopCopy
                    desktopImage {
                        url
                        alt
                    }
                    mobileCopy
                    mobileImage {
                        url
                        alt
                    }
                    ctaCopy
                    ctaRoute
                    isTextBlockWide
                    textColor
                    textBlockAlignment
                }
                ... on HalfWidthBannerBlockRecord {
                    id
                    _modelApiKey
                    title
                    desktopCopy
                    desktopImage {
                        url
                        alt
                    }
                    mobileCopy
                    mobileImage {
                        url
                        alt
                    }
                    ctaCopy
                    ctaRoute
                    isTextBlockWide
                    textColor
                    textBlockAlignment
                }
                ... on TrioBlockRecord {
                    id
                    _modelApiKey
                    title
                    aboveCopy
                    belowCopy
                    headingType
                    headingAdditionalClass
                    blocks {
                        title
                        copy
                        ctaCopy
                        ctaRoute
                        media {
                            ... on Image1x1Record {
                                image {
                                    url
                                    alt
                                }
                            }
                            ... on Image9x7Record {
                                image {
                                    url
                                    alt
                                }
                            }
                            ... on SvgAssetRecord {
                                svg {
                                    url
                                    alt
                                }
                            }
                        }
                    }
                }
            }
            waitlistPageCopy {
                waitlistCtaCopy
                waitlistCopy
            }
            ctaCopy {
                addToBagCtaCopy
                outOfStockCtaCopy
            }
            hasOnlyOnePrice
            shouldUseDatoAssets
            shouldUseDefaultPrice
        }
    }
    ${ResponsiveImageFragment}
`;

export default jewelryOmegaProduct;
