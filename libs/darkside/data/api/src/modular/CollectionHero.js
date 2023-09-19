import { ButtonFragment } from '../fragments';

const CollectionHero = `
  ... on ModularCollectionHeroBlockRecord {
    id
    _modelApiKey
    title
    titleFont
    subtitle
    subtitleFont
    darksideButtons {
      ${ButtonFragment}
    }
    desktopImage {
      url
      video {
          streamingUrl
        }
      alt
      responsiveImage(imgixParams: {w: 1440, h: 432, q: 40, auto: format, fit: crop, crop: focalpoint },sizes:"(min-width: 1440px) 1440px, (min-width: 768px) 100vw") {
            src
            alt
            aspectRatio
            base64
            bgColor
            height
            sizes
            srcSet
            title
            webpSrcSet
            width
        }
    }
    mobileImage {
      url
      video {
          streamingUrl
        }
      alt
      responsiveImage(imgixParams: {w: 360, h: 163, q: 30, auto: format, fit: crop, crop: focalpoint }, sizes:"100vw") {
            src
            alt
            aspectRatio
            base64
            bgColor
            height
            sizes
            srcSet
            title
            webpSrcSet
            width
        }
    }
    showByVrai
    byText
    ctaCopy
    ctaType
    ctaLinkUrl
    textColor {
      hex
    }
    titleStyle
    additionalClass
    backgroundColor {
      hex
    }
  }
`;

export default CollectionHero;
