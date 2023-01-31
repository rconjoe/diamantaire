const jewelryConfiguration = `
  query configurationQuery($slug: String!, $locale: SiteLocale) {
    configuration(filter: {configuredProductOptionsInOrder: {eq: $slug}}, locale: $locale) {
      plpTitle
      configuredProductOptionsInOrder
      assetStack {
        url
        mimeType
        video {
          streamingUrl
        }
        alt
      }
      shownWithCenterStone
      shape
      color
      clarity
      cut
      carat
      caratWeightOverride
      metal
      setting
      closure
      depth
      chainLength
      chainWidth
      posts
      diamondCount
      trioBlocks {
        blocks {
          title
          copy
          ctaCopy
          ctaRoute
          image {
             url
            alt
            responsiveImage (imgixParams: { w: 448, q: 40, auto: format }){
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
        }
      }
    }
  }
`;

export default jewelryConfiguration;
