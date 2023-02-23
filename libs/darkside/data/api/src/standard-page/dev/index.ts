import { queryDatoGQL } from '../../clients';
import ResponsiveImageFragment from '../component-queries/fragments/ResponsiveImageFragment';
import Accordion from '../component-queries/modular/Accordion';
import BlogListTrio from '../component-queries/modular/BlogListTrio';
import Carousel from '../component-queries/modular/Carousel';
import CarouselHover from '../component-queries/modular/CarouselHover';
import CelebrityCarousel from '../component-queries/modular/CelebrityCarousel';
import CelebrityReel from '../component-queries/modular/CelebrityReel';
import CollectionHero from '../component-queries/modular/CollectionHero';
import Duo from '../component-queries/modular/Duo';
import EmailSignup from '../component-queries/modular/EmailSignup';
import FullWidthBanner from '../component-queries/modular/FullWidthBanner';
import GridCarousel from '../component-queries/modular/GridCarousel';
import HalfWidthBanner from '../component-queries/modular/HalfWidthBanner';
import HalfWidthBlogSummary from '../component-queries/modular/HalfWidthBlogSummary';
import HalfWidthQuad from '../component-queries/modular/HalfWidthQuad';
import HeroBanner from '../component-queries/modular/HeroBanner';
import InstagramReel from '../component-queries/modular/InstagramReel';
import Leo from '../component-queries/modular/Leo';
import ListTitle from '../component-queries/modular/ListTitle';
import LogoBanner from '../component-queries/modular/LogoBanner';
import MiniBanner from '../component-queries/modular/MiniBanner';
import ModularQuadGrid from '../component-queries/modular/ModularQuadGrid';
import ModularTriGridWithOrderTracking from '../component-queries/modular/ModularTriGridWithOrderTracking';
import ProductSlider from '../component-queries/modular/ProductSlider';
import ProductSuggestionQuad from '../component-queries/modular/ProductSuggestionQuad';
import Quad from '../component-queries/modular/Quad';
import QuadLogo from '../component-queries/modular/QuadLogo';
import QuadStatistics from '../component-queries/modular/QuadStatistics';
import Quote from '../component-queries/modular/Quote';
import RandomBanner from '../component-queries/modular/RandomBanner';
import Showroom from '../component-queries/modular/Showroom';
import SideBySide from '../component-queries/modular/SideBySide';
import SingleVideo from '../component-queries/modular/SingleVideo';
import SkinnyHeroBanner from '../component-queries/modular/SkinnyHeroBanner';
import SlickCarousel from '../component-queries/modular/SlickCarousel';
import SocialMediaSection from '../component-queries/modular/SocialMediaSection';
import TallHalfWidthBlock from '../component-queries/modular/TallHalfWidthBlock';
import TallHalfWidthBlockLocationCTA from '../component-queries/modular/TallHalfWidthBlockLocationCTA';
import TextOnly from '../component-queries/modular/TextOnly';
import Trio1x1 from '../component-queries/modular/Trio1x1';
import Trio9x7 from '../component-queries/modular/Trio9x7';
import TrioSlide9x7 from '../component-queries/modular/TrioSlide9x7';
import TrioStaggered9x7 from '../component-queries/modular/TrioStaggered9x7';
import Triosvg from '../component-queries/modular/Triosvg';

export const ALL_STANDARD_PAGE_SLUGS_QUERY = `
query AllStandardPages($first: IntType!, $skip: IntType!) {
    allStandardPages(skip: $skip, first: $first) {
      slug
    }
  }
`;

export const STANDARD_PAGE_BY_SLUG = `
  query StandardPageBySlug($slug: String, $locale: SiteLocale) {
    allStandardPages(filter: {slug: {eq: $slug}}, locale: $locale) {
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
        ${TallHalfWidthBlockLocationCTA}
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
        ${TallHalfWidthBlockLocationCTA}
      }
    }
  }
${ResponsiveImageFragment}
`;

export async function fetchStandardPageDataBySlug(slug: string, locale: string) {
  const pageData = await queryDatoGQL({
    query: STANDARD_PAGE_BY_SLUG,
    variables: { slug, locale },
  });

  return pageData;
}
