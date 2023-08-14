const JewelrySubcategory = `
  ... on JewelrySubcategoryRecord {
    title
    data {
        slug
        title
        image {
            url
            responsiveImage (imgixParams: {w: 400, auto: format, fit: crop}) {
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
`;

export default JewelrySubcategory;
