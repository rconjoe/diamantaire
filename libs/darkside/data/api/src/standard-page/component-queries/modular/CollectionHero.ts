const CollectionHero = `
  ... on ModularCollectionHeroBlockRecord {
    id
    _modelApiKey
    title
    titleFont
    subtitle
    subtitleFont
    desktopImage {
      url
      video {
          streamingUrl
        }
      alt
      responsiveImage(imgixParams: {w: 1440, q: 50, auto: format }) {
            src
            alt
            aspectRatio
            base64
            bgColor
            height
            sizes
            title
            width
        }
    }
    mobileImage {
      url
      video {
          streamingUrl
        }
      alt
      responsiveImage(imgixParams: {w: 360, q: 35, auto: format }) {
            src
            alt
            aspectRatio
            base64
            bgColor
            height
            sizes
            title
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
