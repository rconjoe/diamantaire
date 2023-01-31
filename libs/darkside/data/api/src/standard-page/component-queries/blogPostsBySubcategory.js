const blogPostsBySubcategory = `
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
          copy
          id
          key
        }
      }  
    _allBlogPostsMeta(locale: $locale, filter: {category: {in: $category}, subcategories: {anyIn: $subcategory}}) {
      count
    }
  }
`;

export default blogPostsBySubcategory;
