import ResponsiveImageFragment from './fragments/ResponsiveImageFragment';
import Accordion from './modular/Accordion';
import BlogListTrio from './modular/BlogListTrio';
import Carousel from './modular/Carousel';
import CelebrityCarousel from './modular/CelebrityCarousel';
import CelebrityReel from './modular/CelebrityReel';
import CollectionHero from './modular/CollectionHero';
import EmailSignup from './modular/EmailSignup';
import FullWidthBanner from './modular/FullWidthBanner';
import GridCarousel from './modular/GridCarousel';
import HalfWidthBanner from './modular/HalfWidthBanner';
import HalfWidthBlogSummary from './modular/HalfWidthBlogSummary';
import HalfWidthQuad from './modular/HalfWidthQuad';
import HeroBanner from './modular/HeroBanner';
import InstagramReel from './modular/InstagramReel';
import JewelrySubcategory from './modular/JewelrySubcategory';
import Leo from './modular/Leo';
import ListPageCreativeBlock from './modular/ListPageCreativeBlock';
import ListPagePromoCardCollection from './modular/ListPagePromoCardCollection';
import ListTitle from './modular/ListTitle';
import LogoBanner from './modular/LogoBanner';
import ProductSlider from './modular/ProductSlider';
import ProductSuggestionQuad from './modular/ProductSuggestionQuad';
import Quad from './modular/Quad';
import QuadLogo from './modular/QuadLogo';
import QuadStatistics from './modular/QuadStatistics';
import Quote from './modular/Quote';
import Showroom from './modular/Showroom';
import SideBySide from './modular/SideBySide';
import SingleVideo from './modular/SingleVideo';
import SkinnyHeroBanner from './modular/SkinnyHeroBanner';
import SlickCarousel from './modular/SlickCarousel';
import TallHalfWidthBlock from './modular/TallHalfWidthBlock';
import TextOnly from './modular/TextOnly';
import Trio1x1 from './modular/Trio1x1';
import Trio9x7 from './modular/Trio9x7';
import TrioSlide9x7 from './modular/TrioSlide9x7';
import TrioStaggered9x7 from './modular/TrioStaggered9x7';
import Triosvg from './modular/Triosvg';
import BannerBlockFullWidthBanner from './nonModular/BannerBlockFullWidthBanner';
import BannerBlockHalfWidthBanner from './nonModular/BannerBlockHalfWidthBanner';

const listPage = `
    query listPage($slug: String!, $locale: SiteLocale) {
        listPage(filter: { slug: { eq: $slug } }, locale: $locale) {
            breadcrumb {
                name
                link {
                    ... on ListPageRecord{
                        slug
                    }
                    ... on StandardPageRecord{
                        slug
                    }
                }
              }
            slug
            seo {
                seoTitle
                seoDescription
            }
            showAllCtaCopy
            showAllCtaLink
            hero {
                title
                copy
                textColor {
                    hex
                }
                desktopImage {
                    url
                    blurUpThumb
                    responsiveImage(imgixParams: {w: 1440, h: 338, q: 60, auto: format, fit: crop, crop: focalpoint }) {
                    ...responsiveImageFragment
                    }
                }
                mobileImage {
                    url
                    blurUpThumb
                    responsiveImage(imgixParams: {w: 375, h: 180, q: 55, auto: format, fit: crop, crop: focalpoint }) {
                        ...responsiveImageFragment
                    }
                }
                copyPrices {
                    prices {
                        priceValue
                        currencyCode
                    }
                }
                ctaCopy
                ctaRoute
                ctaButtonType
            }
            showHeroWithBanner
            filterAndSort {
                ... on PlpSortRecord {
                    label
                    sort1
                    sort2
                    sort3
                }
                ... on PlpFilterRecord {
                    label
                    filter1
                    filter2
                }
            }
            shouldAutoLoad
            productsInOrder {
                shopifyProductHandle
                countrySpecificPrices
                plpImage {
                    responsiveImage(imgixParams: {w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
                        ...responsiveImageFragment
                    }
                    alt
                }
                plpImageHover {
                    responsiveImage(imgixParams: {w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
                        ...responsiveImageFragment
                    }
                }
                plpTitle
                collection {
                    ... on WeddingBandProductRecord {
                        slug
                        productLabel {
                            title
                        }
                        subCategory {
                            slug
                            title
                        }
                        shouldUseDefaultPrice
                    }
                    ... on EngagementRingProductRecord {
                        slug
                        productLabel {
                            title
                        }
                        subCategory {
                            slug
                            title
                        }
                        shouldUseDefaultPrice
                    }
                }
            }
            configurationsInOrder {
                ... on OmegaProductRecord {
                    collection {
                        ... on WeddingBandProductRecord {
                            slug
                            productType
                            productLabel {
                                title
                            }
                            subCategory {
                                slug
                                title
                            }
                            shouldUseDefaultPrice
                        }
                        ... on EngagementRingProductRecord {
                            slug
                            productType
                            productLabel {
                                title
                            }
                            subCategory {
                                slug
                                title
                            }
                            shouldUseDefaultPrice
                        }
                    }
                    shopifyProductHandle
                    _modelApiKey
                    countrySpecificPrices
                    plpTitle
                    plpImage {
                        responsiveImage(imgixParams: {w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
                            ...responsiveImageFragment
                        }
                        alt
                    }
                    plpImageHover {
                        responsiveImage(imgixParams: {w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
                            ...responsiveImageFragment
                        }
                    }
                }
                ... on ConfigurationRecord {
                    jewelryProduct {
                        slug
                        category
                        subCategory {
                            slug
                            title
                        }
                        productLabel {
                            title
                        }
                        productAccordionSpecsLabel {
                            productType
                        }
                        shouldUseDefaultPrice
                    }
                    plpImage {
                        responsiveImage(imgixParams: {w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
                            ...responsiveImageFragment
                        }
                        alt
                    }
                    plpImageHover {
                        responsiveImage(imgixParams: {w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
                            ...responsiveImageFragment
                        }
                    }
                    plpTitle
                    configuredProductOptionsInOrder
                    variantId
                    countrySpecificPrices
                    _modelApiKey
                }
            }            
            bestSellersInOrder {
                ... on ConfigurationRecord {
                    configuredProductOptionsInOrder
                    variantId
                    _modelApiKey
                }
                ... on OmegaProductRecord {
                    shopifyProductHandle
                    _modelApiKey
                }
            }
            defaultSort
            bannerBlocks {
                ${BannerBlockFullWidthBanner}
                ${BannerBlockHalfWidthBanner}
            }
            belowBannerBlocks {
                ${Accordion}
                ${FullWidthBanner}
                ${HalfWidthBanner}
                ${Trio9x7}
                ${Quote}
                ${Carousel}
                ${CollectionHero}
                ${HalfWidthQuad}
                ${HeroBanner}
                ${InstagramReel}
                ${LogoBanner}
                ${Quad}
                ${QuadLogo}
                ${QuadStatistics}
                ${SingleVideo}
                ${TextOnly}
                ${Trio9x7}
                ${TrioSlide9x7}
                ${TrioStaggered9x7}
                ${CelebrityCarousel}
                ${Trio1x1}
                ${CelebrityReel}
                ${ListTitle}
                ${SideBySide}
                ${SkinnyHeroBanner}
                ${ProductSuggestionQuad}
                ${Triosvg}
                ${BlogListTrio}
                ${HalfWidthBlogSummary}
                ${Showroom}
                ${Leo}
                ${SlickCarousel}
                ${ProductSlider}
                ${GridCarousel}
                ${EmailSignup}
                ${TallHalfWidthBlock}
            }
            inAHurry {
                ... on TextOnlyBlockRecord {
                    title
                    desktopCopy
                    mobileCopy
                    ctaCopy
                    ctaRoute
                }
            }
            subcategoryFilter {
                ${JewelrySubcategory}
            }
            ${ListPageCreativeBlock}
            ${ListPagePromoCardCollection}
        }
    }
    ${ResponsiveImageFragment}
`;

export default listPage;
