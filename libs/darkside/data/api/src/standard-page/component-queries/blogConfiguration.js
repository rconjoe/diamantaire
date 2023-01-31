const blogConfiguration = `
  query blogConfiguration($locale: SiteLocale = en_US) {
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
          alt
          url
        }
      }
    }
  }
`;

export default blogConfiguration;
