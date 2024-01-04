import { ButtonFragment } from '../fragments';
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
    darksideButtons {
      ${ButtonFragment}
    }
}
`;

export default ProductIconList;
