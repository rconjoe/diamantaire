import { gql } from 'graphql-request';

import { queryDatoGQL } from '../clients';
import { ResponsiveImageFragment } from '../fragments';
import {
  Accordion,
  BlogListTrio,
  Carousel,
  CarouselHover,
  CelebrityCarousel,
  CelebrityReel,
  CollectionHero,
  Duo,
  EmailSignup,
  FullWidthBanner,
  GridCarousel,
  HalfWidthBanner,
  HalfWidthBlogSummary,
  HalfWidthQuad,
  HeroBanner,
  InstagramReel,
  Leo,
  ListTitle,
  LogoBanner,
  MiniBanner,
  ModularQuadGrid,
  ModularTriGridWithOrderTracking,
  ProductSlider,
  ProductSuggestionQuad,
  Quad,
  QuadLogo,
  QuadStatistics,
  Quote,
  RandomBanner,
  Showroom,
  SideBySide,
  SingleVideo,
  SkinnyHeroBanner,
  SlickCarousel,
  SocialMediaSection,
  TallHalfWidthBlock,
  TallHalfWidthBlockLocationCTA,
  TextOnly,
  Trio1x1,
  Trio9x7,
  TrioSlide9x7,
  TrioStaggered9x7,
  Triosvg,
} from '../modular';
import { CelebrityGallery } from '../nonModular';

export const ALL_STANDARD_PAGE_SLUGS_QUERY = gql`
  query AllStandardPages($first: IntType!, $skip: IntType!) {
    allStandardPages(skip: $skip, first: $first) {
      slug
    }
  }
`;

export const STANDARD_PAGE_BY_SLUG = gql`
  query StandardPageBySlug($slug: String, $locale: SiteLocale) {
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
        ${TallHalfWidthBlockLocationCTA}
        ${CelebrityGallery}
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
        ${CelebrityGallery}
      }
    }
  }
${ResponsiveImageFragment}
`;

export async function fetchStandardPageDataBySlug(slug: string, locale: string) {
  const qParams = new URLSearchParams({ slug, locale });
  let reqUrl = `api/page/standard?${qParams.toString()}`;

  if (typeof window === 'undefined') {
    reqUrl = `${process.env['NEXT_PUBLIC_PROTOCOL']}${process.env['NEXT_PUBLIC_VERCEL_URL']}/${reqUrl}`;
  } else {
    reqUrl = `${window.location.origin}/${reqUrl}`;
  }
  try {
    const pageData = await fetch(reqUrl);

    return pageData.json();
  } catch {
    return null;
  }
}

export const LIST_PAGE_BY_SLUG = gql`
query listPageDatoQuery($locale: SiteLocale, $slug: String!, $category: String!) {
  listPage(locale: $locale, filter: {slugNew: {eq: $slug}, category: {eq: $category}}) {
    slug
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
  }
}
${ResponsiveImageFragment}
`;

export async function fetchListPageDatoBlocksBySlug(locale: string, slug: string, category: string) {
  const pageData = await queryDatoGQL({
    query: LIST_PAGE_BY_SLUG,
    variables: { category, slug, locale },
  });

  return pageData;
}
