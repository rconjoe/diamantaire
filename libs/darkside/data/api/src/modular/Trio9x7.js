import { ButtonFragment } from '../fragments';

const Trio9x7 = `
... on ModularTrio9x7BlockRecord {
  id
  _modelApiKey
  aboveCopy
  belowCopy
  headingAdditionalClass
  headingType
  title1
  copy1
  image1 {
    url
    alt
    responsiveImage (imgixParams: { w: 448, q: 40, auto: [format, compress] }){
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
  darksideButtons1 {
    ${ButtonFragment}
  }
  title2
  copy2
  image2 {
    url
    alt
    responsiveImage (imgixParams: { w: 448, q: 40, auto: [format, compress] }){
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
  darksideButtons2{
    ${ButtonFragment}
  }
  title3
  copy3
  image3 {
    url
    alt
    responsiveImage (imgixParams: { w: 448, q: 40, auto: [format, compress] }){
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
  darksideButtons3 {
    ${ButtonFragment}
  }
}
`;

export default Trio9x7;
