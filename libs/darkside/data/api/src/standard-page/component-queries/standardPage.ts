import ResponsiveImageFragment from './fragments/ResponsiveImageFragment';
import Accordion from './modular/Accordion';
import BlogListTrio from './modular/BlogListTrio';
import Carousel from './modular/Carousel';
import CarouselHover from './modular/CarouselHover';
import CelebrityCarousel from './modular/CelebrityCarousel';
import CelebrityReel from './modular/CelebrityReel';
import CollectionHero from './modular/CollectionHero';
import Duo from './modular/Duo';
import EmailSignup from './modular/EmailSignup';
import FullWidthBanner from './modular/FullWidthBanner';
import GridCarousel from './modular/GridCarousel';
import HalfWidthBanner from './modular/HalfWidthBanner';
import HalfWidthBlogSummary from './modular/HalfWidthBlogSummary';
import HalfWidthQuad from './modular/HalfWidthQuad';
import HeroBanner from './modular/HeroBanner';
import InstagramReel from './modular/InstagramReel';
import Leo from './modular/Leo';
import ListTitle from './modular/ListTitle';
import LogoBanner from './modular/LogoBanner';
import MiniBanner from './modular/MiniBanner';
import ModularQuadGrid from './modular/ModularQuadGrid';
import ModularTriGridWithOrderTracking from './modular/ModularTriGridWithOrderTracking';
import ProductSlider from './modular/ProductSlider';
import ProductSuggestionQuad from './modular/ProductSuggestionQuad';
import Quad from './modular/Quad';
import QuadLogo from './modular/QuadLogo';
import QuadStatistics from './modular/QuadStatistics';
import Quote from './modular/Quote';
import RandomBanner from './modular/RandomBanner';
import Showroom from './modular/Showroom';
import SideBySide from './modular/SideBySide';
import SingleVideo from './modular/SingleVideo';
import SkinnyHeroBanner from './modular/SkinnyHeroBanner';
import SlickCarousel from './modular/SlickCarousel';
import SocialMediaSection from './modular/SocialMediaSection';
import TallHalfWidthBlock from './modular/TallHalfWidthBlock';
import TextOnly from './modular/TextOnly';
import Trio1x1 from './modular/Trio1x1';
import Trio9x7 from './modular/Trio9x7';
import TrioSlide9x7 from './modular/TrioSlide9x7';
import TrioStaggered9x7 from './modular/TrioStaggered9x7';
import Triosvg from './modular/Triosvg';

const standardPage = `
  query standardPage($slug: String!, $locale: SiteLocale){
    standardPage(filter: {slug: {eq: $slug}}, locale: $locale) {
      slug
      breadcrumb {
        name
        link{
            ... on StandardPageRecord{
              slug
            }

            ... on ListPageRecord{
              slug
            }
        }
      }
      seo {
        id
        seoTitle
        seoDescription
      }
      map {
        value
        key
      }
      content1 {
        ${Duo}
        ${QuadLogo}
        ${QuadStatistics}
        ${FullWidthBanner}
        ${HeroBanner}
        ${CollectionHero}
        ${LogoBanner}
        ${SingleVideo}
        ${HalfWidthBanner}
        ${TextOnly}
        ${Trio1x1}
        ${Trio9x7}
        ${TrioSlide9x7}
        ${TrioStaggered9x7}
        ${Quad}
        ${Quote}
        ${HalfWidthQuad}
        ${InstagramReel}
        ${Carousel}
        ${CelebrityCarousel}
        ${ListTitle}
        ${SideBySide}
        ${CelebrityReel}
        ${SkinnyHeroBanner}
        ${Triosvg}
        ${ProductSuggestionQuad}
        ${BlogListTrio}
        ${HalfWidthBlogSummary}
        ${Showroom}
        ${Leo}
        ${SlickCarousel}
        ${ProductSlider}
        ${Accordion}
        ${RandomBanner}
        ${GridCarousel}
        ${MiniBanner}
        ${TallHalfWidthBlock}
        ${CarouselHover}
        ${EmailSignup}
        ${ModularQuadGrid}
        ${SocialMediaSection}
        ${ModularTriGridWithOrderTracking}
      }
      content2 {
        ${Duo}
        ${FullWidthBanner}
        ${HeroBanner}
        ${CollectionHero}
        ${LogoBanner}
        ${SingleVideo}
        ${HalfWidthBanner}
        ${TextOnly}
        ${Trio1x1}
        ${Trio9x7}
        ${TrioSlide9x7}
        ${TrioStaggered9x7}
        ${Quad}
        ${Quote}
        ${HalfWidthQuad}
        ${InstagramReel}
        ${Carousel}
        ${CelebrityCarousel}
        ${ListTitle}
        ${SideBySide}
        ${CelebrityReel}
        ${SkinnyHeroBanner}
        ${Triosvg}
        ${ProductSuggestionQuad}
        ${BlogListTrio}
        ${HalfWidthBlogSummary}
        ${Showroom}
        ${Leo}
        ${SlickCarousel}
        ${ProductSlider}
        ${Accordion}
        ${RandomBanner}
        ${GridCarousel}
        ${MiniBanner}
        ${TallHalfWidthBlock}
        ${CarouselHover}
        ${EmailSignup}
        ${ModularQuadGrid}
        ${SocialMediaSection}
        ${ModularTriGridWithOrderTracking}
      }
    }
  }
  ${ResponsiveImageFragment}
`;

export default standardPage;
