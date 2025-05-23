const ListPagePromoCardCollection = `
promoCardCollection {
    data {
        id
        link
        title
        textColor {
            hex
        }
        plpPosition
        plpPositionMobile
        openInNewTab
        image {
            url
            responsiveImage (imgixParams: {w: 344, h: 410, auto: [format, compress], fit: crop, crop: focalpoint}) {
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
        imageMobile {
            url
            responsiveImage (imgixParams: {w: 344, h: 500, auto: [format, compress], fit: crop, crop: focalpoint}) {
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

export default ListPagePromoCardCollection;
