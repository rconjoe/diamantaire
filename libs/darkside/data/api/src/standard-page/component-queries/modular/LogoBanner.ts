const LogoBanner = `
  ... on ModularLogoBannerBlockRecord {
    id
    _modelApiKey
    desktopImage {
      url
      alt
      responsiveImage (imgixParams: {w: 1440, q: 35, auto: format, fit: crop, crop: focalpoint }){
        ...responsiveImageFragment
      }
    }
    desktopLogo {
      url
      alt
      responsiveImage (imgixParams: {w: 375, q: 35, auto: format, fit: crop, crop: focalpoint }){
        ...responsiveImageFragment
      }
    }
    mobileImage {
      url
      alt
      responsiveImage (imgixParams: {w: 992, q: 35, auto: format, fit: crop, crop: focalpoint }){
        ...responsiveImageFragment
      }
    }
    mobileLogo {
      url
      alt
      responsiveImage (imgixParams: {w: 375, q: 35, auto: format, fit: crop, crop: focalpoint }){
        ...responsiveImageFragment
      }
    }
    additionalClass
  }
`;

export default LogoBanner;
