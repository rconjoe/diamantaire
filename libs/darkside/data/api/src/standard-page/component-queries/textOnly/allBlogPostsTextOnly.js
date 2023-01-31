import {
  modularTextOnlyBlockTextOnly,
  modularSkinnyHeroBannerBlockTextOnly,
  modularBlogListTrioBlockTextOnly,
} from './modular';

const allBlogPostsTextOnly = `
  query allBlogPostsTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allBlogPosts(first: $first, skip: $skip, locale: $locale){
      id
      title
      seoTitle
      seoDescription
      tags
      author
      excerpt
      content {
        ${modularTextOnlyBlockTextOnly},
        ${modularSkinnyHeroBannerBlockTextOnly},
        ${modularBlogListTrioBlockTextOnly},
      }
    }
  }
`;

export default allBlogPostsTextOnly;
