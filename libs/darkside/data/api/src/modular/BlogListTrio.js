const BlogListTrio = `
  ... on ModularBlogListTrioBlockRecord {
    id
    _modelApiKey
    title
    ctaCopy
    ctaRoute
    blogPostCtaCopy
    additionalClass

    blogPosts {
      ... on BlogPostRecord {
        id
        _modelApiKey
        slug
        title
        seoTitle
        seoDescription
        publishedAt
        author
        excerpt
        featuredImage {
          url
          alt
          responsiveImage(imgixParams: {w: 448, h: 300, q: 30, auto: [format, compress], fit: crop, crop: focalpoint }) {
              src
              alt
              aspectRatio
              base64
              bgColor
              height
              sizes
              srcSet
              title
              webpSrcSet
              width
          }
        }
      }
    }
  }
`;

export default BlogListTrio;
