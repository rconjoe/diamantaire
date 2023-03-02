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
        image {
            url
            responsiveImage (imgixParams: {w: 344, h: 410, auto: format, fit: crop, crop: focalpoint}) {
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
        imageMobile {
            url
            responsiveImage (imgixParams: {w: 344, h: 500, auto: format, fit: crop, crop: focalpoint}) {
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
    }
}
`;

export default ListPagePromoCardCollection;
