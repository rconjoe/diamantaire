import QuadStatistics from './modular/QuadStatistics';
import FullWidthBanner from './modular/FullWidthBanner';
import SkinnyHeroBanner from './modular/SkinnyHeroBanner';
import HeroBanner from './modular/HeroBanner';
import CollectionHero from './modular/CollectionHero';
import Leo from './modular/Leo';
import LogoBanner from './modular/LogoBanner';
import SingleVideo from './modular/SingleVideo';
import HalfWidthBanner from './modular/HalfWidthBanner';
import TextOnly from './modular/TextOnly';
import Trio1x1 from './modular/Trio1x1';
import Trio9x7 from './modular/Trio9x7';
import TrioStaggered9x7 from './modular/TrioStaggered9x7';
import Quad from './modular/Quad';
import Quote from './modular/Quote';
import HalfWidthQuad from './modular/HalfWidthQuad';
import Carousel from './modular/Carousel';
import CelebrityCarousel from './modular/CelebrityCarousel';
import SideBySide from './modular/SideBySide';
import BlogListTrio from './modular/BlogListTrio';
import TrioSlide9x7 from './modular/TrioSlide9x7';
import EmailSignup from './modular/EmailSignup';

const blogPost = `
  query blogPost($slug: String!, $locale: SiteLocale){
    blogPost(filter: {slug: {eq: $slug}}, locale: $locale) {
      id
      _modelApiKey
      slug
      title
      seoTitle
      seoDescription
      _publishedAt
      _updatedAt
      sortByDate
      _firstPublishedAt
      tags
      author
      featuredImage {
        url
        alt
      }
      showBlogHeader
      category {
        id
        key
        route
        copy
        subcategories {
          copy
          id
          key
          route
        }
      }
      content {
        ${QuadStatistics}
        ${FullWidthBanner}
        ${SkinnyHeroBanner}
        ${HeroBanner}
        ${CollectionHero}
        ${Leo}
        ${LogoBanner}
        ${SingleVideo}
        ${HalfWidthBanner}
        ${TextOnly}
        ${Trio1x1}
        ${Trio9x7}
        ${TrioStaggered9x7}
        ${Quad}
        ${Quote}
        ${HalfWidthQuad}
        ${Carousel}
        ${CelebrityCarousel}
        ${SideBySide}
        ${BlogListTrio}
        ${TrioSlide9x7}
        ${EmailSignup}
      }
    }
  }
`;

export default blogPost;
