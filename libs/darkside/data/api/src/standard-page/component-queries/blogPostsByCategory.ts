const blogPostsByCategory = `
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
    _allBlogPostsMeta(locale: $locale, filter: {category: {in: $category}}) {
      count
    }
  }
`;

export default blogPostsByCategory;
