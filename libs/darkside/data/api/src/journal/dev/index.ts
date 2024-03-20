import { DatoImageType } from '@diamantaire/shared/types';

import { queryDatoGQL } from '../../clients';
import { ResponsiveImageFragment } from '../../fragments';
import {
  BlogListTrio,
  Carousel,
  CelebrityCarousel,
  CollectionHero,
  EmailSignup,
  FullWidthBanner,
  HalfWidthBanner,
  HalfWidthQuad,
  HeroBanner,
  Leo,
  LogoBanner,
  Quad,
  QuadStatistics,
  Quote,
  SideBySide,
  SingleVideo,
  SkinnyHeroBanner,
  TextOnly,
  Trio1x1,
  Trio9x7,
  TrioSlide9x7,
  TrioStaggered9x7,
} from '../../modular';

// Journal type for what's returned in a group of posts
type IndividualJournalProps = {
  id: string;
  title: string;
  author: string;
  slug: string;
  excerpt: string;
  seoDescription: string;
  seoTitle: string;
  _publishedAt: string;
  _updatedAt: string;
  sortByDate: string;
  featuredImage: DatoImageType;
  image: DatoImageType;
  category: {
    id: string;
    key: string;
    route: string;
    copy: string;
  };
  subcategories: {
    copy: string;
    id: string;
    key: string;
  };
  ctaRoute?: string;
  ctaCopy?: string;
  copy?: string;
};

// Single Blog Post type

type SingleJournalProps = {
  blogPost: {
    id: string;
    _modelApiKey: string;
    slug: string;
    title: string;
    seoTitle: string;
    seoDescription: string;
    _publishedAt: string;
    _updatedAt: string;
    sortByDate: string;
    _firstPublishedAt: string;
    tags: string | string[];
    author: string;
    featuredImage: DatoImageType;
    showBlogHeader: boolean;
    category: {
      id: string;
      key: string;
      route: string;
      copy: string;
      subcategories: {
        copy: string;
        id: string;
        key: string;
        route: string;
      };
    };
    // TODO: is there a better way to handle this?

    content: any;
  };
};

// Journal Config
const JOURNAL_CONFIGURATION_QUERY = `
  query blogConfiguration($locale: SiteLocale) {
    blogConfiguration(locale: $locale) {
      title
      postsPerPage
      latestStoriesTitle
      blogHomeSeoTitle
      blogHomeSeoDescription
      categoriesToDisplay {
        id
        key
        route
        copy
        seoTitle
        seoDescription
        subcategories {
          copy
          id
          key
          route
          seoTitle
          seoDescription
        }
      }
      heroPost {
        id
        title
        author
        slug
        excerpt
        seoDescription
        seoTitle
        _publishedAt
        _updatedAt
        sortByDate
        featuredImage {
          responsiveImage(imgixParams: {w: 568, q: 35, auto: [format, compress], fit: crop, crop: focalpoint }) {
            ...responsiveImageFragment
          }
        }
      }
    }
  }
  ${ResponsiveImageFragment}
`;

export async function fetchJournalConfig(locale: string) {
  const journalConfigData = await queryDatoGQL({
    query: JOURNAL_CONFIGURATION_QUERY,
    variables: { locale },
  });

  return journalConfigData;
}

// Journal Header
const JOURNAL_HEADER_QUERY = `
  query blogHeader($locale: SiteLocale) {
    blogHeader(locale: $locale) {
      title
      links {
        ... on NavigationLinkRecord {
          _modelApiKey
          id
          copy
          route
          isBold
          linkKey
          flags
          nestedLinks {
            id
            copy
            route
            isBold
          }
        }
      }
    }
  }
`;

export async function fetchJournalHeader(locale: string) {
  const journalHeaderData = await queryDatoGQL({
    query: JOURNAL_HEADER_QUERY,
    variables: { locale },
  });

  return journalHeaderData;
}

export const ALL_JOURNAL_SLUGS = `
  query allJournalSlugs($locale: SiteLocale, $first: IntType, $skip: IntType) {
    allBlogPosts(locale: $locale, first: $first, skip: $skip) {
      slug
    }
    _allBlogPostsMeta {
      count
    }
  }
`;

export const ALL_JOURNAL_CATEGORY_SLUGS = `
  query allJournalCategories($locale: SiteLocale, $skip: IntType) {
    allBlogCategories(locale:$locale, skip: $skip ) {
      route
    }
  }
`;

export const ALL_JOURNAL_SUBCATEGORY_SLUGS = `
    query allJournalCategories($locale: SiteLocale, $skip: IntType) {
      allBlogCategories(locale: $locale, skip: $skip) {
        subcategories {
          id
          route
        }
      }
    }
`;

const JOURNALS_BY_CATEGORY_QUERY = `
query blogPostsByCategory ($locale: SiteLocale, $category: [ItemId]!, $first: IntType, $skip: IntType,) {
  allBlogPosts(locale: $locale, filter: {category: {exists: true, in: $category}, sortByDate: { exists: true }}, orderBy: sortByDate_DESC, first: $first, skip: $skip) {
      id
      title
      author
      slug
      excerpt
      seoDescription
      seoTitle
      _publishedAt
      _updatedAt
      sortByDate
      featuredImage {
        responsiveImage(imgixParams: {w: 568, q: 35, auto: [format, compress], fit: crop, crop: focalpoint }) {
          ...responsiveImageFragment
        }
      }
      category {
        id
        key
        route
        copy
      }
      subcategories {
        id
        key
        route
        copy
      }
    }
  _allBlogPostsMeta(locale: $locale, filter: {category: {in: $category} sortByDate: { exists: true }}) {
    count
  }
}
${ResponsiveImageFragment}
`;

type JournalsByCategoryProps = {
  _allBlogPostsMeta: {
    count: number;
  };
  allBlogPosts: IndividualJournalProps[];
};

export async function fetchJournalsByCategory(
  locale: string,
  category: string | Array<string>,
  first: number,
  skip: number,
) {
  const journalsByCategory = await queryDatoGQL({
    query: JOURNALS_BY_CATEGORY_QUERY,
    variables: { locale, category, first, skip },
  }).catch((e) => console.log('fetch error', e));

  return journalsByCategory as JournalsByCategoryProps;
}

const JOURNALS_BY_SUBCATEGORY_QUERY = `
query blogPostsBySubcategory ($locale: SiteLocale, $category: [ItemId]!, $subcategory: [ItemId]!, $first: IntType, $skip: IntType,) {
  allBlogPosts(locale: $locale, filter: {category: {exists: true, in: $category}, subcategories: {exists: true, anyIn: $subcategory}, sortByDate: { exists: true }}, orderBy: sortByDate_DESC, first: $first, skip: $skip) {
        id
        title
        author
        slug
        excerpt
        seoDescription
        seoTitle
        _publishedAt
        _updatedAt
        sortByDate
        featuredImage {
          responsiveImage(imgixParams: {w: 568, q: 35, auto: [format, compress], fit: crop, crop: focalpoint }) {
            ...responsiveImageFragment
          }
        }
        category {
          id
          key
          route
          copy
        }
        subcategories {
          copy
          id
          key
        }
      }  
      _allBlogPostsMeta(locale: $locale, filter: {category: {in: $category}, subcategories: {anyIn: $subcategory} sortByDate: { exists: true }}) {
        count
      }
  }
  ${ResponsiveImageFragment}
`;

type JournalsBySubcategoryProps = {
  _allBlogPostsMeta: {
    count: number;
  };
  allBlogPosts: IndividualJournalProps[];
};

export async function fetchJournalsBySubcategory(
  locale: string,
  category: string | Array<string>,
  subcategory: string | Array<string>,
  first: number,
  skip: number,
) {
  const journalsBySubcategory = await queryDatoGQL({
    query: JOURNALS_BY_SUBCATEGORY_QUERY,
    variables: { locale, category, subcategory, first, skip },
  }).catch((e) => console.log('fetch error', e));

  return journalsBySubcategory as JournalsBySubcategoryProps;
}

type JournalsByMostRecent = {
  allBlogPosts: IndividualJournalProps[];
};

const ALL_JOURNALS_BY_MOST_RECENT = `
query blogPostsByMostRecent ($locale: SiteLocale, $first: IntType, $skip: IntType,) {
  allBlogPosts(locale: $locale, filter: {sortByDate: { exists: true }}, orderBy: sortByDate_DESC, first: $first, skip: $skip) {
      id
      title
      author
      slug
      excerpt
      seoDescription
      seoTitle
      _publishedAt
      _updatedAt
      sortByDate
      featuredImage {
        alt
        url
        
      }
      category {
        id
        key
        route
        copy
      }
      subcategories {
        id
        key
        route
        copy
      }
    }
}
`;

export async function fetchAllJournalsByMostRecent(locale: string, first: number, skip: number) {
  const journalsByMostRecent = await queryDatoGQL({
    query: ALL_JOURNALS_BY_MOST_RECENT,
    variables: { locale, first, skip },
  });

  return journalsByMostRecent as JournalsByMostRecent;
}

// Single Journal

const SINGLE_JOURNAL_QUERY = `
  query singleJournal($slug: String!, $locale: SiteLocale){
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

export async function fetchSingleJournal(locale: string, slug: string | string[]) {
  const singleJournal = await queryDatoGQL({
    query: SINGLE_JOURNAL_QUERY,
    variables: { locale, slug },
  });

  return singleJournal as SingleJournalProps;
}

// Non react-query quieres

type AllJournalSlugsReponse = {
  allBlogPosts?: PageData[];
};

type AllJournalCategoriesReponse = {
  allBlogCategories?: PageData[];
};

type PageData = {
  route?: string;
  slug?: string;
  subcategories?: PageData[];
};

// dato limit
const REQ_PAGE_SIZE = 100;

export async function getAllJournalSlugs(): Promise<string[]> {
  let skip = 0,
    response: AllJournalSlugsReponse = {};
  let journalPosts: PageData[] = [];

  do {
    try {
      // eslint-disable-next-line no-await-in-loop
      response = await queryDatoGQL({
        query: ALL_JOURNAL_SLUGS,
        variables: {
          first: REQ_PAGE_SIZE,
          skip,
        },
      });

      if (response?.allBlogPosts) {
        journalPosts = [...journalPosts, ...response.allBlogPosts];
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error occured while fetching journal slugs', error);
    }
    skip += REQ_PAGE_SIZE;
  } while (response?.allBlogPosts && response?.allBlogPosts?.length === REQ_PAGE_SIZE);

  return journalPosts.map((pageData) => pageData.slug);
}

export async function getAllJournalCategories(): Promise<string[]> {
  let skip = 0,
    response: AllJournalCategoriesReponse = {};
  let journalCategories: PageData[] = [];

  do {
    try {
      // eslint-disable-next-line no-await-in-loop
      response = await queryDatoGQL({
        query: ALL_JOURNAL_CATEGORY_SLUGS,
        variables: {
          first: REQ_PAGE_SIZE,
          skip,
        },
      });

      if (response?.allBlogCategories) {
        journalCategories = [...journalCategories, ...response.allBlogCategories];
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error occured while fetching journal slugs', error);
    }
    skip += REQ_PAGE_SIZE;
  } while (response?.allBlogCategories && response?.allBlogCategories?.length === REQ_PAGE_SIZE);

  return journalCategories.map((pageData) => pageData.route);
}

export async function getAllJournalSubCategories(): Promise<{ route: string }[]> {
  let skip = 0,
    response: AllJournalCategoriesReponse = {};
  let journalSubcategories = [];

  do {
    try {
      // eslint-disable-next-line no-await-in-loop
      response = await queryDatoGQL({
        query: ALL_JOURNAL_SUBCATEGORY_SLUGS,
        variables: {
          first: REQ_PAGE_SIZE,
          skip,
        },
      });

      if (response?.allBlogCategories) {
        journalSubcategories = [
          ...journalSubcategories,
          ...response.allBlogCategories.map((category) => category.subcategories.map((item) => item)),
        ];
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error occured while fetching journal slugs', error);
    }
    skip += REQ_PAGE_SIZE;
  } while (response?.allBlogCategories && response?.allBlogCategories?.length === REQ_PAGE_SIZE);

  const flattenedArray = journalSubcategories.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);

  return flattenedArray;
}
