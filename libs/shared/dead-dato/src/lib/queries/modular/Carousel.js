const Carousel = `
  ... on ModularCarouselBlockRecord {
    id
    _modelApiKey
    additionalClass
    blocks {
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
        headingType,
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
      ... on FullWidthBannerBlockRecord {
        _modelApiKey
        title,
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
      ... on TextOnlyBlockRecord {
        title
        desktopCopy
        mobileCopy
        ctaCopy
        ctaRoute
      }
      ... on QuoteBlockRecord {
            id
            _modelApiKey
            quote
            quoteFont
            quoteStyle
            attribution
            attributionFont
            backgroundColor {
                hex
            }
            textColor {
                hex
            }
            quotationMarksImage {
                url
                alt
            }
       }
    }
  }
`;

export default Carousel;
