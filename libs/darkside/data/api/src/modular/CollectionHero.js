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
      responsiveImage(imgixParams: {w: 1440, h: 576, q: 40, auto: [format, compress], fit: crop, crop: focalpoint },sizes:"(min-width: 144rem) 144rem, (min-width: 76.8rem) 100vw") {
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
      responsiveImage(imgixParams: {w: 1125, q: 30, auto: [format, compress], fit: crop, crop: focalpoint }, sizes:"100vw") {
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
