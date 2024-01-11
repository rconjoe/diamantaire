const ProductIconList = `
... on ModularProductIconListItemRecord {
    _modelApiKey
    icon {
        url
        alt
    }
    copy
    ctaCopy
    ctaRoute
    newRoute
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
    supportedCountries {
      code
      name
    }
}
`;

export default ProductIconList;
