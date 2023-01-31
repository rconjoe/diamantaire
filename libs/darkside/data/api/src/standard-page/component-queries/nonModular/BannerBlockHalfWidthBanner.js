const BannerBlockHalfWidthBanner = `
   ... on HalfWidthBannerBlockRecord {
                    _modelApiKey
                    title
                    desktopCopy
                    desktopImage {
                        url
                        alt
                        responsiveImage(imgixParams: {w: 461, h: 288, q: 40, auto: format, fit: crop, crop: focalpoint }, sizes:"(min-width: 1440px) 864px, (min-width: 768px) 60vw") {
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
                    mobileCopy
                    mobileImage {
                        url
                        alt
                        responsiveImage (imgixParams: {w: 360, h:300, q: 35, auto: format, fit: clamp, crop: focalpoint }, sizes:"100vw"){
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
                    ctaCopy
                    ctaRoute
                    isTextBlockWide
                    textColor
                    textBlockAlignment
                }
`;

export default BannerBlockHalfWidthBanner;
