const BannerBlockFullWidthBanner = `
   ... on FullWidthBannerBlockRecord {
                    _modelApiKey
                    title
                    desktopCopy
                    desktopImage {
                        url
                        alt
                        responsiveImage(imgixParams: {w: 1440, q: 40, auto: format, fit: crop, crop: focalpoint },sizes:"(min-width: 1440px) 1440px, (min-width: 768px) 100vw") {
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
                        responsiveImage(imgixParams: {w: 360, h: 240, q: 35, auto: format, fit: crop, crop: focalpoint },sizes:"100vw") {
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
                    gtmClass
                }
`;

export default BannerBlockFullWidthBanner;
