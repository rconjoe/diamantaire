import CelebrityCarousel from './modular/CelebrityCarousel';
import Trio9x7 from './modular/Trio9x7';
import HalfWidthBanner from './modular/HalfWidthBanner';
import InstagramReel from './modular/InstagramReel';
import RandomBanner from './modular/RandomBanner';
import GridCarousel from './modular/GridCarousel';
import MiniBanner from './modular/MiniBanner';
import SlickCarousel from './modular/SlickCarousel';
import ProductSlider from './modular/ProductSlider';
import TallHalfWidthBlock from './modular/TallHalfWidthBlock';
import Quad from './modular/Quad';
import CarouselHover from './modular/CarouselHover';
import EmailSignup from './modular/EmailSignup';
import ResponsiveImageFragment from './fragments/ResponsiveImageFragment';
import TallHalfWidthBlockLocationCTA from './modular/TallHalfWidthBlockLocationCTA';

const homePage = `
  query homePage($locale: SiteLocale) {
    homePage(locale: $locale) {
      seo {
          seoTitle
          seoDescription
      }
      content {
        ... on ModularHeroBannerBlockRecord {
          id
          _modelApiKey
          ctaCopy
          ctaRoute
          ctaButtonType
          ctaCopy2
          ctaRoute2
          ctaButtonType2
          desktopCopy
          desktopImage {
            url
            alt
            responsiveImage(imgixParams: {w: 1440, q: 40, auto: format, fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
            }
          }
          mobileImage {
            url
            alt
            responsiveImage (imgixParams: {w: 375, q: 35, auto: format, fit: crop, crop: focalpoint }){
              ...responsiveImageFragment
            }
          }
          title
          textColor
          textBlockAlignment
          mobileCopy
          isTextBlockWide
          headingType
          headingAdditionalClass
        }
        ${RandomBanner}
        ${GridCarousel}
        ${CelebrityCarousel}
        ${InstagramReel}
        ${MiniBanner}
        ${SlickCarousel}
        ${ProductSlider}
        ${TallHalfWidthBlock}
        ${TallHalfWidthBlockLocationCTA}
        ${Quad}
        ${CarouselHover}
        ${EmailSignup}
        ... on ModularFullWidthBannerBlockRecord {
          id
          _modelApiKey
          title
          headingType
          headingAdditionalClass
          desktopCopy
          desktopImage {
              url
              alt
              responsiveImage(imgixParams: {w: 1440, q: 40, auto: format, fit: crop, crop: focalpoint }) {
                ...responsiveImageFragment
              }
          }
          mobileCopy
          mobileImage {
              url
              alt
              responsiveImage (imgixParams: {w: 375, q: 35, auto: format, fit: crop, crop: focalpoint }){
                ...responsiveImageFragment
              }
          }
          ctaCopy
          ctaRoute
          ctaButtonType
          isTextBlockWide
          textColor
          textBlockAlignment
          ctaCopy2
          ctaRoute2
          ctaButtonType2
          openInNewWindow
          ctaCopy3
          ctaRoute3
          ctaButtonType3
          supportedCountries {
            code
            name
          }
          additionalClass
        }
        ${HalfWidthBanner}
        ... on ModularTextOnlyBlockRecord {
          id
          _modelApiKey
          ctaCopy
          ctaRoute
          ctaType
          desktopCopy
          mobileCopy
          title
          headingType
          headingAdditionalClass
          titleStyle
          titleFont
          openInNewWindow
        }
        ... on ModularTrio1x1BlockRecord {
          id
          _modelApiKey
          aboveCopy
          belowCopy
          title1
          copy1
          image1 {
            url
            alt
          }
          ctaCopy1
          ctaRoute1
          title2
          copy2
          image2 {
            url
            alt
          }
          ctaCopy2
          ctaRoute2
          title3
          copy3
          image3 {
            url
            alt
          }
          ctaCopy3
          ctaRoute3
        }
        ${Trio9x7}
        ... on ModularTriosvgBlockRecord {
          id
          _modelApiKey
          aboveCopy
          belowCopy
          title1
          copy1
          image1 {
            url
            alt
          }
          ctaCopy1
          ctaRoute1
          title2
          copy2
          image2 {
            url
            alt
          }
          ctaCopy2
          ctaRoute2
          title3
          copy3
          image3 {
            url
            alt
          }
          ctaCopy3
          ctaRoute3
          backgroundColor {
            alpha
            red
            green
            blue
          }
        }
        ... on ModularTrioStaggered9x7BlockRecord {
          id
          _modelApiKey
          aboveCopy
          belowCopy
          title1
          image1 {
            url
            alt
            responsiveImage(imgixParams: {w: 568, q: 35, auto: format, fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
            }
          }
          copy1
          ctaCopy1
          ctaRoute1
          title2
          image2 {
            url
            alt
            responsiveImage(imgixParams: {w: 568, q: 35, auto: format, fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
            }
          }
          copy2
          ctaCopy2
          ctaRoute2
          title3
          image3 {
            url
            alt
            responsiveImage(imgixParams: {w: 568, q: 35, auto: format, fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
            }
          }
          copy3
          ctaCopy3
          ctaRoute3
        }
        ... on ModularTrioSlide9x7BlockRecord {
          id
          _modelApiKey
          aboveCopy
          belowCopy
          title1
          image1 {
            url
            alt
          }
          ctaCopy1
          ctaRoute1
          title2
          image2 {
            url
            alt
          }
          ctaCopy2
          ctaRoute2
          title3
          image3 {
            url
            alt
          }
          ctaCopy3
          ctaRoute3
        }
        ... on ModularSingleVideoBlockRecord {
          _modelApiKey
          id
          video {
            video {
              streamingUrl
            }
            alt
          }
        }
        ... on ModularSinglesvgBlockRecord {
          _modelApiKey
          id
          ctaCopy
          ctaRoute
          copy
          title
          image {
            url
            alt
          }
        }
        ... on ModularLeoBlockRecord {
          _modelApiKey
          id
          copy
          title
          image {
            url
            alt
          }
        }
        ... on ModularSideBySideBlockRecord {
          id
          _modelApiKey
          image {
            url
            alt
          }
          title
          copy
          ctaCopy
          ctaRoute
          additionalClass
          textBlockAlignment
          ctaCopy2
          ctaRoute2
          headingType
          headingAdditionalClass
          supportedCountries {
            code
            name
          }
        }
        ... on ModularCelebrityReelBlockRecord {
          _modelApiKey
          id
          title
          blocks {
            _modelApiKey
            id
            title
            desktopImage {
              url
              alt
            }
          }
          shouldIncludeCelebrityNames
          ctaCopy
          ctaLink
        }
      }
    }
  }
  ${ResponsiveImageFragment}
`;

export default homePage;
