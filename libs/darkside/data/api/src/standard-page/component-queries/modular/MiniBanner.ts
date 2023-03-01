const MiniBanner = `
... on ModularMiniBannerBlockRecord {
    _modelApiKey
    title
    copy
    copyTerms
    textColor {
        hex
    }
    desktopImage {
        url
        alt
        responsiveImage(imgixParams: { w: 1440, q: 40, auto: format }) {
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
        alt
        responsiveImage(imgixParams: { w: 375, q: 35, auto: format }) {
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
    supportedCountries {
      code
      name
    }
    additionalClass
  }
`;

export default MiniBanner;
